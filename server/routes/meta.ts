import { createHash } from 'node:crypto'
import { Hono } from 'hono'
import { z } from 'zod'
import { loadEnv } from '../env.js'

const eventSchema = z.object({
  eventName: z.string().min(1),
  eventId: z.string().min(1),
  email: z.string().optional(),
  eventSourceUrl: z.string().optional(),
  customData: z.record(z.any()).optional(),
})

function sha256Hex(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

export const metaRoutes = new Hono()

metaRoutes.post('/meta/event', async (c) => {
  const parsed = eventSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  const env = loadEnv()
  const { eventName, eventId, email, eventSourceUrl, customData } = parsed.data
  if (!env.META_PIXEL_ID || !env.META_ACCESS_TOKEN) {
    return c.json({ skipped: true, reason: 'META_PIXEL_ID / META_ACCESS_TOKEN not configured' })
  }
  const userData: Record<string, string[]> = {}
  if (email) userData.em = [sha256Hex(email)]
  const payload = {
    data: [
      {
        event_name: eventName,
        event_id: eventId,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: eventSourceUrl,
        user_data: userData,
        custom_data: customData ?? {},
      },
    ],
  }
  const response = await fetch(
    `https://graph.facebook.com/v21.0/${env.META_PIXEL_ID}/events?access_token=${env.META_ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
  )
  if (!response.ok) {
    const text = await response.text()
    return c.json({ error: `Meta CAPI relay failed (${response.status}): ${text}` }, 502)
  }
  return c.json({ skipped: false })
})
