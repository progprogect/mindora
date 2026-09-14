import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { purchases } from '../db/schema.js'

export const PLANNER_IDS = [
  'lets-get-productive',
  'deep-focus-at-work',
  'distraction-free',
  'overcoming-lazy-days',
  'personal-growth',
  'self-reflection-journal',
  'dream-bigger',
  'live-with-purpose',
  'find-your-passion',
  'financial-discipline',
] as const

export type PlannerId = (typeof PLANNER_IDS)[number]

export function isPlannerId(id: string): id is PlannerId {
  return (PLANNER_IDS as readonly string[]).includes(id)
}

function ownsPlannerBundle(owned: Set<string>) {
  return owned.has('planner-bundle') || owned.has('planner-bundle-library')
}

const PLANNER_CHECKOUT_NAMES: Record<PlannerId, string> = {
  'lets-get-productive': "Let's Get Productive Planner",
  'deep-focus-at-work': 'Deep Focus at Work Planner',
  'distraction-free': 'Distraction Free Planner',
  'overcoming-lazy-days': 'Overcoming Lazy Days Planner',
  'personal-growth': 'Personal Growth Planner',
  'self-reflection-journal': 'Self Reflection Journal',
  'dream-bigger': 'Dream Bigger Planner',
  'live-with-purpose': 'Live With Purpose Planner',
  'find-your-passion': 'Find Your Passion Workbook',
  'financial-discipline': 'Financial Discipline Planner',
}

export const COACH_SKU = 'mindora-ai-coach'
export const COACH_SKU_ALIAS = 'wise-ai-coach'
const COACH_SKUS = [COACH_SKU, COACH_SKU_ALIAS] as const

export function isCoachOffer(offerSlug: string) {
  return offerSlug === COACH_SKU || offerSlug === COACH_SKU_ALIAS
}

export function offerSlugsForLookup(offerSlug: string): string[] {
  if (isCoachOffer(offerSlug)) return [...COACH_SKUS]
  return [offerSlug]
}

export function offerAmountCents(offerSlug: string): number | null {
  if (offerSlug === 'planner-bundle') return 495
  if (offerSlug === 'planner-bundle-library') return 795
  if (offerSlug === 'ultimate-prompt-library-oto') return 997
  if (offerSlug === 'ultimate-prompt-library') return 1995
  if (isCoachOffer(offerSlug)) return 1995
  if (offerSlug.startsWith('planner-')) return 295
  return null
}

export function offerCheckoutName(offerSlug: string): string {
  if (offerSlug === 'ultimate-prompt-library' || offerSlug === 'ultimate-prompt-library-oto') {
    return 'Prompt Library'
  }
  if (offerSlug === 'planner-bundle' || offerSlug === 'planner-bundle-library') return 'All 10 planners'
  if (isCoachOffer(offerSlug)) return 'Mindora AI Coach'
  if (offerSlug.startsWith('planner-')) {
    const id = offerSlug.slice('planner-'.length)
    if (isPlannerId(id)) return PLANNER_CHECKOUT_NAMES[id]
    return 'Planner PDF'
  }
  return 'Add-on'
}

export function skusForOffer(offerSlug: string): string[] {
  if (offerSlug === 'planner-bundle' || offerSlug === 'planner-bundle-library') {
    return ['planner-bundle', ...PLANNER_IDS.map((id) => `planner-${id}`)]
  }
  if (offerSlug === 'ultimate-prompt-library-oto') return ['ultimate-prompt-library']
  if (isCoachOffer(offerSlug)) return [...COACH_SKUS]
  return [offerSlug]
}

export async function ownsOffer(userId: string, offerSlug: string) {
  const skus = skusForOffer(offerSlug)
  for (const sku of skus) {
    if (!(await hasSku(userId, sku))) return false
  }
  return skus.length > 0
}

export async function listPurchases(userId: string) {
  return db.select().from(purchases).where(eq(purchases.userId, userId))
}

export async function hasSku(userId: string, sku: string) {
  const rows = await db.select().from(purchases).where(eq(purchases.userId, userId))
  const owned = new Set(rows.map((row) => row.sku))
  if (owned.has(sku)) return true
  if (isCoachOffer(sku) && (owned.has(COACH_SKU) || owned.has(COACH_SKU_ALIAS))) return true
  if (sku.startsWith('planner-') && ownsPlannerBundle(owned)) return true
  return false
}

export async function recordPurchase(userId: string, offerSlug: string) {
  const skus = isCoachOffer(offerSlug) ? [COACH_SKU] : skusForOffer(offerSlug)
  for (const sku of skus) {
    try {
      await db.insert(purchases).values({ userId, sku })
    } catch {
      // unique — already owned
    }
  }
}
