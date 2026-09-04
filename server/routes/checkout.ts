import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'
import { db } from '../db/index.js'
import { checkoutOffers } from '../db/schema.js'
import { getStripe, isStripeConfigured } from '../lib/stripe.js'

const STRIPE_UNAVAILABLE = 'Payment is unavailable: Stripe is not configured.'

const DEFAULT_PERCENT_OFF = 50
const OFFER_TTL_MS = 24 * 60 * 60 * 1000

const sessionSchema = z.object({ sessionKey: z.string().min(1) })
const percentSchema = z.object({
  sessionKey: z.string().min(1),
  percentOff: z.number().int().min(0).max(100),
})
const trialSchema = z.object({
  email: z.string().min(1),
  productId: z.string().min(1),
  funnel: z.string().min(1),
})

async function findOrCreateCustomer(email: string, funnel: string, productId: string) {
  const stripe = getStripe()
  const search = await stripe.customers.search({ query: `email:"${email.replace(/"/g, '')}"` })
  if (search.data[0]) return search.data[0]
  return stripe.customers.create({
    email,
    metadata: { funnel, productId },
  })
}

export const checkoutRoutes = new Hono()

checkoutRoutes.post('/checkout/offer', async (c) => {
  const parsed = sessionSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  const { sessionKey } = parsed.data
  const now = Date.now()
  const [existing] = await db.select().from(checkoutOffers).where(eq(checkoutOffers.sessionKey, sessionKey)).limit(1)
  if (existing && existing.expiresAt.getTime() > now) {
    return c.json({ percentOff: existing.percentOff })
  }
  if (existing) {
    await db
      .update(checkoutOffers)
      .set({
        percentOff: DEFAULT_PERCENT_OFF,
        expiresAt: new Date(now + OFFER_TTL_MS),
      })
      .where(eq(checkoutOffers.id, existing.id))
  } else {
    await db.insert(checkoutOffers).values({
      sessionKey,
      percentOff: DEFAULT_PERCENT_OFF,
      expiresAt: new Date(now + OFFER_TTL_MS),
    })
  }
  return c.json({ percentOff: DEFAULT_PERCENT_OFF })
})

checkoutRoutes.post('/checkout/offer/percent', async (c) => {
  const parsed = percentSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  const { sessionKey, percentOff } = parsed.data
  const now = Date.now()
  const [existing] = await db.select().from(checkoutOffers).where(eq(checkoutOffers.sessionKey, sessionKey)).limit(1)
  if (existing) {
    await db
      .update(checkoutOffers)
      .set({ percentOff, expiresAt: new Date(now + OFFER_TTL_MS) })
      .where(eq(checkoutOffers.id, existing.id))
  } else {
    await db.insert(checkoutOffers).values({
      sessionKey,
      percentOff,
      expiresAt: new Date(now + OFFER_TTL_MS),
    })
  }
  return c.json({ percentOff })
})

checkoutRoutes.post('/checkout/trial-intent', async (c) => {
  const parsed = trialSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  if (!isStripeConfigured()) return c.json({ error: STRIPE_UNAVAILABLE }, 503)
  const { email, productId, funnel } = parsed.data
  try {
    const customer = await findOrCreateCustomer(email, funnel, productId)
    const stripe = getStripe()
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currency: 'usd',
      customer: customer.id,
      payment_method_types: ['card'],
      setup_future_usage: 'off_session',
      metadata: { funnel, productId, email },
    })
    if (!paymentIntent.client_secret) {
      return c.json({ error: 'Stripe did not return a client secret' }, 502)
    }
    return c.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Stripe request failed'
    return c.json({ error: message }, 502)
  }
})
