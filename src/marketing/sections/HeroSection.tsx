import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import PhoneMock from '@/marketing/components/PhoneMock'
import { ROUTES } from '@/marketing/data/nav'
import { HERO_AVATARS, HERO_PILLS } from '@/marketing/data/home'

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full max-w-full items-start overflow-hidden bg-white pt-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-[700px] w-[700px] translate-x-1/3 -translate-y-1/3 rounded-full bg-sw-blue-light opacity-50 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/4 rounded-full bg-sw-blue-light opacity-30 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#2563EB" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-6xl overflow-hidden px-4 pt-8 pb-12 sm:px-6 lg:pt-10 lg:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="w-full min-w-0 space-y-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-sw-blue-border bg-sw-blue-light px-4 py-1.5">
              <span className="size-1.5 animate-pulse rounded-full bg-sw-blue" />
              <span className="text-xs font-semibold tracking-wide text-sw-blue uppercase">
                The #1 Platform for Daily Self-Growth
              </span>
            </div>

            <h1 className="text-[38px] leading-[1.08] font-extrabold tracking-tight text-sw-dark sm:text-5xl lg:text-[58px]">
              Become{' '}
              <span className="relative inline-block">
                <span className="text-sw-blue">1% Better.</span>
                <span className="absolute right-0 -bottom-1 left-0 h-1 rounded-full bg-sw-blue/20" />
              </span>
              <br />
              Every Single Day. <span className="emoji-pulse inline-block">✨</span>
            </h1>

            <p className="mx-auto text-base leading-relaxed text-sw-grey sm:max-w-lg sm:text-xl lg:mx-0">
              Curated expert knowledge. A personalised daily system. An AI Coach that turns every
              lesson into real action — in just 5 minutes a day.
            </p>

            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {HERO_PILLS.map((pill) => (
                <div
                  key={pill.label}
                  className="flex items-center gap-1.5 rounded-full border border-sw-grey-border bg-sw-grey-light px-3 py-1.5"
                >
                  <span aria-hidden="true">{pill.emoji}</span>
                  <span className="text-xs font-semibold text-sw-dark">{pill.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <Link
                to={ROUTES.quizSuccess}
                className="animate-pulse-glow inline-flex w-full items-center justify-center gap-2 rounded-full bg-sw-blue px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-sw-blue-hover hover:shadow-lg hover:shadow-sw-blue/25"
              >
                Start Your 60-Second Success Quiz
                <ArrowRight className="size-4" />
              </Link>
              <span className="text-center text-xs text-sw-grey lg:text-left">
                Takes 60 seconds · Instant results
              </span>
            </div>

            <div className="flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <div className="flex -space-x-2">
                {HERO_AVATARS.map((avatar) => (
                  <span
                    key={avatar.initial}
                    className={`flex size-8 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white ${avatar.className}`}
                  >
                    {avatar.initial}
                  </span>
                ))}
              </div>
              <div className="text-center sm:text-left">
                <div className="text-sm leading-none text-sw-warning" aria-label="5 star rating">
                  ★★★★★
                </div>
                <p className="mt-1 text-sm text-sw-grey">
                  Trusted by <span className="font-bold text-sw-dark">100,000+ learners</span>{' '}
                  worldwide
                </p>
              </div>
            </div>
          </div>

          <PhoneMock />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-sw-grey/50 sm:flex">
        <ChevronDown className="size-5 animate-bounce" aria-hidden="true" />
      </div>

      <img
        src="/assets/mascot.png"
        alt="SuccessWise mascot"
        className="animate-float pointer-events-none absolute right-4 bottom-16 z-20 hidden w-16 drop-shadow-lg sm:block lg:right-12 lg:w-24"
      />
    </section>
  )
}
