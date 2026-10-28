import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import LanguageSwitcher from '@/i18n/LanguageSwitcher'
import { useI18n } from '@/i18n/I18nProvider'
import { withLocale } from '@/i18n/locale'
import { useMaterials } from '@/lib/lmsQueries'

export default function MaterialShell({
  title,
  slug,
  children,
}: {
  title: string
  slug?: string
  children: ReactNode
}) {
  const { locale, t } = useI18n()
  const list = useMaterials()
  const idx = list && slug ? list.findIndex((m) => m.slug === slug) : -1
  const prev = idx > 0 && list ? list[idx - 1] : null
  const next = idx >= 0 && list && idx < list.length - 1 ? list[idx + 1] : null
  const btn =
    'flex-1 rounded-xl border border-sw-grey-border/60 bg-white px-3 py-2.5 text-center text-sm font-bold text-sw-blue shadow-sm'
  const off = 'pointer-events-none opacity-40'

  return (
    <div data-testid="material-shell">
      <header className="sticky top-0 z-20 border-b border-sw-grey-border/60 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-2.5">
          <Link to={withLocale(locale, "/app/materials")} className="shrink-0 text-sm font-semibold text-sw-blue whitespace-nowrap">
            {t('app.materials.backToList')}
          </Link>
          <h1 className="min-w-0 flex-1 truncate text-sm font-extrabold text-sw-dark">{title}</h1>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-6 pb-24 space-y-6">
        {children}

        <footer className="space-y-3 border-t border-sw-grey-border/60 pt-6">
          <Link
            to={withLocale(locale, "/app/materials")}
            className="block rounded-xl bg-sw-blue px-4 py-3 text-center text-sm font-bold text-white"
          >
            {t('app.materials.openList')}
          </Link>
          <div className="flex gap-3">
            {prev ? (
              <Link to={withLocale(locale, `/app/materials/${prev.slug}`)} className={btn}>
                {t('app.materials.prev')}
              </Link>
            ) : (
              <span aria-disabled="true" className={`${btn} ${off}`}>
                {t('app.materials.prev')}
              </span>
            )}
            {next ? (
              <Link to={withLocale(locale, `/app/materials/${next.slug}`)} className={btn}>
                {t('app.materials.next')}
              </Link>
            ) : (
              <span aria-disabled="true" className={`${btn} ${off}`}>
                {t('app.materials.next')}
              </span>
            )}
          </div>
        </footer>
      </div>
    </div>
  )
}
