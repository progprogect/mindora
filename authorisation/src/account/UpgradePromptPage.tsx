import { useEffect, useRef, useState } from 'react'
import OtoChrome from '@/account/OtoChrome'
import { Authenticated, AuthLoading, Unauthenticated } from '@/auth/authGates'
import AuthSpinner from '@/auth/AuthSpinner'
import { useCurrentUser } from '@/auth/session'
import { buyOffer, recordUpsellEvent } from '@/lib/api'
import { useHasSavedCard, useUpsellStatus } from '@/lib/lmsQueries'
import { armReviewMode, isReviewPurchaseBlocked, REVIEW_PURCHASE_BLOCKED } from '@/lib/reviewMode'
import { attributionPayload, track } from '@/lib/track'
import BrandWordmark from '@/shared/BrandWordmark'
import { COMPANY } from '@/shared/company'

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
  {
    emoji: '🔍',
    title: 'Online Searchable Prompt Library',
    subtitle: '28,000+ prompts — find the perfect one in seconds',
    value: '$97',
  },
  {
    emoji: '📚',
    title: 'Expert PDF Prompt Guides (7 Books)',
    subtitle: '2,000+ curated prompts, categorised & ready to use',
    value: '$47',
  },
  {
    emoji: '🎯',
    title: 'Goal & Productivity Frameworks',
    subtitle: 'Proven action plans for real results',
    value: '$29',
  },
  {
    emoji: '✍️',
    title: 'Content Creation Templates',
    subtitle: 'Email, social, blog — all done for you',
    value: '$19',
  },
] as const

const OFFER_CHECKS = [
  '28,000+ prompts in searchable online library',
  '2,000+ curated expert prompts (PDF downloads)',
  'Works with Claude, ChatGPT, Gemini & all AI',
  'Lifetime access — no subscription',
] as const

const HOW_STEPS = [
  { emoji: '🔍', title: 'Search', subtitle: 'Find the perfect prompt instantly', tone: 'blue' },
  { emoji: '📋', title: 'Copy', subtitle: 'One click to copy', tone: 'blue' },
  { emoji: '✅', title: 'Results', subtitle: 'Paste into any AI & go', tone: 'green' },
] as const

const OUTPUTS = [
  { src: ASSETS.sales, alt: 'Sales page created with AI prompts', title: 'Sales Pages', caption: 'High-converting copy' },
  { src: ASSETS.ebook, alt: 'Ebook created with AI prompts', title: 'Guides & Ebooks', caption: 'Expert-level content' },
  { src: ASSETS.social, alt: 'Social content created with AI prompts', title: 'Social Media', caption: 'Engagement-ready posts' },
] as const

const BENEFITS = [
  {
    emoji: '🚀',
    color: 'bg-green-100',
    title: 'Accelerate Your Learning',
    desc: 'Extract key insights from any topic instantly with targeted prompts.',
  },
  {
    emoji: '🎯',
    color: 'bg-purple-100',
    title: 'Apply Knowledge Immediately',
    desc: 'Turn what you learn into action plans, summaries, and real outputs.',
  },
  {
    emoji: '✍️',
    color: 'bg-red-100',
    title: 'Create Content That Impresses',
    desc: 'Professional emails, LinkedIn posts, blog outlines — all done.',
  },
  {
    emoji: '⏰',
    color: 'bg-blue-100',
    title: 'Save Hours Every Single Week',
    desc: 'Stop staring at blank screens. Get expert-level results on demand.',
  },
  {
    emoji: '💰',
    color: 'bg-amber-100',
    title: 'Generate Real Business Results',
    desc: 'Sales copy, marketing campaigns, business strategies — ready to deploy.',
  },
] as const

const FAQS = [
  {
    question: 'What if I already have prompts?',
    answer:
      'These are professionally crafted, categorised, and searchable. No more scrolling through notes or bookmarks — find the exact prompt you need in seconds.',
  },
  {
    question: 'Do I have to pay again later?',
    answer:
      'No. This is a one-time payment. You get lifetime access with no recurring fees, ever. The price reverts to $39.95 after this page.',
  },
  {
    question: 'Which AI tools does this work with?',
    answer:
      'All of them — Claude, ChatGPT, Gemini, Copilot, Perplexity, and any other AI tool that accepts text prompts.',
  },
  {
    question: 'How do I access the online library?',
    answer: `Instantly. As soon as your payment is confirmed, you'll have access to search all ${PROMPTS} prompts right inside your ${COMPANY.brandName} dashboard.`,
  },
] as const

const CHIPS = ['Instant access', '28,000+ prompts', 'One payment forever', 'Searchable library'] as const

function UnauthRedirect() {
  useEffect(() => {
    window.location.href = '/login'
  }, [])
  return <AuthSpinner />
}

function BounceNext() {
  useEffect(() => {
    window.location.href = NEXT
  }, [])
  return <AuthSpinner message="Almost there..." />
}

function BounceDashboard() {
  useEffect(() => {
    window.location.href = '/app/dashboard'
  }, [])
  return <AuthSpinner message="Almost there..." />
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
  purchaseState: 'idle' | 'processing' | 'success' | 'failed'
  errorMessage: string
  hasSavedCard: boolean
  onPurchase: () => void
  onSkip: () => void
}) {
  return (
    <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/30 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500 text-white text-[10px] font-extrabold leading-tight text-center">
            75%
            <br />
            OFF
          </span>
          <div>
            <p className="text-sm font-bold text-green-600">New Member Pricing</p>
            <p className="text-xs text-sw-grey">
              Reverts to <span className="line-through">${WAS}</span> after setup
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-amber-600">Today Only</p>
          <p className="text-3xl font-extrabold text-green-600">${PRICE}</p>
        </div>
      </div>
      <div className="mb-4 py-3 px-4 rounded-xl bg-white border border-sw-grey-border">
        <div className="space-y-2">
          {OFFER_CHECKS.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Tick className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-xs font-medium text-sw-dark">{item}</span>
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
            Processing...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">YES! Give Me Instant Access →</span>
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
          Secure Payment
        </span>
        <span className="flex items-center gap-1 text-[10px] text-sw-grey font-medium">
          <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Instant Access
        </span>
        <span className="flex items-center gap-1 text-[10px] text-sw-grey font-medium">
          <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          No Subscription
        </span>
      </div>
      {purchaseState === 'failed' && errorMessage ? (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-3">
          <p className="text-sm text-red-700 text-center font-medium">{errorMessage}</p>
          <div className="flex gap-3 mt-3">
            <button
              type="button"
              onClick={onPurchase}
              className="flex-1 py-2.5 text-sm font-semibold text-sw-blue border border-sw-blue rounded-full hover:bg-sw-blue-light transition-colors"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="flex-1 py-2.5 text-sm font-semibold text-white bg-sw-dark rounded-full hover:opacity-90 transition-opacity"
            >
              Continue →
            </button>
          </div>
        </div>
      ) : null}
      <div className="rounded-xl border border-sw-grey-border bg-white p-3 mb-3">
        <p className="text-xs text-sw-grey text-center leading-relaxed">
          By clicking above, <span className="font-bold text-sw-dark">you agree to a one-time charge of ${PRICE}</span>
          {hasSavedCard
            ? ' using your saved payment method. Access is granted instantly.'
            : ' via Stripe. Access is granted after payment.'}{' '}
          This offer reverts to ${WAS} after you leave this page.
        </p>
      </div>
      <div className="text-center">
        <button
          type="button"
          data-testid="upgrade-prompt-skip"
          onClick={onSkip}
          className="text-sm text-sw-grey underline underline-offset-2 hover:text-sw-dark transition-colors"
        >
          No thanks, skip this offer
        </button>
      </div>
    </div>
  )
}

function SuccessScreen() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-extrabold text-sw-dark mb-2">Payment Successful!</h2>
        <p className="text-sw-dark font-semibold text-base mb-1">⚡ Prompt Library Unlocked</p>
        <p className="text-sw-grey text-sm mb-2">
          {PROMPTS} prompts are ready in your dashboard. Copy, paste, and get instant results.
        </p>
        <div className="mt-6">
          <div className="w-6 h-6 border-2 border-sw-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-sw-grey mt-2">Taking you to your next step...</p>
        </div>
      </div>
    </div>
  )
}

export function PromptOffer({ hasSavedCard = true }: { hasSavedCard?: boolean }) {
  const [state, setState] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle')
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
      window.onbeforeunload = null
      window.location.href = NEXT
    }, 3000)
    return () => clearTimeout(timer)
  }, [state])

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
      setState('failed')
      setError(result.error || 'Payment failed. Continue without the library for now — you can add it later.')
      track('upsell_purchase_failed', { offer: OFFER, error: result.error, fallback_shown: false })
    } catch (err) {
      setState('failed')
      setError('Something went wrong. Continue without the library for now — you can add it later.')
      track('upsell_purchase_error', { offer: OFFER, error: String(err), fallback_shown: false })
    }
  }

  const skip = () => {
    if (skipped.current) return
    skipped.current = true
    void recordUpsellEvent({ offerSlug: OFFER, action: 'skipped' })
    track('upsell_skipped', { offer: OFFER })
    window.onbeforeunload = null
    window.location.href = NEXT
  }

  if (state === 'success') return <SuccessScreen />

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <OtoChrome
        activeStep="Upgrades"
        pillLabel="🔥 New Member Pricing"
        pillSubLabel="Only available right now"
        pillClassName="border-2 border-amber-300 bg-amber-50"
      />
      <main className="max-w-2xl mx-auto px-4 pb-32">
        <section className="text-center pt-5 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-sw-dark leading-tight mb-3">
            <span className="text-sw-blue">{PROMPTS}</span> AI Prompts.
            <br />
            <span className="underline decoration-amber-400 decoration-[3px] underline-offset-4">Instant Results.</span>
          </h1>
          <p className="text-base text-sw-grey leading-relaxed max-w-md mx-auto">
            Copy, paste and get better answers, ideas and content in minutes.
          </p>
        </section>
        <div
          className="rounded-2xl overflow-hidden mb-6"
          style={{ background: 'linear-gradient(180deg, #f0f4ff 0%, #e8ecf7 100%)' }}
        >
          <img
            src={ASSETS.books}
            alt="The Ultimate AI Prompt Library — 8 expert guide books with 28,000+ prompts included"
            className="w-full max-w-md mx-auto"
          />
        </div>
        <div
          className="rounded-2xl border border-sw-grey-border p-6 mb-6"
          style={{ background: 'linear-gradient(180deg, #f5f7ff 0%, #eef1fb 100%)' }}
        >
          <p className="text-sm font-extrabold text-sw-dark text-center uppercase tracking-wider mb-5 flex items-center justify-center gap-2">
            <span className="text-sw-blue">✦</span>
            Works instantly with
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
              & every other AI tool
            </span>
          </div>
        </div>
        <section className="mb-6">
          <h2 className="text-xl font-extrabold text-sw-dark text-center mb-4">Here&apos;s Everything You Get:</h2>
          <div className="rounded-2xl border border-sw-grey-border overflow-hidden">
            {VALUE_ROWS.map((row, index) => (
              <ValueRow key={row.title} {...row} isLast={index === VALUE_ROWS.length - 1} />
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-sw-grey">
              Total Value: <span className="line-through font-semibold">$192</span>
            </p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-3xl font-extrabold text-green-600">${PRICE}</span>
              <span className="text-sm text-sw-grey">one-time payment</span>
            </div>
            <p className="text-xs text-sw-grey mt-1 italic">That&apos;s less than a single coffee.</p>
          </div>
        </section>
        <div className="flex items-center justify-center gap-3 py-4 mb-6 rounded-xl bg-sw-blue-light/40 border border-sw-blue-border">
          <img src={ASSETS.avatars} alt="Happy members" className="h-9 rounded-full" />
          <div>
            <span className="text-sm font-bold text-sw-dark">100,000+ members</span>
            <span className="text-sm text-sw-grey"> already using this</span>
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
          <span className="text-xs text-sw-grey">(2,847 ratings)</span>
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
          <h2 className="text-2xl sm:text-3xl font-extrabold text-sw-dark text-center leading-tight mb-6">How It Works</h2>
          <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
            <div className="grid grid-cols-3 gap-3 text-center">
              {HOW_STEPS.map((step) => (
                <div key={step.title}>
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 ${
                      step.tone === 'green'
                        ? 'bg-green-500/20 border-2 border-green-500/50'
                        : 'bg-sw-blue/20 border-2 border-sw-blue/50'
                    }`}
                  >
                    <span className="text-2xl">{step.emoji}</span>
                  </div>
                  <p className="text-white font-bold text-sm">{step.title}</p>
                  <p className="text-gray-400 text-xs mt-1">{step.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-extrabold text-sw-dark text-center mb-4">Real Outputs From These Prompts</h2>
          <div className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden border border-sw-grey-border p-3 bg-gray-50">
            {OUTPUTS.map((item) => (
              <div key={item.title} className="text-center">
                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-1.5 bg-white border border-gray-200">
                  <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                </div>
                <p className="text-[10px] font-bold text-sw-dark uppercase tracking-wide">{item.title}</p>
                <p className="text-[9px] text-sw-grey">{item.caption}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-sw-dark text-center leading-tight mb-1">
            Create Expert-Level Content{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, hsl(var(--sw-blue)), hsl(270, 70%, 55%))' }}
            >
              In Minutes
            </span>
          </h2>
          <p className="text-sm text-sw-grey text-center mb-6">Not hours. Not days. Minutes.</p>
          <div className="rounded-2xl border border-sw-grey-border p-5 bg-white space-y-4">
            {BENEFITS.map((item) => (
              <Benefit key={item.title} {...item} />
            ))}
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-extrabold text-sw-dark text-center mb-4">Quick Questions</h2>
          <div className="space-y-3">
            {FAQS.map((item) => (
              <FaqItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </section>
        <section className="mb-6">
          <div className="text-center mb-4">
            <img src={ASSETS.people} alt="Members getting results" className="w-full max-w-xs mx-auto rounded-2xl" />
            <p className="text-xs text-sw-grey mt-2 font-medium">Join thousands already getting better results with AI</p>
          </div>
          <div className="text-center mb-4 py-3 px-4 rounded-xl bg-red-50 border border-red-200">
            <p className="text-sm font-bold text-red-700">⚠️ This price is only available right now</p>
            <p className="text-xs text-red-600 mt-1">
              After setup, this offer reverts to ${WAS}. This is a genuine one-time discount.
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
            {CHIPS.map((label) => (
              <Chip key={label} label={label} />
            ))}
          </div>
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={skip}
              className="text-sm text-sw-grey underline underline-offset-2 hover:text-sw-dark transition-colors"
            >
              No thanks, skip this offer
            </button>
          </div>
        </section>
      </main>
      {sticky ? (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-sw-grey-border shadow-lg">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-semibold text-sw-grey">Only</span>
                <span className="font-extrabold text-xl text-sw-dark">${PRICE}</span>
              </div>
              <button
                type="button"
                onClick={skip}
                className="text-[11px] text-sw-grey underline underline-offset-2 hover:text-sw-dark transition-colors text-left"
              >
                Skip offer →
              </button>
            </div>
            <button
              type="button"
              onClick={() => void buy()}
              disabled={state === 'processing'}
              className="px-7 py-3 bg-sw-blue hover:bg-sw-blue-hover text-white text-base font-bold rounded-full transition-all active:scale-95 disabled:opacity-60 whitespace-nowrap"
            >
              {state === 'processing' ? 'Processing...' : 'Get Instant Access →'}
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
  if (review) return <PromptOffer hasSavedCard={Boolean(hasCard)} />
  if (status.status === 'purchased' || status.status === 'skipped') return <BounceNext />
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
