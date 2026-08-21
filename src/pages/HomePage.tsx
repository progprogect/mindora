import { Link } from 'react-router-dom'
import { ArrowRight, Brain, Sparkles } from 'lucide-react'

const QUIZZES = [
  {
    title: '28-Day AI Challenge',
    description: 'Discover your AI profile in 2 minutes and get a personalised 28-day learning plan.',
    href: '/quiz/28-day-ai-challenge',
    icon: Brain,
  },
  {
    title: 'Claude AI Certification',
    description: 'Find your Claude skill level and unlock a tailored certification path.',
    href: '/quiz/claude-ai-certification',
    icon: Sparkles,
  },
] as const

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-10 px-6 py-16">
      <header className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-sw-dark sm:text-4xl">SuccessWise</h1>
        <p className="mt-3 text-base text-sw-grey">
          Choose a quiz to get your personalised AI learning path.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        {QUIZZES.map(({ title, description, href, icon: Icon }) => (
          <Link
            key={href}
            to={href}
            className="group flex items-start gap-4 rounded-sw border border-sw-border bg-sw-white p-5 shadow-sm transition hover:border-sw-blue hover:shadow-md"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-sw-sm bg-sw-blue-light">
              <Icon className="size-6 text-sw-blue" />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-lg font-bold text-sw-dark group-hover:text-sw-blue">{title}</span>
              <span className="text-sm text-sw-grey">{description}</span>
            </div>
            <ArrowRight className="mt-1 size-5 shrink-0 text-sw-grey transition group-hover:translate-x-0.5 group-hover:text-sw-blue" />
          </Link>
        ))}
      </div>
    </div>
  )
}
