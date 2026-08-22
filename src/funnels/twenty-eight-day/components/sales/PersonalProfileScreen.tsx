import type { QuizAnswers, QuizProfile, QuizRole } from '@/funnels/twenty-eight-day/types/quiz'
import AIScoreCard from '@/funnels/twenty-eight-day/components/AIScoreCard'

interface PersonalProfileScreenProps {
  profile: QuizProfile
  role?: QuizRole | null
  name: string | null
  answers?: QuizAnswers
}

export default function PersonalProfileScreen({ profile, name }: PersonalProfileScreenProps) {
  return (
    <div className="flex w-full flex-1 flex-col px-4 pt-8 pb-44 animate-fade-up">
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sw-blue-border bg-sw-blue-light px-4 py-1.5">
          <span className="text-xs font-bold tracking-wide text-sw-blue uppercase">
            {name ? `${name}'s AI Profile` : 'Your AI Profile'}
          </span>
        </div>
        <h1 className="mb-2 text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
          {name ? `${name}, here's your personal plan` : 'Your Personal AI Summary'}
        </h1>
        <p className="text-sm text-sw-grey">Based on your answers, we&apos;ve built your custom 28-day roadmap</p>
      </div>

      <AIScoreCard profile={profile} />

      <div className="mb-4 w-full rounded-2xl border-2 border-sw-grey-border bg-white p-6">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-sw-blue-light text-2xl">
            {profile.archetypeEmoji}
          </div>
          <div>
            <p className="text-xs font-bold tracking-wide text-sw-grey uppercase">Your AI Archetype</p>
            <h2 className="text-lg leading-tight font-extrabold text-sw-dark">{profile.archetype}</h2>
            <p className="text-xs font-semibold text-sw-blue">{profile.archetypeFocus}</p>
          </div>
        </div>
        <p className="mb-4 text-sm leading-snug font-semibold text-sw-dark italic">&ldquo;{profile.insight}&rdquo;</p>
        {profile.stats.length > 0 ? (
          <div className="divide-y divide-sw-grey-border">
            {profile.stats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between py-3">
                <span className="text-xs font-bold tracking-wide text-sw-blue uppercase">{stat.label}</span>
                <span className="max-w-[55%] text-right text-sm font-semibold text-sw-dark">{stat.value}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
