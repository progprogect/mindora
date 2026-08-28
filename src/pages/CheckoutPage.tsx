import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  DEFAULT_PLANS as DEFAULT_PLANS_28,
  formatUsd as formatUsd28,
  planMeta as planMeta28,
  type PlanView,
} from '@/funnels/twenty-eight-day/data/plans'
import {
  DEFAULT_PLANS as DEFAULT_PLANS_CLAUDE,
  formatUsd as formatUsdClaude,
  planMeta as planMetaClaude,
} from '@/funnels/claude/data/plans'
import { loadQuizResults } from '@/funnels/twenty-eight-day/lib/quizStorage'
import { loadClaudeQuizResults } from '@/funnels/claude/lib/claudeQuizStorage'
import { useProductsList, type ProductDoc } from '@/shared/lib/backend'
import { trackEvent } from '@/shared/lib/tracking'
import InlineTrialCheckout from '@/shared/components/InlineTrialCheckout'
import { CLAUDE_CHECKOUT_HIGHLIGHTS } from '@/shared/lib/checkoutHighlights'

const FUNNEL_28 = '28-day-ai-challenge'
const FUNNEL_CLAUDE = 'claude-ai-certification'
const CHECKOUT_28DAY_KEY = 'sw_checkout_completed'
const CHECKOUT_CLAUDE_KEY = 'sw_checkout_claude_completed'

function toPlanView(product: ProductDoc): PlanView {
  return {
    id: product._id,
    name: product.name,
    price: product.price,
    intervalMonths: product.intervalMonths,
    badge: product.badge,
  }
}

function loadCachedPlan(productId: string, storageKey: string): PlanView | null {
  try {
    const raw = window.sessionStorage.getItem(storageKey)
    if (!raw) return null
    const plan = JSON.parse(raw) as PlanView
    return plan.id === productId ? plan : null
  } catch {
    return null
  }
}

function resolvePlan(
  productId: string,
  products: ProductDoc[] | undefined,
  defaults: PlanView[],
  cacheKey: string,
): PlanView | null {
  const fromConvex = products?.find((p) => p._id === productId)
  if (fromConvex) return toPlanView(fromConvex)
  return defaults.find((p) => p.id === productId) ?? loadCachedPlan(productId, cacheKey)
}

function priceSuffix(months: number, periodLabel: string): string {
  if (months === 1) return '/mo'
  return `/${periodLabel.replace('every ', '').replace('per ', '')}`
}

/**
 * `/checkout?product=` — full-page $1 trial for the plan chosen after the
 * 10-minute offer expires. GET STARTED on the picker lands here.
 */
export default function CheckoutPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const productId = searchParams.get('product') ?? searchParams.get('plan') ?? ''
  const funnel = searchParams.get('funnel') ?? FUNNEL_28
  const claude = funnel === FUNNEL_CLAUDE

  const products = useProductsList()
  const results = claude ? loadClaudeQuizResults() : loadQuizResults()
  const defaults = claude ? DEFAULT_PLANS_CLAUDE : DEFAULT_PLANS_28
  const formatUsd = claude ? formatUsdClaude : formatUsd28
  const planMeta = claude ? planMetaClaude : planMeta28
  const cacheKey = claude ? 'sw_claude_selected_plan' : 'sw_28day_selected_plan'
  const checkoutKey = claude ? CHECKOUT_CLAUDE_KEY : CHECKOUT_28DAY_KEY
  const setupPath = `/checkout/setup?trial=1&funnel=${funnel}`

  const [email, setEmail] = useState(results?.email ?? '')
  const [paid, setPaid] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [showPayment, setShowPayment] = useState(Boolean(results?.email))

  const plan = productId ? resolvePlan(productId, products, defaults, cacheKey) : null
  const meta = plan ? planMeta(plan) : null
  const monthly = plan && meta ? plan.price / meta.months : 0

  useEffect(() => {
    if (!plan) return
    trackEvent('CheckoutStarted', { funnel, planId: plan.id, source: 'checkout-page' })
  }, [plan, funnel])

  useEffect(() => {
    if (!paid) return
    const timer = window.setTimeout(() => navigate(setupPath), 3000)
    return () => window.clearTimeout(timer)
  }, [paid, navigate, setupPath])

  const startPayment = () => {
    if (!email.trim()) {
      setEmailError('Please enter your email address.')
      return
    }
    setEmailError(null)
    setShowPayment(true)
  }

  if (!productId) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-4">
        <p className="text-lg font-bold text-sw-dark">Invalid plan. Please go back and try again.</p>
      </div>
    )
  }

  if (products === undefined && !plan) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-sw-blue border-t-transparent" />
      </div>
    )
  }

  if (!plan || !meta) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-4">
        <p className="text-lg font-bold text-sw-dark">Invalid plan. Please go back and try again.</p>
      </div>
    )
  }

  if (paid) {
    return (
      <div
        className="flex min-h-dvh flex-col items-center justify-center gap-5 px-4 text-center"
        style={{ backgroundColor: 'hsl(var(--sw-grey-light))' }}
      >
        <div
          className="flex size-20 items-center justify-center rounded-full text-4xl shadow-lg"
          style={{ backgroundColor: 'hsl(var(--sw-success) / 0.12)' }}
        >
          🎉
        </div>
        <div>
          <h1 className="mb-2 text-2xl font-extrabold text-sw-dark">Payment successful!</h1>
          <p className="text-base text-sw-grey">Your 7-day trial is now active. Setting up your account…</p>
          <p className="mt-1 text-sm text-sw-grey">You&apos;ll be redirected automatically in a moment.</p>
        </div>
        <Link to={setupPath} className="text-sm font-semibold text-sw-blue">
          Continue now
        </Link>
      </div>
    )
  }

  const name = results?.name ?? ''

  return (
    <div className="min-h-dvh overflow-x-hidden bg-white">
      <div className="mx-auto max-w-lg overflow-hidden px-4 pt-8 pb-8">
        <h1 className="mb-2 text-center text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
          Join <span className="text-sw-blue">100,000+ users</span> to
          <br />
          achieve your goals
        </h1>

        <div
          className="mt-5 mb-5 flex w-full items-center gap-3 rounded-xl px-4 py-3.5"
          style={{ background: 'hsl(220 30% 96%)', border: '1px solid hsl(220 20% 90%)' }}
        >
          <span className="flex-shrink-0 text-3xl">🏆</span>
          <div>
            <p className="text-[0.9rem] font-bold text-sw-dark">
              {claude ? 'Professional Certificates Included' : 'Certificate of Completion Included'}
            </p>
            <p className="text-xs leading-relaxed text-sw-grey">
              {claude
                ? 'Earn 30+ certifications, share them on LinkedIn and add them to your resume.'
                : 'Earn your 28-Day AI Challenge certificate, share it on LinkedIn and add it to your resume.'}
            </p>
          </div>
        </div>

        <div className="mb-4 overflow-hidden rounded-2xl border border-sw-grey-border bg-white shadow-sm">
          <div className="px-5 pt-5 pb-4">
            <h2 className="mb-4 text-center text-lg font-extrabold text-sw-dark">Safe checkout</h2>
            <div className="mb-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-sw-dark">{plan.name}</span>
                <span className="text-sm font-semibold text-sw-dark">
                  {formatUsd(plan.price)}
                  {priceSuffix(meta.months, meta.periodLabel)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-sw-dark">
                  {claude ? 'Professional Certificates' : 'Certificate of Completion'}
                </span>
                <span className="text-sm font-semibold" style={{ color: 'hsl(var(--sw-success))' }}>
                  FREE
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-sw-dark">7-Day Trial</span>
                <span className="text-sm font-semibold" style={{ color: 'hsl(var(--sw-success))' }}>
                  $1.00
                </span>
              </div>
            </div>
            <div className="border-t border-sw-grey-border pt-3 mb-1">
              <div className="flex items-center justify-between">
                <span className="text-base font-extrabold text-sw-dark">Due Today</span>
                <span className="text-xl font-extrabold text-sw-dark">$1.00</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-sw-grey">
                Then {formatUsd(plan.price)} {meta.periodLabel} after your 7-day trial.
                {meta.months > 1 ? ` That's just $${(monthly / 100).toFixed(2)}/month.` : null} Cancel any time.
              </p>
            </div>
          </div>

          <div className="px-5 pb-5">
            {showPayment ? (
              <InlineTrialCheckout
                framed={false}
                email={email.trim()}
                name={name}
                productId={plan.id}
                funnel={funnel}
                highlights={claude ? CLAUDE_CHECKOUT_HIGHLIGHTS : undefined}
                onSuccess={() => {
                  window.localStorage.setItem(checkoutKey, 'true')
                  setPaid(true)
                }}
                submitLabel="Confirm Payment"
              />
            ) : (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-sw-dark">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailError(null)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') startPayment()
                  }}
                  placeholder="you@email.com"
                  className="w-full rounded-xl border border-sw-grey-border px-4 py-3 text-base focus:border-sw-blue focus:ring-1 focus:ring-sw-blue focus:outline-none"
                />
                {emailError ? (
                  <p
                    className="rounded-lg px-3 py-2 text-center text-sm font-medium"
                    style={{ backgroundColor: 'hsl(0 80% 97%)', color: 'hsl(0 70% 45%)' }}
                  >
                    {emailError}
                  </p>
                ) : null}
                <button
                  type="button"
                  onClick={startPayment}
                  disabled={!email.trim()}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-base font-bold tracking-wide text-white uppercase transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ backgroundColor: 'hsl(var(--sw-blue))' }}
                >
                  Continue to Payment
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pb-6 text-xs text-sw-grey">
          <span>🔒 256-bit encrypted</span>
          <span>✓ Cancel any time</span>
          <span>✓ 30-Day money-back guarantee</span>
        </div>
        <p className="px-2 text-center text-[11px] leading-relaxed text-sw-grey">
          By proceeding, you agree to pay $1.00 today for a 7-day trial. After your trial, you&apos;ll be charged{' '}
          {formatUsd(plan.price)} {meta.periodLabel} until you cancel. You can cancel at any time from your account
          settings. 30-day money-back guarantee.
        </p>
      </div>
    </div>
  )
}
