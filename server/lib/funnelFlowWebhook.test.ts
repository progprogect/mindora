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
  process.env.STRIPE_MONTHLY_4999_PRICE_ID ||= 'price_test_4999'
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

  describe('Sub In in `payment` mode: the webhook starts the trial subscription', () => {
    const email2 = `flow-pay-${stamp}@example.test`
    const created = [] as { params: any; opts: any }[]
    let blocking: unknown[] = []
    let failCreate = false
    const payCheckout = (id: string) =>
      ({
        id,
        mode: 'payment',
        payment_status: 'paid',
        customer: `cus_pay_${stamp}`,
        subscription: null,
        payment_intent: `pi_${id}`,
        amount_total: 100,
        created: Math.floor(Date.now() / 1000),
        customer_details: { email: email2 },
      }) as any
    const payMeta = (sid: string) => ({ ...meta(sid), email: email2 })

    stripe.paymentIntents.retrieve = async () => ({ payment_method: 'pm_saved' })
    stripe.subscriptions.list = async () => ({ data: blocking })
    stripe.subscriptions.create = async (params: any, opts: any) => {
      if (failCreate) throw new Error('stripe down')
      created.push({ params, opts })
      return { id: `sub_new_${created.length}`, status: 'trialing', trial_end: Math.floor(Date.now() / 1000) + 3 * 86400, items: { data: [{ price: { unit_amount: 4999 } }] }, default_payment_method: 'pm_saved' }
    }

    after(async () => {
      await db.delete(users).where(eq(users.email, email2))
    })

    it('starts the 3-day Academy PRO trial on the saved card, once', async () => {
      await fulfillKitCheckoutSession(payCheckout(`cs_p1_${stamp}`), payMeta(`sid-p1-${stamp}`))
      assert.equal(created.length, 1)
      assert.equal(created[0]!.params.default_payment_method, 'pm_saved')
      assert.equal(created[0]!.params.trial_period_days, 3)
      assert.equal(created[0]!.params.items[0].price, 'price_test_4999')
      assert.equal(created[0]!.opts.idempotencyKey, `kit_sub_cs_p1_${stamp}`)
      await fulfillKitCheckoutSession(payCheckout(`cs_p1_${stamp}`), payMeta(`sid-p1-${stamp}`))
      assert.equal(created.length, 1, 'webhook redelivery / return page does not start a second subscription')
      const user = (await db.select().from(users).where(eq(users.email, email2)))[0]!
      assert.equal(await hasSku(user.id, 'kit-starter'), true)
    })

    it('a Stripe failure while starting the trial is retried (no stuck claim)', async () => {
      const retryEmail = `flow-retry-${stamp}@example.test`
      const checkout = { ...payCheckout(`cs_p2_${stamp}`), customer_details: { email: retryEmail } }
      const metadata = { ...payMeta(`sid-p2-${stamp}`), email: retryEmail }
      failCreate = true
      await assert.rejects(() => fulfillKitCheckoutSession(checkout, metadata), /stripe down/)
      failCreate = false
      const before = created.length
      await fulfillKitCheckoutSession(checkout, metadata)
      assert.equal(created.length, before + 1)
      await db.delete(users).where(eq(users.email, retryEmail))
    })

    it('does not create a second subscription when the customer already has one', async () => {
      blocking = [{ id: 'sub_existing', status: 'trialing', items: { data: [{ price: { unit_amount: 4999 } }] }, trial_end: Math.floor(Date.now() / 1000) + 86400 }]
      const other = `flow-has-${stamp}@example.test`
      const before = created.length
      await fulfillKitCheckoutSession(
        { ...payCheckout(`cs_p3_${stamp}`), customer_details: { email: other } },
        { ...payMeta(`sid-p3-${stamp}`), email: other },
      )
      assert.equal(created.length, before)
      blocking = []
      await db.delete(users).where(eq(users.email, other))
    })
  })
})
