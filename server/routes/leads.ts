import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'
import { db } from '../db/index.js'
import { leads, leadSurveyData } from '../db/schema.js'

const captureSchema = z.object({
  email: z.string().min(1),
  funnel: z.string().min(1),
  consent: z.boolean(),
})

const nameSchema = z.object({
  email: z.string().min(1),
  name: z.string().min(1),
  funnel: z.string().optional(),
})

const surveySchema = z.object({
  email: z.string().min(1),
  funnel: z.string().min(1),
  answers: z.string(),
  role: z.string(),
  profileScore: z.number(),
  scoreLabel: z.string(),
  archetype: z.string(),
})

const checkoutInitiatedSchema = z.object({
  email: z.string().min(1),
  funnel: z.string().min(1),
})

export const leadRoutes = new Hono()

leadRoutes.post('/leads', async (c) => {
  const parsed = captureSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  const { email, funnel, consent } = parsed.data
  const [existing] = await db.select().from(leads).where(eq(leads.email, email)).limit(1)
  if (existing) {
    await db.update(leads).set({ consent, funnel }).where(eq(leads.id, existing.id))
    return c.json({ id: existing.id })
  }
  const [inserted] = await db.insert(leads).values({ email, funnel, consent }).returning({ id: leads.id })
  return c.json({ id: inserted?.id })
})

leadRoutes.patch('/leads/name', async (c) => {
  const parsed = nameSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  const { email, name, funnel } = parsed.data
  const [existing] = await db.select().from(leads).where(eq(leads.email, email)).limit(1)
  if (!existing) {
    const [inserted] = await db
      .insert(leads)
      .values({ email, name, funnel: funnel ?? '28-day-ai-challenge', consent: true })
      .returning({ id: leads.id })
    return c.json({ id: inserted?.id })
  }
  await db.update(leads).set({ name }).where(eq(leads.id, existing.id))
  return c.json({ id: existing.id })
})

leadRoutes.post('/survey', async (c) => {
  const parsed = surveySchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  const args = parsed.data
  const [existing] = await db.select().from(leadSurveyData).where(eq(leadSurveyData.email, args.email)).limit(1)
  if (existing) {
    await db
      .update(leadSurveyData)
      .set({
        funnel: args.funnel,
        answers: args.answers,
        role: args.role,
        profileScore: Math.round(args.profileScore),
        scoreLabel: args.scoreLabel,
        archetype: args.archetype,
      })
      .where(eq(leadSurveyData.id, existing.id))
    return c.json({ id: existing.id })
  }
  const [inserted] = await db
    .insert(leadSurveyData)
    .values({ ...args, profileScore: Math.round(args.profileScore) })
    .returning({ id: leadSurveyData.id })
  return c.json({ id: inserted?.id })
})

leadRoutes.post('/survey/checkout-initiated', async (c) => {
  const parsed = checkoutInitiatedSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  const [existing] = await db.select().from(leadSurveyData).where(eq(leadSurveyData.email, parsed.data.email)).limit(1)
  if (!existing) return c.json({ id: null })
  await db
    .update(leadSurveyData)
    .set({ checkoutInitiated: true, funnel: parsed.data.funnel })
    .where(eq(leadSurveyData.id, existing.id))
  return c.json({ id: existing.id })
})
