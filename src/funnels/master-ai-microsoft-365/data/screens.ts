import { mapCatalogItem, type RawCatalogItem } from '@/funnels/shared/lib/mapCatalog'
import type { FunnelScreen } from '@/funnels/shared/types'
import type { Locale } from '../../../../authorisation/src/i18n/locale'
import { catalogForLocale } from './catalogLocale'
import { m365ScreenCopy } from './screenCopy'

export function getM365Screens(locale: Locale): FunnelScreen[] {
  const copy = m365ScreenCopy(locale)
  const items = catalogForLocale(locale) as RawCatalogItem[]

  return [
    {
      type: 'identity-master',
      id: 'identity',
      headline: copy.identity.headline,
      subtext: copy.identity.subtext,
      collageSrc: '/assets/m365-collage.png',
      collageAlt: copy.identity.collageAlt,
      legal404: true,
      options: [
        { emoji: '✅', label: copy.identity.options[0].label, value: 'yes' },
        { emoji: '🔍', label: copy.identity.options[1].label, value: 'not-yet' },
      ],
    },
    ...items
      .filter((item) => item.type !== 'identity' && item.type !== 'loading' && item.type !== 'email')
      .map(mapCatalogItem)
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
      features: [],
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
      showEmailConfirmed: true,
      inputIcon: true,
      privacyNote: copy.nameCapture.privacyNote,
    },
  ]
}

export const M365_SCREENS = getM365Screens('en')
