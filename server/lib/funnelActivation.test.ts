import assert from 'node:assert/strict'
import { after, describe, it } from 'node:test'
import { eq } from 'drizzle-orm'

/** Needs a throwaway Postgres: `FUNNEL_DB_TESTS=1 DATABASE_URL=postgres://… npm test` (migrations applied). */
const enabled = process.env.FUNNEL_DB_TESTS === '1' && Boolean(process.env.DATABASE_URL)

describe('activation email queue', { skip: !enabled }, async () => {
  const { db, pool } = await import('../db/index.js')
  const { funnelActivationEmails, users } = await import('../db/schema.js')
  const { cancelActivationEmails, processDueActivationEmails, scheduleActivationEmail } = await import(
    './funnelActivation.js'
  )

  const stamp = Date.now()
  const email = `queue-${stamp}@example.test`
  const [user] = await db.insert(users).values({ email }).returning({ id: users.id })
  const userId = user!.id
  const base = { userId, email, kit: 'starter', flow: 'sub_in', locale: 'en' as const }

  after(async () => {
    await db.delete(users).where(eq(users.id, userId))
    await pool.end()
  })

  const row = (sid: string) =>
    db.select().from(funnelActivationEmails).where(eq(funnelActivationEmails.sid, sid)).then((r) => r[0])

  it('queues one row per funnel session (repeated webhook delivery is a no-op)', async () => {
    const sid = `sid-a-${stamp}`
    await scheduleActivationEmail({ ...base, sid })
    await scheduleActivationEmail({ ...base, sid })
    const rows = await db.select().from(funnelActivationEmails).where(eq(funnelActivationEmails.sid, sid))
    assert.equal(rows.length, 1)
    // default delay is 10 minutes: not due yet
    assert.ok(rows[0]!.sendAt.getTime() - Date.now() > 9 * 60 * 1000)
  })

  it('sends a due email exactly once even when two workers race', async () => {
    const sid = `sid-b-${stamp}`
    await scheduleActivationEmail({ ...base, sid, delayMs: -1000 })
    const [a, b] = await Promise.all([processDueActivationEmails(), processDueActivationEmails()])
    assert.equal(a + b, 1)
    const saved = await row(sid)
    assert.ok(saved?.sentAt)
    assert.equal(saved?.attempts, 1)
    assert.equal(await processDueActivationEmails(), 0)
  })

  it('does not send after the visitor activated the account', async () => {
    const sid = `sid-c-${stamp}`
    await scheduleActivationEmail({ ...base, sid, delayMs: -1000 })
    await cancelActivationEmails(userId)
    assert.equal(await processDueActivationEmails(), 0)
    const saved = await row(sid)
    assert.ok(saved?.cancelledAt)
    assert.equal(saved?.sentAt, null)
  })
})
