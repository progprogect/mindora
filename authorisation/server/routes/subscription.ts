import { Hono } from 'hono'
import { z } from 'zod'
import { cancelOwnSubscription, createPortalSession, getMine } from '../lib/subscription.js'
import { loadCurrentUser } from '../lib/currentUser.js'
import { publicOrigin } from '../lib/http.js'
import { requireAuth, type SessionEnv } from '../lib/session.js'

const portalSchema = z.object({
  returnUrl: z.string().optional(),
})

export const subscriptionRoutes = new Hono<SessionEnv>()

subscriptionRoutes.get('/me/subscription', requireAuth, async (c) => {
  const user = await loadCurrentUser(c.get('userId'))
  if (!user) return c.json({ error: 'Not authenticated' }, 401)
  const mine = await getMine(c.get('userId'), user.email)
  return c.json(mine)
})

subscriptionRoutes.post('/me/subscription/portal', requireAuth, async (c) => {
  const parsed = portalSchema.safeParse((await c.req.json().catch(() => ({}))) ?? {})
  const user = await loadCurrentUser(c.get('userId'))
  if (!user) return c.json({ error: 'Not authenticated' }, 401)
  const returnUrl = parsed.success && parsed.data.returnUrl ? parsed.data.returnUrl : `${publicOrigin(c)}/app/profile`
  try {
    return c.json(await createPortalSession(c.get('userId'), user.email, returnUrl))
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Portal unavailable'
    return c.json({ error: message }, 400)
  }
})

subscriptionRoutes.post('/me/subscription/cancel', requireAuth, async (c) => {
  const user = await loadCurrentUser(c.get('userId'))
  if (!user) return c.json({ error: 'Not authenticated' }, 401)
  try {
    return c.json(await cancelOwnSubscription(c.get('userId'), user.email))
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Cancel failed'
    return c.json({ error: message }, 400)
  }
})
