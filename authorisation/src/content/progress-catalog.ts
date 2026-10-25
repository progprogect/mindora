import type { Locale } from '@/i18n/locale'
import registry from './course-registry.json'
import liveCards from './catalogs/live-cards.json'
import ruRegistry from './ru/course-registry.json'
import ruLiveCards from './catalogs/ru/live-cards.json'
import { categoryLabel } from './lms'

type LiveCard = { id: string; emoji?: string; title?: string; lessons?: number; xp?: number }
type Registry = Record<string, { title: string; category: string; lessonCount: number }>

export type ProgressCourse = { name: string; category: string; emoji: string; totalLessons: number }

function buildProgress(
  cardsSource: typeof liveCards,
  registrySource: Registry,
  locale: Locale,
): Record<string, ProgressCourse> {
  const cardsById = new Map<string, LiveCard>()
  for (const path of Object.values(cardsSource) as Array<{ cards?: LiveCard[] }>) {
    for (const card of path.cards ?? []) cardsById.set(card.id, card)
  }
  return Object.fromEntries(
    Object.entries(registrySource).map(([slug, meta]) => {
      const card = cardsById.get(slug)
      return [
        slug,
        {
          name: card?.title || meta.title,
          category: categoryLabel(locale, meta.category) || meta.category,
          emoji: card?.emoji || '📚',
          totalLessons: meta.lessonCount,
        },
      ]
    }),
  )
}

export function progressCourses(locale: Locale = 'en') {
  if (locale === 'ru') return buildProgress(ruLiveCards as typeof liveCards, ruRegistry as Registry, locale)
  return buildProgress(liveCards, registry as Registry, locale)
}

export const PROGRESS_COURSES = progressCourses('en')
