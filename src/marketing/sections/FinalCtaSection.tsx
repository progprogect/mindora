import { Link } from 'react-router-dom'
import { FINAL_TRUST } from '@/marketing/data/home'
import { ROUTES } from '@/marketing/data/nav'

export default function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden bg-sw-dark py-24 sm:py-40">
      <div className="sw-dots-dark pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(36,99,235,0.22),transparent_55%)]" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5">
          <span className="size-2 animate-pulse rounded-full bg-sw-blue" />
          <span className="text-xs font-semibold tracking-wide text-white/70 uppercase">
            Your Journey Starts Today
          </span>
        </div>
        <h2 className="mb-6 text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          The person you want to be
          <br />
          <span className="text-sw-blue">is already inside you.</span>
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-white/50 sm:text-xl">
          All you need is the right system to bring them out. It starts with a 60-second quiz. It
          ends with the life you’ve been working towards.
        </p>
        <div className="mb-10 flex flex-col items-center gap-3">
          <Link
            to={ROUTES.quizSuccess}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-10 py-5 text-lg font-bold text-sw-blue shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 sm:w-auto"
          >
            Start Your Success Quiz
          </Link>
          <p className="text-sm text-white/40">60 seconds · Instant results</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-white/50">
          {FINAL_TRUST.map((item) => (
            <span key={item.label} className="inline-flex items-center gap-1.5">
              <span aria-hidden="true">{item.emoji}</span>
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
