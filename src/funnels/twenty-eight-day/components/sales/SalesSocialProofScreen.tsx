import { ShieldCheck, Star } from 'lucide-react'

interface SalesSocialProofScreenProps {
  onContinue: () => void
}

const TESTIMONIALS = [
  {
    name: 'Maria T.',
    role: 'Marketing Manager',
    quote: 'I automated my weekly reporting in 3 days and got 5 hours back every week. Wish I\u2019d started sooner.',
  },
  {
    name: 'Diego M.',
    role: 'Small Business Owner',
    quote: 'The daily steps made it actually stick. First program like this that didn\u2019t feel overwhelming.',
  },
  {
    name: 'Priya K.',
    role: 'Product Designer',
    quote: 'My AI-readiness score went from 34 to 81 in a month. I finally feel ahead instead of behind.',
  },
]

const TRUST_BADGES = ['Money-back guarantee', 'Cancel anytime', 'Secure checkout']

export default function SalesSocialProofScreen({ onContinue }: SalesSocialProofScreenProps) {
  return (
    <div className="flex flex-1 flex-col gap-6 py-4 animate-fade-up">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-sw-dark">Join 40,000+ members</h1>
        <p className="mt-2 text-sm text-sw-grey">Real results from people who started exactly where you are.</p>
      </div>

      <div className="flex flex-col gap-3">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="rounded-sw border border-sw-border bg-sw-white p-4 shadow-sw-card">
            <div className="mb-2 flex text-sw-amber">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </div>
            <p className="text-sm text-sw-dark">&ldquo;{t.quote}&rdquo;</p>
            <p className="mt-2 text-xs font-semibold text-sw-grey">
              {t.name} · {t.role}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-sw bg-sw-grey-light px-4 py-3">
        {TRUST_BADGES.map((badge) => (
          <span key={badge} className="flex items-center gap-1.5 text-xs font-semibold text-sw-grey">
            <ShieldCheck className="size-3.5 text-sw-success" />
            {badge}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-2 w-full animate-pulse-cta rounded-sw-sm bg-sw-blue py-3.5 font-extrabold tracking-wide text-sw-white transition hover:bg-sw-blue-hover"
      >
        CONTINUE →
      </button>
    </div>
  )
}
