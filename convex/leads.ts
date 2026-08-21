import { mutationGeneric } from 'convex/server'
import { v } from 'convex/values'

/**
 * `leads.capture` — called from EmailScreen on submit.
 * Upserts by email so re-entering the funnel doesn't create duplicates.
 *
 * NOTE: written with the untyped `mutationGeneric` builder (see
 * https://docs.convex.dev — "Writing Convex functions without codegen") so
 * this project type-checks before `npx convex dev` has generated
 * `convex/_generated/*` for your deployment. Once you've run `npx convex
 * dev` you can optionally switch these to the generated `mutation`/`query`
 * helpers from `./_generated/server` for full end-to-end type safety.
 */
export const capture = mutationGeneric({
  args: {
    email: v.string(),
    funnel: v.string(),
    consent: v.boolean(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('leads')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .unique()

    if (existing) {
      await ctx.db.patch(existing._id, { consent: args.consent, funnel: args.funnel })
      return existing._id
    }

    return ctx.db.insert('leads', {
      email: args.email,
      funnel: args.funnel,
      consent: args.consent,
      createdAt: Date.now(),
    })
  },
})

/**
 * `leads.updateName` — called from NameCaptureScreen once the lead already
 * exists (created by `capture` on the previous screen).
 */
export const updateName = mutationGeneric({
  args: {
    email: v.string(),
    name: v.string(),
    funnel: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('leads')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .unique()

    if (!existing) {
      return ctx.db.insert('leads', {
        email: args.email,
        name: args.name,
        funnel: args.funnel ?? '28-day-ai-challenge',
        consent: true,
        createdAt: Date.now(),
      })
    }

    await ctx.db.patch(existing._id, { name: args.name })
    return existing._id
  },
})
