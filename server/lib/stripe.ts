/** Funnel checkout Stripe client. LMS add-on charges use `successwise-app`. */
import Stripe from 'stripe'
import { loadEnv } from '../env.js'

let client: Stripe | null = null

export function isStripeConfigured(): boolean {
  return Boolean(loadEnv().STRIPE_SECRET_KEY)
}

export function getStripe(): Stripe {
  if (client) return client
  const env = loadEnv()
  if (!env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  client = new Stripe(env.STRIPE_SECRET_KEY)
  return client
}

export function isPlaceholderPrice(priceId: string): boolean {
  return !priceId || priceId.startsWith('price_REPLACE')
}
