import { useEffect, useState } from 'react'
import { Check, Timer } from 'lucide-react'
import type { QuizRole } from '@/funnels/twenty-eight-day/types/quiz'
import { DEFAULT_PLANS, applyDiscount, formatUsd, type PlanView } from '@/funnels/twenty-eight-day/data/plans'
import { getCheckoutSessionKey } from '@/shared/lib/checkoutSession'
import { trackEvent } from '@/shared/lib/tracking'
import { useProductsList, useSetCheckoutOfferPercentAction, useTrackCheckoutInitiated } from '@/shared/lib/backend'
import InlineTrialCheckout from '@/shared/components/InlineTrialCheckout'

interface SalesPlanScreenProps {
  role: QuizRole | null
  email: string | null
  name: string | null
  percentOff: number
  onPercentOffResolved: (percentOff: number) => void
  onCheckoutSuccess: () => void
}

const COUNTDOWN_SECONDS = 10 * 60
const FUNNEL = '28-day-ai-challenge'

function formatCountdown(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export default function SalesPlanScreen({
  email,
  name,
  percentOff,
  onPercentOffResolved,
  onCheckoutSuccess,
}: SalesPlanScreenProps) {
  const products = useProductsList()
  const plans: PlanView[] = products?.length
    ? products.map((p) => ({ id: p._id, name: p.name, price: p.price, intervalMonths: p.intervalMonths, badge: p.badge }))
    : DEFAULT_PLANS

  const defaultSelected = plans.find((p) => p.badge) ?? plans[1] ?? plans[0]
  const [selectedPlanId, setSelectedPlanId] = useState(defaultSelected?.id)
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const trackCheckoutInitiated = useTrackCheckoutInitiated()
  const setCheckoutOfferPercent = useSetCheckoutOfferPercentAction()

  useEffect(() => {
    const sessionKey = getCheckoutSessionKey()
    setCheckoutOfferPercent(sessionKey, percentOff).then((res) => onPercentOffResolved(res.percentOff))
    trackEvent('PlanViewed')
    trackEvent('PricingViewed')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (secondsLeft <= 0) return
    const interval = window.setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000)
    return () => window.clearInterval(interval)
  }, [secondsLeft])

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) ?? plans[0]
  const expired = secondsLeft <= 0

  const handleStartTrial = () => {
    if (!email) return
    if (email) void trackCheckoutInitiated({ email, funnel: FUNNEL })
    trackEvent('CheckoutStarted', { planId: selectedPlan?.id })
    setCheckoutOpen(true)
  }

  return (
    <div className="flex flex-1 flex-col gap-6 pb-28 animate-fade-up">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-sw-dark">
          {name ? `${name}, choose your plan` : 'Choose your plan'}
        </h1>
        <p className="mt-2 text-sm text-sw-grey">Start with a $1, 7-day trial. Cancel anytime.</p>
      </div>

      <div
        className={`flex items-center justify-center gap-2 rounded-sw-sm px-4 py-2.5 text-sm font-bold ${
          expired ? 'bg-sw-red/10 text-sw-red' : 'bg-sw-amber-light text-sw-amber'
        }`}
      >
        <Timer className="size-4" />
        {expired ? (
          <span>Your discount expired — refresh the page to unlock a new one.</span>
        ) : (
          <span>
            {percentOff}% OFF expires in {formatCountdown(secondsLeft)}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {plans.map((plan) => {
          const discounted = applyDiscount(plan.price, percentOff)
          const monthlyEquivalent = discounted / plan.intervalMonths
          const isSelected = plan.id === selectedPlan?.id

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => setSelectedPlanId(plan.id)}
              className={`relative flex items-center justify-between rounded-sw border-[2px] p-4 text-left transition ${
                isSelected ? 'border-sw-blue bg-sw-blue-light' : 'border-sw-border bg-sw-white hover:border-sw-blue/50'
              }`}
            >
              {plan.badge ? (
                <span className="absolute -top-2.5 left-4 rounded-full bg-sw-blue px-2.5 py-0.5 text-[10px] font-bold text-sw-white">
                  {plan.badge}
                </span>
              ) : null}
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    isSelected ? 'border-sw-blue bg-sw-blue' : 'border-sw-border'
                  }`}
                >
                  {isSelected ? <Check className="size-3 text-sw-white" /> : null}
                </div>
                <div>
                  <p className="text-sm font-bold text-sw-dark">{plan.name}</p>
                  <p className="text-xs text-sw-grey line-through">{formatUsd(plan.price)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-extrabold text-sw-dark">{formatUsd(monthlyEquivalent)}</p>
                <p className="text-[10px] text-sw-grey">/month</p>
              </div>
            </button>
          )
        })}
      </div>

      {checkoutOpen && email && selectedPlan ? (
        <div className="rounded-sw border border-sw-border bg-sw-white p-4 shadow-sw-card animate-fade-up">
          <p className="mb-3 text-sm font-bold text-sw-dark">Start your $1, 7-day trial</p>
          <InlineTrialCheckout
            email={email}
            productId={selectedPlan.id}
            funnel={FUNNEL}
            onSuccess={onCheckoutSuccess}
          />
        </div>
      ) : null}

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sw-border bg-sw-white/95 p-4 backdrop-blur safe-bottom">
        <div className="mx-auto max-w-xl">
          {!checkoutOpen ? (
            <button
              type="button"
              onClick={handleStartTrial}
              disabled={!email}
              className="w-full animate-pulse-cta rounded-sw-sm bg-sw-blue py-3.5 font-extrabold tracking-wide text-sw-white transition hover:bg-sw-blue-hover disabled:opacity-60"
            >
              Start for Just $1
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
