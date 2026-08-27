/** Canonical LMS: `authorisation/server`. Railway mirror — do not add LMS features here. */
import { desc, eq } from 'drizzle-orm'
import type Stripe from 'stripe'
import { db } from '../db/index.js'
import { profiles, subscriptions, users } from '../db/schema.js'
import { loadEnv } from '../env.js'
import { getStripe } from './stripe.js'

export type SubscriptionDto = {
  status: string
  currentPeriodEnd: number | null
  cancelAtPeriodEnd: boolean
}

const PAST_DUE = new Set(['past_due', 'unpaid', 'incomplete'])

function stripeConfigured() {
  return Boolean(loadEnv().STRIPE_SECRET_KEY)
}

function periodEndUnix(sub: Stripe.Subscription): number | null {
  const raw = sub as Stripe.Subscription & {
    current_period_end?: number
    items?: { data?: Array<{ current_period_end?: number }> }
  }
  if (typeof raw.current_period_end === 'number') return raw.current_period_end
  const itemEnd = raw.items?.data?.[0]?.current_period_end
  if (typeof itemEnd === 'number') return itemEnd
  if (typeof sub.trial_end === 'number') return sub.trial_end
  return null
}

async function upsertLocal(userId: string, stripeSub: Stripe.Subscription): Promise<SubscriptionDto> {
  const currentPeriodEnd = periodEndUnix(stripeSub)
  const renewsAt = currentPeriodEnd ? new Date(currentPeriodEnd * 1000) : null
  const cancelAtPeriodEnd = Boolean(stripeSub.cancel_at_period_end)
  const patch = {
    status: stripeSub.status,
    plan: 'pro',
    renewsAt,
    stripeSubscriptionId: stripeSub.id,
    cancelAtPeriodEnd,
  }

  const [existing] = await db.select().from(subscriptions).where(eq(subscriptions.userId, userId)).limit(1)

  if (existing) {
    await db.update(subscriptions).set(patch).where(eq(subscriptions.id, existing.id))
  } else {
    await db.insert(subscriptions).values({ userId, ...patch })
  }

  return {
    status: stripeSub.status,
    currentPeriodEnd,
    cancelAtPeriodEnd,
  }
}

async function findStripeCustomerId(userId: string, email: string): Promise<string | null> {
  const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
  if (profile?.stripeCustomerId) return profile.stripeCustomerId
  if (!stripeConfigured()) return null

  try {
    const stripe = getStripe()
    const search = await stripe.customers.search({
      query: `email:"${email.replace(/"/g, '')}"`,
    })
    const customerId = search.data[0]?.id
    if (customerId) {
      if (profile) {
        await db.update(profiles).set({ stripeCustomerId: customerId }).where(eq(profiles.id, profile.id))
      }
      return customerId
    }
  } catch (error) {
    console.error('[subscription] customer lookup failed', error)
  }
  return null
}

async function latestStripeSubscription(customerId: string): Promise<Stripe.Subscription | null> {
  if (!stripeConfigured()) return null
  const stripe = getStripe()
  const listed = await stripe.subscriptions.list({
    customer: customerId,
    status: 'all',
    limit: 10,
  })
  const ranked = [...listed.data].sort((a, b) => (b.created ?? 0) - (a.created ?? 0))
  return ranked[0] ?? null
}

export async function getMine(userId: string, email: string): Promise<SubscriptionDto | null> {
  const [local] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .orderBy(desc(subscriptions.createdAt))
    .limit(1)

  if (stripeConfigured()) {
    try {
      const stripe = getStripe()
      if (local?.stripeSubscriptionId) {
        const remote = await stripe.subscriptions.retrieve(local.stripeSubscriptionId)
        return upsertLocal(userId, remote)
      }
      const customerId = await findStripeCustomerId(userId, email)
      if (customerId) {
        const remote = await latestStripeSubscription(customerId)
        if (remote) return upsertLocal(userId, remote)
      }
    } catch (error) {
      console.error('[subscription] stripe sync failed', error)
    }
  }

  if (!local) return null
  return {
    status: local.status,
    currentPeriodEnd: local.renewsAt ? Math.floor(local.renewsAt.getTime() / 1000) : null,
    cancelAtPeriodEnd: local.cancelAtPeriodEnd,
  }
}

export async function createPortalSession(userId: string, email: string, returnUrl: string) {
  if (!stripeConfigured()) throw new Error('Stripe is not configured')
  const customerId = await findStripeCustomerId(userId, email)
  if (!customerId) throw new Error('No subscription')
  const stripe = getStripe()
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
  return { url: session.url }
}

export async function cancelOwnSubscription(userId: string, email: string) {
  if (!stripeConfigured()) throw new Error('Stripe is not configured')
  const mine = await getMine(userId, email)
  const [local] = await db.select().from(subscriptions).where(eq(subscriptions.userId, userId)).limit(1)
  if (!local?.stripeSubscriptionId) throw new Error('No subscription')

  const stripe = getStripe()
  const status = mine?.status ?? local.status
  const immediate = PAST_DUE.has(status) || status === 'canceled'

  const updated = immediate
    ? await stripe.subscriptions.cancel(local.stripeSubscriptionId)
    : await stripe.subscriptions.update(local.stripeSubscriptionId, { cancel_at_period_end: true })

  await upsertLocal(userId, updated)
  return { immediate: Boolean(immediate || updated.status === 'canceled') }
}

export async function linkStripeCustomer(userId: string, customerId: string, stripeSub?: Stripe.Subscription) {
  const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
  if (profile) {
    await db.update(profiles).set({ stripeCustomerId: customerId }).where(eq(profiles.id, profile.id))
  }
  if (stripeSub) await upsertLocal(userId, stripeSub)
}

export async function findUserIdByEmail(email: string): Promise<string | null> {
  const normalised = email.trim().toLowerCase()
  const [authUser] = await db.select().from(users).where(eq(users.email, normalised)).limit(1)
  if (authUser) return authUser.id
  const [profile] = await db.select().from(profiles).where(eq(profiles.email, normalised)).limit(1)
  return profile?.userId ?? null
}
