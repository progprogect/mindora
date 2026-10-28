import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OtoChrome from '@/account/OtoChrome'
import { Authenticated, AuthLoading, Unauthenticated } from '@/auth/authGates'
import AuthSpinner from '@/auth/AuthSpinner'
import { useCurrentUser } from '@/auth/session'
import { buyOffer, recordUpsellEvent } from '@/lib/api'
import { useHasSavedCard, useUpsellStatus } from '@/lib/lmsQueries'
import { goOtoNext, onOtoChargeFailed } from '@/lib/otoFlow'
import { armReviewMode, isReviewPurchaseBlocked, reviewPurchaseBlockedMessage } from '@/lib/reviewMode'
import { attributionPayload, track } from '@/lib/track'
import BrandWordmark from '@/shared/BrandWordmark'
import { COACH_AVATAR, COACH_NAME, COACH_OFFER_SLUG } from '@/shared/coach'
import { useI18n } from '@/i18n/I18nProvider'
import { withLocale, localeFromPathname } from '@/i18n/locale'

const OFFER = COACH_OFFER_SLUG
const PRICE = 19.95
const WAS = 29.95
const NEXT = '/account/onboard'

function UnauthRedirect() {
  useEffect(() => {
    window.location.href = withLocale(localeFromPathname(window.location.pathname) ?? 'en', '/login')
  }, [])
  return <AuthSpinner />
}

function BounceDashboard() {
  useEffect(() => {
    window.location.href = withLocale(localeFromPathname(window.location.pathname) ?? 'en', '/app/dashboard')
  }, [])
  const { locale, t } = useI18n()
  return <AuthSpinner message={t('account.common.almostThere')} />
}

function Trait({ icon, label }: { icon: 'target' | 'brain' | 'shield' | 'clock'; label: string }) {
  const icons = {
    target: (
      <svg className="w-6 h-6 text-sw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
    brain: (
      <svg className="w-6 h-6 text-sw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    shield: (
      <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    clock: (
      <svg className="w-6 h-6 text-sw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      </svg>
    ),
  }
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-11 h-11 rounded-full bg-white border border-sw-grey-border flex items-center justify-center shadow-sm">
        {icons[icon]}
      </div>
      <span className="text-[10px] sm:text-xs font-medium text-sw-dark leading-tight">{label}</span>
    </div>
  )
}

function Obstacle({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-50 border border-red-100">
      <span className="text-red-500 font-bold text-base flex-shrink-0">✕</span>
      <span className="text-sm font-medium text-sw-dark">{text}</span>
    </div>
  )
}

function FlowStep({ icon, title, subtitle }: { icon: 'lesson' | 'coach' | 'rocket'; title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center text-center py-3">
      <div className="w-14 h-14 rounded-full bg-sw-blue/20 border-2 border-sw-blue/50 flex items-center justify-center mb-2">
        {icon === 'coach' ? (
          <img src={COACH_AVATAR} alt={COACH_NAME} className="w-8 h-8 rounded-full object-contain p-0.5" />
        ) : (
          <span className="text-2xl">{icon === 'lesson' ? '📚' : '🚀'}</span>
        )}
      </div>
      <p className="text-white font-bold text-sm">{title}</p>
      <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>
    </div>
  )
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center py-1">
      <svg className="w-5 h-5 text-sw-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  )
}

function MemberPoint({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <svg
        className="w-5 h-5 text-green-500 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-sm font-medium text-sw-dark">{text}</span>
    </div>
  )
}

function ComparePoint({ text, isNegative }: { text: string; isNegative?: boolean }) {
  return (
    <div className="flex items-start gap-1.5">
      {isNegative ? (
        <span className="text-red-400 text-xs mt-0.5 flex-shrink-0">•</span>
      ) : (
        <svg
          className="w-3.5 h-3.5 text-sw-blue flex-shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
      <span className={`text-xs ${isNegative ? 'text-sw-grey' : 'font-medium text-sw-dark'}`}>{text}</span>
    </div>
  )
}

function OfferCard({
  purchaseState,
  errorMessage,
  hasSavedCard,
  onPurchase,
  onSkip,
}: {
  purchaseState: 'idle' | 'processing' | 'success'
  errorMessage: string
  hasSavedCard: boolean
  onPurchase: () => void
  onSkip: () => void
}) {
  const { locale, t } = useI18n()
  return (
    <div
      className="rounded-2xl p-5 sm:p-6"
      style={{
        background: 'linear-gradient(180deg, #f0f4ff 0%, #e8ecf7 60%, #f5f3ff 100%)',
      }}
    >
      <div className="flex justify-center mb-3">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-sw-grey-border shadow-sm text-xs font-bold text-sw-dark">
          <svg className="w-3.5 h-3.5 text-sw-blue" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          {t('account.mindora.oneTimeUnlock')}
        </span>
      </div>
      <h3 className="text-xl sm:text-2xl font-extrabold text-sw-dark text-center mb-3">
        {t('account.mindora.unlockTitle')}
      </h3>
      <div className="flex items-center justify-center gap-3 mb-5">
        <span className="text-lg text-red-400 line-through font-bold decoration-2">${WAS}</span>
        <span className="text-sm font-bold text-sw-blue">{t('account.common.todayOnly')}</span>
        <span className="text-4xl sm:text-5xl font-extrabold text-sw-blue">${PRICE}</span>
      </div>
      <button
        type="button"
        onClick={onPurchase}
        disabled={purchaseState === 'processing'}
        className="w-full py-[18px] sm:py-5 rounded-full text-white font-bold text-lg sm:text-xl transition-all active:scale-[0.98] shadow-xl disabled:opacity-60 disabled:cursor-not-allowed mb-4"
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
        }}
      >
        {purchaseState === 'processing' ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            {t('account.common.processing')}
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">{t('account.mindora.unlockCta')}</span>
        )}
      </button>
      <div className="flex items-center justify-center gap-1.5 mb-3">
        <svg className="w-4 h-4 text-sw-grey" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        <span className="text-sm text-sw-grey font-medium">
          {hasSavedCard ? t('account.mindora.secureOneClick') : t('account.mindora.secureStripe')}
        </span>
      </div>
      {errorMessage ? (
        <p className="text-sm text-red-700 text-center font-medium mb-3">{errorMessage}</p>
      ) : null}
      <div className="rounded-xl border border-sw-grey-border bg-white p-3 mb-3">
        <p className="text-xs text-sw-grey text-center leading-relaxed">
          {t('account.common.chargeAgreeOneTime')}{' '}
          <span className="font-bold text-sw-dark">${PRICE}</span>
          {hasSavedCard ? t('account.common.chargeSavedInstant') : t('account.common.chargeStripeAfter')}{' '}
          {t('account.common.offerRevertsAfter')} ${WAS} {t('account.common.afterYouLeave')}
        </p>
      </div>
      <div className="text-center">
        <button
          type="button"
          onClick={onSkip}
          className="text-sm text-sw-grey underline underline-offset-2 hover:text-sw-dark transition-colors"
        >
          {t('account.common.noThanksSkipOffer')}
        </button>
      </div>
    </div>
  )
}

function SuccessScreen() {
  const { locale, t } = useI18n()
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-extrabold text-sw-dark mb-2">{t('account.common.paymentSuccessful')}</h2>
        <p className="text-sw-dark font-semibold text-base mb-1">{t('account.mindora.successCoach')}</p>
        <p className="text-sw-grey text-sm mb-2">{t('account.mindora.successBody')}</p>
        <div className="mt-6">
          <div className="w-6 h-6 border-2 border-sw-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-sw-grey mt-2">{t('account.common.takingYouNext')}</p>
        </div>
      </div>
    </div>
  )
}

export function MindoraOffer({ hasSavedCard = true }: { hasSavedCard?: boolean }) {
  const { locale, t } = useI18n()
  const navigate = useNavigate()
  const [state, setState] = useState<'idle' | 'processing' | 'success'>('idle')
  const [error, setError] = useState('')
  const [sticky, setSticky] = useState(false)
  const offerRef = useRef<HTMLDivElement | null>(null)
  const seenOffer = useRef(false)
  const skipped = useRef(false)
  const viewed = useRef(false)

  useEffect(() => {
    if (viewed.current) return
    viewed.current = true
    void recordUpsellEvent({ offerSlug: OFFER, action: 'viewed' })
    track('upsell_viewed', { offer: OFFER, price: PRICE })
  }, [])

  useEffect(() => {
    const trap = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.onbeforeunload = trap
    return () => {
      window.onbeforeunload = null
    }
  }, [])

  useEffect(() => {
    const node = offerRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          seenOffer.current = true
          setSticky(false)
        } else if (seenOffer.current && entry.boundingClientRect.top < 0) {
          setSticky(true)
        }
      },
      { threshold: 0 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (state !== 'success') return
    const timer = setTimeout(() => {
      goOtoNext(navigate, NEXT)
    }, 3000)
    return () => clearTimeout(timer)
  }, [state, navigate])

  const buy = async () => {
    if (state === 'processing' || state === 'success') return
    if (isReviewPurchaseBlocked()) {
      setError(reviewPurchaseBlockedMessage(locale))
      return
    }
    setState('processing')
    setError('')
    void recordUpsellEvent({ offerSlug: OFFER, action: 'attempted' })
    track('upsell_attempted', { offer: OFFER, price: PRICE })
    try {
      const attribution = attributionPayload()
      const result = await buyOffer({
        offerSlug: OFFER,
        attribution: Object.keys(attribution).length > 0 ? attribution : undefined,
      })
      if (result.checkoutUrl) return
      if (result.success) {
        setState('success')
        track('upsell_purchased', {
          offer: OFFER,
          price: PRICE,
          alreadyPurchased: result.alreadyPurchased,
        })
        return
      }
      onOtoChargeFailed({ navigate, offerSlug: OFFER, reason: result.reason || 'unknown', next: NEXT })
    } catch {
      onOtoChargeFailed({ navigate, offerSlug: OFFER, reason: 'unknown', next: NEXT })
    }
  }

  const skip = () => {
    if (skipped.current) return
    skipped.current = true
    void recordUpsellEvent({ offerSlug: OFFER, action: 'skipped' })
    track('upsell_skipped', { offer: OFFER })
    goOtoNext(navigate, NEXT)
  }

  if (state === 'success') return <SuccessScreen />

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <OtoChrome activeStep="Upgrades" />
      <main className="max-w-2xl mx-auto px-4 pb-32">
        <section className="text-center pt-4 pb-0">
          <h1 className="text-[2.5rem] sm:text-5xl font-extrabold text-sw-dark leading-[1.1] mb-1">
            {t('account.mindora.meet')}{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)' }}
            >
              Mindora.
            </span>
          </h1>
          <p className="text-[1.75rem] sm:text-4xl font-extrabold text-sw-dark leading-[1.15] mb-1">
            {t('account.mindora.coachTurns')}
          </p>
          <p className="text-[1.75rem] sm:text-4xl font-extrabold leading-[1.15] mb-2">
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)' }}
            >
              {t('account.mindora.learning')}
            </span>{' '}
            {t('account.mindora.into')}{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)' }}
            >
              {t('account.mindora.results')}
            </span>
          </p>
          <div className="flex justify-center mb-5">
            <svg width="180" height="18" viewBox="0 0 180 18" fill="none" className="text-purple-400 opacity-60">
              <path d="M4 14C40 4 140 4 176 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-base sm:text-lg text-sw-dark leading-relaxed max-w-sm mx-auto mb-0">
            {t('account.mindora.heroSubLead')}{' '}
            <span className="font-bold">{t('account.mindora.heroSubApply')}</span>{' '}
            {t('account.mindora.heroSubMid')}{' '}
            <span className="font-bold">{t('account.mindora.heroSubProgress')}</span>
          </p>
        </section>
        <section className="relative mt-2 mb-6">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 sm:w-80 sm:h-80 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(99,102,241,0.10) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)',
            }}
          />
          <div className="relative z-10 flex justify-center -mb-8 px-2">
            <div className="flex w-full max-w-[320px] sm:max-w-[380px] items-center gap-1.5 sm:gap-2.5">
              <img
                src={COACH_AVATAR}
                alt={t('account.mindora.altMindora')}
                className="w-[52%] h-auto object-contain drop-shadow-sm"
              />
              <div className="relative flex-1 min-w-0">
                <div className="absolute left-0 top-[42%] -translate-x-[7px] -translate-y-1/2 h-3.5 w-3.5 rotate-45 rounded-[2px] border-b border-l border-sw-grey-border bg-white shadow-sm" aria-hidden="true" />
                <p className="relative rounded-[1.35rem] border border-sw-grey-border bg-white px-3 py-2.5 text-[13px] sm:px-3.5 sm:py-3 sm:text-sm font-semibold leading-snug text-slate-800 shadow-md">
                  &ldquo;{t('account.mindora.quote')}&rdquo;
                </p>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl border border-sw-grey-border border-t-2 border-t-gray-300 bg-gray-50/80 pt-12 pb-4 px-4">
            <div className="grid grid-cols-4 gap-2 text-center">
              <Trait icon="target" label={t('account.mindora.traitPersonalised')} />
              <Trait icon="brain" label={t('account.mindora.traitRemembers')} />
              <Trait icon="shield" label={t('account.mindora.traitAccountable')} />
              <Trait icon="clock" label={t('account.mindora.trait247')} />
            </div>
          </div>
        </section>
        <div ref={offerRef}>
          <OfferCard
            purchaseState={state}
            errorMessage={error}
            hasSavedCard={hasSavedCard}
            onPurchase={() => void buy()}
            onSkip={skip}
          />
        </div>
        <section className="mt-10 mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-sw-dark text-center leading-tight mb-5">
            {t('account.mindora.whyNeverChange')}
          </h2>
          <div className="space-y-3">
            <Obstacle text={t('account.mindora.obstacle1')} />
            <Obstacle text={t('account.mindora.obstacle2')} />
            <Obstacle text={t('account.mindora.obstacle3')} />
          </div>
          <div className="mt-6 text-center">
            <p className="text-base font-bold text-sw-dark">
              {t('account.mindora.removesLead')}{' '}
              <span className="text-sw-blue">{t('account.mindora.removesEvery')}</span>{' '}
              {t('account.mindora.removesTail')}
            </p>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-sw-dark text-center leading-tight mb-5">
            {t('account.mindora.howWorks')}
          </h2>
          <div
            className="rounded-2xl p-6"
            style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}
          >
            <div className="flex flex-col items-center gap-1">
              <FlowStep icon="lesson" title={t('account.mindora.flowLessonTitle')} subtitle={t('account.mindora.flowLessonSub')} />
              <FlowArrow />
              <FlowStep icon="coach" title={t('account.mindora.flowCoachTitle')} subtitle={t('account.mindora.flowCoachSub')} />
              <FlowArrow />
              <FlowStep icon="rocket" title={t('account.mindora.flowApplyTitle')} subtitle={t('account.mindora.flowApplySub')} />
            </div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-extrabold text-sw-dark text-center mb-4">{t('account.mindora.exampleConvo')}</h2>
          <div className="rounded-2xl border border-sw-grey-border bg-gray-50 p-4 sm:p-5">
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-sw-blue flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img src={COACH_AVATAR} alt={COACH_NAME} className="w-full h-full object-contain p-1" />
              </div>
              <div className="flex-1 bg-white rounded-xl rounded-tl-sm p-4 border border-sw-grey-border shadow-sm">
                <p className="text-sm font-bold text-sw-dark mb-2">{COACH_NAME}</p>
                <p className="text-sm text-sw-dark leading-relaxed mb-3">
                  {t('account.mindora.claudeLesson')}
                </p>
                <p className="text-sm text-sw-dark leading-relaxed mb-3">{t('account.mindora.basedOnGoal')}</p>
                <div className="rounded-lg bg-sw-blue-light border border-sw-blue-border p-3 mb-3">
                  <p className="text-xs font-bold text-sw-blue uppercase tracking-wide mb-1">
                    {t('account.mindora.todaysChallenge')}
                  </p>
                  <p className="text-sm text-sw-dark">{t('account.mindora.challengeBody')}</p>
                </div>
                <p className="text-sm text-sw-dark leading-relaxed">{t('account.mindora.comeBack')}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-extrabold text-sw-dark text-center mb-4">{t('account.mindora.whyUnlock')}</h2>
          <div className="rounded-2xl border border-sw-grey-border p-5 bg-white space-y-3">
            <MemberPoint text={t('account.mindora.member1')} />
            <MemberPoint text={t('account.mindora.member2')} />
            <MemberPoint text={t('account.mindora.member3')} />
            <MemberPoint text={t('account.mindora.member4')} />
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-extrabold text-sw-dark text-center mb-4">{t('account.mindora.compareTitle')}</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-sw-grey-border bg-gray-50 p-4">
              <p className="text-sm font-bold text-sw-grey text-center mb-3">{t('account.mindora.genericAi')}</p>
              <div className="space-y-2.5">
                <ComparePoint text={t('account.mindora.compareNeg1')} isNegative />
                <ComparePoint text={t('account.mindora.compareNeg2')} isNegative />
                <ComparePoint text={t('account.mindora.compareNeg3')} isNegative />
                <ComparePoint text={t('account.mindora.compareNeg4')} isNegative />
              </div>
            </div>
            <div className="rounded-xl border-2 border-sw-blue/30 bg-sw-blue-light/20 p-4">
              <p className="text-sm font-bold text-sw-blue text-center mb-3">{COACH_NAME}</p>
              <div className="space-y-2.5">
                <ComparePoint text={t('account.mindora.comparePos1')} />
                <ComparePoint text={t('account.mindora.comparePos2')} />
                <ComparePoint text={t('account.mindora.comparePos3')} />
                <ComparePoint text={t('account.mindora.comparePos4')} />
              </div>
            </div>
          </div>
        </section>
        <div>
          <OfferCard
            purchaseState={state}
            errorMessage={error}
            hasSavedCard={hasSavedCard}
            onPurchase={() => void buy()}
            onSkip={skip}
          />
        </div>
      </main>
      {sticky ? (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-sw-grey-border shadow-lg">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-semibold text-sw-grey">{t('account.common.only')}</span>
                <span className="font-extrabold text-xl text-sw-dark">${PRICE}</span>
              </div>
              <button
                type="button"
                onClick={skip}
                className="text-[11px] text-sw-grey underline underline-offset-2 hover:text-sw-dark transition-colors text-left"
              >
                {t('account.common.skipOfferArrow')}
              </button>
            </div>
            <button
              type="button"
              onClick={() => void buy()}
              disabled={state === 'processing'}
              className="px-7 py-3 bg-sw-blue hover:bg-sw-blue-hover text-white text-base font-bold rounded-full transition-all active:scale-95 disabled:opacity-60 whitespace-nowrap"
            >
              {state === 'processing' ? t('account.common.processing') : t('account.mindora.unlockSticky')}
            </button>
          </div>
          <div style={{ paddingBottom: 'env(safe-area-inset-bottom)', backgroundColor: 'white' }} />
        </div>
      ) : null}
      <footer className="text-center py-6 border-t border-sw-grey-border">
        <BrandWordmark size="sm" className="font-bold" />
      </footer>
    </div>
  )
}

function MindoraGate() {
  const status = useUpsellStatus(OFFER)
  const hasCard = useHasSavedCard()
  const user = useCurrentUser()
  const review = armReviewMode(user?.email)

  if (status === undefined || hasCard === undefined || user === undefined) {
    return <AuthSpinner />
  }
  if (user?.onboardingComplete && !review) return <BounceDashboard />
  return <MindoraOffer hasSavedCard={Boolean(hasCard)} />
}

export default function UpgradeMindoraPage() {
  return (
    <>
      <AuthLoading>
        <AuthSpinner />
      </AuthLoading>
      <Unauthenticated>
        <UnauthRedirect />
      </Unauthenticated>
      <Authenticated>
        <MindoraGate />
      </Authenticated>
    </>
  )
}
