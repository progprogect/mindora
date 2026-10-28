import { Hono } from 'hono'
import { z } from 'zod'
import { userCanAccessCourse } from '../lib/courseAccess.js'
import { loadCurrentUser } from '../lib/currentUser.js'
import { completeLesson, getAllProgress, getCourseProgress, openLesson } from '../lib/progress.js'
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

const openSchema = z.object({
  courseSlug: z.string().min(1),
  lessonSlug: z.string().min(1),
})

export const progressRoutes = new Hono<SessionEnv>()

progressRoutes.get('/progress', requireAuth, async (c) => {
  return c.json(await getAllProgress(c.get('userId')))
})

progressRoutes.post('/progress/open', requireAuth, async (c) => {
  const parsed = openSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload', code: 'invalid_payload' }, 400)
  const user = await loadCurrentUser(c.get('userId'))
  if (!user?.email) return c.json({ error: 'Not authenticated', code: 'not_authenticated' }, 401)
  if (!(await userCanAccessCourse(c.get('userId'), user.email, parsed.data.courseSlug))) {
    return c.json({ error: 'Course locked', code: 'course_locked' }, 403)
  }
  return c.json(await openLesson({ userId: c.get('userId'), ...parsed.data }))
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
  if (!parsed.success) return c.json({ error: 'Invalid payload', code: 'invalid_payload' }, 400)
  const user = await loadCurrentUser(c.get('userId'))
  if (!user?.email) return c.json({ error: 'Not authenticated', code: 'not_authenticated' }, 401)
  if (!(await userCanAccessCourse(c.get('userId'), user.email, parsed.data.courseSlug))) {
    return c.json({ error: 'Course locked', code: 'course_locked' }, 403)
  }
  const result = await completeLesson({ userId: c.get('userId'), ...parsed.data })
  return c.json(result)
})
