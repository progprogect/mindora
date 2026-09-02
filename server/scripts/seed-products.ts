import '../loadDotenv.js'
import { db, pool } from '../db/index.js'
import { products } from '../db/schema.js'
import { loadEnv } from '../env.js'

async function seed() {
  const env = loadEnv()
  const defaults = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      stripePriceId: env.STRIPE_MONTHLY_PRICE_ID || 'price_REPLACE_MONTHLY',
      price: 1999,
      intervalMonths: 1,
      badge: null as string | null,
      active: true,
    },
    {
      id: 'quarterly',
      name: 'Quarterly Plan',
      stripePriceId: env.STRIPE_QUARTERLY_PRICE_ID || 'price_REPLACE_QUARTERLY',
      price: 3897,
      intervalMonths: 3,
      badge: 'MOST POPULAR',
      active: true,
    },
    {
      id: 'annual',
      name: 'Annual Plan',
      stripePriceId: env.STRIPE_ANNUAL_PRICE_ID || 'price_REPLACE_ANNUAL',
      price: 8999,
      intervalMonths: 12,
      badge: 'BEST VALUE',
      active: true,
    },
    {
      id: '6month',
      name: '6-Month Plan',
      stripePriceId: env.STRIPE_SIX_MONTH_PRICE_ID || 'price_REPLACE_6MONTH',
      price: 14900,
      intervalMonths: 6,
      badge: 'MOST POPULAR',
      active: true,
    },
    {
      id: '12month',
      name: '12-Month Plan',
      stripePriceId: env.STRIPE_TWELVE_MONTH_PRICE_ID || 'price_REPLACE_12MONTH',
      price: 23900,
      intervalMonths: 12,
      badge: 'BEST VALUE',
      active: true,
    },
  ]

  for (const product of defaults) {
    await db
      .insert(products)
      .values(product)
      .onConflictDoUpdate({
        target: products.id,
        set: {
          name: product.name,
          stripePriceId: product.stripePriceId,
          price: product.price,
          intervalMonths: product.intervalMonths,
          badge: product.badge,
          active: product.active,
        },
      })
  }

  const rows = await db.select({ id: products.id }).from(products)
  console.log(`[seed] upserted=${defaults.length} count=${rows.length} ids=${rows.map((row) => row.id).join(',')}`)
}

seed()
  .then(async () => {
    await pool.end()
  })
  .catch(async (error: unknown) => {
    console.error('[seed] failed', error)
    await pool.end()
    process.exit(1)
  })
