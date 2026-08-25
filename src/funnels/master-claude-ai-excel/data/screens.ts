import catalog from './catalog.json'
import { mapCatalogItem, type RawCatalogItem } from '@/funnels/shared/lib/mapCatalog'
import type { FunnelScreen } from '@/funnels/shared/types'

const items = catalog as RawCatalogItem[]

export const EXCEL_SCREENS: FunnelScreen[] = [
  {
    type: 'identity-master',
    id: 'identity',
    headline: 'Advance Your Excel Work With Claude',
    subtext: 'Have you ever used Claude?',
    collageSrc: '/assets/excel-collage.webp',
    collageAlt: 'Claude AI + Microsoft Excel',
    legal404: true,
    options: [
      { emoji: '✅', label: 'Yes', value: 'yes' },
      { emoji: '🔍', label: 'No', value: 'not-yet' },
    ],
  },
  ...items
    .filter((item) => item.type !== 'identity' && item.type !== 'loading' && item.type !== 'email')
    .map(mapCatalogItem)
    .filter((s): s is FunnelScreen => s !== null),
  {
    type: 'loading',
    id: 'loading',
    header: 'Building your Excel + AI path...',
    steps: [
      'Analysing your Excel level...',
      'Mapping your formula gaps...',
      'Selecting your Claude workflows...',
      'Building your personalised path...',
      'Your Excel + AI plan is ready!',
    ],
    commitmentQuestion: 'How committed are you to mastering Excel with Claude?',
    testimonial: {
      name: 'Priya T.',
      role: 'Freelance Designer',
      text: 'Finally a course that respects my time. 10 minutes a day and I genuinely feel confident using AI in my projects now.',
    },
  },
  {
    type: 'email',
    id: 'email',
    badge: '✓ Your plan is ready',
    title: 'Enter your email to get:',
    subtitle: 'Your personal Master\nClaude AI + Excel Plan',
    features: [],
    consent: "I'd like to receive my Claude AI + Excel plan, personal tips, and exclusive offers straight to my inbox.",
    ctaLabel: 'UNLOCK MY PLAN →',
  },
  {
    type: 'name-capture',
    id: 'name-capture',
    title: 'What should we call you?',
    subtitle: "We'll personalise your Excel + AI mastery path with your name",
    placeholder: 'Enter your first name',
    ctaLabel: 'Continue',
    chrome: 'wordmark',
  },
]
