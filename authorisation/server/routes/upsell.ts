import { and, desc, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'
import { db } from '../db/index.js'
import { upsellEvents } from '../db/schema.js'
import { hasSku, offerAmountCents, offerCheckoutName, recordPurchase } from '../lib/purchases.js'
import { requireAuth, type SessionEnv } from '../lib/session.js'
import { getStripe } from '../lib/stripe.js'
import { attachStripeCustomer, findStripeCustomerId, linkStripeCustomer } from '../lib/subscription.js'
import { loadCurrentUser } from '../lib/currentUser.js'
import { publicOrigin } from '../lib/http.js'
import { loadEnv } from '../env.js'

const eventSchema = z.object({
  offerSlug: z.string().min(1),
  action: z.string().min(1),
  reason: z.string().optional(),
  source: z.string().optional(),
})

const chargeSchema = z.object({
  offerSlug: z.string().min(1),
  attribution: z.unknown().optional(),
  returnPath: z.string().max(512).optional(),
})

function sanitizeReturnPath(raw: string | undefined): string {
  const fallback = '/app/dashboard'
  if (!raw) return fallback
  const trimmed = raw.trim()
  if (
    !trimmed.startsWith('/') ||
    trimmed.startsWith('//') ||
    trimmed.includes('\\') ||
    trimmed.includes('://')
  ) {
    return fallback
  }
  try {
    const url = new URL(trimmed, 'https://lms.invalid')
    if (url.username || url.password || url.host !== 'lms.invalid') return fallback
    url.searchParams.delete('session_id')
    url.searchParams.delete('upsell')
    const search = url.searchParams.toString()
    return url.pathname + (search ? `?${search}` : '')
  } catch {
    return fallback
  }
}

async function latestStatus(userId: string, offerSlug: string) {
  if (await hasSku(userId, offerSlug)) return 'purchased'
  const events = await db
    .select()
    .from(upsellEvents)
    .where(and(eq(upsellEvents.userId, userId), eq(upsellEvents.offerSlug, offerSlug)))
    .orderBy(desc(upsellEvents.createdAt))
  const purchased = events.find((event) => event.action === 'purchased')
  if (purchased) return 'purchased'
  const skipped = events.find((event) => event.action === 'skipped')
  if (skipped) return 'skipped'
  if (events[0]) return events[0].action
  return 'none'
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
  if (defaultId && defaultType !== 'paypal') {
    const retrieved = await stripe.paymentMethods.retrieve(defaultId)
    if (retrieved.type === 'card') return retrieved.id
  }

  const cards = await stripe.paymentMethods.list({ customer: customerId, type: 'card', limit: 1 })
  return cards.data[0]?.id ?? null
}

async function resolveCustomerId(userId: string, email: string): Promise<string | null> {
  await attachStripeCustomer(userId, email)
  return findStripeCustomerId(userId, email)
}

async function ensureCustomerId(userId: string, email: string): Promise<string | null> {
  const existing = await resolveCustomerId(userId, email)
  if (existing) return existing
  const stripe = getStripe()
  const customer = await stripe.customers.create({
    email,
    metadata: { userId },
  })
  await linkStripeCustomer(userId, customer.id)
  return customer.id
}

export const upsellRoutes = new Hono<SessionEnv>()

upsellRoutes.get('/upsell/has-card', requireAuth, async (c) => {
  if (!loadEnv().STRIPE_SECRET_KEY) return c.json(false)
  const userId = c.get('userId')
  const user = await loadCurrentUser(userId)
  if (!user?.email) return c.json(false)
  try {
    const customerId = await resolveCustomerId(userId, user.email)
    if (!customerId) return c.json(false)
    return c.json(Boolean(await cardPaymentMethodId(customerId)))
  } catch (error) {
    console.error('[upsell] has-card failed', error)
    return c.json(false)
  }
})

upsellRoutes.get('/upsell/prompt-vault-key', requireAuth, async (c) => {
  const owned = await hasSku(c.get('userId'), 'ultimate-prompt-library')
  return c.json({ key: owned ? 'prompt-vault' : null })
})

upsellRoutes.get('/upsell/complete', requireAuth, async (c) => {
  const sessionId = c.req.query('session_id')
  if (!sessionId) return c.json({ success: false, error: 'Missing session' }, 400)
  if (!loadEnv().STRIPE_SECRET_KEY) {
    return c.json({
      success: false,
      reason: 'configError',
      error:
        'This offer cannot be charged yet. Continue without it for now — you can add it later, and nothing is lost.',
    })
  }
  const userId = c.get('userId')
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId)
    if (session.mode !== 'payment' || session.payment_status !== 'paid') {
      return c.json({ success: false, reason: 'unpaid' })
    }
    const offerSlug = session.metadata?.offerSlug
    const metaUserId = session.metadata?.userId
    if (!offerSlug || metaUserId !== userId) {
      return c.json({ success: false, reason: 'mismatch' }, 403)
    }
    if (offerAmountCents(offerSlug) == null) {
      return c.json({ success: false, reason: 'unknownOffer', error: 'Unknown offer.' })
    }
    await recordPurchase(userId, offerSlug)
    await db.insert(upsellEvents).values({
      userId,
      offerSlug,
      action: 'purchased',
      source: 'checkout',
    })
    return c.json({ success: true, offerSlug })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Checkout complete failed'
    console.error('[upsell] complete failed', error)
    return c.json({ success: false, reason: 'stripeError', error: message })
  }
})

upsellRoutes.get('/upsell/:slug', requireAuth, async (c) => {
  const slug = c.req.param('slug')
  return c.json({ status: await latestStatus(c.get('userId'), slug) })
})

upsellRoutes.post('/upsell/event', requireAuth, async (c) => {
  const parsed = eventSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  const [inserted] = await db
    .insert(upsellEvents)
    .values({
      userId: c.get('userId'),
      offerSlug: parsed.data.offerSlug,
      action: parsed.data.action,
      reason: parsed.data.reason,
      source: parsed.data.source,
    })
    .returning({ id: upsellEvents.id })
  return c.json({ id: inserted?.id })
})

upsellRoutes.post('/upsell/charge', requireAuth, async (c) => {
  const parsed = chargeSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  const userId = c.get('userId')
  const offerSlug = parsed.data.offerSlug
  if (await hasSku(userId, offerSlug)) {
    return c.json({ success: true, alreadyPurchased: true })
  }
  const amount = offerAmountCents(offerSlug)
  if (amount == null) {
    return c.json({ success: false, reason: 'unknownOffer', error: 'Unknown offer.' })
  }
  if (!loadEnv().STRIPE_SECRET_KEY) {
    return c.json({
      success: false,
      alreadyPurchased: false,
      reason: 'configError',
      error:
        'This offer cannot be charged yet. Continue without it for now — you can add it later, and nothing is lost.',
    })
  }
  const user = await loadCurrentUser(userId)
  if (!user?.email) {
    return c.json({ success: false, reason: 'stripeError', error: 'No email on this account.' })
  }
  try {
    const customerId = await ensureCustomerId(userId, user.email)
    if (!customerId) {
      return c.json({ success: false, reason: 'configError', error: 'Could not create a billing customer.' })
    }
    const paymentMethod = await cardPaymentMethodId(customerId)
    const stripe = getStripe()
    if (paymentMethod) {
      await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        customer: customerId,
        payment_method: paymentMethod,
        payment_method_types: ['card'],
        off_session: true,
        confirm: true,
        metadata: { offerSlug, userId },
      })
      await recordPurchase(userId, offerSlug)
      await db.insert(upsellEvents).values({
        userId,
        offerSlug,
        action: 'purchased',
        source: 'saved-card',
      })
      return c.json({ success: true, alreadyPurchased: false })
    }

    const returnPath = sanitizeReturnPath(parsed.data.returnPath)
    const origin = publicOrigin(c)
    const returnUrl = new URL(returnPath, `${origin}/`)
    returnUrl.searchParams.delete('session_id')
    returnUrl.searchParams.delete('upsell')
    const cancelUrl = `${returnUrl.origin}${returnUrl.pathname}${returnUrl.search}`
    returnUrl.searchParams.set('upsell', 'success')
    const successQuery = returnUrl.searchParams.toString()
    const successUrl = `${returnUrl.origin}${returnUrl.pathname}?${successQuery}&session_id={CHECKOUT_SESSION_ID}`

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer: customerId,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: amount,
            product_data: { name: offerCheckoutName(offerSlug) },
          },
        },
      ],
      metadata: { offerSlug, userId },
      payment_intent_data: {
        metadata: { offerSlug, userId },
        setup_future_usage: 'off_session',
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    })
    if (!session.url) {
      return c.json({ success: false, reason: 'stripeError', error: 'Checkout session has no URL.' })
    }
    return c.json({ success: false, checkoutUrl: session.url })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Charge failed'
    console.error('[upsell] charge failed', error)
    return c.json({ success: false, reason: 'stripeError', error: message })
  }
})
