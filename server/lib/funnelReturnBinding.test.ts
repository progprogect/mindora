import assert from 'node:assert/strict'
import { after, describe, it } from 'node:test'
import { eq } from 'drizzle-orm'

/**
 * Sub Out: the landing has no email field (the buyer types it on Stripe), so the funnel token starts without a user.
 * After the Stripe return the page token must know the buyer, or `/api/funnel/subscribe` answers `funnel_user_missing`.
 * Needs a throwaway Postgres: `FUNNEL_DB_TESTS=1 DATABASE_URL=postgres://… npm test` (migrations applied).
 */
const enabled = process.env.FUNNEL_DB_TESTS === '1' && Boolean(process.env.DATABASE_URL)

describe('funnel token after the Stripe return (Sub Out)', { skip: !enabled }, async () => {
  process.env.STRIPE_SECRET_KEY ||= 'sk_test_stub'
  process.env.SESSION_SECRET ||= 'test-secret-1234567890'
  const { db, pool } = await import('../db/index.js')
  const { users } = await import('../db/schema.js')
  const { getStripe } = await import('./stripe.js')
  const { funnelPageRoutes } = await import('../routes/funnelPages.js')
  const { createFunnelSession, signFunnelToken, verifyFunnelToken } = await import('./funnelToken.js')

  const stamp = Date.now()
  const email = `return-${stamp}@example.test`
  const stripe = getStripe() as unknown as Record<string, any>
  const checkoutId = `cs_return_${stamp}`
  const session = createFunnelSession({ kit: 'starter', flow: 'sub_out', step: 'membership', lang: 'en' })

  stripe.paymentIntents.retrieve = async () => ({ payment_method: 'pm_stub' })
  stripe.paymentMethods.attach = async () => ({})
  stripe.customers.update = async () => ({})
  stripe.checkout.sessions.retrieve = async () => ({
    id: checkoutId,
    mode: 'payment',
    payment_status: 'paid',
    customer: `cus_return_${stamp}`,
    payment_intent: `pi_return_${stamp}`,
    amount_total: 100,
    created: Math.floor(Date.now() / 1000),
    customer_details: { email: ` ${email.toUpperCase()} `, name: 'Masha' },
    metadata: { kit: 'starter', flow: 'sub_out', lang: 'en', funnel_sid: session.sid },
  })

  after(async () => {
    await db.delete(users).where(eq(users.email, email))
    await pool.end()
  })

  const funnelOf = (html: string) => {
    const m = html.match(/window\.FUNNEL=(\{.*?\});<\/script>/s)
    assert.ok(m, 'page carries window.FUNNEL')
    return JSON.parse(m![1]!.replace(/\\u003c/g, '<'))
  }

  it('the page token knows the buyer (email, name, user id) after the return from Stripe', async () => {
    assert.equal(session.email, undefined)
    assert.equal(session.userId, undefined)
    const token = signFunnelToken(session)
    const res = await funnelPageRoutes.request(
      `/account/membership?token=${encodeURIComponent(token)}&session_id=${checkoutId}`,
    )
    assert.equal(res.status, 200)
    const funnel = funnelOf(await res.text())
    const bound = verifyFunnelToken(funnel.token)
    assert.ok(bound)
    assert.equal(bound.email, email)
    assert.equal(bound.name, 'Masha')
    const [user] = await db.select().from(users).where(eq(users.email, email))
    assert.ok(user, 'the account was created by the return fulfilment')
    assert.equal(bound.userId, user.id)
    assert.equal(bound.flow, 'sub_out')
    assert.equal(bound.step, 'membership')
  })

  it('a reload (webhook already fulfilled the Checkout) still binds the buyer', async () => {
    const token = signFunnelToken(session)
    const res = await funnelPageRoutes.request(
      `/account/membership?token=${encodeURIComponent(token)}&session_id=${checkoutId}`,
    )
    const bound = verifyFunnelToken(funnelOf(await res.text()).token)
    assert.equal(bound?.email, email)
    assert.ok(bound?.userId)
  })
})
