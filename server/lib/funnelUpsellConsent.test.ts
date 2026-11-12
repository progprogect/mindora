import assert from 'node:assert/strict'
import { after, describe, it } from 'node:test'
import { eq } from 'drizzle-orm'

/**
 * Upsell consent (account-last funnels): the checkbox text sent with `/funnel/charge` is stored once per session+offer.
 * Needs a throwaway Postgres: `FUNNEL_DB_TESTS=1 DATABASE_URL=postgres://… npm test` (migrations applied).
 */
const enabled = process.env.FUNNEL_DB_TESTS === '1' && Boolean(process.env.DATABASE_URL)

describe('upsell consent is recorded', { skip: !enabled }, async () => {
  process.env.STRIPE_SECRET_KEY ||= 'sk_test_stub'
  process.env.SESSION_SECRET ||= 'test-secret-1234567890'
  const { db, pool } = await import('../db/index.js')
  const { funnelConsents, profiles, users } = await import('../db/schema.js')
  const { getStripe } = await import('./stripe.js')
  const { funnelBillingRoutes } = await import('../routes/funnelBilling.js')
  const { createFunnelSession, signFunnelToken } = await import('./funnelToken.js')

  const stamp = Date.now()
  const email = `upsell-consent-${stamp}@example.test`
  const [user] = await db.insert(users).values({ email }).returning({ id: users.id })
  const userId = user!.id
  await db.insert(profiles).values({ userId, email, name: 'Masha', stripeCustomerId: `cus_up_${stamp}` })

  const stripe = getStripe() as unknown as Record<string, any>
  stripe.customers.retrieve = async () => ({ deleted: false, invoice_settings: { default_payment_method: { id: 'pm_x', type: 'card' } } })
  stripe.paymentIntents.list = async () => ({ data: [] })
  // The charge itself fails after the consent step: that is enough to see what was stored.
  stripe.paymentIntents.create = async () => {
    throw new Error('card declined (stub)')
  }

  const session = createFunnelSession({ kit: 'starter', flow: 'sub_out', step: 'upsell_prompts', email, userId, lang: 'en' })
  const token = signFunnelToken(session)
  const text = 'By clicking "Continue", I confirm that I have read and accept the Terms of Use.'
  const post = (body: Record<string, unknown>) =>
    funnelBillingRoutes.request('/funnel/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '203.0.113.7' },
      body: JSON.stringify({ token, product: 'prompt_library', state: 'offer', ...body }),
    })
  const rows = () => db.select().from(funnelConsents).where(eq(funnelConsents.userId, userId))

  after(async () => {
    await db.delete(users).where(eq(users.id, userId))
    await pool.end()
  })

  it('stores the accepted text once per session and offer (a 3-D Secure retry re-posts it)', async () => {
    await post({ terms_accepted: text, lang: 'ru' })
    await post({ terms_accepted: text, lang: 'ru' })
    const stored = await rows()
    assert.equal(stored.length, 1)
    assert.equal(stored[0]!.plan, 'upsell:prompt_library:offer')
    assert.equal(stored[0]!.sid, session.sid)
    assert.equal(stored[0]!.consentText, text)
    assert.equal(stored[0]!.lang, 'ru')
    assert.equal(stored[0]!.ip, '203.0.113.7')
  })

  it('a different offer gets its own record, and a request without the text stores nothing', async () => {
    await post({ product: 'planners_bundle', terms_accepted: text })
    assert.equal((await rows()).length, 2)
    await post({ product: 'planners_bundle', state: 'offer' })
    await funnelBillingRoutes.request('/funnel/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, product: 'prompt_library', state: 'offer' }),
    })
    assert.equal((await rows()).length, 2, 'old funnels send no text, nothing extra is stored')
  })
})
