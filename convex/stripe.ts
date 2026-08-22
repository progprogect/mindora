import { actionGeneric, internalMutationGeneric, internalQueryGeneric } from 'convex/server'
import { anyApi } from 'convex/server'
import { v } from 'convex/values'

const DEFAULT_PERCENT_OFF = 50
const OFFER_TTL_MS = 24 * 60 * 60 * 1000 // 24h
const STRIPE_API_BASE = 'https://api.stripe.com/v1'

/** Internal: read a checkout offer by session key (used only by `stripe.ts` actions). */
export const _getOfferBySessionKey = internalQueryGeneric({
  args: { sessionKey: v.string() },
  handler: async (ctx, args) => {
    return ctx.db
      .query('checkoutOffers')
      .withIndex('by_session_key', (q) => q.eq('sessionKey', args.sessionKey))
      .unique()
  },
})

/** Internal: create a checkout offer row (used only by `stripe.ts` actions). */
export const _createOffer = internalMutationGeneric({
  args: { sessionKey: v.string(), percentOff: v.number() },
  handler: async (ctx, args) => {
    const now = Date.now()
    return ctx.db.insert('checkoutOffers', {
      sessionKey: args.sessionKey,
      percentOff: args.percentOff,
      createdAt: now,
      expiresAt: now + OFFER_TTL_MS,
    })
  },
})

export const _getProcessedPayment = internalQueryGeneric({
  args: { paymentIntentId: v.string() },
  handler: async (ctx, args) => {
    return ctx.db
      .query('processedStripePayments')
      .withIndex('by_payment_intent', (q) => q.eq('paymentIntentId', args.paymentIntentId))
      .unique()
  },
})

export const _recordProcessedPayment = internalMutationGeneric({
  args: {
    paymentIntentId: v.string(),
    customerId: v.string(),
    subscriptionId: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('processedStripePayments')
      .withIndex('by_payment_intent', (q) => q.eq('paymentIntentId', args.paymentIntentId))
      .unique()
    if (existing) return existing._id
    return ctx.db.insert('processedStripePayments', {
      ...args,
      createdAt: Date.now(),
    })
  },
})

/** Internal: upsert a checkout offer's percentOff (used by the Spin Wheel result). */
export const _upsertOfferPercent = internalMutationGeneric({
  args: { sessionKey: v.string(), percentOff: v.number() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('checkoutOffers')
      .withIndex('by_session_key', (q) => q.eq('sessionKey', args.sessionKey))
      .unique()

    const now = Date.now()
    if (existing) {
      await ctx.db.patch(existing._id, { percentOff: args.percentOff, expiresAt: now + OFFER_TTL_MS })
      return existing._id
    }
    return ctx.db.insert('checkoutOffers', {
      sessionKey: args.sessionKey,
      percentOff: args.percentOff,
      createdAt: now,
      expiresAt: now + OFFER_TTL_MS,
    })
  },
})

/**
 * `stripe.getOrCreateCheckoutOffer` — called once when SalesPlanScreen
 * mounts. Returns a stable discount for this browser's `sessionKey`
 * (persisted client-side in `sw_checkout_session_key`) so refreshing the
 * page doesn't grant a new discount. The Spin Wheel screen only changes how
 * the discount is *revealed* in the UI (97% instead of 50%) — the
 * server-side percentage is the source of truth for the actual price shown.
 */
export const getOrCreateCheckoutOffer = actionGeneric({
  args: { sessionKey: v.string() },
  handler: async (ctx, args): Promise<{ percentOff: number }> => {
    const existing = await ctx.runQuery(anyApi.stripe._getOfferBySessionKey, {
      sessionKey: args.sessionKey,
    })

    if (existing && existing.expiresAt > Date.now()) {
      return { percentOff: existing.percentOff }
    }

    await ctx.runMutation(anyApi.stripe._createOffer, {
      sessionKey: args.sessionKey,
      percentOff: DEFAULT_PERCENT_OFF,
    })

    return { percentOff: DEFAULT_PERCENT_OFF }
  },
})

/**
 * `stripe.setCheckoutOfferPercent` — called once the Spin Wheel lands on its
 * (guaranteed) prize, persisting the revealed discount so it stays
 * consistent if the user refreshes or returns to the pricing step later.
 */
export const setCheckoutOfferPercent = actionGeneric({
  args: { sessionKey: v.string(), percentOff: v.number() },
  handler: async (ctx, args): Promise<{ percentOff: number }> => {
    await ctx.runMutation(anyApi.stripe._upsertOfferPercent, args)
    return { percentOff: args.percentOff }
  },
})

interface StripeErrorResponse {
  error?: { message?: string }
}

async function stripeRequest<T>(path: string, body: Record<string, string>): Promise<T> {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error(
      'STRIPE_SECRET_KEY is not configured on the Convex deployment. Set it via `npx convex env set STRIPE_SECRET_KEY sk_test_...`.',
    )
  }

  const response = await fetch(`${STRIPE_API_BASE}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(body).toString(),
  })

  const json = (await response.json()) as T & StripeErrorResponse
  if (!response.ok) {
    throw new Error(json.error?.message ?? `Stripe request to ${path} failed (${response.status})`)
  }
  return json
}

interface StripeCustomer {
  id: string
}

interface StripePaymentIntent {
  id: string
  client_secret: string
  next_action?: { redirect_to_url?: { url?: string } } | null
}

async function findOrCreateCustomer(email: string, funnel: string, productId: string): Promise<StripeCustomer> {
  const search = await stripeRequest<{ data: StripeCustomer[] }>('/customers/search', {
    query: `email:"${email}"`,
  })
  return (
    search.data[0] ??
    (await stripeRequest<StripeCustomer>('/customers', {
      email,
      'metadata[funnel]': funnel,
      'metadata[productId]': productId,
    }))
  )
}

/**
 * `stripe.createTrialPaymentIntent` — $1 PaymentIntent on the plan page.
 * Card + wallets (Express Checkout). PayPal uses `createPayPalPaymentIntent`.
 */
export const createTrialPaymentIntent = actionGeneric({
  args: {
    email: v.string(),
    productId: v.string(),
    funnel: v.string(),
  },
  handler: async (_ctx, args): Promise<{ clientSecret: string }> => {
    const customer = await findOrCreateCustomer(args.email, args.funnel, args.productId)
    const paymentIntent = await stripeRequest<StripePaymentIntent>('/payment_intents', {
      amount: '100',
      currency: 'usd',
      customer: customer.id,
      'payment_method_types[]': 'card',
      setup_future_usage: 'off_session',
      'metadata[funnel]': args.funnel,
      'metadata[productId]': args.productId,
      'metadata[email]': args.email,
    })
    return { clientSecret: paymentIntent.client_secret }
  },
})

/**
 * Dedicated PayPal PaymentIntent — production `PayPalButton` calls
 * `confirmPayPalPayment` then returns to `/checkout/setup?trial=1&funnel=`.
 */
export const createPayPalPaymentIntent = actionGeneric({
  args: {
    customerEmail: v.string(),
    productId: v.string(),
    funnel: v.string(),
    returnUrl: v.optional(v.string()),
    confirmAndRedirect: v.optional(v.boolean()),
  },
  handler: async (
    _ctx,
    args,
  ): Promise<{ clientSecret: string; redirectUrl: string | null }> => {
    const customer = await findOrCreateCustomer(args.customerEmail, args.funnel, args.productId)
    const body: Record<string, string> = {
      amount: '100',
      currency: 'usd',
      customer: customer.id,
      'payment_method_types[]': 'paypal',
      setup_future_usage: 'off_session',
      'metadata[funnel]': args.funnel,
      'metadata[productId]': args.productId,
      'metadata[email]': args.customerEmail,
    }
    if (args.confirmAndRedirect && args.returnUrl) {
      body.confirm = 'true'
      body.return_url = args.returnUrl
      body['payment_method_data[type]'] = 'paypal'
    }
    const paymentIntent = await stripeRequest<StripePaymentIntent>('/payment_intents', body)
    return {
      clientSecret: paymentIntent.client_secret,
      redirectUrl: paymentIntent.next_action?.redirect_to_url?.url ?? null,
    }
  },
})

/** @deprecated Use `createTrialPaymentIntent`. Kept so existing Convex refs don't 404. */
export const createTrialSetupIntent = createTrialPaymentIntent
