/** Canonical LMS: `authorisation/server`. Railway mirror — do not add LMS features here. */
import { Hono } from 'hono'
import { listPurchases } from '../lib/purchases.js'
import { requireAuth, type SessionEnv } from '../lib/session.js'

export const purchaseRoutes = new Hono<SessionEnv>()

purchaseRoutes.get('/purchases', requireAuth, async (c) => {
  const rows = await listPurchases(c.get('userId'))
  return c.json({
    purchases: rows.map((row) => ({
      sku: row.sku,
      createdAt: row.createdAt.getTime(),
    })),
  })
})

purchaseRoutes.get('/certificates', requireAuth, async (c) => {
  return c.json({ certificates: [] })
})
