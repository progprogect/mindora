import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OtoChrome from '@/account/OtoChrome'
import { Authenticated, AuthLoading, Unauthenticated } from '@/auth/authGates'
import AuthSpinner from '@/auth/AuthSpinner'
import { useCurrentUser } from '@/auth/session'
import { recordUpsellEvent, switchToAnnual } from '@/lib/api'
import { goOtoNext, onOtoChargeFailed } from '@/lib/otoFlow'
import { useHasSavedCard, useSubscription, useUpsellStatus } from '@/lib/lmsQueries'
import { armReviewMode, isReviewPurchaseBlocked, reviewPurchaseBlockedMessage } from '@/lib/reviewMode'
import { track } from '@/lib/track'
import BrandWordmark from '@/shared/BrandWordmark'
import { MONEY_BACK_CHIP } from '@/shared/moneyBack'
import { useI18n } from '@/i18n/I18nProvider'
import { withLocale, localeFromPathname } from '@/i18n/locale'

const OFFER = 'annual-upgrade'
const PRICE = 59.99
const WAS = 89.99
const NEXT = '/account/upgrade-mindora'

function UnauthRedirect() {
  useEffect(() => {
    window.location.href = withLocale(localeFromPathname(window.location.pathname) ?? 'en', '/account/onboard')
  }, [])
  return <AuthSpinner />
}

function BounceWise() {
  const { locale, t } = useI18n()
  useEffect(() => {
    window.location.href = withLocale(locale, NEXT)
  }, [locale])
  return <AuthSpinner message={t('account.common.almostThere')} />
}

function Benefit({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <svg
        className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
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

function OfferCard({
  purchaseState,
  errorMessage,
  onPurchase,
  onSkip,
}: {
  purchaseState: 'idle' | 'processing' | 'success'
  errorMessage: string
  onPurchase: () => void
  onSkip: () => void
}) {
  const { locale, t } = useI18n()
  const priceStr = `$${PRICE}`
  const wasStr = `$${WAS}`
  return (
    <div
      className="rounded-2xl p-5 sm:p-6"
      style={{
        background: 'linear-gradient(180deg, #f0f4ff 0%, #e8ecf7 60%, #f5f3ff 100%)',
      }}
    >
      <div className="flex justify-center mb-3">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-sw-grey-border shadow-sm text-xs font-bold text-sw-dark">
          {t('account.annual.setupOnly')}
        </span>
      </div>
      <h3 className="text-xl sm:text-2xl font-extrabold text-sw-dark text-center mb-3">
        {t('account.annual.switchTitle')}
      </h3>
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="text-lg text-red-400 line-through font-bold decoration-2">{wasStr}</span>
        <span className="text-sm font-bold text-sw-blue">{t('account.common.todayOnly')}</span>
        <span className="text-4xl sm:text-5xl font-extrabold text-sw-blue">{priceStr}</span>
      </div>
      <p className="text-center text-sm font-semibold text-sw-dark mb-5">{t('account.annual.perYear')}</p>
      <button
        type="button"
        data-testid="upgrade-annual-cta"
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
          <span>{t('account.annual.yesUpgrade')}</span>
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
        <span className="text-sm text-sw-grey font-medium">{t('account.annual.savedCardTrial')}</span>
      </div>
      {errorMessage ? <p className="text-sm text-red-700 text-center font-medium mb-3">{errorMessage}</p> : null}
      <div className="rounded-xl border border-sw-grey-border bg-white p-3 mb-3">
        <p className="text-xs text-sw-grey text-center leading-relaxed">
          {t('account.annual.chargeNote')
            .replace('{price}', priceStr)
            .replace('{guarantee}', MONEY_BACK_CHIP)}
        </p>
      </div>
      <div className="text-center">
        <button
          type="button"
          data-testid="upgrade-annual-skip"
          onClick={onSkip}
          className="text-sm text-sw-grey underline underline-offset-2 hover:text-sw-dark transition-colors"
        >
          {t('account.annual.skipMonthly')}
        </button>
      </div>
    </div>
  )
}

function SuccessScreen() {
  const { locale, t } = useI18n()
  const priceStr = `$${PRICE}`
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-extrabold text-sw-dark mb-2">{t('account.annual.successTitle')}</h2>
        <p className="text-sw-dark font-semibold text-base mb-1">
          {t('account.annual.successLocked').replace('{price}', priceStr)}
        </p>
        <p className="text-sw-grey text-sm mb-2">
          {t('account.annual.successBody').replace('{price}', priceStr)}
        </p>
        <div className="mt-6">
          <div className="w-6 h-6 border-2 border-sw-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-sw-grey mt-2">{t('account.common.takingYouNext')}</p>
        </div>
      </div>
    </div>
  )
}

export function AnnualOffer() {
  const { locale, t } = useI18n()
  const navigate = useNavigate()
  const [state, setState] = useState<'idle' | 'processing' | 'success'>('idle')
  const [error, setError] = useState('')
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
      const result = await switchToAnnual()
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
        <section className="text-center pt-6 pb-2">
          <h1 className="text-[2.5rem] sm:text-5xl font-extrabold text-sw-dark leading-[1.1] mb-3">
            {t('account.annual.heroTitle')}{' '}
            <span className="text-sw-blue">{t('account.annual.heroTitleBlue')}</span>
          </h1>
          <p className="text-base sm:text-lg text-sw-dark leading-relaxed max-w-md mx-auto">
            {t('account.annual.heroSub')
              .replace('{price}', `$${PRICE}`)
              .replace('{was}', `$${WAS}`)}
          </p>
        </section>
        <div className="mt-6">
          <OfferCard
            purchaseState={state}
            errorMessage={error}
            onPurchase={() => void buy()}
            onSkip={skip}
          />
        </div>
        <section className="mt-8 mb-8 rounded-2xl border border-sw-grey-border bg-white p-5 space-y-3">
          <Benefit text={t('account.annual.benefit1')} />
          <Benefit text={t('account.annual.benefit2').replace('{price}', `$${PRICE}`)} />
          <Benefit text={MONEY_BACK_CHIP} />
          <Benefit text={t('account.annual.benefit3')} />
        </section>
        <div>
          <OfferCard
            purchaseState={state}
            errorMessage={error}
            onPurchase={() => void buy()}
            onSkip={skip}
          />
        </div>
      </main>
      <footer className="text-center py-6 border-t border-sw-grey-border">
        <BrandWordmark size="sm" className="font-bold" />
      </footer>
    </div>
  )
}

function AnnualGate() {
  const status = useUpsellStatus(OFFER)
  const hasCard = useHasSavedCard()
  const { sub } = useSubscription()
  const user = useCurrentUser()
  const review = armReviewMode(user?.email)

  if (status === undefined || hasCard === undefined || user === undefined || sub === undefined) {
    return <AuthSpinner />
  }
  if (review) return <AnnualOffer />
  if (!hasCard) return <BounceWise />
  if (sub?.isYearly) return <BounceWise />
  return <AnnualOffer />
}

export default function UpgradeAnnualPage() {
  return (
    <>
      <AuthLoading>
        <AuthSpinner />
      </AuthLoading>
      <Unauthenticated>
        <UnauthRedirect />
      </Unauthenticated>
      <Authenticated>
        <AnnualGate />
      </Authenticated>
    </>
  )
}
