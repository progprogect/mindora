import catalog from './catalog.json'
import { mapCatalogItem, type RawCatalogItem } from '@/funnels/shared/lib/mapCatalog'
import type { FunnelScreen } from '@/funnels/shared/types'

const items = catalog as RawCatalogItem[]

const identity: FunnelScreen = {
  type: 'identity-sa',
  id: 'q1-focus',
  kicker: 'SuccessWise Success Assessment',
  headline: 'Discover your\npersonal roadmap',
  question: "What's your #1 focus right now?",
  hint: '(Choose one)',
  bullets: ['Takes only 60 seconds.', 'Get your personal plan.'],
  options: [
    {
      emoji: '🚀',
      label: 'Career & Business',
      value: 'career-business',
      gradient: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)',
    },
    {
      emoji: '💰',
      label: 'Wealth & Freedom',
      value: 'wealth-freedom',
      gradient: 'linear-gradient(135deg, #065f46 0%, #059669 50%, #10b981 100%)',
    },
    {
      emoji: '💪',
      label: 'Health & Vitality',
      value: 'health-vitality',
      gradient: 'linear-gradient(135deg, #9a3412 0%, #ea580c 50%, #fb923c 100%)',
    },
    {
      emoji: '🧠',
      label: 'Mindset & Confidence',
      value: 'mindset-confidence',
      gradient: 'linear-gradient(135deg, #6b21a8 0%, #9333ea 50%, #a855f7 100%)',
    },
  ],
}

export const SA_SCREENS: FunnelScreen[] = [
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
          statBox: '500,000+ people have used SuccessWise to transform their life',
          rating: '4.9 / 5 from 12,400+ learners',
        }
      }
      return mapped
    })
    .filter((s): s is FunnelScreen => s !== null),
  {
    type: 'loading',
    id: 'loading',
    header: 'Building your profile...',
    steps: [
      'Analysing your goals...',
      'Mapping your success dimensions...',
      'Selecting your archetype...',
      'Building your personalised roadmap...',
      'Your Success Profile is ready!',
    ],
    commitmentQuestion: 'How committed are you to transforming your life?',
    testimonial: {
      name: 'James W.',
      role: 'Freelancer',
      text: "I'd tried three times before and always quit. SuccessWise gave me a system that worked with my life, not against it.",
    },
  },
  {
    type: 'email',
    id: 'email',
    badge: '✓ Your Success Profile is ready',
    title: 'Enter your email to get your',
    subtitle: 'Personal Success Plan!',
    features: [
      { emoji: '✨', label: 'Success profile' },
      { emoji: '🎯', label: 'Personal roadmap' },
      { emoji: '🏆', label: 'Exclusive access' },
    ],
    consent: "I'd like to receive my Success Plan, personal tips, and exclusive offers straight to my inbox.",
    ctaLabel: 'UNLOCK MY SUCCESS PLAN →',
  },
  {
    type: 'name-capture',
    id: 'name-capture',
    title: 'What should we call you?',
    subtitle: "We'll personalise your Success Profile with your name",
    placeholder: 'Enter your first name',
    ctaLabel: 'REVEAL MY SUCCESS PROFILE →',
    chrome: 'wordmark',
  },
]
