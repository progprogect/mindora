import assert from 'node:assert/strict'
import { after, describe, it } from 'node:test'
import { eq } from 'drizzle-orm'

/** Needs a throwaway Postgres: `FUNNEL_DB_TESTS=1 DATABASE_URL=postgres://… npm test` (migrations applied). */
const enabled = process.env.FUNNEL_DB_TESTS === '1' && Boolean(process.env.DATABASE_URL)

describe('access email cooldown (shared in Postgres)', { skip: !enabled }, async () => {
  const { db, pool } = await import('../db/index.js')
  const { funnelAccessEmailLog } = await import('../db/schema.js')
  const { claimAccessEmailSlot } = await import('./funnelAccess.js')
  const email = `cooldown-${Date.now()}@example.test`

  after(async () => {
    await db.delete(funnelAccessEmailLog).where(eq(funnelAccessEmailLog.email, email))
    await pool.end()
  })

  it('lets exactly one of 6 parallel claims through', async () => {
    const results = await Promise.all(Array.from({ length: 6 }, () => claimAccessEmailSlot(` ${email.toUpperCase()} `)))
    assert.equal(results.filter(Boolean).length, 1)
  })

  it('blocks again inside the window, allows after it expires', async () => {
    assert.equal(await claimAccessEmailSlot(email), false)
    await db
      .update(funnelAccessEmailLog)
      .set({ lastSentAt: new Date(Date.now() - 6 * 60 * 1000) })
      .where(eq(funnelAccessEmailLog.email, email))
    assert.ok(await claimAccessEmailSlot(email))
    assert.equal(await claimAccessEmailSlot(email), false)
  })
})
