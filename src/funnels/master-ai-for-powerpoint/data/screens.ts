import { mapCatalogItem, type RawCatalogItem } from '@/funnels/shared/lib/mapCatalog'
import type { FunnelScreen } from '@/funnels/shared/types'
import type { Locale } from '../../../../authorisation/src/i18n/locale'
import { catalogForLocale } from './catalogLocale'
import { pptScreenCopy } from './screenCopy'

function masterScreens(
  locale: Locale,
  identity: Extract<FunnelScreen, { type: 'identity-master' }>,
  loading: Extract<FunnelScreen, { type: 'loading' }>,
  email: Extract<FunnelScreen, { type: 'email' }>,
  name: Extract<FunnelScreen, { type: 'name-capture' }>,
): FunnelScreen[] {
  const items = catalogForLocale(locale) as RawCatalogItem[]
  return [
    identity,
    ...items
      .filter((item) => item.type !== 'identity' && item.type !== 'loading' && item.type !== 'email')
      .map(mapCatalogItem)
      .filter((s): s is FunnelScreen => s !== null),
    loading,
    email,
    name,
  ]
}

export function getPptScreens(locale: Locale): FunnelScreen[] {
  const copy = pptScreenCopy(locale)
  return masterScreens(
    locale,
    {
      type: 'identity-master',
      id: 'identity',
      headline: copy.identity.headline,
      subtext: copy.identity.subtext,
      collageSrc: '/assets/ppt-collage.png',
      collageAlt: copy.identity.collageAlt,
      legal404: true,
      options: [
        { emoji: '✅', label: copy.identity.options[0].label, value: 'yes' },
        { emoji: '🔍', label: copy.identity.options[1].label, value: 'not-yet' },
      ],
    },
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
  )
}

export const PPT_SCREENS = getPptScreens('en')
