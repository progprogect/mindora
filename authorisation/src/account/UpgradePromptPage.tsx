import { useEffect, useRef, useState } from 'react'
import OtoChrome from '@/account/OtoChrome'
import { Authenticated, AuthLoading, Unauthenticated } from '@/auth/authGates'
import AuthSpinner from '@/auth/AuthSpinner'
import { useCurrentUser } from '@/auth/session'
import { buyOffer, recordUpsellEvent } from '@/lib/api'
import { useHasSavedCard, useUpsellStatus } from '@/lib/lmsQueries'
import { armReviewMode, isReviewPurchaseBlocked, REVIEW_PURCHASE_BLOCKED } from '@/lib/reviewMode'
import { attributionPayload, track } from '@/lib/track'
import BrandWordmark from '@/shared/BrandWordmark'

const OFFER = 'ultimate-prompt-library-oto'
const PRICE = 9.97
const WAS = 39.95
const NEXT = '/account/upgrade-planners'

const INCLUDED = [
  'Social Media, Marketing & Sales prompts',
  'Business, Career & Finance frameworks',
  'Content creation & SEO templates',
  'Personal development & productivity',
  '11 downloadable PDF guides',
  'Searchable online library with copy button',
]

const VALUE_ROWS = [
  { icon: '🔍', name: 'Online Searchable Prompt Library', value: '$97' },
  { icon: '📚', name: 'Expert PDF Prompt Guides (7 Books)', value: '$47' },
  { icon: '🎯', name: 'Goal & Productivity Frameworks', value: '$29' },
  { icon: '✍️', name: 'Content Creation Templates', value: '$19' },
]

function UnauthRedirect() {
  useEffect(() => {
    window.location.href = '/login'
  }, [])
  return <AuthSpinner />
}

function BounceNext() {
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

function Check({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        className="w-4 h-4 text-green-500 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-sm text-sw-dark">{text}</span>
    </div>
  )
}

function OfferCard({
  purchaseState,
  errorMessage,
  hasSavedCard,
  onPurchase,
  onSkip,
}: {
  purchaseState: 'idle' | 'processing' | 'success' | 'failed'
  errorMessage: string
  hasSavedCard: boolean
  onPurchase: () => void
  onSkip: () => void
}) {
  return (
    <div
      className="rounded-2xl p-5 sm:p-6"
      style={{
        background: 'linear-gradient(180deg, #fff7ed 0%, #fef3c7 55%, #fffbeb 100%)',
      }}
    >
      <div className="flex justify-center mb-3">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-sw-grey-border shadow-sm text-xs font-bold text-sw-dark">
          <svg className="w-3.5 h-3.5 text-sw-blue" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          ONE-TIME UNLOCK
        </span>
      </div>
      <h3 className="text-xl sm:text-2xl font-extrabold text-sw-dark text-center mb-1">Instant Results</h3>
      <p className="text-sm text-sw-grey text-center mb-4">27,200+ expert prompts — copy &amp; use instantly</p>
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="text-lg text-red-400 line-through font-bold decoration-2">${WAS}</span>
        <span className="text-sm font-bold text-sw-blue">Today Only</span>
        <span className="text-4xl sm:text-5xl font-extrabold text-sw-blue">${PRICE}</span>
      </div>
      <p className="text-center text-sm font-semibold text-sw-dark mb-5">That&apos;s less than a single coffee</p>
      <button
        type="button"
        data-testid="upgrade-prompt-cta"
        onClick={onPurchase}
        disabled={purchaseState === 'processing'}
        className="w-full py-[18px] sm:py-5 rounded-full text-white font-bold text-lg sm:text-xl transition-all active:scale-[0.98] shadow-xl disabled:opacity-60 disabled:cursor-not-allowed mb-4"
        style={{
          background: 'linear-gradient(135deg, #f59f0a 0%, #f97316 50%, #ea580c 100%)',
        }}
      >
        {purchaseState === 'processing' ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          <span>YES! Give Me Instant Access →</span>
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
        <span className="text-sm text-sw-grey font-medium">
          {hasSavedCard ? 'Secure one-click upgrade' : 'Secure payment via Stripe'}
        </span>
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
              Continue →
            </button>
          </div>
        </div>
      ) : null}
      <div className="rounded-xl border border-sw-grey-border bg-white p-3 mb-3">
        <p className="text-xs text-sw-grey text-center leading-relaxed">
          By clicking above, <span className="font-bold text-sw-dark">you agree to a one-time charge of ${PRICE}</span>
          {hasSavedCard
            ? ' using your saved payment method. Access is granted instantly.'
            : ' via Stripe. Access is granted after payment.'}{' '}
          This offer reverts to ${WAS} after you leave this page.
        </p>
      </div>
      <div className="text-center">
        <button
          type="button"
          data-testid="upgrade-prompt-skip"
          onClick={onSkip}
          className="text-sm text-sw-grey underline underline-offset-2 hover:text-sw-dark transition-colors"
        >
          No thanks, skip this offer
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
        <h2 className="text-2xl font-extrabold text-sw-dark mb-2">Payment Successful!</h2>
        <p className="text-sw-dark font-semibold text-base mb-1">⚡ Prompt Library Unlocked</p>
        <p className="text-sw-grey text-sm mb-2">
          27,200+ prompts are ready in your dashboard. Copy, paste, and get instant results.
        </p>
        <div className="mt-6">
          <div className="w-6 h-6 border-2 border-sw-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-sw-grey mt-2">Taking you to your next step...</p>
        </div>
      </div>
    </div>
  )
}

export function PromptOffer({ hasSavedCard = true }: { hasSavedCard?: boolean }) {
  const [state, setState] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle')
  const [error, setError] = useState('')
  const [sticky, setSticky] = useState(false)
  const offerRef = useRef<HTMLDivElement | null>(null)
  const seenOffer = useRef(false)
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
    const node = offerRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          seenOffer.current = true
          setSticky(false)
        } else if (seenOffer.current && entry.boundingClientRect.top < 0) {
          setSticky(true)
        }
      },
      { threshold: 0 },
    )
    observer.observe(node)
    return () => observer.disconnect()
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
      const attribution = attributionPayload()
      const result = await buyOffer({
        offerSlug: OFFER,
        attribution: Object.keys(attribution).length > 0 ? attribution : undefined,
      })
      if (result.checkoutUrl) return
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
      setError(result.error || 'Payment failed. Continue without the library for now — you can add it later.')
      track('upsell_purchase_failed', { offer: OFFER, error: result.error, fallback_shown: false })
    } catch (err) {
      setState('failed')
      setError('Something went wrong. Continue without the library for now — you can add it later.')
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
          <span
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
            style={{ background: 'linear-gradient(135deg, rgb(245, 159, 10) 0%, rgb(249, 116, 21) 100%)' }}
          >
            ⚡
          </span>
          <h1 className="text-[2.5rem] sm:text-5xl font-extrabold text-sw-dark leading-[1.1] mb-3">
            Instant Results
          </h1>
          <p className="text-base sm:text-lg text-sw-dark leading-relaxed max-w-md mx-auto">
            Unlock the Ultimate Prompt Library for{' '}
            <span className="font-extrabold text-sw-blue">${PRICE}</span> one-time — that&apos;s less than a
            single coffee.
          </p>
        </section>
        <div ref={offerRef} className="mt-6">
          <OfferCard
            purchaseState={state}
            errorMessage={error}
            hasSavedCard={hasSavedCard}
            onPurchase={() => void buy()}
            onSkip={skip}
          />
        </div>
        <section className="mt-8 mb-6 rounded-2xl border border-sw-grey-border bg-white p-5">
          <h2 className="font-bold text-sw-dark text-sm mb-3">What&apos;s included</h2>
          <div className="space-y-2.5">
            {INCLUDED.map((item) => (
              <Check key={item} text={item} />
            ))}
          </div>
        </section>
        <section className="mb-8 rounded-2xl border border-sw-grey-border bg-white p-5">
          <h2 className="font-bold text-sw-dark text-sm mb-3 text-center">Total Value: $192</h2>
          <div className="space-y-2">
            {VALUE_ROWS.map((row) => (
              <div key={row.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-sw-dark">
                  <span>{row.icon}</span>
                  {row.name}
                </span>
                <span className="text-xs text-sw-grey">{row.value}</span>
              </div>
            ))}
          </div>
        </section>
        <div>
          <OfferCard
            purchaseState={state}
            errorMessage={error}
            hasSavedCard={hasSavedCard}
            onPurchase={() => void buy()}
            onSkip={skip}
          />
        </div>
      </main>
      {sticky ? (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-sw-grey-border shadow-lg">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-semibold text-sw-grey">Only</span>
                <span className="font-extrabold text-xl text-sw-dark">${PRICE}</span>
              </div>
              <button
                type="button"
                onClick={skip}
                className="text-[11px] text-sw-grey underline underline-offset-2 hover:text-sw-dark transition-colors text-left"
              >
                Skip offer →
              </button>
            </div>
            <button
              type="button"
              onClick={() => void buy()}
              disabled={state === 'processing'}
              className="px-7 py-3 bg-sw-blue hover:bg-sw-blue-hover text-white text-base font-bold rounded-full transition-all active:scale-95 disabled:opacity-60 whitespace-nowrap"
            >
              {state === 'processing' ? 'Processing...' : 'YES! Instant Access →'}
            </button>
          </div>
          <div style={{ paddingBottom: 'env(safe-area-inset-bottom)', backgroundColor: 'white' }} />
        </div>
      ) : null}
      <footer className="text-center py-6 border-t border-sw-grey-border">
        <BrandWordmark size="sm" className="font-bold" />
      </footer>
    </div>
  )
}

function PromptGate() {
  const status = useUpsellStatus(OFFER)
  const hasCard = useHasSavedCard()
  const user = useCurrentUser()
  const review = armReviewMode(user?.email)

  if (status === undefined || hasCard === undefined || user === undefined) {
    return <AuthSpinner />
  }
  if (user?.onboardingComplete && !review) return <BounceDashboard />
  if (review) return <PromptOffer hasSavedCard={Boolean(hasCard)} />
  if (status.status === 'purchased' || status.status === 'skipped') return <BounceNext />
  return <PromptOffer hasSavedCard={Boolean(hasCard)} />
}

export default function UpgradePromptPage() {
  return (
    <>
      <AuthLoading>
        <AuthSpinner />
      </AuthLoading>
      <Unauthenticated>
        <UnauthRedirect />
      </Unauthenticated>
      <Authenticated>
        <PromptGate />
      </Authenticated>
    </>
  )
}
