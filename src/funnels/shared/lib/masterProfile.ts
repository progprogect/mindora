import type { MarketingLocale } from '@/marketing/data/moneyBack'
import type { FunnelAnswers } from '@/funnels/shared/types'

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export interface MasterSkillProfile {
  persona: string
  level: SkillLevel
  levelLabel: string
  path: string
  rings: Array<{ label: string; score: number }>
  opportunity: string
  timeSaved: string
  timeSavedShort: string
}

const LEVEL_LABEL_EN: Record<SkillLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
}

const LEVEL_LABEL_RU: Record<SkillLevel, string> = {
  beginner: 'Начинающий',
  intermediate: 'Средний',
  advanced: 'Продвинутый',
  expert: 'Эксперт',
}

const PPT_RINGS_EN: Record<SkillLevel, Array<{ label: string; score: number }>> = {
  beginner: [
    { label: 'Slide Design', score: 22 },
    { label: 'Storytelling', score: 18 },
    { label: 'AI Ready', score: 38 },
  ],
  intermediate: [
    { label: 'Slide Design', score: 46 },
    { label: 'Storytelling', score: 30 },
    { label: 'AI Ready', score: 60 },
  ],
  advanced: [
    { label: 'Slide Design', score: 68 },
    { label: 'Storytelling', score: 55 },
    { label: 'AI Ready', score: 72 },
  ],
  expert: [
    { label: 'Slide Design', score: 85 },
    { label: 'Storytelling', score: 78 },
    { label: 'AI Ready', score: 90 },
  ],
}

const PPT_RINGS_RU: Record<SkillLevel, Array<{ label: string; score: number }>> = {
  beginner: [
    { label: 'Дизайн слайдов', score: 22 },
    { label: 'Сторителлинг', score: 18 },
    { label: 'Готовность к ИИ', score: 38 },
  ],
  intermediate: [
    { label: 'Дизайн слайдов', score: 46 },
    { label: 'Сторителлинг', score: 30 },
    { label: 'Готовность к ИИ', score: 60 },
  ],
  advanced: [
    { label: 'Дизайн слайдов', score: 68 },
    { label: 'Сторителлинг', score: 55 },
    { label: 'Готовность к ИИ', score: 72 },
  ],
  expert: [
    { label: 'Дизайн слайдов', score: 85 },
    { label: 'Сторителлинг', score: 78 },
    { label: 'Готовность к ИИ', score: 90 },
  ],
}

const EXCEL_RINGS_EN: Record<SkillLevel, Array<{ label: string; score: number }>> = {
  beginner: [
    { label: 'Formulas', score: 22 },
    { label: 'Automation', score: 15 },
    { label: 'AI Ready', score: 38 },
  ],
  intermediate: [
    { label: 'Formulas', score: 48 },
    { label: 'Automation', score: 28 },
    { label: 'AI Ready', score: 60 },
  ],
  advanced: [
    { label: 'Formulas', score: 68 },
    { label: 'Automation', score: 55 },
    { label: 'AI Ready', score: 72 },
  ],
  expert: [
    { label: 'Formulas', score: 85 },
    { label: 'Automation', score: 78 },
    { label: 'AI Ready', score: 90 },
  ],
}

const EXCEL_RINGS_RU: Record<SkillLevel, Array<{ label: string; score: number }>> = {
  beginner: [
    { label: 'Формулы', score: 22 },
    { label: 'Автоматизация', score: 15 },
    { label: 'Готовность к ИИ', score: 38 },
  ],
  intermediate: [
    { label: 'Формулы', score: 48 },
    { label: 'Автоматизация', score: 28 },
    { label: 'Готовность к ИИ', score: 60 },
  ],
  advanced: [
    { label: 'Формулы', score: 68 },
    { label: 'Автоматизация', score: 55 },
    { label: 'Готовность к ИИ', score: 72 },
  ],
  expert: [
    { label: 'Формулы', score: 85 },
    { label: 'Автоматизация', score: 78 },
    { label: 'Готовность к ИИ', score: 90 },
  ],
}

const PPT_PATH_EN: Record<SkillLevel, string> = {
  beginner: 'Foundations → Slide Structure → First AI Outline',
  intermediate: 'Advanced Layouts → Data Storytelling → Deck Automation',
  advanced: 'Brand Systems → Narrative Design → Delivery',
  expert: 'AI Orchestration → Team Templates → Executive Presence',
}

const PPT_PATH_RU: Record<SkillLevel, string> = {
  beginner: 'Основы → структура слайдов → первый план с ИИ',
  intermediate: 'Сложные макеты → история в данных → автоматизация деки',
  advanced: 'Фирменный стиль → нарратив → подача',
  expert: 'Оркестрация ИИ → командные шаблоны → уверенность перед руководством',
}

const EXCEL_PATH_EN: Record<SkillLevel, string> = {
  beginner: 'Foundations → Core Formulas → First Claude Workflow',
  intermediate: 'Advanced Formulas → Data Analysis → Report Automation',
  advanced: 'Models → Dashboards → Macros',
  expert: 'Claude Orchestration → Automated Reporting → Team Systems',
}

const EXCEL_PATH_RU: Record<SkillLevel, string> = {
  beginner: 'Основы → ключевые формулы → первый процесс с Claude',
  intermediate: 'Сложные формулы → анализ данных → автоматизация отчётов',
  advanced: 'Модели → дашборды → макросы',
  expert: 'Оркестрация Claude → автоматические отчёты → командные системы',
}

const PPT_OPP_EN: Record<string, string> = {
  'blank-slide':
    "A blank slide shouldn't be where great presentations die. With AI, you'll describe your topic in plain English and get a full outline instantly — no more staring at nothing.",
  design: "Messy layouts shouldn't steal your evening. AI suggests clean, professional slide designs in seconds.",
  reports: 'Raw data can become a clear story — AI builds the narrative, the chart, and the takeaway.',
  repetitive: 'Those repeat decks? AI can template and automate the rebuild-from-scratch work.',
  unknown: "You're about to discover what AI can actually do for slides — outline, design, data, and delivery.",
}

const PPT_OPP_RU: Record<string, string> = {
  'blank-slide':
    'Пустой слайд не должен убивать хорошую презентацию. С ИИ вы опишете тему простыми словами и сразу получите план — без взгляда в пустоту.',
  design: 'Кривые макеты не должны съедать вечер. ИИ предложит чистый профессиональный дизайн слайдов за секунды.',
  reports: 'Сырые данные могут стать ясной историей — ИИ соберёт нарратив, график и вывод.',
  repetitive: 'Одни и те же деки? ИИ поможет шаблонизировать и автоматизировать сборку с нуля.',
  unknown: 'Вы увидите, что ИИ реально умеет для слайдов — план, дизайн, данные и подача.',
}

const EXCEL_OPP_EN: Record<string, string> = {
  formulas:
    "Complex formulas shouldn't require a PhD. With Claude, you'll describe what you need in plain English and get perfect formulas instantly — no more Googling or trial-and-error.",
  cleaning: "You'll never manually clean messy data again — Claude generates the steps in seconds.",
  reports: 'Claude can build reports in seconds that used to take hours.',
  repetitive: 'Those repetitive tasks? Claude can automate all of them.',
  unknown: "You're about to discover what's really possible with Claude and Excel.",
}

const EXCEL_OPP_RU: Record<string, string> = {
  formulas:
    'Сложные формулы не требуют PhD. С Claude вы опишете задачу простыми словами и сразу получите нужные формулы — без поиска и метода проб и ошибок.',
  cleaning: 'Больше не придётся вручную чистить грязные данные — Claude сгенерирует шаги за секунды.',
  reports: 'Claude собирает отчёты за секунды — то, на что раньше уходили часы.',
  repetitive: 'Рутинные задачи? Claude может автоматизировать их все.',
  unknown: 'Вы увидите, что на самом деле возможно с Claude и Excel.',
}

function levelFrom(value: string | undefined): SkillLevel {
  if (value === 'advanced' || value === 'expert' || value === 'beginner') return value
  return 'intermediate'
}

function timeFrom(
  value: string | undefined,
  locale: MarketingLocale,
  product: 'ppt' | 'excel' | 'generic',
): { long: string; short: string } {
  const isRu = locale === 'ru'
  if (isRu) {
    const mastery =
      product === 'ppt'
        ? 'освоением PowerPoint + ИИ'
        : product === 'excel'
          ? 'освоением Excel + ИИ'
          : 'освоением ИИ'
    if (value === '1-3') return { long: `3–5 часов в неделю с ${mastery}`, short: '3–5 ч/нед' }
    if (value === '3-5') return { long: `5–6 часов в неделю с ${mastery}`, short: '5–6 ч/нед' }
    if (value === '10-plus') return { long: `10+ часов в неделю с ${mastery}`, short: '10+ ч/нед' }
    return { long: `6–8 часов в неделю с ${mastery}`, short: '6–8 ч/нед' }
  }
  if (value === '1-3') return { long: '3–5 hours per week with AI mastery', short: '3–5 hours/week' }
  if (value === '3-5') return { long: '5–6 hours per week with AI mastery', short: '5–6 hours/week' }
  if (value === '10-plus') return { long: '10+ hours per week with AI mastery', short: '10+ hours/week' }
  const long = '6–8 hours per week with AI mastery'
  const short = '6–8 hours/week'
  if (product === 'ppt') return { long: long.replace('AI mastery', 'PowerPoint + AI mastery'), short }
  if (product === 'excel') return { long: long.replace('AI mastery', 'Excel + AI mastery'), short }
  return { long, short }
}

export function buildPptProfile(answers: FunnelAnswers, locale: MarketingLocale = 'en'): MasterSkillProfile {
  const level = levelFrom(answers['q1-powerpoint-level'])
  const time = timeFrom(answers['q7-time-wasted'], locale, 'ppt')
  const pain = answers['q5-pain-point'] ?? 'blank-slide'
  const isRu = locale === 'ru'
  const opp = isRu ? PPT_OPP_RU : PPT_OPP_EN
  return {
    persona: isRu ? 'Эксперт по эффективности' : 'Efficiency Expert',
    level,
    levelLabel: (isRu ? LEVEL_LABEL_RU : LEVEL_LABEL_EN)[level],
    path: (isRu ? PPT_PATH_RU : PPT_PATH_EN)[level],
    rings: (isRu ? PPT_RINGS_RU : PPT_RINGS_EN)[level],
    opportunity: opp[pain] ?? opp['blank-slide'],
    timeSaved: time.long,
    timeSavedShort: time.short,
  }
}

export function buildExcelProfile(answers: FunnelAnswers, locale: MarketingLocale = 'en'): MasterSkillProfile {
  const level = levelFrom(answers['q1-excel-level'])
  const time = timeFrom(answers['q7-time-wasted'], locale, 'excel')
  const pain = answers['q5-pain-point'] ?? 'formulas'
  const isRu = locale === 'ru'
  const opp = isRu ? EXCEL_OPP_RU : EXCEL_OPP_EN
  return {
    persona: isRu ? 'Эксперт по эффективности' : 'Efficiency Expert',
    level,
    levelLabel: (isRu ? LEVEL_LABEL_RU : LEVEL_LABEL_EN)[level],
    path: (isRu ? EXCEL_PATH_RU : EXCEL_PATH_EN)[level],
    rings: (isRu ? EXCEL_RINGS_RU : EXCEL_RINGS_EN)[level],
    opportunity: opp[pain] ?? opp.formulas,
    timeSaved: time.long,
    timeSavedShort: time.short,
  }
}

export interface M365Profile {
  persona: string
  readiness: number
  readinessLabel: string
  startApp: string
  startCopy: string
  path: string
  opportunity: string
  timeSaved: string
  timeSavedShort: string
}

const APP_LABEL: Record<string, string> = {
  outlook: 'Outlook',
  excel: 'Excel',
  word: 'Word',
  powerpoint: 'PowerPoint',
  teams: 'Teams',
}

const APP_PERSONA_EN: Record<string, string> = {
  outlook: 'The Inbox Reclaimer',
  excel: 'The Spreadsheet Translator',
  word: 'The Document Architect',
  powerpoint: 'The Deck Accelerator',
  teams: 'The Meeting Closer',
}

const APP_PERSONA_RU: Record<string, string> = {
  outlook: 'Возврат контроля над почтой',
  excel: 'Переводчик таблиц',
  word: 'Архитектор документов',
  powerpoint: 'Ускоритель презентаций',
  teams: 'Закрыватель встреч',
}

function readinessLabel(readiness: number, locale: MarketingLocale): string {
  if (locale === 'ru') {
    if (readiness < 40) return 'Начало пути'
    if (readiness < 55) return 'Набираем темп'
    return 'Впереди других'
  }
  if (readiness < 40) return 'Getting Started'
  if (readiness < 55) return 'Building Momentum'
  return 'Ahead of the Curve'
}

export function buildM365Profile(answers: FunnelAnswers, locale: MarketingLocale = 'en'): M365Profile {
  const app = answers['q4-main-app'] ?? 'outlook'
  const time = timeFrom(answers['q7-time-wasted'], locale, 'generic')
  const level = levelFrom(answers['q1-m365-level'])
  const readiness = { beginner: 32, intermediate: 48, advanced: 64, expert: 78 }[level]
  const isRu = locale === 'ru'
  const personas = isRu ? APP_PERSONA_RU : APP_PERSONA_EN
  const appLabel = APP_LABEL[app] ?? 'Outlook'
  const pathTail = app === 'outlook' ? (isRu ? 'Outlook и Teams' : 'Outlook and Teams') : appLabel
  const pathPrefix = isRu ? 'Основы → сначала ваше сильное приложение → ' : 'Foundations → your strongest app first → '

  return {
    persona: personas[app] ?? (isRu ? 'Возврат контроля над почтой' : 'The Inbox Reclaimer'),
    readiness,
    readinessLabel: readinessLabel(readiness, locale),
    startApp: appLabel,
    startCopy: isRu
      ? 'Вы сказали, что на это уходит больше всего времени в неделю.'
      : 'You told us it takes the biggest share of your week.',
    path: `${pathPrefix}${pathTail}`,
    opportunity: isRu
      ? 'Вы научитесь один раз ставить задачу ИИ и проводить работу через Word, Excel, PowerPoint и Outlook — чтобы отчёт, слайд и письмо шли из одного источника, а не из трёх переписываний.'
      : 'You will learn how to brief AI once and carry that work through Word, Excel, PowerPoint and Outlook, so the report, the slide and the email all come from one source instead of three retypings.',
    timeSaved: isRu
      ? answers['q7-time-wasted'] === '5-10'
        ? 'Вы указали: 5–10 часов в неделю'
        : `Вы указали: ${time.short}`
      : `You told us: ${answers['q7-time-wasted'] === '5-10' ? '5–10 hours a week' : time.short}`,
    timeSavedShort:
      answers['q7-time-wasted'] === '5-10'
        ? isRu
          ? '5–10 часов'
          : '5–10 hours'
        : time.short,
  }
}
