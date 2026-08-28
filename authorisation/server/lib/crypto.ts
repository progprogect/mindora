import { createHmac, randomBytes, randomInt, timingSafeEqual } from 'node:crypto'
import { loadEnv } from '../env.js'

export function generateOtp(): string {
  return randomInt(0, 1_000_000).toString().padStart(6, '0')
}

export function generateSessionToken(): string {
  return randomBytes(32).toString('base64url')
}

export function hmacHex(value: string): string {
  return createHmac('sha256', loadEnv().SESSION_SECRET).update(value).digest('hex')
}

export function hashesEqual(left: string, right: string): boolean {
  const a = Buffer.from(left)
  const b = Buffer.from(right)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}
