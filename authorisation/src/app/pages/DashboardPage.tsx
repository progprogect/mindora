import { type CSSProperties, useState } from 'react'
import { Link } from 'react-router-dom'
import PromptLibraryModal from '@/app/PromptLibraryModal'
import { PLAN_TIERS } from '@/app/mockUser'
import { getHub, pickHomeContinue } from '@/content/catalog'
import {
  FOCUS_MISSION,
  FOCUS_PATHS,
  greetingLabel,
  mondayWeek,
  PATH_META,
  paceDesc,
  pathShort,
  PROFILE_PACES,
  todayIso,
} from '@/content/lms'
import { progressCourses } from '@/content/progress-catalog'
import { useCourse } from '@/content/useCourse'
import { useCurrentUser } from '@/auth/session'
import { useI18n } from '@/i18n/I18nProvider'
import { useProgress, usePurchases } from '@/lib/lmsQueries'

const DASHBOARD_PATHS = ['ai-and-technology', 'success-mindset', 'career', 'business', 'health'] as const

const COURSE_COUNT_KEYS: Record<(typeof DASHBOARD_PATHS)[number], string> = {
  'ai-and-technology': 'app.common.courseCountAi',
  'success-mindset': 'app.common.courseCountMindset',
  career: 'app.common.courseCountCareer',
  business: 'app.common.courseCountBusiness',
  health: 'app.common.courseCountHealth',
}

function firstName(name?: string, fallback = 'there') {
  return name?.trim().split(' ')[0] || fallback
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

function JourneyStep({
  label,
  state,
  t,
}: {
  label: string
  state: 'done' | 'next' | 'todo'
  t: (key: string) => string
}) {
  return (
    <li className="flex items-center gap-3 py-2.5 border-b border-sw-grey-border last:border-b-0">
      {state === 'done' ? (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-500 text-white text-sm font-bold">
          ✓
        </span>
      ) : state === 'next' ? (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sw-blue text-white text-[10px] font-bold">
          {t('app.common.next')}
        </span>
      ) : (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-sw-grey-border text-sw-grey text-sm">
          ○
        </span>
      )}
      <span className={`text-sm font-semibold ${state === 'done' ? 'text-sw-dark' : state === 'next' ? 'text-sw-dark' : 'text-sw-grey'}`}>
        {label}
      </span>
    </li>
  )
}

function FirstRunHome({
  name,
  paceMinutes,
  courseTitle,
  unit,
  nextLesson,
  continueHref,
  badgeEarned,
  totalDays,
  t,
}: {
  name: string
  paceMinutes: string
  courseTitle: string
  unit: string
  nextLesson: { dayNumber?: number; title: string } | undefined | null
  continueHref: string
  badgeEarned: boolean
  totalDays: number
  t: (key: string) => string
}) {
  const day = nextLesson?.dayNumber ?? 1
  return (
    <>
      <div data-testid="dashboard-first-run" className="pt-1 pb-0.5">
        <h1 className="text-2xl font-extrabold text-sw-dark leading-tight">{t('app.common.allSetName').replace('{name}', name)}</h1>
        <p className="text-sm text-sw-grey mt-2 leading-relaxed">
          {t('app.common.firstRunBody').replace('{minutes}', paceMinutes)}
        </p>
      </div>

      <div
        className="rounded-2xl overflow-hidden shadow-md"
        style={{ background: 'linear-gradient(135deg, hsl(var(--sw-blue)) 0%, hsl(224 70% 38%) 100%)' }}
      >
        <div className="p-5">
          <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.14em] mb-3">{t('app.common.yourFirstLesson')}</p>
          <h2 className="text-white font-extrabold text-xl leading-tight mb-0.5">
            {nextLesson ? `${unit} ${day} · ${nextLesson.title}` : courseTitle}
          </h2>
          <p className="text-white/60 text-sm mb-4 leading-snug">{courseTitle}</p>
          <Link
            to={continueHref}
            data-testid="dashboard-start-lesson-1"
            className="flex items-center justify-center gap-2 w-full bg-white font-extrabold text-sm px-5 py-3.5 rounded-xl shadow-sm active:scale-[0.98] transition-transform"
            style={{ color: 'hsl(var(--sw-blue))' }}
          >
            {t('app.common.startLesson').replace('{n}', String(day))}
            <Chevron className="w-4 h-4 ml-auto" strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl px-4 py-4 shadow-sm">
        <p className="text-[10px] font-bold text-sw-grey uppercase tracking-[0.12em] mb-1">{t('app.common.yourJourney')}</p>
        <ul>
          <JourneyStep label={t('app.common.journeyCreateAccount')} state="done" t={t} />
          <JourneyStep label={t('app.common.journeyPersonalise')} state="done" t={t} />
          <JourneyStep label={t('app.common.journeyFirstLesson')} state="next" t={t} />
          <JourneyStep label={t('app.common.journeyFirstBadge')} state={badgeEarned ? 'done' : 'todo'} t={t} />
        </ul>
      </div>

      <Link
        to={continueHref}
        data-testid="dashboard-first-run-course"
        className="flex items-center gap-3 bg-white rounded-2xl px-4 py-4 shadow-sm border border-sw-grey-border active:scale-[0.98] transition-transform"
      >
        <span className="text-2xl flex-shrink-0">📚</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-sw-dark leading-tight">{courseTitle}</p>
          <p className="text-xs text-sw-grey mt-0.5">
            {totalDays} {unit === 'Day' ? t('app.common.days') : t('app.common.lessons')}
          </p>
        </div>
        <Chevron className="w-5 h-5 text-sw-grey flex-shrink-0" />
      </Link>
    </>
  )
}

export default function DashboardPage() {
  const { t, locale } = useI18n()
  const [libraryOpen, setLibraryOpen] = useState(false)
  const user = useCurrentUser()
  const progress = useProgress()
  const purchases = usePurchases()
  const focus = user?.focusCategory && user.focusCategory in FOCUS_PATHS ? user.focusCategory : 'ai'
  const fallbackSlug = FOCUS_MISSION[focus] || '28-day-ai-challenge'
  const lastSlug = progress?.lastOpened?.courseId
  const lastCourse = useCourse(lastSlug)
  const fallbackCourse = useCourse(fallbackSlug)
  const waitingLast = Boolean(lastSlug) && lastCourse === undefined
  if (user === undefined || progress === undefined || waitingLast || fallbackCourse === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center pb-20">
        <div className="w-8 h-8 border-2 border-sw-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const name = firstName(user?.name, t('app.common.there'))
  const target = pickHomeContinue({
    lastOpened: progress.lastOpened,
    lastCourse,
    fallbackSlug,
    fallbackCourse,
    progress: progress.lessons,
  })
  const missionSlug = target?.courseSlug ?? fallbackSlug
  const nextLesson = target?.lesson
  const catalog = progressCourses(locale)[missionSlug]
  const completed = new Set(
    progress.lessons.filter((row) => row.courseId === missionSlug && row.status === 'completed').map((row) => row.lessonSlug),
  )
  const missionDone = completed.size
  const totalDays = target?.course.totalDays ?? catalog?.totalLessons ?? 28
  const courseTitle = target?.course.title ?? catalog?.name ?? '28-Day AI Challenge'
  const unit = ((getHub(missionSlug, locale).unitLabel as string) || 'days') === 'days' ? t('app.common.day') : t('app.common.lesson')
  const xp = progress.user.xp
  const streak = progress.user.streakCount
  const today = todayIso()
  const todayDone = progress.user.lastActivityDate === today
  const streakRisk = streak > 0 && !todayDone
  const week = mondayWeek(undefined, locale)
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
  const pacePref =
    PROFILE_PACES.find((item) => item.value === user?.pacePreference)?.value ?? 'ignite'
  const pace = paceDesc(locale, pacePref)
  const paceShort = pace.replace(/\/(day|день)$/, '')
  const continueHref = nextLesson ? `/app/courses/${missionSlug}/${nextLesson.id}` : `/app/courses/${missionSlug}`
  const pathHref = FOCUS_PATHS[focus] || '/app/ai-and-technology'
  const missionPct = totalDays > 0 ? Math.round((missionDone / totalDays) * 100) : 0
  const startedHere = missionDone > 0 || progress.lastOpened?.courseId === missionSlug
  const ctaLabel = startedHere
    ? t('app.common.continueDay')
        .replace('{unit}', unit)
        .replace('{n}', String(nextLesson?.dayNumber ?? missionDone + 1))
    : t('app.common.startDay')
        .replace('{unit}', unit)
        .replace('{n}', String(nextLesson?.dayNumber ?? 1))
  const featuredKey =
    DASHBOARD_PATHS.find((key) => PATH_META[key].focus === focus) ?? 'ai-and-technology'
  const gridKeys = DASHBOARD_PATHS.filter((key) => key !== featuredKey)
  const featured = PATH_META[featuredKey]
  const firstRun = progress.lessons.every((row) => row.status !== 'completed')
  const badgeEarned = progress.badges.some((badge) => badge.badgeId === 'first-step')
  const paceMinutes = pace.match(/\d+/)?.[0] ?? '15'

  return (
    <main className="max-w-2xl mx-auto px-4 pt-5 pb-36 space-y-4">
      {firstRun ? (
        <FirstRunHome
          name={name}
          paceMinutes={paceMinutes}
          courseTitle={courseTitle}
          unit={unit}
          nextLesson={nextLesson}
          continueHref={continueHref}
          badgeEarned={badgeEarned}
          totalDays={totalDays}
          t={t}
        />
      ) : (
        <>
      <div className="pt-1 pb-0.5">
        <p className="text-xs font-semibold text-sw-grey uppercase tracking-widest mb-0.5">{greetingLabel(undefined, locale)}</p>
        <h1 className="text-2xl font-extrabold text-sw-dark leading-tight">{t('app.common.heyName').replace('{name}', name)}</h1>
        <p className="text-sm text-sw-grey mt-1">
          {t('app.common.dayOfPlan')
            .replace('{day}', String(planDay))
            .replace('{plan}', plan.label)
            .replace('{pace}', pace)}
        </p>
      </div>

      <div
        className="rounded-2xl overflow-hidden shadow-md"
        style={{ background: 'linear-gradient(135deg, hsl(var(--sw-blue)) 0%, hsl(224 70% 38%) 100%)' }}
      >
        <div className="p-5 pb-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.14em]">{t('app.common.todayMission')}</p>
            <span className="text-white/50 text-xs font-medium">
              {t('app.common.daysProgress').replace('{done}', String(missionDone)).replace('{total}', String(totalDays))}
            </span>
          </div>
          <h2 className="text-white font-extrabold text-xl leading-tight mb-0.5">
            {nextLesson ? `${unit} ${nextLesson.dayNumber} · ${nextLesson.title}` : courseTitle}
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
            <p className="text-sm font-bold text-sw-dark leading-tight">{t('app.common.streakAtRisk').replace('{n}', String(streak))}</p>
            <p className="text-xs text-sw-grey mt-0.5">{t('app.common.streakKeepAlive')}</p>
          </div>
          <Link
            to={continueHref}
            className="flex-shrink-0 text-xs font-bold text-sw-blue bg-sw-blue-light px-3 py-1.5 rounded-full active:scale-95 transition-transform"
          >
            {t('app.common.go')}
          </Link>
        </div>
      ) : null}

      <div className="bg-white rounded-2xl px-4 py-4 shadow-sm">
        <p className="text-[10px] font-bold text-sw-grey uppercase tracking-[0.12em] mb-3">{t('app.common.thisWeek')}</p>
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
        </>
      )}

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-3.5 shadow-sm text-center">
          <p className="text-lg font-extrabold text-sw-blue leading-none">{xp}</p>
          <p className="text-[11px] text-sw-grey font-semibold mt-1.5 uppercase tracking-wide">{t('app.common.xpEarnedLabel')}</p>
        </div>
        <div className="bg-white rounded-xl p-3.5 shadow-sm text-center">
          <div className="flex items-center justify-center gap-1 leading-none">
            <span className="text-base leading-none">🔥</span>
            <p className="text-lg font-extrabold text-sw-dark leading-none">{streak}</p>
          </div>
          <p className="text-[11px] text-sw-grey font-semibold mt-1.5 uppercase tracking-wide">{t('app.common.dayStreak')}</p>
        </div>
        <div className="bg-white rounded-xl p-3.5 shadow-sm text-center">
          <p className="text-lg font-extrabold text-sw-dark leading-none">{planPct}%</p>
          <p className="text-[11px] text-sw-grey font-semibold mt-1.5 uppercase tracking-wide">{t('app.common.plan')}</p>
        </div>
      </div>

      <Link
        to="/app/mindora"
        className="block bg-gradient-to-br from-[hsl(var(--sw-blue))] to-[hsl(221,83%,42%)] rounded-2xl px-4 py-4 shadow-md active:scale-[0.98] transition-transform"
      >
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-lg">
            🧠
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-white font-extrabold text-sm leading-tight">{t('app.common.askMindora')}</p>
            <p className="text-white/70 text-xs mt-0.5 leading-snug">{t('app.common.askMindoraSub')}</p>
          </div>
          <Chevron className="w-5 h-5 text-white/60 flex-shrink-0" strokeWidth={2.5} />
        </div>
        <p className="text-white/50 text-[11px] font-medium mt-2.5 pl-[52px]">
          {t('app.common.aiTipOfDay')} {t('app.common.askMindoraTip')}
        </p>
      </Link>

      <div>
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-sm font-bold text-sw-dark uppercase tracking-wide">{t('app.common.explorePaths')}</p>
          <Link to={pathHref} className="text-xs font-semibold text-sw-blue">
            {t('app.common.seeAll')}
          </Link>
        </div>
        <div className="space-y-2">
          <Link
            to={`/app/${featuredKey}`}
            className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border-2 border-sw-blue/30 active:scale-[0.98] transition-all"
          >
            <span className="text-2xl flex-shrink-0">{featured.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-sw-dark leading-tight">{pathShort(locale, featuredKey)}</p>
              <p className="text-xs text-sw-grey mt-0.5">{t(COURSE_COUNT_KEYS[featuredKey])} · {t('app.common.yourPath')}</p>
            </div>
            <span className="text-[10px] font-bold text-sw-blue uppercase tracking-wide flex-shrink-0">{t('app.common.activeCheck')}</span>
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
                  <span className="text-xs font-semibold text-sw-dark leading-tight truncate">{pathShort(locale, key)}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {purchases === undefined ? null : purchases.has('ultimate-prompt-library') ? (
        <Link
          data-testid="dashboard-prompt-library-link"
          to="/app/prompt-library"
          className="flex items-center gap-3 bg-gradient-to-r from-sw-blue to-blue-700 rounded-2xl p-4 text-white active:scale-[0.98] transition-transform shadow-sm"
        >
          <span className="text-2xl">⚡</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm">{t('app.common.promptLibrary')}</h3>
            <p className="text-blue-100 text-[11px] mt-0.5">{t('app.common.promptLibrarySub')}</p>
          </div>
          <Chevron className="w-5 h-5 text-blue-200 flex-shrink-0" />
        </Link>
      ) : (
        <button
          type="button"
          data-testid="dashboard-prompt-library-upsell"
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
                <h3 className="font-extrabold text-sm text-sw-dark">{t('app.common.aiPromptLibrary')}</h3>
                <span
                  className="text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: 'hsl(var(--sw-coral))' }}
                >
                  {t('app.common.new')}
                </span>
              </div>
              <p className="text-[11px] text-sw-grey mt-0.5 leading-snug">{t('app.common.promptLibraryUpsell')}</p>
            </div>
            <Chevron className="w-5 h-5 flex-shrink-0" strokeWidth={2} style={{ color: 'rgb(195, 136, 34)' }} />
          </div>
        </button>
      )}

      <Link
        data-testid="dashboard-planner-link"
        to="/app/planners"
        className="flex items-center gap-3 bg-gradient-to-r from-sw-teal to-sw-blue rounded-2xl p-4 text-white active:scale-[0.98] transition-transform shadow-sm"
      >
        <span className="text-2xl">🗓️</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm">{t('app.common.yourPlanners')}</h3>
          <p className="text-white/80 text-[11px] mt-0.5">{t('app.common.plannersSub')}</p>
        </div>
        <Chevron className="w-5 h-5 text-white/70 flex-shrink-0" strokeWidth={2} />
      </Link>
      {libraryOpen ? <PromptLibraryModal onClose={() => setLibraryOpen(false)} /> : null}
    </main>
  )
}
