import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FwFinder from '@/marketing/components/FwFinder'
import FwLibrary from '@/marketing/components/FwLibrary'
import {
  FEATURED_PATHS,
  FW_NAV,
  FW_STATS,
  FW_TESTIMONIALS,
  HOW_POINTS,
  PATH_GRADIENTS,
} from '@/marketing/data/financialWellbeing'
import { FINAL_TRUST } from '@/marketing/data/home'
import { ROUTES } from '@/marketing/data/nav'
import usePageTitle from '@/marketing/hooks/usePageTitle'
import useReveal from '@/marketing/hooks/useReveal'

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M4.5 2.5L7.5 6l-3 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Breadcrumb() {
  return (
    <div className="sticky top-16 z-40 border-b border-sw-grey-border bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center gap-2 py-2 text-xs text-sw-grey">
          <Link to={ROUTES.home} className="transition-colors hover:text-sw-blue">
            Home
          </Link>
          <Chevron />
          <span className="font-medium text-sw-dark">Learn</span>
          <Chevron />
          <span className="font-medium text-sw-blue">Financial Wellbeing</span>
        </div>
        <div
          className="flex items-center gap-2 overflow-x-auto pb-3"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          aria-label="Learning categories"
        >
          {FW_NAV.map((item) =>
            item.active ? (
              <span
                key={item.label}
                className="shrink-0 rounded-full bg-sw-amber px-4 py-1.5 text-sm font-semibold text-white"
              >
                {item.label}
              </span>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="shrink-0 rounded-full border border-sw-grey-border px-4 py-1.5 text-sm font-medium text-sw-grey transition-all hover:bg-sw-grey-light hover:text-sw-dark"
              >
                {item.label}
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  )
}

function Hero() {
  const ref = useReveal()
  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-16 pb-10"
      style={{ background: 'linear-gradient(135deg, #0c0a04 0%, #1a1200 50%, #1f1500 100%)' }}
    >
      <div
        className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.22) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 35% 45%, white 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <div
          className="reveal mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          style={{ background: 'rgba(245,158,11,0.15)', borderColor: 'rgba(245,158,11,0.3)' }}
        >
          <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: '#F59E0B' }}>
            Financial Wellbeing
          </span>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
            29 courses
          </span>
        </div>
        <h1 className="reveal reveal-delay-1 mb-4 max-w-3xl text-3xl leading-tight font-extrabold text-white sm:text-4xl lg:text-5xl">
          Build Real <span style={{ color: '#F59E0B' }}>Financial Confidence</span>
          <br className="hidden sm:block" /> — Not Just Financial Knowledge.
        </h1>
        <p
          className="reveal reveal-delay-2 mb-4 max-w-2xl text-base leading-relaxed sm:text-lg"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          Bite-sized courses on money habits, earning more, budgeting, and the psychology that drives
          every financial decision you make.
        </p>
        <p
          className="reveal reveal-delay-2 mb-8 inline-block rounded-lg px-3 py-2 text-xs"
          style={{ color: 'rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.04)' }}
        >
          📚 Education only — not financial advice. Always consult a qualified professional for personal
          financial decisions.
        </p>
        <div className="reveal reveal-delay-3 mb-8 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
          {FW_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-extrabold text-white tabular-nums">{stat.value}</div>
              <div className="mt-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <div className="reveal reveal-delay-4 flex flex-col gap-3 sm:flex-row">
          <a
            href="#financial-finder"
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-center text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)' }}
          >
            Find My Financial Path →
          </a>
          <a
            href="#course-library"
            className="inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 text-center text-base font-semibold text-white transition-all"
            style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)' }}
          >
            Browse All 29 Courses
          </a>
        </div>
      </div>
    </section>
  )
}

function FeaturedPaths() {
  const ref = useReveal(0.05)
  const featured = FEATURED_PATHS[0]
  const rest = FEATURED_PATHS.slice(1)
  return (
    <section ref={ref} className="overflow-hidden bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal mb-10 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-sw-amber uppercase">
            Featured Paths
          </p>
          <h2 className="mb-3 text-3xl font-extrabold text-sw-dark sm:text-4xl">
            Your Fastest Route to Financial Confidence
          </h2>
          <p className="mx-auto max-w-xl text-lg text-sw-grey">
            Curated learning paths that take you from where you are now to where you want to be.
          </p>
        </div>
        <div
          className="reveal reveal-delay-1 relative mb-6 overflow-hidden rounded-2xl shadow-lg"
          style={{ background: PATH_GRADIENTS[featured.gradient] }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
            aria-hidden="true"
          />
          <div className="relative flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="shrink-0 text-5xl">{featured.emoji}</div>
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">
                  Most Popular
                </span>
              </div>
              <h3 className="mb-2 text-xl font-extrabold text-white sm:text-2xl">{featured.title}</h3>
              <p className="mb-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                {featured.description}
              </p>
              <div className="flex items-center gap-4 text-xs font-medium text-white/60">
                <span>📚 {featured.lessons} lessons</span>
                <span>⏱ {featured.weeks} weeks</span>
              </div>
            </div>
            <div className="shrink-0">
              <button
                type="button"
                className="rounded-xl border border-white/30 bg-white/20 px-6 py-3 text-sm font-bold whitespace-nowrap text-white transition-all hover:bg-white/30"
              >
                Start This Path →
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((path, i) => (
            <div
              key={path.id}
              className={`reveal reveal-delay-${Math.min(i + 2, 5)} group cursor-pointer overflow-hidden rounded-2xl border border-sw-grey-border transition-all hover:shadow-md`}
            >
              <div className="h-2" style={{ background: PATH_GRADIENTS[path.gradient] }} />
              <div className="p-5">
                <div className="mb-3 flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
                    style={{ background: PATH_GRADIENTS[path.gradient] + '20' }}
                  >
                    {path.emoji}
                  </div>
                  <div>
                    <h3 className="text-sm leading-tight font-bold text-sw-dark transition-colors group-hover:text-sw-blue">
                      {path.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-sw-grey">
                      {path.lessons} lessons · {path.weeks} weeks
                    </p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-sw-grey">{path.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const ref = useReveal()
  return (
    <section ref={ref} className="overflow-hidden bg-sw-dark py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal mb-10 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-sw-amber uppercase">
            Real Results
          </p>
          <h2 className="mb-3 text-2xl font-extrabold text-white sm:text-3xl">
            Real People. Real Financial Wins.
          </h2>
          <p className="mx-auto max-w-lg text-base text-white/50">
            Not overnight miracles — real, sustainable change built one lesson at a time.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {FW_TESTIMONIALS.map((item, i) => (
            <div
              key={item.name}
              className={`reveal reveal-delay-${i + 1} rounded-2xl border border-white/10 p-6`}
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <div className="mb-3 text-4xl" style={{ color: 'rgba(245,158,11,0.4)' }}>
                &quot;
              </div>
              <p className="mb-5 text-sm leading-relaxed text-white/80">{item.quote}</p>
              <div
                className="mb-4 flex items-center gap-2 rounded-lg px-3 py-2"
                style={{ background: 'rgba(245,158,11,0.12)' }}
              >
                <span className="text-base">{item.emoji}</span>
                <span className="text-xs font-semibold" style={{ color: '#F59E0B' }}>
                  {item.result}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #D97706, #F59E0B)' }}
                >
                  {item.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{item.name}</div>
                  <div className="text-xs text-white/40">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="reveal mt-10 text-center">
          <p className="text-xs text-white/30">
            Testimonials represent individual experiences. Results vary. SuccessWise provides financial
            education only, not personalised financial advice.
          </p>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const ref = useReveal()
  return (
    <section ref={ref} className="overflow-hidden bg-sw-grey-light py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="reveal mb-3 text-sm font-semibold tracking-widest text-sw-amber uppercase">
              How It Works
            </p>
            <h2 className="reveal reveal-delay-1 mb-4 text-3xl leading-tight font-extrabold text-sw-dark sm:text-4xl">
              Implementation, Not Just Information
            </h2>
            <p className="reveal reveal-delay-2 mb-6 text-base leading-relaxed text-sw-grey">
              Every lesson ends with a single practical action — not homework, just the one next step
              that moves you forward. No theory without practice.
            </p>
            <ul className="reveal reveal-delay-3 space-y-3">
              {HOW_POINTS.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-xl">{item.icon}</span>
                  <span className="text-sm leading-snug text-sw-grey">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal reveal-delay-2">
            <div className="overflow-hidden rounded-2xl border border-sw-grey-border bg-white shadow-xl">
              <div className="flex items-center gap-3 border-b border-sw-grey-border p-4">
                <div className="h-2 w-2 rounded-full bg-sw-amber" />
                <span className="text-xs font-medium text-sw-grey">The Money Habits System</span>
                <span className="ml-auto rounded-full bg-sw-grey-light px-2.5 py-1 text-xs font-semibold text-sw-grey">
                  Day 7 of 21
                </span>
              </div>
              <div className="p-5">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xs font-bold tracking-wide text-sw-amber uppercase">
                    Lesson 7
                  </span>
                  <span className="text-xs text-sw-grey">·</span>
                  <span className="text-xs text-sw-grey">8 min</span>
                </div>
                <h3 className="mb-3 text-lg leading-tight font-extrabold text-sw-dark">
                  The 24-Hour Pause Rule
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-sw-grey">
                  Most impulsive spending happens in a gap between impulse and action. Learn the one
                  habit that naturally closes that gap — without willpower.
                </p>
                <div
                  className="mb-4 rounded-xl border-l-4 p-3"
                  style={{ background: 'rgba(245,158,11,0.06)', borderColor: '#F59E0B' }}
                >
                  <p className="mb-1 text-xs font-semibold text-sw-amber">💡 Today&apos;s Key Insight</p>
                  <p className="text-sm leading-snug text-sw-dark">
                    &quot;The urge to spend is usually about a feeling, not the thing. Wait 24 hours and
                    ask: what am I actually trying to solve?&quot;
                  </p>
                </div>
                <div className="mb-4 rounded-xl p-3" style={{ background: '#F0FDF4' }}>
                  <p className="mb-1 text-xs font-semibold text-green-700">✅ Your One Action Today</p>
                  <p className="text-sm leading-snug text-sw-dark">
                    Add a 24-hour rule to your phone&apos;s shopping apps — move the icons to a folder
                    labelled &quot;Tomorrow&apos;s Decision.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-sw-grey-light">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: '33%',
                        background: 'linear-gradient(90deg, #D97706, #F59E0B)',
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium whitespace-nowrap text-sw-grey">
                    33% complete
                  </span>
                </div>
              </div>
              <div className="px-5 pb-5">
                <button
                  type="button"
                  className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all"
                  style={{ background: 'linear-gradient(135deg, #D97706, #F59E0B)' }}
                >
                  Complete Lesson &amp; Continue →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  const ref = useReveal()
  return (
    <section ref={ref} className="relative overflow-hidden bg-sw-dark py-24 sm:py-40">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sw-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-sw-blue/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-sw-blue/8 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full">
          <defs>
            <pattern id="cta-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>
      </div>
      <div className="reveal relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-sw-blue" />
          <span className="text-xs font-semibold tracking-wide text-white/80 uppercase">
            Your journey starts today
          </span>
        </div>
        <h2 className="mb-6 text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          The person you want to be
          <br />
          <span className="text-sw-blue">is already inside you.</span>
        </h2>
        <p className="reveal reveal-delay-1 mx-auto mb-10 max-w-xl text-lg leading-relaxed text-white/50 sm:text-xl">
          All you need is the right system to bring them out. It starts with a 60-second quiz. It ends
          with the life you&apos;ve been working towards.
        </p>
        <div className="reveal reveal-delay-2 mb-10 flex flex-col items-center gap-3">
          <Link
            to={ROUTES.quizSuccess}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-10 py-5 text-lg font-bold text-sw-blue shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-2xl sm:w-auto"
          >
            Start Your Success Quiz
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M3 9h12M10 5l4 4-4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <span className="text-sm text-white/30">60 seconds · Instant results</span>
        </div>
        <div className="reveal reveal-delay-3 flex flex-wrap items-center justify-center gap-5">
          {FINAL_TRUST.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className="text-base">{item.emoji}</span>
              <span className="text-sm font-medium text-white/40">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function FinancialWellbeingPage() {
  usePageTitle('Financial Wellbeing Courses — SuccessWise.ai | Build Real Financial Confidence')
  const [showSticky, setShowSticky] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Breadcrumb />
      <Hero />
      <FwFinder />
      <FeaturedPaths />
      <Testimonials />
      <FwLibrary />
      <HowItWorks />
      <FinalCta />
      <div
        className={`fixed right-0 bottom-0 left-0 z-50 border-t border-sw-grey-border bg-white px-4 py-3 transition-transform duration-300 sm:hidden ${
          showSticky ? 'translate-y-0' : 'translate-y-full'
        }`}
        aria-hidden={!showSticky}
      >
        <a
          href="#financial-finder"
          className="block w-full rounded-full py-3.5 text-center text-sm font-bold text-white transition-colors"
          style={{ background: 'linear-gradient(135deg, #D97706, #F59E0B)' }}
        >
          Find My Financial Path →
        </a>
      </div>
    </>
  )
}
