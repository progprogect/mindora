export const LOCALES = ['en', 'ru'] as const
export type Locale = (typeof LOCALES)[number]
export const LOCALE_STORAGE_KEY = 'mindora.locale'
/** Mirrors the stored locale so the server can pick it for paths that arrive without a `/en` or `/ru` prefix. */
export const LOCALE_COOKIE = 'mindora_locale'

const LOCALE_PATH_PREFIXES = ['/api', '/stripe', '/funnel-assets', '/assets', '/dev/'] as const

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'ru'
}

export function localeFromSignals(saved: string | null | undefined, _navigatorLanguage?: string | null): Locale {
  if (isLocale(saved)) return saved
  return 'en'
}

export function readStoredLocale(): Locale {
  try {
    return localeFromSignals(localStorage.getItem(LOCALE_STORAGE_KEY), navigator.language)
  } catch {
    return 'en'
  }
}

export function writeStoredLocale(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    /* storage can be blocked; the cookie below still works */
  }
  try {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`
  } catch {
    /* no document (SSR) */
  }
}

export function localeFromPathname(pathname: string): Locale | null {
  const match = /^\/(en|ru)(\/|$)/.exec(pathname)
  if (match && isLocale(match[1])) return match[1]
  return null
}

/** Pathname without the leading `/en` or `/ru` segment, for matching route paths like `/app/dashboard`. */
export function stripLocale(pathname: string): string {
  const match = /^\/(en|ru)(\/.*)?$/.exec(pathname)
  if (!match) return pathname
  return match[2] || '/'
}

function splitPathSearchHash(to: string): { path: string; search: string; hash: string } {
  let rest = to
  let hash = ''
  const hashIdx = rest.indexOf('#')
  if (hashIdx !== -1) {
    hash = rest.slice(hashIdx)
    rest = rest.slice(0, hashIdx)
  }
  let search = ''
  const queryIdx = rest.indexOf('?')
  if (queryIdx !== -1) {
    search = rest.slice(queryIdx)
    rest = rest.slice(0, queryIdx)
  }
  return { path: rest, search, hash }
}

function isLocaleImmunePath(path: string): boolean {
  if (!path.startsWith('/')) return false
  return LOCALE_PATH_PREFIXES.some((prefix) => path === prefix || path.startsWith(prefix))
}

export function withLocale(locale: Locale, to: string): string {
  if (/^(https?:|mailto:|tel:)/i.test(to)) return to
  if (to.startsWith('#')) return to

  const { path, search, hash } = splitPathSearchHash(to)
  if (isLocaleImmunePath(path)) return to

  if (!path.startsWith('/')) {
    return `/${locale}/${path}${search}${hash}`
  }

  const segments = path.split('/').filter((segment) => segment.length > 0)
  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = locale
    const nextPath = `/${segments.join('/')}`
    return `${nextPath}${search}${hash}`
  }

  if (path === '/') return `/${locale}${search}${hash}`
  return `/${locale}${path}${search}${hash}`
}
