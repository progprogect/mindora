import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OtoChrome from '@/account/OtoChrome'
import { Authenticated, AuthLoading, Unauthenticated } from '@/auth/authGates'
import AuthSpinner from '@/auth/AuthSpinner'
import { useCurrentUser } from '@/auth/session'
import { buyOffer, recordUpsellEvent } from '@/lib/api'
import { goOtoNext, onOtoChargeFailed } from '@/lib/otoFlow'
import { useHasSavedCard, useUpsellStatus } from '@/lib/lmsQueries'
import { armReviewMode, isReviewPurchaseBlocked, REVIEW_PURCHASE_BLOCKED } from '@/lib/reviewMode'
import { attributionPayload, track } from '@/lib/track'
import BrandWordmark from '@/shared/BrandWordmark'
import { COMPANY } from '@/shared/company'
import { useI18n } from '@/i18n/I18nProvider'

const OFFER = 'ultimate-prompt-library-oto'
const PRICE = 9.97
const WAS = 39.95
const NEXT = '/account/upgrade-planners'
const PROMPTS = '28,000+'

const ASSETS = {
  books: '/assets/oto/prompt/books.webp',
  claude: '/assets/oto/prompt/icon-claude.png',
  chatgpt: '/assets/oto/prompt/icon-chatgpt.png',
  gemini: '/assets/oto/prompt/icon-gemini.png',
  avatars: '/assets/oto/prompt/trusted-avatars.webp',
  sales: '/assets/oto/prompt/screenshot-sales.webp',
  ebook: '/assets/oto/prompt/screenshot-ebook.webp',
  social: '/assets/oto/prompt/screenshot-social.webp',
  people: '/assets/oto/prompt/happy-people.webp',
} as const

const VALUE_ROWS = [
  { emoji: '🔍', titleKey: 'account.prompt.valueRow1Title', subtitleKey: 'account.prompt.valueRow1Sub', value: '$97' },
  { emoji: '📚', titleKey: 'account.prompt.valueRow2Title', subtitleKey: 'account.prompt.valueRow2Sub', value: '$47' },
  { emoji: '🎯', titleKey: 'account.prompt.valueRow3Title', subtitleKey: 'account.prompt.valueRow3Sub', value: '$29' },
  { emoji: '✍️', titleKey: 'account.prompt.valueRow4Title', subtitleKey: 'account.prompt.valueRow4Sub', value: '$19' },
] as const

const OFFER_CHECK_KEYS = [
  'account.prompt.check1',
  'account.prompt.check2',
  'account.prompt.check3',
  'account.prompt.check4',
] as const

const HOW_STEPS = [
  { emoji: '🔍', titleKey: 'account.prompt.howSearchTitle', subtitleKey: 'account.prompt.howSearchSub', tone: 'blue' },
  { emoji: '📋', titleKey: 'account.prompt.howCopyTitle', subtitleKey: 'account.prompt.howCopySub', tone: 'blue' },
  { emoji: '✅', titleKey: 'account.prompt.howResultsTitle', subtitleKey: 'account.prompt.howResultsSub', tone: 'green' },
] as const

const OUTPUTS = [
  {
    src: ASSETS.sales,
    altKey: 'account.prompt.outputSalesAlt',
    titleKey: 'account.prompt.outputSalesTitle',
    captionKey: 'account.prompt.outputSalesCap',
  },
  {
    src: ASSETS.ebook,
    altKey: 'account.prompt.outputEbookAlt',
    titleKey: 'account.prompt.outputEbookTitle',
    captionKey: 'account.prompt.outputEbookCap',
  },
  {
    src: ASSETS.social,
    altKey: 'account.prompt.outputSocialAlt',
    titleKey: 'account.prompt.outputSocialTitle',
    captionKey: 'account.prompt.outputSocialCap',
  },
] as const

const BENEFITS = [
  { emoji: '🚀', color: 'bg-green-100', titleKey: 'account.prompt.benefit1Title', descKey: 'account.prompt.benefit1Desc' },
  { emoji: '🎯', color: 'bg-purple-100', titleKey: 'account.prompt.benefit2Title', descKey: 'account.prompt.benefit2Desc' },
  { emoji: '✍️', color: 'bg-red-100', titleKey: 'account.prompt.benefit3Title', descKey: 'account.prompt.benefit3Desc' },
  { emoji: '⏰', color: 'bg-blue-100', titleKey: 'account.prompt.benefit4Title', descKey: 'account.prompt.benefit4Desc' },
  { emoji: '💰', color: 'bg-amber-100', titleKey: 'account.prompt.benefit5Title', descKey: 'account.prompt.benefit5Desc' },
] as const

const FAQ_KEYS = [
  { q: 'account.prompt.faq1Q', a: 'account.prompt.faq1A' },
  { q: 'account.prompt.faq2Q', a: 'account.prompt.faq2A' },
  { q: 'account.prompt.faq3Q', a: 'account.prompt.faq3A' },
  { q: 'account.prompt.faq4Q', a: 'account.prompt.faq4A' },
] as const

const CHIP_KEYS = [
  'account.prompt.chipInstant',
  'account.prompt.chipPrompts',
  'account.prompt.chipOnePayment',
  'account.prompt.chipSearchable',
] as const

function UnauthRedirect() {
  useEffect(() => {
    window.location.href = '/login'
  }, [])
  return <AuthSpinner />
}

function BounceDashboard() {
  useEffect(() => {
    window.location.href = '/app/dashboard'
  }, [])
  const { t } = useI18n()
  return <AuthSpinner message={t('account.common.almostThere')} />
}

function Tick({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function ValueRow({
  emoji,
  title,
  subtitle,
  value,
  isLast,
}: {
  emoji: string
  title: string
  subtitle: string
  value: string
  isLast?: boolean
}) {
  return (
    <div className={`flex items-center gap-3 p-4 ${isLast ? '' : 'border-b border-sw-grey-border'}`}>
      <div className="w-11 h-11 rounded-xl bg-sw-blue-light flex items-center justify-center text-xl flex-shrink-0">
        {emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sw-dark text-sm">{title}</p>
        <p className="text-xs text-sw-grey">{subtitle}</p>
      </div>
      <span className="text-sm font-bold text-sw-grey line-through">{value}</span>
    </div>
  )
}

function Benefit({ emoji, color, title, desc }: { emoji: string; color: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center text-xl flex-shrink-0`}>
        {emoji}
      </div>
      <div>
        <p className="font-bold text-sw-dark text-sm">{title}</p>
        <p className="text-xs text-sw-grey">{desc}</p>
      </div>
    </div>
  )
}

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-[10px] font-medium text-sw-grey">
      <Tick className="w-2.5 h-2.5 text-green-500" />
      {label}
    </span>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-sw-grey-border overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-semibold text-sw-dark">{question}</span>
        <svg
          className={`w-4 h-4 text-sw-grey flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open ? (
        <div className="px-4 pb-4">
          <p className="text-xs text-sw-grey leading-relaxed">{answer}</p>
        </div>
      ) : null}
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
  const { t } = useI18n()
  return (
    <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/30 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500 text-white text-[10px] font-extrabold leading-tight text-center">
            75%
            <br />
            {t('account.common.off')}
          </span>
          <div>
            <p className="text-sm font-bold text-green-600">{t('account.prompt.newMemberPricing')}</p>
            <p className="text-xs text-sw-grey">
              {t('account.prompt.revertsTo')} <span className="line-through">${WAS}</span> {t('account.prompt.afterSetup')}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-amber-600">{t('account.common.todayOnly')}</p>
          <p className="text-3xl font-extrabold text-green-600">${PRICE}</p>
        </div>
      </div>
      <div className="mb-4 py-3 px-4 rounded-xl bg-white border border-sw-grey-border">
        <div className="space-y-2">
          {OFFER_CHECK_KEYS.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Tick className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-xs font-medium text-sw-dark">{t(item)}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        data-testid="upgrade-prompt-cta"
        onClick={onPurchase}
        disabled={purchaseState === 'processing'}
        className="w-full py-4 rounded-full bg-sw-blue hover:bg-sw-blue-hover text-white font-bold text-lg transition-all active:scale-[0.98] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed mb-3"
      >
        {purchaseState === 'processing' ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            {t('account.common.processing')}
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">{t('account.prompt.yesInstantAccess')}</span>
        )}
      </button>
      <div className="flex items-center justify-center gap-4 mb-3">
        <span className="flex items-center gap-1 text-[10px] text-sw-grey font-medium">
          <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          {t('account.common.securePayment')}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-sw-grey font-medium">
          <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {t('account.common.instantAccess')}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-sw-grey font-medium">
          <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {t('account.common.noSubscription')}
        </span>
      </div>
      {errorMessage ? <p className="text-sm text-red-700 text-center font-medium mb-3">{errorMessage}</p> : null}
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
          data-testid="upgrade-prompt-skip"
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
  const { t } = useI18n()
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-extrabold text-sw-dark mb-2">{t('account.common.paymentSuccessful')}</h2>
        <p className="text-sw-dark font-semibold text-base mb-1">{t('account.prompt.successUnlocked')}</p>
        <p className="text-sw-grey text-sm mb-2">
          {t('account.prompt.successBody').replace('{prompts}', PROMPTS)}
        </p>
        <div className="mt-6">
          <div className="w-6 h-6 border-2 border-sw-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-sw-grey mt-2">{t('account.common.takingYouNext')}</p>
        </div>
      </div>
    </div>
  )
}

export function PromptOffer({ hasSavedCard = true }: { hasSavedCard?: boolean }) {
  const { t } = useI18n()
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
      setError(REVIEW_PURCHASE_BLOCKED)
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
      <OtoChrome
        activeStep="Upgrades"
        pillLabel={t('account.prompt.pillLabel')}
        pillSubLabel={t('account.prompt.pillSubLabel')}
        pillClassName="border-2 border-amber-300 bg-amber-50"
      />
      <main className="max-w-2xl mx-auto px-4 pb-32">
        <section className="text-center pt-5 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-sw-dark leading-tight mb-3">
            <span className="text-sw-blue">{PROMPTS}</span> {t('account.prompt.heroTitle')}
            <br />
            <span className="underline decoration-amber-400 decoration-[3px] underline-offset-4">
              {t('account.prompt.heroTitleUnderline')}
            </span>
          </h1>
          <p className="text-base text-sw-grey leading-relaxed max-w-md mx-auto">{t('account.prompt.heroSub')}</p>
        </section>
        <div
          className="rounded-2xl overflow-hidden mb-6"
          style={{ background: 'linear-gradient(180deg, #f0f4ff 0%, #e8ecf7 100%)' }}
        >
          <img
            src={ASSETS.books}
            alt={t('account.prompt.heroAlt')}
            className="w-full"
          />
        </div>
        <div
          className="rounded-2xl border border-sw-grey-border p-6 mb-6"
          style={{ background: 'linear-gradient(180deg, #f5f7ff 0%, #eef1fb 100%)' }}
        >
          <p className="text-sm font-extrabold text-sw-dark text-center uppercase tracking-wider mb-5 flex items-center justify-center gap-2">
            <span className="text-sw-blue">✦</span>
            {t('account.prompt.worksWith')}
            <span className="text-sw-blue">✦</span>
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { src: ASSETS.claude, name: 'Claude' },
              { src: ASSETS.chatgpt, name: 'ChatGPT' },
              { src: ASSETS.gemini, name: 'Gemini' },
            ].map((tool) => (
              <div key={tool.name} className="flex flex-col items-center gap-3">
                <img src={tool.src} alt={tool.name} className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
                <span className="text-sm font-bold text-sw-dark">{tool.name}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-5">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sw-grey-border text-sm text-sw-grey font-medium shadow-sm">
              <svg className="w-4 h-4 text-sw-blue" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {t('account.prompt.everyOtherAi')}
            </span>
          </div>
        </div>
        <section className="mb-6">
          <h2 className="text-xl font-extrabold text-sw-dark text-center mb-4">{t('account.prompt.everythingYouGet')}</h2>
          <div className="rounded-2xl border border-sw-grey-border overflow-hidden">
            {VALUE_ROWS.map((row, index) => (
              <ValueRow
                key={row.titleKey}
                emoji={row.emoji}
                title={t(row.titleKey)}
                subtitle={t(row.subtitleKey)}
                value={row.value}
                isLast={index === VALUE_ROWS.length - 1}
              />
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-sw-grey">
              {t('account.prompt.totalValue')} <span className="line-through font-semibold">$192</span>
            </p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-3xl font-extrabold text-green-600">${PRICE}</span>
              <span className="text-sm text-sw-grey">{t('account.prompt.oneTimePayment')}</span>
            </div>
            <p className="text-xs text-sw-grey mt-1 italic">{t('account.prompt.lessThanCoffee')}</p>
          </div>
        </section>
        <div className="flex items-center justify-center gap-3 py-4 mb-6 rounded-xl bg-sw-blue-light/40 border border-sw-blue-border">
          <img src={ASSETS.avatars} alt={t('account.prompt.happyMembersAlt')} className="h-9 rounded-full" />
          <div>
            <span className="text-sm font-bold text-sw-dark">{t('account.welcome.membersCount')}</span>
            <span className="text-sm text-sw-grey">{t('account.prompt.membersUsing')}</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-semibold text-sw-dark">4.9/5</span>
          <span className="text-xs text-sw-grey">{t('account.prompt.ratings')}</span>
        </div>
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
          <h2 className="text-2xl sm:text-3xl font-extrabold text-sw-dark text-center leading-tight mb-6">
            {t('account.prompt.howItWorks')}
          </h2>
          <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
            <div className="grid grid-cols-3 gap-3 text-center">
              {HOW_STEPS.map((step) => (
                <div key={step.titleKey}>
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 ${
                      step.tone === 'green'
                        ? 'bg-green-500/20 border-2 border-green-500/50'
                        : 'bg-sw-blue/20 border-2 border-sw-blue/50'
                    }`}
                  >
                    <span className="text-2xl">{step.emoji}</span>
                  </div>
                  <p className="text-white font-bold text-sm">{t(step.titleKey)}</p>
                  <p className="text-gray-400 text-xs mt-1">{t(step.subtitleKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-extrabold text-sw-dark text-center mb-4">{t('account.prompt.realOutputs')}</h2>
          <div className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden border border-sw-grey-border p-3 bg-gray-50">
            {OUTPUTS.map((item) => (
              <div key={item.titleKey} className="text-center">
                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-1.5 bg-white border border-gray-200">
                  <img src={item.src} alt={t(item.altKey)} className="w-full h-full object-cover" />
                </div>
                <p className="text-[10px] font-bold text-sw-dark uppercase tracking-wide">{t(item.titleKey)}</p>
                <p className="text-[9px] text-sw-grey">{t(item.captionKey)}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-sw-dark text-center leading-tight mb-1">
            {t('account.prompt.createExpert')}{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, hsl(var(--sw-blue)), hsl(270, 70%, 55%))' }}
            >
              {t('account.prompt.inMinutes')}
            </span>
          </h2>
          <p className="text-sm text-sw-grey text-center mb-6">{t('account.prompt.notHours')}</p>
          <div className="rounded-2xl border border-sw-grey-border p-5 bg-white space-y-4">
            {BENEFITS.map((item) => (
              <Benefit
                key={item.titleKey}
                emoji={item.emoji}
                color={item.color}
                title={t(item.titleKey)}
                desc={t(item.descKey)}
              />
            ))}
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-extrabold text-sw-dark text-center mb-4">{t('account.prompt.quickQuestions')}</h2>
          <div className="space-y-3">
            {FAQ_KEYS.map((item) => (
              <FaqItem
                key={item.q}
                question={t(item.q)}
                answer={
                  item.a === 'account.prompt.faq4A'
                    ? t(item.a).replace('{prompts}', PROMPTS).replace('{brand}', COMPANY.brandName)
                    : t(item.a)
                }
              />
            ))}
          </div>
        </section>
        <section className="mb-6">
          <div className="text-center mb-4">
            <img
              src={ASSETS.people}
              alt={t('account.prompt.membersResultsAlt')}
              className="w-full max-w-xs mx-auto rounded-2xl"
            />
            <p className="text-xs text-sw-grey mt-2 font-medium">{t('account.prompt.joinThousands')}</p>
          </div>
          <div className="text-center mb-4 py-3 px-4 rounded-xl bg-red-50 border border-red-200">
            <p className="text-sm font-bold text-red-700">{t('account.prompt.priceOnlyNow')}</p>
            <p className="text-xs text-red-600 mt-1">
              {t('account.prompt.priceRevertNote').replace('${was}', `$${WAS}`)}
            </p>
          </div>
          <OfferCard
            purchaseState={state}
            errorMessage={error}
            hasSavedCard={hasSavedCard}
            onPurchase={() => void buy()}
            onSkip={skip}
          />
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {CHIP_KEYS.map((label) => (
              <Chip key={label} label={t(label)} />
            ))}
          </div>
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={skip}
              className="text-sm text-sw-grey underline underline-offset-2 hover:text-sw-dark transition-colors"
            >
              {t('account.common.noThanksSkipOffer')}
            </button>
          </div>
        </section>
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
              {state === 'processing' ? t('account.common.processing') : t('account.prompt.getInstantAccess')}
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

function PromptGate() {
  const status = useUpsellStatus(OFFER)
  const hasCard = useHasSavedCard()
  const user = useCurrentUser()
  const review = armReviewMode(user?.email)

  if (status === undefined || hasCard === undefined || user === undefined) {
    return <AuthSpinner />
  }
  if (user?.onboardingComplete && !review) return <BounceDashboard />
  return <PromptOffer hasSavedCard={Boolean(hasCard)} />
}

export default function UpgradePromptPage() {
  return (
    <>
      <AuthLoading>
        <AuthSpinner />
      </AuthLoading>
      <Unauthenticated>
        <UnauthRedirect />
      </Unauthenticated>
      <Authenticated>
        <PromptGate />
      </Authenticated>
    </>
  )
}
