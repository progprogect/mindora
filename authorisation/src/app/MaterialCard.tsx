import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nProvider'
import { withLocale } from '@/i18n/locale'
import type { MaterialListItem } from '@/lib/api'

export function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5C10.4 5.3 8.2 4.8 5 4.8v12.9c3.2 0 5.4.5 7 1.7 1.6-1.2 3.8-1.7 7-1.7V4.8c-3.2 0-5.4.5-7 1.7z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5v12.9" />
    </svg>
  )
}

export function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

function formatAdded(ms: number | null, locale: string, t: (key: string) => string) {
  if (!ms) return null
  const date = new Date(ms).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  return t('app.materials.addedOn').replace('{date}', date)
}

export default function MaterialCard({ item }: { item: MaterialListItem }) {
  const { locale, t } = useI18n()
  const added = formatAdded(item.publishedAt, locale, t)
  return (
    <article
      data-testid={`material-card-${item.slug}`}
      className="flex flex-col h-full bg-white rounded-2xl border border-sw-grey-border/60 shadow-sm p-4"
    >
      <div className="flex flex-1 items-start gap-3 min-h-0">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sw-blue/10 text-sw-blue">
          <BookIcon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-sw-dark leading-snug line-clamp-2">{item.title}</h3>
          {item.description ? (
            <p className="text-[11px] text-sw-grey mt-1 leading-snug line-clamp-2">{item.description}</p>
          ) : null}
          {added ? <p className="text-[10px] text-sw-grey/80 mt-1.5">{added}</p> : null}
        </div>
      </div>
      <div className="mt-auto pt-3">
        <Link
          to={withLocale(locale, `/app/materials/${item.slug}`)}
          className="inline-flex w-full items-center justify-center rounded-xl bg-sw-blue px-3 py-2.5 text-xs font-bold text-white active:scale-[0.98] transition-transform"
        >
          {item.type === 'pdf' ? t('app.materials.downloadFile') : t('app.materials.openGuide')}
        </Link>
      </div>
    </article>
  )
}
