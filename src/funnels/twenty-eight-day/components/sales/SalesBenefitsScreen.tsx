import { Clock, Compass, Rocket, ShieldCheck, Sparkles, Users } from 'lucide-react'

interface SalesBenefitsScreenProps {
  onContinue: () => void
}

const BENEFITS = [
  {
    Icon: Compass,
    title: 'A clear, daily roadmap',
    description: 'No more guessing — one focused action a day for 28 days.',
  },
  {
    Icon: Clock,
    title: 'Save 5-10 hours every week',
    description: 'Automate the repetitive work that eats your time today.',
  },
  {
    Icon: Rocket,
    title: 'Real tools, real templates',
    description: 'Copy-paste prompts and workflows built for your exact goals.',
  },
  {
    Icon: Users,
    title: 'A community that keeps you going',
    description: 'Accountability and support from people on the same 28-day path.',
  },
  {
    Icon: ShieldCheck,
    title: 'Future-proof your career',
    description: 'Build the AI fluency that will matter most over the next decade.',
  },
] as const

export default function SalesBenefitsScreen({ onContinue }: SalesBenefitsScreenProps) {
  return (
    <div className="flex flex-1 flex-col gap-6 py-4 animate-fade-up">
      <div className="text-center">
        <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-sw-blue-light">
          <Sparkles className="size-6 text-sw-blue" />
        </div>
        <h1 className="text-2xl font-extrabold text-sw-dark">What you get in 28 days</h1>
        <p className="mt-2 text-sm text-sw-grey">Everything is designed around your answers — nothing generic.</p>
      </div>

      <div className="flex flex-col gap-3">
        {BENEFITS.map(({ Icon, title, description }) => (
          <div
            key={title}
            className="flex items-start gap-3 rounded-sw border border-sw-border bg-sw-white p-4 shadow-sw-card"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sw-success-light">
              <Icon className="size-4 text-sw-success" />
            </div>
            <div>
              <p className="text-sm font-bold text-sw-dark">{title}</p>
              <p className="mt-0.5 text-xs text-sw-grey">{description}</p>
            </div>
          </div>
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
