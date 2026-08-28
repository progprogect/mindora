import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { loginRateLimits } from '../db/schema.js'

const WINDOW_MS = 60 * 60 * 1000
const MAX_FAILURES = 5

export const RATE_LIMIT_MESSAGE =
  'Login Attempt Rate Limit Exceeded - For Security Your Account is Temporarily Locked. Please Wait 1 Hour and Try Again. If this error continues please contact our support team support@successwise.ai'

export async function isRateLimited(email: string): Promise<boolean> {
  const [row] = await db.select().from(loginRateLimits).where(eq(loginRateLimits.email, email)).limit(1)
  if (!row?.lockedUntil) return false
  return row.lockedUntil.getTime() > Date.now()
}

/** Returns true when the email is now locked. */
export async function logFailedLogin(email: string): Promise<boolean> {
  const now = new Date()
  const [row] = await db.select().from(loginRateLimits).where(eq(loginRateLimits.email, email)).limit(1)
  if (!row) {
    await db.insert(loginRateLimits).values({
      email,
      failedCount: 1,
      windowStartedAt: now,
      lastFailedAt: now,
    })
    return false
  }

  const inWindow = now.getTime() - row.windowStartedAt.getTime() < WINDOW_MS
  const failedCount = inWindow ? row.failedCount + 1 : 1
  const lockedUntil = failedCount >= MAX_FAILURES ? new Date(now.getTime() + WINDOW_MS) : null
  await db
    .update(loginRateLimits)
    .set({
      failedCount,
      windowStartedAt: inWindow ? row.windowStartedAt : now,
      lastFailedAt: now,
      lockedUntil,
    })
    .where(eq(loginRateLimits.id, row.id))
  return Boolean(lockedUntil)
}
