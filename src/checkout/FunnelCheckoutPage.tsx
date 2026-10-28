import { withLocale } from '../../authorisation/src/i18n/locale'
import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ROUTES } from '@/marketing/data/nav'
import usePageTitle from '@/marketing/hooks/usePageTitle'
import NotFoundPage from '@/marketing/pages/NotFoundPage'
import InlineTrialCheckout from '@/shared/components/InlineTrialCheckout'
import { DEFAULT_PLANS } from '@/funnels/twenty-eight-day/data/plans'
import { rememberCheckoutEmail, resolveKnownEmail } from '@/shared/lib/checkoutSession'
import { moneyBackCopy } from '@/marketing/data/moneyBack'
import { useI18n } from '../../authorisation/src/i18n/I18nProvider'
import { checkoutUiCopy, funnelCheckoutLineItems, funnelCheckoutTrialNote } from '@/shared/i18n/checkoutUiCopy'

const ORIGINAL_CHECKOUT_FUNNELS = new Set([
  '28-day-ai-challenge',
  'claude-ai-certification',
  'master-claude-ai-excel',
  'success-assessment',
])

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MONTHLY_ID = DEFAULT_PLANS.find((p) => p.intervalMonths === 1)?.id ?? 'monthly'

export default function FunnelCheckoutPage() {
  const { locale } = useI18n()
  const ui = checkoutUiCopy(locale)
  const moneyBack = moneyBackCopy(locale)
  const lineItems = funnelCheckoutLineItems(locale)
  usePageTitle(ui.pageTitle)
  const { funnel = '28-day-ai-challenge' } = useParams()
  const [params] = useSearchParams()
  const [email, setEmail] = useState(() => params.get('email')?.trim() || resolveKnownEmail(params) || '')
  const name = params.get('name') ?? ''
  const [emailError, setEmailError] = useState<string | null>(null)
  const [showPayment, setShowPayment] = useState(false)

  if (!ORIGINAL_CHECKOUT_FUNNELS.has(funnel)) return <NotFoundPage />

  const startPayment = () => {
    if (!email.trim()) {
      setEmailError(ui.emailRequired)
      return
    }
    if (!EMAIL_OK.test(email.trim())) {
      setEmailError(ui.emailInvalid)
      return
    }
    setEmailError(null)
    rememberCheckoutEmail(email)
    setShowPayment(true)
  }

  return (
    <div className="min-h-dvh overflow-x-hidden bg-white">
      <div className="mx-auto max-w-lg overflow-hidden px-4 pt-8 pb-8">
        <h1 className="mb-2 text-center text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
          {ui.funnelJoinTitle}
        </h1>

        <div
          className="mt-5 mb-5 flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3"
          style={{
            borderColor: 'hsl(var(--sw-success))',
            backgroundColor: 'hsl(142 71% 97%)',
          }}
        >
          <div
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-lg text-white"
            style={{ backgroundColor: 'hsl(var(--sw-success))' }}
          >
            🎁
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-sw-dark">{ui.promoApplied}</p>
            <p className="text-xs text-sw-grey">{ui.youSavePercent(75)}</p>
          </div>
          <div
            className="flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-full text-center text-xs leading-tight font-extrabold text-white"
            style={{ backgroundColor: 'hsl(var(--sw-success))' }}
          >
            75%
            <br />
            {ui.off}
          </div>
        </div>

        <div className="mb-4 overflow-hidden rounded-2xl border border-sw-grey-border bg-white shadow-sm">
          <div className="px-5 pt-5 pb-4">
            <h2 className="mb-4 text-center text-lg font-extrabold text-sw-dark">{ui.safeCheckout}</h2>
            <div className="mb-3 space-y-2.5">
              {lineItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3">
                  <span className="text-sm text-sw-dark">{item.label}</span>
                  <span
                    className="text-sm font-semibold"
                    style={{
                      color:
                        item.emphasis === 'success' ? 'hsl(var(--sw-success))' : 'hsl(var(--sw-dark))',
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mb-1 border-t border-sw-grey-border pt-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-extrabold text-sw-dark">{ui.dueTodayLower}</span>
                <span className="text-xl font-extrabold text-sw-dark">$1</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-sw-grey">{funnelCheckoutTrialNote(locale)}</p>
              <p className="mt-2 text-xs leading-relaxed text-sw-grey">{ui.riskFreeIncluded(moneyBack.chip)}</p>
            </div>
          </div>

          <div className="px-5 pb-5">
            {showPayment ? (
              <InlineTrialCheckout
                framed={false}
                email={email.trim()}
                name={name}
                productId={MONTHLY_ID}
                funnel={funnel}
                percentOff={75}
                onSuccess={() => {
                  window.location.href = withLocale(locale, `/checkout/setup?trial=1&funnel=${encodeURIComponent(funnel)}`)
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
                  className="w-full rounded-xl border border-sw-grey-border px-4 py-3 text-base text-sw-dark focus:border-sw-blue focus:ring-1 focus:ring-sw-blue focus:outline-none"
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
                  className="flex w-full cursor-pointer items-center justify-center rounded-xl py-3.5 text-base font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ backgroundColor: 'hsl(var(--sw-blue))' }}
                >
                  {ui.continueToPaymentLower}
                </button>
                <p className="text-center text-xs leading-relaxed text-sw-grey">{ui.receiptBlurb}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pb-6 text-xs text-sw-grey">
          <span>{ui.encrypted256}</span>
          <span>{ui.cancelAnyTime}</span>
          <span>✓ {moneyBack.chip}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-sw-grey">
          <Link to={withLocale(locale, ROUTES.terms)} className="hover:text-sw-dark">
            {ui.terms}
          </Link>
          <Link to={withLocale(locale, ROUTES.privacy)} className="hover:text-sw-dark">
            {ui.privacy}
          </Link>
          <Link to={withLocale(locale, ROUTES.refund)} className="hover:text-sw-dark">
            {ui.refunds}
          </Link>
          <Link to={withLocale(locale, ROUTES.subscription)} className="hover:text-sw-dark">
            {ui.subscriptionTerms}
          </Link>
        </div>
      </div>
    </div>
  )
}
