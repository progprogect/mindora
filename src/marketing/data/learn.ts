import { ROUTES } from '@/marketing/data/nav'

export type LearnCourse = {
  id: string
  title: string
  subtitle: string
  emoji: string
  lessons?: number
  days?: number
  xp: number
  gradient: string
  accentColor: string
  live: boolean
  isNew?: boolean
  cta: string
  href: string
}

export type LearnCategory = {
  slug: string
  pageTitle: string
  kicker: string
  emoji: string
  h1Line: string
  h1Accent: string
  subtitle: string
  live: boolean
  statusPill: string
  certificatePill: string
  heroBg: string
  problemBg: string
  skillsBg: string
  benefits: readonly { icon: string; text: string }[]
  problemKicker: string
  problemLine: string
  problemAccent: string
  problemBody: string
  sources: string
  stats: readonly { value: string; label: string }[]
  skillsTitle: string
  skillsSubtitle: string
  skills: readonly { icon: string; name: string }[]
  courses: readonly LearnCourse[]
  certTitle: string
  certBody: string
  certBg: string
  certCtaColor: string
  stickyCta: string
  stickyBg?: string
  stickyClass?: string
  certPad?: string
  disclaimer?: string
}

const QUIZ_28 = ROUTES.quiz28

export const LEARN_CATEGORIES: Record<string, LearnCategory> = {
  'success-mindset': {
    slug: 'success-mindset',
    pageTitle:
      'Success Mindset Courses — MindoraAcademy.com | Build Confidence, Resilience & High Performance',
    kicker: 'Success Mindset',
    emoji: '🧠',
    h1Line: 'Change Your Mind.',
    h1Accent: 'Change Your Life.',
    subtitle: "The world's most successful people think differently. Learn how — 5 minutes a day.",
    live: false,
    statusPill: '4 courses coming',
    certificatePill: '🏆 Mindset Certificate',
    heroBg:
      'linear-gradient(135deg, hsl(265 80% 12%) 0%, hsl(280 65% 18%) 50%, hsl(245 60% 14%) 100%)',
    problemBg: 'linear-gradient(180deg, hsl(265 60% 10%) 0%, hsl(265 50% 7%) 100%)',
    skillsBg: 'hsl(265 50% 7%)',
    benefits: [
      { icon: '🔥', text: 'Build unstoppable confidence' },
      { icon: '🏆', text: 'Earn your mindset certificate' },
      { icon: '🚀', text: 'Perform at your peak every day' },
    ],
    problemKicker: 'The inconvenient truth',
    problemLine: 'Your biggest obstacle',
    problemAccent: 'is between your ears.',
    problemBody:
      "Talent, education, and hard work matter — but they mean nothing if your mindset is working against you. The most successful people in the world aren't smarter. They think differently.",
    sources: 'Sources: Stanford Mindset Research · Harvard Business Review · APA Resilience Report 2025',
    stats: [
      { value: '85%', label: 'of success is attributed to mindset, not skill' },
      { value: '3×', label: 'higher earnings for people with growth mindset' },
      { value: '70%', label: 'of self-sabotage is driven by unchecked beliefs' },
      { value: '92%', label: 'of goals fail due to weak mental foundations' },
    ],
    skillsTitle: 'Master 10+ proven mental frameworks',
    skillsSubtitle: 'The tools top performers use daily — now in your hands.',
    skills: [
      { icon: '🧘', name: 'Stoicism' },
      { icon: '🧠', name: 'CBT' },
      { icon: '🎯', name: 'Visualisation' },
      { icon: '📔', name: 'Journaling' },
      { icon: '🌬️', name: 'Breathwork' },
      { icon: '🙏', name: 'Gratitude' },
      { icon: '💡', name: 'NLP' },
      { icon: '🔁', name: 'Habit Loops' },
      { icon: '⚡', name: 'Flow State' },
      { icon: '🪞', name: 'Self-Awareness' },
    ],
    courses: [
      {
        id: 'mindset-challenge',
        title: '28-Day Success Mindset Challenge',
        subtitle:
          'Transform your thinking, rewire your daily habits and build the mental foundation that high performers share.',
        emoji: '🧠',
        lessons: 28,
        xp: 560,
        gradient: 'linear-gradient(135deg, hsl(265 70% 32%) 0%, hsl(280 60% 22%) 100%)',
        accentColor: 'hsl(265 70% 40%)',
        live: false,
        cta: 'Notify me when live →',
        href: QUIZ_28,
      },
      {
        id: 'confidence-code',
        title: 'The Confidence Code',
        subtitle:
          'Overcome self-doubt, silence your inner critic and build unshakeable confidence that opens every door.',
        emoji: '💪',
        lessons: 21,
        xp: 420,
        gradient: 'linear-gradient(135deg, hsl(340 80% 40%) 0%, hsl(330 70% 28%) 100%)',
        accentColor: 'hsl(340 80% 40%)',
        live: false,
        cta: 'Notify me when live →',
        href: QUIZ_28,
      },
      {
        id: 'calm-mind',
        title: 'The Calm Mind',
        subtitle:
          'Beat anxiety, master stress and think clearly under pressure — even when everything around you is chaos.',
        emoji: '🌊',
        lessons: 21,
        xp: 420,
        gradient: 'linear-gradient(135deg, hsl(186 70% 30%) 0%, hsl(200 65% 20%) 100%)',
        accentColor: 'hsl(186 70% 30%)',
        live: false,
        cta: 'Notify me when live →',
        href: QUIZ_28,
      },
      {
        id: 'growth-mindset',
        title: 'Growth Mindset Unlocked',
        subtitle:
          'Rewire your brain for limitless potential. Learn to see every setback as fuel and every challenge as a gift.',
        emoji: '🌱',
        lessons: 24,
        xp: 480,
        gradient: 'linear-gradient(135deg, hsl(142 60% 28%) 0%, hsl(155 55% 18%) 100%)',
        accentColor: 'hsl(142 60% 28%)',
        live: false,
        cta: 'Notify me when live →',
        href: QUIZ_28,
      },
    ],
    certTitle: "Prove you're built differently",
    certBody:
      'Earn a verified Mindset certificate that signals to employers, partners and the world that you think like a top performer.',
    certBg: 'linear-gradient(135deg, hsl(265 70% 32%) 0%, hsl(280 60% 24%) 100%)',
    certCtaColor: 'hsl(265 70% 32%)',
    stickyCta: 'Notify me when courses go live →',
    stickyBg: 'hsl(265 70% 40%)',
  },
  career: {
    slug: 'career',
    pageTitle: 'Career Courses — MindoraAcademy.com | Get Promoted, Earn More & Future-Proof Your Career',
    kicker: 'Career',
    emoji: '💼',
    h1Line: 'Own Your Career.',
    h1Accent: 'Stop Waiting to Be Chosen.',
    subtitle: "The skills that get you promoted, paid more, and respected — in just 5 minutes a day.",
    live: false,
    statusPill: '4 courses coming',
    certificatePill: '🏆 Career Certificate',
    heroBg:
      'linear-gradient(135deg, hsl(210 85% 10%) 0%, hsl(220 75% 15%) 50%, hsl(195 70% 12%) 100%)',
    problemBg: 'linear-gradient(180deg, hsl(215 60% 10%) 0%, hsl(215 50% 7%) 100%)',
    skillsBg: 'hsl(215 50% 7%)',
    benefits: [
      { icon: '💰', text: "Get paid what you're worth" },
      { icon: '🏆', text: 'Earn your career certificate' },
      { icon: '🚀', text: 'Land your next promotion faster' },
    ],
    problemKicker: 'The career wake-up call',
    problemLine: 'Hard work alone',
    problemAccent: "won't get you promoted.",
    problemBody:
      "The people advancing fastest aren't working harder than you. They know the unwritten rules — how to negotiate, how to be seen, how to build leverage. Now you can too.",
    sources: 'Sources: LinkedIn Career Report 2025 · Glassdoor Salary Insights · Harvard Business Review',
    stats: [
      { value: '70%', label: 'of professionals feel stuck in their career' },
      { value: '£15K', label: 'average annual underearning due to poor negotiation' },
      { value: '80%', label: 'of jobs are filled through networking, not job boards' },
      { value: '4.2×', label: 'faster promotion for people with a strong personal brand' },
    ],
    skillsTitle: 'Master 10+ career-defining skills',
    skillsSubtitle: "Everything the top 1% of earners know — that nobody taught you.",
    skills: [
      { icon: '💼', name: 'LinkedIn' },
      { icon: '📄', name: 'CV Writing' },
      { icon: '🤝', name: 'Networking' },
      { icon: '💰', name: 'Negotiation' },
      { icon: '🎤', name: 'Interviews' },
      { icon: '🌟', name: 'Personal Brand' },
      { icon: '📈', name: 'Promotions' },
      { icon: '🧭', name: 'Career Pivots' },
      { icon: '👔', name: 'Executive Presence' },
      { icon: '🚀', name: 'Side Income' },
    ],
    courses: [
      {
        id: 'linkedin-mastery',
        title: 'LinkedIn Mastery',
        subtitle:
          'Build a magnetic profile that attracts recruiters, grows your network and puts you in front of the right opportunities.',
        emoji: '💼',
        lessons: 21,
        xp: 420,
        gradient: 'linear-gradient(135deg, hsl(210 80% 28%) 0%, hsl(220 75% 18%) 100%)',
        accentColor: 'hsl(210 80% 28%)',
        live: false,
        cta: 'Notify me when live →',
        href: QUIZ_28,
      },
      {
        id: 'salary-negotiation',
        title: 'Salary Negotiation Secrets',
        subtitle:
          "Stop leaving money on the table. Master the exact scripts and strategies that get you paid what you're truly worth.",
        emoji: '💰',
        lessons: 18,
        xp: 360,
        gradient: 'linear-gradient(135deg, hsl(142 60% 28%) 0%, hsl(155 55% 18%) 100%)',
        accentColor: 'hsl(142 60% 28%)',
        live: false,
        cta: 'Notify me when live →',
        href: QUIZ_28,
      },
      {
        id: 'interview-confidence',
        title: 'Interview Confidence',
        subtitle:
          'Walk into every interview ready to own the room — with answers that land offers, not silence.',
        emoji: '🎤',
        lessons: 21,
        xp: 420,
        gradient: 'linear-gradient(135deg, hsl(25 90% 40%) 0%, hsl(15 85% 28%) 100%)',
        accentColor: 'hsl(25 90% 40%)',
        live: false,
        cta: 'Notify me when live →',
        href: QUIZ_28,
      },
      {
        id: 'personal-brand',
        title: 'Personal Branding for Professionals',
        subtitle:
          'Become the go-to expert in your field. Build a reputation that opens doors before you even knock.',
        emoji: '🌟',
        lessons: 24,
        xp: 480,
        gradient: 'linear-gradient(135deg, hsl(265 65% 35%) 0%, hsl(280 55% 22%) 100%)',
        accentColor: 'hsl(265 65% 35%)',
        live: false,
        cta: 'Notify me when live →',
        href: QUIZ_28,
      },
    ],
    certTitle: "Prove you're career-ready",
    certBody:
      'Earn a verified Career certificate that shows employers, recruiters and your network that you invest in your own growth.',
    certBg: 'linear-gradient(135deg, hsl(210 80% 25%) 0%, hsl(195 70% 20%) 100%)',
    certCtaColor: 'hsl(210 80% 25%)',
    stickyCta: 'Notify me when courses go live →',
    stickyBg: 'hsl(210 80% 28%)',
  },
  business: {
    slug: 'business',
    pageTitle: 'Business Courses — MindoraAcademy.com | Start, Grow & Scale Your Business',
    kicker: 'Business',
    emoji: '🏢',
    h1Line: 'Build the Business',
    h1Accent: 'You Keep Talking About.',
    subtitle:
      "Start it. Grow it. Scale it. Real business skills in 5 minutes a day — from people who've done it.",
    live: false,
    statusPill: '4 courses coming',
    certificatePill: '🏆 Business Certificate',
    heroBg:
      'linear-gradient(135deg, hsl(152 65% 9%) 0%, hsl(160 55% 13%) 50%, hsl(140 50% 10%) 100%)',
    problemBg: 'linear-gradient(180deg, hsl(152 55% 8%) 0%, hsl(155 45% 6%) 100%)',
    skillsBg: 'hsl(155 45% 6%)',
    benefits: [
      { icon: '💡', text: 'Launch your first business' },
      { icon: '🏆', text: 'Earn your business certificate' },
      { icon: '📈', text: 'Build systems that scale' },
    ],
    problemKicker: 'The business reality check',
    problemLine: 'Most businesses fail',
    problemAccent: "because of what you don't know.",
    problemBody:
      "It's not about working harder or having the best idea. The businesses that survive and thrive are built by people who understand marketing, sales, cash flow and growth. Now you can too.",
    sources:
      'Sources: Forbes Small Business Report · CB Insights Startup Post-Mortem · McKinsey Growth Survey 2025',
    stats: [
      { value: '90%', label: 'of new businesses fail within 5 years' },
      { value: '82%', label: 'of failures are caused by poor financial knowledge' },
      { value: '3.5×', label: 'more revenue for businesses with strong marketing' },
      { value: '£0', label: 'needed to start — just the knowledge to begin' },
    ],
    skillsTitle: 'Master 10+ essential business skills',
    skillsSubtitle: 'Everything you need to start, run and grow a real business.',
    skills: [
      { icon: '💡', name: 'Ideation' },
      { icon: '📊', name: 'Finance' },
      { icon: '🎯', name: 'Marketing' },
      { icon: '🤝', name: 'Sales' },
      { icon: '⚙️', name: 'Operations' },
      { icon: '👥', name: 'Leadership' },
      { icon: '📈', name: 'Growth' },
      { icon: '🌍', name: 'Scaling' },
      { icon: '💰', name: 'Fundraising' },
      { icon: '🚀', name: 'Launching' },
    ],
    courses: [
      {
        id: 'start-your-business',
        title: 'Start Your Business in 30 Days',
        subtitle:
          'Go from idea to first paying customer in 30 bite-sized lessons. No experience, no excuses — just results.',
        emoji: '🚀',
        lessons: 30,
        xp: 600,
        gradient: 'linear-gradient(135deg, hsl(152 60% 26%) 0%, hsl(160 55% 16%) 100%)',
        accentColor: 'hsl(152 60% 26%)',
        live: false,
        cta: 'Notify me when live →',
        href: QUIZ_28,
      },
      {
        id: 'marketing-that-sells',
        title: 'Marketing That Actually Sells',
        subtitle:
          'Stop guessing what to post. Learn the strategies behind every high-converting campaign — and apply them today.',
        emoji: '🎯',
        lessons: 24,
        xp: 480,
        gradient: 'linear-gradient(135deg, hsl(25 90% 42%) 0%, hsl(15 85% 28%) 100%)',
        accentColor: 'hsl(25 90% 42%)',
        live: false,
        cta: 'Notify me when live →',
        href: QUIZ_28,
      },
      {
        id: 'sales-mastery',
        title: 'Sales Mastery',
        subtitle:
          'Sell without feeling pushy. Master the psychology of persuasion and close deals with confidence and integrity.',
        emoji: '🤝',
        lessons: 21,
        xp: 420,
        gradient: 'linear-gradient(135deg, hsl(210 80% 28%) 0%, hsl(220 75% 18%) 100%)',
        accentColor: 'hsl(210 80% 28%)',
        live: false,
        cta: 'Notify me when live →',
        href: QUIZ_28,
      },
      {
        id: 'scale-to-7-figures',
        title: 'Scale to 7 Figures',
        subtitle:
          "You've started. Now grow. The systems, hiring decisions and mindset shifts that take businesses to the next level.",
        emoji: '📈',
        lessons: 28,
        xp: 560,
        gradient: 'linear-gradient(135deg, hsl(265 65% 35%) 0%, hsl(280 55% 22%) 100%)',
        accentColor: 'hsl(265 65% 35%)',
        live: false,
        cta: 'Notify me when live →',
        href: QUIZ_28,
      },
    ],
    certTitle: 'Prove you mean business',
    certBody:
      'Earn a verified Business certificate that shows investors, partners and clients you have the knowledge to back up your ambition.',
    certBg: 'linear-gradient(135deg, hsl(152 60% 22%) 0%, hsl(160 55% 14%) 100%)',
    certCtaColor: 'hsl(152 60% 22%)',
    stickyCta: 'Notify me when courses go live →',
    stickyBg: 'hsl(152 60% 26%)',
  },
  'ai-and-technology': {
    slug: 'ai-and-technology',
    pageTitle:
      'AI & Technology Courses — MindoraAcademy.com | Master AI Tools, Build Income, Create Content',
    kicker: 'AI & Technology',
    emoji: '🤖',
    h1Line: 'Master AI.',
    h1Accent: 'Before It Masters You.',
    subtitle: '5 minutes a day. Expert lessons. Real skills you can use today.',
    live: true,
    statusPill: '4 courses live',
    certificatePill: '🏆 AI Certificate',
    heroBg:
      'linear-gradient(135deg, hsl(221 83% 12%) 0%, hsl(224 70% 20%) 50%, hsl(240 60% 16%) 100%)',
    problemBg: 'linear-gradient(180deg, hsl(224 60% 10%) 0%, hsl(230 50% 7%) 100%)',
    skillsBg: 'hsl(230 50% 7%)',
    benefits: [
      { icon: '⚡', text: 'Save 2+ hours daily' },
      { icon: '🏆', text: 'Earn your AI certificate' },
      { icon: '🚀', text: 'Outpace 90% of your peers' },
    ],
    problemKicker: 'The reality check',
    problemLine: "AI won't replace you.",
    problemAccent: 'Someone using AI will.',
    problemBody:
      "The gap between AI-skilled and AI-unaware professionals is growing faster than any previous tech shift in history. Don't be on the wrong side of it.",
    sources: 'Sources: PwC Global AI Barometer · Challenger Report · Stanford AI Index 2025–2026',
    stats: [
      { value: '100K+', label: 'AI-driven layoffs in 2025' },
      { value: '56%', label: 'Wage premium for AI-skilled workers' },
      { value: '45K+', label: 'Tech jobs cut in early 2026' },
      { value: '7.5×', label: 'More AI job demand vs overall hiring' },
    ],
    skillsTitle: 'Master 10+ industry-leading AI tools',
    skillsSubtitle: 'One platform. Every tool that matters.',
    skills: [
      { icon: '🤖', name: 'ChatGPT' },
      { icon: '🧠', name: 'Claude' },
      { icon: '✨', name: 'Gemini' },
      { icon: '🎨', name: 'DALL·E' },
      { icon: '🎬', name: 'Runway' },
      { icon: '🎙️', name: 'Otter.ai' },
      { icon: '🔍', name: 'Perplexity' },
      { icon: '⚙️', name: 'Make.com' },
      { icon: '✍️', name: 'Jasper' },
      { icon: '🖼️', name: 'Midjourney' },
    ],
    courses: [
      {
        id: '28-day-ai',
        title: '28-Day AI Challenge',
        subtitle: 'Go from AI beginner to power user. One skill per day. Life-changing results.',
        emoji: '🤖',
        days: 28,
        xp: 560,
        gradient: 'linear-gradient(135deg, hsl(var(--sw-blue)) 0%, hsl(224 70% 38%) 100%)',
        accentColor: '',
        live: true,
        cta: 'Start the Challenge →',
        href: QUIZ_28,
      },
      {
        id: 'prompt-engineering',
        title: 'Prompt Engineering Mastery',
        subtitle: 'Write prompts that get results every time.',
        emoji: '💬',
        lessons: 21,
        xp: 420,
        gradient: 'linear-gradient(135deg, hsl(265 70% 48%) 0%, hsl(280 65% 35%) 100%)',
        accentColor: 'hsl(265 70% 48%)',
        live: true,
        isNew: true,
        cta: 'Start Lesson 1 →',
        href: '/courses/prompt-engineering-mastery/pem-1-why-words-matter',
      },
      {
        id: 'chatgpt-for-business',
        title: 'ChatGPT for Business',
        subtitle: 'Master ChatGPT to save time, communicate better, and grow your business.',
        emoji: '📧',
        lessons: 21,
        xp: 420,
        gradient: 'linear-gradient(135deg, hsl(25 95% 53%) 0%, hsl(15 90% 40%) 100%)',
        accentColor: 'hsl(25 95% 40%)',
        live: true,
        isNew: true,
        cta: 'Start Lesson 1 →',
        href: '/app/courses/chatgpt-for-business/cgb-1-what-is-chatgpt',
      },
      {
        id: 'claude-ai',
        title: 'Claude AI: Think Smarter, Work Faster',
        subtitle:
          'Go from complete beginner to confident Claude user in 21 lessons. Write better, research smarter, and get more done every day.',
        emoji: '🧠',
        lessons: 21,
        xp: 420,
        gradient: 'linear-gradient(135deg, hsl(258 90% 58%) 0%, hsl(240 80% 40%) 100%)',
        accentColor: 'hsl(258 90% 45%)',
        live: true,
        isNew: true,
        cta: 'Start Lesson 1 →',
        href: '/app/courses/claude-ai-mastery/cam-1-what-is-claude',
      },
    ],
    certTitle: "Prove you're AI-ready",
    certBody:
      "Earn a verified AI certificate that boosts your LinkedIn profile and signals to employers you're future-proof.",
    certBg: 'linear-gradient(135deg, hsl(var(--sw-blue)) 0%, hsl(265 70% 48%) 100%)',
    certCtaColor: '',
    stickyCta: 'Start the 28-Day AI Challenge →',
    stickyClass: 'bg-sw-blue',
  },
  health: {
    slug: 'health',
    pageTitle: 'Health Courses — MindoraAcademy.com | Feel Better Every Single Day',
    kicker: 'Health',
    emoji: '❤️',
    h1Line: 'Your Health Is',
    h1Accent: 'Your Greatest Asset.',
    subtitle: 'More energy, better sleep, less stress. Real science — not fads — in just 5 minutes a day.',
    live: false,
    statusPill: '4 courses coming',
    certificatePill: '🏆 Health Certificate',
    heroBg:
      'linear-gradient(135deg, hsl(186 70% 9%) 0%, hsl(175 60% 12%) 50%, hsl(195 65% 10%) 100%)',
    problemBg: 'linear-gradient(180deg, hsl(186 55% 8%) 0%, hsl(188 45% 6%) 100%)',
    skillsBg: 'hsl(188 45% 6%)',
    benefits: [
      { icon: '⚡', text: 'Double your daily energy' },
      { icon: '🏆', text: 'Earn your health certificate' },
      { icon: '😴', text: 'Sleep deeper every night' },
    ],
    problemKicker: 'The health wake-up call',
    problemLine: "You can't perform",
    problemAccent: 'from an empty tank.',
    problemBody:
      'Every goal you have — career, business, relationships — depends on your health. Yet most people treat their body like an afterthought. The highest performers in the world treat it as their #1 priority.',
    sources: 'Sources: WHO Global Sleep Report · APA Burnout Study 2025 · Lancet Longevity Research',
    stats: [
      { value: '67%', label: 'of adults are chronically sleep-deprived' },
      { value: '3×', label: 'higher burnout risk for people who ignore recovery' },
      { value: '40%', label: 'productivity loss from poor health and low energy' },
      { value: '10+', label: 'years added to your life with the right daily habits' },
    ],
    skillsTitle: 'Master 10+ health pillars',
    skillsSubtitle: 'The science of feeling and performing at your best — simplified.',
    skills: [
      { icon: '😴', name: 'Sleep' },
      { icon: '🥗', name: 'Nutrition' },
      { icon: '🏋️', name: 'Fitness' },
      { icon: '🧠', name: 'Mental Health' },
      { icon: '⚡', name: 'Energy' },
      { icon: '🌬️', name: 'Breathwork' },
      { icon: '🩺', name: 'Longevity' },
      { icon: '🧘', name: 'Stress Relief' },
      { icon: '💧', name: 'Hydration' },
      { icon: '❤️', name: 'Heart Health' },
    ],
    courses: [
      {
        id: 'sleep-mastery',
        title: 'Sleep Mastery',
        subtitle:
          'Unlock deep, restorative sleep every night. Wake up sharp, energised and ready to take on anything.',
        emoji: '😴',
        lessons: 21,
        xp: 420,
        gradient: 'linear-gradient(135deg, hsl(235 55% 30%) 0%, hsl(245 50% 18%) 100%)',
        accentColor: 'hsl(235 55% 30%)',
        live: false,
        cta: 'Notify me when live →',
        href: QUIZ_28,
      },
      {
        id: 'energy-all-day',
        title: 'Energy All Day',
        subtitle:
          'Eliminate the 3pm slump for good. Build sustainable, natural energy through nutrition, movement and habit.',
        emoji: '⚡',
        lessons: 21,
        xp: 420,
        gradient: 'linear-gradient(135deg, hsl(186 65% 28%) 0%, hsl(195 60% 18%) 100%)',
        accentColor: 'hsl(186 65% 28%)',
        live: false,
        cta: 'Notify me when live →',
        href: QUIZ_28,
      },
      {
        id: 'stress-proof',
        title: 'Stress-Proof',
        subtitle:
          'Stop letting stress run your life. Science-backed techniques to stay calm, focused and in control under pressure.',
        emoji: '🧘',
        lessons: 18,
        xp: 360,
        gradient: 'linear-gradient(135deg, hsl(340 65% 35%) 0%, hsl(350 60% 22%) 100%)',
        accentColor: 'hsl(340 65% 35%)',
        live: false,
        cta: 'Notify me when live →',
        href: QUIZ_28,
      },
      {
        id: 'body-reset',
        title: 'The Body Reset',
        subtitle:
          'Lose weight, gain strength and feel better in your body — without fad diets or punishing gym sessions.',
        emoji: '🏋️',
        lessons: 28,
        xp: 560,
        gradient: 'linear-gradient(135deg, hsl(25 85% 40%) 0%, hsl(15 80% 27%) 100%)',
        accentColor: 'hsl(25 85% 40%)',
        live: false,
        cta: 'Notify me when live →',
        href: QUIZ_28,
      },
    ],
    certTitle: "Prove you're built to last",
    certBody:
      'Earn a verified Health certificate that shows the world you take your wellbeing — and your performance — seriously.',
    certBg: 'linear-gradient(135deg, hsl(186 60% 22%) 0%, hsl(175 55% 14%) 100%)',
    certCtaColor: 'hsl(186 60% 22%)',
    stickyCta: 'Notify me when courses go live →',
    stickyBg: 'hsl(186 60% 26%)',
    certPad: 'mx-auto max-w-2xl px-4 pt-6 pb-4',
    disclaimer:
      'Content on this platform is for educational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional before making changes to your diet, exercise or health routine.',
  },
}
