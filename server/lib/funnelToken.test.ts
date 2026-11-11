import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  advanceFunnelSession,
  createFunnelSession,
  createRecoverySession,
  flowProgress,
  nextUrlAfter,
  RECOVERY_TTL_MS,
  signFunnelToken,
  stepIndex,
  verifyFunnelToken,
} from './funnelToken.js'

describe('funnel flows', () => {
  it('keeps the original order when there is no flow', () => {
    assert.equal(nextUrlAfter('verify', 'starter'), '/en/account/membership')
    assert.equal(nextUrlAfter('upsell_coach', 'starter'), '/en/account/onboard')
  })

  it('Sub Out: membership first, activation after the coach', () => {
    assert.equal(nextUrlAfter('membership', 'starter', 'en', 'sub_out'), '/en/account/upsell?step=prompts')
    assert.equal(nextUrlAfter('upsell_coach', 'starter', 'en', 'sub_out'), '/en/account/verify')
    assert.equal(nextUrlAfter('verify', 'starter', 'en', 'sub_out'), '/en/account/onboard')
  })

  it('Sub In: no membership step, upsells then activation', () => {
    assert.equal(stepIndex('membership', 'sub_in'), -1)
    assert.equal(stepIndex('upsell_prompts', 'sub_in'), 0)
    assert.equal(nextUrlAfter('upsell_coach', 'starter', 'en', 'sub_in'), '/en/account/verify')
  })

  it('reports the header step count per flow', () => {
    assert.deepEqual(flowProgress('sub_out'), { total: 6, accountStep: 6 })
    assert.deepEqual(flowProgress('sub_in'), { total: 5, accountStep: 5 })
  })

  it('round-trips flow through the signed token and still reads old tokens', () => {
    const withFlow = createFunnelSession({ kit: 'starter', flow: 'sub_in', step: 'upsell_prompts' })
    assert.equal(verifyFunnelToken(signFunnelToken(withFlow))?.flow, 'sub_in')
    const legacy = createFunnelSession({ kit: 'starter' })
    assert.equal(verifyFunnelToken(signFunnelToken(legacy))?.flow, undefined)
  })

  it('rejects a step that does not exist in the flow', () => {
    const bad = createFunnelSession({ kit: 'starter', flow: 'sub_in', step: 'membership' })
    assert.equal(verifyFunnelToken(signFunnelToken(bad)), null)
  })

  it('never moves a session backwards within a flow', () => {
    const s = createFunnelSession({ kit: 'starter', flow: 'sub_out', step: 'upsell_coach' })
    assert.equal(advanceFunnelSession(s, 'upsell_prompts').step, 'upsell_coach')
    assert.equal(advanceFunnelSession(s, 'verify').step, 'verify')
  })
})

describe('recovery session', () => {
  it('lives 5 days, opens verify, and becomes a normal session once advanced', () => {
    const r = createRecoverySession({ kit: 'starter', flow: 'sub_in', email: 'a@b.co' })
    assert.equal(r.step, 'verify')
    assert.equal(r.recovery, true)
    assert.ok(r.exp - Date.now() > RECOVERY_TTL_MS - 5_000)
    assert.equal(verifyFunnelToken(signFunnelToken(r))?.recovery, true)
    const next = advanceFunnelSession(r, 'onboard')
    assert.equal(next.recovery, undefined)
    assert.ok(next.exp - Date.now() < 3 * 60 * 60 * 1000)
  })
})
