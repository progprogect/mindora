import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { recoveryLink } from './funnelAccess.js'
import { RECOVERY_TTL_MS, verifyFunnelToken } from './funnelToken.js'

describe('recoveryLink', () => {
  const link = recoveryLink({
    kit: 'starter',
    flow: 'sub_in',
    email: ' Buyer@Example.COM ',
    name: 'Masha',
    userId: 'u1',
    lang: 'ru',
    origin: 'https://example.test',
  })
  const url = new URL(link)

  it('opens the localized verify page', () => {
    assert.equal(url.origin, 'https://example.test')
    assert.equal(url.pathname, '/ru/account/verify')
  })

  it('carries a 5-day verify-only token for the normalized email', () => {
    const session = verifyFunnelToken(url.searchParams.get('token'))
    assert.ok(session)
    assert.equal(session.step, 'verify')
    assert.equal(session.recovery, true)
    assert.equal(session.flow, 'sub_in')
    assert.equal(session.email, 'buyer@example.com')
    assert.ok(session.exp - Date.now() > RECOVERY_TTL_MS - 5_000)
    assert.equal(RECOVERY_TTL_MS, 5 * 24 * 60 * 60 * 1000)
  })
})
