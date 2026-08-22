import type { QuizAnswers, QuizProfile } from '@/funnels/twenty-eight-day/types/quiz'

interface SalesBenefitsScreenProps {
  profile: QuizProfile
  answers: QuizAnswers
}

const GOAL_PHRASE: Record<string, string> = {
  'grow-role': 'get promoted and earn more',
  'switch-career': 'switch careers and stand out',
  'side-income': 'build a profitable AI side business',
  creative: 'multiply your creative output with AI',
  'stay-current': 'stay 10 steps ahead as AI reshapes every industry',
  other: 'discover what AI can do for you',
}

const BUILT_FOR = [
  { icon: '✅', text: 'No prior AI knowledge required' },
  { icon: '📈', text: 'No university degree needed' },
  { icon: '💡', text: 'Work at your own pace, on your terms' },
]

const BENEFITS = [
  { bold: 'Master the AI tools', rest: ' everyone is talking about — ChatGPT, Gemini, Midjourney & more' },
  { bold: 'Build practical, real-world AI skills', rest: ' you can use from day one' },
  { bold: 'Earn an AI Certificate', rest: ' and stand out from people who still struggle with AI' },
  { bold: 'Unlock 1,000+ proven AI prompts', rest: ' for productivity, business, and creativity' },
  { bold: 'Track your progress', rest: ' and build unstoppable confidence with every lesson' },
]

export default function SalesBenefitsScreen({ profile, answers }: SalesBenefitsScreenProps) {
  const goalPhrase = GOAL_PHRASE[answers['q2-goal']] ?? 'unlock your AI potential'

  return (
    <div className="flex flex-1 flex-col gap-6 pt-4 pb-32 animate-fade-up">
      <div className="text-center">
        <h1 className="mb-2 text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
          AI is Easier
          <br />
          Than You Think
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-sw-grey">
          Designed to help you <span className="font-bold text-sw-dark">{goalPhrase}</span> — starting day one.
        </p>
      </div>

      <div
        className="rounded-2xl px-6 py-8 text-sw-white shadow-sw-card"
        style={{ background: 'linear-gradient(135deg, hsl(var(--sw-blue)) 0%, hsl(221 83% 38%) 100%)' }}
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-white/20 text-3xl">
            {profile.archetypeEmoji}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-white/70">Built for</p>
            <p className="text-lg font-extrabold leading-tight">{profile.archetype}</p>
          </div>
        </div>
        <ul className="flex flex-col gap-3">
          {BUILT_FOR.map((item) => (
            <li key={item.text} className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3">
              <span className="text-xl" aria-hidden>
                {item.icon}
              </span>
              <span className="text-sm font-semibold leading-snug">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-extrabold text-sw-dark">With the 28-Day AI Challenge, you will:</h2>
        <ul className="flex flex-col gap-4">
          {BENEFITS.map((item) => (
            <li key={item.bold} className="flex items-start gap-4">
              <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-sw-blue">
                <div className="size-3 rounded-full bg-sw-blue" />
              </div>
              <p className="text-sm leading-snug text-sw-dark">
                <span className="font-bold">{item.bold}</span>
                {item.rest}
              </p>
            </li>
          ))}
          <li className="flex items-start gap-4">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-sw-border">
              <div className="size-3 rounded-full bg-sw-border" />
            </div>
            <p className="text-sm font-medium leading-snug text-sw-grey">…and much more!</p>
          </li>
        </ul>
      </div>

    </div>
  )
}
