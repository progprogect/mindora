import hubChrome from './catalogs/hub-chrome.json'
import hubs from './catalogs/hubs.json'
import liveCards from './catalogs/live-cards.json'
import paths from './catalogs/paths.json'

export type QuizQuestion = {
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
  type?: string
}

export type LessonCard = {
  type?: string
  headline?: string
  body?: string
  bullets?: string[]
  stat?: string
  statLabel?: string
  callout?: string
  front?: string
  back?: string
  id?: string
}

export type CourseLesson = {
  id: string
  dayNumber: number
  title: string
  subtitle?: string
  duration?: string
  xpValue?: number
  xp?: number
  moduleId?: string
  cards: LessonCard[]
  quiz: QuizQuestion[]
}

export type CourseModule = {
  id: string
  moduleNumber?: number
  title: string
  subtitle?: string
  days?: string
  skill?: string
  lessonIds?: string[]
  lessons?: Array<string | number>
}

export type Course = {
  id: string
  title: string
  subtitle?: string
  totalDays: number
  totalXp: number
  modules: CourseModule[]
  lessons: CourseLesson[]
}

const courseLoaders = import.meta.glob('./courses/*.json')

const cache = new Map<string, Course>()

function loaderPath(slug: string) {
  return Object.keys(courseLoaders).find((path) => path.endsWith(`/${slug}.json`))
}

export function hasCourseFile(slug: string) {
  return Boolean(loaderPath(slug))
}

export async function loadCourse(slug: string): Promise<Course | undefined> {
  const hit = cache.get(slug)
  if (hit) return hit
  const path = loaderPath(slug)
  if (!path) return undefined
  const mod = (await courseLoaders[path]!()) as { default: Course }
  cache.set(slug, mod.default)
  return mod.default
}

export function lessonXp(lesson: CourseLesson) {
  return lesson.xpValue ?? lesson.xp ?? 20
}

export function isFlashcard(card: LessonCard) {
  return Boolean(card.front && card.back) && !card.headline
}

export function moduleLessonIds(course: Course, module: CourseModule) {
  if (module.lessonIds?.length) return module.lessonIds
  if (!module.lessons?.length) return []
  return module.lessons
    .map((item) => {
      if (typeof item === 'string') return item
      return course.lessons.find((lesson) => lesson.dayNumber === item)?.id
    })
    .filter((id): id is string => Boolean(id))
}

export function getHub(slug: string) {
  const extra = (hubs as Record<string, Record<string, unknown>>)[slug] ?? {}
  return {
    ...hubChrome.courseHeroDefaults,
    ...hubChrome.certificateDefaults,
    testimonials: hubChrome.testimonialsDefault,
    learningPathH2: hubChrome.learningPathH2,
    learningPathSub: hubChrome.learningPathSub,
    ...extra,
  } as Record<string, unknown> & {
    testimonials: typeof hubChrome.testimonialsDefault
    learningPathH2: string
    learningPathSub: string
    headingText?: string
    subText?: string
    description?: string
    socialProof?: string
    unitLabel?: string
    level?: string | null
    badge?: { icon?: string; label?: string } | null
    includes?: Array<{ icon: string; text: string }>
    outcomeBullets?: Array<{ icon: string; text: string }>
    certificateChip?: string
    certificateDescription?: string
    ctaH2?: string
    ctaBody?: string
  }
}

export type PathCatalog = {
  path?: string
  template: string
  h1: string
  tagline: string
  liveSlugs: string[]
  comingSoonCards?: Array<Record<string, string>>
  comingSoonStrip?: Array<{ name: string; difficulty: string; time: string }>
  browseBySection?: Array<Record<string, unknown>>
}

export function getPath(key: string): PathCatalog | undefined {
  return (paths as unknown as Record<string, PathCatalog>)[key]
}

export function getLiveCards(key: string) {
  return (liveCards as Record<string, { cards?: Array<Record<string, unknown>>; hero?: Record<string, string>; badge?: string; emptyCopy?: { title: string; sub: string }; comingSoonStrip?: Array<{ name: string; difficulty: string; time: string }> }>)[key]
}

export const liveSlugSet = new Set(
  Object.values(paths).flatMap((path) => path.liveSlugs ?? []),
)
