import catalog from './planners-catalog.json'

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

export function plannersInCategory(categoryId: string) {
  const category = PLANNER_CATEGORIES.find((item) => item.id === categoryId)
  if (!category) return []
  return PLANNERS.filter((planner) => category.plannerIds.includes(planner.id))
}
