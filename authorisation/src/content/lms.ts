export const PROFILE_PACES = [
  { value: 'spark', label: 'Spark', desc: '5 min/day' },
  { value: 'momentum', label: 'Momentum', desc: '10 min/day' },
  { value: 'ignite', label: 'Ignite', desc: '15 min/day' },
] as const

export const PROFILE_FOCUS = [
  { value: 'ai', label: 'AI & Technology' },
  { value: 'mindset', label: 'Success Mindset' },
  { value: 'career', label: 'Career' },
  { value: 'business', label: 'Business' },
  { value: 'health', label: 'Health' },
  { value: 'all', label: 'All Categories' },
] as const

export const FOCUS_PATHS: Record<string, string> = {
  ai: '/app/ai-and-technology',
  mindset: '/app/success-mindset',
  career: '/app/career',
  business: '/app/business',
  health: '/app/health',
  financial: '/app/financial-wellbeing',
  all: '/app/ai-and-technology',
}

export const FOCUS_MISSION: Record<string, string> = {
  ai: '28-day-ai-challenge',
  mindset: '28-day-success-mindset',
  career: '28-day-career-accelerator',
  business: 'entrepreneurial-mindset',
  health: 'better-sleep',
  financial: '28-day-ai-challenge',
  all: '28-day-ai-challenge',
}

export const PATH_KEYS = [
  'ai-and-technology',
  'success-mindset',
  'career',
  'business',
  'health',
  'financial-wellbeing',
] as const

export const PATH_META: Record<
  (typeof PATH_KEYS)[number],
  { emoji: string; short: string; focus: string }
> = {
  'ai-and-technology': { emoji: '🤖', short: 'AI & Technology', focus: 'ai' },
  'success-mindset': { emoji: '🧠', short: 'Success Mindset', focus: 'mindset' },
  career: { emoji: '💼', short: 'Career Growth', focus: 'career' },
  business: { emoji: '📈', short: 'Business', focus: 'business' },
  health: { emoji: '💪', short: 'Health & Energy', focus: 'health' },
  'financial-wellbeing': { emoji: '💰', short: 'Financial Wellbeing', focus: 'financial' },
}

export const CATEGORY_LABEL: Record<string, string> = {
  'ai-and-technology': 'AI & Technology',
  'success-mindset': 'Success Mindset',
  career: 'Career',
  business: 'Business',
  health: 'Health',
  'financial-wellbeing': 'Financial Wellbeing',
}

export const AI_TIPS = [
  "The best AI users aren't the ones who know all the tools — they're the ones who ask better questions.",
  'One specific prompt beats ten vague ones. Tell the AI who it is, what you need, and what “done” looks like.',
  'Save the prompts that work. Reuse beats reinventing every morning.',
  'If the answer is generic, add context: your role, audience, and a real example.',
]

export function greetingLabel(now = new Date()) {
  const hour = now.getHours()
  if (hour < 12) return 'Good morning 👋'
  if (hour < 17) return 'Good afternoon 👋'
  return 'Good evening 👋'
}

export function todayIso(now = new Date()) {
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function mondayWeek(now = new Date()) {
  const days = []
  const day = now.getDay()
  const mondayOffset = day === 0 ? -6 : 1 - day
  for (let i = 0; i < 7; i++) {
    const date = new Date(now)
    date.setDate(now.getDate() + mondayOffset + i)
    days.push({
      label: date.toLocaleDateString('en-GB', { weekday: 'short' }).slice(0, 1),
      long: date.toLocaleDateString('en-GB', { weekday: 'short' }),
      date: todayIso(date),
      num: date.getDate(),
    })
  }
  return days
}

/** Last 7 days ending today — Progress page (Fri…Thu when today is Thursday). */
export function rollingWeek(now = new Date()) {
  const days = []
  const base = new Date(now)
  base.setHours(12, 0, 0, 0)
  for (let i = 6; i >= 0; i--) {
    const date = new Date(base)
    date.setDate(base.getDate() - i)
    days.push({
      label: date.toLocaleDateString('en-GB', { weekday: 'short' }).slice(0, 1),
      long: date.toLocaleDateString('en-GB', { weekday: 'short' }),
      date: todayIso(date),
      num: date.getDate(),
    })
  }
  return days
}
