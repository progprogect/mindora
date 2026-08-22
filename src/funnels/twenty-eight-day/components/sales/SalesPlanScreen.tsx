import { useEffect, useRef, useState } from 'react'
import type { QuizAnswers, QuizProfile } from '@/funnels/twenty-eight-day/types/quiz'
import { DEFAULT_PLANS, formatUsd, planMeta, type PlanView } from '@/funnels/twenty-eight-day/data/plans'
import { getCheckoutSessionKey } from '@/shared/lib/checkoutSession'
import { trackEvent } from '@/shared/lib/tracking'
import { getAnswerLabel } from '@/funnels/twenty-eight-day/lib/scoring'
import { useProductsList, useSetCheckoutOfferPercentAction, useTrackCheckoutInitiated } from '@/shared/lib/backend'
import InlineTrialCheckout from '@/shared/components/InlineTrialCheckout'

interface SalesPlanScreenProps {
  profile: QuizProfile
  email: string | null
  name: string | null
  answers: QuizAnswers
  percentOff: number
  onPercentOffResolved: (percentOff: number) => void
  onCheckoutSuccess: () => void
  /** Expired-offer GET STARTED — navigates to `/checkout?product=`. */
  onExpiredPlanContinue: (productId: string) => void
}

const COUNTDOWN_SECONDS = 10 * 60
const FUNNEL = '28-day-ai-challenge'

const TOOLS = [
  { name: 'ChatGPT', short: 'ChatGPT', domain: 'openai.com', color: '#10a37f' },
  { name: 'Claude', short: 'Claude', domain: 'anthropic.com', color: '#d97706' },
  { name: 'Canva', short: 'Canva', domain: 'canva.com', color: '#00c4cc' },
  { name: 'Midjourney', short: 'Midjourney', domain: 'midjourney.com', color: '#000000' },
  { name: 'Perplexity', short: 'Perplexity', domain: 'perplexity.ai', color: '#1fb8cd' },
  { name: 'GitHub Copilot', short: 'Copilot', domain: 'github.com', color: '#24292e' },
  { name: 'Copy.ai', short: 'Copy.ai', domain: 'copy.ai', color: '#7c3aed' },
  { name: 'Descript', short: 'Descript', domain: 'descript.com', color: '#5b5bd6' },
  { name: 'Tako', short: 'Tako', domain: 'tako.ai', color: '#7c3aed' },
  { name: 'QuillBot', short: 'QuillBot', domain: 'quillbot.com', color: '#2e7d32' },
  { name: 'Notion AI', short: 'Notion AI', domain: 'notion.so', color: '#000000' },
  { name: 'Picsart AI', short: 'Picsart AI', domain: 'picsart.com', color: '#e61c5d' },
  { name: 'CapCut', short: 'CapCut', domain: 'capcut.com', color: '#000000' },
  { name: 'Murf AI', short: 'Murf AI', domain: 'murf.ai', color: '#f59e0b' },
  { name: 'Google AI', short: 'Google AI', domain: 'google.com', color: '#4285f4' },
  { name: 'DALL·E', short: 'DALL·E', domain: 'openai.com', color: '#10a37f' },
  { name: 'Lovable', short: 'Lovable', domain: 'lovable.dev', color: '#e14d88' },
  { name: 'Synthesia', short: 'Synthesia', domain: 'synthesia.io', color: '#6366f1' },
]

const PLAN_DAYS = [
  { day: 1, faded: false },
  { day: 2, faded: false },
  { day: 3, faded: false },
  { day: 4, faded: false },
  { day: 8, faded: false },
  { day: 9, faded: false },
  { day: 10, faded: false },
  { day: 11, faded: false },
  { day: 15, faded: true },
  { day: 16, faded: true },
  { day: 17, faded: true },
  { day: 18, faded: true },
]

const INCLUDED = [
  '28 structured daily AI lessons (just 10 min/day)',
  '150+ AI tools, templates & prompts library',
  'Certificate of completion',
  'New content added every week',
  'Cancel anytime — no lock-in',
]

const MEMBER_TESTIMONIALS = [
  {
    name: 'Sophie R.',
    role: 'Marketing Manager',
    stars: 5,
    quote: 'I went from knowing nothing about AI to building my own automated workflows in 28 days. Game-changer.',
  },
  {
    name: 'Marcus T.',
    role: 'Business Owner',
    stars: 5,
    quote: 'The daily structure kept me consistent. By week 2 I was saving 3 hours a day at work.',
  },
  {
    name: 'Claire N.',
    role: 'Operations Lead',
    stars: 5,
    quote: 'I was sceptical at first. Now I use AI every single day and my boss has noticed.',
  },
]

const LIVE_HANDLES = [
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

const LIVE_MINUTES = [
  '1 min ago',
  '2 min ago',
  '3 min ago',
  '4 min ago',
  '5 min ago',
  '6 min ago',
  '7 min ago',
  '8 min ago',
  '9 min ago',
  '10 min ago',
  '11 min ago',
  '12 min ago',
]

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

function ToolFavicon({
  domain,
  name,
  color,
}: {
  domain: string
  name: string
  color: string
}) {
  const [srcIndex, setSrcIndex] = useState(0)
  const sources = [
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    `https://icons.duckduckgo.com/ip3/${domain}.ico`,
  ]

  if (srcIndex >= sources.length) {
    return (
      <div
        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-base font-extrabold text-white"
        style={{ backgroundColor: color }}
      >
        {name[0]}
      </div>
    )
  }

  return (
    <img
      src={sources[srcIndex]}
      alt={name}
      referrerPolicy="no-referrer"
      loading="lazy"
      className="h-14 w-14 flex-shrink-0 object-contain"
      onError={() => setSrcIndex((i) => i + 1)}
    />
  )
}

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
          style={{ color: 'hsl(var(--sw-amber))' }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
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

function TestimonialCard({
  quote,
  name,
  role,
  stars,
  className,
}: {
  quote: string
  name: string
  role: string
  stars: number
  className?: string
}) {
  return (
    <div className={className}>
      <StarRow count={stars} />
      <p className="mt-3 mb-4 text-sm leading-relaxed text-sw-dark">&quot;{quote}&quot;</p>
      <div>
        <p className="text-sm font-bold text-sw-dark">{name}</p>
        <p className="text-xs text-sw-grey">{role}</p>
      </div>
    </div>
  )
}

export default function SalesPlanScreen({
  profile,
  email,
  name,
  answers,
  percentOff,
  onPercentOffResolved,
  onCheckoutSuccess,
  onExpiredPlanContinue,
}: SalesPlanScreenProps) {
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

  const goalLabel = getAnswerLabel('q2-goal', answers['q2-goal'])
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
    trackEvent('PlanViewed')
    trackEvent('PricingViewed')
    if (email) {
      void trackCheckoutInitiated({ email, funnel: FUNNEL })
      trackEvent('CheckoutStarted', { planId: trialPlan?.id })
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

  const scrollToCheckout = () => {
    document.getElementById('checkout-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    checkoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="bg-white">
      <header className="sticky top-0 z-50 border-b border-sw-grey-border bg-white">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between gap-3 px-4">
          {expired ? (
            <div className="flex flex-col items-start">
              <span className="mb-0.5 text-[10px] leading-none font-semibold tracking-wide text-sw-grey uppercase">
                Offer ended
              </span>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-extrabold text-sw-grey tabular-nums">00:00</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-start">
              <span className="mb-0.5 text-[10px] leading-none font-semibold tracking-wide text-sw-grey uppercase">
                Offer expires
              </span>
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-extrabold text-sw-dark tabular-nums">
                  {minutes}:{seconds}
                </span>
              </div>
            </div>
          )}

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
              className="rounded-full px-3 py-2 text-xs font-bold whitespace-nowrap text-white transition-all active:scale-[0.97]"
              style={{ backgroundColor: 'hsl(var(--sw-success))' }}
            >
              REFRESH →
            </button>
          ) : (
            <button
              type="button"
              onClick={scrollToCheckout}
              className="rounded-full bg-sw-blue px-3 py-2 text-xs font-bold whitespace-nowrap text-white transition-all hover:bg-sw-blue-hover active:scale-[0.97]"
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
              Your personal 28-Day AI Plan
              <br />
              is ready, <span className="text-sw-blue">{name}!</span>
            </>
          ) : (
            <>
              Your personal 28-Day AI Plan
              <br />
              is <span className="text-sw-blue">ready!</span>
            </>
          )}
        </h1>
        <p className="mx-auto mb-5 max-w-sm text-sm leading-relaxed text-sw-grey">{profile.insight}</p>

        <div className="mb-2 grid grid-cols-2 gap-3">
          {goalLabel ? (
            <div className="rounded-2xl bg-sw-grey-light px-4 py-3 text-left">
              <p className="mb-1 text-xs font-semibold tracking-wide text-sw-grey uppercase">🎯 Your Goal</p>
              <p className="text-sm leading-snug font-bold text-sw-dark">{goalLabel}</p>
            </div>
          ) : null}
          <div className="rounded-2xl bg-sw-grey-light px-4 py-3 text-left">
            <p className="mb-1 text-xs font-semibold tracking-wide text-sw-grey uppercase">⚡ Your Level</p>
            <p className="text-sm leading-snug font-bold text-sw-dark">{profile.scoreLabel}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg animate-fade-up px-4 pb-8">
        <div className="grid grid-cols-4 gap-2.5">
          {PLAN_DAYS.map(({ day, faded }) => {
            const tool = TOOLS[day - 1]
            if (!tool) return null
            return (
              <div
                key={day}
                className="flex flex-col items-center overflow-hidden rounded-2xl border border-sw-grey-border bg-white shadow-sm"
                style={{ opacity: faded ? 0.3 : 1 }}
              >
                <div
                  className="flex w-full items-center justify-center py-1.5"
                  style={{
                    backgroundColor: faded ? 'hsl(var(--sw-blue) / 0.35)' : 'hsl(var(--sw-blue))',
                  }}
                >
                  <span className="text-[11px] leading-none font-extrabold tracking-wide text-white">DAY {day}</span>
                </div>
                <div className="flex flex-col items-center gap-2 px-2 pt-3 pb-3">
                  <ToolFavicon domain={tool.domain} name={tool.name} color={tool.color} />
                  <span className="w-full truncate text-center text-[11px] leading-tight font-semibold text-sw-dark">
                    {tool.short}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pb-6">
        <button
          type="button"
          onClick={scrollToCheckout}
          className="animate-pulse-cta w-full rounded-full bg-sw-blue py-4 text-lg font-extrabold tracking-wide text-white uppercase shadow-lg transition-all hover:bg-sw-blue-hover active:scale-[0.98]"
        >
          GET MY AI PLAN →
        </button>
      </div>

      <div className="overflow-hidden pb-8">
        <p className="mb-3 px-4 text-center text-base font-bold text-sw-dark">
          🔥 <span className="text-sw-blue">1,247 people</span> started their plan this week
        </p>
        <div className="overflow-hidden">
          <div className="marquee-track gap-3 px-2">
            {[...LIVE_HANDLES, ...LIVE_HANDLES].map((handle, i) => (
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

      <div id="checkout-anchor" ref={checkoutRef} style={{ scrollMarginTop: 72 }}>
        {!expired && email && trialPlan ? (
          <InlineTrialCheckout
            email={email}
            name={name}
            productId={trialPlan.id}
            funnel={FUNNEL}
            percentOff={offerPercent}
            onSuccess={onCheckoutSuccess}
          />
        ) : expired ? (
          <ExpiredPlanPicker
            plans={plans}
            selectedPlanId={selectedPlan?.id}
            onSelect={setSelectedPlanId}
            onStart={() => {
              if (!selectedPlan) return
              trackEvent('CheckoutStarted', { funnel: FUNNEL, planId: selectedPlan.id })
              try {
                window.sessionStorage.setItem('sw_28day_selected_plan', JSON.stringify(selectedPlan))
              } catch {
                /* ignore */
              }
              onExpiredPlanContinue(selectedPlan.id)
            }}
          />
        ) : (
          <div className="mx-auto max-w-lg px-4 pb-6">
            <p className="text-center text-xs text-sw-grey">
              Please enter your email earlier in the quiz to unlock checkout.
            </p>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-lg px-4 pb-8">
        <div className="rounded-2xl bg-sw-grey-light p-5">
          <h3 className="mb-4 text-base font-extrabold text-sw-dark">What&apos;s included in your plan</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <CheckDot />
              <span className="text-sm leading-snug text-sw-dark">{INCLUDED[0]}</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckDot />
              <span className="text-sm leading-snug text-sw-dark">
                Plan personalised for {profile.archetype} {profile.archetypeEmoji}
              </span>
            </div>
            {INCLUDED.slice(1).map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckDot />
                <span className="text-sm leading-snug text-sw-dark">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pb-8">
        <h3 className="mb-4 px-4 text-center text-lg font-extrabold text-sw-dark">What members say</h3>
        <div className="scrollbar-none flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory sm:hidden">
          {MEMBER_TESTIMONIALS.map((t) => (
            <TestimonialCard
              key={t.name}
              {...t}
              className="w-72 flex-shrink-0 snap-start rounded-2xl bg-sw-grey-light p-5"
            />
          ))}
        </div>
        <div className="mx-auto hidden max-w-3xl grid-cols-3 gap-4 px-4 sm:grid">
          {MEMBER_TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} className="flex flex-col rounded-2xl bg-sw-grey-light p-5" />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pb-8">
        <div
          className="flex items-center gap-4 rounded-2xl border-2 px-5 py-4"
          style={{
            borderColor: 'hsl(var(--sw-success))',
            backgroundColor: 'hsl(142 71% 45% / 0.06)',
          }}
        >
          <div className="flex-shrink-0">
            <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="19" stroke="hsl(142 71% 45%)" strokeWidth="2" />
              <path
                d="M20 9 L28 13 V20 C28 25 24 29 20 31 C16 29 12 25 12 20 V13 Z"
                fill="hsl(142 71% 45% / 0.15)"
                stroke="hsl(142 71% 45%)"
                strokeWidth="1.5"
              />
              <path
                d="M16 20l3 3 5-5"
                stroke="hsl(142 71% 45%)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
