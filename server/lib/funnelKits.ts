import type { KitCheckoutKey } from './funnelToken.js'

type KitProduct = {
  name: string
  description: string
  cancelPath: string
  funnelSource: string
}

const LANDING_PRODUCTS: Record<'starter' | 'guide', KitProduct> = {
  starter: {
    name: 'Mindora AI Starter Kit',
    description:
      '6 AI courses · 1,000+ prompts · templates · gift course + planner · lifetime access',
    cancelPath: '/start-kit',
    funnelSource: 'start-kit',
  },
  guide: {
    name: 'Mindora Claude AI Guide Kit',
    description:
      'Claude AI Guide · 1,000+ prompts · templates · 3 practical courses + gift course · lifetime access',
    cancelPath: '/start',
    funnelSource: 'start',
  },
}

/** `-long` quiz variants: $1 one-time Checkout, no subscription (original quiz routes use trial-intent). */
const QUIZ_PRODUCTS: Record<QuizKit, KitProduct> = {
  claudecert: {
    name: 'Mindora Claude AI Learning Plan',
    description:
      '7-day Claude AI mastery course · 50+ lessons & exercises · Certificate of Mastery · prompts & templates · one-time payment',
    cancelPath: '/quiz/claude-ai-certification-long',
    funnelSource: 'claude-ai-certification',
  },
  challenge: {
    name: 'Mindora 28-Day AI Plan',
    description:
      'Your personalised 28-day AI plan · 28 daily 10-min lessons · a new AI tool every day · certificate · one-time payment',
    cancelPath: '/quiz/28-day-ai-challenge-long',
    funnelSource: '28-day-ai-challenge',
  },
}

export type QuizKit = 'claudecert' | 'challenge'

export function isQuizKit(value: unknown): value is QuizKit {
  return value === 'claudecert' || value === 'challenge'
}

export function landingProduct(kit: 'starter' | 'guide') {
  return LANDING_PRODUCTS[kit]
}

export function quizProduct(kit: QuizKit) {
  return QUIZ_PRODUCTS[kit]
}

/** Landing kits + `-long` quiz kits (webhook fulfill / skip-sub). */
export function kitProduct(kit: KitCheckoutKey) {
  return isQuizKit(kit) ? QUIZ_PRODUCTS[kit] : LANDING_PRODUCTS[kit]
}

/** Map landing `variant` / explicit `kit` to an active funnel kit (starter | guide only). */
export function resolveLandingKit(input: { kit?: string; variant?: string }): 'starter' | 'guide' | null {
  const kit = input.kit?.trim()
  if (kit) {
    if (kit === 'starter' || kit === 'guide') return kit
    return null
  }

  const variant = (input.variant ?? '').trim().toLowerCase()
  if (variant === 'guide-claude' || variant === 'guide') return 'guide'
  if (variant === 'starter' || variant === 'default' || variant === '') return 'starter'
  return null
}
