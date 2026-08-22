import { useEffect, useRef, useState } from 'react'
import { Check, ShieldCheck } from 'lucide-react'
import type { ClaudeProfile, ClaudeQuizAnswers } from '@/funnels/claude/types/claudeQuiz'
import { DEFAULT_PLANS, formatUsd, planMeta, type PlanView } from '@/funnels/claude/data/plans'
import { getCheckoutSessionKey } from '@/shared/lib/checkoutSession'
import { trackEvent } from '@/shared/lib/tracking'
import { useCheckoutOfferAction, useProductsList, useTrackCheckoutInitiated } from '@/shared/lib/backend'
import AssetImage from '@/shared/components/AssetImage'
import InlineTrialCheckout from '@/shared/components/InlineTrialCheckout'
import { CLAUDE_CHECKOUT_HIGHLIGHTS } from '@/shared/lib/checkoutHighlights'

interface ClaudeSalesPlanScreenProps {
  name: string
  email: string
  profile: ClaudeProfile
  answers: ClaudeQuizAnswers
  percentOff: number
  onPercentOffResolved: (percentOff: number) => void
  onCheckoutSuccess: () => void
  /** Expired-offer GET STARTED — prod navigates to `/checkout?product=`. */
  onExpiredPlanContinue: (productId: string) => void
}

const FUNNEL = 'claude-ai-certification'
const COUNTDOWN_SECONDS = 10 * 60

function countdownStartSeconds(): number {
  if (typeof window === 'undefined') return COUNTDOWN_SECONDS
  return new URLSearchParams(window.location.search).get('offer') === 'ended' ? 0 : COUNTDOWN_SECONDS
}

const GOAL_LABEL_BY_ANSWER: Record<string, string> = {
  work: 'Work tasks',
  personal: 'Personal use',
  growth: 'Growth — learning in-demand skills',
}

const IMPACT_BLOCKS: Array<{ emoji: string; bold: string; rest: string }> = [
  { emoji: '💰', bold: 'Earn more', rest: 'by making Claude fluency your competitive edge at work' },
  { emoji: '💎', bold: 'Impress in every meeting', rest: 'by delivering AI-backed insights and results' },
  { emoji: '🏆', bold: 'Get a Claude Mastery Certificate', rest: 'that stands out on your LinkedIn & CV' },
  { emoji: '⏱️', bold: 'Save 2+ hours a day', rest: 'by letting Claude handle writing, research, and analysis' },
]

const INCLUDED_ITEMS: string[] = [
  '7-day structured Claude AI mastery course (15 min/day)',
  'Personalised learning path based on your goals',
  '50+ bite-sized lessons & real-world exercises',
  'Official Claude AI Certificate of Mastery',
  'Practical prompts & templates you can use immediately',
  'Cancel anytime — no lock-in',
]

interface Testimonial {
  quote: string
  name: string
  role: string
  stars: number
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'I had no AI experience before this. Within a week I was using Claude to write proposals, research markets, and automate half my admin work.',
    name: 'Sarah M.',
    role: 'Freelancer',
    stars: 5,
  },
  {
    quote:
      "The step-by-step approach made it click. I went from 'interested in AI' to getting a promotion because of my Claude skills.",
    name: 'James L.',
    role: 'Marketing Lead',
    stars: 5,
  },
  {
    quote: 'Finally a course that teaches practical skills, not just theory. The certification looks great on my LinkedIn too.',
    name: 'Priya K.',
    role: 'Business Analyst',
    stars: 5,
  },
]

const ENROLLED_NAMES = [
  'sarah.m***',
  'james.k***',
  'priya.r***',
  'tom.b***',
  'anna.w***',
  'david.l***',
  'emily.c***',
  'marcus.t***',
  'claire.n***',
  'ryan.h***',
  'zoe.p***',
  'ben.s***',
]
const ENROLLED_TIMES = Array.from({ length: 12 }, (_, i) => `${i + 1} min ago`)

function useCountdown(initialSeconds: number): { minutes: string; seconds: string; expired: boolean } {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)

  useEffect(() => {
    if (secondsLeft <= 0) return
    const interval = window.setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000)
    return () => window.clearInterval(interval)
  }, [secondsLeft])

  return {
    minutes: String(Math.floor(secondsLeft / 60)).padStart(2, '0'),
    seconds: String(secondsLeft % 60).padStart(2, '0'),
    expired: secondsLeft === 0,
  }
}

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-sm text-sw-amber">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  )
}

function resolveDisplayPlans(products: Array<PlanView> | undefined): PlanView[] {
  const source = products && products.length >= 3 ? products : DEFAULT_PLANS
  return [...source].sort((a, b) => a.price - b.price)
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
  const selected = plans.find((p) => p.id === selectedPlanId) ?? plans[0]
  const meta = selected ? planMeta(selected) : null
  const periodPrice = selected ? selected.price : 0
  const monthly = selected && meta ? periodPrice / meta.months : 0

  return (
    <div className="mx-auto max-w-lg px-4 pb-6">
      <h2 className="mb-1 text-center text-xl font-extrabold text-sw-dark">Choose your plan</h2>
      <div className="mb-4 flex flex-col items-center gap-3">
        <p className="text-center text-sm text-sw-grey">Select a plan to start your journey</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-sw-blue transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'hsl(var(--sw-blue-light))' }}
        >
          🔄 Refresh page to unlock a new discount
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-3">
        {plans.map((plan) => {
          const display = planMeta(plan)
          const isSelected = plan.id === selected?.id
          const perMonth = plan.price / display.months

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => onSelect(plan.id)}
              className={`relative cursor-pointer overflow-hidden rounded-2xl border-2 text-left transition-all duration-150 ${
                isSelected ? 'shadow-md' : 'border-sw-grey-border bg-sw-white hover:border-sw-grey'
              }`}
              style={
                isSelected
                  ? { borderColor: 'hsl(var(--sw-blue))', backgroundColor: 'hsl(var(--sw-blue-light))' }
                  : { backgroundColor: 'white' }
              }
            >
              {display.badge ? (
                <div
                  className="py-1 text-center text-[11px] font-bold tracking-wider text-sw-white uppercase"
                  style={{
                    backgroundColor:
                      display.badge === 'BEST VALUE' ? 'hsl(var(--sw-success))' : 'hsl(var(--sw-blue))',
                  }}
                >
                  {display.badge}
                </div>
              ) : null}
              <div className="flex items-center justify-between px-5 py-5 sm:px-6">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex size-5 shrink-0 items-center justify-center rounded-full border-2"
                    style={{
                      borderColor: isSelected ? 'hsl(var(--sw-blue))' : 'hsl(var(--sw-grey-border))',
                    }}
                  >
                    {isSelected ? (
                      <span className="size-2.5 rounded-full" style={{ backgroundColor: 'hsl(var(--sw-blue))' }} />
                    ) : null}
                  </span>
                  <span className="text-lg font-extrabold text-sw-dark">{display.label}</span>
                </div>
                <div className="rounded-xl bg-sw-grey-light px-3 py-1.5">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-sm font-medium text-sw-grey">$</span>
                    <span className="text-2xl font-extrabold text-sw-dark">{(perMonth / 100).toFixed(2)}</span>
                    <span className="text-sm font-medium text-sw-grey"> /mo</span>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {selected && meta ? (
        <p className="mb-5 text-center text-sm leading-relaxed text-sw-grey">
          {formatUsd(periodPrice)} {meta.periodLabel}
          {meta.months > 1 ? ` (${(monthly / 100).toFixed(2)}/month)` : null}. Cancel any time.
        </p>
      ) : null}

      <button
        type="button"
        onClick={onStart}
        disabled={!selected}
        className="mb-4 w-full cursor-pointer rounded-full bg-sw-blue py-4 text-lg font-extrabold tracking-wide text-sw-white uppercase shadow-lg transition-all hover:bg-sw-blue-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        GET STARTED
      </button>

      <div className="mb-2 flex flex-col items-center gap-2">
        <p className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'hsl(var(--sw-success))' }}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
          Pay safe &amp; secure
        </p>
        <img
          src="/assets/pay-safe-strip.png"
          alt="Mastercard, Visa, Amex, Discover accepted"
          className="h-8 w-auto object-contain"
        />
      </div>
    </div>
  )
}

/**
 * Port of `ClaudeSalesPlanScreen` (`ClaudeSalesPlanScreen-OPQZqTdA.js`) —
 * hero, certificate, marquee, $1 trial checkout while the 10-minute offer
 * is live, and the Monthly / 6-Month / 12-Month picker once it expires.
 */
export default function ClaudeSalesPlanScreen({
  name,
  email,
  profile,
  answers,
  percentOff,
  onPercentOffResolved,
  onCheckoutSuccess,
  onExpiredPlanContinue,
}: ClaudeSalesPlanScreenProps) {
  const { minutes, seconds, expired } = useCountdown(countdownStartSeconds())
  const checkoutAnchorRef = useRef<HTMLDivElement>(null)

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
  const offerPercent = percentOff >= 97 ? percentOff : 97

  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>()

  const trackCheckoutInitiated = useTrackCheckoutInitiated()
  const getCheckoutOffer = useCheckoutOfferAction()

  useEffect(() => {
    if (!plans.length || selectedPlanId) return
    const popular = plans.find((p) => p.badge === 'MOST POPULAR')
    setSelectedPlanId((popular ?? plans[1] ?? plans[0])?.id)
  }, [plans, selectedPlanId])

  useEffect(() => {
    // Read-only: the Spin Wheel screen is the only place that *writes* the
    // discount (via `setCheckoutOfferPercent`) once it lands on its guaranteed
    // prize. Mounting here must never overwrite that with the initial 50%
    // default, otherwise a refresh on this step would silently downgrade the
    // discount the user already won.
    const sessionKey = getCheckoutSessionKey()
    getCheckoutOffer(sessionKey).then((res) => onPercentOffResolved(res.percentOff))
    trackEvent('PricingViewed', { funnel: FUNNEL })
    if (email) {
      void trackCheckoutInitiated({ email, funnel: FUNNEL })
      trackEvent('CheckoutStarted', { funnel: FUNNEL, planId: trialPlan?.id })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) ?? plans[0]

  const goalLabel = answers['q1-purpose'] ? GOAL_LABEL_BY_ANSWER[answers['q1-purpose']] : undefined
  const levelLabel = answers['q5-skill']

  const scrollToCheckout = () => {
    document.getElementById('checkout-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    checkoutAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="bg-sw-white" style={{ overflowX: 'clip' }}>
      {/* Sticky offer header */}
      <div className="sticky top-0 z-50 border-b border-sw-grey-border bg-sw-white">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between gap-3 px-4">
          <div className="flex flex-col items-start">
            <span className="mb-0.5 text-[10px] leading-none font-semibold tracking-wide text-sw-grey uppercase">
              {expired ? 'Offer ended' : 'Offer expires'}
            </span>
            <span className={`text-xl font-extrabold tabular-nums ${expired ? 'text-sw-grey' : 'text-sw-dark'}`}>
              {expired ? '00:00' : `${minutes}:${seconds}`}
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
              className="rounded-full bg-sw-success px-3 py-2 text-xs font-bold whitespace-nowrap text-sw-white transition-all active:scale-[0.97]"
            >
              REFRESH →
            </button>
          ) : (
            <button
              type="button"
              onClick={scrollToCheckout}
              className="rounded-full bg-sw-blue px-3 py-2 text-xs font-bold whitespace-nowrap text-sw-white transition-all hover:bg-sw-blue-hover active:scale-[0.97]"
            >
              GET MY PLAN →
            </button>
          )}
        </div>
      </div>

      {/* Hero */}
      <div className="mx-auto max-w-lg animate-fade-up px-4 pt-8 pb-6 text-center">
        {!expired ? (
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-bold text-orange-600">
            🎁 Special Discount: <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs font-extrabold text-white">97% OFF</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mb-5 inline-flex cursor-pointer items-center gap-2 rounded-full border border-sw-blue-border bg-sw-blue-light px-4 py-1.5 text-sm font-bold text-sw-blue transition-opacity hover:opacity-90"
          >
            🔄 Offer expired — refresh page for a new deal
          </button>
        )}
        <h1 className="mb-3 text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
          {name ? (
            <>
              Your Claude AI Learning Plan
              <br />
              is ready, <span className="text-sw-blue">{name}!</span>
            </>
          ) : (
            <>
              Your Claude AI Learning Plan
              <br />
              is <span className="text-sw-blue">ready!</span>
            </>
          )}
        </h1>
        <p className="mx-auto mb-5 max-w-sm text-sm leading-relaxed text-sw-grey">
          {profile.description || 'Your personalised 7-day Claude AI mastery plan has been created based on your answers.'}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {goalLabel ? (
            <div className="rounded-2xl bg-sw-grey-light px-4 py-3 text-left">
              <p className="mb-1 text-xs font-semibold tracking-wide text-sw-grey uppercase">🎯 Your Goal</p>
              <p className="text-sm leading-snug font-bold text-sw-dark">{goalLabel}</p>
            </div>
          ) : null}
          {levelLabel ? (
            <div className="rounded-2xl bg-sw-grey-light px-4 py-3 text-left">
              <p className="mb-1 text-xs font-semibold tracking-wide text-sw-grey uppercase">⚡ Your Level</p>
              <p className="text-sm leading-snug font-bold text-sw-dark">{levelLabel}</p>
            </div>
          ) : null}
        </div>
      </div>

      {/* Certificate preview */}
      <div className="mx-auto max-w-lg px-4 pb-6">
        <div className="rounded-2xl border border-sw-blue-border bg-gradient-to-br from-sw-blue-light to-sw-white p-3 shadow-lg">
          <AssetImage
            src="/assets/certificate.png"
            alt="Claude AI Certificate of Mastery"
            fallbackEmoji="🎓"
            className="h-auto w-full rounded-xl"
          />
        </div>
        <p className="mt-2 text-center text-xs font-medium text-sw-grey">
          🏆 Earn your official Claude AI Certificate upon completion
        </p>
      </div>

      <div className="mx-auto max-w-lg px-4 pb-6">
        <button
          type="button"
          onClick={scrollToCheckout}
          className="w-full animate-pulse-cta rounded-full bg-sw-blue py-4 text-lg font-extrabold tracking-wide text-sw-white uppercase shadow-lg transition-all hover:bg-sw-blue-hover active:scale-[0.98]"
        >
          GET MY CLAUDE AI PLAN →
        </button>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden pb-8">
        <p className="mb-3 px-4 text-center text-base font-bold text-sw-dark">
          🔥 <span className="text-sw-blue">1,247 people</span> started their Claude plan this week
        </p>
        <div className="overflow-hidden">
          <div className="marquee-track gap-3 px-2">
            {[...ENROLLED_NAMES, ...ENROLLED_NAMES].map((enrolled, i) => (
              <div
                key={i}
                className="flex shrink-0 items-center gap-2 rounded-full bg-sw-grey-light px-4 py-2 text-xs font-semibold whitespace-nowrap text-sw-dark"
              >
                <span className="size-2 shrink-0 rounded-full bg-sw-success" />
                {enrolled} just enrolled · {ENROLLED_TIMES[i % ENROLLED_TIMES.length]}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="checkout-anchor" ref={checkoutAnchorRef}>
        {!expired && email && trialPlan ? (
          <InlineTrialCheckout
            email={email}
            name={name}
            productId={trialPlan.id}
            funnel={FUNNEL}
            percentOff={offerPercent}
            onSuccess={onCheckoutSuccess}
            highlights={CLAUDE_CHECKOUT_HIGHLIGHTS}
          />
        ) : (
          <ExpiredPlanPicker
            plans={plans}
            selectedPlanId={selectedPlan?.id}
            onSelect={setSelectedPlanId}
            onStart={() => {
              if (!selectedPlan) return
              trackEvent('CheckoutStarted', { funnel: FUNNEL, planId: selectedPlan.id })
              try {
                window.sessionStorage.setItem('sw_claude_selected_plan', JSON.stringify(selectedPlan))
              } catch {
                /* ignore */
              }
              onExpiredPlanContinue(selectedPlan.id)
            }}
          />
        )}
      </div>

      {/* Impact blocks */}
      <div className="mx-auto max-w-lg px-4 pb-8">
        <h3 className="mb-1 text-center text-xl font-extrabold text-sw-dark">
          See real impact of mastering <span className="text-sw-blue">Claude</span>
        </h3>
        <div className="mt-4 flex flex-col gap-3">
          {IMPACT_BLOCKS.map((block) => (
            <div key={block.bold} className="rounded-2xl bg-sw-grey-light px-5 py-4 text-center">
              <span className="mb-2 block text-2xl">{block.emoji}</span>
              <p className="text-sm leading-snug text-sw-dark">
                <span className="font-bold">{block.bold}</span> {block.rest}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Included checklist */}
      <div className="mx-auto max-w-lg px-4 pb-8">
        <div className="rounded-2xl bg-sw-grey-light p-5">
          <h3 className="mb-4 text-base font-extrabold text-sw-dark">What&apos;s included in your Claude plan</h3>
          <div className="flex flex-col gap-3">
            {INCLUDED_ITEMS.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sw-success">
                  <Check className="size-3 text-sw-white" strokeWidth={3} />
                </div>
                <span className="text-sm leading-snug text-sw-dark">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="pb-8">
        <h3 className="mb-4 px-4 text-center text-lg font-extrabold text-sw-dark">Hear it from Claude learners</h3>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:hidden">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="w-72 shrink-0 snap-start rounded-2xl bg-sw-grey-light p-5">
              <StarRow count={t.stars} />
              <p className="mt-3 mb-4 text-sm leading-relaxed text-sw-dark">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-sm font-bold text-sw-dark">{t.name}</p>
                <p className="text-xs text-sw-grey">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto hidden max-w-3xl gap-4 px-4 sm:grid sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="flex flex-col rounded-2xl bg-sw-grey-light p-5">
              <StarRow count={t.stars} />
              <p className="mt-3 mb-4 flex-1 text-sm leading-relaxed text-sw-dark">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-sm font-bold text-sw-dark">{t.name}</p>
                <p className="text-xs text-sw-grey">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guarantee */}
      <div className="mx-auto max-w-lg px-4 pb-8">
        <div className="flex items-center gap-4 rounded-2xl border-2 border-sw-success bg-sw-success-light px-5 py-4">
          <ShieldCheck className="size-10 shrink-0 text-sw-success" strokeWidth={1.5} />
          <div>
            <p className="text-sm font-extrabold text-sw-dark">30-Day Money-Back Guarantee</p>
            <p className="mt-0.5 text-xs leading-snug text-sw-grey">Not right for you? Full refund, no questions asked.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
