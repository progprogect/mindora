export const COACH_NAME = 'Mindora'
export const COACH_AVATAR = '/favicon.svg'
export const COACH_OFFER_SLUG = 'mindora-ai-coach'
export const COACH_OFFER_ALIAS = 'wise-ai-coach'
export const COACH_GOALS_KEY = 'sw_mindora_goals'
export const COACH_GOALS_LEGACY_KEY = 'sw_wise_goals'

export function ownsCoachSku(purchases?: Set<string> | null) {
  if (!purchases) return false
  return purchases.has(COACH_OFFER_SLUG) || purchases.has(COACH_OFFER_ALIAS)
}
