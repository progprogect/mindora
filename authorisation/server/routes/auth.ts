import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'
import { db } from '../db/index.js'
import { otpCodes, users } from '../db/schema.js'
import { generateOtp, hashesEqual, hmacHex } from '../lib/crypto.js'
import { sendOtpEmail } from '../lib/mail.js'
import { isRateLimited, logFailedLogin, RATE_LIMIT_MESSAGE } from '../lib/rateLimit.js'
import { createSession, destroySession, setSessionCookie } from '../lib/session.js'
import { attachStripeCustomer } from '../lib/subscription.js'

const OTP_TTL_MS = 15 * 60 * 1000

const emailSchema = z.object({
  email: z.string().min(1),
})

const verifySchema = z.object({
  email: z.string().min(1),
  code: z.string().min(1),
})

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export const authRoutes = new Hono()

authRoutes.post('/auth/otp/send', async (c) => {
  const parsed = emailSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  const email = normalizeEmail(parsed.data.email)
  if (await isRateLimited(email)) {
    return c.json({ error: RATE_LIMIT_MESSAGE, code: 'rate_limited' }, 429)
  }
  const code = generateOtp()
  const expiresAt = new Date(Date.now() + OTP_TTL_MS)
  await db
    .insert(otpCodes)
    .values({ email, codeHash: hmacHex(code), expiresAt })
    .onConflictDoUpdate({
      target: otpCodes.email,
      set: { codeHash: hmacHex(code), expiresAt, createdAt: new Date() },
    })
  try {
    await sendOtpEmail(email, code)
  } catch (error) {
    console.error('[auth] failed to send OTP', error)
    return c.json({ error: 'Failed to send code' }, 502)
  }
  return c.json({ ok: true })
})

authRoutes.post('/auth/otp/verify', async (c) => {
  const parsed = verifySchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: 'Invalid payload' }, 400)
  const email = normalizeEmail(parsed.data.email)
  const code = parsed.data.code.replace(/\D/g, '')
  if (await isRateLimited(email)) {
    return c.json({ error: RATE_LIMIT_MESSAGE, code: 'rate_limited' }, 429)
  }
  const [otp] = await db.select().from(otpCodes).where(eq(otpCodes.email, email)).limit(1)
  const valid = otp && otp.expiresAt.getTime() > Date.now() && hashesEqual(otp.codeHash, hmacHex(code))
  if (!valid) {
    const locked = await logFailedLogin(email)
    if (locked || (await isRateLimited(email))) {
      return c.json({ error: RATE_LIMIT_MESSAGE, code: 'rate_limited' }, 429)
    }
    return c.json({ error: 'Invalid or expired code. Please try again.' }, 401)
  }
  await db.delete(otpCodes).where(eq(otpCodes.email, email))
  const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1)
  let userId = existing?.id
  if (!userId) {
    const [created] = await db.insert(users).values({ email }).returning({ id: users.id })
    userId = created?.id
  }
  if (!userId) return c.json({ error: 'Failed to create user' }, 500)
  const session = await createSession(userId)
  setSessionCookie(c, session.token, session.expiresAt)
  await attachStripeCustomer(userId, email)
  return c.json({ ok: true })
})

authRoutes.post('/auth/signout', async (c) => {
  await destroySession(c)
  return c.json({ ok: true })
})
