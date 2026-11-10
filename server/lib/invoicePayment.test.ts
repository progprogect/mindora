import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { isInvoicePayment, isTrialFunnelPayment, stripeRefId } from './invoicePayment.js'

describe('stripeRefId', () => {
  it('reads string and expanded ids', () => {
    assert.equal(stripeRefId('in_1'), 'in_1')
    assert.equal(stripeRefId({ id: 'in_2' }), 'in_2')
    assert.equal(stripeRefId(null), '')
    assert.equal(stripeRefId(undefined), '')
    assert.equal(stripeRefId(''), '')
  })
})

describe('isInvoicePayment', () => {
  it('detects invoice id as string', () => {
    assert.equal(isInvoicePayment({ id: 'pi_1', invoice: 'in_1' }), true)
  })

  it('detects expanded invoice object', () => {
    assert.equal(isInvoicePayment({ id: 'pi_1', invoice: { id: 'in_1' } }), true)
  })

  it('detects subscription descriptions when invoice field is absent (clover API)', () => {
    assert.equal(isInvoicePayment({ id: 'pi_1', description: 'Subscription update' }), true)
    assert.equal(isInvoicePayment({ id: 'pi_1', description: 'Subscription creation' }), true)
  })

  it('does not flag the $1 trial funnel payment', () => {
    assert.equal(
      isInvoicePayment({ id: 'pi_1', invoice: null, description: null, metadata: { productId: 'p1' } }),
      false,
    )
    assert.equal(isInvoicePayment({ id: 'pi_1' }), false)
  })

  it('ignores non-string descriptions', () => {
    assert.equal(isInvoicePayment({ id: 'pi_1', description: 42 }), false)
  })
})

describe('isTrialFunnelPayment', () => {
  const trial = { id: 'pi_1', description: null, metadata: { funnel: 'f', productId: 'p', email: 'a@b.c' } }

  it('accepts the $1 trial funnel PI', () => {
    assert.equal(isTrialFunnelPayment(trial), true)
  })

  it('rejects invoice payments even with edited description or metadata', () => {
    assert.equal(isTrialFunnelPayment({ id: 'pi_2', invoice: 'in_1', metadata: {} }), false)
    assert.equal(isTrialFunnelPayment({ ...trial, invoice: 'in_1' }), false)
    assert.equal(isTrialFunnelPayment({ id: 'pi_2', description: 'Subscription update', metadata: {} }), false)
  })

  it('rejects payments without funnel metadata (empty, null, missing, partial)', () => {
    assert.equal(isTrialFunnelPayment({ id: 'pi_3', metadata: {} }), false)
    assert.equal(isTrialFunnelPayment({ id: 'pi_3', metadata: null }), false)
    assert.equal(isTrialFunnelPayment({ id: 'pi_3' }), false)
    assert.equal(isTrialFunnelPayment({ id: 'pi_3', metadata: { funnel: 'f' } }), false)
    assert.equal(isTrialFunnelPayment({ id: 'pi_3', metadata: { productId: 'p' } }), false)
  })
})
