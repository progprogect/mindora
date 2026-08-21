import type { QuizProfile, QuizRole, QuizState } from '@/funnels/twenty-eight-day/types/quiz'

export const QUIZ_STATE_KEY = 'sw_quiz_28day_state'
export const SALES_STEP_KEY = 'sw_quiz_28day_salesStep'
export const QUIZ_RESULTS_KEY = 'sw_quiz_results'

export const INITIAL_QUIZ_STATE: QuizState = {
  step: 0,
  role: null,
  answers: {},
  email: null,
  name: null,
  consent: false,
  startedAt: Date.now(),
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return { ...fallback, ...(JSON.parse(raw) as Partial<T>) }
  } catch {
    return fallback
  }
}

export function loadQuizState(): QuizState {
  if (typeof window === 'undefined') return INITIAL_QUIZ_STATE
  return safeParse(window.localStorage.getItem(QUIZ_STATE_KEY), INITIAL_QUIZ_STATE)
}

export function persistQuizState(state: QuizState): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(state))
}

export function clearQuizState(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(QUIZ_STATE_KEY)
}

export function loadSalesStep(): number {
  if (typeof window === 'undefined') return 0
  const raw = window.localStorage.getItem(SALES_STEP_KEY)
  const parsed = raw ? Number.parseInt(raw, 10) : 0
  return Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 5) : 0
}

export function persistSalesStep(step: number): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(SALES_STEP_KEY, String(step))
}

export interface QuizResultsSnapshot {
  role: QuizRole | null
  email: string | null
  name: string | null
  profile: QuizProfile
  savedAt: number
}

export function persistQuizResults(snapshot: QuizResultsSnapshot): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(snapshot))
}

export function loadQuizResults(): QuizResultsSnapshot | null {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(QUIZ_RESULTS_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as QuizResultsSnapshot
  } catch {
    return null
  }
}
