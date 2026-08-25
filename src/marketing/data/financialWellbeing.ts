export const FW_NAV = [
  { label: 'AI & Technology', href: '/learn/ai-and-technology', active: false },
  { label: 'Success Mindset', href: '/learn/success-mindset', active: false },
  { label: 'Career', href: '/learn/career', active: false },
  { label: 'Business', href: '/learn/business', active: false },
  { label: 'Health', href: '/learn/health', active: false },
  { label: 'Financial Wellbeing', href: '/learn/financial-wellbeing', active: true },
] as const

export const FW_STATS = [
  { value: '29', label: 'Courses' },
  { value: '19,000+', label: 'Transformed' },
  { value: '4.9★', label: 'Rating' },
  { value: '30 days', label: 'To first result' },
] as const

export const PATH_GRADIENTS: Record<string, string> = {
  'from-amber-500 to-yellow-400': 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
  'from-green-500 to-emerald-400': 'linear-gradient(135deg, #059669 0%, #34D399 100%)',
  'from-sw-blue to-cyan-400': 'linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)',
  'from-purple-500 to-violet-400': 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
  'from-teal-500 to-cyan-400': 'linear-gradient(135deg, #0D9488 0%, #22D3EE 100%)',
  'from-rose-500 to-pink-400': 'linear-gradient(135deg, #F43F5E 0%, #F472B6 100%)',
  'from-orange-500 to-amber-400': 'linear-gradient(135deg, #EA580C 0%, #FBBF24 100%)',
}

export const FEATURED_PATHS = [
  {
    id: 'confidence-accelerator',
    title: 'Financial Confidence Accelerator',
    description:
      'The fastest path from money anxiety to genuine financial clarity. Build confidence, break patterns, take control.',
    lessons: 21,
    weeks: 4,
    emoji: '🚀',
    gradient: 'from-amber-500 to-yellow-400',
    featured: true,
  },
  {
    id: 'money-habits',
    title: 'The Money Habits System',
    description:
      'Replace bad financial habits with automatic ones that build wealth in the background — no willpower required.',
    lessons: 18,
    weeks: 3,
    emoji: '🔄',
    gradient: 'from-green-500 to-emerald-400',
    featured: false,
  },
  {
    id: 'earn-more',
    title: 'Earn More Masterclass',
    description:
      'Practical strategies to increase your income — salary negotiation, side income, and unlocking your earning potential.',
    lessons: 16,
    weeks: 3,
    emoji: '💼',
    gradient: 'from-sw-blue to-cyan-400',
    featured: false,
  },
  {
    id: 'abundance-mindset',
    title: 'Abundance Mindset: Money Edition',
    description:
      'Rewire your relationship with money at the root. From scarcity thinking to an abundance identity that attracts opportunity.',
    lessons: 14,
    weeks: 2,
    emoji: '✨',
    gradient: 'from-purple-500 to-violet-400',
    featured: false,
  },
  {
    id: 'budgeting-real-life',
    title: 'Budgeting for Real Life',
    description:
      'A no-shame, actually-workable budgeting system built for busy people with real expenses and real emotions.',
    lessons: 12,
    weeks: 2,
    emoji: '📊',
    gradient: 'from-teal-500 to-cyan-400',
    featured: false,
  },
  {
    id: 'your-money-story',
    title: 'Your Money Story',
    description:
      'Understand where your money beliefs came from — and rewrite the narrative so it works for you, not against you.',
    lessons: 10,
    weeks: 2,
    emoji: '📖',
    gradient: 'from-rose-500 to-pink-400',
    featured: false,
  },
  {
    id: 'freedom-blueprint',
    title: 'Financial Freedom Blueprint',
    description:
      'A clear, step-by-step roadmap from where you are now to genuine financial independence — broken into manageable milestones.',
    lessons: 24,
    weeks: 5,
    emoji: '🗺️',
    gradient: 'from-orange-500 to-amber-400',
    featured: false,
  },
] as const

export type FwCourse = {
  id: string
  title: string
  description: string
  lessons: number
  duration: string
  level: string
  tags: string[]
  isBestseller?: boolean
  isNew?: boolean
  isFeatured?: boolean
}

export type FwGroup = {
  id: string
  title: string
  subtitle: string
  color: 'amber' | 'green' | 'teal' | 'blue'
  emoji: string
  courses: FwCourse[]
}

export const COURSE_GROUPS: FwGroup[] = [
  {
    id: 'know-your-money-mind',
    title: 'Know Your Money Mind',
    subtitle: 'Understand your beliefs, emotions, and patterns around money',
    color: 'amber',
    emoji: '🧠',
    courses: [
      {
        id: 'money-story',
        title: 'Your Money Story',
        description:
          'Discover the childhood beliefs and family patterns that shape how you earn, spend, and save today.',
        lessons: 10,
        duration: '45 min',
        level: 'Beginner',
        tags: ['Psychology', 'Self-awareness'],
        isBestseller: true,
      },
      {
        id: 'scarcity-to-abundance',
        title: 'From Scarcity to Abundance',
        description:
          'Break free from the "there\'s never enough" mindset and start seeing real financial opportunities around you.',
        lessons: 8,
        duration: '35 min',
        level: 'Beginner',
        tags: ['Mindset', 'Psychology'],
      },
      {
        id: 'money-emotions',
        title: 'Your Money Emotions',
        description:
          'Why money makes us anxious, guilty, or ashamed — and how to build a calm, confident relationship with it instead.',
        lessons: 9,
        duration: '40 min',
        level: 'Beginner',
        tags: ['Emotional wellness', 'Psychology'],
        isNew: true,
      },
      {
        id: 'financial-identity',
        title: 'Building a Wealthy Identity',
        description:
          "You don't rise to your goals — you fall to your identity. Reframe who you are around money and watch your habits follow.",
        lessons: 7,
        duration: '30 min',
        level: 'Beginner',
        tags: ['Identity', 'Mindset'],
      },
      {
        id: 'money-archetypes',
        title: 'The 8 Money Archetypes',
        description:
          'Discover your dominant money archetype (Saver, Spender, Avoider, Amasser…) and learn to work with it.',
        lessons: 6,
        duration: '25 min',
        level: 'Beginner',
        tags: ['Self-awareness', 'Psychology'],
        isNew: true,
      },
      {
        id: 'fear-of-money',
        title: 'Overcoming Financial Fear',
        description:
          'Tackle the anxiety that stops you checking your bank balance, opening statements, or making financial decisions.',
        lessons: 8,
        duration: '35 min',
        level: 'Beginner',
        tags: ['Anxiety', 'Confidence'],
      },
      {
        id: 'self-worth-money',
        title: 'Self-Worth & Net Worth',
        description:
          'Your earning ceiling is often a reflection of your self-worth ceiling. Raise one, and the other follows.',
        lessons: 9,
        duration: '40 min',
        level: 'Intermediate',
        tags: ['Confidence', 'Self-worth'],
      },
    ],
  },
  {
    id: 'build-better-money-habits',
    title: 'Build Better Money Habits',
    subtitle: 'Small daily actions that compound into financial transformation',
    color: 'green',
    emoji: '🔄',
    courses: [
      {
        id: 'money-habits-system',
        title: 'The Money Habits System',
        description:
          'Design a personal financial system that runs itself — automated, sustainable, and built around your real life.',
        lessons: 18,
        duration: '75 min',
        level: 'Beginner',
        tags: ['Habits', 'Systems'],
        isBestseller: true,
      },
      {
        id: 'budgeting-real-life',
        title: 'Budgeting for Real Life',
        description:
          'A realistic, shame-free budgeting method that works for people with irregular income, big expenses, and busy lives.',
        lessons: 12,
        duration: '50 min',
        level: 'Beginner',
        tags: ['Budgeting', 'Planning'],
      },
      {
        id: 'track-spending',
        title: 'Master Your Spending',
        description:
          'A zero-judgment deep dive into where your money actually goes — and a simple system to redirect it where you want.',
        lessons: 8,
        duration: '35 min',
        level: 'Beginner',
        tags: ['Spending', 'Awareness'],
        isNew: true,
      },
      {
        id: 'saving-without-sacrifice',
        title: 'Saving Without Sacrifice',
        description:
          'Build real savings without feeling deprived. Learn the psychology of saving and make it automatic.',
        lessons: 10,
        duration: '42 min',
        level: 'Beginner',
        tags: ['Saving', 'Habits'],
      },
      {
        id: 'debt-free-mindset',
        title: 'The Debt-Free Mindset',
        description:
          'Change how you think about debt — and build the mental framework to get out and stay out without shame spirals.',
        lessons: 11,
        duration: '48 min',
        level: 'Intermediate',
        tags: ['Debt', 'Mindset'],
      },
      {
        id: 'financial-calendar',
        title: 'Your Financial Calendar',
        description:
          'A month-by-month system to stay on top of bills, goals, and reviews — so nothing falls through the cracks.',
        lessons: 6,
        duration: '25 min',
        level: 'Beginner',
        tags: ['Planning', 'Organisation'],
        isNew: true,
      },
    ],
  },
  {
    id: 'earn-more-keep-more',
    title: 'Earn More, Keep More',
    subtitle: 'Practical strategies to grow your income and keep more of what you earn',
    color: 'teal',
    emoji: '💼',
    courses: [
      {
        id: 'salary-negotiation',
        title: 'The Salary Negotiation Playbook',
        description:
          "Word-for-word scripts, strategies, and confidence-builders to earn what you're worth — whether in a new role or your current one.",
        lessons: 14,
        duration: '58 min',
        level: 'Intermediate',
        tags: ['Career', 'Negotiation'],
        isBestseller: true,
        isFeatured: true,
      },
      {
        id: 'value-at-work',
        title: 'Become Indispensable at Work',
        description:
          'The habits, skills, and visibility tactics that make you the person who always gets the raise, promotion, and opportunity.',
        lessons: 12,
        duration: '50 min',
        level: 'Intermediate',
        tags: ['Career', 'Value'],
      },
      {
        id: 'side-income-first-steps',
        title: 'Your First £500 of Extra Income',
        description:
          'The most realistic first step into extra income — no get-rich-quick, just proven starting points based on your existing skills.',
        lessons: 10,
        duration: '42 min',
        level: 'Beginner',
        tags: ['Side income', 'Practical'],
        isNew: true,
      },
      {
        id: 'freelance-foundations',
        title: 'Freelance Foundations',
        description:
          'How to turn your existing skills into freelance income — from setting rates to finding first clients.',
        lessons: 15,
        duration: '62 min',
        level: 'Beginner',
        tags: ['Freelance', 'Self-employment'],
      },
      {
        id: 'know-your-worth',
        title: 'Know Your Market Value',
        description:
          "Research your true market rate, benchmark your salary, and make sure you're never underpaid for long.",
        lessons: 7,
        duration: '28 min',
        level: 'Beginner',
        tags: ['Salary', 'Research'],
      },
      {
        id: 'promotion-roadmap',
        title: 'The Promotion Roadmap',
        description:
          'A step-by-step plan to position yourself for promotion — from demonstrating impact to having the conversation.',
        lessons: 11,
        duration: '46 min',
        level: 'Intermediate',
        tags: ['Career', 'Strategy'],
        isNew: true,
      },
    ],
  },
  {
    id: 'financial-foundations',
    title: 'Financial Foundations',
    subtitle: 'The knowledge and confidence to make smart decisions about your money',
    color: 'blue',
    emoji: '📚',
    courses: [
      {
        id: 'money-basics',
        title: 'Money 101: The Basics',
        description:
          'Everything the school system failed to teach you — income, expenses, net worth, interest, and the fundamentals of financial health.',
        lessons: 12,
        duration: '50 min',
        level: 'Beginner',
        tags: ['Fundamentals', 'Education'],
        isBestseller: true,
      },
      {
        id: 'financial-goals',
        title: 'Setting Real Financial Goals',
        description:
          'Move beyond vague wishes ("I want to save more") to specific, motivating goals with a real plan attached.',
        lessons: 8,
        duration: '33 min',
        level: 'Beginner',
        tags: ['Goals', 'Planning'],
      },
      {
        id: 'understanding-credit',
        title: 'Understanding Your Credit',
        description:
          'Demystify credit scores, reports, and history — and learn the habits that build a strong credit profile over time.',
        lessons: 9,
        duration: '38 min',
        level: 'Beginner',
        tags: ['Credit', 'Education'],
        isNew: true,
      },
      {
        id: 'big-financial-decisions',
        title: 'Big Financial Decisions',
        description:
          "A decision-making framework for life's major financial moments — rent vs. buy, career changes, big purchases.",
        lessons: 11,
        duration: '46 min',
        level: 'Intermediate',
        tags: ['Decision-making', 'Planning'],
      },
      {
        id: 'emergency-fund',
        title: 'Build Your Safety Net',
        description:
          'Why an emergency fund changes everything — and the fastest, most practical way to build one that actually sticks.',
        lessons: 6,
        duration: '24 min',
        level: 'Beginner',
        tags: ['Savings', 'Security'],
      },
      {
        id: 'financial-confidence',
        title: 'Financial Confidence for Life',
        description:
          'The capstone course. Everything you need to walk into any financial situation with clarity, confidence, and control.',
        lessons: 16,
        duration: '68 min',
        level: 'Intermediate',
        tags: ['Confidence', 'Comprehensive'],
        isFeatured: true,
      },
    ],
  },
]

export const FINDER = {
  steps: [
    {
      id: 'challenge',
      question: "What's your biggest financial challenge right now?",
      options: [
        { id: 'anxiety', label: 'I feel anxious or guilty about money', emoji: '😰' },
        { id: 'habits', label: 'My habits keep undermining my goals', emoji: '🔁' },
        { id: 'earn', label: 'I need to earn more than I do', emoji: '💼' },
        { id: 'knowledge', label: "I don't really understand money", emoji: '📚' },
      ],
    },
    {
      id: 'goal',
      question: 'What would success feel like for you?',
      options: [
        { id: 'confident', label: 'Feeling calm and confident about money', emoji: '😌' },
        { id: 'free', label: 'Having real financial breathing room', emoji: '🌬️' },
        { id: 'growth', label: 'Watching my wealth actually grow', emoji: '📈' },
        { id: 'control', label: 'Feeling in control of my future', emoji: '🎯' },
      ],
    },
    {
      id: 'style',
      question: 'How do you like to learn?',
      options: [
        { id: 'quick', label: 'Quick wins I can apply today', emoji: '⚡' },
        { id: 'deep', label: 'Deep understanding of why things work', emoji: '🔬' },
        { id: 'step', label: 'Step-by-step with clear structure', emoji: '🗺️' },
        { id: 'story', label: 'Through stories and real examples', emoji: '📖' },
      ],
    },
  ],
  results: [
    {
      id: 'mindset-first',
      title: 'Start with Your Money Mindset',
      description:
        'Before tactics, you need the right foundation. Your recommended path addresses the beliefs and emotions driving your financial habits.',
      path: 'Your Money Story',
      courses: ['money-story', 'scarcity-to-abundance', 'money-emotions'],
      emoji: '🧠',
      color: 'amber' as const,
    },
    {
      id: 'habits-system',
      title: 'Build Your Money Habits System',
      description:
        "You're ready for a practical system. Start with the habits that run automatically — no willpower required.",
      path: 'The Money Habits System',
      courses: ['money-habits-system', 'budgeting-real-life', 'saving-without-sacrifice'],
      emoji: '🔄',
      color: 'green' as const,
    },
    {
      id: 'earn-more',
      title: 'Focus on Earning More',
      description:
        'The fastest lever is income. Start with salary negotiation and your market value — high impact, low effort.',
      path: 'Earn More Masterclass',
      courses: ['salary-negotiation', 'know-your-worth', 'value-at-work'],
      emoji: '💼',
      color: 'teal' as const,
    },
    {
      id: 'foundations',
      title: 'Build Your Financial Foundations',
      description:
        'Clarity first. Understanding how money actually works is the biggest confidence booster you can get.',
      path: 'Financial Confidence Accelerator',
      courses: ['money-basics', 'financial-goals', 'financial-confidence'],
      emoji: '📚',
      color: 'blue' as const,
    },
  ],
}

export const FINDER_THEME = {
  amber: {
    bg: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.3)',
    text: '#D97706',
    badge: 'rgba(245,158,11,0.2)',
  },
  green: {
    bg: 'rgba(5,150,105,0.12)',
    border: 'rgba(5,150,105,0.3)',
    text: '#059669',
    badge: 'rgba(5,150,105,0.2)',
  },
  teal: {
    bg: 'rgba(13,148,136,0.12)',
    border: 'rgba(13,148,136,0.3)',
    text: '#0D9488',
    badge: 'rgba(13,148,136,0.2)',
  },
  blue: {
    bg: 'rgba(37,99,235,0.12)',
    border: 'rgba(37,99,235,0.3)',
    text: '#2563EB',
    badge: 'rgba(37,99,235,0.2)',
  },
} as const

export const LIBRARY_THEME = {
  amber: {
    header: 'linear-gradient(135deg, #92400e 0%, #D97706 100%)',
    badge: 'rgba(245,158,11,0.12)',
    badgeText: '#D97706',
    levelBg: 'rgba(245,158,11,0.08)',
    levelText: '#B45309',
  },
  green: {
    header: 'linear-gradient(135deg, #065F46 0%, #059669 100%)',
    badge: 'rgba(5,150,105,0.12)',
    badgeText: '#059669',
    levelBg: 'rgba(5,150,105,0.08)',
    levelText: '#047857',
  },
  teal: {
    header: 'linear-gradient(135deg, #134E4A 0%, #0D9488 100%)',
    badge: 'rgba(13,148,136,0.12)',
    badgeText: '#0D9488',
    levelBg: 'rgba(13,148,136,0.08)',
    levelText: '#0F766E',
  },
  blue: {
    header: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
    badge: 'rgba(37,99,235,0.12)',
    badgeText: '#2563EB',
    levelBg: 'rgba(37,99,235,0.08)',
    levelText: '#1D4ED8',
  },
} as const

export const LIBRARY_TABS = [
  { id: 'all', label: 'All Courses' },
  { id: 'confidence', label: '💪 Build Confidence' },
  { id: 'spending', label: '🛑 Stop Overspending' },
  { id: 'earn', label: '💼 Earn More' },
  { id: 'mindset', label: '🧠 Money Mindset' },
  { id: 'budgeting', label: '📊 Budgeting' },
  { id: 'freedom', label: '🗺️ Financial Freedom' },
] as const

export const TAB_TAGS: Record<string, string[]> = {
  confidence: ['Confidence', 'Self-worth', 'Anxiety', 'Psychology'],
  spending: ['Spending', 'Budgeting', 'Debt'],
  earn: ['Career', 'Negotiation', 'Salary', 'Freelance', 'Side income', 'Value'],
  mindset: ['Mindset', 'Psychology', 'Identity', 'Self-awareness'],
  budgeting: ['Budgeting', 'Planning', 'Organisation', 'Saving'],
  freedom: ['Goals', 'Planning', 'Comprehensive', 'Security'],
}

export const FW_TESTIMONIALS = [
  {
    quote:
      "I used to avoid opening my bank app for weeks. After the Your Money Story course I finally understood why — and it changed everything. I'm not 'fixed' but I'm facing it.",
    name: 'Priya T.',
    role: 'Nurse, 34',
    result: 'Paid off £3,200 of credit card debt in 8 months',
    emoji: '💳',
  },
  {
    quote:
      "The Salary Negotiation Playbook gave me actual scripts. I used them in my review and got a £6,000 pay rise. I'd been underpaid for three years and didn't know how to ask.",
    name: 'Marcus D.',
    role: 'Project Manager, 29',
    result: '£6,000 salary increase',
    emoji: '💼',
  },
  {
    quote:
      "I always thought budgeting meant deprivation. Budgeting for Real Life showed me it's actually the opposite — it's about spending guilt-free on what matters.",
    name: 'Sophie R.',
    role: 'Freelance Designer, 27',
    result: 'First £1,000 emergency fund built in 3 months',
    emoji: '✨',
  },
] as const

export const HOW_POINTS = [
  { icon: '⚡', text: '7–12 minute lessons — fits in a commute or lunch break' },
  { icon: '🎯', text: 'One action per lesson — you leave knowing exactly what to do' },
  { icon: '📈', text: 'AI tracks your progress and adjusts to your pace' },
  { icon: '💬', text: 'Community of learners at the same stage as you' },
] as const

export const LIBRARY_PREVIEW = 4
