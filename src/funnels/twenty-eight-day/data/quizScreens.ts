import type { AIToolsQuestionScreen, QuestionScreen, QuizScreenDef } from '@/funnels/twenty-eight-day/types/quiz'

/**
 * 1:1 port of the production 28-Day AI Challenge quiz flow, copy captured
 * live from https://www.successwise.ai/quiz/28-day-ai-challenge via Chrome
 * DevTools MCP (see docs/28_day_quiz/implementation-plan.md). Scoring
 * weights (0-10 per option) are original — the production weighting isn't
 * observable from the client and had to be reconstructed to match the
 * described score bands (AI Newcomer/Aware/Ready/Native).
 */
export const quizScreens: QuizScreenDef[] = [
  {
    type: 'identity',
    id: 'identity',
    title: '28-Day AI Challenge',
    subtitle: 'Get Your AI Certification',
    question: 'What best describes you?',
    trustLine: '✓ 2 minutes to complete  ·  ✓ Instant results',
    options: [
      {
        id: 'employee',
        role: 'employee',
        label: 'I work for a company',
        emoji: '💼',
        photo: '/assets/identity-employee.png',
        variant: 'photo',
        weight: 4,
      },
      {
        id: 'business-owner',
        role: 'business-owner',
        label: "I'm building my own business",
        emoji: '🚀',
        photo: '/assets/identity-business-owner.png',
        variant: 'photo',
        weight: 6,
      },
      {
        id: 'personal',
        role: 'personal',
        label: "I'm exploring this for myself",
        emoji: '🌱',
        variant: 'text',
        weight: 3,
      },
    ],
  },
  {
    type: 'social-proof',
    id: 'social-proof-1',
    title: "You're in good company",
    subtitle: 'Over 500,000 professionals have used SuccessWise to stay ahead of AI',
    avatars: ['S', 'A', 'M', 'J', 'R'],
    avatarsCaption: 'Joined this week',
    tagline: "Let's build your personal plan — it takes 2 minutes",
    stat: '4.9 / 5 from 12,400+ learners',
    ctaLabel: 'GET STARTED →',
  },
  {
    type: 'question',
    id: 'q1-age',
    step: 1,
    question: 'How old are you?',
    options: [
      { id: 'under-25', label: 'Under 25', weight: 6 },
      { id: '25-34', label: '25 – 34', weight: 8 },
      { id: '35-44', label: '35 – 44', weight: 7 },
      { id: '45-54', label: '45 – 54', weight: 5 },
      { id: '55-plus', label: '55+', weight: 4 },
    ],
  },
  {
    type: 'question',
    id: 'q2-goal',
    step: 2,
    question: "What's your main goal with AI?",
    options: [
      { id: 'grow-role', label: 'Grow in my current role', emoji: '📈', weight: 7 },
      { id: 'switch-careers', label: 'Switch careers or get promoted', emoji: '🔄', weight: 7 },
      { id: 'build-income', label: 'Build a business or side income', emoji: '💰', weight: 8 },
      { id: 'creative', label: 'Use AI for creative projects', emoji: '🎨', weight: 6 },
      { id: 'stay-informed', label: 'Stay informed and not get left behind', emoji: '🛡️', weight: 5 },
      { id: 'something-else', label: 'Something else', emoji: '✳️', weight: 5 },
    ],
  },
  {
    type: 'question',
    id: 'q3-field',
    step: 3,
    question: 'What field do you work in?',
    options: [
      { id: 'tech', label: 'Tech & Software', emoji: '💻', weight: 8 },
      { id: 'finance', label: 'Finance & Accounting', emoji: '💳', weight: 7 },
      { id: 'marketing', label: 'Marketing & Media', emoji: '📣', weight: 7 },
      { id: 'healthcare', label: 'Healthcare', emoji: '🏥', weight: 6 },
      { id: 'education', label: 'Education', emoji: '📚', weight: 6 },
      { id: 'sales', label: 'Sales & Business Dev', emoji: '📊', weight: 7 },
      { id: 'operations', label: 'Operations & Management', emoji: '⚙️', weight: 6 },
      { id: 'other-field', label: 'Other', emoji: '🌐', weight: 5 },
    ],
  },
  {
    type: 'question',
    id: 'q4-feeling',
    step: 4,
    question: 'When you see AI news, how do you feel?',
    options: [
      { id: 'excited', label: 'Excited — I follow it closely', emoji: '🔥', weight: 10 },
      { id: 'curious-lost', label: 'Curious but a bit lost', emoji: '🤔', weight: 6 },
      { id: 'overwhelmed', label: 'Honestly, overwhelmed', emoji: '😰', weight: 3, echo: 'overwhelmed' },
      { id: 'avoid', label: "I try not to think about it", emoji: '😬', weight: 2, echo: 'avoidant' },
    ],
  },
  {
    type: 'question',
    id: 'q5-comfort',
    step: 5,
    question: 'How comfortable are you with AI tools right now?',
    options: [
      { id: 'very-comfortable', label: 'Very comfortable', emoji: '💪', weight: 10 },
      { id: 'manage-struggle', label: 'I manage, but struggle sometimes', emoji: '🙂', weight: 6 },
      { id: 'struggle-lot', label: 'I struggle a lot', emoji: '😅', weight: 3, echo: 'overwhelmed' },
      { id: 'barely-tried', label: "I've barely tried any", emoji: '👀', weight: 2, echo: 'avoidant' },
    ],
  },
  {
    type: 'interstitial',
    id: 'interstitial-1',
    afterStep: 5,
    emoji: '✨',
    defaultHeadline: "It's completely normal to feel overwhelmed by AI",
    stat: '📊 87% of SuccessWise learners felt confident using AI within their first week',
    body: "Most people feel exactly the same way. The key isn't knowing everything — it's having a simple, structured plan. That's exactly what we're building for you.",
    ctaLabel: 'KEEP GOING →',
    echoVariants: {
      avoidant: {
        headline: "It's OK to be skeptical about AI",
        body: "You don't need to trust the hype — you just need one small, practical win. That's exactly what your first 7 days are designed for.",
      },
    },
  },
  {
    type: 'question',
    id: 'q6-worried',
    step: 6,
    question: 'How worried are you about AI affecting your job or income?',
    options: [
      { id: 'very-worried', label: 'Very worried', emoji: '😱', weight: 5, echo: 'overwhelmed' },
      { id: 'somewhat-worried', label: 'Somewhat worried', emoji: '😟', weight: 6 },
      { id: 'a-little', label: 'A little', emoji: '🤷', weight: 7 },
      { id: 'opportunity', label: 'Not at all — I see it as an opportunity', emoji: '🚀', weight: 10 },
    ],
  },
  {
    type: 'question',
    id: 'q7-experience',
    step: 7,
    question: 'What best describes your experience with AI so far?',
    options: [
      { id: 'complete-beginner', label: 'Complete beginner', emoji: '🌱', weight: 3, echo: 'avoidant' },
      { id: 'tried-few', label: 'Tried a few tools', emoji: '🔍', weight: 6 },
      { id: 'use-regularly', label: 'Use AI regularly', emoji: '⚡', weight: 9 },
      { id: 'build-workflows', label: 'I build AI workflows', emoji: '🛠️', weight: 10 },
    ],
  },
  {
    type: 'ai-tools',
    id: 'q8-ai-tools',
    step: 8,
    question: 'Which AI tool are you most familiar with?',
    options: [
      { id: 'new', label: "I'm new to AI tools", icon: 'new', emoji: '🤔', weight: 2, echo: 'avoidant' },
      { id: 'chatgpt', label: 'ChatGPT', icon: 'chatgpt', weight: 8 },
      { id: 'claude', label: 'Claude AI', icon: 'claude', weight: 8 },
      { id: 'gemini', label: 'Google Gemini', icon: 'gemini', weight: 7 },
      { id: 'copilot', label: 'Microsoft Copilot', icon: 'copilot', weight: 7 },
      { id: 'midjourney', label: 'Midjourney', icon: 'midjourney', weight: 6 },
      { id: 'perplexity', label: 'Perplexity AI', icon: 'perplexity', weight: 6 },
    ],
  },
  {
    type: 'question',
    id: 'q9-blocker',
    step: 9,
    question: "What's the #1 thing holding you back?",
    options: [
      { id: 'no-system', label: 'No clear system or plan', emoji: '🗺️', weight: 5, echo: 'overwhelmed' },
      { id: 'no-time', label: 'Not enough time', emoji: '⏰', weight: 5, echo: 'overwhelmed' },
      { id: 'too-complicated', label: 'It feels too complicated', emoji: '😵', weight: 4, echo: 'overwhelmed' },
      { id: 'dont-know-start', label: "I don't know where to start", emoji: '🤷', weight: 4, echo: 'avoidant' },
    ],
  },
  {
    type: 'question',
    id: 'q10-status',
    step: 10,
    question: 'Which best describes where you are right now?',
    options: [
      { id: 'student', label: 'Student or just starting out', emoji: '🎓', weight: 6 },
      { id: 'building-career', label: 'In a role, building my career', emoji: '💼', weight: 7 },
      { id: 'manager', label: 'Manager or team leader', emoji: '👥', weight: 7 },
      { id: 'own-business', label: 'Running my own business', emoji: '🏢', weight: 8 },
      { id: 'transitioning', label: 'Taking a step back or transitioning', emoji: '🌀', weight: 5 },
    ],
  },
  {
    type: 'question',
    id: 'q11-first-help',
    step: 11,
    question: 'What do you want AI to help you with first?',
    options: [
      { id: 'writing', label: 'Writing & communication', emoji: '✍️', weight: 7 },
      { id: 'data-research', label: 'Data & research', emoji: '📊', weight: 7 },
      { id: 'images-creative', label: 'Images & creative work', emoji: '🎨', weight: 7 },
      { id: 'automating', label: 'Automating tasks', emoji: '⚙️', weight: 9 },
      { id: 'learning-faster', label: 'Learning faster and smarter', emoji: '🧠', weight: 8 },
    ],
  },
  {
    type: 'question',
    id: 'q12-concern',
    step: 12,
    question: 'When you think about AI and your future, what concerns you most?',
    options: [
      { id: 'colleagues-ahead', label: 'My colleagues pulling ahead of me', emoji: '🏃', weight: 6, echo: 'overwhelmed' },
      { id: 'role-automated', label: 'My role being automated', emoji: '🤖', weight: 5, echo: 'overwhelmed' },
      { id: 'skills-gap', label: 'Not having the skills that matter', emoji: '📉', weight: 5, echo: 'avoidant' },
      { id: 'advantage', label: 'Nothing — I see it as my advantage', emoji: '💡', weight: 10 },
    ],
  },
  {
    type: 'interstitial',
    id: 'interstitial-2',
    afterStep: 12,
    emoji: '🎓',
    defaultHeadline: 'The window is open — but not forever',
    quote: "AI won't replace humans. But humans who use AI will replace humans who don't.",
    author: 'McKinsey Global Institute',
    body: 'Companies are already hiring based on AI fluency. The 28-Day AI Challenge is designed to make you that person — fast.',
    ctaLabel: 'CONTINUE →',
  },
  {
    type: 'question',
    id: 'q13-tried-learning',
    step: 13,
    question: 'Have you tried learning AI before?',
    options: [
      { id: 'first-time', label: 'No — this is my first time', emoji: '🆕', weight: 4, echo: 'avoidant' },
      { id: 'youtube-blogs', label: 'Yes, free YouTube / blogs', emoji: '📺', weight: 6 },
      { id: 'paid-course', label: 'Yes, a paid course', emoji: '💳', weight: 7 },
      { id: 'want-structure', label: 'I use AI but want proper structure', emoji: '🔧', weight: 8 },
    ],
  },
  {
    type: 'question',
    id: 'q14-online-learning',
    step: 14,
    question: 'Are you comfortable learning new skills online?',
    options: [
      { id: 'learn-online-always', label: 'Yes, I learn online all the time', emoji: '✅', weight: 9 },
      { id: 'open-to-it', label: "I'm open to it", emoji: '🤔', weight: 7 },
      { id: 'prefer-hands-on', label: 'Not really — I prefer hands-on', emoji: '🙈', weight: 5 },
    ],
  },
  {
    type: 'question',
    id: 'q15-first-week-result',
    step: 15,
    question: 'What result do you want in your first 7 days?',
    options: [
      { id: 'first-prompt', label: 'Write my first AI prompt', emoji: '💬', weight: 5 },
      { id: 'automate-task', label: 'Automate a task at work', emoji: '⚙️', weight: 8 },
      { id: 'create-content', label: 'Create content with AI', emoji: '✍️', weight: 7 },
      { id: 'side-project', label: 'Start an AI side project', emoji: '💡', weight: 8 },
    ],
  },
  {
    type: 'question',
    id: 'q16-income',
    step: 16,
    question: 'How much extra income would make a real difference in your life?',
    options: [
      { id: '500', label: '$500 / month', emoji: '🪙', weight: 5 },
      { id: '1000-2000', label: '$1,000 – $2,000 / month', emoji: '💵', weight: 7 },
      { id: '3000-5000', label: '$3,000 – $5,000 / month', emoji: '💰', weight: 8 },
      { id: '5000-plus', label: '$5,000+ / month', emoji: '💎', weight: 9 },
      { id: 'no-need', label: "I don't need extra income", emoji: '😎', weight: 6 },
    ],
  },
  {
    type: 'question',
    id: 'q17-daily-time',
    step: 17,
    question: 'How much time can you commit each day?',
    subtitle: 'Be honest — consistency beats intensity every time',
    options: [
      { id: '10min', label: '10 min / day', emoji: '⏱️', weight: 5 },
      { id: '15min', label: '15 min / day', emoji: '⏱️', weight: 7 },
      { id: '20min', label: '20 min / day', emoji: '⏱️', weight: 8 },
      { id: '30plus-min', label: '30+ min / day', emoji: '⏱️', weight: 10 },
    ],
  },
  {
    type: 'question',
    id: 'q18-reward',
    step: 18,
    question: "When you've completed the 28-Day Challenge, what will you treat yourself to?",
    subtitle: 'Research shows setting a reward triples follow-through',
    options: [
      { id: 'vacation', label: 'Plan a vacation', emoji: '✈️', weight: 8 },
      { id: 'dinner', label: 'A nice dinner out', emoji: '🍽️', weight: 7 },
      { id: 'tech-gear', label: 'New tech or gear', emoji: '💻', weight: 8 },
      { id: 'savings', label: 'Put it towards savings', emoji: '💰', weight: 8 },
      { id: 'family', label: 'Something for the family', emoji: '👨\u200d👩\u200d👧', weight: 7 },
      { id: 'reward-other', label: 'Other', emoji: '✳️', weight: 6 },
    ],
  },
  {
    type: 'interstitial',
    id: 'interstitial-3',
    afterStep: 18,
    emoji: '✨',
    defaultHeadline: "You're already making progress!",
    body: 'Studies show that people who set clear goals and a reward are 3× more likely to finish what they start. Your plan is being built around your answers right now.',
    ctaLabel: 'SEE MY PLAN →',
  },
  {
    type: 'loading',
    id: 'loading',
  },
  {
    type: 'email',
    id: 'email',
    title: 'Enter your email to get your',
    subtitle: 'Personal AI Plan!',
  },
  {
    type: 'name-capture',
    id: 'name-capture',
    title: 'What should we call you?',
    subtitle: "We'll use this to personalize your plan.",
  },
]

export function getScreenById(id: string): QuizScreenDef | undefined {
  return quizScreens.find((screen) => screen.id === id)
}

export function getQuestionScreens(): Array<QuestionScreen | AIToolsQuestionScreen> {
  return quizScreens.filter(
    (s): s is QuestionScreen | AIToolsQuestionScreen => s.type === 'question' || s.type === 'ai-tools',
  )
}
