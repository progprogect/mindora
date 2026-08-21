import { mutationGeneric, queryGeneric } from 'convex/server'

/**
 * `products.list` — read by SalesPlanScreen to render the 3 pricing cards.
 * Seed real Stripe Price IDs via `seedDefaultProducts` (or the Convex
 * dashboard) before enabling checkout — see README "Convex setup".
 */
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
 * One-off seed helper — run once from the Convex dashboard function runner
 * (or `npx convex run products:seedDefaultProducts`) after you have real
 * Stripe Price IDs. Safe to re-run: skips insertion if products already exist.
 */
export const seedDefaultProducts = mutationGeneric({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query('products').collect()
    if (existing.length > 0) {
      return { skipped: true, count: existing.length }
    }

    const defaults = [
      {
        name: 'Monthly Plan',
        stripePriceId: 'price_REPLACE_MONTHLY',
        price: 2900,
        intervalMonths: 1,
        active: true,
      },
      {
        name: '6-Month Plan',
        stripePriceId: 'price_REPLACE_6MONTH',
        price: 14900,
        intervalMonths: 6,
        badge: 'MOST POPULAR',
        active: true,
      },
      {
        name: '12-Month Plan',
        stripePriceId: 'price_REPLACE_12MONTH',
        price: 23900,
        intervalMonths: 12,
        badge: 'BEST VALUE',
        active: true,
      },
    ]

    for (const product of defaults) {
      await ctx.db.insert('products', product)
    }

    return { skipped: false, count: defaults.length }
  },
})
