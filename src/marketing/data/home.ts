export const LIFE_AREAS_ROW_A = [
  { emoji: '🧠', label: 'Mindset', bg: '#F5F3FF', border: '#8B5CF630', color: '#8B5CF6' },
  { emoji: '💼', label: 'Career', bg: '#EFF6FF', border: '#2563EB30', color: '#2563EB' },
  { emoji: '🚀', label: 'Business', bg: '#ECFEFF', border: '#0891B230', color: '#0891B2' },
  { emoji: '💰', label: 'Financial Wellbeing', bg: '#FFFBEB', border: '#D9770630', color: '#D97706' },
  { emoji: '❤️', label: 'Health', bg: '#FEF2F2', border: '#DC262630', color: '#DC2626' },
  { emoji: '⚡', label: 'Productivity', bg: '#F5F3FF', border: '#7C3AED30', color: '#7C3AED' },
] as const

export const LIFE_AREAS_ROW_B = [
  { emoji: '👑', label: 'Leadership', bg: '#FFFBEB', border: '#B4530930', color: '#B45309' },
  { emoji: '🗣️', label: 'Communication', bg: '#ECFEFF', border: '#0E749030', color: '#0E7490' },
  { emoji: '🤝', label: 'Relationships', bg: '#FDF2F8', border: '#BE185D30', color: '#BE185D' },
  { emoji: '🎨', label: 'Content Creation', bg: '#F5F3FF', border: '#7C3AED30', color: '#7C3AED' },
  { emoji: '✨', label: 'Lifestyle Design', bg: '#ECFDF5', border: '#05966930', color: '#059669' },
  { emoji: '🤖', label: 'AI & Technology', bg: '#ECFEFF', border: '#06B6D430', color: '#06B6D4' },
] as const

export const HERO_PILLS = [
  { emoji: '📚', label: 'Expert-curated lessons' },
  { emoji: '⚡', label: '5 minutes a day' },
  { emoji: '🎯', label: 'AI Coach bridges knowing & doing' },
] as const

export const HERO_AVATARS = [
  { initial: 'A', className: 'bg-violet-500' },
  { initial: 'M', className: 'bg-blue-500' },
  { initial: 'J', className: 'bg-emerald-500' },
  { initial: 'S', className: 'bg-orange-500' },
  { initial: 'R', className: 'bg-rose-500' },
] as const

export const STATS_BAR = [
  { value: '100K+', label: 'Learners Worldwide' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '200+', label: 'Expert Lessons' },
  { value: '87%', label: 'Report Real Progress' },
] as const

export const PRESS_NAMES = ['Forbes', 'Inc.', 'Entrepreneur', 'Business Insider'] as const

export const PROBLEM_STATS = [
  { emoji: '😔', value: '72%', label: 'never finish the courses they buy' },
  { emoji: '⏳', value: '3 weeks', label: 'before most quit a new habit' },
  { emoji: '🤯', value: '90%', label: 'feel overwhelmed by too many options' },
] as const

export const FEATURE_STEPS = [
  {
    num: '01',
    title: 'Tell us your goals',
    body: 'Take our 60-second quiz. We learn exactly where you are, what you want, and what’s holding you back — then build your personalised roadmap on the spot.',
    badge: '60-second quiz',
    accent: '#2563EB',
    tile: '#EFF6FF',
    delay: '0s',
  },
  {
    num: '02',
    title: 'Learn in 5 minutes a day',
    body: 'Your daily roadmap serves you one bite-sized expert lesson — distilled from the world’s best books, coaches, and frameworks. No filler. Just the signal.',
    badge: '200+ curated lessons',
    accent: '#7C3AED',
    tile: '#F5F3FF',
    delay: '0.4s',
  },
  {
    num: '03',
    title: 'Apply it with your AI Coach',
    body: 'After every lesson, your personal AI Coach turns what you just learned into one specific action for your life — today. Not generic advice. Your advice.',
    badge: '24/7 personalised coaching',
    accent: '#059669',
    tile: '#ECFDF5',
    delay: '0.8s',
  },
] as const

export const COMPARE_THEM = [
  'Random content, no clear structure',
  'Watch → Quiz → Certificate → Forget',
  'No personalisation, no AI',
  'Knowledge piles up, nothing changes',
] as const

export const COMPARE_US = [
  'Expert-curated, personalised roadmap',
  'Learn → Apply → AI Coach → Win',
  'Tailored to your goals & situation',
  'Daily actions = daily real-world progress',
] as const

export const SYSTEM_STEPS = [
  {
    num: '01',
    title: 'Learn',
    body: 'Absorb one focused, bite-sized lesson. No fluff. Just what matters.',
    tile: '#EFF6FF',
    accent: '#2563EB',
    icon: 'shield',
    arrow: true,
  },
  {
    num: '02',
    title: 'Understand',
    body: 'See exactly why this matters to your goals, your life, and your situation.',
    tile: '#F5F3FF',
    accent: '#7C3AED',
    icon: 'info',
    arrow: true,
  },
  {
    num: '03',
    title: 'Apply',
    body: 'Complete a specific action — something that improves your life today.',
    tile: '#ECFEFF',
    accent: '#0891B2',
    icon: 'arrow',
    arrow: false,
  },
  {
    num: '04',
    title: 'AI Coach',
    body: 'Your personal AI Coach guides you to apply what you learned to your exact situation.',
    tile: '#ECFDF5',
    accent: '#059669',
    icon: 'sun',
    arrow: true,
  },
  {
    num: '05',
    title: 'Win',
    body: 'Complete the challenge, earn your achievement, and celebrate a real improvement.',
    tile: '#FFFBEB',
    accent: '#D97706',
    icon: 'star',
    arrow: true,
  },
  {
    num: '06',
    title: 'Improve',
    body: 'Track progress, build streaks, and watch yourself transform over time.',
    tile: '#FEF2F2',
    accent: '#DC2626',
    icon: 'trend',
    arrow: false,
  },
] as const

export const COACH_BULLETS = [
  'Personalised to your goals and situation',
  'Gives you specific actions, not vague suggestions',
  'Remembers your progress and adapts over time',
  'Available any time you need guidance',
] as const

export const STORIES = [
  {
    banner: 'Promoted after 3 months',
    before: 'Consumed endless YouTube videos about career growth. Never acted on any of it.',
    after: 'Applied one lesson per day. Had the salary conversation. Got the promotion.',
    quote:
      'MindoraAcademy is the only platform that actually makes me do something after every lesson. I’ve applied more in 2 weeks than in 2 years of watching YouTube videos.',
    initials: 'SK',
    avatar: '#8B5CF6',
    name: 'Sarah K.',
    role: 'Marketing Manager · Career',
  },
  {
    banner: 'Launched first product in 6 weeks',
    before: 'Had a business idea for 2 years. Read every book. Never launched.',
    after: 'AI Coach turned every lesson into a specific next step. Launched in 6 weeks.',
    quote:
      'The AI Coach is like having a business mentor in my pocket. It gives advice specific to my actual situation. Game-changing.',
    initials: 'MT',
    avatar: '#2563EB',
    name: 'Marcus T.',
    role: 'Entrepreneur · Business',
  },
  {
    banner: '2× productivity in 30 days',
    before: 'Busy all day, productive for none of it. Knew all the frameworks. Applied zero.',
    after: 'One 5-minute lesson at lunch. One action in the afternoon. Everything shifted.',
    quote:
      'I do one lesson on my lunch break and always have one specific thing to try in the afternoon. My productivity has genuinely transformed.',
    initials: 'PS',
    avatar: '#10B981',
    name: 'Priya S.',
    role: 'Software Engineer · Productivity',
  },
] as const

export const STORY_STATS = [
  { value: '100K+', label: 'Members Worldwide' },
  { value: '200K+', label: 'Lessons Completed' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '87%', label: 'Report Real Progress' },
] as const

export const FINAL_TRUST = [
  { emoji: '🔒', label: 'Secure & Private' },
  { emoji: '⭐', label: 'Trusted by 100K+' },
  { emoji: '⚡', label: 'Instant Roadmap' },
  { emoji: '🤖', label: 'AI Coach Included' },
  { emoji: '🛡️', label: '30-Day Money-Back' },
] as const
