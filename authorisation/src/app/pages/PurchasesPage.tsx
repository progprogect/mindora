import { Link } from 'react-router-dom'
import { plannerContent } from '@/content/planners'
import { useI18n } from '@/i18n/I18nProvider'
import { usePurchaseRecords, type PurchaseRecord } from '@/lib/lmsQueries'

const BUNDLE_SKUS = new Set(['planner-bundle', 'planner-bundle-library'])

function labelFor(sku: string, t: (key: string) => string, locale: 'en' | 'ru') {
  if (sku === 'planner-bundle' || sku === 'planner-bundle-library') return t('app.purchases.skuPlanners')
  if (sku === 'ultimate-prompt-library') return t('app.purchases.skuPromptLibrary')
  if (sku === 'mindora-ai-coach' || sku === 'wise-ai-coach') return t('app.purchases.skuMindoraCoach')
  return plannerContent(locale).planners.find((planner) => `planner-${planner.id}` === sku)?.name || sku
}

function formatDate(stamp: number, locale: string) {
  if (!stamp) return ''
  return new Date(stamp).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatPrice(cents: number | null) {
  if (cents == null) return null
  return `$${(cents / 100).toFixed(2)}`
}

function visibleRows(records: PurchaseRecord[]) {
  const skus = new Set(records.map((row) => row.sku))
  const ownsBundle = [...BUNDLE_SKUS].some((sku) => skus.has(sku))
  return records.filter((row) => {
    if (ownsBundle && row.sku.startsWith('planner-') && !BUNDLE_SKUS.has(row.sku)) return false
    return true
  })
}

export default function PurchasesPage() {
  const { t, locale } = useI18n()
  const records = usePurchaseRecords()
  const rows = records ? visibleRows(records) : undefined
  const skus = new Set((rows ?? []).map((row) => row.sku))
  const hasVault = skus.has('ultimate-prompt-library')
  const hasPlanners = [...skus].some((sku) => sku.startsWith('planner-'))

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="sticky top-0 z-40 bg-white border-b border-sw-grey-border">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center gap-3">
          <Link to="/app/profile" className="text-sw-grey active:scale-95 transition-transform">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-base font-bold text-sw-dark">{t('app.purchases.title')}</h1>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 pt-5 space-y-4">
        {rows === undefined ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-sw-blue border-t-transparent rounded-full animate-spin" />
          </div>
        ) : rows.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛍️</span>
            </div>
            <h2 className="text-lg font-bold text-sw-dark mb-1">{t('app.purchases.emptyTitle')}</h2>
            <p className="text-sm text-sw-grey mb-4">{t('app.purchases.emptySub')}</p>
            <Link to="/app/dashboard" className="inline-flex items-center gap-1 text-sm font-semibold text-sw-blue">
              {t('app.common.backToDashboardLink')}
            </Link>
          </div>
        ) : (
          <>
            {(hasVault || hasPlanners) && (
              <div className="flex flex-col gap-2">
                {hasVault ? (
                  <Link
                    to="/app/prompt-library"
                    className="block bg-white rounded-2xl p-4 border border-sw-grey-border text-sm font-semibold text-sw-dark"
                  >
                    {t('app.purchases.openPromptLibrary')}
                  </Link>
                ) : null}
                {hasPlanners ? (
                  <Link
                    to="/app/planners"
                    className="block bg-white rounded-2xl p-4 border border-sw-grey-border text-sm font-semibold text-sw-dark"
                  >
                    {t('app.purchases.openPlanners')}
                  </Link>
                ) : null}
              </div>
            )}
            {rows.map((row) => {
              const price = formatPrice(row.amountCents)
              const date = formatDate(row.createdAt, locale)
              return (
                <div key={row.sku} className="bg-white rounded-2xl p-4 border border-sw-grey-border">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-bold text-sw-dark">{labelFor(row.sku, t, locale)}</p>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {t('app.common.active')}
                    </span>
                  </div>
                  <p className="text-xs text-sw-grey mt-1">
                    {[date, price].filter(Boolean).join(' · ')}
                    {date || price ? ' · ' : ''}
                    {t('app.common.lifetimeAccess')}
                  </p>
                </div>
              )
            })}
          </>
        )}
      </main>
    </div>
  )
}
