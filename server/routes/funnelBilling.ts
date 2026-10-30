import { createHmac } from 'node:crypto'
import { and, eq, gt } from 'drizzle-orm'
import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'
import type Stripe from 'stripe'
import { z } from 'zod'
import { ownsOffer, recordPurchase } from 'successwise-app/purchases'
import { db } from '../db/index.js'
import { funnelConsents, profiles, sessions, upsellEvents, users } from '../db/schema.js'
import { loadEnv } from '../env.js'
import {
  funnelChargeIdempotencyKey,
  funnelSubscribeIdempotencyKey,
  membershipAmountCents,
  normalizeFunnelPlan,
  resolveFunnelUpsell,
  resolveMembershipPriceId,
} from '../lib/funnelOffers.js'
import { scheduleTrialChargeReminder } from '../lib/funnelReminders.js'
import {
  FUNNEL_COOKIE,
  type FunnelSession,
  type FunnelStep,
  urlForFunnelStep,
  verifyFunnelToken,
} from '../lib/funnelToken.js'
import { getStripe, isStripeConfigured } from '../lib/stripe.js'
import {
  findBlockingSubscription,
  findUserIdByEmail,
  linkStripeCustomer,
} from '../lib/subscription.js'
import { TRIAL_DAYS } from '../lib/trial.js'
import { getRequestLocale } from '../lib/localeContext.js'
import { splitLocalePrefix, type AppLocale } from '../lib/localePath.js'
import { bumpFunnelCookie } from './funnelPages.js'

const subscribeSchema = z.object({
  token: z.string().min(1),
  plan: z.string().min(1),
  consent: z.string().min(1),
})

const chargeSchema = z.object({
  token: z.string().min(1),
  product: z.string().min(1),
  state: z.enum(['offer', 'downsell']).optional(),
  price: z.union([z.string(), z.number()]),
})

type BillingCtx = {
  session: FunnelSession
  userId: string
  email: string
  customerId: string
  paymentMethodId: string
}

function clientIp(c: { req: { header: (name: string) => string | undefined } }): string | undefined {
  const forwarded = c.req.header('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim()
  return c.req.header('x-real-ip') || undefined
}

async function cardPaymentMethodId(customerId: string): Promise<string | null> {
  const stripe = getStripe()
  const customer = await stripe.customers.retrieve(customerId)
  if (customer.deleted) return null

  const defaultRef = customer.invoice_settings?.default_payment_method
  const defaultId =
    typeof defaultRef === 'string'
      ? defaultRef
      : defaultRef && typeof defaultRef === 'object' && 'id' in defaultRef
        ? defaultRef.id
        : ''
  const defaultType =
    defaultRef && typeof defaultRef === 'object' && 'type' in defaultRef
      ? (defaultRef as { type?: string }).type
      : undefined

  if (defaultType === 'card' && defaultId) return defaultId
  if (defaultId) {
    try {
      const pm = await stripe.paymentMethods.retrieve(defaultId)
      if (pm.type === 'card') return pm.id
    } catch {
      /* fall through */
    }
  }

  const cards = await stripe.paymentMethods.list({ customer: customerId, type: 'card', limit: 1 })
  return cards.data[0]?.id ?? null
}

async function resolveBillingContext(
  token: string | undefined,
  cookieToken: string | undefined,
): Promise<{ ok: true; ctx: BillingCtx } | { ok: false; status: 400 | 401 | 409; message: string; code: string }> {
  const session = verifyFunnelToken(token) || verifyFunnelToken(cookieToken)
  if (!session) {
    return { ok: false, status: 401, message: 'Funnel session expired. Start again from your kit page.', code: 'funnel_session_expired' }
  }

  const email = (session.email || '').trim().toLowerCase()
  let userId = session.userId
  if (!userId && email) userId = (await findUserIdByEmail(email)) || undefined
  if (!userId) {
    return { ok: false, status: 409, message: 'Account not ready yet. Complete verification first.', code: 'funnel_user_missing' }
  }

  const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
  const customerId = profile?.stripeCustomerId || ''
  if (!customerId) {
    return { ok: false, status: 409, message: 'No saved card on this account.', code: 'no_billing_customer' }
  }

  const paymentMethodId = await cardPaymentMethodId(customerId)
  if (!paymentMethodId) {
    return { ok: false, status: 409, message: 'No saved card on this account.', code: 'no_saved_card' }
  }

  const resolvedEmail = email || profile?.email?.trim().toLowerCase() || ''
  if (!resolvedEmail) {
    return { ok: false, status: 409, message: 'No email on this account.', code: 'no_email' }
  }

  return {
    ok: true,
    ctx: {
      session: { ...session, userId, email: resolvedEmail },
      userId,
      email: resolvedEmail,
      customerId,
      paymentMethodId,
    },
  }
}

function nextStepAfterMembership(): FunnelStep {
  return 'upsell_coach'
}

function nextStepAfterUpsell(product: string): FunnelStep {
  if (product === 'mindora_coach') return 'upsell_prompts'
  if (product === 'prompt_library') return 'upsell_planners'
  return 'onboard'
}

/**
 * `/api/*` has no locale prefix, so take the language of the page that made the call (Referer path),
 * then the session's starting language. Otherwise a switch on an upsell page is lost on the next step.
 */
function billingLocale(c: Parameters<typeof bumpFunnelCookie>[0], session: FunnelSession): AppLocale {
  try {
    const referer = c.req.header('referer')
    if (referer) {
      const { locale } = splitLocalePrefix(new URL(referer).pathname)
      if (locale) return locale
    }
  } catch {
    /* malformed Referer: fall through */
  }
  if (session.lang === 'en' || session.lang === 'ru') return session.lang
  return getRequestLocale(c)
}

function advanceResponse(
  c: Parameters<typeof bumpFunnelCookie>[0],
  session: FunnelSession,
  next: FunnelStep,
  extra: Record<string, unknown> = {},
) {
  const locale = billingLocale(c, session)
  const { token, session: updated } = bumpFunnelCookie(c, { ...session, lang: locale }, next)
  return {
    success: true as const,
    nextUrl: urlForFunnelStep(updated.step, updated.kit, locale),
    token,
    ...extra,
  }
}

function requiresActionPayload(clientSecret: string) {
  return {
    success: false as const,
    requires_action: true as const,
    client_secret: clientSecret,
  }
}

function stripeErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error && typeof (error as { message: unknown }).message === 'string') {
    return (error as { message: string }).message
  }
  return error instanceof Error ? error.message : 'Payment failed'
}

function authenticationRequiredSecret(error: unknown): string | null {
  if (!error || typeof error !== 'object') return null
  const err = error as {
    code?: string
    payment_intent?: { client_secret?: string | null; status?: string }
    raw?: { code?: string; payment_intent?: { client_secret?: string | null; status?: string } }
  }
  const code = err.code || err.raw?.code
  const pi = err.payment_intent || err.raw?.payment_intent
  if (!pi?.client_secret) return null
  if (code === 'authentication_required' || pi.status === 'requires_action') return pi.client_secret
  return null
}

async function subscriptionClientSecret(sub: Stripe.Subscription): Promise<string | null> {
  const pending = sub.pending_setup_intent
  if (pending && typeof pending !== 'string') {
    if (pending.status === 'requires_action' && pending.client_secret) return pending.client_secret
  }
  const invoiceRef = sub.latest_invoice
  if (!invoiceRef) return null
  const stripe = getStripe()
  const invoice =
    typeof invoiceRef === 'string' ? await stripe.invoices.retrieve(invoiceRef, { expand: ['payment_intent'] }) : invoiceRef
  const piRef = (invoice as Stripe.Invoice & { payment_intent?: string | Stripe.PaymentIntent | null }).payment_intent
  if (!piRef) return null
  const pi = typeof piRef === 'string' ? await stripe.paymentIntents.retrieve(piRef) : piRef
  if (pi.status === 'requires_action' && pi.client_secret) return pi.client_secret
  return null
}

export const funnelBillingRoutes = new Hono()

funnelBillingRoutes.post('/funnel/subscribe', async (c) => {
  const parsed = subscribeSchema.safeParse(await c.req.json().catch(() => null))
  if (!parsed.success) {
    return c.json({ success: false, message: 'Invalid payload', code: 'invalid_payload' }, 400)
  }

  const plan = normalizeFunnelPlan(parsed.data.plan)
  if (!plan) {
    return c.json({ success: false, message: 'Unknown plan', code: 'unknown_plan' }, 400)
  }
  if (!parsed.data.consent.trim()) {
    return c.json({ success: false, message: 'Consent is required', code: 'consent_required' }, 400)
  }

  if (!isStripeConfigured()) {
    return c.json({ success: false, message: 'Payment is unavailable', code: 'stripe_unavailable' }, 503)
  }

  const resolved = await resolveBillingContext(parsed.data.token, getCookie(c, FUNNEL_COOKIE))
  if (!resolved.ok) {
    return c.json({ success: false, message: resolved.message, code: resolved.code }, resolved.status)
  }
  const { ctx } = resolved

  const priceId = resolveMembershipPriceId(plan)
  if (!priceId) {
    return c.json(
      {
        success: false,
        message: 'Membership price is not configured yet.',
        code: 'price_not_configured',
      },
      503,
    )
  }

  await db.insert(funnelConsents).values({
    userId: ctx.userId,
    sid: ctx.session.sid,
    plan,
    consentText: parsed.data.consent.trim(),
    ip: clientIp(c),
    userAgent: c.req.header('user-agent') || undefined,
  })

  const existing = await findBlockingSubscription(ctx.customerId)
  if (existing) {
    await linkStripeCustomer(ctx.userId, ctx.customerId, existing)
    return c.json(advanceResponse(c, ctx.session, nextStepAfterMembership(), { alreadySubscribed: true }))
  }

  const stripe = getStripe()
  const amountCents = membershipAmountCents(plan)
  try {
    const created = await stripe.subscriptions.create(
      {
        customer: ctx.customerId,
        default_payment_method: ctx.paymentMethodId,
        items: [{ price: priceId }],
        trial_period_days: TRIAL_DAYS,
        payment_settings: { save_default_payment_method: 'on_subscription' },
        metadata: {
          funnel: 'membership',
          kit: ctx.session.kit,
          plan,
          funnel_sid: ctx.session.sid,
          userId: ctx.userId,
        },
        expand: ['latest_invoice.payment_intent', 'pending_setup_intent'],
      },
      { idempotencyKey: funnelSubscribeIdempotencyKey(ctx.session.sid, plan) },
    )

    if (created.status !== 'trialing' && created.status !== 'active') {
      const actionSecret = await subscriptionClientSecret(created)
      if (actionSecret) return c.json(requiresActionPayload(actionSecret))
      return c.json(
        { success: false, message: `Subscription status: ${created.status}`, code: 'subscribe_incomplete' },
        400,
      )
    }

    await linkStripeCustomer(ctx.userId, ctx.customerId, created)

    const trialEnd =
      typeof created.trial_end === 'number'
        ? created.trial_end
        : Math.floor(Date.now() / 1000) + TRIAL_DAYS * 86400
    try {
      await scheduleTrialChargeReminder({
        userId: ctx.userId,
        stripeSubscriptionId: created.id,
        email: ctx.email,
        amountCents,
        trialEndUnix: trialEnd,
        locale: billingLocale(c, ctx.session),
      })
    } catch (error) {
      console.error('[funnel] schedule reminder failed', error)
    }

    return c.json(advanceResponse(c, ctx.session, nextStepAfterMembership()))
  } catch (error) {
    const secret = authenticationRequiredSecret(error)
    if (secret) return c.json(requiresActionPayload(secret))
    console.error('[funnel] subscribe failed', error)
    return c.json({ success: false, message: stripeErrorMessage(error), code: 'subscribe_failed' }, 400)
  }
})

funnelBillingRoutes.post('/funnel/charge', async (c) => {
  const parsed = chargeSchema.safeParse(await c.req.json().catch(() => null))
  if (!parsed.success) {
    return c.json({ success: false, message: 'Invalid payload', code: 'invalid_payload' }, 400)
  }

  const offer = resolveFunnelUpsell(parsed.data.product, parsed.data.price)
  if (!offer) {
    return c.json({ success: false, message: 'Unknown offer or price', code: 'unknown_offer' }, 400)
  }

  if (!isStripeConfigured()) {
    return c.json({ success: false, message: 'Payment is unavailable', code: 'stripe_unavailable' }, 503)
  }

  const resolved = await resolveBillingContext(parsed.data.token, getCookie(c, FUNNEL_COOKIE))
  if (!resolved.ok) {
    return c.json({ success: false, message: resolved.message, code: resolved.code }, resolved.status)
  }
  const { ctx } = resolved
  const next = nextStepAfterUpsell(offer.product)

  if (await ownsOffer(ctx.userId, offer.offerSlug)) {
    return c.json(advanceResponse(c, ctx.session, next, { alreadyPurchased: true }))
  }

  const stripe = getStripe()
  const idempotencyKey = funnelChargeIdempotencyKey(ctx.session.sid, offer.product, offer.amountCents)

  try {
    const pi = await stripe.paymentIntents.create(
      {
        amount: offer.amountCents,
        currency: 'usd',
        customer: ctx.customerId,
        payment_method: ctx.paymentMethodId,
        payment_method_types: ['card'],
        off_session: true,
        confirm: true,
        metadata: {
          offerSlug: offer.offerSlug,
          userId: ctx.userId,
          funnel_product: offer.product,
          funnel_sid: ctx.session.sid,
          amount_cents: String(offer.amountCents),
        },
      },
      { idempotencyKey },
    )

    if (pi.status === 'requires_action' && pi.client_secret) {
      return c.json(requiresActionPayload(pi.client_secret))
    }

    if (pi.status !== 'succeeded' && pi.status !== 'processing') {
      return c.json(
        { success: false, message: `Payment status: ${pi.status}`, code: 'payment_incomplete' },
        400,
      )
    }

    await recordPurchase(ctx.userId, offer.offerSlug)
    await db.insert(upsellEvents).values({
      userId: ctx.userId,
      offerSlug: offer.offerSlug,
      action: 'purchased',
      source: `funnel-${parsed.data.state || 'offer'}`,
    })

    return c.json(advanceResponse(c, ctx.session, next))
  } catch (error) {
    const secret = authenticationRequiredSecret(error)
    if (secret) return c.json(requiresActionPayload(secret))
    console.error('[funnel] charge failed', error)
    return c.json({ success: false, message: stripeErrorMessage(error), code: 'charge_failed' }, 400)
  }
})

const bindSchema = z.object({
  token: z.string().min(1),
  advance: z.boolean().optional(),
})

/** After OTP login on /account/verify: tie the funnel session to the signed-in user. */
funnelBillingRoutes.post('/funnel/bind', async (c) => {
  const parsed = bindSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload', code: 'invalid_payload' }, 400)
  const session = verifyFunnelToken(parsed.data.token) || verifyFunnelToken(getCookie(c, FUNNEL_COOKIE))
  if (!session) return c.json({ error: 'Funnel session expired', code: 'funnel_session_expired' }, 401)

  const sw = getCookie(c, 'sw_session')
  if (!sw) return c.json({ error: 'Not signed in', code: 'unauthorized' }, 401)
  const tokenHash = createHmac('sha256', loadEnv().SESSION_SECRET).update(sw).digest('hex')
  const [row] = await db
    .select({ userId: sessions.userId, email: users.email, name: users.name })
    .from(sessions)
    .innerJoin(users, eq(users.id, sessions.userId))
    .where(and(eq(sessions.tokenHash, tokenHash), gt(sessions.expiresAt, new Date())))
    .limit(1)
  if (!row) return c.json({ error: 'Not signed in', code: 'unauthorized' }, 401)

  bumpFunnelCookie(
    c,
    { ...session, userId: row.userId, email: row.email, name: row.name ?? session.name },
    parsed.data.advance ? 'membership' : session.step,
  )
  return c.json({ ok: true })
})
