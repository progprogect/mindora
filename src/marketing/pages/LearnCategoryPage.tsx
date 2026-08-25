import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { LearnCategory, LearnCourse } from '@/marketing/data/learn'
import { ROUTES } from '@/marketing/data/nav'
import LearnStickyCta from '@/marketing/components/LearnStickyCta'
import usePageTitle from '@/marketing/hooks/usePageTitle'

function LearnLockIcon() {
  return (
    <svg
      className="h-4 w-4 text-white/40"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  )
}

function useLearnSticky(threshold = 300) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return show
}

function ComingSoonCard({ course }: { course: LearnCourse }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-md"
      style={{ background: course.gradient }}
    >
      <div
        className="absolute inset-0 z-10 flex flex-col items-end justify-start p-4"
        style={{ pointerEvents: 'none' }}
      >
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
          style={{ backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
        >
          🔒 COMING SOON
        </span>
      </div>
      <div className="p-5" style={{ opacity: 0.85 }}>
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="mt-1 text-xl leading-tight font-extrabold text-white">{course.title}</h2>
            <p className="mt-1 line-clamp-2 text-sm leading-snug text-white/70">{course.subtitle}</p>
          </div>
          <div className="mt-1 shrink-0 text-4xl">{course.emoji}</div>
        </div>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5">
            <span className="text-xs font-semibold text-white">📚 {course.lessons} lessons</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5">
            <span className="text-xs font-semibold text-white">⚡ {course.xp} XP</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5">
            <span className="text-xs font-semibold text-white">⏱ 5 min/day</span>
          </div>
        </div>
        <Link
          to={course.href}
          className="inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 text-sm font-extrabold shadow-sm transition-transform hover:shadow-md active:scale-[0.97]"
          style={{ color: course.accentColor }}
        >
          {course.cta}
        </Link>
      </div>
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
      >
        <span className="text-xs font-medium text-white/60">Course launching soon</span>
        <LearnLockIcon />
      </div>
    </div>
  )
}

function LiveCard({ course }: { course: LearnCourse }) {
  const countLabel =
    course.days != null ? `📅 ${course.days} days` : `📚 ${course.lessons} lessons`
  const ctaClass = course.accentColor
    ? 'inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-extrabold shadow-sm transition-transform hover:shadow-md active:scale-[0.97]'
    : 'inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-extrabold text-sw-blue shadow-sm transition-transform hover:shadow-md active:scale-[0.97]'

  return (
    <div className="overflow-hidden rounded-2xl shadow-md" style={{ background: course.gradient }}>
      <div className="p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  course.accentColor ? 'bg-white/90' : 'bg-white/90 text-sw-blue'
                }`}
                style={course.accentColor ? { color: course.accentColor } : undefined}
              >
                LIVE
              </span>
              {course.isNew ? (
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white">
                  NEW
                </span>
              ) : null}
            </div>
            <h2 className="text-xl leading-tight font-extrabold text-white">{course.title}</h2>
            <p className="mt-1 line-clamp-2 text-sm leading-snug text-white/70">{course.subtitle}</p>
          </div>
          <div className="shrink-0 text-4xl">{course.emoji}</div>
        </div>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5">
            <span className="text-xs font-semibold text-white">{countLabel}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5">
            <span className="text-xs font-semibold text-white">⚡ {course.xp} XP</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5">
            <span className="text-xs font-semibold text-white">⏱ 5 min/day</span>
          </div>
        </div>
        <Link
          to={course.href}
          className={ctaClass}
          style={course.accentColor ? { color: course.accentColor } : undefined}
        >
          {course.cta}
        </Link>
      </div>
    </div>
  )
}

export default function LearnCategoryPage({ category }: { category: LearnCategory }) {
  usePageTitle(category.pageTitle)
  const showSticky = useLearnSticky(300)

  return (
    <>
      <section style={{ background: category.heroBg }}>
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-8">
          <div className="mb-5 flex items-center gap-2">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-base"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
            >
              {category.emoji}
            </span>
            <span className="text-xs font-bold tracking-widest text-white/50 uppercase">
              {category.kicker}
            </span>
          </div>
          <h1 className="mb-3 text-3xl leading-tight font-extrabold text-white sm:text-4xl">
            {category.h1Line}
            <br />
            <span style={{ color: 'hsl(var(--sw-amber))' }}>{category.h1Accent}</span>
          </h1>
          <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/55">{category.subtitle}</p>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
            >
              <span
                className={`inline-block h-1.5 w-1.5 animate-pulse rounded-full ${
                  category.live ? 'bg-sw-success' : 'bg-sw-amber'
                }`}
              />
              {category.statusPill}
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white/65"
              style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
            >
              ⏱ 5 min/day
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white/65"
              style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
            >
              {category.certificatePill}
            </span>
          </div>
        </div>
      </section>

      <div className="border-b border-sw-grey-border bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-3 divide-x divide-sw-grey-border">
          {category.benefits.map((item) => (
            <div
              key={item.text}
              className="flex flex-col items-center gap-1.5 px-2 py-4 text-center"
            >
              <span className="text-lg">{item.icon}</span>
              <p className="text-[10px] leading-tight font-bold text-sw-dark">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <section style={{ background: category.problemBg }}>
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-10">
          <p className="mb-4 text-xs font-bold tracking-widest text-white/40 uppercase">
            {category.problemKicker}
          </p>
          <h2 className="mb-3 text-2xl leading-tight font-extrabold text-white">
            {category.problemLine}
            <br />
            <span style={{ color: 'hsl(var(--sw-amber))' }}>{category.problemAccent}</span>
          </h2>
          <p className="mb-2 text-sm leading-relaxed text-white/55">{category.problemBody}</p>
          <p className="mb-7 text-[10px] text-white/30 italic">{category.sources}</p>
          <div className="grid grid-cols-2 gap-3">
            {category.stats.map((stat) => (
              <div
                key={stat.value}
                className="rounded-2xl p-4"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p className="mb-1 text-2xl font-extrabold text-white">{stat.value}</p>
                <p className="text-xs leading-snug text-white/55">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: category.skillsBg }}>
        <div className="mx-auto max-w-2xl px-4 pt-8 pb-10">
          <h2 className="mb-1 text-xl font-extrabold text-white">{category.skillsTitle}</h2>
          <p className="mb-6 text-sm text-white/50">{category.skillsSubtitle}</p>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-2 rounded-xl px-3 py-2"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.09)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <span className="text-base">{skill.icon}</span>
                <span className="text-xs font-semibold text-white/80">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={`mx-auto max-w-2xl px-4 pt-5 pb-36 ${category.live ? 'space-y-6' : 'space-y-3'}`}>
        {category.live ? (
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-sw-success" />
              <p className="text-xs font-bold tracking-widest text-sw-dark uppercase">Live Now</p>
            </div>
            {category.courses.map((course, i) => (
              <div key={course.id} className={i === 0 ? undefined : 'mt-3'}>
                <LiveCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-sw-amber" />
              <p className="text-xs font-bold tracking-widest text-sw-dark uppercase">
                Coming Soon — Be First
              </p>
            </div>
            {category.courses.map((course) => (
              <ComingSoonCard key={course.id} course={course} />
            ))}
          </>
        )}
      </div>

      <section className={category.certPad ?? 'mx-auto max-w-2xl px-4 pt-6 pb-8'}>
        <div className="overflow-hidden rounded-2xl" style={{ background: category.certBg }}>
          <div className="p-6 text-center">
            <div className="mb-5 flex justify-center gap-3">
              {['🥇', '🏆', '⭐', '🎖️', '🌟'].map((icon) => (
                <span key={icon} className="text-2xl">
                  {icon}
                </span>
              ))}
            </div>
            <h2 className="mb-2 text-xl font-extrabold text-white">{category.certTitle}</h2>
            <p className="mb-6 text-sm leading-relaxed text-white/75">{category.certBody}</p>
            <Link
              to={ROUTES.quiz28}
              className={`inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-extrabold shadow-sm transition-transform hover:shadow-md active:scale-[0.97] ${
                category.certCtaColor ? '' : 'text-sw-blue'
              }`}
              style={category.certCtaColor ? { color: category.certCtaColor } : undefined}
            >
              Get your certificate →
            </Link>
          </div>
        </div>
      </section>

      {category.disclaimer ? (
        <div className="mx-auto max-w-2xl px-4 pb-6">
          <p className="text-center text-[10px] leading-relaxed text-sw-grey">
            ⚕️ <strong>Health disclaimer:</strong> {category.disclaimer}
          </p>
        </div>
      ) : null}

      <LearnStickyCta
        show={showSticky}
        label={category.stickyCta}
        href={ROUTES.quiz28}
        backgroundColor={category.stickyBg}
        className={category.stickyClass}
      />
    </>
  )
}
