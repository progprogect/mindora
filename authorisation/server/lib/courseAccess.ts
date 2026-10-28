import { KIT_SKUS, type KitSku, isKitSku, listPurchases } from './purchases.js'
import { getMine } from './subscription.js'

/**
 * Permanent course allowlists per $1 kit.
 * Keep in sync with `src/shared/courseAccess.ts`.
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

const LIVE_SUB = new Set(['trialing', 'active'])

export function isLiveSubscriptionStatus(status: string | null | undefined): boolean {
  return Boolean(status && LIVE_SUB.has(status))
}

export function courseSlugsForPurchaseSkus(skus: Iterable<string>): Set<string> {
  const out = new Set<string>()
  for (const sku of skus) {
    if (!isKitSku(sku)) continue
    for (const slug of KIT_COURSE_SLUGS[sku]) out.add(slug)
  }
  return out
}

export function canAccessCourseSlug(
  slug: string,
  input: { subscriptionStatus?: string | null; purchaseSkus: Iterable<string> },
): boolean {
  if (!slug) return false
  if (isLiveSubscriptionStatus(input.subscriptionStatus)) return true
  return courseSlugsForPurchaseSkus(input.purchaseSkus).has(slug)
}

export async function userCanAccessCourse(userId: string, email: string, slug: string): Promise<boolean> {
  const [mine, rows] = await Promise.all([getMine(userId, email), listPurchases(userId)])
  return canAccessCourseSlug(slug, {
    subscriptionStatus: mine?.status,
    purchaseSkus: rows.map((row) => row.sku),
  })
}

export { KIT_SKUS }
