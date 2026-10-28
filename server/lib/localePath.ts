import { isWellKnownPath, looksLikeFile, normalizePathname } from '../spa/spaPaths.js'

export type AppLocale = 'en' | 'ru'

export const DEFAULT_LOCALE: AppLocale = 'en'

export function isLocale(value: unknown): value is AppLocale {
  return value === 'en' || value === 'ru'
}

export function splitLocalePrefix(pathname: string): { locale: AppLocale | null; path: string } {
  const path = normalizePathname(pathname)
  const segments = path.split('/').filter(Boolean)
  const first = segments[0]
  if (!isLocale(first)) {
    return { locale: null, path }
  }
  const rest = segments.slice(1).join('/')
  return { locale: first, path: rest ? `/${rest}` : '/' }
}

function splitPathAndQuery(pathAndMaybeQuery: string): { pathname: string; search: string } {
  const q = pathAndMaybeQuery.indexOf('?')
  if (q < 0) return { pathname: pathAndMaybeQuery, search: '' }
  return { pathname: pathAndMaybeQuery.slice(0, q), search: pathAndMaybeQuery.slice(q) }
}

/** Ensure exactly one `/{locale}` prefix; preserve query string when present. */
export function withLocalePrefix(locale: AppLocale, pathAndMaybeQuery: string): string {
  const { pathname, search } = splitPathAndQuery(pathAndMaybeQuery)
  const normalized = normalizePathname(pathname)
  const { locale: existing, path } = splitLocalePrefix(normalized)
  const bare = existing ? path : normalized
  const prefixed = bare === '/' ? `/${locale}` : `/${locale}${bare}`
  return `${prefixed}${search}`
}

/** Paths that skip locale redirect and URL rewrite (API, static, dev tools, files). */
export function bypassesLocalePrefix(pathname: string): boolean {
  const path = normalizePathname(pathname)
  if (isWellKnownPath(path)) return true
  if (looksLikeFile(path)) return true
  if (path === '/api' || path.startsWith('/api/')) return true
  if (path === '/stripe' || path.startsWith('/stripe/')) return true
  if (path === '/assets' || path.startsWith('/assets/')) return true
  if (path === '/funnel-assets' || path.startsWith('/funnel-assets/')) return true
  if (path === '/dev/funnel-enter' || path.startsWith('/dev/funnel-enter/')) return true
  return false
}

export const LOCALE_REQUEST_HEADER = 'x-mindora-locale'
