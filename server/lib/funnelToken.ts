import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import { loadEnv } from '../env.js'
import { DEFAULT_LOCALE, withLocalePrefix, type AppLocale } from './localePath.js'

/** Funnel session cookie + signed token TTL (~2 hours per README). */
export const FUNNEL_TTL_MS = 2 * 60 * 60 * 1000
export const FUNNEL_COOKIE = 'mindora_funnel'

/** Active $1 Entry Product funnels (HTML landings). Quiz funnels use trial-intent, not kits. */
export const FUNNEL_KITS = ['starter', 'guide'] as const
export type FunnelKit = (typeof FUNNEL_KITS)[number]

/**
 * Retired quiz kit keys — may still appear on in-flight Stripe metadata / purchased SKUs.
 * Do not mint new funnel sessions with these; keep recognising them so $1 PI does not create a trial sub.
 */
export const RETIRED_QUIZ_KITS = ['claudecert', 'challenge'] as const
export type RetiredQuizKit = (typeof RETIRED_QUIZ_KITS)[number]
export type KitCheckoutKey = FunnelKit | RetiredQuizKit

export const FUNNEL_STEPS = [
  'verify',
  'membership',
  'upsell_coach',
  'upsell_prompts',
  'upsell_planners',
  'onboard',
  'done',
] as const
export type FunnelStep = (typeof FUNNEL_STEPS)[number]

export type FunnelSession = {
  v: 1
  sid: string
  kit: FunnelKit
  step: FunnelStep
  exp: number
  userId?: string
  email?: string
  name?: string
  quizSessionId?: string
  lang?: 'en' | 'ru'
}

function b64url(buf: Buffer): string {
  return buf.toString('base64url')
}

function fromB64url(value: string): Buffer {
  return Buffer.from(value, 'base64url')
}

function signPayload(payloadB64: string): string {
  return createHmac('sha256', loadEnv().SESSION_SECRET).update(payloadB64).digest('base64url')
}

export function isFunnelKit(value: unknown): value is FunnelKit {
  return typeof value === 'string' && (FUNNEL_KITS as readonly string[]).includes(value)
}

export function isKitCheckoutKey(value: unknown): value is KitCheckoutKey {
  return (
    isFunnelKit(value) ||
    (typeof value === 'string' && (RETIRED_QUIZ_KITS as readonly string[]).includes(value))
  )
}

export function isFunnelStep(value: unknown): value is FunnelStep {
  return typeof value === 'string' && (FUNNEL_STEPS as readonly string[]).includes(value)
}

export function stepIndex(step: FunnelStep): number {
  return FUNNEL_STEPS.indexOf(step)
}

export function createFunnelSession(
  input: Omit<FunnelSession, 'v' | 'sid' | 'exp' | 'step'> & { step?: FunnelStep; sid?: string },
): FunnelSession {
  return {
    v: 1,
    sid: input.sid ?? randomBytes(16).toString('hex'),
    kit: input.kit,
    step: input.step ?? 'verify',
    exp: Date.now() + FUNNEL_TTL_MS,
    userId: input.userId,
    email: input.email,
    name: input.name,
    quizSessionId: input.quizSessionId,
    lang: input.lang,
  }
}

export function signFunnelToken(session: FunnelSession): string {
  const payloadB64 = b64url(Buffer.from(JSON.stringify(session), 'utf8'))
  return `${payloadB64}.${signPayload(payloadB64)}`
}

export function verifyFunnelToken(token: string | undefined | null): FunnelSession | null {
  if (!token || typeof token !== 'string') return null
  const dot = token.indexOf('.')
  if (dot <= 0) return null
  const payloadB64 = token.slice(0, dot)
  const sig = token.slice(dot + 1)
  if (!payloadB64 || !sig) return null
  const expected = signPayload(payloadB64)
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  let parsed: unknown
  try {
    parsed = JSON.parse(fromB64url(payloadB64).toString('utf8'))
  } catch {
    return null
  }
  if (!parsed || typeof parsed !== 'object') return null
  const row = parsed as Record<string, unknown>
  if (row.v !== 1) return null
  if (typeof row.sid !== 'string' || !row.sid) return null
  if (!isFunnelKit(row.kit)) return null
  if (!isFunnelStep(row.step)) return null
  if (typeof row.exp !== 'number' || row.exp <= Date.now()) return null
  const session: FunnelSession = {
    v: 1,
    sid: row.sid,
    kit: row.kit,
    step: row.step,
    exp: row.exp,
  }
  if (typeof row.userId === 'string') session.userId = row.userId
  if (typeof row.email === 'string') session.email = row.email
  if (typeof row.name === 'string') session.name = row.name
  if (typeof row.quizSessionId === 'string') session.quizSessionId = row.quizSessionId
  if (row.lang === 'en' || row.lang === 'ru') session.lang = row.lang
  return session
}

/** Move session forward; never moves backward. Extends TTL. */
export function advanceFunnelSession(session: FunnelSession, next: FunnelStep): FunnelSession {
  const current = stepIndex(session.step)
  const target = stepIndex(next)
  return {
    ...session,
    step: target > current ? next : session.step,
    exp: Date.now() + FUNNEL_TTL_MS,
  }
}

function bareUrlForFunnelStep(step: FunnelStep, kit: FunnelKit): string {
  switch (step) {
    case 'verify':
      return '/account/verify'
    case 'membership':
      return '/account/membership'
    case 'upsell_coach':
      return '/account/upsell?step=coach'
    case 'upsell_prompts':
      return '/account/upsell?step=prompts'
    case 'upsell_planners':
      return '/account/upsell?step=planners'
    case 'onboard':
      return '/account/onboard'
    case 'done':
      return '/app/dashboard'
    default:
      return `/start${kit === 'starter' ? '-kit' : ''}`
  }
}

export function urlForFunnelStep(
  step: FunnelStep,
  kit: FunnelKit,
  locale: AppLocale = DEFAULT_LOCALE,
): string {
  return withLocalePrefix(locale, bareUrlForFunnelStep(step, kit))
}

export function stepFromUpsellQuery(step: string | undefined): FunnelStep | null {
  if (step === 'coach') return 'upsell_coach'
  if (step === 'prompts') return 'upsell_prompts'
  if (step === 'planners') return 'upsell_planners'
  return null
}

export function nextUrlAfter(
  step: FunnelStep,
  kit: FunnelKit,
  locale: AppLocale = DEFAULT_LOCALE,
): string {
  const i = stepIndex(step)
  const next = FUNNEL_STEPS[Math.min(i + 1, FUNNEL_STEPS.length - 1)]!
  return urlForFunnelStep(next, kit, locale)
}
