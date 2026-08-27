/** Canonical LMS: `authorisation/server`. Railway mirror — do not add LMS features here. */
import { and, desc, eq, inArray } from 'drizzle-orm'
import { db } from '../db/index.js'
import { badges, dailyStats, lessonProgress } from '../db/schema.js'

export type ProgressLesson = {
  courseId: string
  lessonSlug: string
  status: string
  xpEarned: number
  completedAt: number | null
}

function isoDay(input?: string) {
  if (input && /^\d{4}-\d{2}-\d{2}$/.test(input)) return input
  return new Date().toISOString().slice(0, 10)
}

function prevIsoDay(day: string) {
  const [year, month, date] = day.split('-').map(Number)
  const next = new Date(Date.UTC(year, month - 1, date))
  next.setUTCDate(next.getUTCDate() - 1)
  return next.toISOString().slice(0, 10)
}

function xpFromQuiz(xpValue: number, correct: number, total: number) {
  if (total <= 0) return xpValue
  if (correct === total) return xpValue
  const accuracy = correct / total
  if (accuracy >= 0.75) return Math.round(xpValue * 0.8)
  return Math.round(xpValue * 0.5)
}

async function awardBadge(userId: string, badgeId: string, earned: string[]) {
  try {
    await db.insert(badges).values({ userId, badgeId })
    earned.push(badgeId)
  } catch {
    // already earned
  }
}

export async function getUserStats(userId: string) {
  const [stats] = await db.select().from(dailyStats).where(eq(dailyStats.userId, userId)).limit(1)
  return {
    xp: stats?.xpTotal ?? 0,
    streakCount: stats?.streak ?? 0,
    lastActivityDate: stats?.lastLessonDate ?? null,
  }
}

export async function getAllProgress(userId: string) {
  const [lessons, earned, stats] = await Promise.all([
    db.select().from(lessonProgress).where(eq(lessonProgress.userId, userId)),
    db.select().from(badges).where(eq(badges.userId, userId)),
    getUserStats(userId),
  ])
  return {
    lessons: lessons.map(
      (row): ProgressLesson => ({
        courseId: row.courseSlug,
        lessonSlug: row.lessonSlug,
        status: row.status,
        xpEarned: row.xp,
        completedAt: row.completedAt ? row.completedAt.getTime() : null,
      }),
    ),
    badges: earned.map((row) => ({
      badgeId: row.badgeId,
      earnedAt: row.earnedAt.getTime(),
    })),
    user: stats,
  }
}

export async function completeLesson(args: {
  userId: string
  courseSlug: string
  lessonSlug: string
  xpValue: number
  correct?: number
  total?: number
  localDate?: string
  moduleLessonSlugs?: string[]
  totalLessons?: number
}) {
  const [existing] = await db
    .select()
    .from(lessonProgress)
    .where(
      and(
        eq(lessonProgress.userId, args.userId),
        eq(lessonProgress.courseSlug, args.courseSlug),
        eq(lessonProgress.lessonSlug, args.lessonSlug),
      ),
    )
    .limit(1)

  if (existing?.status === 'completed') {
    return {
      alreadyCompleted: true,
      xpEarned: existing.xp,
      newBadges: [] as string[],
      stats: await getUserStats(args.userId),
    }
  }

  const correct = args.correct ?? args.total ?? 0
  const total = args.total ?? 0
  const xpEarned = xpFromQuiz(Math.max(0, args.xpValue), correct, total)
  const completedAt = new Date()
  const today = isoDay(args.localDate)
  const newBadges: string[] = []

  if (existing) {
    await db
      .update(lessonProgress)
      .set({ status: 'completed', xp: xpEarned, completedAt })
      .where(eq(lessonProgress.id, existing.id))
  } else {
    await db.insert(lessonProgress).values({
      userId: args.userId,
      courseSlug: args.courseSlug,
      lessonSlug: args.lessonSlug,
      status: 'completed',
      xp: xpEarned,
      completedAt,
    })
  }

  const [stats] = await db.select().from(dailyStats).where(eq(dailyStats.userId, args.userId)).limit(1)
  const last = stats?.lastLessonDate ?? null
  let streak = stats?.streak ?? 0
  if (last === today) {
    // same-day extra lesson keeps streak
  } else if (last && last === prevIsoDay(today)) {
    streak += 1
  } else {
    streak = 1
  }
  const xpTotal = (stats?.xpTotal ?? 0) + xpEarned
  if (stats) {
    await db
      .update(dailyStats)
      .set({ streak, lastLessonDate: today, xpTotal })
      .where(eq(dailyStats.id, stats.id))
  } else {
    await db.insert(dailyStats).values({
      userId: args.userId,
      streak,
      lastLessonDate: today,
      xpTotal,
    })
  }

  const completed = await db
    .select()
    .from(lessonProgress)
    .where(and(eq(lessonProgress.userId, args.userId), eq(lessonProgress.status, 'completed')))

  if (completed.length === 1) await awardBadge(args.userId, 'first-step', newBadges)
  if (total > 0 && correct === total) await awardBadge(args.userId, 'perfect-score', newBadges)
  if (streak >= 7) await awardBadge(args.userId, 'on-fire', newBadges)
  if (streak >= 30) await awardBadge(args.userId, 'unstoppable', newBadges)

  const weekAgo = new Date(completedAt.getTime() - 7 * 86400000)
  const weekLessons = completed.filter((row) => row.completedAt && row.completedAt >= weekAgo)
  if (weekLessons.length >= 7) await awardBadge(args.userId, 'week-warrior', newBadges)

  if (args.moduleLessonSlugs && args.moduleLessonSlugs.length > 0) {
    const moduleDone = await db
      .select()
      .from(lessonProgress)
      .where(
        and(
          eq(lessonProgress.userId, args.userId),
          eq(lessonProgress.courseSlug, args.courseSlug),
          eq(lessonProgress.status, 'completed'),
          inArray(lessonProgress.lessonSlug, args.moduleLessonSlugs),
        ),
      )
    if (moduleDone.length >= args.moduleLessonSlugs.length) {
      await awardBadge(args.userId, 'module-master', newBadges)
    }
  }

  const courseDone = completed.filter((row) => row.courseSlug === args.courseSlug)
  if (args.totalLessons && courseDone.length >= args.totalLessons) {
    await awardBadge(args.userId, 'course-graduate', newBadges)
  }

  return {
    alreadyCompleted: false,
    xpEarned,
    newBadges,
    stats: { xp: xpTotal, streakCount: streak, lastActivityDate: today },
  }
}

export async function getCourseProgress(userId: string, courseSlug: string) {
  return db
    .select()
    .from(lessonProgress)
    .where(and(eq(lessonProgress.userId, userId), eq(lessonProgress.courseSlug, courseSlug)))
    .orderBy(desc(lessonProgress.completedAt))
}
