import assert from 'node:assert/strict'
import { after, describe, it } from 'node:test'
import { eq } from 'drizzle-orm'

/**
 * Account-last funnels through the Checkout webhook, with Stripe stubbed.
 * Needs a throwaway Postgres: `FUNNEL_DB_TESTS=1 DATABASE_URL=postgres://… npm test` (migrations applied).
 */
const enabled = process.env.FUNNEL_DB_TESTS === '1' && Boolean(process.env.DATABASE_URL)

describe('kit checkout fulfilment for Sub In / Sub Out', { skip: !enabled }, async () => {
  process.env.STRIPE_SECRET_KEY ||= 'sk_test_stub'
  const { db, pool } = await import('../db/index.js')
  const { funnelActivationEmails, profiles, users } = await import('../db/schema.js')
  const { getStripe } = await import('./stripe.js')
  const { fulfillKitCheckoutSession } = await import('../routes/stripeWebhook.js')
  const { hasSku } = await import('successwise-app/purchases')

  const stamp = Date.now()
  const email = `flow-${stamp}@example.test`

  const calls = { refunds: [] as unknown[], cancels: [] as string[], customerUpdates: [] as unknown[] }
  const stripe = getStripe() as unknown as Record<string, any>
  stripe.subscriptions.retrieve = async (id: string) => ({
    id,
    status: 'trialing',
    default_payment_method: 'pm_stub',
    trial_end: Math.floor(Date.now() / 1000) + 3 * 86400,
    items: { data: [{ price: { unit_amount: 4999 } }] },
  })
  stripe.subscriptions.list = async () => ({ data: [] })
  stripe.subscriptions.cancel = async (id: string) => {
    calls.cancels.push(id)
    return { id }
  }
  stripe.customers.update = async (...args: unknown[]) => {
    calls.customerUpdates.push(args)
    return {}
  }
  stripe.paymentMethods.attach = async () => ({})
  stripe.invoicePayments = { list: async () => ({ data: [{ payment: { payment_intent: 'pi_invoice_stub' } }] }) }
  stripe.refunds.create = async (...args: unknown[]) => {
    calls.refunds.push(args)
    return { id: 're_stub' }
  }

  const session = (id: string, over: Record<string, unknown> = {}) =>
    ({
      id,
      mode: 'subscription',
      payment_status: 'paid',
      customer: `cus_${stamp}`,
      subscription: `sub_${id}`,
      invoice: `in_${id}`,
      amount_total: 100,
      created: Math.floor(Date.now() / 1000),
      customer_details: { email },
      ...over,
    }) as any
  const meta = (sid: string) => ({
    kit: 'starter',
    flow: 'sub_in',
    lang: 'en',
    funnel: 'start-kit-sub-in',
    funnel_sid: sid,
    name: 'Masha',
    email,
  })

  after(async () => {
    await db.delete(users).where(eq(users.email, email))
    await pool.end()
  })

  const userRow = async () => (await db.select().from(users).where(eq(users.email, email)))[0]

  it('Sub In: creates the account, grants the kit, records the funnel source and queues the email', async () => {
    await fulfillKitCheckoutSession(session(`cs_a_${stamp}`), meta(`sid-a-${stamp}`))
    const user = await userRow()
    assert.ok(user)
    assert.equal(await hasSku(user.id, 'kit-starter'), true)
    const [profile] = await db.select().from(profiles).where(eq(profiles.userId, user.id))
    assert.equal(profile?.funnelSource, 'start-kit-sub-in')
    assert.equal(profile?.stripeCustomerId, `cus_${stamp}`)
    assert.equal(calls.customerUpdates.length, 1, 'card from the subscription becomes the default for one-click upsells')
    const queued = await db.select().from(funnelActivationEmails).where(eq(funnelActivationEmails.userId, user.id))
    assert.equal(queued.length, 1)
    assert.equal(queued[0]?.flow, 'sub_in')
    assert.equal(calls.refunds.length, 0)
  })

  it('the same Checkout is handled once (webhook + return page)', async () => {
    await fulfillKitCheckoutSession(session(`cs_a_${stamp}`), meta(`sid-a-${stamp}`))
    const user = (await userRow())!
    assert.equal((await db.select().from(funnelActivationEmails).where(eq(funnelActivationEmails.userId, user.id))).length, 1)
    assert.equal(calls.customerUpdates.length, 1)
  })

  it('buying again with the same email refunds $1, cancels the new subscription and keeps the access', async () => {
    await fulfillKitCheckoutSession(session(`cs_b_${stamp}`), meta(`sid-b-${stamp}`))
    assert.deepEqual(calls.cancels, [`sub_cs_b_${stamp}`])
    assert.equal(calls.refunds.length, 1)
    assert.deepEqual((calls.refunds[0] as any[])[0], { payment_intent: 'pi_invoice_stub' })
    const user = (await userRow())!
    assert.equal(await hasSku(user.id, 'kit-starter'), true)
    assert.equal((await db.select().from(funnelActivationEmails).where(eq(funnelActivationEmails.userId, user.id))).length, 1)
  })

  it('Sub Out duplicate: refunds the Checkout PaymentIntent', async () => {
    calls.refunds.length = 0
    await fulfillKitCheckoutSession(
      session(`cs_c_${stamp}`, { mode: 'payment', subscription: null, invoice: null, payment_intent: 'pi_session_stub' }),
      { ...meta(`sid-c-${stamp}`), flow: 'sub_out', funnel: 'start-kit-sub-out' },
    )
    assert.equal(calls.refunds.length, 1)
    assert.deepEqual((calls.refunds[0] as any[])[0], { payment_intent: 'pi_session_stub' })
  })
})
