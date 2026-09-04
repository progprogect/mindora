import { v4 as uuidv4 } from 'uuid'

const CHECKOUT_SESSION_KEY = 'sw_checkout_session_key'
export const CHECKOUT_EMAIL_KEY = 'sw_checkout_email'
export const LOGIN_EMAIL_KEY = 'sw_login_email'

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function asEmail(value: unknown): string {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  return EMAIL_OK.test(trimmed) ? trimmed : ''
}

function emailFromStoredJson(raw: string | null): string {
  if (!raw) return ''
  const direct = asEmail(raw)
  if (direct) return direct
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>
    return asEmail(parsed.email) || asEmail(parsed.submittedEmail)
  } catch {
    return ''
  }
}

/** Persist the email collected at quiz / sign-in / checkout so later pages can prefill. */
export function rememberCheckoutEmail(email: string): void {
  const trimmed = asEmail(email)
  if (!trimmed || typeof window === 'undefined') return
  window.localStorage.setItem(CHECKOUT_EMAIL_KEY, trimmed)
  window.localStorage.setItem(LOGIN_EMAIL_KEY, trimmed)
}

/**
 * Email entered earlier in the funnel or at sign-in — same sources the original
 * checkout uses so `/checkout?product=` is prefilled.
 */
export function resolveKnownEmail(searchParams?: URLSearchParams | null): string {
  const fromQuery = asEmail(searchParams?.get('email'))
  if (fromQuery) return fromQuery
  if (typeof window === 'undefined') return ''

  const stored =
    asEmail(window.localStorage.getItem(CHECKOUT_EMAIL_KEY)) ||
    asEmail(window.localStorage.getItem(LOGIN_EMAIL_KEY))
  if (stored) return stored

  const preferredKeys = [
    'sw_quiz_results',
    'sw_quiz_claude_results',
    'sw_quiz_28day_state_v2',
    'sw_quiz_claude_state',
    'sw_quiz_success-assessment_state_v1',
    'sw_quiz_success-assessment_results',
  ]
  for (const key of preferredKeys) {
    const email = emailFromStoredJson(window.localStorage.getItem(key))
    if (email) return email
  }

  for (let i = 0; i < window.localStorage.length; i += 1) {
    const key = window.localStorage.key(i)
    if (!key || !key.startsWith('sw_quiz_')) continue
    const email = emailFromStoredJson(window.localStorage.getItem(key))
    if (email) return email
  }

  return ''
}

/**
 * Returns a stable per-browser UUID used to key the discount offer created
 * by `POST /api/checkout/offer`. Generated once and reused so a
 * refresh doesn't grant a new discount for free (expiry is enforced
 * server-side).
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
