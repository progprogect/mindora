import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { saveLocale } from '@/lib/api'
import { en, ru } from './messages'
import { localeFromPathname, writeStoredLocale, type Locale } from './locale'

type I18nValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nValue | null>(null)

const DEFAULT_DOCUMENT_TITLE: Record<Locale, string> = {
  en: 'MindoraAcademy.com — Turn Daily Learning Into Daily Progress',
  ru: 'MindoraAcademy.com — Превращайте ежедневное обучение в ежедневный прогресс',
}

function lookup(locale: Locale, key: string): string {
  const table = locale === 'ru' ? ru : en
  const value = table[key as keyof typeof table]
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Missing ${locale} message: ${key}`)
  }
  return value
}

function initialLocaleFromUrl(): Locale {
  if (typeof window === 'undefined') return 'en'
  return localeFromPathname(window.location.pathname) ?? 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocaleFromUrl)

  const setLocale = useCallback((next: Locale) => {
    writeStoredLocale(next)
    setLocaleState(next)
    void saveLocale(next).catch(() => {
      // Login and public pages have no profile yet. OTP send carries the locale.
    })
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    // Only refresh the shell default title — never clobber page-specific titles
    // (quizzes, marketing, checkout set their own via usePageTitle / useEffect).
    const current = document.title
    const isShellDefault =
      current === DEFAULT_DOCUMENT_TITLE.en ||
      current === DEFAULT_DOCUMENT_TITLE.ru ||
      /^SuccessWise\.ai\b/i.test(current) ||
      current === '' ||
      current === 'MindoraAcademy.com'
    if (isShellDefault) document.title = DEFAULT_DOCUMENT_TITLE[locale]
  }, [locale])

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale,
      t: (key: string) => lookup(locale, key),
    }),
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

/** Renders inside `BrowserRouter` — keeps context locale aligned with the URL segment. */
export function SyncLocaleFromUrl() {
  const { pathname } = useLocation()
  const { setLocale } = useI18n()
  const fromUrl = localeFromPathname(pathname) ?? 'en'

  useEffect(() => {
    setLocale(fromUrl)
  }, [fromUrl, setLocale])

  return null
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
