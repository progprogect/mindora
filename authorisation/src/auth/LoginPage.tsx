import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Authenticated, AuthLoading, Unauthenticated } from '@/auth/authGates'
import AuthSpinner from '@/auth/AuthSpinner'
import { useCurrentUser, useSession } from '@/auth/session'
import { apiErrorMessage, sendOtp, verifyOtp } from '@/lib/api'
import LanguageSwitcher from '@/i18n/LanguageSwitcher'
import { useI18n } from '@/i18n/I18nProvider'
import { withLocale } from '@/i18n/locale'
import BrandWordmark from '@/shared/BrandWordmark'

function WordmarkHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-sw-grey-border">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        <BrandWordmark />
        <LanguageSwitcher />
      </div>
    </header>
  )
}

function PostAuthRedirect() {
  const navigate = useNavigate()
  const user = useCurrentUser()
  const { locale, t } = useI18n()
  useEffect(() => {
    if (user === undefined) return
    if (user?.onboardingComplete) navigate(withLocale(locale, '/app/dashboard'), { replace: true })
    else navigate(withLocale(locale, '/account/onboard'), { replace: true })
  }, [user, navigate])
  return <AuthSpinner message={t('auth.signingIn')} />
}

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function LoginForm() {
  const { refresh } = useSession()
  const { locale, t } = useI18n()
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [email, setEmail] = useState(() => {
    try {
      return localStorage.getItem('sw_login_email') || localStorage.getItem('sw_checkout_email') || ''
    } catch {
      return ''
    }
  })
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const autoVerify = useRef('')

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [step])

  const emailValid = EMAIL_OK.test(email.trim())

  const sendCode = async () => {
    if (!emailValid || busy) return
    setError(null)
    setBusy(true)
    try {
      await sendOtp(email, locale)
      try {
        window.localStorage.setItem('sw_checkout_email', email.trim())
        window.localStorage.setItem('sw_login_email', email.trim())
      } catch {
        /* ignore */
      }
      setStep('code')
    } catch (err) {
      setError(apiErrorMessage(err, t, t('auth.errSendCode')))
    } finally {
      setBusy(false)
    }
  }

  const verifyCode = async () => {
    if (!code || busy) return
    setError(null)
    setBusy(true)
    try {
      await verifyOtp(email, code)
      await refresh()
    } catch (err) {
      setError(apiErrorMessage(err, t, t('auth.errInvalidCode')))
    } finally {
      setBusy(false)
    }
  }

  const resendCode = async () => {
    if (!emailValid || busy) return
    setError(null)
    setCode('')
    autoVerify.current = ''
    setBusy(true)
    try {
      await sendOtp(email, locale)
    } catch (err) {
      setError(apiErrorMessage(err, t, t('auth.errSendCode')))
    } finally {
      setBusy(false)
    }
  }

  useEffect(() => {
    if (step !== 'code' || code.length !== 6 || busy) return
    if (autoVerify.current === code) return
    autoVerify.current = code
    void verifyCode()
  }, [code, step, busy])

  if (step === 'code') {
    return (
      <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
        <WordmarkHeader />
        <main className="flex-1 flex flex-col px-4 pt-12 pb-40 max-w-lg mx-auto w-full">
          <div className="animate-fade-up">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-sw-blue-light flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-sw-blue"
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
            <h1 className="text-3xl font-extrabold text-sw-dark text-center leading-tight mb-3">
              {t('auth.checkInbox')}
            </h1>
            <p className="text-sm text-sw-grey text-center mb-8 leading-relaxed">
              {t('auth.codeSentTo')}{' '}
              <span className="font-semibold text-sw-dark">{email}</span>
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
              placeholder={t('auth.codePlaceholder')}
              disabled={busy}
              autoFocus
              className="w-full border-2 border-sw-grey-border rounded-2xl px-5 py-4 text-3xl font-bold text-sw-dark text-center tracking-[0.5em] placeholder:text-sw-grey/30 placeholder:font-normal placeholder:tracking-normal focus:outline-none focus:border-sw-blue transition-colors bg-white"
            />
            {error ? <p className="mt-3 text-sm text-red-500 text-center">{error}</p> : null}
            <button
              type="button"
              onClick={() => void resendCode()}
              disabled={busy}
              className="mt-6 text-sm text-sw-grey text-center w-full"
            >
              {t('auth.didntReceive')}{' '}
              <span className="text-sw-blue font-semibold">{t('auth.sendAgain')}</span>
            </button>
            <p className="mt-4 text-xs text-sw-grey/80 text-center leading-relaxed bg-sw-blue-light/40 rounded-xl px-4 py-3">
              {t('auth.spamTipBefore')}{' '}
              <span className="font-semibold text-sw-dark">{t('auth.spamOrJunk')}</span>{' '}
              {t('auth.spamTipAfter')}
            </p>
          </div>
        </main>
        <div
          className="fixed bottom-0 left-0 right-0 px-4 pt-10 z-50"
          style={{ background: 'linear-gradient(to bottom, transparent, white 45%)' }}
        >
          <div className="max-w-lg mx-auto">
            <button
              type="button"
              onClick={() => void verifyCode()}
              disabled={busy || code.length < 6}
              className="w-full bg-sw-blue hover:bg-sw-blue-hover text-white font-bold py-4 rounded-full text-base transition-all active:scale-[0.98] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {busy && code.length === 6 ? t('auth.signingIn') : t('auth.signIn')}
            </button>
          </div>
          <div
            style={{
              paddingTop: 56,
              paddingBottom: 'env(safe-area-inset-bottom)',
              backgroundColor: 'white',
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      <WordmarkHeader />
      <main className="flex-1 flex flex-col px-4 pt-12 pb-40 max-w-lg mx-auto w-full">
        <div className="animate-fade-up">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-sw-blue-light flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-sw-blue"
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
          <h1 className="text-3xl font-extrabold text-sw-dark text-center leading-tight mb-3">
            {t('auth.welcomeBack')}
          </h1>
          <p className="text-sm text-sw-grey text-center mb-10 leading-relaxed">
            {t('auth.emailIntro')}
          </p>
          <label className="block text-sm font-semibold text-sw-dark mb-2">{t('auth.emailLabel')}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void sendCode()
            }}
            placeholder={t('auth.emailPlaceholder')}
            required
            disabled={busy}
            autoFocus
            className="w-full border-2 border-sw-grey-border rounded-2xl px-5 py-4 text-base text-sw-dark placeholder:text-sw-grey/60 focus:outline-none focus:border-sw-blue transition-colors bg-white"
          />
          {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
          <p className="mt-6 text-xs text-sw-grey text-center">
            {t('auth.noAccount')}{' '}
            <Link to={withLocale(locale, "/quiz/28-day-ai-challenge")} className="text-sw-blue font-semibold">
              {t('auth.takeQuiz')}
            </Link>
          </p>
        </div>
      </main>
      <div
        className="fixed bottom-0 left-0 right-0 px-4 pt-10 z-50"
        style={{ background: 'linear-gradient(to bottom, transparent, white 45%)' }}
      >
        <div className="max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => void sendCode()}
            disabled={busy || !emailValid}
            className="w-full bg-sw-blue hover:bg-sw-blue-hover text-white font-bold py-4 rounded-full text-base transition-all active:scale-[0.98] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {busy ? t('auth.sendingCode') : t('auth.sendSignInCode')}
          </button>
        </div>
        <div
          style={{
            paddingTop: 56,
            paddingBottom: 'env(safe-area-inset-bottom)',
            backgroundColor: 'white',
          }}
        />
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <>
      <AuthLoading>
        <AuthSpinner />
      </AuthLoading>
      <Unauthenticated>
        <LoginForm />
      </Unauthenticated>
      <Authenticated>
        <PostAuthRedirect />
      </Authenticated>
    </>
  )
}
