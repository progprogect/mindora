import { v4 as uuidv4 } from 'uuid'

const CHECKOUT_SESSION_KEY = 'sw_checkout_session_key'

/**
 * Returns a stable per-browser UUID used to key the discount offer created
 * by `stripe.getOrCreateCheckoutOffer`. Generated once and reused so a
 * refresh doesn't grant a new discount for free (expiry is enforced
 * server-side by Convex).
 */
export function getCheckoutSessionKey(): string {
  if (typeof window === 'undefined') return uuidv4()

  const existing = window.localStorage.getItem(CHECKOUT_SESSION_KEY)
  if (existing) return existing

  const next = uuidv4()
  window.localStorage.setItem(CHECKOUT_SESSION_KEY, next)
  return next
}

export function resetCheckoutSessionKey(): string {
  const next = uuidv4()
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(CHECKOUT_SESSION_KEY, next)
  }
  return next
}
