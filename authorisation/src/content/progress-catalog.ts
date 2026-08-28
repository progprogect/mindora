import registry from './course-registry.json'
import liveCards from './catalogs/live-cards.json'
import { CATEGORY_LABEL } from './lms'

type LiveCard = { id: string; emoji?: string; title?: string; lessons?: number; xp?: number }

const cardsById = new Map<string, LiveCard>()
for (const path of Object.values(liveCards) as Array<{ cards?: LiveCard[] }>) {
  for (const card of path.cards ?? []) cardsById.set(card.id, card)
}

export const PROGRESS_COURSES: Record<
  string,
  { name: string; category: string; emoji: string; totalLessons: number }
> = Object.fromEntries(
  Object.entries(registry).map(([slug, meta]) => {
    const card = cardsById.get(slug)
    return [
      slug,
      {
        name: card?.title || meta.title,
        category: CATEGORY_LABEL[meta.category] || meta.category,
        emoji: card?.emoji || '📚',
        totalLessons: meta.lessonCount,
      },
    ]
  }),
)
