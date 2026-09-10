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

export function orderedLessons(lessons: CourseLesson[]) {
  return [...lessons].sort((a, b) => a.dayNumber - b.dayNumber || a.id.localeCompare(b.id))
}

export function normalizeCourse(course: Course): Course {
  const seen = new Set<string>()
  const lessons: CourseLesson[] = []
  for (const lesson of course.lessons) {
    if (seen.has(lesson.id)) continue
    seen.add(lesson.id)
    lessons.push(lesson)
  }
  return { ...course, lessons: orderedLessons(lessons) }
}

export function nextIncompleteLesson(lessons: CourseLesson[], done: Set<string>) {
  const ordered = orderedLessons(lessons)
  return ordered.find((lesson) => !done.has(lesson.id)) ?? ordered[0]
}

export function lessonAfter(lessons: CourseLesson[], currentId: string) {
  const ordered = orderedLessons(lessons)
  const index = ordered.findIndex((lesson) => lesson.id === currentId)
  return index >= 0 ? ordered[index + 1] : undefined
}

export function completedSlugs(
  rows: Array<{ courseId: string; lessonSlug: string; status: string }>,
  courseSlug: string,
) {
  return new Set(
    rows.filter((row) => row.courseId === courseSlug && row.status === 'completed').map((row) => row.lessonSlug),
  )
}

/** Resume the last opened lesson, or the next one after it if that lesson is already done. */
export function continueLessonInCourse(course: Course, done: Set<string>, preferSlug?: string) {
  const ordered = orderedLessons(course.lessons)
  if (!ordered.length) return undefined
  if (preferSlug) {
    const index = ordered.findIndex((item) => item.id === preferSlug)
    if (index >= 0) {
      if (!done.has(preferSlug)) return ordered[index]
      const after = ordered.slice(index + 1).find((item) => !done.has(item.id))
      if (after) return after
    }
  }
  return nextIncompleteLesson(ordered, done)
}

export function pickHomeContinue(args: {
  lastOpened?: { courseId: string; lessonSlug: string } | null
  lastCourse: Course | null | undefined
  fallbackSlug: string
  fallbackCourse: Course | null | undefined
  progress: Array<{ courseId: string; lessonSlug: string; status: string }>
}): { course: Course; lesson: CourseLesson; courseSlug: string } | null {
  const lastSlug = args.lastOpened?.courseId
  const last = args.lastCourse
  if (lastSlug && last && last.lessons.length) {
    const done = completedSlugs(args.progress, lastSlug)
    const allDone = last.lessons.every((item) => done.has(item.id))
    if (!allDone) {
      const lesson = continueLessonInCourse(last, done, args.lastOpened?.lessonSlug)
      if (lesson) return { course: last, lesson, courseSlug: lastSlug }
    }
  }

  const fallback = args.fallbackCourse
  if (fallback && fallback.lessons.length) {
    const lesson = continueLessonInCourse(fallback, completedSlugs(args.progress, args.fallbackSlug))
    if (lesson) return { course: fallback, lesson, courseSlug: args.fallbackSlug }
  }
  return null
}

export function pickPathContinueCard<T extends { id: string; lessons?: number }>(args: {
  cards: T[]
  lastOpened?: { courseId: string } | null
  completed: Array<{ courseId: string }>
  isLive: (id: string) => boolean
}): T | undefined {
  const doneCount = (id: string) => args.completed.filter((row) => row.courseId === id).length
  const incomplete = (card: T) => {
    if (!args.isLive(card.id)) return false
    const total = card.lessons ?? 0
    return total === 0 || doneCount(card.id) < total
  }
  const lastId = args.lastOpened?.courseId
  const lastCard = lastId ? args.cards.find((card) => card.id === lastId) : undefined
  if (lastCard && incomplete(lastCard)) return lastCard
  return args.cards.find((card) => incomplete(card) && doneCount(card.id) > 0) ?? args.cards.find((card) => args.isLive(card.id))
}

export function getCachedCourse(slug: string): Course | undefined {
  return cache.get(slug)
}

export async function loadCourse(slug: string): Promise<Course | undefined> {
  const hit = getCachedCourse(slug)
  if (hit) return hit
  const path = loaderPath(slug)
  if (!path) return undefined
  const mod = (await courseLoaders[path]!()) as { default: Course }
  const course = normalizeCourse(mod.default)
  cache.set(slug, course)
  return course
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

const TWENTY_EIGHT_DAY = '28-day-ai-challenge'

const CERT_CHROME = {
  kicker: hubChrome.certificateDefaults.kicker,
  certificateKicker: hubChrome.certificateDefaults.certificateKicker,
  awardedToPlaceholder: hubChrome.certificateDefaults.awardedToPlaceholder,
  downloadComingSoon: hubChrome.certificateDefaults.downloadComingSoon,
  unlocked: hubChrome.certificateDefaults.unlocked,
}

export function getHub(slug: string) {
  const extra = (hubs as Record<string, Record<string, unknown>>)[slug] ?? {}
  const is28 = slug === TWENTY_EIGHT_DAY
  return {
    ...(is28 ? hubChrome.courseHeroDefaults : {}),
    ...(is28 ? hubChrome.certificateDefaults : CERT_CHROME),
    testimonials: is28 ? hubChrome.testimonialsDefault : [],
    learningPathH2: hubChrome.learningPathH2,
    learningPathSub: hubChrome.learningPathSub,
    unitLabel: is28 ? 'days' : 'lessons',
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
  heroCourseCount?: number
  liveSlugs: string[]
  comingSoonCards?: Array<Record<string, unknown>>
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
