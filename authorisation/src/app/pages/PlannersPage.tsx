import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  PLANNER_COUNT,
  PLANNER_LIST_CENTS,
  PLANNER_SINGLE_CENTS,
  money,
  plannerContent,
} from '@/content/planners'
import { buyOffer, chargeErrorMessage } from '@/lib/api'
import { useI18n } from '@/i18n/I18nProvider'
import { useHasSavedCard, usePurchases } from '@/lib/lmsQueries'

const LIBRARY_SLUG = 'planner-bundle-library'

export default function PlannersPage() {
  const { t, locale } = useI18n()
  const { planners: plannerList, categories: plannerCategories } = plannerContent(locale)
  const purchases = usePurchases()
  const hasCard = useHasSavedCard()
  const [filter, setFilter] = useState('all')
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [errorOffer, setErrorOffer] = useState<string | null>(null)
  const ready = purchases !== undefined
  const ownedBundle = Boolean(purchases?.has('planner-bundle') || purchases?.has(LIBRARY_SLUG))
  const ownedCount = plannerList.filter(
    (planner) => ownedBundle || Boolean(purchases?.has(`planner-${planner.id}`)),
  ).length
  const ownsAll = ownedCount === PLANNER_COUNT
  const showHero = ready && !ownsAll
  const list =
    filter === 'all'
      ? plannerList
      : plannerList.filter((planner) => {
          const category = plannerCategories.find((item) => item.id === filter)
          return category?.plannerIds.includes(planner.id)
        })

  const buy = async (slug: string) => {
    if (busy) return
    setBusy(slug)
    setError(null)
    setErrorOffer(null)
    try {
      const result = await buyOffer({ offerSlug: slug })
      if (result.checkoutUrl) return
      if (result.success || result.alreadyPurchased) {
        window.location.reload()
        return
      }
      setErrorOffer(slug)
      setError(chargeErrorMessage(result, t, t('app.common.paymentCouldNotComplete')))
    } catch {
      setErrorOffer(slug)
      setError(t('app.common.paymentCouldNotComplete'))
    }
    setBusy(null)
  }

  const ownedNote =
    ownedCount === 0
      ? t('app.planners.ownedNone')
      : t('app.planners.ownedSome').replace('{owned}', String(ownedCount)).replace('{total}', String(PLANNER_COUNT))

  return (
    <div className="min-h-screen bg-sw-grey-light" data-state={ready ? 'ready' : 'loading'}>
      <header className="sticky top-0 z-10 border-b border-sw-grey-border bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-6">
          <Link
            to="/app/dashboard"
            aria-label={t('app.common.backToDashboard')}
            className="flex h-9 w-9 items-center justify-center rounded-full text-sw-dark hover:bg-sw-grey-light"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <h1 className="text-lg font-extrabold text-sw-dark">{t('app.planners.title')}</h1>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <p className="max-w-2xl text-sm text-sw-dark">
          {t('app.planners.intro').replace('{n}', String(PLANNER_COUNT))}
        </p>

        {showHero ? (
          <section data-testid="planner-bundle-hero" className="mt-6 rounded-2xl border border-sw-blue-border bg-white p-5">
            <h2 className="text-lg font-extrabold leading-tight text-sw-dark">
              {t('app.planners.bundleTitle').replace('{n}', String(PLANNER_COUNT))}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-sw-grey">{t('app.planners.bundleBody')}</p>
            <div
              data-testid="planner-bundle-comparison"
              className="mt-4 grid grid-cols-2 items-stretch overflow-hidden rounded-xl border border-sw-grey-border bg-sw-grey-light"
            >
              <div className="border-r border-sw-grey-border p-3 text-center sm:p-4">
                <p className="text-[11px] font-bold uppercase tracking-wide text-sw-grey">{t('app.planners.oneAtATime')}</p>
                <p className="mt-1 text-lg font-extrabold text-sw-grey line-through sm:text-xl">{money(PLANNER_LIST_CENTS)}</p>
                <p className="mt-1 text-xs leading-snug text-sw-grey">
                  {PLANNER_COUNT} × {money(PLANNER_SINGLE_CENTS)}
                </p>
              </div>
              <div className="bg-white p-3 text-center sm:p-4">
                <p className="text-[11px] font-bold uppercase tracking-wide text-sw-blue">
                  {t('app.planners.allTogether').replace('{n}', String(PLANNER_COUNT))}
                </p>
                <p className="mt-1 text-lg font-extrabold text-sw-dark sm:text-xl">$7.95</p>
                <p className="mt-1 text-xs font-bold leading-snug text-sw-dark">
                  {t('app.planners.save').replace('{amount}', money(PLANNER_LIST_CENTS - 795))}
                </p>
              </div>
            </div>
            <button
              type="button"
              data-testid="planner-bundle-buy"
              disabled={busy !== null}
              onClick={() => void buy(LIBRARY_SLUG)}
              className="mt-4 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-sw-blue px-6 py-3 text-center text-sm font-bold leading-tight text-white disabled:opacity-60 sm:text-base"
            >
              {busy === LIBRARY_SLUG
                ? t('app.planners.adding')
                : t('app.planners.addAll').replace('{n}', String(PLANNER_COUNT))}
            </button>
            <p className="mt-3 text-center text-xs leading-relaxed text-sw-grey">
              <span className="font-bold text-sw-dark">{t('app.planners.chargeNote')}</span>
              {hasCard === true ? t('app.planners.chargeSavedCard') : t('app.planners.chargeStripe')}
              {t('app.planners.keepPdf')}
            </p>
            {error && errorOffer === LIBRARY_SLUG ? (
              <p data-testid="planner-bundle-error" className="mt-3 text-center text-xs text-sw-coral">
                {error}
              </p>
            ) : null}
          </section>
        ) : null}

        {ready ? (
          <p data-testid="planners-owned-count" className="mt-2 max-w-2xl text-sm text-sw-grey">
            {ownedNote}
          </p>
        ) : (
          <p className="mt-2 max-w-2xl text-sm text-sw-grey">{t('app.planners.loading')}</p>
        )}

        <div
          data-testid="planner-filters"
          className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          <FilterChip id="all" label={t('app.planners.filterAll').replace('{n}', String(PLANNER_COUNT))} current={filter} onSelect={setFilter} />
          {plannerCategories.map((category) => (
            <FilterChip
              key={category.id}
              id={category.id}
              label={`${category.name} (${category.plannerIds.length})`}
              current={filter}
              onSelect={setFilter}
            />
          ))}
        </div>

        <ul data-testid="planner-grid" className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {list.map((planner) => {
            const owned = ownedBundle || Boolean(purchases?.has(`planner-${planner.id}`))
            const sku = `planner-${planner.id}`
            return (
              <li
                key={planner.id}
                data-testid="planner-card"
                data-planner-id={planner.id}
                className="flex flex-col overflow-hidden rounded-xl border border-sw-grey-border bg-white"
              >
                <img
                  alt={t('app.planners.coverAlt').replace('{name}', planner.name)}
                  loading="lazy"
                  width={935}
                  height={1210}
                  className="aspect-[935/1210] w-full bg-sw-grey-light object-cover"
                  src={planner.coverUrl}
                />
                <div className="flex flex-1 flex-col p-3">
                  <h2 className="text-sm font-bold leading-snug text-sw-dark">{planner.name}</h2>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-sw-grey">
                    {t('app.planners.printablePages').replace('{n}', String(planner.pdfPages))}
                  </p>
                  <p className="mt-2 text-xs leading-snug text-sw-grey">{planner.benefit}</p>
                  {showHero ? (
                    <p className="mt-2 text-[11px] font-bold leading-snug text-sw-blue">{t('app.planners.inBundle')}</p>
                  ) : null}
                  <div className="mt-auto pt-3">
                    {owned ? (
                      <a
                        data-testid="planner-download"
                        data-planner-id={planner.id}
                        href={`/api/planners/download?planner=${encodeURIComponent(planner.id)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-sw-blue px-2 py-2 text-xs font-bold text-white sm:px-4"
                      >
                        {t('app.planners.downloadPdf')}
                      </a>
                    ) : (
                      <div className="mt-3">
                        <p data-testid="planner-price" data-planner-id={planner.id} className="text-xs font-bold text-sw-dark">
                          {money(PLANNER_SINGLE_CENTS)}
                        </p>
                        <button
                          type="button"
                          data-testid="planner-buy"
                          data-planner-id={planner.id}
                          disabled={busy !== null}
                          onClick={() => void buy(sku)}
                          className="mt-2 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-sw-blue px-2 py-2 text-center text-xs font-bold leading-tight text-white disabled:opacity-60 sm:px-4"
                        >
                          {busy === sku ? t('app.planners.addingShort') : t('app.planners.addToLibrary')}
                        </button>
                        {error && errorOffer === sku ? (
                          <p
                            data-testid="planner-buy-error"
                            data-planner-id={planner.id}
                            className="mt-2 text-xs text-sw-coral"
                          >
                            {error}
                          </p>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function FilterChip({
  id,
  label,
  current,
  onSelect,
}: {
  id: string
  label: string
  current: string
  onSelect: (id: string) => void
}) {
  const on = current === id
  return (
    <button
      type="button"
      data-testid="planner-filter"
      data-category-id={id}
      aria-pressed={on}
      onClick={() => onSelect(id)}
      className={`min-h-[44px] shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors ${
        on ? 'border-sw-blue bg-sw-blue text-white' : 'border-sw-grey-border bg-white text-sw-dark hover:border-sw-blue'
      }`}
    >
      {label}
    </button>
  )
}
