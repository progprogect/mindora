import type { Context } from 'hono'
import { loadEnv } from '../env.js'
import { withLocalePrefix } from './localePath.js'
import { resolveMembershipPriceId } from './funnelOffers.js'
import {
  createFunnelSession,
  type FunnelFlow,
  type FunnelKit,
  signFunnelToken,
} from './funnelToken.js'
import { getStripe } from './stripe.js'
import { TRIAL_DAYS } from './trial.js'

export function publicOrigin(c: Context): string {
  const configured = loadEnv().PUBLIC_ORIGIN.replace(/\/$/, '')
  if (configured) return configured
  const url = new URL(c.req.url)
  const proto = c.req.header('x-forwarded-proto') || url.protocol.replace(':', '')
  const host = c.req.header('x-forwarded-host') || c.req.header('host') || url.host
  return `${proto}://${host}`
}

export async function createDollarCheckoutSession(input: {
  c: Context
  kit: FunnelKit
  productName: string
  productDescription: string
  lang: 'en' | 'ru'
  cancelPath: string
  metadata: Record<string, string>
  email?: string
  name?: string
  quizSessionId?: string
  /** Account-last funnel (Sub Out): lands on the Mindora Academy page; verification comes after the upsells. */
  flow?: FunnelFlow
}): Promise<{ url: string; token: string; sessionId: string }> {
  const stripe = getStripe()
  const origin = publicOrigin(input.c)
  const session = createFunnelSession({
    kit: input.kit,
    step: input.flow ? 'membership' : 'verify',
    email: input.email,
    name: input.name,
    quizSessionId: input.quizSessionId,
    lang: input.lang,
    flow: input.flow,
  })
  const token = signFunnelToken(session)
  const returnPath = input.flow ? '/account/membership' : '/account/verify'
  const verifyPath = withLocalePrefix(input.lang, `${returnPath}?token=${encodeURIComponent(token)}&session_id={CHECKOUT_SESSION_ID}`)
  const successUrl = `${origin}${verifyPath}`
  const cancelSep = input.cancelPath.includes('?') ? '&' : '?'
  const cancelPath = withLocalePrefix(input.lang, input.cancelPath)
  const cancelUrl = `${origin}${cancelPath}${cancelSep}cancelled=1`

  const checkout = await stripe.checkout.sessions.create({
    mode: 'payment',
    // Card only: Link adds a "Save my information" opt-in checkbox; the card is saved via setup_future_usage below.
    payment_method_types: ['card'],
    customer_creation: 'always',
    customer_email: input.email || undefined,
    locale: input.lang,
    // Card + Apple Pay only: hide Link and its "Save my information" box.
    wallet_options: { link: { display: 'never' } },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: 100,
          product_data: {
            name: input.productName,
            description: input.productDescription,
          },
        },
      },
    ],
    payment_intent_data: {
      setup_future_usage: 'off_session',
      metadata: {
        ...input.metadata,
        kit: input.kit,
        funnel_token_sid: session.sid,
      },
    },
    metadata: {
      ...input.metadata,
      kit: input.kit,
      lang: input.lang,
      funnel_sid: session.sid,
      ...(input.flow ? { flow: input.flow } : {}),
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  if (!checkout.url) {
    throw new Error('Stripe Checkout Session did not return a URL')
  }

  return { url: checkout.url, token, sessionId: checkout.id }
}

export class PriceNotConfiguredError extends Error {
  constructor(message = 'Membership price is not configured yet.') {
    super(message)
  }
}

/** Mindora Academy PRO: $49.99 per month. A wrong env price must never be billed under that name. */
const ACADEMY_UNIT_AMOUNT = 4999
const verifiedAcademyPrices = new Set<string>()

async function assertAcademyPrice(priceId: string): Promise<void> {
  if (verifiedAcademyPrices.has(priceId)) return
  let price
  try {
    price = await getStripe().prices.retrieve(priceId)
  } catch (error) {
    // A mistyped / foreign-mode price id: refuse with the generic message instead of leaking Stripe's text to the browser.
    console.error('[funnel] Academy price lookup failed', priceId, error)
    throw new PriceNotConfiguredError()
  }
  if (
    !price.active ||
    price.currency !== 'usd' ||
    price.unit_amount !== ACADEMY_UNIT_AMOUNT ||
    price.recurring?.interval !== 'month' ||
    price.recurring.interval_count !== 1
  ) {
    throw new PriceNotConfiguredError(
      `STRIPE_MONTHLY_4999_PRICE_ID must be an active $49.99 monthly USD price (got ${price.unit_amount} ${price.currency}).`,
    )
  }
  verifiedAcademyPrices.add(priceId)
}

/**
 * Sub In: ONE subscription Checkout with two items — the $1 kit (one-time, charged on the first invoice) and
 * Mindora Academy PRO ($49.99/month, 3-day trial, shown as $0.00). The visitor's name and email come from the
 * landing form, so the funnel token already knows both. The card is saved on the subscription and reused by the
 * one-click upsells; the account is created by the `checkout.session.completed` webhook.
 */
export async function createSubInCheckoutSession(input: {
  c: Context
  kit: FunnelKit
  productName: string
  productDescription: string
  lang: 'en' | 'ru'
  cancelPath: string
  metadata: Record<string, string>
  email: string
  name: string
}): Promise<{ url: string; token: string; sessionId: string }> {
  const priceId = resolveMembershipPriceId('main')
  if (!priceId) throw new PriceNotConfiguredError()
  await assertAcademyPrice(priceId)

  const stripe = getStripe()
  const origin = publicOrigin(input.c)
  const session = createFunnelSession({
    kit: input.kit,
    flow: 'sub_in',
    step: 'upsell_prompts',
    email: input.email,
    name: input.name,
    lang: input.lang,
  })
  const token = signFunnelToken(session)
  const successPath = withLocalePrefix(
    input.lang,
    `/account/upsell?step=prompts&token=${encodeURIComponent(token)}&session_id={CHECKOUT_SESSION_ID}`,
  )
  const cancelSep = input.cancelPath.includes('?') ? '&' : '?'
  const cancelUrl = `${origin}${withLocalePrefix(input.lang, input.cancelPath)}${cancelSep}cancelled=1`
  const metadata = {
    ...input.metadata,
    kit: input.kit,
    lang: input.lang,
    flow: 'sub_in',
    funnel_sid: session.sid,
    name: input.name.slice(0, 200),
    email: input.email,
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    payment_method_collection: 'always',
    customer_email: input.email,
    locale: input.lang,
    wallet_options: { link: { display: 'never' } },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: 100,
          product_data: { name: input.productName, description: input.productDescription },
        },
      },
      { quantity: 1, price: priceId },
    ],
    subscription_data: {
      trial_period_days: TRIAL_DAYS,
      description: 'Mindora Academy PRO: free for 3 days, then $49.99 per month. Cancel anytime.',
      metadata,
    },
    custom_text: {
      submit: {
        message: 'Your card is saved securely for optional one-click add-ons on the next pages.',
      },
    },
    metadata,
    success_url: `${origin}${successPath}`,
    cancel_url: cancelUrl,
  })

  if (!checkout.url) {
    throw new Error('Stripe Checkout Session did not return a URL')
  }
  return { url: checkout.url, token, sessionId: checkout.id }
}
