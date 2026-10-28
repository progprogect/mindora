/**
 * Local QA personas — different access levels without Stripe.
 * Login: OTP from API log (`[otp] email → code`). Re-run is idempotent.
 */
import { eq } from 'drizzle-orm'
import '../loadDotenv.js'
import { db, pool } from '../db/index.js'
import { profiles, purchases, subscriptions, users } from '../db/schema.js'
import { recordPurchase, skusForKit } from '../lib/purchases.js'

type Persona = {
  email: string
  name: string
  locale: 'en' | 'ru'
  kits?: Array<'starter' | 'guide' | 'claudecert' | 'challenge'>
  offerSkus?: string[]
  subscription?: { status: 'trialing' | 'active' | 'canceled'; plan?: string }
  note: string
}

const PERSONAS: Persona[] = [
  {
    email: 'local-locked@mindora.local',
    name: 'Locked Local',
    locale: 'en',
    note: 'Onboarded, no kit/sub — locked courses',
  },
  {
    email: 'local-kit-starter@mindora.local',
    name: 'Starter Kit',
    locale: 'en',
    kits: ['starter'],
    note: 'kit-starter → 6 courses + lets-get-productive planner',
  },
  {
    email: 'local-kit-guide@mindora.local',
    name: 'Guide Kit',
    locale: 'ru',
    kits: ['guide'],
    note: 'kit-guide → Claude / Excel / prompts',
  },
  {
    email: 'local-trial@mindora.local',
    name: 'Trial Member',
    locale: 'en',
    subscription: { status: 'trialing', plan: 'pro' },
    note: 'subscription trialing → full course catalog',
  },
  {
    email: 'local-full@mindora.local',
    name: 'Full Access',
    locale: 'en',
    kits: ['starter'],
    offerSkus: ['planner-bundle', 'ultimate-prompt-library', 'mindora-ai-coach'],
    subscription: { status: 'active', plan: 'pro' },
    note: 'active sub + planners + vault + coach',
  },
]

async function ensureUser(email: string): Promise<string> {
  const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1)
  if (existing) return existing.id
  const [created] = await db.insert(users).values({ email }).returning({ id: users.id })
  if (!created) throw new Error(`failed to create user ${email}`)
  return created.id
}

async function ensureProfile(userId: string, email: string, name: string, locale: 'en' | 'ru') {
  const [existing] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
  if (existing) {
    await db
      .update(profiles)
      .set({
        name,
        email,
        locale,
        onboardingComplete: true,
        planTier: existing.planTier ?? 'week4',
      })
      .where(eq(profiles.id, existing.id))
    return
  }
  await db.insert(profiles).values({
    userId,
    name,
    email,
    locale,
    onboardingComplete: true,
    planTier: 'week4',
  })
}

async function replacePurchases(userId: string, skus: string[]) {
  await db.delete(purchases).where(eq(purchases.userId, userId))
  for (const sku of skus) {
    await recordPurchase(userId, sku)
  }
}

async function ensureSubscription(
  userId: string,
  sub: { status: 'trialing' | 'active' | 'canceled'; plan?: string } | undefined,
) {
  await db.delete(subscriptions).where(eq(subscriptions.userId, userId))
  if (!sub) return
  const renewsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
  await db.insert(subscriptions).values({
    userId,
    status: sub.status,
    plan: sub.plan ?? 'pro',
    renewsAt,
    cancelAtPeriodEnd: false,
  })
}

async function seed() {
  console.log('[seed-local-personas] upserting QA accounts…')
  for (const persona of PERSONAS) {
    const userId = await ensureUser(persona.email)
    await ensureProfile(userId, persona.email, persona.name, persona.locale)

    const skus = new Set<string>()
    for (const kit of persona.kits ?? []) {
      for (const sku of skusForKit(kit)) skus.add(sku)
    }
    for (const sku of persona.offerSkus ?? []) skus.add(sku)
    await replacePurchases(userId, [...skus])
    await ensureSubscription(userId, persona.subscription)

    console.log(`  ✓ ${persona.email}`)
    console.log(`      ${persona.note}`)
  }
  console.log('\nLogin: http://localhost:5175/login')
  console.log('OTP appears in the API terminal as: [otp] email → code')
}

seed()
  .catch((error) => {
    console.error('[seed-local-personas] failed', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await pool.end()
  })
