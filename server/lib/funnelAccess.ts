import { eq, sql } from 'drizzle-orm'
import { hasSku } from 'successwise-app/purchases'
import { sendFunnelAccessEmail } from 'successwise-app/mail'
import { db } from '../db/index.js'
import { funnelAccessEmailLog, profiles } from '../db/schema.js'
import { publicOriginFromEnv } from './funnelOrigin.js'
import {
  createRecoverySession,
  type FunnelFlow,
  type FunnelKit,
  signFunnelToken,
} from './funnelToken.js'
import { withLocalePrefix } from './localePath.js'
import { findBlockingSubscription, findUserIdByEmail } from './subscription.js'

export type ExistingAccess = {
  userId: string
  hasKit: boolean
  hasSubscription: boolean
  name: string
}

/** First name already on the account (typed on the landing form / Stripe); the activation page must not ask again. */
export async function findKnownName(email: string): Promise<string> {
  const userId = await findUserIdByEmail(normalizeEmail(email))
  if (!userId) return ''
  const [profile] = await db.select({ name: profiles.name }).from(profiles).where(eq(profiles.userId, userId)).limit(1)
  return profile?.name?.trim() ?? ''
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

/** Does this email already own the Starter Kit, or already have an active / trialing Academy subscription? */
export async function findExistingAccess(email: string): Promise<ExistingAccess | null> {
  const userId = await findUserIdByEmail(normalizeEmail(email))
  if (!userId) return null
  const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
  const hasKit = await hasSku(userId, 'kit-starter')
  let hasSubscription = false
  if (profile?.stripeCustomerId) {
    try {
      hasSubscription = Boolean(await findBlockingSubscription(profile.stripeCustomerId))
    } catch (error) {
      console.error('[funnel] subscription lookup failed', error)
    }
  }
  return { userId, hasKit, hasSubscription, name: profile?.name ?? '' }
}

/** Signed 5-day link to `/account/verify` (email -> code -> name). It never signs the visitor in without the code. */
export function recoveryLink(input: {
  kit: FunnelKit
  flow?: FunnelFlow
  email: string
  name?: string
  userId?: string
  lang: 'en' | 'ru'
  origin?: string
}): string {
  const session = createRecoverySession({
    kit: input.kit,
    flow: input.flow,
    email: normalizeEmail(input.email),
    name: input.name,
    userId: input.userId,
    lang: input.lang,
  })
  const token = signFunnelToken(session)
  const path = withLocalePrefix(input.lang, `/account/verify?token=${encodeURIComponent(token)}`)
  return `${input.origin ?? publicOriginFromEnv()}${path}`
}

const ACCESS_EMAIL_COOLDOWN_MINUTES = 5

/**
 * Atomically takes the 5-minute slot for this address in Postgres, so every server instance shares one cooldown.
 * Returns the previous timestamp to restore if sending fails, or `false` when the cooldown is still running.
 */
export async function claimAccessEmailSlot(email: string): Promise<{ previous: Date | null } | false> {
  const key = normalizeEmail(email)
  const [before] = await db
    .select({ at: funnelAccessEmailLog.lastSentAt })
    .from(funnelAccessEmailLog)
    .where(eq(funnelAccessEmailLog.email, key))
    .limit(1)
  const claimed = await db
    .insert(funnelAccessEmailLog)
    .values({ email: key })
    .onConflictDoUpdate({
      target: funnelAccessEmailLog.email,
      set: { lastSentAt: sql`now()` },
      setWhere: sql`${funnelAccessEmailLog.lastSentAt} < now() - make_interval(mins => ${ACCESS_EMAIL_COOLDOWN_MINUTES})`,
    })
    .returning({ email: funnelAccessEmailLog.email })
  return claimed.length ? { previous: before?.at ?? null } : false
}

async function releaseAccessEmailSlot(email: string, previous: Date | null): Promise<void> {
  const key = normalizeEmail(email)
  if (previous) {
    await db.update(funnelAccessEmailLog).set({ lastSentAt: previous }).where(eq(funnelAccessEmailLog.email, key))
  } else {
    await db.delete(funnelAccessEmailLog).where(eq(funnelAccessEmailLog.email, key))
  }
}

/**
 * "You already have access" email. One per address per 5 minutes so the landing form cannot be used to spam
 * a mailbox; the caller answers the visitor the same way whether or not the email was sent.
 */
export async function sendExistingAccessEmail(input: {
  email: string
  access: ExistingAccess
  kit: FunnelKit
  flow?: FunnelFlow
  lang: 'en' | 'ru'
  origin?: string
}): Promise<boolean> {
  const key = normalizeEmail(input.email)
  let slot: Awaited<ReturnType<typeof claimAccessEmailSlot>>
  try {
    slot = await claimAccessEmailSlot(key)
  } catch (error) {
    console.error('[funnel] access email cooldown failed', key, error)
    return false
  }
  if (!slot) return false
  try {
    await sendFunnelAccessEmail({
      to: key,
      kind: 'access',
      locale: input.lang,
      link: recoveryLink({
        kit: input.kit,
        flow: input.flow,
        email: key,
        name: input.access.name,
        userId: input.access.userId,
        lang: input.lang,
        origin: input.origin,
      }),
    })
    return true
  } catch (error) {
    await releaseAccessEmailSlot(key, slot.previous).catch(() => {})
    console.error('[funnel] access email failed', key, error)
    return false
  }
}
