import { Link } from 'react-router-dom'
import Logo from './Logo'
import {
  FOOTER_COMPANY,
  FOOTER_LEARN,
  FOOTER_LEGAL,
  FOOTER_PLATFORM,
  ROUTES,
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
}: {
  title: string
  links: readonly { label: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold tracking-wide text-white uppercase">{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            {link.href === '#' ? (
              <a href="#" className="text-sm transition-colors hover:text-white">
                {link.label}
              </a>
            ) : (
              <Link to={link.href} className="text-sm transition-colors hover:text-white">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function MarketingFooter() {
  return (
    <footer className="bg-sw-dark py-16 text-white/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link to={ROUTES.home} aria-label="MindoraAcademy.com home">
              <Logo variant="light" />
            </Link>
            <p className="mt-4 mb-4 max-w-xs text-sm leading-relaxed">
              Helping people become healthier, wealthier, and more successful through bite-sized
              education that creates real results.
            </p>
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

          <FooterCol title="PLATFORM" links={FOOTER_PLATFORM} />
          <FooterCol title="LEARN" links={FOOTER_LEARN} />
          <FooterCol title="COMPANY" links={FOOTER_COMPANY} />
          <FooterCol title="LEGAL" links={FOOTER_LEGAL} />
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">© 2026 MindoraAcademy.com — All rights reserved.</p>
          <p className="text-center text-xs text-white/30 sm:text-right">
            Built for people who want a better life. Starting today.
          </p>
        </div>
      </div>
    </footer>
  )
}
