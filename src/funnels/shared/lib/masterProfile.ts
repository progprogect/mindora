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

const LEVEL_LABEL: Record<SkillLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
}

const PPT_RINGS: Record<SkillLevel, Array<{ label: string; score: number }>> = {
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

const EXCEL_RINGS: Record<SkillLevel, Array<{ label: string; score: number }>> = {
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

const PPT_PATH: Record<SkillLevel, string> = {
  beginner: 'Foundations → Slide Structure → First AI Outline',
  intermediate: 'Advanced Layouts → Data Storytelling → Deck Automation',
  advanced: 'Brand Systems → Narrative Design → Delivery',
  expert: 'AI Orchestration → Team Templates → Executive Presence',
}

const EXCEL_PATH: Record<SkillLevel, string> = {
  beginner: 'Foundations → Core Formulas → First Claude Workflow',
  intermediate: 'Advanced Formulas → Data Analysis → Report Automation',
  advanced: 'Models → Dashboards → Macros',
  expert: 'Claude Orchestration → Automated Reporting → Team Systems',
}

const PPT_OPP: Record<string, string> = {
  'blank-slide':
    "A blank slide shouldn't be where great presentations die. With AI, you'll describe your topic in plain English and get a full outline instantly — no more staring at nothing.",
  design: "Messy layouts shouldn't steal your evening. AI suggests clean, professional slide designs in seconds.",
  reports: 'Raw data can become a clear story — AI builds the narrative, the chart, and the takeaway.',
  repetitive: 'Those repeat decks? AI can template and automate the rebuild-from-scratch work.',
  unknown: "You're about to discover what AI can actually do for slides — outline, design, data, and delivery.",
}

const EXCEL_OPP: Record<string, string> = {
  formulas:
    "Complex formulas shouldn't require a PhD. With Claude, you'll describe what you need in plain English and get perfect formulas instantly — no more Googling or trial-and-error.",
  cleaning: "You'll never manually clean messy data again — Claude generates the steps in seconds.",
  reports: 'Claude can build reports in seconds that used to take hours.',
  repetitive: 'Those repetitive tasks? Claude can automate all of them.',
  unknown: "You're about to discover what's really possible with Claude and Excel.",
}

function levelFrom(value: string | undefined): SkillLevel {
  if (value === 'advanced' || value === 'expert' || value === 'beginner') return value
  return 'intermediate'
}

function timeFrom(value: string | undefined): { long: string; short: string } {
  if (value === '1-3') return { long: '3–5 hours per week with AI mastery', short: '3–5 hours/week' }
  if (value === '3-5') return { long: '5–6 hours per week with AI mastery', short: '5–6 hours/week' }
  if (value === '10-plus') return { long: '10+ hours per week with AI mastery', short: '10+ hours/week' }
  return { long: '6–8 hours per week with AI mastery', short: '6–8 hours/week' }
}

export function buildPptProfile(answers: FunnelAnswers): MasterSkillProfile {
  const level = levelFrom(answers['q1-powerpoint-level'])
  const time = timeFrom(answers['q7-time-wasted'])
  const pain = answers['q5-pain-point'] ?? 'blank-slide'
  return {
    persona: 'Efficiency Expert',
    level,
    levelLabel: LEVEL_LABEL[level],
    path: PPT_PATH[level],
    rings: PPT_RINGS[level],
    opportunity: PPT_OPP[pain] ?? PPT_OPP['blank-slide'],
    timeSaved: time.long.replace('AI mastery', 'PowerPoint + AI mastery'),
    timeSavedShort: time.short,
  }
}

export function buildExcelProfile(answers: FunnelAnswers): MasterSkillProfile {
  const level = levelFrom(answers['q1-excel-level'])
  const time = timeFrom(answers['q7-time-wasted'])
  const pain = answers['q5-pain-point'] ?? 'formulas'
  return {
    persona: 'Efficiency Expert',
    level,
    levelLabel: LEVEL_LABEL[level],
    path: EXCEL_PATH[level],
    rings: EXCEL_RINGS[level],
    opportunity: EXCEL_OPP[pain] ?? EXCEL_OPP.formulas,
    timeSaved: time.long.replace('AI mastery', 'Excel + AI mastery'),
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

const APP_PERSONA: Record<string, string> = {
  outlook: 'The Inbox Reclaimer',
  excel: 'The Spreadsheet Translator',
  word: 'The Document Architect',
  powerpoint: 'The Deck Accelerator',
  teams: 'The Meeting Closer',
}

export function buildM365Profile(answers: FunnelAnswers): M365Profile {
  const app = answers['q4-main-app'] ?? 'outlook'
  const time = timeFrom(answers['q7-time-wasted'])
  const level = levelFrom(answers['q1-m365-level'])
  const readiness = { beginner: 32, intermediate: 48, advanced: 64, expert: 78 }[level]
  return {
    persona: APP_PERSONA[app] ?? 'The Inbox Reclaimer',
    readiness,
    readinessLabel: readiness < 40 ? 'Getting Started' : readiness < 55 ? 'Building Momentum' : 'Ahead of the Curve',
    startApp: APP_LABEL[app] ?? 'Outlook',
    startCopy: `You told us it takes the biggest share of your week.`,
    path: `Foundations → your strongest app first → ${app === 'outlook' ? 'Outlook and Teams' : APP_LABEL[app]}`,
    opportunity:
      'You will learn how to brief AI once and carry that work through Word, Excel, PowerPoint and Outlook, so the report, the slide and the email all come from one source instead of three retypings.',
    timeSaved: `You told us: ${answers['q7-time-wasted'] === '5-10' ? '5–10 hours a week' : time.short}`,
    timeSavedShort: answers['q7-time-wasted'] === '5-10' ? '5–10 hours' : time.short,
  }
}
