import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'
import { db } from '../db/index.js'
import { profiles, users } from '../db/schema.js'
import { loadCurrentUser } from '../lib/currentUser.js'
import { requireAuth, type SessionEnv } from '../lib/session.js'
import { attachStripeCustomer } from '../lib/subscription.js'

const PLAN_TIERS = ['week1', 'week4', 'week12', 'free']

const profileSchema = z.object({
  name: z.string(),
  planTier: z.string(),
  quizAnswers: z.unknown().optional(),
  quizRole: z.string().optional(),
  funnelSource: z.string().optional(),
})

const onboardSchema = z.object({
  pacePreference: z.string(),
  focusCategory: z.string(),
})

const funnelSchema = z.object({
  funnelSource: z.string(),
  focusCategory: z.string().optional(),
})

const nameSchema = z.object({
  name: z.string().min(1).max(80),
})

const prefsSchema = z.object({
  pacePreference: z.string().optional(),
  focusCategory: z.string().optional(),
})

const syncEmailSchema = z.object({
  oldEmail: z.string(),
  newEmail: z.string(),
  funnel: z.string().optional(),
})

export const meRoutes = new Hono<SessionEnv>()

meRoutes.get('/me', requireAuth, async (c) => {
  const user = await loadCurrentUser(c.get('userId'))
  if (!user) return c.json({ error: 'Not authenticated' }, 401)
  return c.json(user)
})

meRoutes.patch('/me', requireAuth, async (c) => {
  const parsed = profileSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  const userId = c.get('userId')
  const [authUser] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
  const [existing] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
  const planTier = PLAN_TIERS.includes(parsed.data.planTier) ? parsed.data.planTier : 'free'
  const patch = {
    name: parsed.data.name || existing?.name || 'Friend',
    email: authUser?.email ?? existing?.email,
    planTier,
    quizAnswers: parsed.data.quizAnswers ?? existing?.quizAnswers,
    quizRole: parsed.data.quizRole ?? existing?.quizRole,
    funnelSource: parsed.data.funnelSource ?? existing?.funnelSource,
  }
  if (existing) {
    await db.update(profiles).set(patch).where(eq(profiles.id, existing.id))
    await attachStripeCustomer(userId, patch.email ?? '')
    return c.json({ id: existing.id })
  }
  const [inserted] = await db
    .insert(profiles)
    .values({ userId, onboardingComplete: false, ...patch })
    .returning({ id: profiles.id })
  await attachStripeCustomer(userId, patch.email ?? '')
  return c.json({ id: inserted?.id })
})

meRoutes.post('/me/onboard', requireAuth, async (c) => {
  const parsed = onboardSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  const userId = c.get('userId')
  const [existing] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
  const [authUser] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
  if (existing) {
    await db
      .update(profiles)
      .set({
        pacePreference: parsed.data.pacePreference,
        focusCategory: parsed.data.focusCategory,
        onboardingComplete: true,
      })
      .where(eq(profiles.id, existing.id))
    return c.json({ id: existing.id })
  }
  const [inserted] = await db
    .insert(profiles)
    .values({
      userId,
      name: authUser?.name ?? 'Friend',
      email: authUser?.email,
      pacePreference: parsed.data.pacePreference,
      focusCategory: parsed.data.focusCategory,
      onboardingComplete: true,
    })
    .returning({ id: profiles.id })
  return c.json({ id: inserted?.id })
})

meRoutes.patch('/me/funnel-source', requireAuth, async (c) => {
  const parsed = funnelSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  const userId = c.get('userId')
  const [existing] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
  if (!existing) return c.json({ id: null })
  await db
    .update(profiles)
    .set({
      funnelSource: parsed.data.funnelSource,
      ...(parsed.data.focusCategory ? { focusCategory: parsed.data.focusCategory } : {}),
    })
    .where(eq(profiles.id, existing.id))
  return c.json({ id: existing.id })
})

meRoutes.patch('/me/name', requireAuth, async (c) => {
  const parsed = nameSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  const userId = c.get('userId')
  const name = parsed.data.name.trim()
  await db.update(users).set({ name }).where(eq(users.id, userId))
  const [existing] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
  if (existing) await db.update(profiles).set({ name }).where(eq(profiles.id, existing.id))
  return c.json({ ok: true, name })
})

meRoutes.patch('/me/preferences', requireAuth, async (c) => {
  const parsed = prefsSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  const userId = c.get('userId')
  const [existing] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
  if (!existing) return c.json({ id: null })
  await db
    .update(profiles)
    .set({
      ...(parsed.data.pacePreference ? { pacePreference: parsed.data.pacePreference } : {}),
      ...(parsed.data.focusCategory ? { focusCategory: parsed.data.focusCategory } : {}),
    })
    .where(eq(profiles.id, existing.id))
  return c.json({ id: existing.id })
})

/** Wave 8 wires Stripe customer email. Keep the call site 1:1. */
meRoutes.post('/me/sync-email', requireAuth, async (c) => {
  const parsed = syncEmailSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  const userId = c.get('userId')
  const [existing] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1)
  if (existing && parsed.data.newEmail) {
    await db.update(profiles).set({ email: parsed.data.newEmail.trim().toLowerCase() }).where(eq(profiles.id, existing.id))
  }
  return c.json({ ok: true })
})
