import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import usePageTitle from '@/marketing/hooks/usePageTitle'
import { rememberCheckoutEmail, resolveKnownEmail } from '@/shared/lib/checkoutSession'

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PAGE_TITLE = 'MindoraAcademy.com — Turn Daily Learning Into Daily Progress'

export default function CheckoutSetupPage() {
  usePageTitle(PAGE_TITLE)
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
      setError('Please enter a valid email address.')
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
    setError('Invalid or expired code. Please try again.')
  }

  if (step === 'code') {
    return (
      <div className="flex min-h-dvh flex-col overflow-x-hidden bg-white">
        <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-12 pb-16">
          <div className="animate-fade-up">
            <div className="mb-6 text-center text-4xl">🎉</div>
            <h1 className="mb-3 text-center text-3xl leading-tight font-extrabold text-sw-dark">
              Check your inbox
            </h1>
            <p className="mb-8 text-center text-sm leading-relaxed text-sw-grey">
              We sent a 6-digit code to <span className="font-semibold text-sw-dark">{email}</span>
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
              placeholder="000000"
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
              Didn&apos;t receive it? <span className="font-semibold text-sw-blue">Send again</span>
            </button>
            <button
              type="button"
              onClick={() => void verifyCode()}
              disabled={busy || code.length < 6}
              className="mt-6 w-full rounded-xl bg-sw-blue py-3.5 text-base font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? 'Verifying…' : 'Continue'}
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
            You&apos;re in! Set up your account
          </h1>
          <p className="mb-6 text-center text-sm leading-relaxed text-sw-grey">
            Enter the email you&apos;d like to use for your account. We&apos;ll send a quick verification
            code.
          </p>
          <div
            className="mb-6 rounded-xl px-4 py-3 text-sm leading-relaxed text-sw-dark"
            style={{ backgroundColor: 'hsl(38 92% 95%)', border: '1px solid hsl(38 92% 80%)' }}
          >
            ⚠️ All login codes and course access emails will be sent to this address. Make sure it&apos;s
            an email you can access.
          </div>
          <label className="mb-2 block text-sm font-medium text-sw-dark">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void sendCode()
            }}
            placeholder="you@email.com"
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
            {busy ? 'Sending…' : 'Continue'}
          </button>
          <p className="mt-4 text-center text-xs leading-relaxed text-sw-grey">
            We&apos;ll send a 6-digit code to verify your email. No password needed.
          </p>
        </div>
      </main>
    </div>
  )
}
