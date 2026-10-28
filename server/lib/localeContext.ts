import type { Context } from 'hono'
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_REQUEST_HEADER,
  type AppLocale,
} from './localePath.js'

export function getRequestLocale(c: Context): AppLocale {
  const fromVar = c.get('locale')
  if (isLocale(fromVar)) return fromVar
  const fromHeader = c.req.header(LOCALE_REQUEST_HEADER)
  if (isLocale(fromHeader)) return fromHeader
  return DEFAULT_LOCALE
}
