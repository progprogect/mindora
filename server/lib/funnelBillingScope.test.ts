import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

describe('activation link scope', async () => {
  process.env.STRIPE_SECRET_KEY ||= 'sk_test_scope_stub'
  const { funnelBillingRoutes } = await import('../routes/funnelBilling.js')
  const { createFunnelSession, createRecoverySession, signFunnelToken } = await import('./funnelToken.js')

  const call = (path: string, body: unknown) =>
    funnelBillingRoutes.request(path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
  const recovery = signFunnelToken(createRecoverySession({ kit: 'starter', flow: 'sub_in', email: 'a@example.test' }))

  it('cannot charge the saved card (one-click upsell)', async () => {
    const res = await call('/funnel/charge', { token: recovery, product: 'prompt_library', state: 'offer' })
    assert.equal(res.status, 403)
    assert.equal(((await res.json()) as { code: string }).code, 'recovery_scope')
  })

  it('cannot start the Academy subscription', async () => {
    const res = await call('/funnel/subscribe', { token: recovery, plan: 'monthly_4999', consent: 'I consent' })
    assert.equal(res.status, 403)
  })

  it('a normal funnel session is not blocked by the scope check', async () => {
    const normal = signFunnelToken(createFunnelSession({ kit: 'starter', flow: 'sub_in', step: 'upsell_prompts', email: 'a@example.test' }))
    const res = await call('/funnel/charge', { token: normal, product: 'nope', state: 'offer' })
    assert.equal(res.status, 400) // unknown offer: rejected for the offer, not for the token
  })
})
