import { PROBLEM_STATS } from '@/marketing/data/home'

export default function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-sw-dark py-24 sm:py-36">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <svg className="h-full w-full">
          <defs>
            <pattern id="pgrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <line x1="40" y1="0" x2="0" y2="0" stroke="white" strokeWidth="0.5" />
              <line x1="0" y1="0" x2="0" y2="40" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pgrid)" />
        </svg>
      </div>
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sw-blue/[0.08] blur-3xl" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <div className="mb-8 space-y-3">
          <p className="text-2xl leading-tight font-bold text-white/50 sm:text-3xl lg:text-4xl">
            You&apos;ve read the <span className="emoji-wiggle inline-block">📚</span> books.
          </p>
          <p className="text-2xl leading-tight font-bold text-white/50 sm:text-3xl lg:text-4xl">
            Watched the <span className="emoji-bounce inline-block">🎬</span> videos.
          </p>
          <p className="text-2xl leading-tight font-bold text-white/50 sm:text-3xl lg:text-4xl">
            Started the <span className="emoji-float inline-block">📝</span> courses.
          </p>
        </div>
        <h2 className="mb-6 text-3xl leading-tight font-extrabold text-white sm:text-4xl lg:text-5xl">
          And yet — nothing changed.
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/50 sm:text-xl">
          It&apos;s not a knowledge problem. It&apos;s a <span className="font-semibold text-white">system</span>{' '}
          problem.
          <br className="hidden sm:block" />
          Without a daily framework to act on what you learn, knowledge just piles up.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {PROBLEM_STATS.map((stat) => (
            <div
              key={stat.value}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left"
            >
              <span className="emoji-float text-xl" aria-hidden="true">
                {stat.emoji}
              </span>
              <span className="text-2xl font-extrabold whitespace-nowrap text-sw-blue tabular-nums">{stat.value}</span>
              <span className="text-sm leading-snug text-white/40">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-14 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3">
          <div className="h-2 w-2 animate-pulse rounded-full bg-sw-blue" />
          <p className="text-sm font-medium text-white/70">
            SuccessWise gives you the system to finally act on what you learn.
          </p>
        </div>
      </div>
    </section>
  )
}
