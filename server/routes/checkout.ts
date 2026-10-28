import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'
import { db } from '../db/index.js'
import { checkoutOffers } from '../db/schema.js'
import { createDollarCheckoutSession } from '../lib/funnelCheckout.js'
import { landingProduct, quizProduct, resolveLandingKit } from '../lib/funnelKits.js'
import { ALREADY_SUBSCRIBED_ERROR, findBlockingSubscription } from '../lib/subscription.js'
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

const landingCheckoutSchema = z.object({
  variant: z.string().optional(),
  kit: z.string().optional(),
  block: z.string().optional(),
  exit_bonus: z.boolean().optional(),
  lang: z.enum(['en', 'ru']).optional().default('en'),
  utm: z.union([z.string(), z.record(z.string(), z.string())]).optional(),
})

const quizCheckoutSchema = z.object({
  quiz: z.enum(['claudecert', 'challenge']),
  quiz_session_id: z.string().max(100).optional(),
  name: z.string().max(200).optional(),
  email: z.string().max(320).optional(),
  lang: z.enum(['en', 'ru']).optional().default('en'),
  utm: z.union([z.string(), z.record(z.string(), z.string())]).optional(),
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

function appendUtmMetadata(
  metadata: Record<string, string>,
  utm: string | Record<string, string> | undefined,
) {
  if (!utm) return
  if (typeof utm === 'string') {
    const params = new URLSearchParams(utm.startsWith('?') ? utm.slice(1) : utm)
    for (const [key, value] of params.entries()) {
      if (key.startsWith('utm_') && value) metadata[key.slice(0, 40)] = value.slice(0, 500)
    }
    return
  }
  for (const [key, value] of Object.entries(utm)) {
    if (value) metadata[key.slice(0, 40)] = String(value).slice(0, 500)
  }
}

checkoutRoutes.post('/checkout', async (c) => {
  const parsed = landingCheckoutSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  const kit = resolveLandingKit({ kit: parsed.data.kit, variant: parsed.data.variant })
  if (!kit) return c.json({ error: 'Unknown funnel kit' }, 400)
  if (!isStripeConfigured()) return c.json({ error: STRIPE_UNAVAILABLE }, 503)
  const product = landingProduct(kit)
  const lang = parsed.data.lang
  const metadata: Record<string, string> = {
    kit,
    lang,
    funnel: product.funnelSource,
  }
  if (parsed.data.block) metadata.block = parsed.data.block
  if (parsed.data.exit_bonus) metadata.exit_bonus = '1'
  appendUtmMetadata(metadata, parsed.data.utm)
  try {
    const { url } = await createDollarCheckoutSession({
      c,
      kit,
      productName: product.name,
      productDescription: product.description,
      lang,
      cancelPath: product.cancelPath,
      metadata,
    })
    return c.json({ url })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Stripe request failed'
    return c.json({ error: message }, 502)
  }
})

/** `-long` quiz variants: $1 one-time Checkout, no subscription. Original quiz routes keep trial-intent. */
checkoutRoutes.post('/quiz/checkout', async (c) => {
  const parsed = quizCheckoutSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  if (!isStripeConfigured()) return c.json({ error: STRIPE_UNAVAILABLE }, 503)
  const { quiz, lang } = parsed.data
  const product = quizProduct(quiz)
  const email = parsed.data.email?.trim()
  const name = parsed.data.name?.trim()
  const quizSessionId = parsed.data.quiz_session_id?.trim()
  const metadata: Record<string, string> = {
    kit: quiz,
    quiz,
    variant: 'oneoff',
    lang,
    funnel: product.funnelSource,
  }
  if (quizSessionId) metadata.quiz_session_id = quizSessionId
  if (name) metadata.name = name.slice(0, 200)
  appendUtmMetadata(metadata, parsed.data.utm)
  try {
    const { url } = await createDollarCheckoutSession({
      c,
      kit: quiz,
      productName: product.name,
      productDescription: product.description,
      lang,
      cancelPath: product.cancelPath,
      metadata,
      email: email || undefined,
      name: name || undefined,
      quizSessionId: quizSessionId || undefined,
    })
    return c.json({ url })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Stripe request failed'
    return c.json({ error: message }, 502)
  }
})

checkoutRoutes.post('/checkout/trial-intent', async (c) => {
  const parsed = trialSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  if (!isStripeConfigured()) return c.json({ error: STRIPE_UNAVAILABLE }, 503)
  const { email, productId, funnel } = parsed.data
  try {
    const customer = await findOrCreateCustomer(email, funnel, productId)
    const blocking = await findBlockingSubscription(customer.id)
    if (blocking) {
      return c.json({ error: ALREADY_SUBSCRIBED_ERROR }, 409)
    }
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
