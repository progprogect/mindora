import { Hono } from 'hono'
import { z } from 'zod'
import {
  BillingError,
  cancelOwnSubscription,
  createPortalSession,
  getMine,
} from '../lib/subscription.js'
import { loadCurrentUser } from '../lib/currentUser.js'
import { publicOrigin } from '../lib/http.js'
import { requireAuth, type SessionEnv } from '../lib/session.js'

function billingFailure(error: unknown, fallback: string, fallbackCode: string) {
  if (error instanceof BillingError) {
    return { error: error.message, status: error.status, code: error.code } as const
  }
  const message = error instanceof Error && error.message ? error.message : fallback
  return { error: message, status: 400 as const, code: fallbackCode }
}

const portalSchema = z.object({
  returnUrl: z.string().optional(),
})

export const subscriptionRoutes = new Hono<SessionEnv>()

subscriptionRoutes.get('/me/subscription', requireAuth, async (c) => {
  const user = await loadCurrentUser(c.get('userId'))
  if (!user) return c.json({ error: 'Not authenticated', code: 'not_authenticated' }, 401)
  const mine = await getMine(c.get('userId'), user.email)
  return c.json(mine)
})

subscriptionRoutes.post('/me/subscription/portal', requireAuth, async (c) => {
  const parsed = portalSchema.safeParse((await c.req.json().catch(() => ({}))) ?? {})
  const user = await loadCurrentUser(c.get('userId'))
  if (!user) return c.json({ error: 'Not authenticated', code: 'not_authenticated' }, 401)
  const returnUrl = parsed.success && parsed.data.returnUrl ? parsed.data.returnUrl : `${publicOrigin(c)}/app/profile`
  try {
    return c.json(await createPortalSession(c.get('userId'), user.email, returnUrl))
  } catch (error) {
    const failure = billingFailure(error, 'Portal unavailable', 'billing_portal_unavailable')
    return c.json({ error: failure.error, code: failure.code }, failure.status)
  }
})

subscriptionRoutes.post('/me/subscription/cancel', requireAuth, async (c) => {
  const user = await loadCurrentUser(c.get('userId'))
  if (!user) return c.json({ error: 'Not authenticated', code: 'not_authenticated' }, 401)
  try {
    return c.json(await cancelOwnSubscription(c.get('userId'), user.email))
  } catch (error) {
    const failure = billingFailure(error, 'Cancel failed', 'subscription_cancel_failed')
    return c.json({ error: failure.error, code: failure.code }, failure.status)
  }
})
