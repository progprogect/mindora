import { Hono } from 'hono'
import { pool } from '../db/index.js'
import { loadEnv } from '../env.js'

export const healthRoutes = new Hono()

healthRoutes.get('/health', async (c) => {
  if (!loadEnv().DATABASE_URL) {
    return c.json({ ok: true, db: false })
  }
  try {
    await pool.query('SELECT 1')
    return c.json({ ok: true, db: true })
  } catch (error) {
    console.error('[health] database unreachable', error)
    // 200 keeps Railway from restart-looping; `db` is the readiness signal.
    return c.json({ ok: true, db: false })
  }
})
