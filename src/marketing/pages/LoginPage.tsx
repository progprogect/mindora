import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/marketing/data/nav'
import usePageTitle from '@/marketing/hooks/usePageTitle'
import BrandWordmark from '@/shared/components/BrandWordmark'

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function LoginHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-sw-grey-border bg-white">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-center px-4">
        <BrandWordmark />
      </div>
    </header>
  )
}

function StickyCta({
  disabled,
  onClick,
  children,
}: {
  disabled: boolean
  onClick: () => void
  children: string
}) {
  return (
    <div
      className="fixed right-0 bottom-0 left-0 z-50 px-4 pt-10"
      style={{ background: 'linear-gradient(to bottom, transparent, white 45%)' }}
    >
      <div className="mx-auto max-w-lg">
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className="w-full rounded-full bg-sw-blue py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-sw-blue-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {children}
        </button>
      </div>
      <div
        style={{
          paddingTop: '56px',
          paddingBottom: 'env(safe-area-inset-bottom)',
          backgroundColor: 'white',
        }}
      />
    </div>
  )
}

export default function LoginPage() {
  usePageTitle('MindoraAcademy.com — Turn Daily Learning Into Daily Progress')
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [step])

  const sendCode = async () => {
    if (!email || busy) return
    setError(null)
    setBusy(true)
    await new Promise((r) => setTimeout(r, 500))
    setBusy(false)
    if (!EMAIL_OK.test(email)) {
      setError('Failed to send code. Please check your email and try again.')
      return
    }
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
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
        <LoginHeader />
        <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-12 pb-40">
          <div className="animate-fade-up">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sw-blue-light">
              <svg
                className="h-8 w-8 text-sw-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
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
            <p className="mt-4 rounded-xl bg-sw-blue-light/40 px-4 py-3 text-center text-xs leading-relaxed text-sw-grey/80">
              💡 Check your <span className="font-semibold text-sw-dark">spam or junk folder</span> for an
              email from MindoraAcademy.com — some email providers filter sign-in codes.
            </p>
          </div>
        </main>
        <StickyCta disabled={busy || code.length < 6} onClick={() => void verifyCode()}>
          {busy ? 'Signing in…' : 'Sign In'}
        </StickyCta>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <LoginHeader />
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-12 pb-40">
        <div className="animate-fade-up">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sw-blue-light">
            <svg
              className="h-8 w-8 text-sw-blue"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="mb-3 text-center text-3xl leading-tight font-extrabold text-sw-dark">
            Welcome back
          </h1>
          <p className="mb-10 text-center text-sm leading-relaxed text-sw-grey">
            Enter your email and we&apos;ll send a quick sign-in code — no password needed.
          </p>
          <label className="mb-2 block text-sm font-semibold text-sw-dark">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void sendCode()
            }}
            placeholder="you@example.com"
            required
            disabled={busy}
            autoFocus
            className="w-full rounded-2xl border-2 border-sw-grey-border bg-white px-5 py-4 text-base text-sw-dark transition-colors placeholder:text-sw-grey/60 focus:border-sw-blue focus:outline-none"
          />
          {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
          <p className="mt-6 text-center text-xs text-sw-grey">
            Don&apos;t have an account?{' '}
            <Link to={ROUTES.quiz28} className="font-semibold text-sw-blue">
              Take the quiz
            </Link>
          </p>
        </div>
      </main>
      <StickyCta disabled={busy || !EMAIL_OK.test(email)} onClick={() => void sendCode()}>
        {busy ? 'Sending code…' : 'Send Sign-In Code'}
      </StickyCta>
    </div>
  )
}
