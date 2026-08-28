import type { Context } from 'hono'
import { loadEnv } from '../env.js'

export function publicOrigin(c: Context) {
  const env = loadEnv()
  if (env.PUBLIC_ORIGIN) return env.PUBLIC_ORIGIN.replace(/\/$/, '')
  const proto = c.req.header('x-forwarded-proto') ?? new URL(c.req.url).protocol.replace(':', '')
  const host = c.req.header('x-forwarded-host') ?? c.req.header('host') ?? new URL(c.req.url).host
  return `${proto}://${host}`
}
