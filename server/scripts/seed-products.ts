import '../loadDotenv.js'
import { eq } from 'drizzle-orm'
import { db, pool } from '../db/index.js'
import { products } from '../db/schema.js'
import { loadEnv } from '../env.js'

async function seed() {
  const env = loadEnv()
  const existing = await db.select().from(products)
  const defaults = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      stripePriceId: env.STRIPE_MONTHLY_PRICE_ID || 'price_REPLACE_MONTHLY',
      price: 2900,
      intervalMonths: 1,
      badge: null as string | null,
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

  let inserted = 0
  for (const product of defaults) {
    const already = existing.some((row) => row.intervalMonths === product.intervalMonths)
    if (already) continue
    const [clash] = await db.select().from(products).where(eq(products.id, product.id)).limit(1)
    if (clash) continue
    await db.insert(products).values(product)
    inserted += 1
  }

  console.log(`[seed] skipped=${inserted === 0} count=${existing.length + inserted} inserted=${inserted}`)
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
