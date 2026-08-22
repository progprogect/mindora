import { Star } from 'lucide-react'

const STATS = [
  { value: '100k+', label: 'Learners worldwide' },
  { value: '4.8★', label: 'Average rating' },
  { value: '93%', label: 'See results by day 7' },
]

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    initials: 'SM',
    role: 'Marketing Manager',
    color: 'bg-sw-blue',
    quote:
      'I went from zero AI knowledge to using it every single day at work. The 28-day structure made it completely manageable — even with two kids.',
  },
  {
    name: 'James K.',
    initials: 'JK',
    role: 'Freelance Designer',
    color: 'bg-teal-500',
    quote: 'I automated 3 hours of work a week using skills from just the first 7 days. I genuinely wish I\'d started sooner.',
  },
  {
    name: 'Priya R.',
    initials: 'PR',
    role: 'Career Changer',
    color: 'bg-purple-500',
    quote:
      'Got my AI certificate and landed a new role within 6 weeks of finishing. The personal plan made all the difference.',
  },
]

export default function SalesSocialProofScreen() {
  return (
    <div className="flex flex-1 flex-col gap-6 pt-4 pb-32 animate-fade-up">
      <div className="text-center">
        <h1 className="mb-2 text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
          Join 100,000+
          <br />
          AI Learners
        </h1>
        <p className="mt-2 text-sm text-sw-grey">People just like you who took the first step</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center rounded-2xl border border-sw-blue/20 bg-sw-blue-light p-3 text-center"
          >
            <span className="mb-1 text-xl font-extrabold leading-none text-sw-blue">{s.value}</span>
            <span className="text-xs font-medium leading-tight text-sw-grey">{s.label}</span>
          </div>
        ))}
      </div>

      <div>
        <p className="mb-4 text-center text-base font-extrabold text-sw-dark">What Our Learners Are Saying</p>
        <div className="flex flex-col gap-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-2xl border border-sw-border bg-sw-white p-5">
              <div className="mb-3 flex items-center gap-3">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-sw-white ${t.color}`}
                >
                  {t.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-none text-sw-dark">{t.name}</p>
                  <p className="text-xs text-sw-grey">{t.role}</p>
                </div>
                <div className="flex text-sw-amber">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-sw-dark">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
