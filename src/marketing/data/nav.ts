export const ROUTES = {
  home: '/',
  pricing: '/pricing',
  login: '/login',
  support: '/support',
  billing: '/billing',
  about: '/about',
  contact: '/contact',
  cookie: '/cookie-policy',
  privacy: '/privacy-policy',
  terms: '/terms-and-conditions',
  refund: '/refund-policy',
  subscription: '/subscription-terms',
  emailPreferences: '/email-preferences',
  unsubscribe: '/unsubscribe',
  quiz28: '/quiz/28-day-ai-challenge',
  quizClaude: '/quiz/claude-ai-certification',
  quizSuccess: '/quiz/success-assessment',
  checkout: '/checkout',
  checkoutSetup: '/checkout/setup',
  learnMindset: '/learn/success-mindset',
  learnCareer: '/learn/career',
  learnBusiness: '/learn/business',
  learnAi: '/learn/ai-and-technology',
  learnHealth: '/learn/health',
  learnFinance: '/learn/financial-wellbeing',
} as const

export const HASH = {
  features: '#features',
  howItWorks: '#how-it-works',
  successStories: '#success-stories',
} as const

export const HEADER_NAV = [
  { label: 'Features', hash: HASH.features },
  { label: 'How It Works', hash: HASH.howItWorks },
  { label: 'Success Stories', hash: HASH.successStories },
  { label: 'Pricing', href: ROUTES.pricing },
] as const

export const FOOTER_PLATFORM = [
  { label: 'Features', href: '#' },
  { label: 'How It Works', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Success Stories', href: '#' },
] as const

export const FOOTER_LEARN = [
  { label: 'Mindset', href: ROUTES.learnMindset },
  { label: 'Career', href: ROUTES.learnCareer },
  { label: 'Business', href: ROUTES.learnBusiness },
  { label: 'AI & Technology', href: ROUTES.learnAi },
  { label: 'Health', href: ROUTES.learnHealth },
  { label: 'Financial Wellbeing', href: ROUTES.learnFinance },
] as const

export const FOOTER_COMPANY = [
  { label: 'About', href: ROUTES.about },
  { label: 'Blog', href: '#' },
  { label: 'Help & Support', href: ROUTES.support },
  { label: 'Contact', href: ROUTES.contact },
] as const

export const FOOTER_LEGAL = [
  { label: 'Privacy Policy', href: ROUTES.privacy },
  { label: 'Terms & Conditions', href: ROUTES.terms },
  { label: 'Refund Policy', href: ROUTES.refund },
  { label: 'Billing & Plans', href: ROUTES.billing },
  { label: 'Cookie Policy', href: ROUTES.cookie },
] as const
