import { KIT_SKUS, type KitSku } from '@/shared/kits'

/** Live subscription statuses that unlock the full catalog. */
export const LIVE_SUB_STATUSES = new Set(['trialing', 'active'])

/**
 * Permanent course allowlists per $1 kit.
 * 7-Step AI Beginners Challenge is not in LMS yet — omitted until a slug exists.
 * Keep in sync with `server/lib/courseAccess.ts`.
 */
export const KIT_COURSE_SLUGS: Record<KitSku, readonly string[]> = {
  'kit-starter': [
    'chatgpt-for-business',
    'claude-ai-mastery',
    'master-gemini',
    'prompt-engineering-mastery',
    'ai-productivity-system',
    'deep-work-career-focus',
  ],
  'kit-guide': ['claude-ai-mastery', 'claude-ai-excel', 'prompt-engineering-mastery'],
  'kit-claudecert': ['claude-ai-mastery'],
  'kit-challenge': ['28-day-ai-challenge'],
}

export function isLiveSubscriptionStatus(status: string | null | undefined): boolean {
  return Boolean(status && LIVE_SUB_STATUSES.has(status))
}

export function kitSkusOwned(purchases: Set<string> | Iterable<string> | null | undefined): KitSku[] {
  if (!purchases) return []
  const set = purchases instanceof Set ? purchases : new Set(purchases)
  return KIT_SKUS.filter((sku) => set.has(sku))
}

/** Course slugs unlocked by owned kits (union). Empty if none. */
export function courseSlugsForKits(purchases: Set<string> | Iterable<string> | null | undefined): Set<string> {
  const out = new Set<string>()
  for (const sku of kitSkusOwned(purchases)) {
    for (const slug of KIT_COURSE_SLUGS[sku]) out.add(slug)
  }
  return out
}

/**
 * Full catalog if live subscription; otherwise only kit course allowlists.
 * Upsells (coach / prompts / planners) do not grant courses.
 */
export function canAccessCourse(
  slug: string,
  input: {
    subscriptionStatus?: string | null
    purchases?: Set<string> | Iterable<string> | null
  },
): boolean {
  if (!slug) return false
  if (isLiveSubscriptionStatus(input.subscriptionStatus)) return true
  return courseSlugsForKits(input.purchases).has(slug)
}

export function hasFullCatalogAccess(subscriptionStatus?: string | null): boolean {
  return isLiveSubscriptionStatus(subscriptionStatus)
}
