import { useEffect, useRef, useState, type ReactNode } from 'react'
import InlineTrialCheckout from '@/shared/components/InlineTrialCheckout'
import { DEFAULT_PLANS, type PlanView } from '@/funnels/twenty-eight-day/data/plans'
import { getCheckoutSessionKey } from '@/shared/lib/checkoutSession'
import { trackEvent } from '@/shared/lib/tracking'
import { useProductsList, useSetCheckoutOfferPercentAction, useTrackCheckoutInitiated } from '@/shared/lib/backend'

export interface PathItem {
  emoji: string
  kicker: string
  label: string
}

export interface TrialPlanCopy {
  funnel: string
  headline: (name: string | null) => ReactNode
  insight: string
  metaLeft: { kicker: string; value: string }
  metaRight: { kicker: string; value: string }
  pathTitle: string
  pathSubtitle?: string
  pathItems: PathItem[]
  pathCta: string
  tickerLabel?: string
  tickerHandles?: string[]
  highlights: string[]
  impactTitle: string
  impactItems: Array<{ emoji: string; text: string }>
  includedTitle: string
  included: string[]
  testimonialsTitle?: string
  testimonials?: Array<{ quote: string; name: string; role: string }>
}

interface TrialPlanScreenProps {
  copy: TrialPlanCopy
  email: string | null
  name: string | null
  percentOff: number
  onPercentOffResolved: (percentOff: number) => void
  onCheckoutSuccess: () => void
  onExpiredPlanContinue: (productId: string) => void
}

const COUNTDOWN_SECONDS = 10 * 60
const LIVE_MINUTES = ['1 min ago', '2 min ago', '3 min ago', '4 min ago', '5 min ago', '6 min ago', '7 min ago', '8 min ago', '9 min ago', '10 min ago', '11 min ago', '12 min ago']

function pad2(value: number): string {
  return String(value).padStart(2, '0')
}

function countdownStartSeconds(): number {
  if (typeof window === 'undefined') return COUNTDOWN_SECONDS
  return new URLSearchParams(window.location.search).get('offer') === 'ended' ? 0 : COUNTDOWN_SECONDS
}

function resolveDisplayPlans(products: Array<PlanView> | undefined): PlanView[] {
  const source = products && products.length >= 3 ? products : DEFAULT_PLANS
  return [...source].sort((a, b) => a.price - b.price)
}

function CheckDot() {
  return (
    <div
      className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: 'hsl(var(--sw-success))' }}
    >
      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
      </svg>
    </div>
  )
}

function ExpiredPlanPicker({
  plans,
  selectedPlanId,
  onSelect,
  onStart,
}: {
  plans: PlanView[]
  selectedPlanId: string | undefined
  onSelect: (id: string) => void
  onStart: () => void
}) {
  return (
    <div className="mx-auto max-w-lg px-4 pb-6">
      <h2 className="mb-4 text-center text-xl font-extrabold text-sw-dark">Choose your plan</h2>
      <div className="mb-4 flex flex-col gap-2">
        {plans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => onSelect(plan.id)}
            className={`rounded-2xl border-2 px-4 py-3 text-left ${
              selectedPlanId === plan.id ? 'border-sw-blue bg-sw-blue-light' : 'border-sw-grey-border'
            }`}
          >
            <p className="font-bold text-sw-dark">{plan.name}</p>
          </button>
        ))}
      </div>
      <button type="button" onClick={onStart} className="sw-cta">
        GET STARTED →
      </button>
    </div>
  )
}

export default function TrialPlanScreen({
  copy,
  email,
  name,
  percentOff,
  onPercentOffResolved,
  onCheckoutSuccess,
  onExpiredPlanContinue,
}: TrialPlanScreenProps) {
  const products = useProductsList()
  const convexPlans: PlanView[] | undefined = products?.length
    ? products.map((p) => ({
        id: p._id,
        name: p.name,
        price: p.price,
        intervalMonths: p.intervalMonths,
        badge: p.badge,
      }))
    : undefined
  const plans = resolveDisplayPlans(convexPlans)
  const trialPlan = plans.find((p) => p.intervalMonths === 1) ?? plans[0]
  const [secondsLeft, setSecondsLeft] = useState(countdownStartSeconds)
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>()
  const checkoutRef = useRef<HTMLDivElement>(null)
  const trackCheckoutInitiated = useTrackCheckoutInitiated()
  const setCheckoutOfferPercent = useSetCheckoutOfferPercentAction()
  const offerPercent = percentOff >= 97 ? percentOff : 97

  useEffect(() => {
    if (!plans.length) return
    const stillValid = selectedPlanId && plans.some((p) => p.id === selectedPlanId)
    if (stillValid) return
    const popular = plans.find((p) => p.badge === 'MOST POPULAR')
    setSelectedPlanId((popular ?? plans[1] ?? plans[0])?.id)
  }, [plans, selectedPlanId])

  useEffect(() => {
    const sessionKey = getCheckoutSessionKey()
    setCheckoutOfferPercent(sessionKey, percentOff).then((res) => onPercentOffResolved(res.percentOff))
    trackEvent('PlanViewed', { funnel: copy.funnel })
    trackEvent('PricingViewed', { funnel: copy.funnel })
    if (email) {
      void trackCheckoutInitiated({ email, funnel: copy.funnel })
      trackEvent('CheckoutStarted', { funnel: copy.funnel, planId: trialPlan?.id })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (secondsLeft <= 0) return
    const interval = window.setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000)
    return () => window.clearInterval(interval)
  }, [secondsLeft])

  const expired = secondsLeft <= 0
  const minutes = pad2(Math.floor(secondsLeft / 60))
  const seconds = pad2(secondsLeft % 60)
  const selectedPlan = plans.find((p) => p.id === selectedPlanId) ?? plans[0]
  const handles = copy.tickerHandles ?? []

  const scrollToCheckout = () => {
    document.getElementById('checkout-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    checkoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="bg-white">
      <header className="sticky top-0 z-50 border-b border-sw-grey-border bg-white">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between gap-3 px-4">
          <div className="flex flex-col items-start">
            <span className="mb-0.5 text-[10px] leading-none font-semibold tracking-wide text-sw-grey uppercase">
              {expired ? 'Offer ended' : 'Offer expires'}
            </span>
            <span className={`text-xl font-extrabold tabular-nums ${expired ? 'text-sw-grey' : 'text-sw-dark'}`}>
              {minutes}:{seconds}
            </span>
          </div>
          <span className="text-center text-base leading-tight font-extrabold text-sw-dark">
            {expired ? (
              '🔄 Refresh for a new deal'
            ) : (
              <>
                Start for Just <span className="text-sw-blue">$1</span>
              </>
            )}
          </span>
          {expired ? (
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full px-3 py-2 text-xs font-bold whitespace-nowrap text-white"
              style={{ backgroundColor: 'hsl(var(--sw-success))' }}
            >
              REFRESH →
            </button>
          ) : (
            <button
              type="button"
              onClick={scrollToCheckout}
              className="rounded-full bg-sw-blue px-3 py-2 text-xs font-bold whitespace-nowrap text-white hover:bg-sw-blue-hover"
            >
              GET MY PLAN →
            </button>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-lg animate-fade-up px-4 pt-8 pb-6 text-center">
        {!expired ? (
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-bold text-orange-600">
            🎁 Special Discount:{' '}
            <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs font-extrabold text-white">
              {offerPercent}% OFF
            </span>
          </div>
        ) : null}

        <h1 className="mb-3 text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">{copy.headline(name)}</h1>
        <p className="mx-auto mb-5 max-w-sm text-sm leading-relaxed text-sw-grey">{copy.insight}</p>

        <div className="mb-2 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-sw-grey-light px-4 py-3 text-left">
            <p className="mb-1 text-xs font-semibold tracking-wide text-sw-grey uppercase">{copy.metaLeft.kicker}</p>
            <p className="text-sm leading-snug font-bold text-sw-dark">{copy.metaLeft.value}</p>
          </div>
          <div className="rounded-2xl bg-sw-grey-light px-4 py-3 text-left">
            <p className="mb-1 text-xs font-semibold tracking-wide text-sw-grey uppercase">{copy.metaRight.kicker}</p>
            <p className="text-sm leading-snug font-bold text-sw-dark">{copy.metaRight.value}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg animate-fade-up px-4 pb-6">
        <h3 className="mb-3 text-center text-base font-extrabold text-sw-dark">{copy.pathTitle}</h3>
        {copy.pathSubtitle ? (
          <p className="mb-3 text-center text-sm text-sw-grey">{copy.pathSubtitle}</p>
        ) : null}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {copy.pathItems.map((item) => (
            <div
              key={item.kicker}
              className="flex flex-col items-center overflow-hidden rounded-2xl border border-sw-grey-border bg-white shadow-sm"
            >
              <div className="flex w-full items-center justify-center bg-sw-blue py-1.5">
                <span className="text-[11px] font-extrabold tracking-wide text-white">{item.kicker}</span>
              </div>
              <div className="flex flex-col items-center gap-1 px-2 pt-3 pb-3">
                <span className="text-xl" aria-hidden>
                  {item.emoji}
                </span>
                <span className="text-center text-[11px] leading-tight font-semibold text-sw-dark">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pb-6">
        <button
          type="button"
          onClick={scrollToCheckout}
          className="animate-pulse-cta w-full rounded-full bg-sw-blue py-4 text-lg font-extrabold tracking-wide text-white uppercase shadow-lg hover:bg-sw-blue-hover"
        >
          {copy.pathCta}
        </button>
      </div>

      {copy.tickerLabel && handles.length > 0 ? (
        <div className="overflow-hidden pb-8">
          <p className="mb-3 px-4 text-center text-base font-bold text-sw-dark">{copy.tickerLabel}</p>
          <div className="overflow-hidden">
            <div className="marquee-track gap-3 px-2">
              {[...handles, ...handles].map((handle, i) => (
                <div
                  key={`${handle}-${i}`}
                  className="flex flex-shrink-0 items-center gap-2 rounded-full bg-sw-grey-light px-4 py-2 text-xs font-semibold whitespace-nowrap text-sw-dark"
                >
                  <span className="h-2 w-2 flex-shrink-0 rounded-full bg-sw-success" />
                  {handle} just enrolled · {LIVE_MINUTES[i % LIVE_MINUTES.length]}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div id="checkout-anchor" ref={checkoutRef} style={{ scrollMarginTop: 72 }}>
        {!expired && email && trialPlan ? (
          <InlineTrialCheckout
            email={email}
            name={name}
            productId={trialPlan.id}
            funnel={copy.funnel}
            percentOff={offerPercent}
            highlights={copy.highlights}
            onSuccess={onCheckoutSuccess}
          />
        ) : expired ? (
          <ExpiredPlanPicker
            plans={plans}
            selectedPlanId={selectedPlan?.id}
            onSelect={setSelectedPlanId}
            onStart={() => {
              if (!selectedPlan) return
              onExpiredPlanContinue(selectedPlan.id)
            }}
          />
        ) : (
          <div className="mx-auto max-w-lg px-4 pb-6">
            <p className="text-center text-xs text-sw-grey">Please enter your email earlier in the quiz to unlock checkout.</p>
          </div>
        )}
      </div>

      {copy.impactItems.length > 0 ? (
        <div className="mx-auto max-w-lg px-4 pb-8 pt-6">
          <h3 className="mb-4 text-base font-extrabold text-sw-dark">{copy.impactTitle}</h3>
          <div className="flex flex-col gap-3">
            {copy.impactItems.map((item) => (
              <div key={item.text} className="flex items-start gap-3 rounded-2xl bg-sw-grey-light px-4 py-3">
                <span className="text-xl" aria-hidden>
                  {item.emoji}
                </span>
                <p className="text-sm leading-snug text-sw-dark">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mx-auto max-w-lg px-4 pb-8">
        <div className="rounded-2xl bg-sw-grey-light p-5">
          <h3 className="mb-4 text-base font-extrabold text-sw-dark">{copy.includedTitle}</h3>
          <div className="flex flex-col gap-3">
            {copy.included.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckDot />
                <span className="text-sm leading-snug text-sw-dark">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {copy.testimonials && copy.testimonials.length > 0 ? (
        <div className="pb-8">
          <h3 className="mb-4 px-4 text-center text-lg font-extrabold text-sw-dark">{copy.testimonialsTitle}</h3>
          <div className="scrollbar-none flex gap-3 overflow-x-auto px-4 pb-2">
            {copy.testimonials.map((t) => (
              <div key={t.name} className="w-72 flex-shrink-0 rounded-2xl bg-sw-grey-light p-5">
                <p className="mb-4 text-sm leading-relaxed text-sw-dark">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-sm font-bold text-sw-dark">{t.name}</p>
                <p className="text-xs text-sw-grey">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mx-auto max-w-lg px-4 pb-8">
        <div
          className="flex items-center gap-4 rounded-2xl border-2 px-5 py-4"
          style={{ borderColor: 'hsl(var(--sw-success))', backgroundColor: 'hsl(142 71% 45% / 0.06)' }}
        >
          <div className="flex-shrink-0 text-3xl" aria-hidden>
            🛡️
          </div>
          <div>
            <p className="text-sm font-extrabold text-sw-dark">30-Day Money-Back Guarantee</p>
            <p className="mt-0.5 text-xs leading-snug text-sw-grey">Not right for you? Full refund, no questions asked.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
