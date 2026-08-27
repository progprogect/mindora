import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { db } from '../db/index.js'
import { products } from '../db/schema.js'

export const productRoutes = new Hono()

productRoutes.get('/products', async (c) => {
  const rows = await db.select().from(products).where(eq(products.active, true))
  return c.json(
    rows.map((row) => ({
      _id: row.id,
      name: row.name,
      stripePriceId: row.stripePriceId,
      price: row.price,
      intervalMonths: row.intervalMonths,
      badge: row.badge ?? undefined,
      active: row.active,
    })),
  )
})
