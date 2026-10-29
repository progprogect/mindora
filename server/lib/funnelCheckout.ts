import type { Context } from 'hono'
import { loadEnv } from '../env.js'
import { withLocalePrefix } from './localePath.js'
import {
  createFunnelSession,
  type FunnelKit,
  signFunnelToken,
} from './funnelToken.js'
import { getStripe } from './stripe.js'

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
}): Promise<{ url: string; token: string; sessionId: string }> {
  const stripe = getStripe()
  const origin = publicOrigin(input.c)
  const session = createFunnelSession({
    kit: input.kit,
    step: 'verify',
    email: input.email,
    name: input.name,
    quizSessionId: input.quizSessionId,
    lang: input.lang,
  })
  const token = signFunnelToken(session)
  const verifyPath = withLocalePrefix(input.lang, `/account/verify?token=${encodeURIComponent(token)}&session_id={CHECKOUT_SESSION_ID}`)
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
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  if (!checkout.url) {
    throw new Error('Stripe Checkout Session did not return a URL')
  }

  return { url: checkout.url, token, sessionId: checkout.id }
}
