import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nProvider'
import { withLocale } from '@/i18n/locale'
import type { MaterialListItem } from '@/lib/api'

export function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5.5A2.5 2.5 0 016.5 3H20v16H6.5A2.5 2.5 0 004 16.5v-11z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16.5A2.5 2.5 0 016.5 19H20" />
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
