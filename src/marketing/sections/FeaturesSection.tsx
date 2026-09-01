import { COMPARE_THEM, COMPARE_US, FEATURE_STEPS } from '@/marketing/data/home'

function FeatureIcon({ index, color }: { index: number; color: string }) {
  if (index === 0) {
    return (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <path
          d="M13 3C7.477 3 3 7.477 3 13s4.477 10 10 10 10-4.477 10-10S18.523 3 13 3z"
          stroke={color}
          strokeWidth="1.8"
        />
        <path d="M13 8v5l3 3" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }
  if (index === 1) {
    return (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <path
          d="M4 20.5A2.5 2.5 0 016.5 18H22"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 3H22v20H6.5A2.5 2.5 0 014 20.5v-15A2.5 2.5 0 016.5 3z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M9 8h8M9 12h5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <circle cx="13" cy="13" r="4.5" stroke={color} strokeWidth="1.8" />
      <path
        d="M13 5v2M13 19v2M5 13h2M19 13h2M7.34 7.34l1.42 1.42M17.24 17.24l1.42 1.42M7.34 18.66l1.42-1.42M17.24 8.76l1.42-1.42"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MiniCheck({ color }: { color: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 5l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 text-center">
          <p className="mb-4 text-sm font-semibold tracking-widest text-sw-blue uppercase">How It Works</p>
          <h2 className="mb-4 text-3xl leading-tight font-extrabold text-sw-dark sm:text-4xl lg:text-5xl">
            Three steps to become
            <br />
            <span className="text-sw-blue">who you want to be.</span> <span className="emoji-bounce">🚀</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-sw-grey">
            A simple daily system. Personalised to you. Powered by expert knowledge and AI.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-[52px] right-[16.67%] left-[16.67%] z-0 hidden h-0.5 bg-sw-grey-border lg:block" />
          <div className="relative z-10 grid gap-6 sm:grid-cols-3 lg:gap-8">
            {FEATURE_STEPS.map((step, i) => (
              <article
                key={step.num}
                className="group relative rounded-2xl border border-sw-grey-border bg-white p-7 transition-all duration-300 hover:shadow-lg"
              >
                <span
                  className="pointer-events-none absolute top-4 right-5 text-5xl font-extrabold tabular-nums opacity-[0.06] select-none group-hover:opacity-[0.12]"
                  style={{ color: step.accent }}
                >
                  {step.num}
                </span>
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: step.tile }}
                >
                  <span className="emoji-float" style={{ animationDelay: step.delay }}>
                    <FeatureIcon index={i} color={step.accent} />
                  </span>
                </div>
                <h3 className="mb-3 text-xl leading-snug font-extrabold text-sw-dark">{step.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-sw-grey">{step.body}</p>
                <div
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                  style={{ backgroundColor: step.tile, color: step.accent }}
                >
                  <MiniCheck color={step.accent} />
                  {step.badge}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-sw-grey-light/40 p-6">
          <p className="mb-5 text-center text-xs font-semibold tracking-widest text-sw-grey uppercase">How we compare</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-sw-grey-border bg-white p-5">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sw-grey/10">
                  <span className="text-xs font-bold text-sw-grey/50">✗</span>
                </div>
                <span className="text-xs font-semibold tracking-wide text-sw-grey uppercase">Every other platform</span>
              </div>
              <div className="space-y-2">
                {COMPARE_THEM.map((line) => (
                  <div key={line} className="flex items-center gap-2 text-sm text-sw-grey/60">
                    <span className="shrink-0 text-xs text-red-400">✗</span>
                    {line}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-sw-blue p-5">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                  <span className="text-xs font-bold text-white">✓</span>
                </div>
                <span className="text-xs font-semibold tracking-wide text-white/80">MindoraAcademy</span>
              </div>
              <div className="space-y-2">
                {COMPARE_US.map((line) => (
                  <div key={line} className="flex items-center gap-2 text-sm text-white/90">
                    <span className="shrink-0 text-xs text-green-300">✓</span>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
