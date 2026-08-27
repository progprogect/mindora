import { Hono } from 'hono'
import { pool } from '../db/index.js'

export const healthRoutes = new Hono()

healthRoutes.get('/health', async (c) => {
  try {
    await pool.query('SELECT 1')
    return c.json({ ok: true, db: true })
  } catch (error) {
    console.error('[health] database unreachable', error)
    return c.json({ ok: false, db: false }, 503)
  }
})
