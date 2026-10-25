import { mapCatalogItem, type RawCatalogItem } from '@/funnels/shared/lib/mapCatalog'
import type { FunnelScreen } from '@/funnels/shared/types'
import type { Locale } from '../../../../authorisation/src/i18n/locale'
import { catalogForLocale } from './catalogLocale'
import { saScreenCopy } from './screenCopy'

const IDENTITY_VALUES = ['career-business', 'wealth-freedom', 'health-vitality', 'mindset-confidence'] as const

const IDENTITY_GRADIENTS = [
  'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)',
  'linear-gradient(135deg, #065f46 0%, #059669 50%, #10b981 100%)',
  'linear-gradient(135deg, #9a3412 0%, #ea580c 50%, #fb923c 100%)',
  'linear-gradient(135deg, #6b21a8 0%, #9333ea 50%, #a855f7 100%)',
]

const IDENTITY_EMOJI = ['🚀', '💰', '💪', '🧠']

export function getSaScreens(locale: Locale): FunnelScreen[] {
  const copy = saScreenCopy(locale)
  const items = catalogForLocale(locale) as RawCatalogItem[]

  const identity: FunnelScreen = {
    type: 'identity-sa',
    id: 'q1-focus',
    kicker: copy.identity.kicker,
    headline: copy.identity.headline,
    question: copy.identity.question,
    hint: copy.identity.hint,
    bullets: [...copy.identity.bullets],
    options: copy.identity.options.map((o, i) => ({
      emoji: IDENTITY_EMOJI[i],
      label: o.label,
      value: IDENTITY_VALUES[i],
      gradient: IDENTITY_GRADIENTS[i],
    })),
  }

  return [
    identity,
    ...items
      .filter((item) => item.type !== 'hero' && item.type !== 'loading' && item.type !== 'email')
      .map((item): FunnelScreen | null => {
        const mapped = mapCatalogItem(item)
        if (!mapped) return null
        if (mapped.type === 'social-proof') {
          return {
            ...mapped,
            heroImage: '/assets/claude-icon-sparkles.webp',
            statBox: copy.socialProof.statBox,
            rating: copy.socialProof.rating,
          }
        }
        return mapped
      })
      .filter((s): s is FunnelScreen => s !== null),
    {
      type: 'loading',
      id: 'loading',
      header: copy.loading.header,
      steps: [...copy.loading.steps],
      commitmentQuestion: copy.loading.commitmentQuestion,
      testimonial: { ...copy.loading.testimonial },
    },
    {
      type: 'email',
      id: 'email',
      badge: copy.email.badge,
      title: copy.email.title,
      subtitle: copy.email.subtitle,
      features: copy.email.features.map((f, i) => ({
        emoji: ['✨', '🎯', '🏆'][i],
        label: f.label,
      })),
      consent: copy.email.consent,
      ctaLabel: copy.email.ctaLabel,
    },
    {
      type: 'name-capture',
      id: 'name-capture',
      title: copy.nameCapture.title,
      subtitle: copy.nameCapture.subtitle,
      placeholder: copy.nameCapture.placeholder,
      ctaLabel: copy.nameCapture.ctaLabel,
      chrome: 'wordmark',
    },
  ]
}

/** @deprecated Use getSaScreens(locale) — kept for type checks; English only. */
export const SA_SCREENS = getSaScreens('en')
