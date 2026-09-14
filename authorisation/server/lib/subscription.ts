import { and, desc, eq, isNull } from 'drizzle-orm'
import type Stripe from 'stripe'
import { db } from '../db/index.js'
import { profiles, subscriptions, users } from '../db/schema.js'
import { loadEnv } from '../env.js'
import { planLabelFromFunnel, sendCancellationEmail, sendTrialWelcomeEmail } from './mail.js'
import { getStripe } from './stripe.js'

export type SubscriptionDto = {
  status: string
  currentPeriodEnd: number | null
  cancelAtPeriodEnd: boolean
  cancellable: boolean
  isYearly: boolean
}

export class BillingError extends Error {
  status: 400 | 409 | 503

  constructor(message: string, status: 400 | 409 | 503) {
    super(message)
    this.name = 'BillingError'
    this.status = status
  }
}

const PAST_DUE = new Set(['past_due', 'unpaid', 'incomplete'])
const LIVE_SUB = new Set(['trialing', 'active'])
const BLOCKING_SUB_STATUSES = new Set(['active', 'trialing', 'past_due'])
const ANNUAL_OTO_CENTS = 5999

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

  const existing = await loadLocalSubscription(userId)

  if (existing) {
    await db.update(subscriptions).set(patch).where(eq(subscriptions.id, existing.id))
  } else {
    await db.insert(subscriptions).values({ userId, ...patch })
  }

  return {
    status: stripeSub.status,
    currentPeriodEnd,
    cancelAtPeriodEnd,
    cancellable: true,
    isYearly: stripeSubscriptionIsYearly(stripeSub),
  }
}

async function loadLocalSubscription(userId: string) {
  const [local] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .orderBy(desc(subscriptions.createdAt))
    .limit(1)
  return local ?? null
}

function dtoFromLocal(local: typeof subscriptions.$inferSelect): SubscriptionDto {
  return {
    status: local.status,
    currentPeriodEnd: local.renewsAt ? Math.floor(local.renewsAt.getTime() / 1000) : null,
    cancelAtPeriodEnd: local.cancelAtPeriodEnd,
    cancellable: stripeConfigured() && Boolean(local.stripeSubscriptionId),
    isYearly: false,
  }
}

export async function findStripeCustomerId(userId: string, email: string): Promise<string | null> {
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

/** OTP / completeProfile: find Stripe customer by email and upsert local subscription. Never throws. */
export async function attachStripeCustomer(userId: string, email: string): Promise<void> {
  const normalised = email.trim().toLowerCase()
  if (!userId || !normalised) return
  try {
    await findStripeCustomerId(userId, normalised)
    await getMine(userId, normalised)
  } catch (error) {
    console.error('[subscription] attachStripeCustomer failed', error)
  }
}

export async function getMine(userId: string, email: string): Promise<SubscriptionDto | null> {
  const local = await loadLocalSubscription(userId)

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
  return dtoFromLocal(local)
}

export async function createPortalSession(userId: string, email: string, returnUrl: string) {
  if (!stripeConfigured()) {
    throw new BillingError('Billing is not configured on this environment.', 503)
  }
  const customerId = await findStripeCustomerId(userId, email)
  if (!customerId) {
    throw new BillingError('No billing customer is linked to this account yet.', 409)
  }
  try {
    const stripe = getStripe()
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })
    return { url: session.url }
  } catch (error) {
    throw toBillingError(error, 'Could not open the billing portal.')
  }
}

export async function cancelOwnSubscription(userId: string, email: string) {
  if (!stripeConfigured()) {
    throw new BillingError('Billing is not configured on this environment.', 503)
  }
  const mine = await getMine(userId, email)
  const local = await loadLocalSubscription(userId)
  if (!local?.stripeSubscriptionId) {
    throw new BillingError(
      "No Stripe subscription is linked to this account. Cancel isn't available until billing is connected.",
      409,
    )
  }

  const stripe = getStripe()
  const status = mine?.status ?? local.status
  const immediate = PAST_DUE.has(status) || status === 'canceled'

  try {
    const updated = immediate
      ? await stripe.subscriptions.cancel(local.stripeSubscriptionId)
      : await stripe.subscriptions.update(local.stripeSubscriptionId, { cancel_at_period_end: true })
    const dto = await upsertLocal(userId, updated)
    try {
      await notifyScheduledCancellation(userId, email, accessUntilFromUnix(dto.currentPeriodEnd))
    } catch (error) {
      console.error('[cancel-mail]', error)
    }
    return { immediate: Boolean(immediate || updated.status === 'canceled') }
  } catch (error) {
    throw toBillingError(error, 'Stripe could not cancel this subscription.')
  }
}

function accessUntilFromUnix(unix: number | null): Date {
  return unix ? new Date(unix * 1000) : new Date()
}

/** One Cancellation confirmed email per subscription row. Resend failure does not roll back Stripe. */
export async function notifyScheduledCancellation(userId: string, email: string, accessUntil: Date): Promise<void> {
  const to = email.trim().toLowerCase()
  if (!userId || !to) return
  const local = await loadLocalSubscription(userId)
  if (!local || local.cancelEmailSentAt) return

  const claimed = await db
    .update(subscriptions)
    .set({ cancelEmailSentAt: new Date() })
    .where(and(eq(subscriptions.id, local.id), isNull(subscriptions.cancelEmailSentAt)))
    .returning({ id: subscriptions.id })
  if (!claimed[0]) return

  try {
    await sendCancellationEmail({ to, accessUntil })
  } catch (error) {
    console.error('[cancel-mail]', error)
  }
}

async function loadOrCreateProfile(userId: string, email: string) {
  const [existing] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
  if (existing) return existing
  try {
    const [created] = await db.insert(profiles).values({ userId, name: '', email }).returning()
    return created ?? null
  } catch (error) {
    console.error('[welcome-mail] profile insert raced', error)
    const [again] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
    return again ?? null
  }
}

async function funnelFromStripe(userId: string): Promise<string | undefined> {
  const local = await loadLocalSubscription(userId)
  if (!local?.stripeSubscriptionId || !stripeConfigured()) return undefined
  try {
    const remote = await getStripe().subscriptions.retrieve(local.stripeSubscriptionId)
    return remote.metadata?.funnel || undefined
  } catch (error) {
    console.error('[welcome-mail] stripe funnel lookup failed', error)
    return undefined
  }
}

/** First OTP after a live trial: one welcome email. Repeat logins do not send again. */
export async function maybeSendTrialWelcomeEmail(userId: string, email: string): Promise<void> {
  const to = email.trim().toLowerCase()
  if (!userId || !to) return

  const mine = await getMine(userId, to)
  if (!mine || !BLOCKING_SUB_STATUSES.has(mine.status)) return

  const profile = await loadOrCreateProfile(userId, to)
  if (!profile || profile.trialWelcomeEmailSentAt) return

  const claimed = await db
    .update(profiles)
    .set({ trialWelcomeEmailSentAt: new Date() })
    .where(and(eq(profiles.id, profile.id), isNull(profiles.trialWelcomeEmailSentAt)))
    .returning({ id: profiles.id })
  if (!claimed[0]) return

  const planLabel = planLabelFromFunnel(profile.funnelSource || (await funnelFromStripe(userId)))
  try {
    await sendTrialWelcomeEmail({ to, planLabel })
  } catch (error) {
    console.error('[welcome-mail]', error)
  }
}

function toBillingError(error: unknown, fallback: string): BillingError {
  if (error instanceof BillingError) return error
  const message = error instanceof Error && error.message ? error.message : fallback
  if (/not configured/i.test(message)) {
    return new BillingError('Billing is not configured on this environment.', 503)
  }
  if (/^No subscription$/i.test(message)) {
    return new BillingError(
      "No Stripe subscription is linked to this account. Cancel isn't available until billing is connected.",
      409,
    )
  }
  return new BillingError(message, 400)
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

export function stripeSubscriptionIsYearly(sub: Stripe.Subscription): boolean {
  return sub.items.data.some((item) => {
    const price = item.price
    const rec = price?.recurring
    if (rec?.interval === 'year') return true
    if (rec?.interval === 'month' && (rec.interval_count ?? 1) >= 12) return true
    const product = price?.product
    const productBits =
      typeof product === 'string'
        ? product
        : product && !product.deleted
          ? `${product.id} ${product.name ?? ''} ${product.metadata?.plan ?? ''} ${product.metadata?.interval ?? ''}`
          : ''
    const hay = [price?.id, price?.nickname, price?.lookup_key, productBits].join(' ').toLowerCase()
    return /\bannual\b|\byearly\b|12month|12-month|12_month/.test(hay)
  })
}

export type SwitchAnnualResult =
  | { success: true; alreadyPurchased: boolean }
  | { success: false; reason: string; error: string }

const ANNUAL_CONFIG_ERROR =
  'This annual upgrade is not available yet. Keep your monthly plan for now — you can switch later, and nothing is lost.'

async function liveStripeSubscription(userId: string, email: string): Promise<Stripe.Subscription | null> {
  if (!stripeConfigured()) return null
  const stripe = getStripe()
  const local = await loadLocalSubscription(userId)
  if (local?.stripeSubscriptionId) {
    try {
      const remote = await stripe.subscriptions.retrieve(local.stripeSubscriptionId)
      if (LIVE_SUB.has(remote.status)) return remote
    } catch (error) {
      console.error('[subscription] retrieve for annual switch failed', error)
    }
  }
  const customerId = await findStripeCustomerId(userId, email)
  if (!customerId) return null
  const listed = await stripe.subscriptions.list({ customer: customerId, status: 'all', limit: 10 })
  const live = [...listed.data]
    .filter((sub) => LIVE_SUB.has(sub.status))
    .sort((a, b) => (b.created ?? 0) - (a.created ?? 0))
  return live[0] ?? null
}

function otoPriceLooksRight(price: Stripe.Price): boolean {
  if (price.unit_amount !== ANNUAL_OTO_CENTS) return false
  const rec = price.recurring
  if (!rec) return false
  if (rec.interval === 'year') return true
  return rec.interval === 'month' && (rec.interval_count ?? 1) >= 12
}

/** Trial stays. Does not write vault/planner SKUs. Caller records upsell_events. */
export async function switchToAnnualPrice(userId: string, email: string): Promise<SwitchAnnualResult> {
  const priceId = loadEnv().STRIPE_ANNUAL_OTO_PRICE_ID.trim()
  if (!stripeConfigured() || !priceId) {
    return { success: false, reason: 'configError', error: ANNUAL_CONFIG_ERROR }
  }

  const stripe = getStripe()
  let otoPrice: Stripe.Price
  try {
    otoPrice = await stripe.prices.retrieve(priceId)
  } catch (error) {
    console.error('[subscription] annual OTO price lookup failed', error)
    return { success: false, reason: 'configError', error: ANNUAL_CONFIG_ERROR }
  }
  if (!otoPriceLooksRight(otoPrice)) {
    console.error('[subscription] STRIPE_ANNUAL_OTO_PRICE_ID is not $59.99/year', {
      unit_amount: otoPrice.unit_amount,
      interval: otoPrice.recurring?.interval,
      interval_count: otoPrice.recurring?.interval_count,
    })
    return { success: false, reason: 'configError', error: ANNUAL_CONFIG_ERROR }
  }

  const remote = await liveStripeSubscription(userId, email)
  if (!remote) {
    return {
      success: false,
      reason: 'configError',
      error: 'No active subscription is linked to this account yet. Keep your monthly plan for now.',
    }
  }
  if (stripeSubscriptionIsYearly(remote) || remote.items.data.some((item) => item.price?.id === priceId)) {
    await upsertLocal(userId, remote)
    return { success: true, alreadyPurchased: true }
  }

  const item = remote.items.data[0]
  if (!item?.id) {
    return { success: false, reason: 'configError', error: ANNUAL_CONFIG_ERROR }
  }

  try {
    const updated = await stripe.subscriptions.update(remote.id, {
      items: [{ id: item.id, price: priceId }],
      proration_behavior: 'none',
      metadata: {
        ...remote.metadata,
        offerSlug: 'annual-upgrade',
      },
    })
    await upsertLocal(userId, updated)
    return { success: true, alreadyPurchased: false }
  } catch (error) {
    throw toBillingError(error, 'Stripe could not switch this subscription to annual.')
  }
}
