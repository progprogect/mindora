export const PRICING_PLANS = [
  {
    id: 'month',
    label: '1 month',
    save: 33,
    was: '29.99',
    now: '19.99',
    badge: null,
    summary: '$1 for 7 days, then $19.99/month. Cancel any time.',
  },
  {
    id: 'quarter',
    label: '3 months',
    save: 57,
    was: '29.99',
    now: '12.99',
    badge: 'MOST POPULAR',
    summary: '$1 for 7 days, then $38.97 every 3 months ($12.99/month). Cancel any time.',
  },
  {
    id: 'year',
    label: '12 months',
    save: 75,
    was: '29.99',
    now: '7.50',
    badge: 'BEST VALUE',
    summary: '$1 for 7 days, then $90.00 every 12 months ($7.50/month). Cancel any time.',
  },
] as const

export const PRICING_FEATURES = [
  'Full access to every course & path',
  'AI Coach — personalised, 24/7',
  'Personalised roadmap & progress tracking',
  'Certificates of completion',
  'New courses added every month',
  'Cancel any time, no contract',
] as const

export const PRICING_TRUST = [
  '30-Day Money-Back Guarantee',
  'Cancel any time',
  'Secure payment via Stripe',
] as const
