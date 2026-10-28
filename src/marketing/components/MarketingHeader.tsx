import { withLocale } from '../../../authorisation/src/i18n/locale'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from '../../../authorisation/src/i18n/LanguageSwitcher'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'
import Logo from './Logo'
import { HEADER_NAV, NAV_COPY, ROUTES } from '@/marketing/data/nav'

function hashHref(pathname: string, hash: string) {
  return pathname === '/' ? hash : `${pathname}${hash}`
}

function scrollToHash(hash: string) {
  const id = hash.replace('#', '')
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth' })
}

export default function MarketingHeader() {
  const { pathname } = useLocation()
  const { locale } = useI18n()
  const copy = NAV_COPY[locale]
  const [open, setOpen] = useState(false)
  const [menuPath, setMenuPath] = useState(pathname)
  const [scrolled, setScrolled] = useState(false)

  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-sw-grey-border bg-white/95 shadow-sm backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between sm:h-[72px]">
          <Link to={withLocale(locale, ROUTES.home)} className="shrink-0" aria-label={copy.homeAria}>
            <Logo variant="dark" />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <LanguageSwitcher />
            {HEADER_NAV.map((item) =>
              'hash' in item ? (
                <a
                  key={item.key}
                  href={hashHref(pathname, item.hash)}
                  className="text-sm font-medium text-sw-grey transition-colors hover:text-sw-dark"
                  onClick={(e) => {
                    if (pathname !== '/') return
                    e.preventDefault()
                    scrollToHash(item.hash)
                    window.history.pushState(null, '', item.hash)
                  }}
                >
                  {copy[item.key]}
                </a>
              ) : (
                <Link
                  key={item.key}
                  to={withLocale(locale, item.href)}
                  className="text-sm font-medium text-sw-grey transition-colors hover:text-sw-dark"
                >
                  {copy[item.key]}
                </Link>
              ),
            )}
          </div>

          <div className="hidden items-center gap-1 md:flex">
            <Link
              to={withLocale(locale, ROUTES.login)}
              className="px-3 py-2 text-sm font-semibold text-sw-dark transition-colors hover:text-sw-blue"
            >
              {copy.signIn}
            </Link>
            <Link
              to={withLocale(locale, ROUTES.quiz28)}
              className="rounded-full bg-sw-blue px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-sw-blue-hover hover:shadow-md"
            >
              {copy.getStarted}
            </Link>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 transition-colors hover:bg-sw-grey-light md:hidden"
            aria-label={open ? copy.closeMenu : copy.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-sw-grey-border bg-white px-4 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {HEADER_NAV.map((item) =>
              'hash' in item ? (
                <a
                  key={item.key}
                  href={hashHref(pathname, item.hash)}
                  className="px-2 py-3 text-base font-medium text-sw-grey"
                  onClick={(e) => {
                    setOpen(false)
                    if (pathname !== '/') return
                    e.preventDefault()
                    scrollToHash(item.hash)
                    window.history.pushState(null, '', item.hash)
                  }}
                >
                  {copy[item.key]}
                </a>
              ) : (
                <Link
                  key={item.key}
                  to={withLocale(locale, item.href)}
                  className="px-2 py-3 text-base font-medium text-sw-grey"
                  onClick={() => setOpen(false)}
                >
                  {copy[item.key]}
                </Link>
              ),
            )}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <Link
              to={withLocale(locale, ROUTES.login)}
              className="rounded-full border border-sw-grey-border py-3 text-center text-sm font-semibold text-sw-dark"
              onClick={() => setOpen(false)}
            >
              {copy.signIn}
            </Link>
            <Link
              to={withLocale(locale, ROUTES.quiz28)}
              className="rounded-full bg-sw-blue py-3 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              {copy.getStarted}
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  )
}
