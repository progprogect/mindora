export interface PlanView {
  id: string
  name: string
  /** Price in cents, full (non-discounted) price for the whole interval. */
  price: number
  intervalMonths: number
  badge?: string
}

/**
 * Fallback plans shown while `products.list` is loading or if the Convex
 * deployment isn't configured yet — mirrors `convex/products.ts`
 * `seedDefaultProducts`. Replace with real Stripe-backed pricing there.
 */
export const DEFAULT_PLANS: PlanView[] = [
  { id: 'monthly', name: 'Monthly Plan', price: 2900, intervalMonths: 1 },
  { id: '6month', name: '6-Month Plan', price: 14900, intervalMonths: 6, badge: 'MOST POPULAR' },
  { id: '12month', name: '12-Month Plan', price: 23900, intervalMonths: 12, badge: 'BEST VALUE' },
]

/** Display metadata keyed by plan name — mirrors production's `v` lookup in `ClaudeSalesPlanScreen-*.js`. */
export const PLAN_DISPLAY_META: Record<string, { label: string; periodLabel: string }> = {
  'Monthly Plan': { label: '1 month', periodLabel: 'per month' },
  '6-Month Plan': { label: '6 months', periodLabel: 'every 6 months' },
  '12-Month Plan': { label: '12 months', periodLabel: 'per year' },
}

export function formatUsd(cents: number): string {
  return (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export function applyDiscount(price: number, percentOff: number): number {
  return Math.round(price * (1 - percentOff / 100))
}
