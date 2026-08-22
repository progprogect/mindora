import { internalQueryGeneric, mutationGeneric, queryGeneric } from 'convex/server'
import { v } from 'convex/values'

/**
 * `products.list` — read by SalesPlanScreen for the $1 trial (monthly) and
 * the expired-offer Monthly / 6-Month / 12-Month picker.
 * Seed real Stripe Price IDs via `seedDefaultProducts` (or the Convex
 * dashboard) before enabling checkout — see README "Convex setup".
 */
export const _getById = internalQueryGeneric({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    try {
      return await ctx.db.get(args.id as never)
    } catch {
      return null
    }
  },
})

export const _listActive = internalQueryGeneric({
  args: {},
  handler: async (ctx) => {
    return ctx.db
      .query('products')
      .withIndex('by_active', (q) => q.eq('active', true))
      .collect()
  },
})

export const list = queryGeneric({
  args: {},
  handler: async (ctx) => {
    return ctx.db
      .query('products')
      .withIndex('by_active', (q) => q.eq('active', true))
      .collect()
  },
})

/**
 * One-off seed helper — run from the Convex dashboard function runner
 * (or `npx convex run products:seedDefaultProducts`) after you have real
 * Stripe Price IDs. Safe to re-run: inserts only missing intervals (1 / 6 / 12).
 */
export const seedDefaultProducts = mutationGeneric({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query('products').collect()

    const defaults = [
      {
        name: 'Monthly Plan',
        stripePriceId: process.env.STRIPE_MONTHLY_PRICE_ID ?? 'price_REPLACE_MONTHLY',
        price: 2900,
        intervalMonths: 1,
        active: true,
      },
      {
        name: '6-Month Plan',
        stripePriceId: process.env.STRIPE_SIX_MONTH_PRICE_ID ?? 'price_REPLACE_6MONTH',
        price: 14900,
        intervalMonths: 6,
        badge: 'MOST POPULAR',
        active: true,
      },
      {
        name: '12-Month Plan',
        stripePriceId: process.env.STRIPE_TWELVE_MONTH_PRICE_ID ?? 'price_REPLACE_12MONTH',
        price: 23900,
        intervalMonths: 12,
        badge: 'BEST VALUE',
        active: true,
      },
    ]

    let inserted = 0
    for (const product of defaults) {
      const alreadyHasInterval = existing.some((row) => row.intervalMonths === product.intervalMonths)
      if (alreadyHasInterval) continue
      await ctx.db.insert('products', product)
      inserted += 1
    }

    return { skipped: inserted === 0, count: existing.length + inserted, inserted }
  },
})
