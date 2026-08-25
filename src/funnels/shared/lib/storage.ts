import type { FunnelQuizState } from '@/funnels/shared/types'

export function createFunnelStorage(funnelId: string) {
  const stateKey = `sw_quiz_${funnelId}_state_v1`
  const salesKey = `sw_quiz_${funnelId}_salesStep`
  const resultsKey = `sw_quiz_${funnelId}_results`

  const initial: FunnelQuizState = {
    step: 0,
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

  return {
    loadState(): FunnelQuizState {
      if (typeof window === 'undefined') return initial
      return safeParse(window.localStorage.getItem(stateKey), { ...initial, startedAt: Date.now() })
    },
    persistState(state: FunnelQuizState) {
      if (typeof window === 'undefined') return
      window.localStorage.setItem(stateKey, JSON.stringify(state))
    },
    loadSalesStep() {
      if (typeof window === 'undefined') return 0
      const parsed = Number.parseInt(window.localStorage.getItem(salesKey) ?? '0', 10)
      return Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 5) : 0
    },
    persistSalesStep(step: number) {
      if (typeof window === 'undefined') return
      window.localStorage.setItem(salesKey, String(step))
    },
    persistResults(snapshot: unknown) {
      if (typeof window === 'undefined') return
      window.localStorage.setItem(resultsKey, JSON.stringify(snapshot))
    },
  }
}
