import type { SaProfile } from '@/funnels/success-assessment/lib/scoring'

export function SaRoadmapScreen({ profile }: { profile: SaProfile }) {
  return (
    <div className="px-4 pt-8 pb-40 animate-fade-up">
      <h1 className="mb-2 text-center text-3xl leading-tight font-extrabold text-sw-dark">
        Your Roadmap
        <br />
        is Ready
      </h1>
      <p className="mb-6 text-center text-sm text-sw-grey">
        Designed to help you reach your full potential — starting today.
      </p>
      <div
        className="mb-5 rounded-2xl p-5 text-white"
        style={{ background: 'linear-gradient(135deg, hsl(var(--sw-blue)) 0%, hsl(221 83% 38%) 100%)' }}
      >
        <p className="text-xs font-bold tracking-wide text-white/70 uppercase">🚀 Built for</p>
        <p className="text-xl font-extrabold">{profile.archetype}</p>
      </div>
      <div className="mb-6 flex flex-col gap-2 text-sm font-semibold text-sw-dark">
        <p>🎯 Personalised to your success profile</p>
        <p>⚡ Start seeing results in your first week</p>
        <p>🔓 Learn at your own pace, on your terms</p>
      </div>
      <h2 className="mb-3 text-lg font-extrabold text-sw-dark">With SuccessWise, you will:</h2>
      <ul className="flex flex-col gap-3 text-sm leading-relaxed text-sw-grey">
        <li>Follow a personalised daily roadmap built around your exact goals, strengths, and gaps</li>
        <li>Track your progress across 6 success dimensions so you always know where you stand and what to do next</li>
        <li>Learn from world-class content curated to match your archetype — no fluff, no wasted time</li>
        <li>Get coached by AI on your goals every day, at your own pace, on your schedule</li>
        <li>Build real momentum with proven micro-habits that compound into lasting results</li>
        <li>…and much more!</li>
      </ul>
    </div>
  )
}

export function SaTransformationScreen({
  profile,
  plus90,
  rewardLine,
  struggle,
}: {
  profile: SaProfile
  plus90: string
  rewardLine: string
  struggle: { without: string[]; with: string[]; kicker: string }
}) {
  return (
    <div className="px-4 pt-8 pb-40 animate-fade-up">
      <h1 className="mb-2 text-center text-3xl leading-tight font-extrabold text-sw-dark">
        Your Success
        <br />
        Transformation
      </h1>
      <p className="mb-4 text-center text-sm text-sw-grey">{struggle.kicker}</p>
      <p className="mb-5 text-center text-sm font-semibold text-sw-dark">Life looking different by {plus90}</p>
      <div className="mb-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-sw-grey-light p-4">
          <p className="mb-1 text-2xl">😟</p>
          <p className="text-xs font-bold tracking-wide text-sw-grey uppercase">Without</p>
          <p className="mb-2 text-sm font-extrabold text-sw-dark">SuccessWise.ai</p>
          <p className="mb-1 text-[10px] font-bold tracking-wide text-sw-grey uppercase">Struggles:</p>
          <ul className="flex flex-col gap-1 text-xs text-sw-grey">
            {struggle.without.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-sw-blue-light p-4">
          <p className="mb-1 text-2xl">😊</p>
          <p className="text-xs font-bold tracking-wide text-sw-blue uppercase">With</p>
          <p className="mb-2 text-sm font-extrabold text-sw-dark">SuccessWise.ai</p>
          <p className="mb-1 text-[10px] font-bold tracking-wide text-sw-blue uppercase">Solutions:</p>
          <ul className="flex flex-col gap-1 text-xs text-sw-dark">
            {struggle.with.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mb-4 text-center text-sm font-semibold text-sw-dark">Promoted &amp; earning more ✓</p>
      <p className="mb-5 text-center text-sm text-sw-grey">
        Your ambition got you here — SuccessWise gives it structure and direction.
      </p>
      <div className="mb-4 rounded-2xl border border-sw-grey-border p-4">
        <p className="text-xs font-bold tracking-wide text-sw-grey uppercase">🚀 Your success profile</p>
        <p className="text-lg font-extrabold text-sw-dark">{profile.archetype}</p>
        <p className="mt-1 text-sm text-sw-grey">{profile.quote}</p>
      </div>
      <p className="text-center text-sm font-semibold text-sw-dark">{rewardLine}</p>
    </div>
  )
}

export function SaSocialScreen() {
  const stories = [
    {
      initials: 'ET',
      name: 'Emma T.',
      role: 'Marketing Director',
      quote:
        "I'd been stuck at the same level for 3 years. Within 6 weeks of following my Success Plan I got the promotion I'd been chasing. The personalised roadmap made all the difference.",
    },
    {
      initials: 'ML',
      name: 'Marcus L.',
      role: 'Entrepreneur',
      quote:
        'My business had stalled for 18 months. SuccessWise helped me identify exactly where the gaps were. Revenue is up 40% and I actually feel in control now.',
    },
    {
      initials: 'SK',
      name: 'Sophie K.',
      role: 'Career Changer',
      quote:
        'I always knew I was capable of more but had no clear plan. My Success Profile showed me exactly what to work on. 90 days later I landed my dream role.',
    },
  ]

  return (
    <div className="px-4 pt-8 pb-40 animate-fade-up">
      <h1 className="mb-2 text-center text-3xl leading-tight font-extrabold text-sw-dark">
        Join 500,000+
        <br />
        High Achievers
      </h1>
      <p className="mb-6 text-center text-sm text-sw-grey">People just like you who took the first step</p>
      <div className="mb-6 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-2xl bg-sw-grey-light px-2 py-3">
          <p className="text-lg font-extrabold text-sw-dark">500k+</p>
          <p className="text-[10px] font-semibold text-sw-grey">High achievers worldwide</p>
        </div>
        <div className="rounded-2xl bg-sw-grey-light px-2 py-3">
          <p className="text-lg font-extrabold text-sw-dark">4.8★</p>
          <p className="text-[10px] font-semibold text-sw-grey">Average rating</p>
        </div>
        <div className="rounded-2xl bg-sw-grey-light px-2 py-3">
          <p className="text-lg font-extrabold text-sw-dark">93%</p>
          <p className="text-[10px] font-semibold text-sw-grey">Report clarity in week 1</p>
        </div>
      </div>
      <h2 className="mb-4 text-center text-lg font-extrabold text-sw-dark">What Our Members Are Saying</h2>
      <div className="flex flex-col gap-3">
        {stories.map((s) => (
          <div key={s.name} className="rounded-2xl border border-sw-grey-border p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-full bg-sw-blue text-xs font-bold text-white">
                {s.initials}
              </div>
              <div>
                <p className="text-sm font-bold text-sw-dark">{s.name}</p>
                <p className="text-xs text-sw-grey">{s.role}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-sw-grey">&ldquo;{s.quote}&rdquo;</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2 text-center">
        {['Results Guaranteed', 'No Credit Card Required', 'Cancel Anytime'].map((label) => (
          <p key={label} className="text-[10px] font-semibold leading-snug text-sw-grey">
            {label}
          </p>
        ))}
      </div>
    </div>
  )
}
