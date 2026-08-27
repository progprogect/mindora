/** Canonical LMS: `authorisation/server`. Railway mirror — do not add LMS features here. */
import { Hono } from 'hono'
import { z } from 'zod'
import { completeLesson, getAllProgress, getCourseProgress } from '../lib/progress.js'
import { requireAuth, type SessionEnv } from '../lib/session.js'

const completeSchema = z.object({
  courseSlug: z.string().min(1),
  lessonSlug: z.string().min(1),
  xpValue: z.number().int().min(0).max(5000),
  correct: z.number().int().min(0).optional(),
  total: z.number().int().min(0).optional(),
  localDate: z.string().optional(),
  moduleLessonSlugs: z.array(z.string()).optional(),
  totalLessons: z.number().int().min(0).optional(),
})

export const progressRoutes = new Hono<SessionEnv>()

progressRoutes.get('/progress', requireAuth, async (c) => {
  return c.json(await getAllProgress(c.get('userId')))
})

progressRoutes.get('/progress/:courseSlug', requireAuth, async (c) => {
  const rows = await getCourseProgress(c.get('userId'), c.req.param('courseSlug'))
  return c.json({
    lessons: rows.map((row) => ({
      courseId: row.courseSlug,
      lessonSlug: row.lessonSlug,
      status: row.status,
      xpEarned: row.xp,
      completedAt: row.completedAt ? row.completedAt.getTime() : null,
    })),
  })
})

progressRoutes.post('/progress/complete', requireAuth, async (c) => {
  const parsed = completeSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  const result = await completeLesson({ userId: c.get('userId'), ...parsed.data })
  return c.json(result)
})
