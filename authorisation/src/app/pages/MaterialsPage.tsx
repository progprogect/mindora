import { Link } from 'react-router-dom'
import MaterialCard from '@/app/MaterialCard'
import { useI18n } from '@/i18n/I18nProvider'
import { withLocale } from '@/i18n/locale'
import { useMaterials } from '@/lib/lmsQueries'

export default function MaterialsPage() {
  const { locale, t } = useI18n()
  const materials = useMaterials()

  return (
    <main data-testid="materials-page" className="px-4 py-4 max-w-5xl mx-auto space-y-4 pb-24">
      <div className="flex items-center gap-3">
        <Link
          to={withLocale(locale, "/app/dashboard")}
          aria-label={t('app.common.backToDashboard')}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white border border-sw-grey-border/60 text-sw-blue text-lg font-bold shadow-sm active:scale-95 transition-transform"
        >
          ←
        </Link>
        <h1 className="min-w-0 flex-1 text-lg font-extrabold text-sw-dark leading-tight">
          {t('app.materials.pageTitle')}
        </h1>
        {materials && materials.length > 0 ? (
          <span className="shrink-0 text-[11px] font-bold text-emerald-600 whitespace-nowrap">
            {t('app.materials.readyCount').replace('{n}', String(materials.length))}
          </span>
        ) : null}
      </div>

      {materials === undefined ? (
        <p className="text-sm text-sw-grey">{t('app.materials.loading')}</p>
      ) : materials.length === 0 ? (
        <p className="text-sm text-sw-grey">{t('app.materials.empty')}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {materials.map((item) => (
            <MaterialCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </main>
  )
}
