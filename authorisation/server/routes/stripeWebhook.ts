import { eq } from 'drizzle-orm'
import type { Context } from 'hono'
import type Stripe from 'stripe'
import { db } from '../db/index.js'
import { profiles } from '../db/schema.js'
import { loadEnv } from '../env.js'
import { recordPurchase } from '../lib/purchases.js'
import { getStripe } from '../lib/stripe.js'
import { linkStripeCustomer } from '../lib/subscription.js'

async function fulfillOfferFromMetadata(metadata: Record<string, string> | undefined): Promise<void> {
  if (!metadata?.offerSlug) return
  const userId = metadata.userId
  if (!userId) {
    console.log('[stripe webhook] offerSlug without userId', metadata.offerSlug)
    return
  }
  await recordPurchase(userId, metadata.offerSlug)
}

async function handlePaymentIntentSucceeded(object: Record<string, unknown>): Promise<void> {
  const metadata = (object.metadata as Record<string, string> | undefined) ?? {}
  if (!metadata.offerSlug) {
    console.log('[stripe webhook] ignoring trial/funnel payment_intent (canonical funnel: github/server)')
    return
  }
  await fulfillOfferFromMetadata(metadata)
}

async function handleCheckoutSessionCompleted(object: Record<string, unknown>): Promise<void> {
  if (object.mode !== 'payment') return
  if (object.payment_status && object.payment_status !== 'paid') return
  const metadata = (object.metadata as Record<string, string> | undefined) ?? {}
  if (!metadata.offerSlug) {
    console.log('[stripe webhook] ignoring checkout.session without offerSlug')
    return
  }
  await fulfillOfferFromMetadata(metadata)
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
    case 'checkout.session.completed':
      await handleCheckoutSessionCompleted(event.data.object)
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
