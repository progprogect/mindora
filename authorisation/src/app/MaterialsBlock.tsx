import { Link } from 'react-router-dom'
import { BookIcon, ChevronRightIcon } from '@/app/MaterialCard'
import { useI18n } from '@/i18n/I18nProvider'
import { withLocale } from '@/i18n/locale'
import { useMaterials } from '@/lib/lmsQueries'

export default function MaterialsBlock() {
  const { locale, t } = useI18n()
  const materials = useMaterials()
  if (materials === undefined) {
    return (
      <section data-testid="dashboard-materials" className="rounded-2xl bg-white border border-sw-grey-border/60 shadow-sm p-4">
        <p className="text-sm text-sw-grey">{t('app.materials.loading')}</p>
      </section>
    )
  }

  if (materials.length === 0) {
    return (
      <section data-testid="dashboard-materials" className="rounded-2xl bg-white border border-sw-grey-border/60 shadow-sm p-4">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sw-blue/10 text-sw-blue">
            <BookIcon className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-base font-extrabold text-sw-dark">{t('app.materials.title')}</h2>
            <p className="text-[12px] text-sw-grey mt-0.5">{t('app.materials.empty')}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <Link
      to={withLocale(locale, "/app/materials")}
      data-testid="dashboard-materials"
      aria-label={t('app.materials.openList')}
      className="block rounded-2xl bg-white border border-sw-grey-border/60 shadow-sm p-4 active:scale-[0.98] transition-transform"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sw-blue/10 text-sw-blue">
          <BookIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-base font-extrabold text-sw-dark leading-tight">{t('app.materials.title')}</h2>
            <span className="shrink-0 text-[11px] font-bold text-emerald-600 whitespace-nowrap">
              {t('app.materials.readyCount').replace('{n}', String(materials.length))}
            </span>
          </div>
          <p className="text-[12px] text-sw-grey mt-0.5 leading-snug">{t('app.materials.subtitle')}</p>
        </div>
        <ChevronRightIcon className="h-5 w-5 shrink-0 text-sw-grey" />
      </div>
    </Link>
  )
}
