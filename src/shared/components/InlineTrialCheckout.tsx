import { withLocale, type Locale } from '../../../authorisation/src/i18n/locale'
import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  ExpressCheckoutElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { getStripe, isStripeConfigured } from '@/shared/lib/stripeClient'
import { ALREADY_SUBSCRIBED_ERROR, useCreateTrialPaymentIntent } from '@/shared/lib/backend'
import { clearLocalCheckoutCompleted, markLocalCheckoutCompleted } from '@/shared/lib/checkoutSession'
import { defaultCheckoutHighlights } from '@/shared/lib/checkoutHighlights'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'
import { checkoutUiCopy, stripeDeclineMessage, type CheckoutUiCopy } from '@/shared/i18n/checkoutUiCopy'

interface InlineTrialCheckoutProps {
  email: string
  name?: string | null
  productId: string
  funnel: string
  percentOff?: number
  onSuccess: () => void
  submitLabel?: string
  /** When false, render card fields only (used on `/checkout?product=`). */
  framed?: boolean
  highlights?: string[]
  /** Post-payment path. Defaults to `/checkout/setup?trial=1&funnel=`. */
  returnPath?: string
}

const CARD_ELEMENT_STYLE = {
  style: {
    base: {
      fontSize: '16px',
      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
      color: '#1a1a2e',
      '::placeholder': { color: '#9ca3af' },
    },
    invalid: { color: '#dc2626' },
  },
}

const CARD_NUMBER_HINT = 'XXXX XXXX XXXX XXXX'

function messageForStripeError(
  ui: CheckoutUiCopy,
  locale: 'en' | 'ru',
  error: { code?: string; decline_code?: string; message?: string },
): string {
  const code = error.decline_code ?? error.code
  const decline = code ? stripeDeclineMessage(locale, code) : undefined
  if (decline) return decline
  if (locale === 'en' && error.message && error.message.length < 200) {
    return `${error.message}${ui.stripeErrorSuffix}`
  }
  return ui.paymentFailedGeneric
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

function CardBrandIcons() {
  return (
    <div className="pointer-events-none absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-1" aria-hidden>
      <img src="/assets/card-visa.svg" alt="Visa" width={34} height={22} className="rounded-sm" />
      <img src="/assets/card-mastercard.svg" alt="Mastercard" width={34} height={22} className="rounded-sm" />
      <img src="/assets/card-amex.svg" alt="Amex" width={34} height={22} className="rounded-sm" />
      <img src="/assets/card-discover.svg" alt="Discover" width={34} height={22} className="rounded-sm" />
    </div>
  )
}

function CvcIcon() {
  return (
    <div className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2" aria-hidden>
      <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.75" y="0.75" width="22.5" height="16.5" rx="2.25" stroke="#9CA3AF" strokeWidth="1.5" />
        <rect x="0.75" y="4" width="22.5" height="3.5" fill="#9CA3AF" />
        <text x="12" y="14" fontFamily="Arial,sans-serif" fontSize="5" fontWeight="bold" fill="#9CA3AF" textAnchor="middle">
          123
        </text>
      </svg>
    </div>
  )
}

function FieldSkeleton({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-lg">
      <div className="h-full w-full animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
    </div>
  )
}

function CardFieldShell({
  label,
  className,
  trailing,
  children,
}: {
  label: string
  className?: string
  trailing?: ReactNode
  children: ReactNode
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-sw-dark">{label}</label>
      <div
        className={`relative rounded-lg border border-gray-300 py-3 transition-colors focus-within:border-sw-blue focus-within:ring-1 focus-within:ring-sw-blue ${className ?? 'px-3'}`}
      >
        {children}
        {trailing}
      </div>
    </div>
  )
}

function CheckoutFooter({ ui }: { ui: CheckoutUiCopy }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'hsl(var(--sw-success))' }}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
        {ui.paySafeSecure}
      </p>
      <img src="/assets/pay-safe-strip.png" alt={ui.cardsAcceptedAlt} className="h-8 w-auto object-contain" />
      <div className="mt-2 flex items-center justify-center gap-4 text-xs text-sw-grey">
        <span className="flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          {ui.securePayment}
        </span>
        <span>{ui.instantAccess}</span>
        <span>{ui.cancelAnytime}</span>
      </div>
    </div>
  )
}

function CheckoutIntro({
  percentOff,
  highlights,
  ui,
}: {
  percentOff: number
  highlights: string[]
  ui: CheckoutUiCopy
}) {
  return (
    <>
      <div className="mb-4 flex flex-col gap-3">
        {highlights.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <CheckDot />
            <span className="text-sm leading-snug text-sw-dark">{item}</span>
          </div>
        ))}
        <div className="flex items-start gap-3">
          <CheckDot />
          <span className="text-sm leading-snug text-sw-dark">{ui.trialChargeBlurb}</span>
        </div>
      </div>
      <div className="my-4 border-t border-sw-grey-border" />
      <div
        className="mb-4 rounded-xl px-4 py-2.5 text-center"
        style={{ backgroundColor: 'hsl(142 71% 95%)', scrollMarginTop: 72 }}
      >
        <span className="text-sm font-semibold" style={{ color: 'hsl(var(--sw-success))' }}>
          {ui.planReadyBanner}
        </span>
      </div>
      <div
        className="mb-4 flex items-center gap-3 rounded-xl border-2 px-4 py-3"
        style={{ borderColor: 'hsl(var(--sw-success))', backgroundColor: 'hsl(142 71% 97%)' }}
      >
        <div
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: 'hsl(var(--sw-success))' }}
        >
          <span className="text-lg text-white">🎁</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-sw-dark">{ui.promoCodeApplied}</p>
          <p className="text-xs text-sw-grey">{ui.youSaveToday(percentOff)}</p>
        </div>
        <div
          className="h-12 w-12 flex-shrink-0 rounded-full text-center text-xs leading-tight font-extrabold text-white"
          style={{ backgroundColor: 'hsl(var(--sw-success))' }}
        >
          <span className="flex h-full flex-col items-center justify-center">
            {percentOff}%
            <br />
            {ui.off}
          </span>
        </div>
      </div>
      <div className="mb-5 flex items-center justify-between">
        <span className="text-base font-bold text-sw-dark">{ui.totalDue}</span>
        <div className="flex items-baseline gap-2">
          <span className="text-sm text-sw-grey line-through">$29.99</span>
          <span className="text-2xl font-extrabold text-sw-dark">$1</span>
          <span className="text-xs font-semibold" style={{ color: 'hsl(var(--sw-success))' }}>
            {ui.youSaveToday(percentOff)}
          </span>
        </div>
      </div>
    </>
  )
}

function StripeCardFields({
  ready,
  onNumberReady,
  onComplete,
  ui,
}: {
  ready: boolean
  onNumberReady: () => void
  onComplete: (field: 'number' | 'expiry' | 'cvc', complete: boolean) => void
  ui: CheckoutUiCopy
}) {
  return (
    <div className="space-y-3">
      <CardFieldShell label={ui.cardNumber} className="pr-[150px] pl-3" trailing={<CardBrandIcons />}>
        <FieldSkeleton show={!ready} />
        <div className="relative z-20 min-h-6">
          <CardNumberElement
            options={{
              ...CARD_ELEMENT_STYLE,
              placeholder: CARD_NUMBER_HINT,
            }}
            onReady={onNumberReady}
            onChange={(event) => onComplete('number', event.complete)}
          />
        </div>
      </CardFieldShell>
      <div className="grid grid-cols-2 gap-3">
        <CardFieldShell label={ui.expiryDate}>
          <FieldSkeleton show={!ready} />
          <div className="relative z-20 min-h-6">
            <CardExpiryElement
              options={CARD_ELEMENT_STYLE}
              onChange={(event) => onComplete('expiry', event.complete)}
            />
          </div>
        </CardFieldShell>
        <CardFieldShell label={ui.securityCode} className="pr-10 pl-3" trailing={<CvcIcon />}>
          <FieldSkeleton show={!ready} />
          <div className="relative z-20 min-h-6">
            <CardCvcElement options={CARD_ELEMENT_STYLE} onChange={(event) => onComplete('cvc', event.complete)} />
          </div>
        </CardFieldShell>
      </div>
    </div>
  )
}

function ConfirmButton({
  submitting,
  ready,
  canSubmit,
  label,
  ui,
}: {
  submitting: boolean
  ready: boolean
  canSubmit: boolean
  label: string
  ui: CheckoutUiCopy
}) {
  return (
    <button
      type="submit"
      disabled={submitting || !canSubmit}
      className="mt-5 w-full rounded-full bg-sw-blue py-4 text-base font-extrabold tracking-wide text-white uppercase shadow-lg transition-all hover:bg-sw-blue-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {submitting ? (
        <span className="flex items-center justify-center gap-2">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          {ui.processing}
        </span>
      ) : ready ? (
        label
      ) : (
        <span className="flex items-center justify-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
          {ui.loadingPaymentForm}
        </span>
      )}
    </button>
  )
}

function defaultSetupPath(funnel: string, locale: Locale): string {
  return withLocale(locale, `/checkout/setup?trial=1&funnel=${encodeURIComponent(funnel)}`)
}

function CardOrPayDivider({ ui }: { ui: CheckoutUiCopy }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="h-px flex-1 bg-sw-grey-border" />
      <span className="text-xs font-medium text-sw-grey">{ui.orPayWithCard}</span>
      <div className="h-px flex-1 bg-sw-grey-border" />
    </div>
  )
}

function toAbsoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${window.location.origin}${path.startsWith('/') ? path : `/${path}`}`
}

function CheckoutForm({
  email,
  name,
  funnel,
  onSuccess,
  submitLabel,
  clientSecret,
  returnPath,
  ui,
  locale,
}: InlineTrialCheckoutProps & { clientSecret: string; ui: CheckoutUiCopy; locale: 'en' | 'ru' }) {
  const stripe = useStripe()
  const elements = useElements()
  const resolvedSubmitLabel = submitLabel ?? ui.confirmPaymentDefault
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expressReady, setExpressReady] = useState(false)
  const [cardReady, setCardReady] = useState(false)
  const [complete, setComplete] = useState({ number: false, expiry: false, cvc: false })

  const setupUrl = toAbsoluteUrl(returnPath ?? defaultSetupPath(funnel, locale))

  useEffect(() => {
    if (cardReady) return
    const timeout = window.setTimeout(() => setCardReady(true), 10_000)
    return () => window.clearTimeout(timeout)
  }, [cardReady])

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return
    const cardNumber = elements.getElement(CardNumberElement)
    if (!cardNumber) {
      setError(ui.cardFormNotFound)
      return
    }

    setSubmitting(true)
    setError(null)

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumber,
        billing_details: { email, name: name || undefined },
      },
    })

    if (confirmError) {
      setError(messageForStripeError(ui, locale, confirmError))
      setSubmitting(false)
      return
    }

    if (paymentIntent?.status === 'succeeded') {
      onSuccess()
      return
    }

    if (paymentIntent?.status === 'requires_action') {
      setError(ui.authRequired)
      setSubmitting(false)
      return
    }

    setError(ui.paymentNotCompleted)
    setSubmitting(false)
  }

  const canSubmit = Boolean(stripe && elements && cardReady && complete.number && complete.expiry && complete.cvc)

  return (
    <div>
      <div
        className={expressReady ? 'mb-4' : 'pointer-events-none h-0 overflow-hidden'}
        aria-hidden={!expressReady}
      >
        <ExpressCheckoutElement
          options={{
            buttonType: { applePay: 'buy', googlePay: 'buy' },
            buttonHeight: 48,
            paymentMethods: { link: 'never' },
          }}
          onReady={(event) => {
            const methods = event.availablePaymentMethods
            setExpressReady(Boolean(methods && (methods.applePay || methods.googlePay || methods.link)))
          }}
          onConfirm={async () => {
            if (!stripe || !elements) return
            setSubmitting(true)
            setError(null)
            const { error: confirmError } = await stripe.confirmPayment({
              elements,
              clientSecret,
              confirmParams: {
                return_url: setupUrl,
                payment_method_data: { billing_details: { email, name: name || undefined } },
              },
              redirect: 'if_required',
            })
            if (confirmError) {
              setError(messageForStripeError(ui, locale, confirmError))
              setSubmitting(false)
              return
            }
            onSuccess()
          }}
        />
      </div>

      <form onSubmit={handleCardSubmit}>
        {expressReady ? <CardOrPayDivider ui={ui} /> : null}

        <StripeCardFields
          ready={cardReady}
          onNumberReady={() => setCardReady(true)}
          onComplete={(field, value) => setComplete((prev) => ({ ...prev, [field]: value }))}
          ui={ui}
        />

        {error ? (
          <div className="mt-4 animate-fade-in rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm leading-snug font-semibold text-red-800">{error}</p>
          </div>
        ) : null}

        <ConfirmButton
          submitting={submitting}
          ready={cardReady}
          canSubmit={canSubmit}
          label={resolvedSubmitLabel}
          ui={ui}
        />

        <p className="mt-3 text-center text-[11px] leading-relaxed text-sw-grey">{ui.scalionTerms}</p>
      </form>
    </div>
  )
}

function PaymentUnavailableNotice({ ui }: { ui: CheckoutUiCopy }) {
  return (
    <div className="rounded-xl border border-sw-grey-border bg-sw-grey-light px-4 py-3 text-center">
      <p className="text-sm font-semibold text-sw-dark">{ui.paymentUnavailable}</p>
      <p className="mt-1 text-xs leading-relaxed text-sw-grey">{ui.paymentUnavailableBlurb}</p>
    </div>
  )
}

function AlreadyMemberNotice({ setupPath, ui }: { setupPath: string; ui: CheckoutUiCopy }) {
  const { locale } = useI18n()
  return (
    <div className="rounded-2xl border border-sw-grey-border bg-white p-5 text-center">
      <p className="text-base font-extrabold text-sw-dark">{ui.alreadyMemberTitle}</p>
      <p className="mt-2 text-sm leading-relaxed text-sw-grey">{ui.alreadyMemberBlurb}</p>
      <div className="mt-4 flex flex-col gap-2">
        <Link
          to={withLocale(locale, "/login")}
          className="inline-flex w-full items-center justify-center rounded-full bg-sw-blue py-3 text-sm font-extrabold tracking-wide text-white uppercase transition-all hover:bg-sw-blue-hover active:scale-[0.98]"
        >
          {ui.logIn}
        </Link>
        <Link to={setupPath} className="text-sm font-semibold text-sw-blue hover:underline">
          {ui.continueToAccount}
        </Link>
      </div>
    </div>
  )
}

function CheckoutFrame({
  percentOff,
  highlights,
  children,
  ui,
}: {
  percentOff: number
  highlights: string[]
  children: ReactNode
  ui: CheckoutUiCopy
}) {
  return (
    <div className="mx-auto max-w-lg px-4 pb-6">
      <div className="mb-5 rounded-2xl border border-sw-grey-border p-5">
        <CheckoutIntro percentOff={percentOff} highlights={highlights} ui={ui} />
        {children}
      </div>
      <CheckoutFooter ui={ui} />
    </div>
  )
}

export default function InlineTrialCheckout({
  email,
  name,
  productId,
  funnel,
  percentOff = 97,
  onSuccess,
  submitLabel,
  framed = true,
  highlights,
  returnPath,
}: InlineTrialCheckoutProps) {
  const { locale } = useI18n()
  const ui = checkoutUiCopy(locale)
  const resolvedHighlights = highlights ?? defaultCheckoutHighlights(locale)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [alreadyMember, setAlreadyMember] = useState(false)
  const createTrialPaymentIntent = useCreateTrialPaymentIntent()
  const setupPath = returnPath ?? defaultSetupPath(funnel, locale)

  useEffect(() => {
    if (!isStripeConfigured) return
    let cancelled = false

    createTrialPaymentIntent({ email, productId, funnel })
      .then((res) => {
        if (cancelled) return
        clearLocalCheckoutCompleted()
        setAlreadyMember(false)
        setClientSecret(res.clientSecret)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        if (err instanceof Error && err.message === ALREADY_SUBSCRIBED_ERROR) {
          setAlreadyMember(true)
          return
        }
        setError(ui.couldNotStartCheckout)
      })

    return () => {
      cancelled = true
    }
  }, [createTrialPaymentIntent, email, productId, funnel])

  const handleSuccess = () => {
    markLocalCheckoutCompleted()
    onSuccess()
  }

  const wrap = (children: ReactNode) =>
    framed ? (
      <CheckoutFrame percentOff={percentOff} highlights={resolvedHighlights} ui={ui}>
        {children}
      </CheckoutFrame>
    ) : (
      children
    )

  if (alreadyMember) {
    return (
      <div className={framed ? 'mx-auto max-w-lg px-4 pb-6' : ''}>
        <AlreadyMemberNotice setupPath={setupPath} ui={ui} />
      </div>
    )
  }

  if (error) {
    return (
      <div className={framed ? 'mx-auto max-w-lg px-4' : ''}>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center">
          <p className="text-sm font-semibold text-red-600">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-3 text-sm font-bold text-sw-blue underline"
          >
            {ui.retry}
          </button>
        </div>
      </div>
    )
  }

  if (!isStripeConfigured) {
    return wrap(<PaymentUnavailableNotice ui={ui} />)
  }

  if (!clientSecret) {
    return (
      <div className={framed ? 'mx-auto max-w-lg px-4 pb-6' : 'py-6'}>
        <div className="flex flex-col items-center py-10">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-sw-blue border-t-transparent" />
          <p className="mt-3 text-sm text-sw-grey">{ui.loadingPaymentForm}</p>
        </div>
      </div>
    )
  }

  return wrap(
    <Elements
      stripe={getStripe()}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: 'hsl(221, 83%, 53%)',
            borderRadius: '12px',
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
          },
        },
      }}
    >
      <CheckoutForm
        email={email}
        name={name}
        productId={productId}
        funnel={funnel}
        returnPath={setupPath}
        onSuccess={handleSuccess}
        submitLabel={submitLabel}
        clientSecret={clientSecret}
        ui={ui}
        locale={locale}
      />
    </Elements>,
  )
}
