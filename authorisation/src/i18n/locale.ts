export const LOCALES = ['en', 'ru'] as const
export type Locale = (typeof LOCALES)[number]
export const LOCALE_STORAGE_KEY = 'mindora.locale'

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'ru'
}

export function localeFromSignals(saved: string | null | undefined, navigatorLanguage?: string | null): Locale {
  if (isLocale(saved)) return saved
  if (navigatorLanguage?.toLowerCase().startsWith('ru')) return 'ru'
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
  localStorage.setItem(LOCALE_STORAGE_KEY, locale)
}
