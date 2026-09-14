import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { buyOffer, fetchMindoraThread, fetchMindoraThreads, fetchMindoraUsage, sendMindoraMessage } from '@/lib/api'
import { useHasSavedCard } from '@/lib/lmsQueries'
import { COACH_AVATAR, COACH_GOALS_KEY, COACH_GOALS_LEGACY_KEY, COACH_NAME, COACH_OFFER_SLUG } from '@/shared/coach'

const CHIPS = [
  'What should I focus on today?',
  'Help me set a goal',
  'Review my progress this week',
  'I need motivation',
]

const LESSON_CHIPS = [
  'Help me understand this lesson',
  'How do I apply this?',
  'Quiz me on the key ideas',
]

const FOLLOWUP_CHIPS = ['Tell me more', 'How do I apply this?', 'Set a goal for this']

const LESSON_QUERY_KEYS = ['lesson', 'task', 'concept', 'detail', 'prompt'] as const

type Goal = { id: string; title: string }

function loadGoals(): Goal[] {
  try {
    const raw = localStorage.getItem(COACH_GOALS_KEY) ?? localStorage.getItem(COACH_GOALS_LEGACY_KEY)
    const parsed = raw ? (JSON.parse(raw) as Goal[]) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveGoals(goals: Goal[]) {
  localStorage.setItem(COACH_GOALS_KEY, JSON.stringify(goals))
}

function localIsoDay() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

function composeLessonPrompt(params: URLSearchParams) {
  const lesson = params.get('lesson')?.trim() || ''
  const concept = params.get('concept')?.trim() || ''
  const detail = params.get('detail')?.trim() || ''
  const task = params.get('task')?.trim() || ''
  const prompt = params.get('prompt')?.trim() || ''
  if (concept) {
    const working = lesson ? `I'm working on "${lesson}" and I want to understand "${concept}".` : `I want to understand "${concept}".`
    const said = detail ? ` The lesson says: ${detail}` : ''
    return `${working}${said} — can you explain it in simpler terms and give me an example?`
  }
  if (task) {
    if (prompt) return `${task}\n\nHere's the prompt I'm using:\n${prompt}`
    return task
  }
  if (lesson) return `I'm working on "${lesson}". Help me understand the key ideas and how to apply them.`
  return ''
}

function hasLessonQuery(params: URLSearchParams) {
  return LESSON_QUERY_KEYS.some((key) => Boolean(params.get(key)?.trim()))
}

export default function MindoraPage() {
  const [params, setSearchParams] = useSearchParams()
  const conversationId = params.get('conversationId') || undefined
  const hasCard = useHasSavedCard()
  const [usage, setUsage] = useState<{ used: number; limit: number; unlocked: boolean } | undefined>()
  const [threadId, setThreadId] = useState<string | undefined>(conversationId)
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const [locked, setLocked] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [goalsOpen, setGoalsOpen] = useState(false)
  const [goals, setGoals] = useState<Goal[]>(() => loadGoals())
  const [unlockBusy, setUnlockBusy] = useState(false)
  const [unlockError, setUnlockError] = useState<string | null>(null)
  const skipRestoreRef = useRef(false)
  const autoSendLock = useRef(false)
  const threadIdRef = useRef(threadId)
  const messagesRef = useRef(messages)
  const busyRef = useRef(busy)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    threadIdRef.current = threadId
  }, [threadId])
  useEffect(() => {
    messagesRef.current = messages
  }, [messages])
  useEffect(() => {
    busyRef.current = busy
  }, [busy])

  const persistThread = useCallback(
    (id: string, dropLesson = true) => {
      const next = new URLSearchParams(params)
      next.set('conversationId', id)
      if (dropLesson) {
        for (const key of LESSON_QUERY_KEYS) next.delete(key)
      }
      if (next.toString() === params.toString()) return
      setSearchParams(next, { replace: true })
    },
    [params, setSearchParams],
  )

  useEffect(() => {
    void fetchMindoraUsage().then(setUsage).catch(() => setUsage({ used: 0, limit: 1, unlocked: false }))
  }, [])

  useEffect(() => {
    let cancelled = false
    async function hydrate() {
      if (conversationId) {
        setThreadId(conversationId)
        try {
          const full = await fetchMindoraThread(conversationId)
          if (!cancelled) {
            setMessages(full.messages.map((row) => ({ role: row.role, content: row.content })))
          }
        } catch {
          if (!cancelled) setMessages([])
        }
        if (!cancelled) setHydrated(true)
        return
      }
      if (skipRestoreRef.current) {
        if (!cancelled) setHydrated(true)
        return
      }
      try {
        const { threads } = await fetchMindoraThreads()
        const latest = threads[0]
        if (latest && !cancelled) {
          setThreadId(latest.id)
          setSearchParams(
            (current) => {
              const next = new URLSearchParams(current)
              next.set('conversationId', latest.id)
              return next
            },
            { replace: true },
          )
          return
        }
      } catch {
        /* empty chat if history is unavailable */
      }
      if (!cancelled) setHydrated(true)
    }
    void hydrate()
    return () => {
      cancelled = true
    }
  }, [conversationId, setSearchParams])

  const send = useCallback(
    async (value: string) => {
      const trimmed = value.trim()
      if (!trimmed || busyRef.current) return
      setBusy(true)
      setText('')
      setMessages((current) => [...current, { role: 'user', content: trimmed }])
      try {
        const result = await sendMindoraMessage({
          text: trimmed,
          threadId: threadIdRef.current,
          localDate: localIsoDay(),
        })
        if ('locked' in result && result.locked) {
          setLocked(true)
          if (result.quota) setUsage(result.quota)
          return
        }
        if (result.threadId) {
          setThreadId(result.threadId)
          threadIdRef.current = result.threadId
          persistThread(result.threadId)
        }
        if (result.reply) setMessages((current) => [...current, { role: 'assistant', content: result.reply as string }])
        if (result.quota) setUsage(result.quota)
      } finally {
        setBusy(false)
      }
    },
    [persistThread],
  )

  useEffect(() => {
    if (!hydrated || autoSendLock.current) return
    const composed = composeLessonPrompt(params)
    if (!composed) return
    if (usage === undefined) return
    autoSendLock.current = true
    if (messagesRef.current.some((row) => row.role === 'user' && row.content === composed)) {
      if (threadIdRef.current) persistThread(threadIdRef.current)
      return
    }
    if (usage.used >= usage.limit) return
    void send(composed)
  }, [hydrated, usage, params, persistThread, send])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [messages, busy])

  const resetConversation = () => {
    skipRestoreRef.current = true
    autoSendLock.current = true
    setThreadId(undefined)
    setMessages([])
    setText('')
    setLocked(false)
    setHydrated(true)
    setSearchParams({}, { replace: true })
  }

  const unlock = async () => {
    setUnlockBusy(true)
    setUnlockError(null)
    try {
      const result = await buyOffer({ offerSlug: COACH_OFFER_SLUG })
      if (result.checkoutUrl) return
      if (result.success || result.alreadyPurchased) {
        setLocked(false)
        const next = await fetchMindoraUsage()
        setUsage(next)
        return
      }
      setUnlockError(result.error || 'Payment failed')
    } finally {
      setUnlockBusy(false)
    }
  }

  const empty = messages.length === 0
  const emptyChips = hasLessonQuery(params) ? LESSON_CHIPS : CHIPS
  const addGoal = (title: string) => {
    const next = [...goals, { id: crypto.randomUUID(), title }]
    setGoals(next)
    saveGoals(next)
  }
  const removeGoal = (id: string) => {
    const next = goals.filter((goal) => goal.id !== id)
    setGoals(next)
    saveGoals(next)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center gap-3 px-4 py-3 border-b border-sw-grey-border/50 bg-white sticky top-0 z-10">
        <Link
          to="/app/dashboard"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sw-grey-light/50 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
        <div className="flex items-center gap-2.5">
          <img src={COACH_AVATAR} alt={COACH_NAME} className="w-9 h-9 rounded-full object-contain p-1" />
          <div>
            <h1 className="text-base font-bold text-sw-dark leading-tight">{COACH_NAME}</h1>
            <p className="text-xs text-sw-grey">Your AI Coach</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            title="New conversation"
            onClick={resetConversation}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sw-grey-light/50 text-sw-grey transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </button>
          <Link
            to="/app/mindora/history"
            title="Conversation history"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sw-grey-light/50 text-sw-grey transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8v4l3 3" />
              <path d="M3.05 11a9 9 0 1 0 .5-4" />
              <path d="M3 3v4h4" />
            </svg>
          </Link>
          <button
            type="button"
            title="My Goals"
            onClick={() => setGoalsOpen((open) => !open)}
            className={`relative w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              goalsOpen ? 'bg-sw-blue/10 text-sw-blue' : 'hover:bg-sw-grey-light/50 text-sw-grey'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            {goals.length > 0 ? (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-sw-blue text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {goals.length}
              </span>
            ) : null}
          </button>
          {usage ? (
            <div className="text-xs text-sw-grey bg-sw-grey-light/50 px-2.5 py-1 rounded-full">
              {usage.used}/{usage.limit} today
            </div>
          ) : null}
        </div>
      </header>

      {goalsOpen ? (
        <GoalsPanel
          goals={goals}
          onClose={() => setGoalsOpen(false)}
          onAdd={addGoal}
          onRemove={removeGoal}
          onAskMindora={(prompt) => {
            setGoalsOpen(false)
            void send(prompt)
          }}
        />
      ) : null}

      <div className="flex-1 overflow-y-auto">
        {!hydrated ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-sw-blue border-t-transparent rounded-full animate-spin" />
          </div>
        ) : empty ? (
          <div className="flex flex-col items-center justify-center text-center py-12 px-4">
            <img src={COACH_AVATAR} alt={COACH_NAME} className="w-16 h-16 rounded-full object-contain p-1 mb-4 shadow-md" />
            <h2 className="text-lg font-bold text-sw-dark mb-2">Hey! I&apos;m Mindora</h2>
            <p className="text-sm text-sw-grey max-w-[280px] leading-relaxed">
              Your personal AI coach. I know your goals, your progress, and what you&apos;re learning — ask me anything.
            </p>
            <div className="flex flex-wrap gap-2 mt-5 justify-center max-w-[320px]">
              {emptyChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  disabled={busy}
                  onClick={() => void send(chip)}
                  className="text-xs bg-sw-grey-light/60 text-sw-grey border border-sw-grey-border/50 rounded-full px-3 py-1.5 hover:bg-sw-blue/5 hover:border-sw-blue/30 hover:text-sw-blue transition-colors active:scale-95 disabled:opacity-50"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto space-y-3 px-4 py-6" aria-label="Conversation with Mindora">
            {messages.map((message, index) =>
              message.role === 'user' ? (
                <div key={`${message.role}-${index}`} className="flex justify-end animate-fade-in">
                  <div className="max-w-[80%] bg-sw-blue text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {message.content}
                  </div>
                </div>
              ) : (
                <div key={`${message.role}-${index}`} className="flex items-start gap-2.5 animate-fade-in">
                  <img src={COACH_AVATAR} alt={COACH_NAME} className="w-7 h-7 rounded-full object-contain p-1 flex-shrink-0 mt-0.5" />
                  <div className="max-w-[80%] bg-sw-grey-light/60 text-sw-dark rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {message.content}
                  </div>
                </div>
              ),
            )}
            {busy ? (
              <div className="flex items-start gap-2.5">
                <img src={COACH_AVATAR} alt={COACH_NAME} className="w-7 h-7 rounded-full object-contain p-1 flex-shrink-0 mt-0.5" />
                <div className="bg-sw-grey-light/60 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-sw-grey">Mindora is typing…</div>
              </div>
            ) : locked ? null : (
              <div className="flex flex-wrap gap-2 pt-1">
                {FOLLOWUP_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => void send(chip)}
                    className="text-xs bg-sw-grey-light/60 text-sw-grey border border-sw-grey-border/50 rounded-full px-3 py-1.5 hover:bg-sw-blue/5 hover:border-sw-blue/30 hover:text-sw-blue transition-colors active:scale-95"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {locked ? (
        <UnlockStrip
          hasCard={hasCard !== false}
          busy={unlockBusy}
          error={unlockError}
          onUnlock={() => void unlock()}
        />
      ) : (
        <form
          className="p-4 border-t border-sw-grey-border/50"
          onSubmit={(event) => {
            event.preventDefault()
            void send(text)
          }}
        >
          <div className="flex items-end gap-2.5 mb-1">
            <textarea
              value={text}
              rows={1}
              aria-label="Message to Mindora"
              placeholder="Ask Mindora anything..."
              disabled={busy || !hydrated}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  void send(text)
                }
              }}
              className="flex-1 resize-none bg-sw-grey-light/40 border rounded-xl px-4 py-2.5 text-sm text-sw-dark placeholder:text-sw-grey/60 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 border-sw-grey-border/50 focus:ring-sw-blue/20 focus:border-sw-blue/40"
            />
            <button
              type="submit"
              disabled={busy || !hydrated || !text.trim()}
              className="w-10 h-10 rounded-xl bg-sw-blue flex items-center justify-center text-white disabled:opacity-40 transition-opacity flex-shrink-0"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

function UnlockStrip({
  hasCard,
  busy,
  error,
  onUnlock,
}: {
  hasCard: boolean
  busy: boolean
  error: string | null
  onUnlock: () => void
}) {
  return (
    <div
      className="border-t border-sw-grey-border/40"
      style={{ background: 'linear-gradient(to top, hsl(var(--sw-blue)/0.07), hsl(var(--sw-purple)/0.07))' }}
    >
      <div className="px-4 pt-4 pb-2">
        <div className="text-center mb-3">
          <p className="text-sm font-bold text-sw-dark">You&apos;ve used your free message today</p>
          <p className="text-xs text-sw-grey mt-0.5">Unlock unlimited AI coaching — one-time purchase</p>
        </div>
        <div className="relative bg-white rounded-xl border-2 border-[hsl(var(--sw-blue)/0.2)] p-3 mb-3 shadow-sm">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[hsl(var(--sw-success))] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
            One-Time Offer
          </div>
          <div className="flex items-center justify-between mt-1">
            <div>
              <p className="text-xs text-sw-grey line-through">Normally $99</p>
              <p className="text-[10px] text-sw-grey mt-0.5">Lifetime access</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-sw-grey uppercase font-medium">Today Only</p>
              <p className="text-2xl font-extrabold text-[hsl(var(--sw-blue))]">$19.95</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 pt-2 border-t border-sw-grey-border/30">
            {['20 chats/day', 'Personalised', 'Accountability'].map((item) => (
              <span key={item} className="text-[10px] text-sw-dark flex items-center gap-1">
                <span className="text-[hsl(var(--sw-success))]">✓</span> {item}
              </span>
            ))}
          </div>
        </div>
        {hasCard ? (
          <>
            <button
              type="button"
              onClick={onUnlock}
              disabled={busy}
              className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-[hsl(var(--sw-blue))] to-[hsl(var(--sw-purple))] text-white text-sm font-bold shadow-lg active:scale-[0.97] transition-all text-center disabled:opacity-70"
            >
              {busy ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                'YES! — UNLOCK MINDORA →'
              )}
            </button>
            <div className="mt-2.5 px-2 py-2 bg-white/60 rounded-lg border border-sw-grey-border/40">
              <p className="text-[10px] text-sw-grey text-center leading-relaxed">
                By tapping &quot;Unlock Mindora&quot;, <span className="font-bold text-sw-dark">you agree to a one-time charge of $19.95</span>. Access is
                instant.
              </p>
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onUnlock}
              className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-[hsl(var(--sw-blue))] to-[hsl(var(--sw-purple))] text-white text-sm font-bold shadow-lg active:scale-[0.97] transition-all text-center"
            >
              UNLOCK MINDORA — $19.95 →
            </button>
            <p className="text-[10px] text-sw-grey text-center mt-2">One-time payment • Secure checkout</p>
          </>
        )}
        {error ? <p className="text-[11px] text-red-500 text-center mt-2 font-medium">{error}</p> : null}
      </div>
      <div style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)', minHeight: '8px' }} />
    </div>
  )
}

function GoalsPanel({
  goals,
  onClose,
  onAdd,
  onRemove,
  onAskMindora,
}: {
  goals: Goal[]
  onClose: () => void
  onAdd: (title: string) => void
  onRemove: (id: string) => void
  onAskMindora: (prompt: string) => void
}) {
  const [draft, setDraft] = useState('')
  const [adding, setAdding] = useState(false)

  const submit = () => {
    const title = draft.trim()
    if (!title) return
    onAdd(title)
    setDraft('')
    setAdding(false)
  }

  return (
    <div className="border-b border-sw-grey-border/30 bg-gradient-to-b from-sw-grey-light/30 to-white px-4 py-3 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-sw-dark flex items-center gap-1.5">
          🎯 My Goals
          {goals.length > 0 ? (
            <span className="text-[10px] font-medium bg-sw-blue/10 text-sw-blue px-1.5 py-0.5 rounded-full">{goals.length} active</span>
          ) : null}
        </h3>
        <button type="button" onClick={onClose} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-sw-grey-light text-sw-grey">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      {goals.length === 0 && !adding ? (
        <div className="text-center py-4">
          <p className="text-xs text-sw-grey mb-2">No active goals yet</p>
          <button type="button" onClick={() => setAdding(true)} className="text-xs font-medium text-sw-blue hover:underline">
            + Set your first goal
          </button>
          <button
            type="button"
            onClick={() => onAskMindora('Help me set a meaningful goal for this week')}
            className="block mx-auto mt-2 text-[11px] text-sw-grey hover:text-sw-blue transition-colors"
          >
            Or ask Mindora to help →
          </button>
        </div>
      ) : null}
      {goals.length > 0 ? (
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {goals.map((goal) => (
            <div key={goal.id} className="flex items-start gap-2 bg-white rounded-lg border border-sw-grey-border/50 px-3 py-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-sw-dark leading-tight">{goal.title}</p>
              </div>
              <button type="button" onClick={() => onRemove(goal.id)} className="text-sw-grey/50 hover:text-sw-coral transition-colors flex-shrink-0" title="Remove goal">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : null}
      {adding || goals.length > 0 ? (
        <div className="mt-2.5 flex items-center gap-2">
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') submit()
            }}
            placeholder="Add a goal..."
            className="flex-1 text-xs bg-white border border-sw-grey-border/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sw-blue/30 focus:border-sw-blue/40 placeholder:text-sw-grey/50"
          />
          <button type="button" onClick={submit} disabled={!draft.trim()} className="text-xs font-medium text-white bg-sw-blue rounded-lg px-3 py-2 disabled:opacity-40 transition-opacity">
            Add
          </button>
        </div>
      ) : null}
    </div>
  )
}
