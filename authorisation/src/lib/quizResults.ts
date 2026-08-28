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

export function readQuizResults(): QuizResults | null {
  try {
    const raw = localStorage.getItem('sw_quiz_results')
    if (!raw) return null
    return JSON.parse(raw) as QuizResults
  } catch {
    return null
  }
}

export function focusFromQuiz(): string {
  const results = readQuizResults()
  const key = results?.quizType || results?.funnel || ''
  return FOCUS_FROM_QUIZ[key] || 'ai'
}
