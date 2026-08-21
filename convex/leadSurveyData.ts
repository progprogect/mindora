import { mutationGeneric } from 'convex/server'
import { v } from 'convex/values'

/**
 * `leadSurveyData.saveSurveyData` — called right after the email is
 * captured, persisting the full quiz answer set + computed profile so it
 * survives even if the user abandons the sales funnel.
 */
export const saveSurveyData = mutationGeneric({
  args: {
    email: v.string(),
    funnel: v.string(),
    answers: v.string(),
    role: v.string(),
    profileScore: v.number(),
    scoreLabel: v.string(),
    archetype: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('leadSurveyData')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .unique()

    if (existing) {
      await ctx.db.patch(existing._id, {
        funnel: args.funnel,
        answers: args.answers,
        role: args.role,
        profileScore: args.profileScore,
        scoreLabel: args.scoreLabel,
        archetype: args.archetype,
      })
      return existing._id
    }

    return ctx.db.insert('leadSurveyData', {
      ...args,
      createdAt: Date.now(),
    })
  },
})

/**
 * `leadSurveyData.trackCheckoutInitiated` — flips a flag when the user
 * reaches the pricing step (salesStep 5) so abandoned-checkout follow-up can
 * be built on top of this table later.
 */
export const trackCheckoutInitiated = mutationGeneric({
  args: {
    email: v.string(),
    funnel: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('leadSurveyData')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .unique()

    if (!existing) return null

    await ctx.db.patch(existing._id, { checkoutInitiated: true, funnel: args.funnel })
    return existing._id
  },
})
