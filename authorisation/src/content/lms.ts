import { lmsEn, lmsRu } from '../i18n/chunks/lms'
import type { Locale } from '@/i18n/locale'

type LmsMessages = typeof lmsEn | typeof lmsRu

function lmsTable(locale: Locale): LmsMessages {
  return locale === 'ru' ? lmsRu : lmsEn
}

function dateLocaleTag(locale: Locale = 'en') {
  return locale === 'ru' ? 'ru-RU' : 'en-GB'
}

export const PROFILE_PACES = [
  { value: 'spark' },
  { value: 'momentum' },
  { value: 'ignite' },
] as const

export const PROFILE_FOCUS = [
  { value: 'ai' },
  { value: 'mindset' },
  { value: 'career' },
  { value: 'business' },
  { value: 'health' },
  { value: 'all' },
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
  { emoji: string; focus: string }
> = {
  'ai-and-technology': { emoji: '🤖', focus: 'ai' },
  'success-mindset': { emoji: '🧠', focus: 'mindset' },
  career: { emoji: '💼', focus: 'career' },
  business: { emoji: '🚀', focus: 'business' },
  health: { emoji: '💪', focus: 'health' },
  'financial-wellbeing': { emoji: '💰', focus: 'financial' },
}

export const CATEGORY_LABEL: Record<string, string> = {
  'ai-and-technology': 'ai-and-technology',
  'success-mindset': 'success-mindset',
  career: 'career',
  business: 'business',
  health: 'health',
  'financial-wellbeing': 'financial-wellbeing',
}

const PACE_VALUES = new Set(PROFILE_PACES.map((item) => item.value))
const FOCUS_VALUES = new Set(PROFILE_FOCUS.map((item) => item.value))
const AI_TIP_KEYS = ['lms.aiTip.0', 'lms.aiTip.1', 'lms.aiTip.2', 'lms.aiTip.3'] as const

export function paceLabel(locale: Locale, value: string) {
  if (!PACE_VALUES.has(value as (typeof PROFILE_PACES)[number]['value'])) return value
  const key = `lms.pace.${value}.label` as keyof LmsMessages
  return lmsTable(locale)[key]
}

export function paceDesc(locale: Locale, value: string) {
  if (!PACE_VALUES.has(value as (typeof PROFILE_PACES)[number]['value'])) {
    return lmsTable(locale)['lms.fallback.paceDesc']
  }
  const key = `lms.pace.${value}.desc` as keyof LmsMessages
  return lmsTable(locale)[key]
}

export function focusLabel(locale: Locale, value: string) {
  if (!FOCUS_VALUES.has(value as (typeof PROFILE_FOCUS)[number]['value'])) return value
  const key = `lms.focus.${value}` as keyof LmsMessages
  return lmsTable(locale)[key]
}

export function pathShort(locale: Locale, key: string) {
  const msgKey = `lms.pathShort.${key}` as keyof LmsMessages
  const table = lmsTable(locale)
  if (msgKey in table) return table[msgKey]
  return key
}

export function categoryLabel(locale: Locale, key: string) {
  const msgKey = `lms.category.${key}` as keyof LmsMessages
  const table = lmsTable(locale)
  if (msgKey in table) return table[msgKey]
  return key
}

export function greetingLabel(now = new Date(), locale: Locale = 'en') {
  const hour = now.getHours()
  const table = lmsTable(locale)
  if (hour < 12) return table['lms.greeting.morning']
  if (hour < 17) return table['lms.greeting.afternoon']
  return table['lms.greeting.evening']
}

export function aiTips(locale: Locale = 'en') {
  const table = lmsTable(locale)
  return AI_TIP_KEYS.map((key) => table[key])
}

export function todayIso(now = new Date()) {
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function mondayWeek(now = new Date(), locale: Locale = 'en') {
  const tag = dateLocaleTag(locale)
  const days = []
  const day = now.getDay()
  const mondayOffset = day === 0 ? -6 : 1 - day
  for (let i = 0; i < 7; i++) {
    const date = new Date(now)
    date.setDate(now.getDate() + mondayOffset + i)
    days.push({
      label: date.toLocaleDateString(tag, { weekday: 'short' }).slice(0, 1),
      long: date.toLocaleDateString(tag, { weekday: 'short' }),
      date: todayIso(date),
      num: date.getDate(),
    })
  }
  return days
}

/** Last 7 days ending today — Progress page (Fri…Thu when today is Thursday). */
export function rollingWeek(now = new Date(), locale: Locale = 'en') {
  const tag = dateLocaleTag(locale)
  const days = []
  const base = new Date(now)
  base.setHours(12, 0, 0, 0)
  for (let i = 6; i >= 0; i--) {
    const date = new Date(base)
    date.setDate(base.getDate() - i)
    days.push({
      label: date.toLocaleDateString(tag, { weekday: 'short' }).slice(0, 1),
      long: date.toLocaleDateString(tag, { weekday: 'short' }),
      date: todayIso(date),
      num: date.getDate(),
    })
  }
  return days
}
