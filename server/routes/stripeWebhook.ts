/** LMS add-on (`metadata.offerSlug`) canonical: `authorisation/server`. This file remains the Railway trial+addon webhook. */
import { eq } from 'drizzle-orm'
import type { Context } from 'hono'
import type Stripe from 'stripe'
import { db } from '../db/index.js'
import { processedStripePayments, products, profiles } from '../db/schema.js'
import { loadEnv } from '../env.js'
import { getStripe, isPlaceholderPrice } from '../lib/stripe.js'
import { findUserIdByEmail, linkStripeCustomer } from '../lib/subscription.js'

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
  const customerId = typeof object.customer === 'string' ? object.customer : ''
  const paymentMethod = typeof object.payment_method === 'string' ? object.payment_method : ''
  const metadata = (object.metadata as Record<string, string> | undefined) ?? {}

  if (!paymentIntentId) return

  const [existing] = await db
    .select()
    .from(processedStripePayments)
    .where(eq(processedStripePayments.paymentIntentId, paymentIntentId))
    .limit(1)
  if (existing) {
    console.log('[stripe webhook] payment_intent already processed', paymentIntentId)
    return
  }

  if (metadata.offerSlug) {
    await db.insert(processedStripePayments).values({
      paymentIntentId,
      customerId,
      email: metadata.email,
    })
    return
  }

  let subscriptionId: string | undefined
  let created: Stripe.Subscription | undefined
  const priceId = await resolveSubscriptionPriceId(metadata.productId)
  if (customerId && paymentMethod && priceId) {
    try {
      const stripe = getStripe()
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        default_payment_method: paymentMethod,
        items: [{ price: priceId }],
        trial_period_days: 7,
        metadata: {
          funnel: metadata.funnel ?? '28-day-ai-challenge',
          paymentIntentId,
        },
      })
      subscriptionId = subscription.id
      created = subscription
    } catch (error) {
      console.error('[stripe webhook] failed to create subscription', error)
    }
  } else {
    console.log('[stripe webhook] skipping subscription — missing customer, PM, or Price ID', {
      customerId,
      paymentMethod,
      priceId,
    })
  }

  await db.insert(processedStripePayments).values({
    paymentIntentId,
    customerId,
    subscriptionId,
    email: metadata.email,
  })

  if (customerId && metadata.email) {
    const userId = await findUserIdByEmail(metadata.email)
    if (userId) await linkStripeCustomer(userId, customerId, created)
  }
}

async function syncSubscriptionObject(object: Record<string, unknown>) {
  const customerId = typeof object.customer === 'string' ? object.customer : ''
  if (!customerId) return
  const [profile] = await db.select().from(profiles).where(eq(profiles.stripeCustomerId, customerId)).limit(1)
  if (!profile) return
  await linkStripeCustomer(profile.userId, customerId, object as unknown as Stripe.Subscription)
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

  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentIntentSucceeded(event.data.object)
      break
    case 'setup_intent.succeeded': {
      const metadata = (event.data.object.metadata as Record<string, string> | undefined) ?? {}
      console.log('[stripe webhook] setup_intent.succeeded', metadata)
      break
    }
    case 'invoice.paid':
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
    default:
      console.log('[stripe webhook] unhandled event', event.type)
  }

  return c.json({ received: true })
}
