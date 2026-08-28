export const PLAN_TIERS = {
  week1: { label: '1-Week Plan', days: 7 },
  week4: { label: '28-Day Plan', days: 28 },
  week12: { label: '12-Week Plan', days: 84 },
  free: { label: 'Free Plan', days: 0 },
} as const

export type PlanTier = keyof typeof PLAN_TIERS

export const LEARN_PATHS: Record<string, string> = {
  ai: '/app/ai-and-technology',
  mindset: '/app/success-mindset',
  career: '/app/career',
  business: '/app/business',
  health: '/app/health',
  financial: '/app/financial-wellbeing',
  all: '/app/ai-and-technology',
}

/** Fallback until the session user loads. */
export const MOCK_USER = {
  name: 'Vlad',
  planTier: 'week4' as PlanTier,
  focusCategory: 'ai',
}

export function initialsFromName(name: string | undefined) {
  return (name || 'U')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
