import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import usePageTitle from '@/marketing/hooks/usePageTitle'
import { rememberCheckoutEmail, resolveKnownEmail } from '@/shared/lib/checkoutSession'
import { useI18n } from '../../authorisation/src/i18n/I18nProvider'
import { checkoutUiCopy } from '@/shared/i18n/checkoutUiCopy'

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function CheckoutSetupPage() {
  const { locale } = useI18n()
  const ui = checkoutUiCopy(locale)
  usePageTitle(ui.pageTitle)
  const [params] = useSearchParams()
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [email, setEmail] = useState(() => params.get('email')?.trim() || resolveKnownEmail(params) || '')
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [step])

  const sendCode = async () => {
    if (!email.trim() || busy) return
    setError(null)
    setBusy(true)
    await new Promise((r) => setTimeout(r, 500))
    setBusy(false)
    if (!EMAIL_OK.test(email.trim())) {
      setError(ui.emailInvalid)
      return
    }
    rememberCheckoutEmail(email)
    setStep('code')
  }

  const verifyCode = async () => {
    if (!code || busy) return
    setError(null)
    setBusy(true)
    await new Promise((r) => setTimeout(r, 500))
    setBusy(false)
    setError(ui.verifyCodeError)
  }

  if (step === 'code') {
    return (
      <div className="flex min-h-dvh flex-col overflow-x-hidden bg-white">
        <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-12 pb-16">
          <div className="animate-fade-up">
            <div className="mb-6 text-center text-4xl">🎉</div>
            <h1 className="mb-3 text-center text-3xl leading-tight font-extrabold text-sw-dark">
              {ui.checkInbox}
            </h1>
            <p className="mb-8 text-center text-sm leading-relaxed text-sw-grey">
              {ui.sentCodeTo} <span className="font-semibold text-sw-dark">{email}</span>
            </p>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d{6}"
              maxLength={6}
              value={code}
              onChange={(e) => {
                const next = e.target.value.replace(/\D/g, '')
                setCode(next)
                if (next.length === 6) setError(null)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && code.length === 6) void verifyCode()
              }}
              placeholder={ui.codePlaceholder}
              disabled={busy}
              autoFocus
              className="w-full rounded-2xl border-2 border-sw-grey-border bg-white px-5 py-4 text-center text-3xl font-bold tracking-[0.5em] text-sw-dark transition-colors placeholder:font-normal placeholder:tracking-normal placeholder:text-sw-grey/30 focus:border-sw-blue focus:outline-none"
            />
            {error ? <p className="mt-3 text-center text-sm text-red-500">{error}</p> : null}
            <button
              type="button"
              onClick={() => {
                setStep('email')
                setCode('')
                setError(null)
              }}
              disabled={busy}
              className="mt-6 w-full text-center text-sm text-sw-grey"
            >
              {ui.didntReceive} <span className="font-semibold text-sw-blue">{ui.sendAgain}</span>
            </button>
            <button
              type="button"
              onClick={() => void verifyCode()}
              disabled={busy || code.length < 6}
              className="mt-6 w-full rounded-xl bg-sw-blue py-3.5 text-base font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? ui.verifying : ui.continue}
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden bg-white">
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-12 pb-16">
        <div className="animate-fade-up">
          <div className="mb-6 text-center text-4xl">🎉</div>
          <h1 className="mb-3 text-center text-3xl leading-tight font-extrabold text-sw-dark">
            {ui.setupTitle}
          </h1>
          <p className="mb-6 text-center text-sm leading-relaxed text-sw-grey">{ui.setupBlurb}</p>
          <div
            className="mb-6 rounded-xl px-4 py-3 text-sm leading-relaxed text-sw-dark"
            style={{ backgroundColor: 'hsl(38 92% 95%)', border: '1px solid hsl(38 92% 80%)' }}
          >
            {ui.emailWarning}
          </div>
          <label className="mb-2 block text-sm font-medium text-sw-dark">{ui.emailAddress}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void sendCode()
            }}
            placeholder={ui.emailPlaceholder}
            disabled={busy}
            autoFocus
            className="w-full rounded-xl border border-sw-grey-border px-4 py-3 text-base text-sw-dark focus:border-sw-blue focus:ring-1 focus:ring-sw-blue focus:outline-none"
          />
          {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
          <button
            type="button"
            onClick={() => void sendCode()}
            disabled={busy || !email.trim()}
            className="mt-5 w-full rounded-xl bg-sw-blue py-3.5 text-base font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy ? ui.sending : ui.continue}
          </button>
          <p className="mt-4 text-center text-xs leading-relaxed text-sw-grey">{ui.codeHint}</p>
        </div>
      </main>
    </div>
  )
}
