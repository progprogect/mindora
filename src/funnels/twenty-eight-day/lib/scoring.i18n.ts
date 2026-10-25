import type { FunnelLocale } from '@/funnels/twenty-eight-day/data/quizScreens'

export const GOAL_STATS_RU: Record<string, string> = {
  'grow-role': 'Расти в текущей роли',
  'switch-career': 'Сменить карьеру или получить повышение',
  'side-income': 'Построить бизнес или дополнительный доход',
  creative: 'Использовать ИИ для творческих проектов',
  'stay-current': 'Быть впереди в мире ИИ',
  other: 'Узнать, что может ИИ',
}

export const BLOCKER_STATS_RU: Record<string, string> = {
  'no-plan': 'Нет чёткой системы или плана',
  'no-time': 'Не хватает времени',
  'too-complex': 'Кажется слишком сложным',
  'no-start': 'Не знаю, с чего начать',
}

export const INCOME_STATS_RU: Record<string, string> = {
  '500': '$500 / месяц',
  '1000-2000': '$1 000 – $2 000 / месяц',
  '3000-5000': '$3 000 – $5 000 / месяц',
  '5000-plus': '$5 000+ / месяц',
  none: 'Сейчас не приоритет',
}

export const STAGE_STATS_RU: Record<string, string> = {
  student: 'Студент / только начинаю',
  career: 'Развиваю карьеру',
  manager: 'Менеджер или руководитель',
  founder: 'Веду свой бизнес',
  transitioning: 'В переходе',
}

export function scoreLabelFor(score: number, locale: FunnelLocale): string {
  if (locale === 'ru') {
    if (score <= 30) return 'Новичок в ИИ'
    if (score <= 55) return 'Знаком с ИИ'
    if (score <= 75) return 'Готов к ИИ'
    return 'Носитель ИИ'
  }
  if (score <= 30) return 'AI Newcomer'
  if (score <= 55) return 'AI Aware'
  if (score <= 75) return 'AI Ready'
  return 'AI Native'
}

export function scoreToneFor(score: number, locale: FunnelLocale): string {
  if (locale === 'ru') {
    if (score <= 30) return 'Вы в идеальном месте — Challenge начинается с нуля.'
    if (score <= 55) return 'База уже есть. Теперь время строить быстро.'
    if (score <= 75) return 'Вы впереди большинства. Давайте увеличим отрыв.'
    return 'Вы уже понимаете ИИ. Время идти дальше и быстрее.'
  }
  if (score <= 30) return "You're in exactly the right place — the Challenge starts from zero."
  if (score <= 55) return "You have the foundation. Now it's time to build fast."
  if (score <= 75) return "You're ahead of most people. Let's make that gap even bigger."
  return 'You already get AI. Time to go further, faster.'
}

export function archetypeFor(
  role: string | null,
  answers: Record<string, string>,
  locale: FunnelLocale,
): { archetype: string; archetypeEmoji: string; archetypeFocus: string } {
  const skill = answers['q5-skill']
  const experience = answers['q7-experience']
  const goal = answers['q2-goal']

  if (locale === 'ru') {
    if ((skill === 'comfortable' || experience === 'builder' || experience === 'regular') && skill !== 'beginner') {
      return { archetype: 'Ускоритель ИИ', archetypeEmoji: '⚡', archetypeFocus: 'Продвинутое владение ИИ' }
    }
    if (role === 'business-owner' || goal === 'side-income') {
      return { archetype: 'Строитель бизнеса', archetypeEmoji: '💼', archetypeFocus: 'Рост бизнеса с ИИ' }
    }
    if (goal === 'creative') {
      return { archetype: 'Творческий предприниматель', archetypeEmoji: '🌟', archetypeFocus: 'ИИ для творчества и контента' }
    }
    if (role === 'employee' && (goal === 'grow-role' || goal === 'switch-career')) {
      return {
        archetype: 'Амбициозный профессионал',
        archetypeEmoji: '🚀',
        archetypeFocus: 'Навыки ИИ для карьеры',
      }
    }
    return { archetype: 'Новичок в ИИ', archetypeEmoji: '🎓', archetypeFocus: 'Уверенность в ИИ с нуля' }
  }

  if ((skill === 'comfortable' || experience === 'builder' || experience === 'regular') && skill !== 'beginner') {
    return { archetype: 'The AI Accelerator', archetypeEmoji: '⚡', archetypeFocus: 'Advanced AI mastery' }
  }
  if (role === 'business-owner' || goal === 'side-income') {
    return { archetype: 'The Business Builder', archetypeEmoji: '💼', archetypeFocus: 'AI-powered business growth' }
  }
  if (goal === 'creative') {
    return { archetype: 'The Creative Entrepreneur', archetypeEmoji: '🌟', archetypeFocus: 'AI for creative work & content' }
  }
  if (role === 'employee' && (goal === 'grow-role' || goal === 'switch-career')) {
    return { archetype: 'The Ambitious Professional', archetypeEmoji: '🚀', archetypeFocus: 'Career-accelerating AI skills' }
  }
  return { archetype: 'The AI Newcomer', archetypeEmoji: '🎓', archetypeFocus: 'Building AI confidence from scratch' }
}

export function insightFor(
  role: string | null,
  answers: Record<string, string>,
  locale: FunnelLocale,
): string {
  const goal = answers['q2-goal']
  const blocker = answers['q9-blocker']
  const concern = answers['q12-concern']
  const skill = answers['q5-skill']

  if (locale === 'ru') {
    if (concern === 'opportunity' || skill === 'comfortable') {
      return 'Вы уже видите в ИИ своё преимущество. Теперь важно двигаться быстрее остальных.'
    }
    if (concern === 'automation' || concern === 'colleagues') {
      return 'Те, кто выигрывает в эпоху ИИ, учатся уже сейчас — и вы делаете именно это.'
    }
    if (goal === 'side-income' || role === 'business-owner') {
      return 'Первый навык ИИ может открыть новый поток дохода. Давайте построим его.'
    }
    if (goal === 'creative') {
      return 'ИИ не заменит ваше творчество — он умножит его. Пора увидеть, как.'
    }
    if (blocker === 'too-complex' || blocker === 'no-start') {
      return '28-дневный ИИ-челлендж убирает шум — один понятный навык каждый день, без жаргона.'
    }
    if (blocker === 'no-time') {
      return 'Достаточно 10 минут в день. Большинство видят результат к 7-му дню.'
    }
    return 'Вы ближе, чем кажется. 28-дневный ИИ-челлендж даёт систему, чтобы дойти до цели.'
  }

  if (concern === 'opportunity' || skill === 'comfortable') {
    return "You already see AI as your edge. Now it's about moving faster than everyone else."
  }
  if (concern === 'automation' || concern === 'colleagues') {
    return "The people who thrive through AI disruption are learning it now — that's exactly what you're doing."
  }
  if (goal === 'side-income' || role === 'business-owner') {
    return "Your first AI skill could unlock a completely new income stream. Let's build it."
  }
  if (goal === 'creative') {
    return "AI won't replace your creativity — it'll multiply it. Time to find out how."
  }
  if (blocker === 'too-complex' || blocker === 'no-start') {
    return 'The 28-Day Challenge cuts through the noise — one clear skill, every day, no jargon.'
  }
  if (blocker === 'no-time') {
    return 'Ten minutes a day is all it takes. Most learners see results by day 7.'
  }
  return "You're closer than you think. The 28-Day Challenge gives you the system to get there."
}

export function profileStatLabels(locale: FunnelLocale) {
  if (locale === 'ru') {
    return {
      goal: 'Главная цель',
      blocker: 'Главное препятствие',
      income: 'Цель по доходу',
      stage: 'Этап карьеры',
    }
  }
  return {
    goal: 'Your #1 Goal',
    blocker: 'Biggest Blocker',
    income: 'Income Target',
    stage: 'Career Stage',
  }
}
