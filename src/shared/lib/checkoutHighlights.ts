import type { MarketingLocale } from '@/marketing/data/moneyBack'

const DEFAULT_EN = [
  'Full access to your personalised 28-Day AI Plan',
  'Easy-to-follow daily lessons — no experience required',
  'New AI tools and skills added every week',
]

const DEFAULT_RU = [
  'Полный доступ к персональному 28-дневному ИИ-плану',
  'Понятные ежедневные уроки — опыт не нужен',
  'Новые AI-инструменты и навыки каждую неделю',
]

const CLAUDE_EN = [
  'Full access to your personal Claude AI Plan',
  'Easy-to-follow daily lessons — no experience required',
  'Professional certifications included',
]

const CLAUDE_RU = [
  'Полный доступ к персональному плану Claude AI',
  'Понятные ежедневные уроки — опыт не нужен',
  'Профессиональные сертификаты включены',
]

export function defaultCheckoutHighlights(locale: MarketingLocale): string[] {
  return locale === 'ru' ? DEFAULT_RU : DEFAULT_EN
}

export function claudeCheckoutHighlights(locale: MarketingLocale): string[] {
  return locale === 'ru' ? CLAUDE_RU : CLAUDE_EN
}

/** @deprecated Use defaultCheckoutHighlights(locale) */
export const DEFAULT_CHECKOUT_HIGHLIGHTS = DEFAULT_EN

/** @deprecated Use claudeCheckoutHighlights(locale) */
export const CLAUDE_CHECKOUT_HIGHLIGHTS = CLAUDE_EN
