import type { ClaudeQuizState } from '@/funnels/claude/types/claudeQuiz'

export const CLAUDE_QUIZ_STATE_KEY = 'sw_quiz_claude_state'
export const CLAUDE_SALES_STEP_KEY = 'sw_quiz_claude_salesStep'
export const CLAUDE_QUIZ_RESULTS_KEY = 'sw_quiz_claude_results'
export const CLAUDE_SALES_TOTAL_STEPS = 6

export const INITIAL_CLAUDE_QUIZ_STATE: ClaudeQuizState = {
  step: 0,
  answers: {},
  identity: '',
  submittedEmail: '',
  submittedName: '',
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return { ...fallback, ...(JSON.parse(raw) as Partial<T>) }
  } catch {
    return fallback
  }
}

export function loadClaudeQuizState(): ClaudeQuizState {
  if (typeof window === 'undefined') return INITIAL_CLAUDE_QUIZ_STATE
  return safeParse(window.localStorage.getItem(CLAUDE_QUIZ_STATE_KEY), INITIAL_CLAUDE_QUIZ_STATE)
}

export function persistClaudeQuizState(state: ClaudeQuizState): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CLAUDE_QUIZ_STATE_KEY, JSON.stringify(state))
}

export function clearClaudeQuizState(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(CLAUDE_QUIZ_STATE_KEY)
}

export function loadClaudeSalesStep(): number {
  if (typeof window === 'undefined') return 0
  const raw = window.localStorage.getItem(CLAUDE_SALES_STEP_KEY)
  const parsed = raw ? Number.parseInt(raw, 10) : 0
  return Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), CLAUDE_SALES_TOTAL_STEPS - 1) : 0
}

export function persistClaudeSalesStep(step: number): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CLAUDE_SALES_STEP_KEY, String(step))
}

export function clearClaudeSalesStep(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(CLAUDE_SALES_STEP_KEY)
}

export interface ClaudeQuizResultsSnapshot {
  answers: Record<string, string>
  identity: string
  email: string
  name: string
  quizType: 'claude-ai-certification'
  product?: string
}

export function persistClaudeQuizResults(snapshot: ClaudeQuizResultsSnapshot): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CLAUDE_QUIZ_RESULTS_KEY, JSON.stringify(snapshot))
}

export function loadClaudeQuizResults(): ClaudeQuizResultsSnapshot | null {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(CLAUDE_QUIZ_RESULTS_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as ClaudeQuizResultsSnapshot
  } catch {
    return null
  }
}
