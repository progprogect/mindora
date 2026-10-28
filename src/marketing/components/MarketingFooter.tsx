import { Link } from 'react-router-dom'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'
import { withLocale, type Locale } from '../../../authorisation/src/i18n/locale'
import Logo from './Logo'
import {
  FOOTER_COMPANY,
  FOOTER_LEARN,
  FOOTER_LEGAL,
  FOOTER_PLATFORM,
  NAV_COPY,
  ROUTES,
  type NavKey,
} from '@/marketing/data/nav'

const SOCIAL = [
  { letter: 'T', title: 'Twitter/X' },
  { letter: 'L', title: 'LinkedIn' },
  { letter: 'I', title: 'Instagram' },
  { letter: 'T', title: 'TikTok' },
] as const

function FooterCol({
  title,
  links,
  label,
  locale,
}: {
  title: string
  links: readonly { key: NavKey; href: string }[]
  label: (key: NavKey) => string
  locale: Locale
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold tracking-wide text-white uppercase">{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={`${title}-${link.key}`}>
            {link.href === '#' ? (
              <a href="#" className="text-sm transition-colors hover:text-white">
                {label(link.key)}
              </a>
            ) : (
              <Link to={withLocale(locale, link.href)} className="text-sm transition-colors hover:text-white">
                {label(link.key)}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function MarketingFooter() {
  const { locale } = useI18n()
  const copy = NAV_COPY[locale]
  const label = (key: NavKey) => copy[key]
  return (
    <footer className="bg-sw-dark py-16 text-white/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link to={withLocale(locale, ROUTES.home)} aria-label={copy.homeAria}>
              <Logo variant="light" />
            </Link>
            <p className="mt-4 mb-4 max-w-xs text-sm leading-relaxed">{copy.blurb}</p>
            <div className="flex gap-3">
              {SOCIAL.map((item) => (
                <div
                  key={item.title}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-white/5 transition-colors hover:bg-white/10"
                  title={item.title}
                >
                  <span className="text-xs font-bold text-white/40">{item.letter}</span>
                </div>
              ))}
            </div>
          </div>

          <FooterCol title={copy.platform} links={FOOTER_PLATFORM} label={label} locale={locale} />
          <FooterCol title={copy.learn} links={FOOTER_LEARN} label={label} locale={locale} />
          <FooterCol title={copy.company} links={FOOTER_COMPANY} label={label} locale={locale} />
          <FooterCol title={copy.legal} links={FOOTER_LEGAL} label={label} locale={locale} />
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">{copy.rights}</p>
          <p className="text-center text-xs text-white/30 sm:text-right">{copy.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
