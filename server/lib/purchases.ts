/** Canonical LMS: `authorisation/server`. Railway mirror — do not add LMS features here. */
import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { purchases } from '../db/schema.js'

const PLANNER_IDS = [
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
]

export function offerAmountCents(offerSlug: string): number | null {
  if (offerSlug === 'planner-bundle') return 495
  if (offerSlug === 'planner-bundle-library') return 795
  if (offerSlug === 'ultimate-prompt-library') return 1995
  if (offerSlug === 'wise-ai-coach') return 1995
  if (offerSlug.startsWith('planner-')) return 295
  return null
}

export function skusForOffer(offerSlug: string): string[] {
  if (offerSlug === 'planner-bundle' || offerSlug === 'planner-bundle-library') {
    return ['planner-bundle', ...PLANNER_IDS.map((id) => `planner-${id}`)]
  }
  return [offerSlug]
}

export async function listPurchases(userId: string) {
  return db.select().from(purchases).where(eq(purchases.userId, userId))
}

export async function hasSku(userId: string, sku: string) {
  const rows = await db.select().from(purchases).where(eq(purchases.userId, userId))
  const owned = new Set(rows.map((row) => row.sku))
  if (owned.has(sku)) return true
  if (sku.startsWith('planner-') && owned.has('planner-bundle')) return true
  return false
}

export async function recordPurchase(userId: string, offerSlug: string) {
  const skus = skusForOffer(offerSlug)
  for (const sku of skus) {
    try {
      await db.insert(purchases).values({ userId, sku })
    } catch {
      // unique — already owned
    }
  }
}
