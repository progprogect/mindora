import catalog from './catalog.json'
import { mapCatalogItem, type RawCatalogItem } from '@/funnels/shared/lib/mapCatalog'
import type { FunnelScreen } from '@/funnels/shared/types'

const items = catalog as RawCatalogItem[]

export const M365_SCREENS: FunnelScreen[] = [
  {
    type: 'identity-master',
    id: 'identity',
    headline: 'Master AI for Microsoft 365',
    subtext: 'Have you ever used AI to help with Word, Excel, PowerPoint or Outlook?',
    collageSrc: '/assets/m365-collage.png',
    collageAlt: 'Claude AI + Microsoft 365 + Microsoft Copilot',
    legal404: true,
    options: [
      { emoji: '✅', label: 'Yes', value: 'yes' },
      { emoji: '🔍', label: 'Not yet', value: 'not-yet' },
    ],
  },
  ...items
    .filter((item) => item.type !== 'identity' && item.type !== 'loading' && item.type !== 'email')
    .map(mapCatalogItem)
    .filter((s): s is FunnelScreen => s !== null),
  {
    type: 'loading',
    id: 'loading',
    header: 'Building your Microsoft 365 + AI plan...',
    steps: [
      'Analysing your Microsoft 365 setup...',
      'Matching the app that costs you most time...',
      'Selecting your 24 lessons...',
      'Building your six-module path...',
      'Your Microsoft 365 + AI plan is ready!',
    ],
    commitmentQuestion: 'How committed are you to mastering Microsoft 365 with AI?',
    testimonial: {
      name: 'David R.',
      role: 'Operations Lead',
      text: "The personal path was what sold it. It wasn't generic — it felt built for someone in my exact situation.",
    },
  },
  {
    type: 'email',
    id: 'email',
    badge: '✓ Your plan is ready',
    title: 'Enter your email to get:',
    subtitle: 'Your personal Microsoft 365 + AI Plan',
    features: [],
    consent: "I'd like to receive my Microsoft 365 + AI plan, personal tips, and exclusive offers straight to my inbox.",
    ctaLabel: 'UNLOCK MY PLAN →',
  },
  {
    type: 'name-capture',
    id: 'name-capture',
    title: 'One last thing — what should we call you?',
    subtitle: "We'll personalise your plan (and your certificate) with your name.",
    placeholder: 'Your first name',
    ctaLabel: 'CONTINUE →',
    showEmailConfirmed: true,
    inputIcon: true,
    privacyNote: '🔒 Only used to personalise your plan.',
  },
]
