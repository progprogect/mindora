const ANCHOR_MONTHLY_CENTS = 2999

export const PRICING_CATALOG_NAMES = ['Monthly Plan', 'Quarterly Plan', 'Annual Plan'] as const

export type PricingCatalogPlan = {
  id: string
  name: string
  price: number
  intervalMonths: number
  badge?: string
}

/** Local fallback when `/api/products` is empty or missing catalog rows. */
export const PRICING_FALLBACK_PLANS: PricingCatalogPlan[] = [
  { id: 'monthly', name: 'Monthly Plan', price: 1999, intervalMonths: 1 },
  {
    id: 'quarterly',
    name: 'Quarterly Plan',
    price: 3897,
    intervalMonths: 3,
    badge: 'MOST POPULAR',
  },
  {
    id: 'annual',
    name: 'Annual Plan',
    price: 8999,
    intervalMonths: 12,
    badge: 'BEST VALUE',
  },
]

const CATALOG_NAME_SET = new Set<string>(PRICING_CATALOG_NAMES)

export function monthlyCents(price: number, intervalMonths: number): number {
  return Math.round(price / intervalMonths)
}

export function pricingSavePercent(price: number, intervalMonths: number): number {
  const monthly = monthlyCents(price, intervalMonths)
  return Math.round((1 - monthly / ANCHOR_MONTHLY_CENTS) * 100)
}

export function formatPerMonth(price: number, intervalMonths: number): string {
  return (monthlyCents(price, intervalMonths) / 100).toFixed(2)
}

export function formatPlanTotal(price: number): string {
  return (price / 100).toFixed(2)
}

export function pricingLabel(intervalMonths: number): string {
  return intervalMonths === 1 ? '1 month' : `${intervalMonths} months`
}

export function pricingSummary(plan: PricingCatalogPlan): string {
  const total = formatPlanTotal(plan.price)
  const monthly = formatPerMonth(plan.price, plan.intervalMonths)
  if (plan.intervalMonths === 1) {
    return `$1 for 7 days, then $${total}/month. Cancel any time.`
  }
  if (plan.intervalMonths === 12) {
    return `$1 for 7 days, then $${total} per year ($${monthly}/month). Cancel any time.`
  }
  return `$1 for 7 days, then $${total} every ${plan.intervalMonths} months ($${monthly}/month). Cancel any time.`
}

export function resolvePricingCatalog(
  products:
    | Array<{
        _id: string
        name: string
        price: number
        intervalMonths: number
        badge?: string
      }>
    | undefined,
): PricingCatalogPlan[] {
  const fromApi = new Map<string, PricingCatalogPlan>()
  for (const product of products ?? []) {
    if (!CATALOG_NAME_SET.has(product.name)) continue
    fromApi.set(product.name, {
      id: product._id,
      name: product.name,
      price: product.price,
      intervalMonths: product.intervalMonths,
      badge: product.badge,
    })
  }
  const merged = PRICING_FALLBACK_PLANS.map((fallback) => fromApi.get(fallback.name) ?? fallback)
  return merged.sort((a, b) => a.price - b.price)
}

export const PRICING_FEATURES = [
  'Full access to every course & path',
  'AI Coach — personalised, 24/7',
  'Personalised roadmap & progress tracking',
  'Certificates of completion',
  'New courses added every month',
  'Cancel any time, no contract',
] as const

export const PRICING_TRUST = [
  '30-Day Money-Back Guarantee',
  'Cancel any time',
  'Secure payment via Stripe',
] as const
