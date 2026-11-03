import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@/app/MaterialCard'
import { useI18n } from '@/i18n/I18nProvider'
import { withLocale } from '@/i18n/locale'
import { useMaterials } from '@/lib/lmsQueries'

export default function MaterialsBlock() {
  const { locale, t } = useI18n()
  const { items: materials, error } = useMaterials()

  const subtitle = error
    ? t('app.materials.loadError')
    : materials === undefined
      ? t('app.materials.loading')
      : materials.length === 0
        ? t('app.materials.empty')
        : t('app.materials.readyCount').replace('{n}', String(materials.length))

  const body = (
    <>
      <span className="text-2xl flex-shrink-0" aria-hidden>
        📚
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-sw-dark leading-tight">{t('app.materials.title')}</p>
        <p className="text-xs text-sw-grey mt-0.5">{subtitle}</p>
      </div>
    </>
  )

  if (materials === undefined || error || materials.length === 0) {
    return (
      <section
        data-testid="dashboard-materials"
        className="flex items-center gap-3 bg-white rounded-2xl px-4 py-4 shadow-sm border border-sw-grey-border"
      >
        {body}
      </section>
    )
  }

  return (
    <Link
      to={withLocale(locale, '/app/materials')}
      data-testid="dashboard-materials"
      aria-label={t('app.materials.openList')}
      className="flex items-center gap-3 bg-white rounded-2xl px-4 py-4 shadow-sm border border-sw-grey-border active:scale-[0.98] transition-transform"
    >
      {body}
      <ChevronRightIcon className="w-5 h-5 text-sw-grey flex-shrink-0" />
    </Link>
  )
}
