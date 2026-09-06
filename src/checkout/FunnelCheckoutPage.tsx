import { useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ROUTES } from '@/marketing/data/nav'
import usePageTitle from '@/marketing/hooks/usePageTitle'
import NotFoundPage from '@/marketing/pages/NotFoundPage'
import InlineTrialCheckout from '@/shared/components/InlineTrialCheckout'
import { DEFAULT_PLANS } from '@/funnels/twenty-eight-day/data/plans'
import { rememberCheckoutEmail, resolveKnownEmail } from '@/shared/lib/checkoutSession'

const ORIGINAL_CHECKOUT_FUNNELS = new Set([
  '28-day-ai-challenge',
  'claude-ai-certification',
  'master-claude-ai-excel',
  'success-assessment',
])

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PAGE_TITLE = 'MindoraAcademy.com — Turn Daily Learning Into Daily Progress'
const MONTHLY_ID = DEFAULT_PLANS.find((p) => p.intervalMonths === 1)?.id ?? 'monthly'

const LINE_ITEMS = [
  { label: '7-Day Trial', value: '$1', emphasis: 'dark' as const },
  { label: 'Full 28-day AI Challenge', value: 'Included', emphasis: 'success' as const },
  { label: 'All courses + 45 certificates', value: 'Included', emphasis: 'success' as const },
  { label: 'Wise, your AI coach', value: 'Included', emphasis: 'success' as const },
]

export default function FunnelCheckoutPage() {
  usePageTitle(PAGE_TITLE)
  const { funnel = '28-day-ai-challenge' } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [email, setEmail] = useState(() => params.get('email')?.trim() || resolveKnownEmail(params) || '')
  const name = params.get('name') ?? ''
  const [emailError, setEmailError] = useState<string | null>(null)
  const [showPayment, setShowPayment] = useState(false)

  if (!ORIGINAL_CHECKOUT_FUNNELS.has(funnel)) return <NotFoundPage />

  const startPayment = () => {
    if (!email.trim()) {
      setEmailError('Please enter your email address.')
      return
    }
    if (!EMAIL_OK.test(email.trim())) {
      setEmailError('Please enter a valid email address.')
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
          Join the challenge and start today
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
            <p className="text-sm font-bold text-sw-dark">
              Promo Code <span style={{ color: 'hsl(var(--sw-success))' }}>TRIAL1</span> Applied
            </p>
            <p className="text-xs text-sw-grey">You save 75% today</p>
          </div>
          <div
            className="flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-full text-center text-xs leading-tight font-extrabold text-white"
            style={{ backgroundColor: 'hsl(var(--sw-success))' }}
          >
            75%
            <br />
            OFF
          </div>
        </div>

        <div className="mb-4 overflow-hidden rounded-2xl border border-sw-grey-border bg-white shadow-sm">
          <div className="px-5 pt-5 pb-4">
            <h2 className="mb-4 text-center text-lg font-extrabold text-sw-dark">Safe checkout</h2>
            <div className="mb-3 space-y-2.5">
              {LINE_ITEMS.map((item) => (
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
                <span className="text-base font-extrabold text-sw-dark">Due today</span>
                <span className="text-xl font-extrabold text-sw-dark">$1</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-sw-grey">
                Then $29.99 per month after your 7-day trial. Cancel any time from your profile page.
              </p>
              <p className="mt-2 text-xs leading-relaxed text-sw-grey">
                Risk-free 30-day money-back guarantee included.
              </p>
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
                  navigate(`/checkout/setup?trial=1&funnel=${encodeURIComponent(funnel)}`)
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
                  Continue to payment
                </button>
                <p className="text-center text-xs leading-relaxed text-sw-grey">
                  We use this to send your receipt and set up your account.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pb-6 text-xs text-sw-grey">
          <span>🔒 256-bit encrypted</span>
          <span>✓ Cancel any time</span>
          <span>✓ 30-day money-back guarantee</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-sw-grey">
          <Link to={ROUTES.terms} className="hover:text-sw-dark">
            Terms
          </Link>
          <Link to={ROUTES.privacy} className="hover:text-sw-dark">
            Privacy
          </Link>
          <Link to={ROUTES.refund} className="hover:text-sw-dark">
            Refunds
          </Link>
          <Link to={ROUTES.subscription} className="hover:text-sw-dark">
            Subscription terms
          </Link>
        </div>
      </div>
    </div>
  )
}
