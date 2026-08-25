import { Link } from 'react-router-dom'
import { SYSTEM_STEPS } from '@/marketing/data/home'
import { ROUTES } from '@/marketing/data/nav'

function StepIcon({ icon, color }: { icon: (typeof SYSTEM_STEPS)[number]['icon']; color: string }) {
  if (icon === 'shield') {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path
          d="M2 5l9-3 9 3v7c0 4.5-4.5 8-9 9-4.5-1-9-4.5-9-9V5z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M8 11l2 2 4-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (icon === 'info') {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="9" stroke={color} strokeWidth="1.8" />
        <path d="M11 7v5" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <circle cx="11" cy="15" r="1" fill={color} />
      </svg>
    )
  }
  if (icon === 'arrow') {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M5 11h12M13 7l4 4-4 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (icon === 'sun') {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="4" stroke={color} strokeWidth="1.8" />
        <path
          d="M11 3v2M11 17v2M3 11h2M17 11h2M5.64 5.64l1.42 1.42M14.94 14.94l1.42 1.42M5.64 16.36l1.42-1.42M14.94 7.06l1.42-1.42"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (icon === 'star') {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path
          d="M11 2l2.09 5.26L19 7.27l-4 3.9.94 5.5L11 14.35l-4.94 2.32.94-5.5-4-3.9 5.91-.99L11 2z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M3 17l5-6 4 4 5-8 4 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-sw-grey-light/30 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-sw-blue uppercase">Our Learning System</p>
          <h2 className="mb-3 text-3xl font-extrabold text-sw-dark sm:text-4xl">
            Every Lesson Follows the Same Proven System
          </h2>
          <p className="mx-auto max-w-xl text-lg text-sw-grey">
            Designed for real change — not just information. Every step is purposeful.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SYSTEM_STEPS.map((step) => (
            <article
              key={step.num}
              className="relative rounded-2xl border border-sw-grey-border bg-white p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: step.tile }}
                >
                  <StepIcon icon={step.icon} color={step.accent} />
                </div>
                <span className="text-3xl font-extrabold tabular-nums" style={{ color: `${step.accent}20` }}>
                  {step.num}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-sw-dark">{step.title}</h3>
              <p className="text-sm leading-relaxed text-sw-grey">{step.body}</p>
              {step.arrow ? (
                <span className="absolute top-1/2 -right-3 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-sw-grey-border bg-white lg:flex">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path
                      d="M2 5h6M5 2l3 3-3 3"
                      stroke="#9CA3AF"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : null}
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-6 text-base text-sw-grey">Ready to experience a lesson that actually changes something?</p>
          <Link
            to={ROUTES.quizSuccess}
            className="inline-block rounded-full bg-sw-blue px-8 py-4 font-bold text-white transition-all duration-200 hover:bg-sw-blue-hover hover:shadow-lg hover:shadow-sw-blue/25"
          >
            Start Your Roadmap →
          </Link>
        </div>
      </div>
    </section>
  )
}
