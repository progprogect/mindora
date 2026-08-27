/** Canonical LMS: `authorisation/server`. Railway mirror — do not add LMS features here. */
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import type { Context, MiddlewareHandler } from 'hono'
import { and, eq, gt } from 'drizzle-orm'
import { db } from '../db/index.js'
import { sessions } from '../db/schema.js'
import { loadEnv } from '../env.js'
import { generateSessionToken, hmacHex } from './crypto.js'

export const SESSION_COOKIE = 'sw_session'
export const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000

export type SessionEnv = {
  Variables: {
    userId: string
  }
}

function cookieOpts() {
  return {
    path: '/',
    httpOnly: true,
    sameSite: 'Lax' as const,
    secure: loadEnv().NODE_ENV === 'production',
  }
}

export function setSessionCookie(c: Context, token: string, expiresAt: Date) {
  setCookie(c, SESSION_COOKIE, token, { ...cookieOpts(), expires: expiresAt })
}

export function clearSessionCookie(c: Context) {
  deleteCookie(c, SESSION_COOKIE, cookieOpts())
}

export async function createSession(userId: string) {
  const token = generateSessionToken()
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS)
  await db.insert(sessions).values({
    userId,
    tokenHash: hmacHex(token),
    expiresAt,
  })
  return { token, expiresAt }
}

export async function readUserId(c: Context): Promise<string | null> {
  const token = getCookie(c, SESSION_COOKIE)
  if (!token) return null
  const [row] = await db
    .select({ userId: sessions.userId, id: sessions.id })
    .from(sessions)
    .where(and(eq(sessions.tokenHash, hmacHex(token)), gt(sessions.expiresAt, new Date())))
    .limit(1)
  return row?.userId ?? null
}

export async function destroySession(c: Context) {
  const token = getCookie(c, SESSION_COOKIE)
  if (token) {
    await db.delete(sessions).where(eq(sessions.tokenHash, hmacHex(token)))
  }
  clearSessionCookie(c)
}

export const requireAuth: MiddlewareHandler<SessionEnv> = async (c, next) => {
  const userId = await readUserId(c)
  if (!userId) return c.json({ error: 'Not authenticated' }, 401)
  c.set('userId', userId)
  await next()
}
