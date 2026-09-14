import { Hono } from 'hono'
import { z } from 'zod'
import { requireAuth, type SessionEnv } from '../lib/session.js'
import { getThread, listThreadSummaries, sendMindoraMessage, mindoraQuota } from '../lib/mindora.js'

const sendSchema = z.object({
  text: z.string().min(1).max(4000),
  threadId: z.string().uuid().optional(),
  localDate: z.string().optional(),
})

export const mindoraRoutes = new Hono<SessionEnv>()

mindoraRoutes.get('/usage', requireAuth, async (c) => {
  return c.json(await mindoraQuota(c.get('userId'), c.req.query('localDate')))
})

mindoraRoutes.get('/threads', requireAuth, async (c) => {
  return c.json({ threads: await listThreadSummaries(c.get('userId')) })
})

mindoraRoutes.get('/threads/:id', requireAuth, async (c) => {
  const found = await getThread(c.get('userId'), c.req.param('id'))
  if (!found) return c.json({ error: 'Not found' }, 404)
  return c.json({
    id: found.thread.id,
    title: found.thread.title,
    messages: found.messages.map((row) => ({
      id: row.id,
      role: row.role,
      content: row.content,
      createdAt: row.createdAt.getTime(),
    })),
  })
})

mindoraRoutes.post('/messages', requireAuth, async (c) => {
  const parsed = sendSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  const result = await sendMindoraMessage({ userId: c.get('userId'), ...parsed.data })
  if ('error' in result && result.error) return c.json({ error: result.error }, 400)
  if (result.locked) return c.json({ locked: true, quota: result.quota }, 402)
  return c.json(result)
})
