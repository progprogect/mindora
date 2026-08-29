import { and, desc, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'
import { db } from '../db/index.js'
import { profiles, upsellEvents } from '../db/schema.js'
import { hasSku, offerAmountCents, recordPurchase } from '../lib/purchases.js'
import { requireAuth, type SessionEnv } from '../lib/session.js'
import { getStripe } from '../lib/stripe.js'
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
})

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

async function defaultPaymentMethod(customerId: string): Promise<string | null> {
  const stripe = getStripe()
  const customer = await stripe.customers.retrieve(customerId)
  if (customer.deleted) return null
  const fromSettings = customer.invoice_settings?.default_payment_method
  if (typeof fromSettings === 'string') return fromSettings
  if (fromSettings && typeof fromSettings === 'object' && 'id' in fromSettings) return fromSettings.id
  if (typeof customer.default_source === 'string') return customer.default_source
  const methods = await stripe.paymentMethods.list({ customer: customerId, type: 'card', limit: 1 })
  return methods.data[0]?.id ?? null
}

export const upsellRoutes = new Hono<SessionEnv>()

upsellRoutes.get('/upsell/has-card', requireAuth, async (c) => {
  const [profile] = await db.select().from(profiles).where(eq(profiles.userId, c.get('userId'))).limit(1)
  return c.json(Boolean(profile?.planTier && profile.planTier !== 'free'))
})

upsellRoutes.get('/upsell/prompt-vault-key', requireAuth, async (c) => {
  const owned = await hasSku(c.get('userId'), 'ultimate-prompt-library')
  return c.json({ key: owned ? 'prompt-vault' : null })
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
  const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
  const customerId = profile?.stripeCustomerId
  if (!customerId) {
    return c.json({ success: false, reason: 'noCard', error: 'No saved card on this account.' })
  }
  try {
    const paymentMethod = await defaultPaymentMethod(customerId)
    if (!paymentMethod) {
      return c.json({ success: false, reason: 'noCard', error: 'No saved card on this account.' })
    }
    const stripe = getStripe()
    await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customerId,
      payment_method: paymentMethod,
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
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Charge failed'
    console.error('[upsell] charge failed', error)
    return c.json({ success: false, reason: 'stripeError', error: message })
  }
})
