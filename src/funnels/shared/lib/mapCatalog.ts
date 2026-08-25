import type { FunnelScreen, QuizOption } from '@/funnels/shared/types'

export interface CatalogOption {
  emoji: string
  label: string
  value: string
  sublabel?: string
  gradient?: string
}

export interface RawCatalogItem {
  id: string
  type: string
  step?: number
  totalSteps?: number
  question?: string
  subtext?: string
  options?: CatalogOption[]
  headline?: string
  copy?: string
  ctaLabel?: string
  echoKey?: string
  echoHeadline?: Record<string, string>
  echoCopy?: Record<string, string>
  stat?: string
  quote?: string
  quoteAttribution?: string
}

function toOptions(options: CatalogOption[] | undefined): QuizOption[] {
  return (options ?? []).map((o) => ({
    emoji: o.emoji,
    label: o.label,
    value: o.value,
    sublabel: o.sublabel,
    gradient: o.gradient,
  }))
}

export function mapCatalogItem(item: RawCatalogItem): FunnelScreen | null {
  if (item.type === 'large-card') {
    return { type: 'large-card', id: item.id, question: item.question ?? '', options: toOptions(item.options) }
  }
  if (item.type === 'question') {
    return {
      type: 'question',
      id: item.id,
      step: item.step ?? 1,
      totalSteps: item.totalSteps ?? 16,
      question: item.question ?? '',
      subtext: item.subtext,
      options: toOptions(item.options),
    }
  }
  if (item.type === 'social-proof') {
    return {
      type: 'social-proof',
      id: item.id,
      headline: item.headline ?? '',
      copy: item.copy ?? '',
      ctaLabel: item.ctaLabel ?? 'CONTINUE →',
      echoKey: item.echoKey,
      echoHeadline: item.echoHeadline,
      echoCopy: item.echoCopy,
    }
  }
  if (item.type === 'interstitial') {
    return {
      type: 'interstitial',
      id: item.id,
      headline: item.headline ?? '',
      copy: item.copy ?? '',
      ctaLabel: item.ctaLabel ?? 'CONTINUE →',
      stat: item.stat,
      quote: item.quote,
      quoteAttribution: item.quoteAttribution,
      echoKey: item.echoKey,
      echoHeadline: item.echoHeadline,
      echoCopy: item.echoCopy,
      icon: item.headline?.includes('Companies are hiring') ? '🎓' : undefined,
    }
  }
  return null
}
