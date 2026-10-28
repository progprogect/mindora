import { useState } from 'react'
import { Link } from 'react-router-dom'
import { withLocale } from '../../../authorisation/src/i18n/locale'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'
import { ROUTES } from '@/marketing/data/nav'
import { useCreateQuizCheckout } from '@/shared/lib/backend'
import { getCheckoutSessionKey } from '@/shared/lib/checkoutSession'
import { trackEvent } from '@/shared/lib/tracking'

interface QuizHostedCheckoutProps {
  quiz: 'claudecert' | 'challenge'
  funnel: string
  email: string
  name?: string | null
  highlights: string[]
}

const COPY = {
  en: {
    title: 'Get your plan for $1',
    cta: 'Continue to secure checkout — $1 →',
    note: 'One-time payment of $1 — no subscription is started.',
    redirecting: 'Redirecting to secure checkout…',
    error: 'Could not start checkout. Please try again.',
    terms: 'Terms',
    privacy: 'Privacy',
    refunds: 'Refunds',
  },
  ru: {
    title: 'Получите свой план за $1',
    cta: 'Перейти к безопасной оплате — $1 →',
    note: 'Разовый платёж $1 — подписка не оформляется.',
    redirecting: 'Переходим к безопасной оплате…',
    error: 'Не удалось начать оплату. Попробуйте ещё раз.',
    terms: 'Условия',
    privacy: 'Конфиденциальность',
    refunds: 'Возвраты',
  },
} as const

/** Payment block for the `-long` quiz variants: no card fields, hands off to Stripe Checkout. */
export default function QuizHostedCheckout({ quiz, funnel, email, name, highlights }: QuizHostedCheckoutProps) {
  const { locale } = useI18n()
  const copy = COPY[locale === 'ru' ? 'ru' : 'en']
  const createQuizCheckout = useCreateQuizCheckout()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const start = async () => {
    if (busy) return
    setBusy(true)
    setError(null)
    trackEvent('CheckoutStarted', { funnel, variant: 'oneoff' })
    try {
      const { url } = await createQuizCheckout({
        quiz,
        quiz_session_id: getCheckoutSessionKey(),
        name: name?.trim() || undefined,
        email: email.trim() || undefined,
        lang: locale === 'ru' ? 'ru' : 'en',
        utm: window.location.search || undefined,
      })
      window.location.href = url
    } catch {
      setError(copy.error)
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 pb-6">
      <div className="mb-5 rounded-2xl border border-sw-grey-border p-5">
        <h2 className="mb-4 text-center text-lg font-extrabold text-sw-dark">{copy.title}</h2>
        <ul className="mb-5 space-y-2">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-sw-dark">
              <span className="font-bold text-sw-success">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {error ? (
          <p
            className="mb-3 rounded-lg px-3 py-2 text-center text-sm font-medium"
            style={{ backgroundColor: 'hsl(0 80% 97%)', color: 'hsl(0 70% 45%)' }}
          >
            {error}
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => void start()}
          disabled={busy}
          className="flex w-full cursor-pointer items-center justify-center rounded-xl py-3.5 text-base font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
          style={{ backgroundColor: 'hsl(var(--sw-blue))' }}
        >
          {busy ? copy.redirecting : copy.cta}
        </button>
        <p className="mt-3 text-center text-xs leading-relaxed text-sw-grey">{copy.note}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-sw-grey">
        <Link to={withLocale(locale, ROUTES.terms)} className="hover:text-sw-dark">
          {copy.terms}
        </Link>
        <Link to={withLocale(locale, ROUTES.privacy)} className="hover:text-sw-dark">
          {copy.privacy}
        </Link>
        <Link to={withLocale(locale, ROUTES.refund)} className="hover:text-sw-dark">
          {copy.refunds}
        </Link>
      </div>
    </div>
  )
}
