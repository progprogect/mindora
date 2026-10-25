import { moneyBackCopy, type MarketingLocale } from '@/marketing/data/moneyBack'

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
  { id: 'monthly', name: 'Monthly Plan', price: 2999, intervalMonths: 1 },
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

const BADGE_LABELS: Record<MarketingLocale, Record<string, string>> = {
  en: {
    'MOST POPULAR': 'MOST POPULAR',
    'BEST VALUE': 'BEST VALUE',
  },
  ru: {
    'MOST POPULAR': 'САМЫЙ ПОПУЛЯРНЫЙ',
    'BEST VALUE': 'ЛУЧШАЯ ЦЕНА',
  },
}

export function formatPlanBadge(badge: string | undefined, locale: MarketingLocale): string | undefined {
  if (!badge) return undefined
  return BADGE_LABELS[locale][badge] ?? badge
}

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

export function pricingLabel(intervalMonths: number, locale: MarketingLocale): string {
  if (locale === 'ru') {
    return intervalMonths === 1 ? '1 месяц' : `${intervalMonths} мес.`
  }
  return intervalMonths === 1 ? '1 month' : `${intervalMonths} months`
}

export function pricingSummary(plan: PricingCatalogPlan, locale: MarketingLocale): string {
  const total = formatPlanTotal(plan.price)
  const monthly = formatPerMonth(plan.price, plan.intervalMonths)
  if (locale === 'ru') {
    if (plan.intervalMonths === 1) {
      return `$1 за 3 дня, затем $${total}/мес. Отмена в любой момент.`
    }
    if (plan.intervalMonths === 12) {
      return `$1 за 3 дня, затем $${total} в год ($${monthly}/мес.). Отмена в любой момент.`
    }
    return `$1 за 3 дня, затем $${total} каждые ${plan.intervalMonths} мес. ($${monthly}/мес.). Отмена в любой момент.`
  }
  if (plan.intervalMonths === 1) {
    return `$1 for 3 days, then $${total}/month. Cancel any time.`
  }
  if (plan.intervalMonths === 12) {
    return `$1 for 3 days, then $${total} per year ($${monthly}/month). Cancel any time.`
  }
  return `$1 for 3 days, then $${total} every ${plan.intervalMonths} months ($${monthly}/month). Cancel any time.`
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

export const PRICING_COPY = {
  en: {
    pageTitle: 'Pricing — MindoraAcademy.com | Simple Plans, Full Platform Access',
    heroTitlePrefix: 'Start with a ',
    heroTitleHighlight: '$1 trial',
    heroTitleSuffix: ' for 3 days',
    heroSubtitle:
      'Full access to every course, your AI Coach, and personalised roadmap — normally $29.99/mo. Cancel any time before day 3 — you won\'t be charged.',
    promoBanner: 'Just $1 to start — full access for 3 days',
    choosePlan: 'Choose the plan that continues after your trial:',
    savePercent: (n: number) => `Save ${n}%`,
    perMonth: '/mo',
    cta: 'Start my $1 trial',
    billingQuestions: 'Questions about billing? Visit our',
    billingLink: 'Billing & Plans',
    billingSuffix: 'page.',
    features: [
      'Full access to every course & path',
      'AI Coach — personalised, 24/7',
      'Personalised roadmap & progress tracking',
      'Certificates of completion',
      'New courses added every month',
      'Cancel any time, no contract',
    ],
    trust: [
      moneyBackCopy('en').title,
      'Cancel any time',
      'Secure payment via Stripe',
    ],
  },
  ru: {
    pageTitle: 'Цены — MindoraAcademy.com | Простые планы, полный доступ к платформе',
    heroTitlePrefix: 'Начните с ',
    heroTitleHighlight: 'пробного периода за $1',
    heroTitleSuffix: ' на 3 дня',
    heroSubtitle:
      'Полный доступ ко всем курсам, AI Coach и персональной дорожной карте — обычно $29.99/мес. Отмените до 3-го дня — списания не будет.',
    promoBanner: 'Всего $1 для старта — полный доступ на 3 дня',
    choosePlan: 'Выберите план, который продолжится после пробного периода:',
    savePercent: (n: number) => `Экономия ${n}%`,
    perMonth: '/мес',
    cta: 'Начать пробный период за $1',
    billingQuestions: 'Вопросы по оплате? Перейдите на страницу',
    billingLink: 'Оплата и планы',
    billingSuffix: '.',
    features: [
      'Полный доступ ко всем курсам и траекториям',
      'AI Coach — персонально, 24/7',
      'Персональная дорожная карта и отслеживание прогресса',
      'Сертификаты о прохождении',
      'Новые курсы каждый месяц',
      'Отмена в любой момент, без контракта',
    ],
    trust: [
      moneyBackCopy('ru').title,
      'Отмена в любой момент',
      'Безопасная оплата через Stripe',
    ],
  },
} as const

export function pricingCopy(locale: MarketingLocale) {
  return PRICING_COPY[locale]
}

export const PRICING_FEATURES = PRICING_COPY.en.features
export const PRICING_TRUST = PRICING_COPY.en.trust
