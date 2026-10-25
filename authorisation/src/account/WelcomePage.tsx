import { useEffect, useState } from 'react'
import { Authenticated, AuthLoading, Unauthenticated } from '@/auth/authGates'
import { useCurrentUser } from '@/auth/session'
import { track } from '@/lib/track'
import BrandWordmark from '@/shared/BrandWordmark'
import { COMPANY } from '@/shared/company'
import { useI18n } from '@/i18n/I18nProvider'

function Spinner() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-sw-blue-border border-t-sw-blue rounded-full animate-spin" />
    </div>
  )
}

function UnauthRedirect() {
  useEffect(() => {
    window.location.href = '/checkout/setup'
  }, [])
  return <Spinner />
}

function Step({
  number,
  label,
  status,
}: {
  number: number
  label: string
  status: 'complete' | 'active' | 'upcoming'
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          status === 'complete'
            ? 'bg-green-500 text-white'
            : status === 'active'
              ? 'bg-sw-blue text-white'
              : 'bg-gray-200 text-sw-grey'
        }`}
      >
        {status === 'complete' ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          number
        )}
      </div>
      <span className={`text-[10px] font-semibold ${status === 'upcoming' ? 'text-sw-grey' : 'text-sw-dark'}`}>
        {label}
      </span>
    </div>
  )
}

function Letter({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xl flex-shrink-0">{emoji}</span>
      <span className="text-sm text-sw-dark font-medium">{text}</span>
    </div>
  )
}

function WelcomeLetter() {
  const user = useCurrentUser()
  const { t } = useI18n()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
    track('welcome_letter_viewed')
  }, [])

  const firstName = user?.name?.split(' ')[0] || t('account.common.friend')

  const continueToUpgrade = () => {
    track('welcome_letter_continue_clicked')
    window.location.href = '/account/upgrade'
  }

  if (!ready) return <Spinner />

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-white border-b border-sw-grey-border">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center justify-center">
          <BrandWordmark />
        </div>
      </header>
      <div className="bg-white py-4 px-4 border-b border-sw-grey-border">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <Step number={1} label={t('account.welcome.stepMember')} status="complete" />
          <div className="flex-1 h-0.5 bg-gray-200 mx-2 mt-[-12px]" />
          <Step number={2} label={t('account.welcome.stepWelcome')} status="active" />
          <div className="flex-1 h-0.5 bg-gray-200 mx-2 mt-[-12px]" />
          <Step number={3} label={t('account.welcome.stepAccess')} status="upcoming" />
        </div>
      </div>
      <main className="max-w-lg mx-auto px-5 pt-8 pb-40">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
            <span className="text-4xl">🎉</span>
          </div>
          <h1 className="text-3xl font-extrabold text-sw-dark leading-tight">
            {t('account.welcome.title').replace('{name}', firstName)}
          </h1>
          <p className="text-sm text-sw-grey mt-2">{t('account.welcome.subtitle')}</p>
        </div>
        <div className="rounded-2xl border border-sw-grey-border bg-gray-50/50 p-6 sm:p-8 space-y-4">
          <p className="text-base text-sw-dark leading-relaxed">
            {t('account.welcome.greeting').replace('{name}', firstName)}
          </p>
          <p className="text-base text-sw-dark leading-relaxed">{t('account.welcome.p1')}</p>
          <p className="text-base text-sw-dark leading-relaxed">
            {t('account.welcome.p2Lead')}{' '}
            <span className="font-bold">{t('account.welcome.p2Bold')}</span>{' '}
            {t('account.welcome.p2Tail')}
          </p>
          <p className="text-base text-sw-dark leading-relaxed">{t('account.welcome.p3')}</p>
          <div className="space-y-3 py-2">
            <Letter emoji="📱" text={t('account.welcome.letter1')} />
            <Letter emoji="🏆" text={t('account.welcome.letter2')} />
            <Letter emoji="🎯" text={t('account.welcome.letter3')} />
            <Letter emoji="🤝" text={t('account.welcome.letter4')} />
          </div>
          <p className="text-base text-sw-dark leading-relaxed">
            {t('account.welcome.p4Prefix')}{' '}
            <span className="font-bold">{t('account.welcome.p4Bold')}</span>{' '}
            {t('account.welcome.p4Suffix')}
          </p>
          <p className="text-base text-sw-dark leading-relaxed">{t('account.welcome.p5')}</p>
          <div className="pt-4 border-t border-sw-grey-border">
            <p className="text-base text-sw-dark font-semibold">{t('account.welcome.signoff')}</p>
            <div className="mt-3 flex items-center gap-3">
              <img
                src="/assets/rob-wass.jpg"
                alt={t('account.welcome.robAlt')}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-bold text-sw-dark">{t('account.welcome.founderName')}</p>
                <p className="text-xs text-sw-grey">
                  {t('account.welcome.founderTitle').replace('{brand}', COMPANY.brand)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-center">
          <span className="text-sm text-sw-grey">{t('account.welcome.trustedBy')}</span>
          <span className="text-sm font-bold text-sw-dark">{t('account.welcome.membersCount')}</span>
          <span className="text-sm text-sw-grey">{t('account.welcome.worldwide')}</span>
        </div>
      </main>
      <div
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.92) 40%, white 65%)',
        }}
      >
        <div className="max-w-lg mx-auto px-5 pt-6 pb-2">
          <button
            type="button"
            onClick={continueToUpgrade}
            className="w-full py-4 rounded-full bg-sw-blue hover:bg-sw-blue-hover text-white font-bold text-lg transition-all active:scale-[0.98] shadow-lg"
          >
            {t('account.common.continueArrow')}
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

export default function WelcomePage() {
  return (
    <>
      <AuthLoading>
        <Spinner />
      </AuthLoading>
      <Unauthenticated>
        <UnauthRedirect />
      </Unauthenticated>
      <Authenticated>
        <WelcomeLetter />
      </Authenticated>
    </>
  )
}
