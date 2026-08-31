import { eq } from 'drizzle-orm'
import type { Context } from 'hono'
import type Stripe from 'stripe'
import { recordPurchase } from 'successwise-app/purchases'
import { db } from '../db/index.js'
import { processedStripePayments, products, profiles } from '../db/schema.js'
import { loadEnv } from '../env.js'
import { getStripe, isPlaceholderPrice } from '../lib/stripe.js'
import { findUserIdByEmail, linkStripeCustomer } from '../lib/subscription.js'

/** Stripe webhook payloads may send an id string or an expanded object. */
function stripeRefId(value: unknown): string {
  if (typeof value === 'string' && value) return value
  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id: unknown }).id
    if (typeof id === 'string') return id
  }
  return ''
}

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

  const created = await getStripe().subscriptions.create(
    {
      customer: customerId,
      default_payment_method: paymentMethod,
      items: [{ price: priceId }],
      trial_period_days: 7,
      metadata: {
        funnel: metadata.funnel ?? '28-day-ai-challenge',
        paymentIntentId,
      },
    },
    { idempotencyKey: `trial_sub_${paymentIntentId}` },
  )

  await markProcessedPayment(paymentIntentId, customerId, metadata.email, created.id)

  if (metadata.email) {
    const userId = await findUserIdByEmail(metadata.email)
    if (userId) await linkStripeCustomer(userId, customerId, created)
  }
}

async function syncSubscriptionObject(object: Record<string, unknown>) {
  const customerId = stripeRefId(object.customer)
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

  try {
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
  } catch (error) {
    console.error('[stripe webhook] handler failed', error)
    return c.json({ error: 'Webhook handler failed' }, 500)
  }

  return c.json({ received: true })
}
