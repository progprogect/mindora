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

interface StripeSetupIntent {
  id: string
  client_secret: string
}

/**
 * `stripe.createTrialSetupIntent` — called from CheckoutSetupPage.
 * Creates (or reuses) a Stripe Customer for the lead's email and returns a
 * SetupIntent client secret so the frontend can collect card details for
 * the $1 trial via Stripe Elements (Payment/Setup Element, card saved for
 * the future recurring subscription created by your webhook handler).
 */
export const createTrialSetupIntent = actionGeneric({
  args: {
    email: v.string(),
    productId: v.string(),
    funnel: v.string(),
  },
  handler: async (_ctx, args): Promise<{ clientSecret: string }> => {
    const search = await stripeRequest<{ data: StripeCustomer[] }>('/customers/search', {
      query: `email:"${args.email}"`,
    })

    const customer =
      search.data[0] ??
      (await stripeRequest<StripeCustomer>('/customers', {
        email: args.email,
        'metadata[funnel]': args.funnel,
        'metadata[productId]': args.productId,
      }))

    const setupIntent = await stripeRequest<StripeSetupIntent>('/setup_intents', {
      customer: customer.id,
      'payment_method_types[]': 'card',
      usage: 'off_session',
      'metadata[funnel]': args.funnel,
      'metadata[productId]': args.productId,
    })

    return { clientSecret: setupIntent.client_secret }
  },
})
