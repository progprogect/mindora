import { useI18n } from './I18nProvider'
import type { Locale } from './locale'

const OPTIONS: Locale[] = ['en', 'ru']

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale, t } = useI18n()
  return (
    <div className={`inline-flex rounded-full border border-sw-grey-border bg-white p-0.5 ${className}`} role="group" aria-label={t('chrome.language')}>
      {OPTIONS.map((option) => {
        const active = option === locale
        const label = option === 'en' ? t('chrome.english') : t('chrome.russian')
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLocale(option)}
            className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${active ? 'bg-sw-blue text-white' : 'text-sw-grey hover:text-sw-dark'}`}
            aria-pressed={active}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
