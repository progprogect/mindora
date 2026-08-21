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
 * deployment isn't configured yet. Replace with real Stripe-backed pricing
 * via `products.seedDefaultProducts` — see README "Convex setup".
 */
export const DEFAULT_PLANS: PlanView[] = [
  { id: 'monthly', name: 'Monthly Plan', price: 2900, intervalMonths: 1 },
  { id: '6month', name: '6-Month Plan', price: 14900, intervalMonths: 6, badge: 'MOST POPULAR' },
  { id: '12month', name: '12-Month Plan', price: 23900, intervalMonths: 12, badge: 'BEST VALUE' },
]

export function formatUsd(cents: number): string {
  return (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export function applyDiscount(price: number, percentOff: number): number {
  return Math.round(price * (1 - percentOff / 100))
}
