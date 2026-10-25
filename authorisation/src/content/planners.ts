import type { Locale } from '@/i18n/locale'
import catalog from './planners-catalog.json'
import ruCatalog from './ru/planners-catalog.json'

export type Planner = (typeof catalog.planners)[number] & { coverUrl: string }
export type PlannerCategory = (typeof catalog.categories)[number]

export const PLANNERS: Planner[] = catalog.planners.map((planner) => ({
  ...planner,
  coverUrl: `/assets/oto/covers/${planner.id}.png`,
}))
export const PLANNER_CATEGORIES = catalog.categories
export const PLANNER_COUNT = catalog.planners.length
export const PLANNER_PAGES = catalog.totalPdfPages
export const PLANNER_OTO_CENTS = catalog.bundleOtoPriceCents
export const PLANNER_LIST_CENTS = catalog.listValueCents
export const PLANNER_SINGLE_CENTS = catalog.singlePriceCents
export const PLANNER_BUNDLE_SLUG = catalog.bundleSlug

export function money(cents: number) {
  return '$' + (cents / 100).toFixed(2)
}

function buildPlanners(source: typeof catalog) {
  return {
    planners: source.planners.map((planner) => ({
      ...planner,
      coverUrl: `/assets/oto/covers/${planner.id}.png`,
    })),
    categories: source.categories,
  }
}

const ruPlanners = buildPlanners(ruCatalog as typeof catalog)

export function plannerContent(locale: Locale) {
  return locale === 'ru' ? ruPlanners : { planners: PLANNERS, categories: PLANNER_CATEGORIES }
}

export function plannersInCategory(categoryId: string, locale: Locale = 'en') {
  const { planners, categories } = plannerContent(locale)
  const category = categories.find((item) => item.id === categoryId)
  if (!category) return []
  return planners.filter((planner) => category.plannerIds.includes(planner.id))
}
