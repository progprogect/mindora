import { withLocale } from '../../../authorisation/src/i18n/locale'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { homeSectionsCopy } from '@/marketing/data/homeSections'
import { ROUTES } from '@/marketing/data/nav'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'

export default function HomeStickyCta() {
  const { pathname } = useLocation()
  const { locale } = useI18n()
  const copy = homeSectionsCopy(locale).mobileStickyCta
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname !== '/') return null

  return (
    <div
      className={`fixed right-4 bottom-4 left-4 z-50 md:hidden ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-20 opacity-0'
      } transition-all duration-300`}
    >
      <div className="flex items-center gap-3 rounded-2xl border border-sw-grey-border bg-white p-3 shadow-2xl">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-sw-dark">{copy.title}</p>
          <p className="text-xs text-sw-grey">{copy.subtitle}</p>
        </div>
        <Link
          to={withLocale(locale, ROUTES.quizSuccess)}
          className="shrink-0 rounded-xl bg-sw-blue px-5 py-2.5 text-sm font-bold whitespace-nowrap text-white hover:bg-sw-blue-hover"
        >
          {copy.button}
        </Link>
      </div>
    </div>
  )
}
