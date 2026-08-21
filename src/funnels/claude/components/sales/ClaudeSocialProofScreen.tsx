import { useEffect } from 'react'

interface ClaudeSocialProofScreenProps {
  onContinue: () => void
}

interface Testimonial {
  name: string
  role: string
  text: string
  stars: number
  highlight: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'David L.',
    role: 'Marketing Director',
    text: "I was skeptical about another AI course, but this one actually taught me Claude-specific techniques I couldn't find anywhere else. Saved me 8 hours in my first week.",
    stars: 5,
    highlight: '8 hours saved in week 1',
  },
  {
    name: 'Emma R.',
    role: 'Freelance Writer',
    text: "The certification gave me credibility with clients. I now charge 40% more because I can offer 'AI-enhanced' services. Best investment I've made.",
    stars: 5,
    highlight: '40% higher rates',
  },
  {
    name: 'James T.',
    role: 'Software Engineer',
    text: 'I thought I knew Claude well. Turns out I was using maybe 20% of its capabilities. The advanced prompting module alone was worth it.',
    stars: 5,
    highlight: 'Unlocked 80% more capability',
  },
  {
    name: 'Aisha M.',
    role: 'HR Manager',
    text: 'Got my certification in 3 weeks doing 15 min/day. My boss noticed the difference in my work quality immediately. Got promoted 2 months later.',
    stars: 5,
    highlight: 'Promoted in 2 months',
  },
]

const STATS: Array<{ value: string; label: string }> = [
  { value: '4.9', label: 'Rating' },
  { value: '50K+', label: 'Certified' },
  { value: '93%', label: 'Recommend' },
]

/** Port of `ClaudeSocialProofScreen` (`ClaudeSocialProofScreen-BjuyRU6p.js`, sales-funnel variant). */
export default function ClaudeSocialProofScreen({ onContinue }: ClaudeSocialProofScreenProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-8 pb-44">
      <div className="mb-6 animate-fade-up text-center">
        <h1 className="mb-2 text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
          Join 50,000+ Claude
          <br />
          Certified Professionals
        </h1>
        <p className="text-sm text-sw-grey">Real results from real people</p>
      </div>

      <div className="mb-6 grid animate-fade-up grid-cols-3 gap-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-sw-blue-light p-3 text-center">
            <p className="text-xl font-extrabold text-sw-blue">{stat.value}</p>
            <p className="text-[10px] font-semibold text-sw-grey uppercase">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex animate-fade-up flex-col gap-4">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="rounded-2xl border border-sw-border p-5">
            <div className="mb-2 flex gap-0.5 text-sw-amber">
              {Array.from({ length: t.stars }).map((_, i) => (
                <span key={i} className="text-sm">
                  ★
                </span>
              ))}
            </div>
            <div className="mb-2 inline-block rounded-full bg-sw-success-light px-2.5 py-1 text-[10px] font-bold tracking-wide text-sw-success uppercase">
              {t.highlight}
            </div>
            <p className="mb-3 text-sm leading-relaxed text-sw-dark">{t.text}</p>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-sw-blue/10">
                <span className="text-xs font-bold text-sw-blue">{t.name[0]}</span>
              </div>
              <div>
                <p className="text-xs font-bold text-sw-dark">{t.name}</p>
                <p className="text-[10px] text-sw-grey">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="fixed inset-x-0 bottom-0 z-50 px-4 pt-10"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.92) 40%, white 65%)' }}
      >
        <div className="mx-auto max-w-lg">
          <button
            type="button"
            onClick={onContinue}
            className="w-full rounded-full bg-sw-blue py-4 text-base font-bold text-sw-white shadow-lg transition-all duration-150 hover:bg-sw-blue-hover active:scale-[0.98]"
          >
            Continue →
          </button>
        </div>
        <div style={{ paddingTop: '56px', paddingBottom: 'env(safe-area-inset-bottom)' }} />
      </div>
    </div>
  )
}
