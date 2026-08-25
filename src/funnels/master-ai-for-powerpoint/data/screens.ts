import catalog from './catalog.json'
import { mapCatalogItem, type RawCatalogItem } from '@/funnels/shared/lib/mapCatalog'
import type { FunnelScreen } from '@/funnels/shared/types'

const items = catalog as RawCatalogItem[]

function masterScreens(
  identity: Extract<FunnelScreen, { type: 'identity-master' }>,
  loading: Extract<FunnelScreen, { type: 'loading' }>,
  email: Extract<FunnelScreen, { type: 'email' }>,
  name: Extract<FunnelScreen, { type: 'name-capture' }>,
): FunnelScreen[] {
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

export const PPT_SCREENS: FunnelScreen[] = masterScreens(
  {
    type: 'identity-master',
    id: 'identity',
    headline: 'Master AI for PowerPoint',
    subtext: 'Have you ever used AI to help build a presentation?',
    collageSrc: '/assets/ppt-collage.png',
    collageAlt: 'Claude AI + Microsoft PowerPoint + Microsoft Copilot',
    legal404: true,
    options: [
      { emoji: '✅', label: 'Yes', value: 'yes' },
      { emoji: '🔍', label: 'Not yet', value: 'not-yet' },
    ],
  },
  {
    type: 'loading',
    id: 'loading',
    header: 'Building your PowerPoint + AI path...',
    steps: [
      'Analysing your PowerPoint level...',
      'Mapping your slide gaps...',
      'Selecting your AI workflows...',
      'Building your personalised path...',
      'Your PowerPoint + AI plan is ready!',
    ],
    commitmentQuestion: 'How committed are you to mastering PowerPoint with AI?',
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
    subtitle: 'Your personal Master\nAI + PowerPoint Plan',
    features: [],
    consent: "I'd like to receive my AI + PowerPoint plan, personal tips, and exclusive offers straight to my inbox.",
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
)
