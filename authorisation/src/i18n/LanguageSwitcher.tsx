import { useLocation, useNavigate } from 'react-router-dom'
import { useI18n } from './I18nProvider'
import { withLocale, type Locale } from './locale'

const OPTIONS: Locale[] = ['en', 'ru']

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale, t } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()

  const switchLocale = (option: Locale) => {
    setLocale(option)
    const target = withLocale(option, `${location.pathname}${location.search}${location.hash}`)
    navigate(target, { replace: true })
  }

  return (
    <div className={`inline-flex rounded-full border border-sw-grey-border bg-white p-0.5 ${className}`} role="group" aria-label={t('chrome.language')}>
      {OPTIONS.map((option) => {
        const active = option === locale
        const label = option === 'en' ? t('chrome.english') : t('chrome.russian')
        return (
          <button
            key={option}
            type="button"
            onClick={() => switchLocale(option)}
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
