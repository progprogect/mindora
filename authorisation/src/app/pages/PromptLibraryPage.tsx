import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { chargeUpsell } from '@/lib/api'
import { usePurchases } from '@/lib/lmsQueries'

const INCLUDED = [
  'Social Media, Marketing & Sales prompts',
  'Business, Career & Finance frameworks',
  'Content creation & SEO templates',
  'Personal development & productivity',
  '11 downloadable PDF guides',
  'Searchable online library with copy button',
]

const VALUE_ROWS = [
  { icon: '🔍', label: 'Online Searchable Prompt Library', price: '$97' },
  { icon: '📚', label: 'Expert PDF Prompt Guides (7 Books)', price: '$47' },
  { icon: '🎯', label: 'Goal & Productivity Frameworks', price: '$29' },
  { icon: '✍️', label: 'Content Creation Templates', price: '$19' },
]

export default function PromptLibraryPage() {
  const purchases = usePurchases()
  const owned = purchases?.has('ultimate-prompt-library')
  const [query, setQuery] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const buy = async () => {
    setBusy(true)
    setError(null)
    try {
      const result = await chargeUpsell({ offerSlug: 'ultimate-prompt-library' })
      if (result.success || result.alreadyPurchased) {
        window.location.reload()
        return
      }
      setError(result.error || 'Payment failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="sticky top-0 z-40 bg-white border-b border-sw-grey-border">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center gap-3">
          <Link to="/app/dashboard" className="text-sw-grey active:scale-95 transition-transform">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-base font-bold text-sw-dark">Prompt Library</h1>
        </div>
      </header>

      {owned ? (
        <main className="max-w-2xl mx-auto px-4 pt-8">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search prompts…"
            className="w-full rounded-xl border border-sw-grey-border bg-white px-3 py-2.5 text-sm"
          />
          <p className="mt-6 text-center text-sm text-sw-grey">
            The full 27,200-prompt vault is not in the client bundle. You own access — searchable subset coming from the
            inventory gap listed in Wave 0.
          </p>
          {query ? <p className="mt-3 text-center text-sm">No matches in the local subset for “{query}”.</p> : null}
        </main>
      ) : (
        <main className="max-w-2xl mx-auto px-4 pt-8">
          <div className="bg-gradient-to-br from-sw-blue to-blue-700 rounded-2xl p-6 text-white text-center mb-6">
            <span className="text-4xl block mb-3">⚡</span>
            <h2 className="text-xl font-bold mb-2">27,200+ AI Prompts</h2>
            <p className="text-blue-100 text-sm mb-1">Ready to copy & use across 19 categories</p>
            <p className="text-blue-200 text-xs">Works with ChatGPT, Claude &amp; Gemini</p>
          </div>

          <div className="bg-white rounded-2xl border border-sw-grey-border p-5 mb-5">
            <h3 className="font-bold text-sw-dark text-sm mb-3">What&apos;s included:</h3>
            <div className="space-y-2.5">
              {INCLUDED.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-sw-dark">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-sw-grey-border p-5 mb-5">
            <h3 className="font-bold text-sw-dark text-sm mb-3 text-center">Total Value: $192</h3>
            <div className="space-y-2">
              {VALUE_ROWS.map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-sw-dark">
                    <span>{row.icon}</span>
                    {row.label}
                  </span>
                  <span className="text-xs text-sw-grey">{row.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-sw-blue/30 p-5 text-center mb-4">
            <p className="text-xs text-sw-grey mb-1">Get everything above for just</p>
            <span className="text-3xl font-extrabold text-sw-dark">$19.95</span>
            <p className="text-xs text-sw-grey mt-1 mb-4">One-time payment · Lifetime access</p>
            <button
              type="button"
              disabled={busy}
              onClick={() => void buy()}
              className="w-full py-3.5 rounded-full bg-sw-blue hover:bg-sw-blue-hover text-white font-bold text-sm transition-all active:scale-[0.98] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {busy ? 'Charging…' : 'Unlock Prompt Library — $19.95'}
            </button>
            {error ? <p className="text-sm text-sw-coral mt-3">{error}</p> : null}
            <p className="text-[10px] text-sw-grey mt-3 leading-relaxed">Charges your saved card. Instant access after purchase.</p>
          </div>

          <div className="text-center">
            <button type="button" onClick={() => navigate('/app/dashboard')} className="text-sm text-sw-grey underline underline-offset-2">
              ← Back to Dashboard
            </button>
          </div>
        </main>
      )}
    </div>
  )
}
