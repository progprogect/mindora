import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchMaterial, type MaterialDetail } from '@/lib/api'
import MaterialShell from '@/app/MaterialShell'
import MaterialBody from '@/app/MaterialBody'
import { useI18n } from '@/i18n/I18nProvider'
import { withLocale } from '@/i18n/locale'

export default function MaterialPage() {
  const { slug = '' } = useParams()
  const { locale, t } = useI18n()
  const [material, setMaterial] = useState<MaterialDetail | null | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    if (!slug) {
      setMaterial(null)
      return
    }
    setMaterial(undefined)
    fetchMaterial(slug, locale === 'ru' ? 'ru' : 'en')
      .then((data) => {
        if (!cancelled) setMaterial(data.material)
      })
      .catch(() => {
        if (!cancelled) setMaterial(null)
      })
    return () => {
      cancelled = true
    }
  }, [slug, locale])

  if (material === undefined) {
    return (
      <main className="px-4 py-6 max-w-3xl mx-auto">
        <p className="text-sm text-sw-grey">{t('app.materials.loading')}</p>
      </main>
    )
  }

  if (!material) {
    return (
      <main className="px-4 py-6 max-w-3xl mx-auto space-y-4">
        <Link to={withLocale(locale, "/app/materials")} className="text-sm font-semibold text-sw-blue">
          {t('app.materials.backToList')}
        </Link>
        <p className="text-sm text-sw-grey">{t('app.materials.notFound')}</p>
      </main>
    )
  }

  const fallbackNote =
    material.localeFallback
      ? locale === 'ru'
        ? t('app.materials.localeFallbackRu')
        : t('app.materials.localeFallback')
      : null

  return (
    <MaterialShell title={material.title} slug={material.slug}>
      <div data-testid="material-page" className="space-y-4">
        <header className="rounded-2xl bg-white border border-sw-grey-border/60 shadow-sm p-5 space-y-2">
          <h2 className="text-xl font-extrabold text-sw-dark leading-tight">{material.title}</h2>
          {material.description ? (
            <p className="text-sm text-sw-grey leading-relaxed">{material.description}</p>
          ) : null}
          {fallbackNote ? <p className="text-[11px] text-amber-700">{fallbackNote}</p> : null}
          {material.fileUrl ? (
            <a
              href={material.fileUrl}
              className="inline-flex items-center justify-center rounded-xl bg-sw-blue px-4 py-2.5 text-sm font-bold text-white"
            >
              {t('app.materials.downloadFile')}
            </a>
          ) : null}
        </header>

        {material.body ? (
          <article className="rounded-2xl bg-white border border-sw-grey-border/60 shadow-sm p-5">
            <MaterialBody body={material.body} />
          </article>
        ) : material.type === 'pdf' ? null : (
          <p className="text-sm text-sw-grey">{t('app.materials.notFound')}</p>
        )}
      </div>
    </MaterialShell>
  )
}
