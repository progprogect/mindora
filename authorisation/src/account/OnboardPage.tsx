import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Authenticated, AuthLoading, Unauthenticated } from '@/auth/authGates'
import AuthSpinner from '@/auth/AuthSpinner'
import { useCurrentUser, useSession } from '@/auth/session'
import { completeOnboarding } from '@/lib/api'
import { focusFromQuiz } from '@/lib/quizResults'
import { track } from '@/lib/track'
import { useI18n } from '@/i18n/I18nProvider'
import BrandWordmark from '@/shared/BrandWordmark'

const PACE_IDS = ['spark', 'momentum', 'ignite'] as const

function UnauthRedirect() {
  const { t } = useI18n()
  useEffect(() => {
    window.location.href = '/login'
  }, [])
  return <AuthSpinner message={t('account.common.redirecting')} />
}

function OnboardForm() {
  const navigate = useNavigate()
  const user = useCurrentUser()
  const { refresh } = useSession()
  const { t } = useI18n()
  const [pace, setPace] = useState('momentum')
  const [busy, setBusy] = useState(false)
  const forwarded = useRef(false)

  const paceMeta: Record<
    string,
    { labelKey: string; minsKey: string; icon: string; accentColor: string; recommended?: boolean }
  > = {
    spark: {
      labelKey: 'account.onboard.paceSparkLabel',
      minsKey: 'account.onboard.paceSparkMins',
      icon: '✨',
      accentColor: '#F59E0B',
    },
    momentum: {
      labelKey: 'account.onboard.paceMomentumLabel',
      minsKey: 'account.onboard.paceMomentumMins',
      icon: '🚀',
      accentColor: '#2563EB',
      recommended: true,
    },
    ignite: {
      labelKey: 'account.onboard.paceIgniteLabel',
      minsKey: 'account.onboard.paceIgniteMins',
      icon: '🔥',
      accentColor: '#EA580C',
    },
  }

  useEffect(() => {
    if (user?.onboardingComplete && !forwarded.current) {
      forwarded.current = true
      navigate('/app/dashboard', { replace: true })
    }
  }, [user?.onboardingComplete, navigate])

  const firstName = user?.name?.split(' ')[0] || t('account.common.there')
  const focus = focusFromQuiz()

  const submit = async () => {
    if (busy || forwarded.current) return
    setBusy(true)
    forwarded.current = true
    try {
      await completeOnboarding({ pacePreference: pace, focusCategory: focus })
      await refresh({ silent: true })
      track('onboarding_completed', { pace, focus })
      navigate('/app/dashboard', { replace: true })
    } catch {
      navigate('/app/dashboard', { replace: true })
    } finally {
      setBusy(false)
    }
  }

  const nextSteps = [
    { icon: '✅', labelKey: 'account.onboard.stepAccountDone', done: true },
    { icon: '📚', labelKey: 'account.onboard.stepFirstLesson', done: false },
    { icon: '🏆', labelKey: 'account.onboard.stepFirstBadge', done: false },
  ]

  if (user === undefined) return <AuthSpinner />

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-white border-b border-sw-grey-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-center">
          <BrandWordmark />
        </div>
      </header>
      <main className="flex-1 flex flex-col px-4 pt-6 pb-44 max-w-lg mx-auto w-full">
        <div className="animate-fade-up">
          <div
            className="relative rounded-3xl overflow-hidden mb-6"
            style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #3B82F6 100%)' }}
          >
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5" />
            <div className="relative p-6 pb-7">
              <div className="text-4xl mb-3">🎉</div>
              <h1 className="text-2xl font-extrabold text-white leading-tight mb-2">
                {t('account.onboard.welcomeName').replace('{name}', firstName)}
              </h1>
              <p className="text-blue-100 text-sm leading-relaxed">{t('account.onboard.planReady')}</p>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-sm font-bold text-sw-dark mb-1">{t('account.onboard.timeCommitTitle')}</p>
            <p className="text-xs text-sw-grey mb-4">{t('account.onboard.timeCommitHint')}</p>
            <div className="space-y-2.5">
              {PACE_IDS.map((id) => {
                const item = paceMeta[id]
                const active = pace === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPace(id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98] ${
                      active ? 'border-sw-blue shadow-sm' : 'border-sw-grey-border hover:border-sw-blue/40'
                    }`}
                    style={active ? { background: `${item.accentColor}08` } : undefined}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ backgroundColor: `${item.accentColor}15` }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sw-dark text-sm">{t(item.minsKey)}</span>
                        {item.recommended ? (
                          <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-sw-blue/10 text-sw-blue">
                            {t('account.onboard.popular')}
                          </span>
                        ) : null}
                      </div>
                      <p className="text-xs text-sw-grey mt-0.5">{t(item.labelKey)}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        active ? 'border-sw-blue bg-sw-blue' : 'border-sw-grey-border'
                      }`}
                    >
                      {active ? <div className="w-2 h-2 rounded-full bg-white" /> : null}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
          <div className="rounded-xl border border-sw-grey-border p-4">
            <p className="text-xs font-bold text-sw-grey uppercase tracking-widest mb-3">
              {t('account.onboard.whatsNext')}
            </p>
            <div className="space-y-2.5">
              {nextSteps.map((row) => (
                <div key={row.labelKey} className="flex items-center gap-3">
                  <span className="text-base">{row.icon}</span>
                  <span
                    className={`text-sm ${row.done ? 'text-sw-grey line-through' : 'text-sw-dark font-semibold'}`}
                  >
                    {t(row.labelKey)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <div
        className="fixed bottom-0 left-0 right-0 px-4 pt-10 z-50"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.92) 40%, white 65%)',
        }}
      >
        <div className="max-w-lg mx-auto">
          <button
            type="button"
            onClick={() => void submit()}
            disabled={busy}
            className="w-full bg-sw-blue hover:bg-sw-blue-hover text-white font-bold py-4 rounded-full text-base transition-all active:scale-[0.98] shadow-lg disabled:opacity-60"
          >
            {busy ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                {t('account.onboard.settingUp')}
              </span>
            ) : (
              t('account.onboard.startFirstLesson')
            )}
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

export default function OnboardPage() {
  return (
    <>
      <AuthLoading>
        <AuthSpinner />
      </AuthLoading>
      <Unauthenticated>
        <UnauthRedirect />
      </Unauthenticated>
      <Authenticated>
        <OnboardForm />
      </Authenticated>
    </>
  )
}
