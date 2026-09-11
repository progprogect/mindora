import { useEffect, useRef, useState } from 'react'
import OtoChrome from '@/account/OtoChrome'
import { Authenticated, AuthLoading, Unauthenticated } from '@/auth/authGates'
import AuthSpinner from '@/auth/AuthSpinner'
import { useCurrentUser } from '@/auth/session'
import { recordUpsellEvent, switchToAnnual } from '@/lib/api'
import { useHasSavedCard, useSubscription, useUpsellStatus } from '@/lib/lmsQueries'
import { armReviewMode, isReviewPurchaseBlocked, REVIEW_PURCHASE_BLOCKED } from '@/lib/reviewMode'
import { track } from '@/lib/track'
import BrandWordmark from '@/shared/BrandWordmark'

const OFFER = 'annual-upgrade'
const PRICE = 59.99
const WAS = 89.99
const NEXT = '/account/upgrade-wise'
const MONEY_BACK_DAYS = 14

function UnauthRedirect() {
  useEffect(() => {
    window.location.href = '/account/onboard'
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

function Benefit({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <svg
        className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-sm font-medium text-sw-dark">{text}</span>
    </div>
  )
}

function OfferCard({
  purchaseState,
  errorMessage,
  onPurchase,
  onSkip,
}: {
  purchaseState: 'idle' | 'processing' | 'success' | 'failed'
  errorMessage: string
  onPurchase: () => void
  onSkip: () => void
}) {
  return (
    <div
      className="rounded-2xl p-5 sm:p-6"
      style={{
        background: 'linear-gradient(180deg, #f0f4ff 0%, #e8ecf7 60%, #f5f3ff 100%)',
      }}
    >
      <div className="flex justify-center mb-3">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-sw-grey-border shadow-sm text-xs font-bold text-sw-dark">
          SETUP ONLY
        </span>
      </div>
      <h3 className="text-xl sm:text-2xl font-extrabold text-sw-dark text-center mb-3">Switch to annual</h3>
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="text-lg text-red-400 line-through font-bold decoration-2">${WAS}</span>
        <span className="text-sm font-bold text-sw-blue">Today Only</span>
        <span className="text-4xl sm:text-5xl font-extrabold text-sw-blue">${PRICE}</span>
      </div>
      <p className="text-center text-sm font-semibold text-sw-dark mb-5">per year · about $5.00/month</p>
      <button
        type="button"
        data-testid="upgrade-annual-cta"
        onClick={onPurchase}
        disabled={purchaseState === 'processing'}
        className="w-full py-[18px] sm:py-5 rounded-full text-white font-bold text-lg sm:text-xl transition-all active:scale-[0.98] shadow-xl disabled:opacity-60 disabled:cursor-not-allowed mb-4"
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
        }}
      >
        {purchaseState === 'processing' ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          <span>YES — UPGRADE ME →</span>
        )}
      </button>
      <div className="flex items-center justify-center gap-1.5 mb-3">
        <svg className="w-4 h-4 text-sw-grey" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        <span className="text-sm text-sw-grey font-medium">Uses your saved card · trial stays in place</span>
      </div>
      {purchaseState === 'failed' && errorMessage ? (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-3">
          <p className="text-sm text-red-700 text-center font-medium">{errorMessage}</p>
          <div className="flex gap-3 mt-3">
            <button
              type="button"
              onClick={onPurchase}
              className="flex-1 py-2.5 text-sm font-semibold text-sw-blue border border-sw-blue rounded-full hover:bg-sw-blue-light transition-colors"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="flex-1 py-2.5 text-sm font-semibold text-white bg-sw-dark rounded-full hover:opacity-90 transition-opacity"
            >
              Keep monthly →
            </button>
          </div>
        </div>
      ) : null}
      <div className="rounded-xl border border-sw-grey-border bg-white p-3 mb-3">
        <p className="text-xs text-sw-grey text-center leading-relaxed">
          By clicking above, you switch your membership to{' '}
          <span className="font-bold text-sw-dark">${PRICE}/year</span>. Your trial is not cancelled and you
          are not billed the difference today. After the trial, you pay ${PRICE}/year instead of monthly.{' '}
          {MONEY_BACK_DAYS}-day money-back guarantee.
        </p>
      </div>
      <div className="text-center">
        <button
          type="button"
          data-testid="upgrade-annual-skip"
          onClick={onSkip}
          className="text-sm text-sw-grey underline underline-offset-2 hover:text-sw-dark transition-colors"
        >
          No thanks, keep my monthly plan
        </button>
      </div>
    </div>
  )
}

function SuccessScreen() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-extrabold text-sw-dark mb-2">You&apos;re on annual</h2>
        <p className="text-sw-dark font-semibold text-base mb-1">${PRICE}/year locked in</p>
        <p className="text-sw-grey text-sm mb-2">
          Your trial continues. After it ends you&apos;ll pay ${PRICE}/year instead of the monthly plan.
        </p>
        <div className="mt-6">
          <div className="w-6 h-6 border-2 border-sw-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-sw-grey mt-2">Taking you to your next step...</p>
        </div>
      </div>
    </div>
  )
}

export function AnnualOffer() {
  const [state, setState] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle')
  const [error, setError] = useState('')
  const skipped = useRef(false)
  const viewed = useRef(false)

  useEffect(() => {
    if (viewed.current) return
    viewed.current = true
    void recordUpsellEvent({ offerSlug: OFFER, action: 'viewed' })
    track('upsell_viewed', { offer: OFFER, price: PRICE })
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
    }, 3000)
    return () => clearTimeout(timer)
  }, [state])

  const buy = async () => {
    if (state === 'processing' || state === 'success') return
    if (isReviewPurchaseBlocked()) {
      setError(REVIEW_PURCHASE_BLOCKED)
      return
    }
    setState('processing')
    setError('')
    void recordUpsellEvent({ offerSlug: OFFER, action: 'attempted' })
    track('upsell_attempted', { offer: OFFER, price: PRICE })
    try {
      const result = await switchToAnnual()
      if (result.success) {
        setState('success')
        track('upsell_purchased', {
          offer: OFFER,
          price: PRICE,
          alreadyPurchased: result.alreadyPurchased,
        })
        return
      }
      setState('failed')
      setError(result.error || 'Could not switch to annual. Keep your monthly plan for now.')
      track('upsell_purchase_failed', { offer: OFFER, error: result.error, fallback_shown: false })
    } catch (err) {
      setState('failed')
      setError('Something went wrong. Keep your monthly plan for now.')
      track('upsell_purchase_error', { offer: OFFER, error: String(err), fallback_shown: false })
    }
  }

  const skip = () => {
    if (skipped.current) return
    skipped.current = true
    void recordUpsellEvent({ offerSlug: OFFER, action: 'skipped' })
    track('upsell_skipped', { offer: OFFER })
    window.onbeforeunload = null
    window.location.href = NEXT
  }

  if (state === 'success') return <SuccessScreen />

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <OtoChrome activeStep="Upgrades" />
      <main className="max-w-2xl mx-auto px-4 pb-32">
        <section className="text-center pt-6 pb-2">
          <h1 className="text-[2.5rem] sm:text-5xl font-extrabold text-sw-dark leading-[1.1] mb-3">
            Lock in a year.{' '}
            <span className="text-sw-blue">Pay less.</span>
          </h1>
          <p className="text-base sm:text-lg text-sw-dark leading-relaxed max-w-md mx-auto">
            Switch from monthly to annual for <span className="font-extrabold text-sw-blue">${PRICE}</span> a
            year — setup pricing, not the ${WAS} catalog rate.
          </p>
        </section>
        <div className="mt-6">
          <OfferCard
            purchaseState={state}
            errorMessage={error}
            onPurchase={() => void buy()}
            onSkip={skip}
          />
        </div>
        <section className="mt-8 mb-8 rounded-2xl border border-sw-grey-border bg-white p-5 space-y-3">
          <Benefit text="Keep your trial — we do not charge the yearly amount today" />
          <Benefit text={`After the trial: $${PRICE}/year instead of monthly`} />
          <Benefit text={`${MONEY_BACK_DAYS}-day money-back guarantee`} />
          <Benefit text="Cancel anytime before renewal from Profile" />
        </section>
        <div>
          <OfferCard
            purchaseState={state}
            errorMessage={error}
            onPurchase={() => void buy()}
            onSkip={skip}
          />
        </div>
      </main>
      <footer className="text-center py-6 border-t border-sw-grey-border">
        <BrandWordmark size="sm" className="font-bold" />
      </footer>
    </div>
  )
}

function AnnualGate() {
  const status = useUpsellStatus(OFFER)
  const hasCard = useHasSavedCard()
  const { sub } = useSubscription()
  const user = useCurrentUser()
  const review = armReviewMode(user?.email)

  if (status === undefined || hasCard === undefined || user === undefined || sub === undefined) {
    return <AuthSpinner />
  }
  if (user?.onboardingComplete && !review) return <BounceDashboard />
  if (review) return <AnnualOffer />
  if (!hasCard) return <BounceWise />
  if (status.status === 'purchased' || status.status === 'skipped') return <BounceWise />
  if (sub?.isYearly) return <BounceWise />
  return <AnnualOffer />
}

export default function UpgradeAnnualPage() {
  return (
    <>
      <AuthLoading>
        <AuthSpinner />
      </AuthLoading>
      <Unauthenticated>
        <UnauthRedirect />
      </Unauthenticated>
      <Authenticated>
        <AnnualGate />
      </Authenticated>
    </>
  )
}
