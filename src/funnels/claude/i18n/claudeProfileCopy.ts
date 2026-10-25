import type { ClaudeLocale } from '@/funnels/claude/i18n/locale'
import type { ClaudeSkillLevel } from '@/funnels/claude/types/claudeQuiz'

const LEVEL_LABELS: Record<ClaudeLocale, Record<ClaudeSkillLevel, string>> = {
  en: {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  },
  ru: {
    beginner: 'Начинающий',
    intermediate: 'Средний',
    advanced: 'Продвинутый',
  },
}

const PERSONA_BY_IDENTITY: Record<ClaudeLocale, Record<string, string>> = {
  en: {
    yes: 'Claude Power User',
    'not-yet': 'Claude Explorer',
  },
  ru: {
    yes: 'Опытный пользователь Claude',
    'not-yet': 'Исследователь Claude',
  },
}

const HEADLINE_BY_PURPOSE: Record<ClaudeLocale, Record<string, string>> = {
  en: {
    work: 'Your plan to reclaim 5+ hours every week using Claude at work',
    personal: 'Your personalised Claude mastery plan for everyday life',
    growth: 'Your path to becoming one of the most in-demand AI professionals',
  },
  ru: {
    work: 'Ваш план вернуть 5+ часов в неделю с Claude на работе',
    personal: 'Ваш персональный план освоения Claude для повседневной жизни',
    growth: 'Ваш путь стать одним из самых востребованных AI-специалистов',
  },
}

const DESCRIPTION_BY_PURPOSE: Record<ClaudeLocale, Record<string, string>> = {
  en: {
    work: "You're leaving hours on the table every week. Your personalised path focuses on the exact workflows that will give you time back immediately.",
    personal: 'Claude can transform how you think, create, and organise your life. Your path focuses on practical everyday applications.',
    growth: 'Claude skills are in high demand. Your certification path includes real-world projects that set you apart from 97% of professionals.',
  },
  ru: {
    work: 'Каждую неделю вы теряете часы. Ваш персональный маршрут сфокусирован на рабочих процессах, которые сразу вернут вам время.',
    personal:
      'Claude может изменить то, как вы думаете, создаёте и организуете жизнь. Ваш маршрут — про практику в повседневных задачах.',
    growth:
      'Навыки работы с Claude востребованы. Путь к сертификации включает реальные проекты, которые выделят вас среди 97% специалистов.',
  },
}

const TIME_SAVED_BY_WASTE: Record<ClaudeLocale, Record<string, string>> = {
  en: {
    '1-3': '2–3 hours',
    '3-5': '4–5 hours',
    '5-10': '6–8 hours',
    '10-plus': '10+ hours',
  },
  ru: {
    '1-3': '2–3 часа',
    '3-5': '4–5 часов',
    '5-10': '6–8 часов',
    '10-plus': '10+ часов',
  },
}

const TOP_BENEFIT_BY_OUTCOME: Record<ClaudeLocale, Record<string, string>> = {
  en: {
    'earn-more': 'Unlock new income streams with verified AI skills',
    productivity: 'Save 5+ hours weekly with Claude-powered workflows',
    credential: 'Earn a verifiable Claude AI Certification for your CV',
    confidence: 'Master Claude with structured, proven techniques',
  },
  ru: {
    'earn-more': 'Откройте новые источники дохода с подтверждёнными AI-навыками',
    productivity: 'Экономьте 5+ часов в неделю с рабочими процессами на Claude',
    credential: 'Получите проверяемую сертификацию Claude AI для резюме',
    confidence: 'Освойте Claude с проверенными структурированными техниками',
  },
}

const CERTIFICATION_PATH_BY_LEVEL: Record<ClaudeLocale, Record<ClaudeSkillLevel, string>> = {
  en: {
    beginner: 'Claude Foundations → Core Skills → Certification',
    intermediate: 'Advanced Prompting → Workflows → Certification',
    advanced: 'Power User → Automation → Expert Certification',
  },
  ru: {
    beginner: 'Основы Claude → Ключевые навыки → Сертификация',
    intermediate: 'Продвинутый промптинг → Рабочие процессы → Сертификация',
    advanced: 'Power User → Автоматизация → Экспертная сертификация',
  },
}

const DEFAULTS: Record<
  ClaudeLocale,
  { persona: string; headline: string; description: string; topBenefit: string; weeklyTimeSaved: string }
> = {
  en: {
    persona: 'AI Learner',
    headline: 'Your personalised Claude AI mastery plan',
    description: 'Your personalised path is designed around your experience level, goals, and available time.',
    topBenefit: 'Master Claude AI with a structured certification path',
    weeklyTimeSaved: '5+ hours',
  },
  ru: {
    persona: 'Ученик AI',
    headline: 'Ваш персональный план освоения Claude AI',
    description: 'Ваш маршрут учитывает уровень, цели и доступное время.',
    topBenefit: 'Освойте Claude AI по структурированному пути к сертификации',
    weeklyTimeSaved: '5+ часов',
  },
}

export function claudeProfileCopy(locale: ClaudeLocale) {
  return {
    levelLabels: LEVEL_LABELS[locale],
    personaByIdentity: PERSONA_BY_IDENTITY[locale],
    headlineByPurpose: HEADLINE_BY_PURPOSE[locale],
    descriptionByPurpose: DESCRIPTION_BY_PURPOSE[locale],
    timeSavedByWaste: TIME_SAVED_BY_WASTE[locale],
    topBenefitByOutcome: TOP_BENEFIT_BY_OUTCOME[locale],
    certificationPathByLevel: CERTIFICATION_PATH_BY_LEVEL[locale],
    defaults: DEFAULTS[locale],
  }
}
