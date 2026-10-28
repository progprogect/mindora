import type { MiddlewareHandler } from 'hono'
import { getRequestLocale } from '../lib/localeContext.js'
import { isLocale, LOCALE_REQUEST_HEADER } from '../lib/localePath.js'

export const localeContextMiddleware: MiddlewareHandler = async (c, next) => {
  const fromHeader = c.req.header(LOCALE_REQUEST_HEADER)
  if (isLocale(fromHeader)) {
    c.set('locale', fromHeader)
  }
  await next()
}

export { getRequestLocale }
