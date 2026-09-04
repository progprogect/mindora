import { useState } from 'react'
import { buyOffer } from '@/lib/api'
import { useHasSavedCard } from '@/lib/lmsQueries'

const VALUE_ROWS = [
  { icon: '🔍', label: 'Online Searchable Prompt Library', sub: '28,000+ prompts', price: '$97' },
  { icon: '📚', label: 'Expert PDF Prompt Guides (7 Books)', sub: '2,000+ curated prompts', price: '$47' },
  { icon: '🎯', label: 'Goal & Productivity Frameworks', sub: 'Proven action plans', price: '$29' },
  { icon: '✍️', label: 'Content Creation Templates', sub: 'Email, social, blog — done for you', price: '$19' },
]

type ChargePhase = 'idle' | 'processing' | 'success' | 'error'

export default function PromptLibraryModal({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<ChargePhase>('idle')
  const [error, setError] = useState<string | null>(null)
  const hasCard = useHasSavedCard()
  const locked = phase === 'processing' || phase === 'success'

  const buy = async () => {
    if (locked) return
    setPhase('processing')
    setError(null)
    try {
      const result = await buyOffer({ offerSlug: 'ultimate-prompt-library' })
      if (result.checkoutUrl) return
      if (result.success || result.alreadyPurchased) {
        setPhase('success')
        setTimeout(() => window.location.reload(), 1500)
        return
      }
      setPhase('error')
      setError(result.error || 'Payment failed. Please try again.')
    } catch {
      setPhase('error')
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }}
      onClick={locked ? undefined : onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl animate-scale-in"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={locked}
          aria-label="Close"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-sw-grey-light text-sw-grey transition-colors hover:bg-gray-200 disabled:opacity-40"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="mb-5 text-center">
          <div
            className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
            style={{ background: 'linear-gradient(135deg, rgb(245, 159, 10) 0%, rgb(249, 116, 21) 100%)' }}
          >
            ⚡
          </div>
          <h2 className="text-xl font-extrabold leading-tight text-sw-dark">
            The Ultimate AI
            <br />
            Prompt Library
          </h2>
          <p className="mt-1.5 text-sm text-sw-grey">Instant access to 27,200+ expert-crafted prompts</p>
        </div>
        <div className="mb-4 overflow-hidden rounded-xl border border-sw-grey-border/60">
          <p className="border-b border-sw-grey-border/40 bg-gray-50 py-2 text-center text-xs font-bold text-sw-dark">
            Here&apos;s Everything You Get:
          </p>
          <div className="divide-y divide-sw-grey-border/30">
            {VALUE_ROWS.map((row) => (
              <div key={row.label} className="flex items-center gap-2.5 px-3 py-2">
                <span className="flex-shrink-0 text-base">{row.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold leading-tight text-sw-dark">{row.label}</p>
                  <p className="text-[10px] leading-tight text-sw-grey">{row.sub}</p>
                </div>
                <span className="flex-shrink-0 text-xs text-sw-grey">{row.price}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-sw-grey-border/40 bg-gray-50 py-2 text-center">
            <span className="text-xs text-sw-grey">Total Value: </span>
            <span className="text-xs font-bold text-sw-dark">$192</span>
          </div>
        </div>
        <div className="text-center">
          <p className="mb-1 text-xs text-sw-grey">Get everything above for just</p>
          <span className="text-3xl font-extrabold text-sw-dark">$19.95</span>
          <p className="mt-1 mb-4 text-[11px] text-sw-grey">One-time payment · Lifetime access · No subscription</p>
          {phase === 'success' ? (
            <div data-testid="prompt-library-modal-unlocked" className="py-4 text-center">
              <div
                className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: 'hsl(142 71% 95%)' }}
              >
                <svg
                  className="h-6 w-6"
                  style={{ color: 'hsl(var(--sw-success))' }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-bold text-sw-dark">Unlocked!</p>
              <p className="mt-1 text-xs text-sw-grey">Loading your library...</p>
            </div>
          ) : (
            <button
              type="button"
              data-testid="prompt-library-modal-buy"
              disabled={phase === 'processing'}
              onClick={() => void buy()}
              className="w-full rounded-full bg-sw-blue py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-sw-blue-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {phase === 'processing' ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing...
                </span>
              ) : (
                'Unlock Now — $19.95'
              )}
            </button>
          )}
          {phase === 'error' && error ? (
            <div className="mt-2">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          ) : null}
          <p className="mt-3 text-[10px] text-sw-grey">
            {hasCard === true ? '🔒 Secure one-click payment using your saved card' : '🔒 Secure payment via Stripe'}
          </p>
        </div>
      </div>
    </div>
  )
}
