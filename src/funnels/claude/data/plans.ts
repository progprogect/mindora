import type { ClaudeLocale } from '@/funnels/claude/i18n/locale'
import { claudeSalesUiCopy } from '@/funnels/claude/i18n/claudeSalesUiCopy'

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
  'Quarterly Plan': { label: '3 months', periodLabel: 'every 3 months', months: 3, badge: 'MOST POPULAR' },
  'Annual Plan': { label: '12 months', periodLabel: 'per year', months: 12, badge: 'BEST VALUE' },
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

export function expiredPickerPlans(products: PlanView[] | undefined): PlanView[] {
  const allowed = new Set(DEFAULT_PLANS.map((plan) => plan.id))
  const fromApi = products?.filter((plan) => allowed.has(plan.id))
  const source = fromApi && fromApi.length >= 3 ? fromApi : DEFAULT_PLANS
  return [...source].sort((a, b) => a.price - b.price)
}

export function planMeta(plan: PlanView, locale: ClaudeLocale = 'en') {
  const sales = claudeSalesUiCopy(locale).plan.expired
  const base = PLAN_DISPLAY_META[plan.name]
  const localized = sales.planLabels[plan.name as keyof typeof sales.planLabels]
  const badgeRaw = plan.badge ?? base?.badge
  const badge =
    badgeRaw && badgeRaw in sales.badges
      ? sales.badges[badgeRaw as keyof typeof sales.badges]
      : badgeRaw

  if (base || localized) {
    return {
      label: localized?.label ?? base?.label ?? plan.name,
      periodLabel: localized?.periodLabel ?? base?.periodLabel ?? sales.perPeriod,
      months: base?.months ?? plan.intervalMonths,
      badge,
    }
  }
  return {
    label: plan.name,
    periodLabel: sales.perPeriod,
    months: plan.intervalMonths,
    badge,
  }
}
