import { type CSSProperties, useState } from 'react'
import { Link } from 'react-router-dom'
import PromptLibraryModal from '@/app/PromptLibraryModal'
import { PLAN_TIERS } from '@/app/mockUser'
import missionCourses from '@/content/mission-courses.json'
import {
  FOCUS_MISSION,
  FOCUS_PATHS,
  greetingLabel,
  mondayWeek,
  PATH_META,
  PROFILE_PACES,
  todayIso,
} from '@/content/lms'
import { PROGRESS_COURSES } from '@/content/progress-catalog'
import { useCurrentUser } from '@/auth/session'
import { useProgress } from '@/lib/lmsQueries'

const DASHBOARD_PATHS = ['ai-and-technology', 'success-mindset', 'career', 'business', 'health'] as const

const COURSE_COUNTS: Record<(typeof DASHBOARD_PATHS)[number], string> = {
  'ai-and-technology': '15 courses',
  'success-mindset': '5 courses',
  career: '4 courses',
  business: '12 courses',
  health: '9 courses',
}

const ASK_WISE_TIP =
  "The best AI users aren't the ones who know all the tools — they're the ones who ask better questions."

function firstName(name?: string) {
  return name?.trim().split(' ')[0] || 'there'
}

function Chevron({
  className,
  strokeWidth = 2,
  style,
}: {
  className?: string
  strokeWidth?: number
  style?: CSSProperties
}) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      style={style}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

export default function DashboardPage() {
  const [libraryOpen, setLibraryOpen] = useState(false)
  const user = useCurrentUser()
  const progress = useProgress()
  if (user === undefined || progress === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center pb-20">
        <div className="w-8 h-8 border-2 border-sw-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const name = firstName(user?.name)
  const focus = user?.focusCategory && user.focusCategory in FOCUS_PATHS ? user.focusCategory : 'ai'
  const missionSlug = FOCUS_MISSION[focus] || '28-day-ai-challenge'
  const pack = (
    missionCourses as Record<
      string,
      { title: string; totalDays: number; lessons: Array<{ id: string; dayNumber: number; title: string; duration?: string }> }
    >
  )[missionSlug]
  const catalog = PROGRESS_COURSES[missionSlug]
  const completed = new Set(
    progress.lessons.filter((row) => row.status === 'completed').map((row) => `${row.courseId}:${row.lessonSlug}`),
  )
  const lessons = pack?.lessons ?? []
  const missionDone = lessons.filter((lesson) => completed.has(`${missionSlug}:${lesson.id}`)).length
  const nextLesson = lessons.find((lesson) => !completed.has(`${missionSlug}:${lesson.id}`)) ?? lessons[0]
  const totalDays = pack?.totalDays ?? catalog?.totalLessons ?? 28
  const courseTitle = pack?.title ?? catalog?.name ?? '28-Day AI Challenge'
  const xp = progress.user.xp
  const streak = progress.user.streakCount
  const today = todayIso()
  const todayDone = progress.user.lastActivityDate === today
  const streakRisk = streak > 0 && !todayDone
  const week = mondayWeek()
  const doneDays = new Set(
    progress.lessons
      .filter((row) => row.status === 'completed' && row.completedAt)
      .map((row) => new Date(row.completedAt as number).toISOString().slice(0, 10)),
  )
  const tierKey = user?.planTier && user.planTier in PLAN_TIERS ? user.planTier : 'week4'
  const plan = PLAN_TIERS[tierKey as keyof typeof PLAN_TIERS]
  const elapsed = user?.joinDate ? Math.floor((Date.now() - user.joinDate) / 86400000) + 1 : 1
  const planDay = plan.days > 0 ? Math.min(Math.max(elapsed, 1), plan.days) : elapsed
  const planPct = plan.days > 0 ? Math.min(100, Math.round((planDay / plan.days) * 100)) : 0
  const pace = PROFILE_PACES.find((item) => item.value === user?.pacePreference)?.desc ?? '15 min/day'
  const paceShort = pace.replace(/\/day$/, '')
  const continueHref = nextLesson ? `/app/courses/${missionSlug}/${nextLesson.id}` : `/app/courses/${missionSlug}`
  const pathHref = FOCUS_PATHS[focus] || '/app/ai-and-technology'
  const missionPct = totalDays > 0 ? Math.round((missionDone / totalDays) * 100) : 0
  const ctaLabel =
    missionDone === 0
      ? '▶ Start — Day 1'
      : `▶ Continue — Day ${nextLesson?.dayNumber ?? missionDone + 1}`
  const featuredKey =
    DASHBOARD_PATHS.find((key) => PATH_META[key].focus === focus) ?? 'ai-and-technology'
  const gridKeys = DASHBOARD_PATHS.filter((key) => key !== featuredKey)
  const featured = PATH_META[featuredKey]

  return (
    <main className="max-w-2xl mx-auto px-4 pt-5 pb-36 space-y-4">
      <div className="pt-1 pb-0.5">
        <p className="text-xs font-semibold text-sw-grey uppercase tracking-widest mb-0.5">{greetingLabel()}</p>
        <h1 className="text-2xl font-extrabold text-sw-dark leading-tight">Hey, {name}!</h1>
        <p className="text-sm text-sw-grey mt-1">
          Day <span className="font-bold text-sw-blue">{planDay}</span> of your {plan.label} ·{' '}
          <span className="font-semibold">{pace}</span>
        </p>
      </div>

      <div
        className="rounded-2xl overflow-hidden shadow-md"
        style={{ background: 'linear-gradient(135deg, hsl(var(--sw-blue)) 0%, hsl(224 70% 38%) 100%)' }}
      >
        <div className="p-5 pb-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.14em]">Today&apos;s Mission</p>
            <span className="text-white/50 text-xs font-medium">
              {missionDone}/{totalDays} days
            </span>
          </div>
          <h2 className="text-white font-extrabold text-xl leading-tight mb-0.5">
            {nextLesson ? `Day ${nextLesson.dayNumber} · ${nextLesson.title}` : courseTitle}
          </h2>
          <p className="text-white/60 text-sm mb-1 leading-snug">{courseTitle}</p>
          <p className="text-white/45 text-xs mb-4">
            {nextLesson?.duration ?? '5 min'} · {paceShort}
          </p>
          <div className="mb-4">
            <div
              className="h-1.5 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={missionPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${courseTitle} progress: ${missionPct}%`}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)' }}
            >
              <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${missionPct}%` }} />
            </div>
          </div>
          <Link
            to={continueHref}
            className="flex items-center justify-center gap-2 w-full bg-white font-extrabold text-sm px-5 py-3.5 rounded-xl shadow-sm active:scale-[0.98] transition-transform"
            style={{ color: 'hsl(var(--sw-blue))' }}
          >
            {ctaLabel}
            <Chevron className="w-4 h-4 ml-auto" strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      {streakRisk ? (
        <div className="bg-white rounded-xl px-4 py-3 shadow-sm flex items-center gap-3 border border-amber-200">
          <span className="text-xl flex-shrink-0">🔥</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-sw-dark leading-tight">{streak}-day streak at risk!</p>
            <p className="text-xs text-sw-grey mt-0.5">Do today&apos;s lesson to keep it alive.</p>
          </div>
          <Link
            to={continueHref}
            className="flex-shrink-0 text-xs font-bold text-sw-blue bg-sw-blue-light px-3 py-1.5 rounded-full active:scale-95 transition-transform"
          >
            Go →
          </Link>
        </div>
      ) : null}

      <div className="bg-white rounded-2xl px-4 py-4 shadow-sm">
        <p className="text-[10px] font-bold text-sw-grey uppercase tracking-[0.12em] mb-3">This Week</p>
        <div className="flex justify-between items-center">
          {week.map((day) => {
            const isToday = day.date === today
            const done = doneDays.has(day.date)
            const isFuture = day.date > today
            const circle = isToday
              ? 'bg-sw-blue text-white ring-2 ring-sw-blue ring-offset-2 shadow-sm'
              : done
                ? 'bg-sw-blue text-white'
                : isFuture
                  ? 'border-2 border-sw-grey-border text-sw-grey/60'
                  : 'bg-sw-grey-light text-sw-grey'
            return (
              <div key={day.date} className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-semibold text-sw-grey uppercase">{day.label}</span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${circle}`}
                >
                  {done ? (
                    <span>✓</span>
                  ) : isToday ? (
                    <span className="w-2 h-2 rounded-full bg-white block" />
                  ) : (
                    <span>{day.num}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-3.5 shadow-sm text-center">
          <p className="text-lg font-extrabold text-sw-blue leading-none">{xp}</p>
          <p className="text-[11px] text-sw-grey font-semibold mt-1.5 uppercase tracking-wide">XP earned</p>
        </div>
        <div className="bg-white rounded-xl p-3.5 shadow-sm text-center">
          <div className="flex items-center justify-center gap-1 leading-none">
            <span className="text-base leading-none">🔥</span>
            <p className="text-lg font-extrabold text-sw-dark leading-none">{streak}</p>
          </div>
          <p className="text-[11px] text-sw-grey font-semibold mt-1.5 uppercase tracking-wide">Day streak</p>
        </div>
        <div className="bg-white rounded-xl p-3.5 shadow-sm text-center">
          <p className="text-lg font-extrabold text-sw-dark leading-none">{planPct}%</p>
          <p className="text-[11px] text-sw-grey font-semibold mt-1.5 uppercase tracking-wide">Plan</p>
        </div>
      </div>

      <Link
        to="/app/wise"
        className="block bg-gradient-to-br from-[hsl(var(--sw-blue))] to-[hsl(221,83%,42%)] rounded-2xl px-4 py-4 shadow-md active:scale-[0.98] transition-transform"
      >
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-lg">
            🧠
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-white font-extrabold text-sm leading-tight">Ask Wise</p>
            <p className="text-white/70 text-xs mt-0.5 leading-snug">
              Your AI coach — get personalised guidance, accountability &amp; motivation
            </p>
          </div>
          <Chevron className="w-5 h-5 text-white/60 flex-shrink-0" strokeWidth={2.5} />
        </div>
        <p className="text-white/50 text-[11px] font-medium mt-2.5 pl-[52px]">AI tip of the day: {ASK_WISE_TIP}</p>
      </Link>

      <div>
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-sm font-bold text-sw-dark uppercase tracking-wide">Explore paths</p>
          <Link to={pathHref} className="text-xs font-semibold text-sw-blue">
            See all →
          </Link>
        </div>
        <div className="space-y-2">
          <Link
            to={`/app/${featuredKey}`}
            className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border-2 border-sw-blue/30 active:scale-[0.98] transition-all"
          >
            <span className="text-2xl flex-shrink-0">{featured.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-sw-dark leading-tight">{featured.short}</p>
              <p className="text-xs text-sw-grey mt-0.5">{COURSE_COUNTS[featuredKey]} · Your path</p>
            </div>
            <span className="text-[10px] font-bold text-sw-blue uppercase tracking-wide flex-shrink-0">Active ✓</span>
          </Link>
          <div className="grid grid-cols-2 gap-2">
            {gridKeys.map((key) => {
              const meta = PATH_META[key]
              return (
                <Link
                  key={key}
                  to={`/app/${key}`}
                  className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 shadow-sm border border-sw-grey-border/50 active:scale-[0.97] transition-all"
                >
                  <span className="text-lg flex-shrink-0">{meta.emoji}</span>
                  <span className="text-xs font-semibold text-sw-dark leading-tight truncate">{meta.short}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setLibraryOpen(true)}
        className="w-full text-left relative overflow-hidden rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-transform border border-amber-200/60"
        style={{ background: 'linear-gradient(135deg, rgb(254, 247, 235) 0%, rgb(255, 247, 224) 50%, rgb(254, 247, 235) 100%)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, rgb(245, 159, 10) 0%, rgb(249, 116, 21) 100%)' }}
          >
            ⚡
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-sm text-sw-dark">AI Prompt Library</h3>
              <span
                className="text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full"
                style={{ backgroundColor: 'hsl(var(--sw-coral))' }}
              >
                NEW
              </span>
            </div>
            <p className="text-[11px] text-sw-grey mt-0.5 leading-snug">27,200+ expert prompts · Copy &amp; paste ready</p>
          </div>
          <Chevron className="w-5 h-5 flex-shrink-0" strokeWidth={2} style={{ color: 'rgb(195, 136, 34)' }} />
        </div>
      </button>

      <Link
        data-testid="dashboard-planner-link"
        to="/app/planners"
        className="flex items-center gap-3 bg-gradient-to-r from-sw-teal to-sw-blue rounded-2xl p-4 text-white active:scale-[0.98] transition-transform shadow-sm"
      >
        <span className="text-2xl">🗓️</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm">Printable Planners</h3>
          <p className="text-white/80 text-[11px] mt-0.5">Printable planners and journals to plan, focus and reflect</p>
        </div>
        <Chevron className="w-5 h-5 text-white/70 flex-shrink-0" strokeWidth={2} />
      </Link>
      {libraryOpen ? <PromptLibraryModal onClose={() => setLibraryOpen(false)} /> : null}
    </main>
  )
}
