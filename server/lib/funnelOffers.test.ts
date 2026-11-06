import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  funnelChargeIdempotencyKey,
  funnelSubscribeIdempotencyKey,
  membershipAmountCents,
  normalizeFunnelPlan,
  resolveFunnelUpsell,
} from './funnelOffers.js'

describe('resolveFunnelUpsell', () => {
  it('prices every offer on the server', () => {
    assert.equal(resolveFunnelUpsell('prompt_library', 'offer')?.amountCents, 997)
    assert.equal(resolveFunnelUpsell('planners_bundle', 'offer')?.amountCents, 495)
    assert.equal(resolveFunnelUpsell('mindora_coach', 'offer')?.amountCents, 1995)
  })

  it('only the coach has a downsell ($12.95)', () => {
    assert.equal(resolveFunnelUpsell('mindora_coach', 'downsell')?.amountCents, 1295)
    assert.equal(resolveFunnelUpsell('prompt_library', 'downsell'), null)
    assert.equal(resolveFunnelUpsell('planners_bundle', 'downsell'), null)
  })

  it('rejects unknown products', () => {
    assert.equal(resolveFunnelUpsell('free_money', 'offer'), null)
    assert.equal(resolveFunnelUpsell('', 'offer'), null)
  })

  it('keeps offer slugs and the state on the result', () => {
    const o = resolveFunnelUpsell('mindora_coach', 'downsell')
    assert.equal(o?.offerSlug, 'mindora-ai-coach')
    assert.equal(o?.state, 'downsell')
  })
})

describe('idempotency keys', () => {
  it('differ by state so a declined offer does not block the downsell', () => {
    assert.notEqual(
      funnelChargeIdempotencyKey('sid', 'mindora_coach', 'offer'),
      funnelChargeIdempotencyKey('sid', 'mindora_coach', 'downsell'),
    )
  })

  it('are stable for the same attempt (double click) and change after a failed attempt', () => {
    const k0 = funnelChargeIdempotencyKey('sid', 'prompt_library', 'offer', 0)
    assert.equal(k0, funnelChargeIdempotencyKey('sid', 'prompt_library', 'offer'))
    assert.notEqual(k0, funnelChargeIdempotencyKey('sid', 'prompt_library', 'offer', 1))
    assert.notEqual(
      funnelChargeIdempotencyKey('sid', 'prompt_library', 'offer', 1),
      funnelChargeIdempotencyKey('sid', 'prompt_library', 'offer', 2),
    )
  })

  it('are scoped to the funnel session and fit Stripe limit', () => {
    assert.notEqual(
      funnelChargeIdempotencyKey('a', 'prompt_library', 'offer'),
      funnelChargeIdempotencyKey('b', 'prompt_library', 'offer'),
    )
    assert.ok(funnelChargeIdempotencyKey('x'.repeat(400), 'prompt_library', 'offer', 3).length <= 255)
    assert.notEqual(funnelSubscribeIdempotencyKey('a', 'main'), funnelSubscribeIdempotencyKey('a', 'downsell'))
  })
})

describe('membership plans', () => {
  it('maps page plan ids and plan-doc names', () => {
    assert.equal(normalizeFunnelPlan('monthly_4999'), 'main')
    assert.equal(normalizeFunnelPlan('monthly_2999'), 'downsell')
    assert.equal(normalizeFunnelPlan('main'), 'main')
    assert.equal(normalizeFunnelPlan(' downsell '), 'downsell')
    assert.equal(normalizeFunnelPlan('monthly_1'), null)
  })

  it('has the amounts from the spec', () => {
    assert.equal(membershipAmountCents('main'), 4999)
    assert.equal(membershipAmountCents('downsell'), 2999)
  })
})
