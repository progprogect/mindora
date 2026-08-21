import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

/**
 * Convex schema — reconstructed from the API contracts observed in the
 * production client bundle (see docs/28_day_quiz/implementation-plan.md,
 * Этап 5). Written against `convex/server`'s generic builders so the
 * project type-checks and runs before `npx convex dev` has generated
 * `convex/_generated/*` for this deployment.
 */
export default defineSchema({
  leads: defineTable({
    email: v.string(),
    funnel: v.string(),
    consent: v.boolean(),
    name: v.optional(v.string()),
    createdAt: v.number(),
  }).index('by_email', ['email']),

  leadSurveyData: defineTable({
    email: v.string(),
    funnel: v.string(),
    answers: v.string(),
    role: v.string(),
    profileScore: v.number(),
    scoreLabel: v.string(),
    archetype: v.string(),
    checkoutInitiated: v.optional(v.boolean()),
    createdAt: v.number(),
  }).index('by_email', ['email']),

  products: defineTable({
    name: v.string(),
    stripePriceId: v.string(),
    price: v.number(),
    intervalMonths: v.number(),
    badge: v.optional(v.string()),
    active: v.boolean(),
  }).index('by_active', ['active']),

  checkoutOffers: defineTable({
    sessionKey: v.string(),
    percentOff: v.number(),
    createdAt: v.number(),
    expiresAt: v.number(),
  }).index('by_session_key', ['sessionKey']),
})
