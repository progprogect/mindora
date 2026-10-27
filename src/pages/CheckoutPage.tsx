import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
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
import { claudeCheckoutHighlights } from '@/shared/lib/checkoutHighlights'
import { PRICING_FALLBACK_PLANS } from '@/marketing/data/pricing'
import { rememberCheckoutEmail, resolveKnownEmail } from '@/shared/lib/checkoutSession'
import { moneyBackCopy } from '@/marketing/data/moneyBack'
import { useI18n } from '../../authorisation/src/i18n/I18nProvider'
import { checkoutUiCopy } from '@/shared/i18n/checkoutUiCopy'

const FUNNEL_28 = '28-day-ai-challenge'
const FUNNEL_CLAUDE = 'claude-ai-certification'

const CHECKOUT_PLAN_NAME_RU: Record<string, string> = {
  'Monthly Plan': 'Месячный план',
  'Quarterly Plan': 'Квартальный',
  'Annual Plan': 'Годовой',
  '6-Month Plan': 'План на 6 месяцев',
  '12-Month Plan': 'План на 12 месяцев',
  Monthly: 'Месячный',
  Quarterly: 'Квартальный',
  Annual: 'Годовой',
}

function displayPlanName(plan: PlanView, locale: string): string {
  if (locale === 'ru') {
    return CHECKOUT_PLAN_NAME_RU[plan.name] ?? plan.name
  }
  return plan.name
}
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
  preferPricingCatalog: boolean,
): PlanView | null {
  const fromConvex = products?.find((p) => p._id === productId)
  if (fromConvex) return toPlanView(fromConvex)
  const fromPricing = PRICING_FALLBACK_PLANS.find((p) => p.id === productId)
  const pricingPlan: PlanView | undefined = fromPricing
    ? {
        id: fromPricing.id,
        name: fromPricing.name,
        price: fromPricing.price,
        intervalMonths: fromPricing.intervalMonths,
        badge: fromPricing.badge,
      }
    : undefined
  if (preferPricingCatalog && pricingPlan) return pricingPlan
  return defaults.find((p) => p.id === productId) ?? pricingPlan ?? loadCachedPlan(productId, cacheKey)
}

function priceSuffix(months: number, periodLabel: string, perMonthLabel: string): string {
  if (months === 1) return perMonthLabel
  return `/${periodLabel.replace('every ', '').replace('per ', '')}`
}

/**
 * `/checkout?product=` — $1 trial for a catalog plan (from `/pricing` or
 * the expired-offer picker). Without `?funnel=`, copy and setup match the original.
 */
export default function CheckoutPage() {
  const { locale } = useI18n()
  const ui = checkoutUiCopy(locale)
  const moneyBack = moneyBackCopy(locale)
  const [searchParams] = useSearchParams()
  const productId = searchParams.get('product') ?? searchParams.get('plan') ?? ''
  const funnelParam = searchParams.get('funnel')
  const funnel = funnelParam || 'pricing'
  const claude = funnelParam === FUNNEL_CLAUDE
  const is28DayFunnel = funnelParam === FUNNEL_28
  const professionalCerts = !is28DayFunnel

  const products = useProductsList()
  const results = claude ? loadClaudeQuizResults() : loadQuizResults()
  const defaults = claude ? DEFAULT_PLANS_CLAUDE : DEFAULT_PLANS_28
  const formatUsd = claude ? formatUsdClaude : formatUsd28
  const planMeta = claude ? planMetaClaude : planMeta28
  const cacheKey = claude ? 'sw_claude_selected_plan' : 'sw_28day_selected_plan'
  const checkoutKey = claude ? CHECKOUT_CLAUDE_KEY : CHECKOUT_28DAY_KEY
  const setupPath = funnelParam ? `/checkout/setup?trial=1&funnel=${funnelParam}` : '/checkout/setup'

  const [email, setEmail] = useState(
    () => results?.email?.trim() || resolveKnownEmail(searchParams) || '',
  )
  const [paid, setPaid] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [showPayment, setShowPayment] = useState(false)

  const plan = productId
    ? resolvePlan(productId, products, defaults, cacheKey, !funnelParam)
    : null
  const meta = plan ? planMeta(plan, locale) : null
  const planMonths = meta?.months ?? 1
  const monthly = plan && meta ? plan.price / planMonths : 0

  useEffect(() => {
    if (!plan) return
    trackEvent('CheckoutStarted', { funnel, planId: plan.id, source: 'checkout-page' })
  }, [plan, funnel])

  useEffect(() => {
    if (!paid) return
    const timer = window.setTimeout(() => {
      window.location.href = setupPath
    }, 3000)
    return () => window.clearTimeout(timer)
  }, [paid, setupPath])

  const startPayment = () => {
    if (!email.trim()) {
      setEmailError(ui.emailRequired)
      return
    }
    setEmailError(null)
    rememberCheckoutEmail(email)
    setShowPayment(true)
  }

  if (!productId) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-4">
        <p className="text-lg font-bold text-sw-dark">{ui.invalidPlan}</p>
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
        <p className="text-lg font-bold text-sw-dark">{ui.invalidPlan}</p>
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
          <h1 className="mb-2 text-2xl font-extrabold text-sw-dark">{ui.paymentSuccessful}</h1>
          <p className="text-base text-sw-grey">{ui.trialActive}</p>
          <p className="mt-1 text-sm text-sw-grey">{ui.redirectHint}</p>
        </div>
        <Link to={setupPath} className="text-sm font-semibold text-sw-blue">
          {ui.continueNow}
        </Link>
      </div>
    )
  }

  const name = results?.name ?? ''
  const monthlyExtra =
    planMonths > 1 ? ` ${locale === 'ru' ? 'Это всего' : "That's just"} $${(monthly / 100).toFixed(2)}${ui.pricePerMonth}.` : null

  return (
    <div className="min-h-dvh overflow-x-hidden bg-white">
      <div className="mx-auto max-w-lg overflow-hidden px-4 pt-8 pb-8">
        <h1 className="mb-2 text-center text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
          {ui.joinHeadlinePrefix}
          <span className="text-sw-blue">{ui.joinHeadlineHighlight}</span>
          {ui.joinHeadlineTo}
          <br />
          {ui.joinHeadlineSuffix}
        </h1>

        <div
          className="mt-5 mb-5 flex w-full items-center gap-3 rounded-xl px-4 py-3.5"
          style={{ background: 'hsl(220 30% 96%)', border: '1px solid hsl(220 20% 90%)' }}
        >
          <span className="flex-shrink-0 text-3xl">🏆</span>
          <div>
            <p className="text-[0.9rem] font-bold text-sw-dark">
              {professionalCerts ? ui.professionalCertsTitle : ui.completionCertTitle}
            </p>
            <p className="text-xs leading-relaxed text-sw-grey">
              {professionalCerts ? ui.professionalCertsBlurb : ui.completionCertBlurb}
            </p>
          </div>
        </div>

        <div className="mb-4 overflow-hidden rounded-2xl border border-sw-grey-border bg-white shadow-sm">
          <div className="px-5 pt-5 pb-4">
            <h2 className="mb-4 text-center text-lg font-extrabold text-sw-dark">{ui.safeCheckout}</h2>
            <div className="mb-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-sw-dark">{displayPlanName(plan, locale)}</span>
                <span className="text-sm font-semibold text-sw-dark">
                  {formatUsd(plan.price)}
                  {priceSuffix(planMonths, meta.periodLabel, ui.pricePerMonth)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-sw-dark">
                  {professionalCerts ? ui.professionalCertificates : ui.certificateOfCompletion}
                </span>
                <span className="text-sm font-semibold" style={{ color: 'hsl(var(--sw-success))' }}>
                  {ui.free}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-sw-dark">{ui.threeDayTrial}</span>
                <span className="text-sm font-semibold" style={{ color: 'hsl(var(--sw-success))' }}>
                  $1.00
                </span>
              </div>
            </div>
            <div className="border-t border-sw-grey-border pt-3 mb-1">
              <div className="flex items-center justify-between">
                <span className="text-base font-extrabold text-sw-dark">{ui.dueToday}</span>
                <span className="text-xl font-extrabold text-sw-dark">$1.00</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-sw-grey">
                {ui.thenAfterTrial(formatUsd(plan.price), meta.periodLabel, monthlyExtra)}
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
                returnPath={setupPath}
                highlights={claude ? claudeCheckoutHighlights(locale) : undefined}
                onSuccess={() => {
                  window.localStorage.setItem(checkoutKey, 'true')
                  setPaid(true)
                }}
                submitLabel={ui.confirmPayment}
              />
            ) : (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-sw-dark">{ui.emailAddress}</label>
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
                  placeholder={ui.emailPlaceholder}
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
                  {ui.continueToPayment}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pb-6 text-xs text-sw-grey">
          <span>{ui.encrypted256}</span>
          <span>{ui.cancelAnyTime}</span>
          <span>✓ {moneyBack.chipCap}</span>
        </div>
        <p className="px-2 text-center text-[11px] leading-relaxed text-sw-grey">
          {ui.legalTrial(formatUsd(plan.price), meta.periodLabel, moneyBack.chip)}
        </p>
      </div>
    </div>
  )
}
