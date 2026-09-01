import { useEffect, useRef, useState } from 'react'
import OtoChrome from '@/account/OtoChrome'
import { Authenticated, AuthLoading, Unauthenticated } from '@/auth/authGates'
import AuthSpinner from '@/auth/AuthSpinner'
import { useCurrentUser } from '@/auth/session'
import {
  PLANNER_CATEGORIES,
  PLANNER_COUNT,
  PLANNER_LIST_CENTS,
  PLANNER_OTO_CENTS,
  PLANNER_PAGES,
  PLANNER_SINGLE_CENTS,
  PLANNER_BUNDLE_SLUG,
  PLANNERS,
  money,
  plannersInCategory,
} from '@/content/planners'
import { chargeUpsell, recordUpsellEvent, recordUpsellFailure } from '@/lib/api'
import { useHasSavedCard, useUpsellStatus } from '@/lib/lmsQueries'
import { armReviewMode, isReviewPurchaseBlocked, REVIEW_PURCHASE_BLOCKED } from '@/lib/reviewMode'
import { attributionPayload, track } from '@/lib/track'

const OFFER = PLANNER_BUNDLE_SLUG
const COMPARE_COUNT = 2
const NEXT = '/account/upgrade-wise'

const NOT_CHARGED = 'You have not been charged.'
const CONTINUE = 'Continue without the planners — you can add them later from your dashboard.'
const ERROR_COPY: Record<string, string> = {
  cardDeclined: `Your bank declined that payment, so ${NOT_CHARGED.toLowerCase()} ${CONTINUE}`,
  insufficientFunds: `Your bank declined that payment for insufficient funds, so ${NOT_CHARGED.toLowerCase()} ${CONTINUE}`,
  authenticationRequired: `Your bank wants to verify this payment, which the saved card cannot do on its own. ${NOT_CHARGED} ${CONTINUE}`,
  noCard: `We do not have a saved card on this account. ${NOT_CHARGED} ${CONTINUE}`,
  noSavedCard: `We do not have a saved card on this account. ${NOT_CHARGED} ${CONTINUE}`,
  lookupFailed: `We could not read your saved payment method just now — that is our end, not yours. ${NOT_CHARGED} ${CONTINUE}`,
  notAuthenticated: `Your session has expired, so ${NOT_CHARGED.toLowerCase()} Sign in again to add the planners, or continue without them.`,
  configError: `Something is wrong at our end and the payment could not be taken. ${NOT_CHARGED} Please continue without the planners for now — you can add them later, and nothing is lost.`,
  invalidRequest: `We could not set up that payment — that is our end, not yours. ${NOT_CHARGED} Please continue without the planners for now; you can add them later.`,
  unknown: `That payment did not go through, so ${NOT_CHARGED.toLowerCase()} ${CONTINUE}`,
}

function errorCopy(reason: string | undefined) {
  return ERROR_COPY[reason ?? ''] ?? ERROR_COPY.unknown
}

const ACCENT = {
  success: {
    iconBg: 'bg-sw-success/15',
    iconText: 'text-sw-success',
    badgeBg: 'bg-sw-success/15',
    badgeText: 'text-sw-success',
  },
  purple: {
    iconBg: 'bg-sw-purple/15',
    iconText: 'text-sw-purple',
    badgeBg: 'bg-sw-purple/15',
    badgeText: 'text-sw-purple',
  },
  coral: {
    iconBg: 'bg-sw-coral/15',
    iconText: 'text-sw-coral',
    badgeBg: 'bg-sw-coral/15',
    badgeText: 'text-sw-coral',
  },
  teal: {
    iconBg: 'bg-sw-teal/15',
    iconText: 'text-sw-teal',
    badgeBg: 'bg-sw-teal/15',
    badgeText: 'text-sw-teal',
  },
} as const

const INTERIORS = [
  { src: '/assets/oto/interior-1.png', alt: 'A page from inside one of the planners' },
  { src: '/assets/oto/interior-2.png', alt: 'Another page from inside one of the planners' },
  { src: '/assets/oto/interior-3.png', alt: 'A further page from inside one of the planners' },
]

function UnauthRedirect() {
  useEffect(() => {
    window.location.href = '/login'
  }, [])
  return <AuthSpinner />
}

function BounceWise() {
  useEffect(() => {
    window.location.href = NEXT
  }, [])
  return <AuthSpinner message="Almost there..." />
}

function BounceDashboard() {
  useEffect(() => {
    window.location.href = '/app/dashboard'
  }, [])
  return <AuthSpinner message="Almost there..." />
}

function CategoryIcon({ icon }: { icon: string }) {
  const props = {
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'h-6 w-6',
    'aria-hidden': true as const,
  }
  if (icon === 'target') {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3.4" />
        <path d="M12 12 20.5 3.5" />
      </svg>
    )
  }
  if (icon === 'rocket') {
    return (
      <svg {...props}>
        <path d="M5 15c-1 2.5-1 5-1 5s2.5 0 5-1" />
        <path d="M9 18c-2-1-3-2-4-4 1-7 6-11 12-11 0 6-4 11-11 12z" />
        <circle cx="14.5" cy="9.5" r="1.6" />
      </svg>
    )
  }
  if (icon === 'compass') {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M15.5 8.5 13.2 13.2 8.5 15.5l2.3-4.7z" />
      </svg>
    )
  }
  if (icon === 'wallet') {
    return (
      <svg {...props}>
        <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H17a2 2 0 0 1 2 2v1" />
        <path d="M4 7.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2.5" />
        <path d="M20 9.5H15a2.5 2.5 0 0 0 0 5h5z" />
      </svg>
    )
  }
  return null
}

function ChargeNote() {
  return (
    <div className="mt-3 rounded-xl border border-sw-grey-border bg-white p-3">
      <p className="text-xs leading-relaxed text-sw-grey">
        By clicking above,{' '}
        <span className="font-bold text-sw-dark">
          you agree to a one-time charge of {money(PLANNER_OTO_CENTS)}
        </span>{' '}
        using your saved payment method. Access is granted instantly. This offer reverts to{' '}
        {money(PLANNER_LIST_CENTS)} after you leave this page.
      </p>
    </div>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-sw-grey-border bg-white">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
      >
        <span className="text-sm font-bold text-sw-dark">{question}</span>
        <span aria-hidden="true" className="text-sw-grey">
          {open ? '−' : '+'}
        </span>
      </button>
      {open ? <p className="px-4 pb-4 text-sm leading-relaxed text-sw-grey">{answer}</p> : null}
    </div>
  )
}

function SuccessScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="max-w-sm text-center">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-sw-blue-light">
          <svg
            aria-hidden="true"
            className="h-10 w-10 text-sw-blue"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mb-2 text-2xl font-extrabold text-sw-dark">Payment successful</h2>
        <p className="mb-1 text-base font-semibold text-sw-dark">All {PLANNER_COUNT} planners are yours</p>
        <p className="text-sm text-sw-grey">
          They are on the Purchases page in your dashboard, and they stay there permanently.
        </p>
        <div className="mt-6">
          <div
            aria-hidden="true"
            className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-sw-blue border-t-transparent"
          />
          <p className="mt-2 text-xs text-sw-grey">Taking you to your next step...</p>
        </div>
      </div>
    </div>
  )
}

function CheckIcon({ variant }: { variant: 'tick' | 'minus' | 'pdf' }) {
  if (variant === 'minus') {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-sw-success">
        <path
          fillRule="evenodd"
          d="M10 1.7a8.3 8.3 0 1 0 0 16.6 8.3 8.3 0 0 0 0-16.6ZM6.3 9.2h7.4a.8.8 0 0 1 0 1.6H6.3a.8.8 0 0 1 0-1.6Z"
          clipRule="evenodd"
        />
      </svg>
    )
  }
  if (variant === 'pdf') {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-sw-success">
        <path d="M5 2.5h7l3.5 3.5v11a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5v-14A.5.5 0 0 1 5 2.5Zm6.5 1.4V6.5H14L11.5 3.9Z" />
      </svg>
    )
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-sw-success">
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 0 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function PlannerOffer({ hasSavedCard }: { hasSavedCard: boolean }) {
  const [state, setState] = useState<'idle' | 'processing' | 'success'>('idle')
  const [error, setError] = useState('')
  const [skipping, setSkipping] = useState(false)
  const viewed = useRef(false)
  const busy = state === 'processing' || skipping
  const showCtas = hasSavedCard

  useEffect(() => {
    if (viewed.current) return
    viewed.current = true
    void recordUpsellEvent({ offerSlug: OFFER, action: 'viewed' }).catch(() => {})
    track('upsell_viewed', { offer: OFFER })
  }, [])

  useEffect(() => {
    const trap = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.onbeforeunload = trap
    return () => {
      window.onbeforeunload = null
    }
  }, [])

  useEffect(() => {
    if (state !== 'success') return
    const timer = setTimeout(() => {
      window.onbeforeunload = null
      window.location.href = NEXT
    }, 2500)
    return () => clearTimeout(timer)
  }, [state])

  const recordFail = (reason: string, extra?: unknown) => {
    track('upsell_purchase_failed', { offer: OFFER, reason })
    if (extra) console.error('[PlannerBundle] Purchase failed:', reason, extra)
    void recordUpsellFailure({ offerSlug: OFFER, reason, source: 'upgrade_path' }).catch((err) =>
      console.error('[PlannerBundle] Failed to record failure:', err),
    )
  }

  const buy = async () => {
    if (busy || state === 'success') return
    if (!hasSavedCard) {
      setError(errorCopy('noCard'))
      return
    }
    if (isReviewPurchaseBlocked()) {
      setError(REVIEW_PURCHASE_BLOCKED)
      return
    }
    setState('processing')
    setError('')
    void recordUpsellEvent({ offerSlug: OFFER, action: 'attempted' }).catch(() => {})
    track('upsell_attempted', { offer: OFFER })
    try {
      const attribution = attributionPayload()
      const result = await chargeUpsell({
        offerSlug: OFFER,
        attribution: Object.keys(attribution).length > 0 ? attribution : undefined,
      })
      if (result.success) {
        setState('success')
        track('upsell_purchased', { offer: OFFER, alreadyPurchased: result.alreadyPurchased })
        return
      }
      const reason = result.reason || 'configError'
      setState('idle')
      setError(errorCopy(reason))
      recordFail(reason)
    } catch (err) {
      setState('idle')
      setError(errorCopy('unknown'))
      recordFail('unknown', err)
    }
  }

  const skip = () => {
    if (busy || state === 'success') return
    setSkipping(true)
    const go = () => {
      window.onbeforeunload = null
      window.location.href = NEXT
    }
    track('upsell_skipped', { offer: OFFER })
    void recordUpsellEvent({ offerSlug: OFFER, action: 'skipped' }).then(go).catch(go)
  }

  if (state === 'success') return <SuccessScreen />

  const i = PLANNER_COUNT
  const pages = PLANNER_PAGES
  const oto = money(PLANNER_OTO_CENTS)
  const list = money(PLANNER_LIST_CENTS)
  const single = money(PLANNER_SINGLE_CENTS)
  const areas = PLANNER_CATEGORIES.length

  return (
    <>
      <OtoChrome
        activeStep="Upgrades"
        pillTestId="planner-new-member-label"
        pillLabel="⚡ Exclusive new-member bundle"
        pillSubLabel="Only available during setup"
        pillClassName="bg-sw-amber"
      />
      <div className="min-h-screen overflow-x-hidden bg-white px-4 pt-4 pb-44">
        <div className="mx-auto max-w-2xl">
          <div className="px-1 sm:px-2">
            <h1 className="mt-6 text-balance text-center text-[2.5rem] font-extrabold leading-[1.1] text-sw-dark sm:text-5xl">
              Plan Better. Focus Deeper.{' '}
              <span className="text-sw-blue">Dream Bigger.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-md text-center text-base leading-relaxed text-sw-dark sm:text-lg">
              Get all {i} Productivity & Personal Growth Planners for just{' '}
              <span className="font-bold text-sw-blue">{oto}</span>.
            </p>
            <p
              data-testid="planner-hero-subline"
              className="mx-auto mt-3 max-w-lg text-center text-sm leading-relaxed text-sw-grey sm:text-base"
            >
              {pages} printable pages to help you organise your days, beat procrastination, build
              better habits, clarify your goals and turn bigger ambitions into action.
            </p>
            <div className="relative mx-auto mt-6 w-full max-w-2xl">
              <img
                src="/assets/oto/hero.png"
                alt={`All ${i} printable planners in the bundle`}
                loading="eager"
                data-testid="planner-hero-image"
                className="h-auto w-full"
              />
              <div
                data-testid="planner-size-badge"
                className="absolute right-1 top-1 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-white text-center shadow-lg ring-4 ring-sw-blue sm:right-4 sm:h-24 sm:w-24"
              >
                <span className="text-xl font-extrabold leading-none text-sw-blue sm:text-2xl">{i}</span>
                <span className="text-[8px] font-bold uppercase tracking-wide text-sw-blue sm:text-[9px]">
                  Planners
                </span>
                <span className="mt-0.5 text-[11px] font-extrabold leading-none text-sw-dark sm:text-sm">
                  {pages}
                </span>
                <span className="text-[7px] font-bold uppercase leading-tight tracking-wide text-sw-grey sm:text-[8px]">
                  Printable
                  <br />
                  pages
                </span>
              </div>
            </div>
            <div
              data-testid="planner-price-block"
              className="mt-6 rounded-2xl border border-sw-grey-border bg-white p-5 text-center shadow-sm sm:p-6"
            >
              <div className="flex items-stretch justify-center gap-4 sm:gap-8">
                <div className="flex flex-1 flex-col items-center justify-center">
                  <span
                    data-testid="planner-anchor-price"
                    className="text-2xl font-extrabold text-sw-grey line-through decoration-2 sm:text-3xl"
                  >
                    {list}
                  </span>
                  <span className="mt-1 text-[11px] font-bold uppercase tracking-wide text-sw-grey">
                    Individual value
                  </span>
                </div>
                <div aria-hidden="true" className="w-px bg-sw-grey-border" />
                <div className="flex flex-1 flex-col items-center justify-center">
                  <span className="text-[11px] font-extrabold uppercase tracking-wide text-sw-dark">
                    Today only
                  </span>
                  <span
                    data-testid="planner-bundle-price"
                    className="text-4xl font-extrabold leading-none text-sw-blue sm:text-5xl"
                  >
                    {oto}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold text-sw-dark">
                {list} bought separately — a one-time payment, not a subscription
              </p>
              <p
                data-testid="planner-savings"
                className="mt-4 rounded-lg bg-sw-amber/25 px-4 py-2.5 text-base font-extrabold uppercase tracking-wide text-sw-amber-dark"
              >
                Save {money(PLANNER_LIST_CENTS - PLANNER_OTO_CENTS)}
              </p>
              {showCtas ? (
                <>
                  <button
                    type="button"
                    onClick={() => void buy()}
                    disabled={busy}
                    data-testid="planner-hero-cta"
                    className="mt-4 flex min-h-[56px] w-full items-center justify-center rounded-full bg-sw-blue px-7 py-3 text-center text-base font-bold leading-tight text-white shadow-lg shadow-sw-blue/25 transition-all hover:bg-sw-blue-hover active:scale-95 disabled:opacity-60"
                  >
                    Yes! Unlock all {i} planners for {oto} →
                  </button>
                  <ChargeNote />
                </>
              ) : null}
              <button
                type="button"
                onClick={skip}
                data-testid="planner-hero-skip"
                className="mx-auto mt-2 flex min-h-[44px] items-center justify-center px-2 text-sm font-semibold text-sw-blue underline decoration-1 underline-offset-2 transition hover:text-sw-blue-hover"
              >
                No thanks, continue without the planners
              </button>
            </div>
            <ul
              data-testid="planner-trust-row"
              className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-sw-grey"
            >
              <li className="flex items-center gap-1.5">
                <CheckIcon variant="tick" />
                Instant access in your dashboard
              </li>
              <li className="flex items-center gap-1.5">
                <CheckIcon variant="minus" />
                Single charge, no subscription
              </li>
              <li className="flex items-center gap-1.5">
                <CheckIcon variant="pdf" />
                {i} printable PDFs, yours to keep
              </li>
            </ul>
            <section
              data-testid="planner-value-comparison"
              className="mt-8 rounded-2xl border border-sw-grey-border bg-white p-5 sm:p-6"
            >
              <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.14em] text-sw-blue sm:text-xs">
                Why this bundle is unbeatable value
              </p>
              <h2 className="mt-3 text-balance text-center text-2xl font-extrabold leading-[1.15] text-sw-dark sm:text-3xl">
                Get {i - COMPARE_COUNT} More Planners
                <br />
                <span className="text-sw-blue">And Still Pay Less.</span>
              </h2>
              <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-sw-grey sm:text-base">
                Buying just {COMPARE_COUNT} planners later would cost more than getting all {i} today
                at this special price.
              </p>
              <div className="relative mt-6 grid grid-cols-2 gap-3 sm:gap-5">
                <div className="rounded-2xl border border-sw-coral/30 bg-sw-coral/10 p-4 text-center">
                  <span
                    aria-hidden="true"
                    className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-sw-coral/20 text-base"
                  >
                    🛒
                  </span>
                  <p className="mt-2 text-[11px] font-extrabold uppercase tracking-wide text-sw-dark sm:text-xs">
                    Buy just {COMPARE_COUNT} later
                  </p>
                  <p className="mt-1 text-xs font-semibold text-sw-grey">
                    {COMPARE_COUNT} × {single}
                  </p>
                  <p className="mt-1 text-3xl font-extrabold text-sw-coral sm:text-4xl">
                    {money(COMPARE_COUNT * PLANNER_SINGLE_CENTS)}
                  </p>
                </div>
                <div className="rounded-2xl border border-sw-success/30 bg-sw-success/10 p-4 text-center">
                  <span
                    aria-hidden="true"
                    className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-sw-success/20 text-base"
                  >
                    🎁
                  </span>
                  <p className="mt-2 text-[11px] font-extrabold uppercase tracking-wide text-sw-dark sm:text-xs">
                    Get all {i} now
                  </p>
                  <p className="mt-1 text-xs font-semibold text-sw-grey">{i} planners</p>
                  <p className="mt-1 text-3xl font-extrabold text-sw-success sm:text-4xl">{oto}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-sw-grey-border bg-white text-[11px] font-extrabold uppercase text-sw-grey shadow-sm sm:h-10 sm:w-10 sm:text-xs"
                >
                  vs
                </span>
              </div>
              <p className="mx-auto mt-5 flex max-w-md items-center justify-center gap-2 rounded-full bg-sw-amber/20 px-4 py-2.5 text-center text-sm font-bold text-sw-amber-dark">
                <span aria-hidden="true">⭐</span>
                That{"\u2019"}s {i - COMPARE_COUNT} extra planners — and you still pay less.
              </p>
              <p className="mt-3 text-center text-sm text-sw-grey">
                All {i} individually inside MindoraAcademy:{' '}
                <span className="font-bold text-sw-blue">{list}</span>
              </p>
              {showCtas ? (
                <>
                  <button
                    type="button"
                    onClick={() => void buy()}
                    disabled={busy}
                    data-testid="planner-mid-cta"
                    className="mt-5 flex min-h-[44px] w-full items-center justify-center rounded-full bg-sw-blue px-6 py-3 text-center text-base font-extrabold text-white shadow-lg shadow-sw-blue/25 transition-colors hover:bg-sw-blue-hover disabled:opacity-60"
                  >
                    Add all {i} for {oto}
                  </button>
                  <ChargeNote />
                </>
              ) : null}
            </section>
            <section data-testid="planner-categories" className="mt-10 border-t border-sw-grey-border pt-8">
              <p className="text-center text-xs font-extrabold uppercase tracking-[0.14em] text-sw-blue">
                Why {i} planners?
              </p>
              <h2 className="mt-3 text-center text-[1.75rem] font-extrabold leading-[1.1] text-sw-dark sm:text-4xl">
                One Bundle.
                <br />
                <span className="text-sw-blue">{areas} Areas of Life.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-balance text-center text-[15px] leading-relaxed text-sw-grey sm:text-base">
                Each planner helps with a different part of your life — so you can stay focused, grow,
                reflect and take action with the right tool at the right time.
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {PLANNER_CATEGORIES.map((category) => {
                  const planners = plannersInCategory(category.id)
                  const accent = ACCENT[category.accent as keyof typeof ACCENT]
                  return (
                    <div
                      key={category.id}
                      data-testid={`planner-category-${category.id}`}
                      className="flex flex-col rounded-2xl border border-sw-grey-border bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-start gap-4">
                        <span
                          aria-hidden="true"
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${accent.iconBg} ${accent.iconText}`}
                        >
                          <CategoryIcon icon={category.icon} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                            <h3 className="text-lg font-extrabold leading-tight text-sw-dark">
                              {category.name}
                            </h3>
                            <span
                              className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${accent.badgeBg} ${accent.badgeText}`}
                            >
                              {planners.length} {planners.length === 1 ? 'planner' : 'planners'}
                            </span>
                          </div>
                          <ul className="mt-2 space-y-1.5">
                            {planners.map((planner) => (
                              <li
                                key={planner.id}
                                className="flex items-start gap-2 text-[15px] font-semibold text-sw-dark"
                              >
                                <svg
                                  aria-hidden="true"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className={`mt-[3px] h-4 w-4 shrink-0 ${accent.iconText}`}
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>{planner.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <p className="mt-4 border-t border-sw-grey-border pt-3 text-[15px] leading-relaxed text-sw-grey">
                        {category.summary}
                      </p>
                    </div>
                  )
                })}
              </div>
            </section>
            <div className="mt-8">
              <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.14em] text-sw-blue">
                Everything you get
              </p>
              <h2 className="mt-3 text-center text-2xl font-extrabold leading-[1.15] text-sw-dark sm:text-3xl">
                {i} Practical Planners.
                <br />
                <span className="text-sw-blue">One Powerful Bundle.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-sw-grey sm:text-base">
                A complete set of printable planners to help you focus, take action, build better
                habits and create progress in every area of life.
              </p>
              <ul data-testid="planner-value-stack" className="mt-6 grid grid-cols-2 gap-4 sm:gap-5">
                {PLANNERS.map((planner) => (
                  <li
                    key={planner.id}
                    data-testid="planner-card"
                    className="flex h-full flex-col overflow-hidden rounded-xl border border-sw-grey-border bg-white"
                  >
                    <img
                      src={planner.coverUrl}
                      alt={planner.name}
                      loading="lazy"
                      width={935}
                      height={1210}
                      className="aspect-[935/1210] w-full bg-sw-grey-light object-cover"
                    />
                    <div className="flex flex-1 flex-col p-3">
                      <p className="text-sm font-bold leading-snug text-sw-dark">{planner.name}</p>
                      <p className="mt-1 text-xs leading-snug text-sw-grey">{planner.benefit}</p>
                      <p className="mt-auto pt-2 text-xs font-semibold text-sw-grey">
                        {planner.pdfPages} printable pages
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div data-testid="planner-how-it-works" className="mt-8">
              <h2 className="text-center text-xl font-extrabold leading-tight text-sw-dark sm:text-2xl">
                How it works
              </h2>
              <ol className="mt-6 space-y-4">
                {[
                  {
                    title: 'Download the whole set',
                    body: `All ${i} planners land in your account as printable PDFs, ready straight away.`,
                  },
                  {
                    title: 'Pick the area you want to work on',
                    body: `Start with whichever of the ${areas} areas matters most right now. There is no order to follow.`,
                  },
                  {
                    title: 'Print a page, or fill it in on screen',
                    body: 'Print the pages you want as often as you like, or type into them on your tablet or computer. They are yours to keep.',
                  },
                ].map((step, index) => (
                  <li
                    key={step.title}
                    data-testid="planner-how-it-works-step"
                    className="flex gap-4 rounded-xl border border-sw-grey-border bg-white p-4"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sw-blue-light text-sm font-extrabold text-sw-blue"
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold leading-snug text-sw-dark">{step.title}</p>
                      <p className="mt-1 text-sm leading-snug text-sw-grey">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div data-testid="planner-interior-proof" className="mt-8">
              <h2 className="text-center text-xl font-extrabold leading-tight text-sw-dark sm:text-2xl">
                A look inside
              </h2>
              <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-sw-grey">
                Real pages from the planners you get today.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
                {INTERIORS.map((image) => (
                  <img
                    key={image.src}
                    data-testid="planner-interior-image"
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full rounded-xl border border-sw-grey-border bg-white"
                  />
                ))}
              </div>
            </div>
            <figure data-testid="planner-lifestyle" className="mt-8">
              <img
                src="/assets/oto/lifestyle.png"
                alt="The planners printed out and bound into booklets on a desk"
                loading="lazy"
                className="w-full rounded-xl border border-sw-grey-border bg-white"
              />
              <figcaption className="mt-3 text-center text-sm leading-relaxed text-sw-grey">
                Print the pages you want, as often as you like.
              </figcaption>
            </figure>
            <div data-testid="planner-size-strip" className="mt-10">
              <p className="text-center text-xs font-extrabold uppercase tracking-[0.14em] text-sw-blue">
                New member bundle
              </p>
              <h2 className="mt-3 text-balance text-center text-[1.75rem] font-extrabold leading-[1.15] text-sw-dark sm:text-4xl">
                Your Best Deal Is Still <span className="text-sw-blue">Right Here.</span>
              </h2>
              <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-sw-grey sm:text-base">
                If you want all {i} planners, this is the lowest price you&apos;ll see on this page. Buy
                them individually later and you&apos;ll pay more.
              </p>
              <div className="mt-6 rounded-2xl border border-sw-grey-border bg-white p-5 shadow-sm sm:p-7">
                <p className="inline-flex items-center rounded-full bg-sw-blue-light px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-sw-blue">
                  Special new-member pricing
                </p>
                <div className="mt-4 flex items-center justify-center gap-5 sm:gap-8">
                  <div className="text-center">
                    <p className="text-3xl font-extrabold leading-none text-sw-grey line-through sm:text-4xl">
                      {list}
                    </p>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-sw-grey sm:text-xs">
                      Individual value
                    </p>
                  </div>
                  <div aria-hidden="true" className="h-14 w-px shrink-0 bg-sw-grey-border" />
                  <div className="text-center">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-sw-dark">Today</p>
                    <p className="mt-1 text-4xl font-extrabold leading-none text-sw-blue sm:text-5xl">
                      {oto}
                    </p>
                  </div>
                </div>
                <p className="mt-5 rounded-xl bg-sw-amber/15 px-4 py-3 text-center text-lg font-extrabold uppercase tracking-wide text-sw-amber-dark sm:text-xl">
                  Save {money(PLANNER_LIST_CENTS - PLANNER_OTO_CENTS)}
                </p>
                <ul className="mt-5 space-y-0 text-left">
                  {[
                    `All ${i} planners included`,
                    `${pages} printable pages`,
                    'Instant access in MindoraAcademy',
                    'One-time payment — no subscription',
                    'Yours to keep',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 border-b border-sw-grey-border/60 py-2.5 text-sm text-sw-dark last:border-b-0"
                    >
                      <span
                        aria-hidden="true"
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sw-blue text-[11px] font-bold text-white"
                      >
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {showCtas ? (
                  <>
                    <button
                      type="button"
                      onClick={() => void buy()}
                      disabled={busy}
                      data-testid="planner-stack-cta"
                      className="mt-6 flex min-h-[56px] w-full items-center justify-center rounded-full bg-sw-blue px-5 text-center text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-sw-blue/25 transition-colors hover:bg-sw-blue-hover disabled:opacity-60 sm:text-base"
                    >
                      Yes! Unlock all {i} planners for {oto} →
                    </button>
                    <ChargeNote />
                  </>
                ) : null}
              </div>
            </div>
            <div data-testid="planner-faq" className="mt-8">
              <h2 className="text-center text-xl font-extrabold leading-tight text-sw-dark sm:text-2xl">
                Questions before you decide
              </h2>
              <div className="mt-5 space-y-3">
                <FaqItem
                  question="Is this a subscription?"
                  answer={`No. It is a single ${oto} payment for all ${i} planners, and it does not change what you already pay for your membership.`}
                />
                <FaqItem
                  question="What exactly do I get?"
                  answer={`All ${i} planners as printable PDFs — ${pages} pages in total, across ${areas} areas. They appear in your account straight after payment and are yours to keep, so you can print any page as often as you like.`}
                />
                <FaqItem
                  question="Can I just buy the one planner I want?"
                  answer={`Yes. Every planner is available on its own for ${single} from your account at any time. The bundle only makes sense if you want more than one — two bought separately already cost more than all ${i} together.`}
                />
                <FaqItem
                  question="Do I need to print them?"
                  answer="No. Each planner works either way: print the pages you want, or fill them in on screen on a phone, tablet or computer."
                />
                <FaqItem
                  question="Is this offer time-limited?"
                  answer={`There is no countdown and nothing expires today. The ${oto} bundle price is part of setting up your account, so this page is the one place you will see it — afterwards the planners are still available individually at ${single} each.`}
                />
              </div>
            </div>
            {error ? (
              <p
                role="alert"
                data-testid="planner-purchase-error"
                className="mt-6 rounded-xl border border-sw-warning bg-sw-grey-light p-4 text-sm text-sw-dark"
              >
                {error}
              </p>
            ) : null}
            <div id="planner-decision" className="mt-8 space-y-3">
              {showCtas ? (
                <button
                  type="button"
                  onClick={() => void buy()}
                  disabled={busy}
                  data-testid="planner-accept"
                  className="w-full min-h-[56px] rounded-full bg-sw-blue px-7 py-3 text-base font-bold leading-tight text-white shadow-lg shadow-sw-blue/25 transition-all hover:bg-sw-blue-hover active:scale-95 disabled:opacity-60"
                >
                  {state === 'processing'
                    ? 'Taking payment...'
                    : `Yes! Unlock all ${i} planners for ${oto} →`}
                </button>
              ) : null}
              <button
                type="button"
                onClick={skip}
                disabled={busy}
                data-testid="planner-placeholder-decline"
                className="flex w-full min-h-[44px] items-center justify-center rounded-xl bg-transparent px-6 py-3 text-sm font-semibold text-sw-blue underline underline-offset-2 transition-colors hover:text-sw-blue-hover disabled:opacity-60"
              >
                No thanks, continue without the planners
              </button>
            </div>
            <ul
              data-testid="planner-reassurance"
              className="mt-8 space-y-2.5 rounded-xl bg-sw-grey-light p-4 sm:p-5"
            >
              <li className="flex gap-2 text-sm text-sw-grey">
                <span aria-hidden="true" className="text-sw-blue">
                  •
                </span>
                <span>
                  A single {oto} payment. This is not a subscription and it does not change what you
                  already pay.
                </span>
              </li>
              <li className="flex gap-2 text-sm text-sw-grey">
                <span aria-hidden="true" className="text-sw-blue">
                  •
                </span>
                <span>Yours to keep, and you can print each planner as often as you like.</span>
              </li>
              <li className="flex gap-2 text-sm text-sw-grey">
                <span aria-hidden="true" className="text-sw-blue">
                  •
                </span>
                <span>
                  Saying no changes nothing else. Your account carries on exactly as it is, and the
                  planners stay available individually at {single} each.
                </span>
              </li>
            </ul>
            <p className="mt-5 text-center text-xs leading-relaxed text-sw-grey">
              Your saved payment method is charged once, {oto} in total.
            </p>
          </div>
        </div>
      </div>
      {showCtas ? (
        <div
          data-testid="planner-sticky-cta"
          className="fixed bottom-0 left-0 right-0 z-40 px-4"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.92) 40%, white 65%)',
          }}
        >
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-semibold text-sw-grey">Only</span>
                <span className="text-xl font-extrabold text-sw-dark">{oto}</span>
              </div>
              <button
                type="button"
                onClick={skip}
                disabled={busy}
                data-testid="planner-sticky-skip"
                className="flex min-h-[44px] items-center text-left text-[11px] text-sw-grey underline underline-offset-2 transition-colors hover:text-sw-dark disabled:opacity-60"
              >
                No thanks →
              </button>
            </div>
            <button
              type="button"
              onClick={() => void buy()}
              disabled={busy}
              data-testid="planner-sticky-accept"
              className="whitespace-nowrap rounded-full bg-sw-blue px-7 py-4 font-bold text-white shadow-lg shadow-sw-blue/25 transition-colors hover:bg-sw-blue-hover disabled:opacity-60"
            >
              {state === 'processing' ? 'Taking payment...' : `Add all ${i} →`}
            </button>
          </div>
          <div
            style={{
              paddingTop: '56px',
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          />
        </div>
      ) : null}
    </>
  )
}

function PlannersGate() {
  const user = useCurrentUser()
  const status = useUpsellStatus(OFFER)
  const hasCard = useHasSavedCard()
  const review = armReviewMode(user?.email)

  if (user === undefined || status === undefined || hasCard === undefined) {
    return <AuthSpinner />
  }
  if (user?.onboardingComplete && !review) return <BounceDashboard />
  if (!review && (status.status === 'purchased' || status.status === 'skipped')) return <BounceWise />
  return <PlannerOffer hasSavedCard={Boolean(hasCard)} />
}

export default function UpgradePlannersPage() {
  return (
    <>
      <AuthLoading>
        <AuthSpinner />
      </AuthLoading>
      <Unauthenticated>
        <UnauthRedirect />
      </Unauthenticated>
      <Authenticated>
        <PlannersGate />
      </Authenticated>
    </>
  )
}
