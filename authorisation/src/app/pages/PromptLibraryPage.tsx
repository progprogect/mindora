import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { chargeUpsell } from '@/lib/api'
import { usePromptVaultKey } from '@/lib/lmsQueries'

const INCLUDED = [
  'Social Media, Marketing & Sales prompts',
  'Business, Career & Finance frameworks',
  'Content creation & SEO templates',
  'Personal development & productivity',
  '11 downloadable PDF guides',
  'Searchable online library with copy button',
]

const VALUE_ROWS = [
  { icon: '🔍', name: 'Online Searchable Prompt Library', value: '$97' },
  { icon: '📚', name: 'Expert PDF Prompt Guides (7 Books)', value: '$47' },
  { icon: '🎯', name: 'Goal & Productivity Frameworks', value: '$29' },
  { icon: '✍️', name: 'Content Creation Templates', value: '$19' },
]

type ChargePhase = 'idle' | 'processing' | 'success' | 'error'

type VaultCategory = {
  slug: string
  name: string
  count: number
  emoji: string
}

type VaultPrompt = {
  id: number
  t: string
  c: string
}

function Spinner({ className }: { className: string }) {
  return <div className={`border-2 rounded-full animate-spin ${className}`} />
}

export default function PromptLibraryPage() {
  const vaultKey = usePromptVaultKey()
  if (vaultKey === undefined) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Spinner className="w-8 h-8 border-sw-blue border-t-transparent" />
      </div>
    )
  }
  return vaultKey ? <OwnedVault vaultKey={vaultKey} /> : <Paywall />
}

function Paywall() {
  const [phase, setPhase] = useState<ChargePhase>('idle')
  const [error, setError] = useState('')

  const buy = async () => {
    if (phase === 'processing' || phase === 'success') return
    setPhase('processing')
    setError('')
    try {
      const result = await chargeUpsell({ offerSlug: 'ultimate-prompt-library' })
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

  if (phase === 'success') {
    return (
      <div data-testid="prompt-library-unlocked" className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-sw-dark mb-2">Unlocked!</h2>
          <p className="text-sm text-sw-grey">Your Prompt Library is ready. Loading now...</p>
          <div className="mt-4">
            <Spinner className="w-6 h-6 border-sw-blue border-t-transparent mx-auto" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="prompt-library-paywall" className="min-h-screen bg-gray-50 pb-24">
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

      <main className="max-w-2xl mx-auto px-4 pt-8">
        <div className="bg-gradient-to-br from-sw-blue to-blue-700 rounded-2xl p-6 text-white text-center mb-6">
          <span className="text-4xl block mb-3">⚡</span>
          <h2 className="text-xl font-bold mb-2">27,200+ AI Prompts</h2>
          <p className="text-blue-100 text-sm mb-1">Ready to copy & use across 19 categories</p>
          <p className="text-blue-200 text-xs">Works with ChatGPT, Claude & Gemini</p>
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
              <div key={row.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-sw-dark">
                  <span>{row.icon}</span>
                  {row.name}
                </span>
                <span className="text-xs text-sw-grey">{row.value}</span>
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
            data-testid="prompt-library-buy"
            disabled={phase === 'processing'}
            onClick={() => void buy()}
            className="w-full py-3.5 rounded-full bg-sw-blue hover:bg-sw-blue-hover text-white font-bold text-sm transition-all active:scale-[0.98] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {phase === 'processing' ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              'Unlock Prompt Library — $19.95'
            )}
          </button>
          {phase === 'error' && error ? (
            <div
              data-testid="prompt-library-error"
              className="mt-3 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5"
            >
              <p className="text-xs text-red-600">{error}</p>
            </div>
          ) : null}
          <p className="text-[10px] text-sw-grey mt-3 leading-relaxed">Charges your saved card. Instant access after purchase.</p>
        </div>

        <div className="text-center">
          <Link to="/app/dashboard" className="text-sm text-sw-grey underline underline-offset-2">
            ← Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  )
}

function OwnedVault({ vaultKey }: { vaultKey: string }) {
  const base = `/data/${vaultKey}`
  const [categories, setCategories] = useState<VaultCategory[]>([])
  const [slug, setSlug] = useState<string | null>(null)
  const [prompts, setPrompts] = useState<VaultPrompt[]>([])
  const [indexLoading, setIndexLoading] = useState(true)
  const [categoryLoading, setCategoryLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [subcategory, setSubcategory] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [visible, setVisible] = useState(20)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const copyRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    fetch(`${base}/index.json`)
      .then((response) => response.json())
      .then((data: VaultCategory[]) => {
        setCategories(Array.isArray(data) ? data : [])
        setIndexLoading(false)
      })
      .catch(() => setIndexLoading(false))
  }, [base])

  useEffect(() => {
    if (!slug) return
    const category = categories.find((item) => item.slug === slug)
    if (!category) return
    let cancelled = false
    setCategoryLoading(true)
    setPrompts([])
    setVisible(20)
    fetch(`${base}/${encodeURIComponent(category.slug)}.json`)
      .then((response) => response.json())
      .then((data: VaultPrompt[]) => {
        if (cancelled) return
        setPrompts(Array.isArray(data) ? data : [])
        setCategoryLoading(false)
      })
      .catch(() => {
        if (!cancelled) setCategoryLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [base, categories, slug])

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      if (copyRef.current) clearTimeout(copyRef.current)
    }
  }, [])

  const onSearch = useCallback((value: string) => {
    setQuery(value)
    if (value) setSubcategory(null)
    setVisible(20)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => setDebouncedQuery(value), 300)
  }, [])

  const copyPrompt = useCallback((text: string, id: number) => {
    void navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      if (copyRef.current) clearTimeout(copyRef.current)
      copyRef.current = setTimeout(() => setCopiedId(null), 2000)
    })
  }, [])

  const filtered = useMemo(() => {
    let list = prompts.filter((prompt) => prompt.t.length >= 30)
    if (subcategory) list = list.filter((prompt) => prompt.c === subcategory)
    if (debouncedQuery.length >= 2) {
      const needle = debouncedQuery.toLowerCase()
      list = list.filter((prompt) => prompt.t.toLowerCase().includes(needle))
    }
    return list
  }, [prompts, subcategory, debouncedQuery])

  const shown = filtered.slice(0, visible)
  const hasMore = visible < filtered.length
  const totalCount = categories.reduce((sum, item) => sum + item.count, 0)
  const activeName = slug ? categories.find((item) => item.slug === slug)?.name || 'Prompts' : 'Prompt Library'

  const backToCatalog = () => {
    setSlug(null)
    setQuery('')
    setDebouncedQuery('')
    setSubcategory(null)
    setPrompts([])
  }

  if (indexLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Spinner className="w-8 h-8 border-sw-blue border-t-transparent" />
      </div>
    )
  }

  return (
    <div data-testid="prompt-library-vault" className="min-h-screen bg-gray-50 pb-24">
      <header className="sticky top-0 z-40 bg-white border-b border-sw-grey-border">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center gap-3">
          {slug ? (
            <button type="button" onClick={backToCatalog} className="text-sw-grey active:scale-95 transition-transform" aria-label="Back to categories">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <Link to="/app/dashboard" className="text-sw-grey active:scale-95 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          )}
          <h1 className="text-base font-bold text-sw-dark truncate">{activeName}</h1>
          <span className="ml-auto text-[10px] font-bold text-sw-blue bg-sw-blue-light px-2 py-0.5 rounded-full whitespace-nowrap">
            {slug ? `${filtered.length.toLocaleString()} prompts` : `${totalCount.toLocaleString()} prompts`}
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-4">
        {slug ? (
          <>
            <div className="relative mb-4">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sw-grey" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                data-testid="prompt-library-search"
                value={query}
                onChange={(event) => onSearch(event.target.value)}
                placeholder="Search prompts..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-sw-grey-border rounded-xl focus:outline-none focus:ring-2 focus:ring-sw-blue/20 focus:border-sw-blue placeholder:text-sw-grey/60"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setDebouncedQuery('')
                    setVisible(20)
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sw-grey"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : null}
            </div>
            {categoryLoading ? (
              <div className="space-y-3 py-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-xl border border-sw-grey-border p-4 animate-pulse">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-4 w-20 bg-gray-200 rounded-full" />
                      <div className="h-5 w-16 bg-gray-200 rounded-full" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3.5 bg-gray-200 rounded w-full" />
                      <div className="h-3.5 bg-gray-200 rounded w-4/5" />
                      <div className="h-3.5 bg-gray-200 rounded w-3/5" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-10">
                <span className="text-2xl block mb-2">🔍</span>
                <p className="text-sm text-sw-grey">
                  {debouncedQuery ? `No prompts found for "${debouncedQuery}"` : 'No prompts found in this filter'}
                </p>
                {debouncedQuery || subcategory ? (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('')
                      setDebouncedQuery('')
                      setSubcategory(null)
                      setVisible(20)
                    }}
                    className="mt-3 text-sm font-semibold text-sw-blue"
                  >
                    Clear filters
                  </button>
                ) : null}
              </div>
            ) : (
              <>
                <p className="text-[11px] text-sw-grey mb-2">
                  Showing {Math.min(visible, filtered.length).toLocaleString()} of {filtered.length.toLocaleString()} prompts
                  {subcategory ? ` in "${subcategory}"` : null}
                  {debouncedQuery ? ` matching "${debouncedQuery}"` : null}
                </p>
                <SubcategoryChips
                  prompts={prompts}
                  selected={subcategory}
                  onFilter={(value) => {
                    setSubcategory(value)
                    setVisible(20)
                  }}
                />
                <div className="space-y-3 mt-3">
                  {shown.map((prompt) => (
                    <PromptCard
                      key={prompt.id}
                      prompt={prompt}
                      copied={copiedId === prompt.id}
                      onCopy={() => copyPrompt(prompt.t, prompt.id)}
                    />
                  ))}
                </div>
                {hasMore ? (
                  <button
                    type="button"
                    data-testid="prompt-library-show-more"
                    onClick={() => setVisible((count) => count + 20)}
                    className="w-full mt-4 py-3 bg-white border border-sw-grey-border rounded-xl text-sm font-semibold text-sw-blue active:scale-[0.98] transition-transform"
                  >
                    Show more ({(filtered.length - visible).toLocaleString()} remaining)
                  </button>
                ) : null}
              </>
            )}
          </>
        ) : (
          <>
            <div className="bg-gradient-to-br from-sw-blue to-blue-700 rounded-2xl p-5 mb-5 text-white">
              <div className="flex items-start gap-3">
                <span className="text-3xl">⚡</span>
                <div>
                  <h2 className="font-bold text-lg leading-tight">Your AI Prompt Vault</h2>
                  <p className="text-blue-100 text-sm mt-1">
                    {totalCount.toLocaleString()} prompts across {categories.length} categories. Copy any prompt instantly.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[...categories]
                .sort((left, right) => left.name.localeCompare(right.name))
                .map((category) => (
                  <button
                    key={category.slug}
                    type="button"
                    data-testid="prompt-library-category"
                    data-slug={category.slug}
                    onClick={() => setSlug(category.slug)}
                    className="bg-white rounded-xl border border-sw-grey-border p-4 text-left active:scale-[0.97] transition-transform hover:border-sw-blue/30"
                  >
                    <span className="text-2xl block mb-2">{category.emoji}</span>
                    <h3 className="font-bold text-sm text-sw-dark leading-tight">{category.name}</h3>
                    <p className="text-[11px] text-sw-grey mt-1">{category.count.toLocaleString()} prompts</p>
                  </button>
                ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

function SubcategoryChips({
  prompts,
  selected,
  onFilter,
}: {
  prompts: VaultPrompt[]
  selected: string | null
  onFilter: (value: string | null) => void
}) {
  const counts = new Map<string, number>()
  for (const prompt of prompts) counts.set(prompt.c, (counts.get(prompt.c) || 0) + 1)
  const chips = [...counts.entries()].sort((left, right) => right[1] - left[1]).map(([name]) => name)
  if (chips.length <= 1) return null
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
      <button
        type="button"
        onClick={() => onFilter(null)}
        className={`flex-shrink-0 text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-colors ${
          selected ? 'bg-white text-sw-grey border-sw-grey-border' : 'bg-sw-blue text-white border-sw-blue'
        }`}
      >
        All
      </button>
      {chips.map((name) => (
        <button
          key={name}
          type="button"
          onClick={() => onFilter(name)}
          className={`flex-shrink-0 text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-colors ${
            selected === name ? 'bg-sw-blue text-white border-sw-blue' : 'bg-white text-sw-grey border-sw-grey-border'
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  )
}

function PromptCard({
  prompt,
  copied,
  onCopy,
}: {
  prompt: VaultPrompt
  copied: boolean
  onCopy: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const long = prompt.t.length > 200
  return (
    <div
      data-testid="prompt-library-card"
      onClick={onCopy}
      className={`bg-white rounded-xl border p-4 cursor-pointer active:scale-[0.98] transition-all ${
        copied ? 'border-green-300 bg-green-50/30' : 'border-sw-grey-border'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-semibold text-sw-grey bg-gray-100 px-2 py-0.5 rounded-full">{prompt.c}</span>
        <span
          className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full transition-all ${
            copied ? 'bg-green-100 text-green-700' : 'bg-sw-blue-light text-sw-blue'
          }`}
        >
          {copied ? (
            <>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Tap to copy
            </>
          )}
        </span>
      </div>
      <p className="text-sm text-sw-dark leading-relaxed whitespace-pre-wrap">
        {long && !expanded ? `${prompt.t.slice(0, 200)}...` : prompt.t}
      </p>
      {long ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            setExpanded((open) => !open)
          }}
          className="text-xs font-semibold text-sw-blue mt-2"
        >
          {expanded ? 'Show less' : 'Show full prompt'}
        </button>
      ) : null}
    </div>
  )
}
