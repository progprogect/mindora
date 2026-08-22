export interface PlanView {
  id: string
  name: string
  /** Price in cents, full (non-discounted) price for the whole interval. */
  price: number
  intervalMonths: number
  badge?: string
}

/**
 * Fallback plans for the expired-offer picker (Monthly / 6 / 12).
 * While the 10-minute $1 offer is live, checkout uses the monthly product only.
 */
export const DEFAULT_PLANS: PlanView[] = [
  { id: 'monthly', name: 'Monthly Plan', price: 2900, intervalMonths: 1 },
  { id: '6month', name: '6-Month Plan', price: 14900, intervalMonths: 6, badge: 'MOST POPULAR' },
  { id: '12month', name: '12-Month Plan', price: 23900, intervalMonths: 12, badge: 'BEST VALUE' },
]

/** Display metadata keyed by plan name — production `v` lookup in ClaudeSalesPlanScreen. */
export const PLAN_DISPLAY_META: Record<
  string,
  { label: string; periodLabel: string; months: number; badge?: string }
> = {
  'Monthly Plan': { label: '1 month', periodLabel: 'per month', months: 1 },
  '6-Month Plan': { label: '6 months', periodLabel: 'every 6 months', months: 6, badge: 'MOST POPULAR' },
  '12-Month Plan': { label: '12 months', periodLabel: 'per year', months: 12, badge: 'BEST VALUE' },
}

/** Marketing anchor price shown struck-through next to the $1 trial total. */
export const ANCHOR_TOTAL_CENTS = 2999

/** Amount charged today to start the trial. */
export const TRIAL_TOTAL_CENTS = 100

export function formatUsd(cents: number): string {
  return (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export function applyDiscount(price: number, percentOff: number): number {
  return Math.round(price * (1 - percentOff / 100))
}

export function planMeta(plan: PlanView) {
  const extra = PLAN_DISPLAY_META[plan.name]
  if (extra) {
    return { ...extra, badge: plan.badge ?? extra.badge }
  }
  return {
    label: plan.name,
    periodLabel: 'per period',
    months: plan.intervalMonths,
    badge: plan.badge,
  }
}
