import { eq } from 'drizzle-orm'
import type { Context } from 'hono'
import type Stripe from 'stripe'
import { sendTrialReceiptEmail } from 'successwise-app/mail'
import { recordPurchase, revokeOfferPurchase } from 'successwise-app/purchases'
import { db } from '../db/index.js'
import { processedStripePayments, products, profiles } from '../db/schema.js'
import { loadEnv } from '../env.js'
import {
  fulfillDollarKitPurchase,
  paymentMethodFromCheckoutSession,
} from '../lib/funnelFulfillment.js'
import { findExistingAccess, sendExistingAccessEmail } from '../lib/funnelAccess.js'
import { scheduleActivationEmail } from '../lib/funnelActivation.js'
import { flowFunnelSource } from '../lib/funnelKits.js'
import { resolveMembershipPriceId } from '../lib/funnelOffers.js'
import { type FunnelFlow, isFunnelFlow, isKitCheckoutKey, type KitCheckoutKey } from '../lib/funnelToken.js'
import { isInvoicePayment, isTrialFunnelPayment, stripeRefId } from '../lib/invoicePayment.js'
import { getStripe, isPlaceholderPrice } from '../lib/stripe.js'
import { TRIAL_DAYS } from '../lib/trial.js'
import {
  collapseDuplicateBlockingSubscriptions,
  findBlockingSubscription,
  findUserIdByEmail,
  linkStripeCustomer,
  notifyScheduledCancellation,
} from '../lib/subscription.js'

/** Record after the side effect succeeds. Unique on `payment_intent_id`; retries upsert. */
async function markProcessedPayment(
  paymentIntentId: string,
  customerId: string,
  email: string | undefined,
  subscriptionId?: string,
): Promise<void> {
  await db
    .insert(processedStripePayments)
    .values({ paymentIntentId, customerId, email, subscriptionId })
    .onConflictDoUpdate({
      target: processedStripePayments.paymentIntentId,
      set: {
        customerId,
        email,
        ...(subscriptionId ? { subscriptionId } : {}),
      },
    })
}

async function resolveSubscriptionPriceId(productId: string | undefined): Promise<string | null> {
  const env = loadEnv()

  if (productId) {
    const [product] = await db.select().from(products).where(eq(products.id, productId)).limit(1)
    if (product?.stripePriceId && !isPlaceholderPrice(product.stripePriceId) && product.intervalMonths !== 1) {
      return product.stripePriceId
    }
  }

  if (env.STRIPE_MONTHLY_PRICE_ID && !isPlaceholderPrice(env.STRIPE_MONTHLY_PRICE_ID)) {
    return env.STRIPE_MONTHLY_PRICE_ID
  }

  if (productId) {
    const [product] = await db.select().from(products).where(eq(products.id, productId)).limit(1)
    if (product?.stripePriceId && !isPlaceholderPrice(product.stripePriceId)) {
      return product.stripePriceId
    }
  }

  const active = await db.select().from(products).where(eq(products.active, true))
  const monthly = active.find((row) => row.intervalMonths === 1) ?? active[0]
  if (monthly?.stripePriceId && !isPlaceholderPrice(monthly.stripePriceId)) {
    return monthly.stripePriceId
  }
  return null
}

async function handlePaymentIntentSucceeded(object: Record<string, unknown>): Promise<void> {
  const paymentIntentId = String(object.id ?? '')
  const customerId = stripeRefId(object.customer)
  const paymentMethod = stripeRefId(object.payment_method)
  const metadata = (object.metadata as Record<string, string> | undefined) ?? {}

  if (!paymentIntentId) return

  // Subscription charges (first rebill after trial, renewals) are PIs created by an invoice.
  // This handler is only for the $1 trial funnel PI; never treat invoice payments as duplicates.
  if (isInvoicePayment(object)) {
    console.log('[stripe webhook] invoice payment — trial handler skipped', paymentIntentId)
    return
  }

  if (await isPaymentAlreadyProcessed(paymentIntentId)) {
    console.log('[stripe webhook] already processed', paymentIntentId)
    return
  }

  if (metadata.offerSlug) {
    const userId = metadata.userId
    if (userId) {
      await recordPurchase(userId, metadata.offerSlug)
    } else {
      console.log('[stripe webhook] offerSlug without userId', metadata.offerSlug)
    }
    await markProcessedPayment(paymentIntentId, customerId, metadata.email)
    return
  }

  // New $1 funnel Checkout — kit access only; subscription starts later on /account/membership.
  // Fulfillment + markProcessed live on checkout.session.completed (do not mark here —
  // PI often arrives first and would block kit grant).
  if (metadata.kit && isKitCheckoutKey(metadata.kit)) {
    console.log('[stripe webhook] kit payment_intent — subscription skipped', {
      paymentIntentId,
      kit: metadata.kit,
    })
    return
  }

  // Only the $1 trial funnel PI may start (or be refunded as a duplicate of) a trial subscription.
  if (!isTrialFunnelPayment(object)) {
    console.log('[stripe webhook] not a trial funnel payment — skipped', paymentIntentId)
    return
  }

  const priceId = await resolveSubscriptionPriceId(metadata.productId)
  if (!priceId || isPlaceholderPrice(priceId)) {
    console.warn('[stripe webhook] $1 payment succeeded but no valid Stripe Price — skipping subscription', {
      paymentIntentId,
      productId: metadata.productId || null,
      priceId,
    })
    return
  }

  if (!customerId || !paymentMethod) {
    console.log('[stripe webhook] skipping subscription — missing customer or payment method', {
      paymentIntentId,
      customerId,
      paymentMethod,
      priceId,
    })
    return
  }

  const stripe = getStripe()
  const existing = await findBlockingSubscription(customerId)
  if (existing) {
    const existingPi = existing.metadata?.paymentIntentId
    if (existingPi === paymentIntentId) {
      await markProcessedPayment(paymentIntentId, customerId, metadata.email, existing.id)
      await linkCustomerIfKnown(metadata.email, customerId, existing)
      await sendTrialReceiptSafely(object, metadata.email, customerId)
      return
    }
    await refundDuplicateTrialPayment(paymentIntentId)
    await markProcessedPayment(paymentIntentId, customerId, metadata.email, existing.id)
    await linkCustomerIfKnown(metadata.email, customerId, existing)
    console.log('[stripe webhook] skipped duplicate trial sub', {
      paymentIntentId,
      customerId,
      existingSubscriptionId: existing.id,
    })
    return
  }

  const created = await stripe.subscriptions.create(
    {
      customer: customerId,
      default_payment_method: paymentMethod,
      items: [{ price: priceId }],
      trial_period_days: TRIAL_DAYS,
      metadata: {
        funnel: metadata.funnel ?? '28-day-ai-challenge',
        paymentIntentId,
      },
    },
    { idempotencyKey: `trial_sub_${paymentIntentId}` },
  )

  const keeper = await collapseDuplicateBlockingSubscriptions(customerId, created)
  if (keeper.id !== created.id) {
    await refundDuplicateTrialPayment(paymentIntentId)
    await markProcessedPayment(paymentIntentId, customerId, metadata.email, keeper.id)
    await linkCustomerIfKnown(metadata.email, customerId, keeper)
    console.log('[stripe webhook] collapsed duplicate trial sub', {
      paymentIntentId,
      customerId,
      kept: keeper.id,
      canceled: created.id,
    })
    return
  }

  await markProcessedPayment(paymentIntentId, customerId, metadata.email, created.id)
  await linkCustomerIfKnown(metadata.email, customerId, created)
  await sendTrialReceiptSafely(object, metadata.email, customerId)
}

async function sendTrialReceiptSafely(
  object: Record<string, unknown>,
  metadataEmail: string | undefined,
  customerId: string,
): Promise<void> {
  const to = metadataEmail?.trim() || (await customerEmail(customerId))
  if (!to) {
    console.error('[stripe webhook] trial receipt skipped — no email', object.id)
    return
  }
  const amountCents = typeof object.amount === 'number' && Number.isFinite(object.amount) ? object.amount : 100
  const created = typeof object.created === 'number' ? object.created : Math.floor(Date.now() / 1000)
  try {
    await sendTrialReceiptEmail({
      to,
      amountCents,
      paidAt: new Date(created * 1000),
    })
    console.log('[stripe webhook] trial receipt sent', object.id, to, formatReceiptAmount(amountCents))
  } catch (error) {
    console.error('[stripe webhook] trial receipt failed', object.id, error)
  }
}

function formatReceiptAmount(amountCents: number): string {
  return `$${(amountCents / 100).toFixed(2)}`
}

async function customerEmail(customerId: string): Promise<string | undefined> {
  if (!customerId) return undefined
  try {
    const customer = await getStripe().customers.retrieve(customerId)
    if ('deleted' in customer && customer.deleted) return undefined
    return customer.email ?? undefined
  } catch (error) {
    console.error('[stripe webhook] customer email lookup failed', customerId, error)
    return undefined
  }
}

async function isPaymentAlreadyProcessed(paymentIntentId: string): Promise<boolean> {
  const [row] = await db
    .select({ paymentIntentId: processedStripePayments.paymentIntentId })
    .from(processedStripePayments)
    .where(eq(processedStripePayments.paymentIntentId, paymentIntentId))
    .limit(1)
  return Boolean(row)
}

async function refundDuplicateTrialPayment(paymentIntentId: string): Promise<void> {
  try {
    // Safety net: only ever refund the $1 trial funnel PI, never an invoice/subscription charge.
    const pi = await getStripe().paymentIntents.retrieve(paymentIntentId)
    if (!isTrialFunnelPayment(pi as unknown as Record<string, unknown>)) {
      console.warn('[stripe webhook] refusing to refund non-trial-funnel payment', paymentIntentId)
      return
    }
    await getStripe().refunds.create(
      { payment_intent: paymentIntentId },
      { idempotencyKey: `trial_dup_refund_${paymentIntentId}` },
    )
  } catch (error) {
    console.error('[stripe webhook] duplicate-sub refund failed', paymentIntentId, error)
  }
}

async function linkCustomerIfKnown(
  email: string | undefined,
  customerId: string,
  subscription: Stripe.Subscription,
): Promise<void> {
  if (!email) return
  const userId = await findUserIdByEmail(email)
  if (userId) await linkStripeCustomer(userId, customerId, subscription)
}

async function handleCheckoutSessionCompleted(object: Record<string, unknown>): Promise<void> {
  const metadata = (object.metadata as Record<string, string> | undefined) ?? {}
  const session = object as unknown as Stripe.Checkout.Session

  // Starter Kit Sub In pays in `subscription` mode ($1 kit invoice + trial subscription); every other kit, and
  // Sub Out, pays in `payment` mode. A subscription session is only ours when it carries a funnel flow.
  if (object.mode === 'subscription') {
    if (!metadata.flow || !metadata.kit || !isKitCheckoutKey(metadata.kit)) return
    if (session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') return
    await fulfillKitCheckoutSession(session, metadata)
    return
  }
  if (object.mode !== 'payment') return
  if (object.payment_status && object.payment_status !== 'paid') return

  if (metadata.kit && isKitCheckoutKey(metadata.kit)) {
    await fulfillKitCheckoutSession(session, metadata)
    return
  }

  if (!metadata.offerSlug) {
    console.log('[stripe webhook] ignoring checkout.session without offerSlug or kit')
    return
  }
  const userId = metadata.userId
  if (userId) {
    await recordPurchase(userId, metadata.offerSlug)
  } else {
    console.log('[stripe webhook] offerSlug without userId', metadata.offerSlug)
  }
}

/** Per-Checkout claim so the webhook and the return page cannot both fulfil (or both refund) one session. */
async function claimKitSession(sessionId: string, customerId: string, email: string): Promise<boolean> {
  const claimed = await db
    .insert(processedStripePayments)
    .values({ paymentIntentId: `kit_session:${sessionId}`, customerId, email })
    .onConflictDoNothing({ target: processedStripePayments.paymentIntentId })
    .returning({ id: processedStripePayments.id })
  return claimed.length > 0
}

/**
 * Marks that THIS Checkout already granted the kit. A retry of a half-finished fulfilment (e.g. Stripe was down while
 * starting the trial) then continues instead of mistaking its own account for "bought again" and refunding it.
 */
async function markKitGranted(sessionId: string, customerId: string, email: string): Promise<void> {
  await db
    .insert(processedStripePayments)
    .values({ paymentIntentId: `kit_granted:${sessionId}`, customerId, email })
    .onConflictDoNothing({ target: processedStripePayments.paymentIntentId })
}

async function wasKitGranted(sessionId: string): Promise<boolean> {
  const [row] = await db
    .select({ id: processedStripePayments.id })
    .from(processedStripePayments)
    .where(eq(processedStripePayments.paymentIntentId, `kit_granted:${sessionId}`))
    .limit(1)
  return Boolean(row)
}

async function releaseKitSession(sessionId: string): Promise<void> {
  await db
    .delete(processedStripePayments)
    .where(eq(processedStripePayments.paymentIntentId, `kit_session:${sessionId}`))
}

/** The PaymentIntent that paid THIS Checkout (Sub Out: the session PI; Sub In: the first invoice's PI). */
async function sessionPaymentIntentId(session: Stripe.Checkout.Session): Promise<string> {
  const direct = stripeRefId(session.payment_intent)
  if (direct) return direct
  let invoiceId = stripeRefId((session as unknown as { invoice?: unknown }).invoice)
  if (!invoiceId) {
    // Not every Checkout payload carries `invoice`; the subscription always knows its first invoice.
    const subscriptionId = stripeRefId(session.subscription)
    if (!subscriptionId) return ''
    const sub = await getStripe().subscriptions.retrieve(subscriptionId)
    invoiceId = stripeRefId(sub.latest_invoice)
  }
  if (!invoiceId) return ''
  const payments = await getStripe().invoicePayments.list({ invoice: invoiceId, limit: 5 })
  for (const row of payments.data) {
    const pi = stripeRefId(row.payment?.payment_intent)
    if (pi) return pi
  }
  return ''
}

/** Bought again while already owning the kit: undo the new charge/subscription, keep the original access. */
async function undoDuplicateKitCheckout(
  session: Stripe.Checkout.Session,
  metadata: Record<string, string>,
  existing: { userId: string; name: string },
  email: string,
  lang: 'en' | 'ru',
): Promise<void> {
  const stripe = getStripe()
  const subscriptionId = stripeRefId(session.subscription)
  if (subscriptionId) {
    try {
      await stripe.subscriptions.cancel(subscriptionId, undefined, { idempotencyKey: `kit_dup_cancel_${session.id}` })
    } catch (error) {
      console.error('[stripe webhook] duplicate kit: cancel subscription failed', subscriptionId, error)
    }
  }
  try {
    const paymentIntentId = await sessionPaymentIntentId(session)
    if (paymentIntentId && (session.amount_total ?? 0) > 0) {
      await stripe.refunds.create(
        { payment_intent: paymentIntentId },
        { idempotencyKey: `kit_dup_refund_${session.id}` },
      )
    }
  } catch (error) {
    console.error('[stripe webhook] duplicate kit: refund failed', session.id, error)
  }
  const kit = metadata.kit as KitCheckoutKey
  const flow = isFunnelFlow(metadata.flow) ? metadata.flow : undefined
  await sendExistingAccessEmail({
    email,
    access: { userId: existing.userId, name: existing.name, hasKit: true, hasSubscription: false },
    kit,
    flow,
    lang,
  })
  console.log('[stripe webhook] duplicate kit purchase undone', { sessionId: session.id, kit, userId: existing.userId })
}

/** Shared by the webhook and by the Checkout return page (see `/account/verify`); skips already-processed payments. */
export async function fulfillKitCheckoutSession(
  session: Stripe.Checkout.Session,
  metadata: Record<string, string>,
): Promise<void> {
  const kit = metadata.kit
  if (!isKitCheckoutKey(kit)) return

  const customerId = stripeRefId(session.customer)
  const email =
    metadata.email?.trim() ||
    session.customer_details?.email?.trim() ||
    session.customer_email?.trim() ||
    ''
  if (!customerId || !email) {
    console.error('[stripe webhook] kit checkout missing customer or email', session.id, {
      customerId,
      email,
    })
    return
  }

  const paymentIntentId = stripeRefId(session.payment_intent)
  if (paymentIntentId && (await isPaymentAlreadyProcessed(paymentIntentId))) {
    console.log('[stripe webhook] kit checkout already processed', paymentIntentId)
    return
  }

  const flow = isFunnelFlow(metadata.flow) ? metadata.flow : undefined
  const lang = metadata.lang === 'ru' ? 'ru' : 'en'
  const name = metadata.name?.trim() || session.customer_details?.name?.trim() || undefined

  // Account-last funnels: one fulfilment per Checkout, whichever of webhook / return page gets here first.
  if (flow && !(await claimKitSession(session.id, customerId, email))) {
    console.log('[stripe webhook] kit checkout already handled', session.id)
    return
  }

  try {
    if (flow && !(await wasKitGranted(session.id))) {
      const existing = await findExistingAccess(email)
      if (existing?.hasKit) {
        await undoDuplicateKitCheckout(session, metadata, { userId: existing.userId, name: existing.name }, email, lang)
        return
      }
    }

    const paymentMethodId = await paymentMethodFromCheckoutSession(session)
    const { userId } = await fulfillDollarKitPurchase({
      kit,
      email,
      name,
      lang,
      stripeCustomerId: customerId,
      paymentMethodId: paymentMethodId || undefined,
      funnelSource: flow ? flowFunnelSource(flow) : undefined,
    })
    if (flow) await markKitGranted(session.id, customerId, email)
    // Account-last funnels mark the PaymentIntent only after the trial/e-mail steps, so a retry still runs them.
    if (paymentIntentId && !flow) {
      await markProcessedPayment(paymentIntentId, customerId, email)
    }
    if (flow) {
      await finishFlowFulfilment(session, metadata, { userId, email, lang, kit, flow, paymentMethodId })
      if (paymentIntentId) await markProcessedPayment(paymentIntentId, customerId, email)
    }
    await sendKitReceiptSafely(session, email, { flow, lang })
    console.log('[stripe webhook] kit fulfilled', {
      sessionId: session.id,
      kit,
      flow,
      userId,
      customerId,
    })
  } catch (error) {
    console.error('[stripe webhook] kit fulfillment failed', session.id, error)
    // Let the retry (Stripe re-delivery or the return page) run the whole fulfilment again.
    if (flow) await releaseKitSession(session.id).catch(() => undefined)
    throw error
  }
}

/**
 * Sub In: the $1 payment is done and the card is saved; start Mindora Academy PRO with the 3-day trial on that card.
 * Idempotent (Stripe idempotency key + "already has a blocking subscription" check), so a redelivered webhook or the
 * return page cannot create a second subscription. A failure throws: the whole fulfilment is retried.
 */
async function startSubInTrialSubscription(
  session: Stripe.Checkout.Session,
  userId: string,
  customerId: string,
  paymentMethodId: string | undefined,
): Promise<void> {
  if (!customerId || !paymentMethodId) {
    throw new Error(`Sub In ${session.id}: missing customer or saved card, cannot start the trial subscription`)
  }
  const priceId = resolveMembershipPriceId('main')
  if (!priceId) throw new Error('Sub In: STRIPE_MONTHLY_4999_PRICE_ID is not configured')
  const stripe = getStripe()
  const existing = await findBlockingSubscription(customerId)
  if (existing) {
    await linkStripeCustomer(userId, customerId, existing)
    return
  }
  const created = await stripe.subscriptions.create(
    {
      customer: customerId,
      default_payment_method: paymentMethodId,
      items: [{ price: priceId }],
      trial_period_days: TRIAL_DAYS,
      payment_settings: { save_default_payment_method: 'on_subscription' },
      metadata: {
        funnel: flowFunnelSource('sub_in'),
        kit: 'starter',
        plan: 'main',
        funnel_sid: session.metadata?.funnel_sid ?? '',
        checkout_session_id: session.id,
        userId,
      },
    },
    { idempotencyKey: `kit_sub_${session.id}` },
  )
  await linkStripeCustomer(userId, customerId, created)
}

/** Account-last funnels: subscription link (Sub In) and the delayed "finish signing in" email. */
async function finishFlowFulfilment(
  session: Stripe.Checkout.Session,
  metadata: Record<string, string>,
  input: {
    userId: string
    email: string
    lang: 'en' | 'ru'
    kit: KitCheckoutKey
    flow: FunnelFlow
    paymentMethodId?: string
  },
): Promise<void> {
  const customerId = stripeRefId(session.customer)
  const subscriptionId = stripeRefId(session.subscription)
  if (subscriptionId) {
    // Checkouts created before Sub In moved to `payment` mode carry the subscription themselves.
    const sub = await getStripe().subscriptions.retrieve(subscriptionId)
    await linkStripeCustomer(input.userId, customerId, sub)
  } else if (input.flow === 'sub_in') {
    await startSubInTrialSubscription(session, input.userId, customerId, input.paymentMethodId)
  }
  if (metadata.funnel_sid) {
    await scheduleActivationEmail({
      userId: input.userId,
      email: input.email,
      sid: metadata.funnel_sid,
      kit: input.kit,
      flow: input.flow,
      locale: input.lang,
    })
  }
}

/** Receipt lines shown for Sub In only (the $1 kit and the $0 Academy PRO trial); other funnels keep the plain receipt. */
function kitReceiptItems(flow: FunnelFlow | undefined, lang: 'en' | 'ru') {
  if (flow !== 'sub_in') return undefined
  return lang === 'ru'
    ? [
        { name: 'Стартовый AI-набор Mindora', amount: '$1.00' },
        { name: 'Mindora Academy PRO', amount: '$0.00' },
      ]
    : [
        { name: 'Mindora AI Starter Kit', amount: '$1.00' },
        { name: 'Mindora Academy PRO', amount: '$0.00' },
      ]
}

async function sendKitReceiptSafely(
  session: Stripe.Checkout.Session,
  email: string,
  opts: { flow?: FunnelFlow; lang?: 'en' | 'ru' } = {},
): Promise<void> {
  const amountCents =
    typeof session.amount_total === 'number' && Number.isFinite(session.amount_total)
      ? session.amount_total
      : 100
  const created = typeof session.created === 'number' ? session.created : Math.floor(Date.now() / 1000)
  try {
    await sendTrialReceiptEmail({
      to: email,
      amountCents,
      paidAt: new Date(created * 1000),
      locale: opts.lang,
      items: kitReceiptItems(opts.flow, opts.lang ?? 'en'),
    })
  } catch (error) {
    console.error('[stripe webhook] kit receipt failed', session.id, error)
  }
}

async function syncSubscriptionObject(object: Record<string, unknown>) {
  const customerId = stripeRefId(object.customer)
  if (!customerId) return
  const [profile] = await db.select().from(profiles).where(eq(profiles.stripeCustomerId, customerId)).limit(1)
  if (!profile) return
  const stripeSub = object as unknown as Stripe.Subscription
  await linkStripeCustomer(profile.userId, customerId, stripeSub)
  if (eventIsScheduledCancel(stripeSub)) {
    try {
      await notifyScheduledCancellation(profile.userId, stripeSub)
    } catch (error) {
      console.error('[cancel-mail]', error)
    }
  }
}

function eventIsScheduledCancel(sub: Stripe.Subscription): boolean {
  return Boolean(sub.cancel_at_period_end)
}

/** After retries exhaust (no next attempt), sync local status so catalog access closes; kit/upsells stay. */
async function handleInvoicePaymentFailed(object: Record<string, unknown>): Promise<void> {
  const customerId = stripeRefId(object.customer)
  const subscriptionId = stripeRefId(object.subscription)
  if (!customerId) return

  const [profile] = await db.select().from(profiles).where(eq(profiles.stripeCustomerId, customerId)).limit(1)
  if (!profile) return

  const nextAttempt = object.next_payment_attempt
  const attemptCount = typeof object.attempt_count === 'number' ? object.attempt_count : 0
  console.log('[stripe webhook] invoice.payment_failed', {
    invoice: object.id,
    customerId,
    subscriptionId,
    attemptCount,
    nextPaymentAttempt: nextAttempt ?? null,
  })

  if (!loadEnv().STRIPE_SECRET_KEY) return

  try {
    const stripe = getStripe()
    if (subscriptionId) {
      const remote = await stripe.subscriptions.retrieve(subscriptionId)
      await linkStripeCustomer(profile.userId, customerId, remote)
      return
    }
    const listed = await stripe.subscriptions.list({ customer: customerId, status: 'all', limit: 5 })
    const remote = listed.data[0]
    if (remote) await linkStripeCustomer(profile.userId, customerId, remote)
  } catch (error) {
    console.error('[stripe webhook] invoice.payment_failed sync failed', error)
  }
}

/** Refund of a funnel/LMS upsell PI — revoke that offer only; kit purchases remain. */
async function handleChargeRefunded(object: Record<string, unknown>): Promise<void> {
  const paymentIntentId = stripeRefId(object.payment_intent)
  if (!paymentIntentId || !loadEnv().STRIPE_SECRET_KEY) return

  try {
    const stripe = getStripe()
    const pi = await stripe.paymentIntents.retrieve(paymentIntentId)
    const offerSlug = pi.metadata?.offerSlug
    const userId = pi.metadata?.userId
    if (!offerSlug || !userId) {
      console.log('[stripe webhook] charge.refunded without offerSlug/userId', paymentIntentId)
      return
    }
    if (pi.metadata?.kit) {
      console.log('[stripe webhook] charge.refunded kit — purchases kept', paymentIntentId)
      return
    }
    const removed = await revokeOfferPurchase(userId, offerSlug)
    console.log('[stripe webhook] charge.refunded revoked', { paymentIntentId, offerSlug, removed })
  } catch (error) {
    console.error('[stripe webhook] charge.refunded handler failed', error)
  }
}

export async function stripeWebhookHandler(c: Context) {
  const env = loadEnv()
  const payload = await c.req.text()
  const signature = c.req.header('stripe-signature')

  let event: { type: string; data: { object: Record<string, unknown> } }
  if (env.STRIPE_WEBHOOK_SECRET) {
    try {
      const stripe = getStripe()
      event = stripe.webhooks.constructEvent(
        payload,
        signature ?? '',
        env.STRIPE_WEBHOOK_SECRET,
      ) as unknown as typeof event
    } catch {
      return c.text('Invalid signature', 400)
    }
  } else {
    event = JSON.parse(payload) as typeof event
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object)
        break
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object)
        break
      case 'setup_intent.succeeded': {
        const metadata = (event.data.object.metadata as Record<string, string> | undefined) ?? {}
        console.log('[stripe webhook] setup_intent.succeeded', metadata)
        break
      }
      case 'invoice.paid':
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const object = event.data.object
        if (event.type.startsWith('customer.subscription')) {
          await syncSubscriptionObject(object)
        } else if (typeof object.customer === 'string') {
          const [profile] = await db
            .select()
            .from(profiles)
            .where(eq(profiles.stripeCustomerId, object.customer))
            .limit(1)
          if (profile && typeof object.subscription === 'string' && loadEnv().STRIPE_SECRET_KEY) {
            try {
              const remote = await getStripe().subscriptions.retrieve(object.subscription)
              await linkStripeCustomer(profile.userId, object.customer, remote)
            } catch (error) {
              console.error('[stripe webhook] invoice.paid sync failed', error)
            }
          }
        }
        console.log('[stripe webhook]', event.type, object.id ?? object.customer)
        break
      }
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object)
        break
      case 'charge.refunded':
        await handleChargeRefunded(event.data.object)
        break
      default:
        console.log('[stripe webhook] unhandled event', event.type)
    }
  } catch (error) {
    console.error('[stripe webhook] handler failed', error)
    return c.json({ error: 'Webhook handler failed' }, 500)
  }

  return c.json({ received: true })
}
