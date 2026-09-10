export const FOCUS_FROM_QUIZ: Record<string, string> = {
  '28-day-ai-challenge': 'ai',
  'claude-ai-certification': 'ai',
  'master-claude-ai-excel': 'ai',
  'master-ai-for-powerpoint': 'ai',
  'master-ai-microsoft-365': 'ai',
  'success-assessment': 'mindset',
  career: 'career',
  business: 'business',
  health: 'health',
}

export type QuizResults = {
  answers?: unknown
  role?: string
  identity?: string
  name?: string
  email?: string
  quizType?: string
  funnel?: string
  product?: string
  plan?: string
}

const PRIMARY_RESULTS_KEY = 'sw_quiz_results'

function storage(): Storage | null {
  try {
    if (typeof window === 'undefined') return null
    return window.localStorage
  } catch {
    return null
  }
}

function parseResults(raw: string | null): QuizResults | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as QuizResults
    if (!parsed || typeof parsed !== 'object') return null
    return parsed
  } catch {
    return null
  }
}

function funnelOf(results: QuizResults): string {
  return (results.quizType || results.funnel || '').trim()
}

function hasName(results: QuizResults): boolean {
  return Boolean(results.name?.trim())
}

function currentFunnelHint(store: Storage): string {
  const fromStorage = store.getItem('sw_checkout_funnel')?.trim() || ''
  if (fromStorage) return fromStorage
  try {
    return new URLSearchParams(window.location.search).get('funnel')?.trim() || ''
  } catch {
    return ''
  }
}

function collectResults(store: Storage): QuizResults[] {
  const found: QuizResults[] = []
  const seen = new Set<string>()
  const push = (raw: string | null) => {
    const parsed = parseResults(raw)
    if (!parsed) return
    const key = `${funnelOf(parsed)}|${parsed.email ?? ''}|${parsed.name ?? ''}`
    if (seen.has(key)) return
    seen.add(key)
    found.push(parsed)
  }

  push(store.getItem(PRIMARY_RESULTS_KEY))
  push(store.getItem('sw_quiz_claude_results'))

  for (let i = 0; i < store.length; i += 1) {
    const key = store.key(i)
    if (!key || !key.startsWith('sw_quiz_') || !key.endsWith('_results')) continue
    if (key === PRIMARY_RESULTS_KEY || key === 'sw_quiz_claude_results') continue
    push(store.getItem(key))
  }
  return found
}

/**
 * Claude / SA / master write `sw_quiz_*_results`; 28-day writes `sw_quiz_results`.
 * Prefer the snapshot that matches the current checkout funnel, then any named result.
 */
export function readQuizResults(): QuizResults | null {
  const store = storage()
  if (!store) return null

  const snapshots = collectResults(store)
  if (snapshots.length === 0) return null

  const hint = currentFunnelHint(store)
  if (hint) {
    const match = snapshots.find((row) => funnelOf(row) === hint)
    if (match) return match
  }

  const named = snapshots.find(hasName)
  if (named) return named
  return snapshots[0] ?? null
}

export function focusFromQuiz(): string {
  const results = readQuizResults()
  const key = results?.quizType || results?.funnel || ''
  return FOCUS_FROM_QUIZ[key] || 'ai'
}
