import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { saveLocale } from '@/lib/api'
import { en, ru } from './messages'
import { readStoredLocale, writeStoredLocale, type Locale } from './locale'

type I18nValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nValue | null>(null)

function lookup(locale: Locale, key: string): string {
  const table = locale === 'ru' ? ru : en
  const value = table[key as keyof typeof table]
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Missing ${locale} message: ${key}`)
  }
  return value
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readStoredLocale())

  const setLocale = useCallback((next: Locale) => {
    writeStoredLocale(next)
    setLocaleState(next)
    void saveLocale(next).catch(() => {
      // Login and public pages have no profile yet. OTP send carries the locale.
    })
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
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

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
