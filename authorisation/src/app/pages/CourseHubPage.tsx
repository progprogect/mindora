import { type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import hubChrome from '@/content/catalogs/hub-chrome.json'
import { getHub, lessonXp, liveSlugSet, moduleLessonIds, type Course, type CourseLesson, type CourseModule } from '@/content/catalog'
import { useCourse } from '@/content/useCourse'
import { CATEGORY_LABEL } from '@/content/lms'
import { PROGRESS_COURSES } from '@/content/progress-catalog'
import registry from '@/content/course-registry.json'
import { useProgress } from '@/lib/lmsQueries'

const MODULE_THEMES = [
  { emoji: '🧠', from: '29, 78, 216', to: '37, 99, 235' },
  { emoji: '⚡', from: '5, 150, 105', to: '16, 185, 129' },
  { emoji: '🎨', from: '124, 58, 237', to: '139, 92, 246' },
  { emoji: '💰', from: '217, 119, 6', to: '245, 158, 11' },
  { emoji: '🚀', from: '8, 145, 178', to: '14, 165, 233' },
  { emoji: '💎', from: '190, 24, 93', to: '244, 63, 94' },
]

export default function CourseHubPage() {
  const { slug = '' } = useParams()
  const course = useCourse(slug)
  const progress = useProgress()

  if (!liveSlugSet.has(slug) || course === null) {
    return (
      <main className="max-w-2xl mx-auto px-4 pt-8 pb-36 text-center">
        <p className="text-4xl">🔒</p>
        <h1 className="text-xl font-extrabold mt-3">Coming soon</h1>
        <p className="text-sm text-sw-grey mt-2">This course isn&apos;t live yet.</p>
        <Link to="/app/ai-and-technology" className="inline-block mt-4 font-bold text-sw-blue">
          Back to Learn
        </Link>
      </main>
    )
  }

  if (progress === undefined || course === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center pb-20">
        <div className="w-8 h-8 border-2 border-sw-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const hub = getHub(slug)
  const catalog = PROGRESS_COURSES[slug]
  const categoryKey = (registry as Record<string, { category?: string }>)[slug]?.category || 'ai-and-technology'
  const categoryHref = `/app/${categoryKey}`
  const categoryLabel = catalog?.category || CATEGORY_LABEL[categoryKey] || 'Learn'
  const done = new Set(
    progress.lessons.filter((row) => row.courseId === slug && row.status === 'completed').map((row) => row.lessonSlug),
  )
  const xpEarned = progress.lessons
    .filter((row) => row.courseId === slug && row.status === 'completed')
    .reduce((sum, row) => sum + row.xpEarned, 0)
  const next = course.lessons.find((lesson) => !done.has(lesson.id)) ?? course.lessons[0]
  const completedCount = done.size
  const remaining = Math.max(0, course.totalDays - completedCount)
  const pct = Math.round((completedCount / course.totalDays) * 100)
  const unit = (hub.unitLabel as string) || 'days'
  const unitTitle = unit === 'days' ? 'Days' : 'Lessons'
  const badge = hub.badge as { icon?: string; label?: string } | null
  const outcomes = (hub.outcomeBullets as Array<{ icon: string; text: string }>) || []
  const includes = (hub.includes as Array<{ icon: string; text: string }>)?.length
    ? (hub.includes as Array<{ icon: string; text: string }>)
    : outcomes
  const testimonials = hub.testimonials || []
  const continueHref = `/app/courses/${slug}/${next.id}`
  const started = completedCount > 0
  const ctaLong = started
    ? `Continue — ${unitTitle.slice(0, -1)} ${next.dayNumber}: ${next.title} →`
    : `Start — ${unitTitle.slice(0, -1)} ${next.dayNumber}: ${next.title} →`
  const ctaShort = started ? `Continue — ${unitTitle.slice(0, -1)} ${next.dayNumber} →` : `Start — ${unitTitle.slice(0, -1)} ${next.dayNumber} →`
  const description = String(hub.description || course.subtitle || '')
  const socialProof = String(hub.socialProof || '')
  const certificateChip = String(hub.certificateChip || `${course.title} Certificate`)
  const streak = progress.user.streakCount
  const meta = hubChrome.testimonialMeta
  const wiseTask = started
    ? "You've made a strong start. Wise can help you stay consistent and go deeper."
    : 'Wise can help you stay consistent and go deeper.'
  const wiseHref = `/app/wise?lesson=${encodeURIComponent(course.title)}&task=${encodeURIComponent(wiseTask)}`

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <section className="relative overflow-hidden bg-sw-blue">
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" aria-hidden="true">
          <defs>
            <pattern id="hero-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, white, transparent 70%)', transform: 'translate(30%, -30%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, white, transparent 70%)', transform: 'translate(-30%, 30%)' }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12 sm:pt-14 sm:pb-16">
          <nav className="flex items-center gap-2 text-white/60 text-xs font-medium mb-6" aria-label="Breadcrumb">
            <Link to={categoryHref} className="hover:text-white/90 transition-colors">
              {categoryLabel}
            </Link>
            <span>/</span>
            <span className="text-white/90">{course.title}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              {badge?.label ? (
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5">
                  <span className="text-base">{badge.icon}</span>
                  <span className="text-white text-xs font-bold tracking-wide">{badge.label}</span>
                </div>
              ) : null}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">{course.title}</h1>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
                {description} {socialProof ? <SocialProof text={socialProof} /> : null}
              </p>
              <div className="flex flex-wrap gap-2 mb-7">
                <HeroChip>
                  <span>📅</span>
                  {course.totalDays} {unitTitle}
                </HeroChip>
                <HeroChip>
                  <span>📚</span>
                  {course.modules.length} Modules
                </HeroChip>
                <HeroChip>
                  <span>⚡</span>
                  {course.totalXp} XP
                </HeroChip>
                {hub.level ? (
                  <HeroChip>
                    <span>🟢</span>
                    {String(hub.level)}
                  </HeroChip>
                ) : null}
                {streak > 0 ? (
                  <span className="inline-flex items-center gap-1.5 bg-sw-amber/20 border border-sw-amber/40 text-sw-amber text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
                    🔥 {streak}-day streak
                  </span>
                ) : null}
              </div>
              <div className="mb-6">
                <div className="flex justify-between text-white/70 text-xs font-medium mb-2">
                  <span>
                    {unitTitle.slice(0, -1)} {completedCount} of {course.totalDays} complete
                  </span>
                  <span>{pct}%</span>
                </div>
                <div
                  className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden"
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Course progress: ${pct}%`}
                >
                  <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                </div>
              </div>
              <Link
                to={continueHref}
                className="inline-flex items-center justify-center gap-2 bg-white text-sw-blue font-extrabold text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
              >
                {ctaLong}
              </Link>
              <p className="text-white/50 text-xs mt-3">
                ✅ {completedCount} lessons complete · ⚡ {xpEarned} XP earned
              </p>
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 w-72">
                <div className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">Course includes</div>
                {includes.map((item) => (
                  <div key={item.text} className="flex items-start gap-3 mb-3 last:mb-0">
                    <span className="text-lg mt-0.5 shrink-0">{item.icon}</span>
                    <span className="text-white/80 text-sm leading-relaxed">{item.text}</span>
                  </div>
                ))}
                <div className="flex items-start gap-3 mb-3 last:mb-0">
                  <span className="text-lg mt-0.5 shrink-0">🎓</span>
                  <span className="text-white/80 text-sm leading-relaxed">{certificateChip}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sw-dark py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <DarkStat emoji="🔥" n={streak} label="Day streak" />
            <DarkStat emoji="⚡" n={xpEarned} label={`of ${course.totalXp} XP`} />
            <DarkStat emoji="✅" n={completedCount} label={`${unitTitle} complete`} />
            <DarkStat emoji="📅" n={remaining} label={`${unitTitle} remaining`} />
          </div>
          <Link
            to={wiseHref}
            className="flex items-center gap-3 rounded-xl px-4 py-3 border border-white/10 bg-white/5 hover:bg-white/8 active:scale-[0.98] transition-all"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[10px] font-extrabold"
              style={{ background: 'linear-gradient(135deg, hsl(var(--sw-blue)), hsl(var(--sw-purple)))' }}
            >
              W
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/90 text-xs font-semibold leading-snug">{wiseTask}</p>
              <p className="text-white/40 text-[10px] mt-0.5">Tap to chat with Wise →</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="py-14 sm:py-18 bg-sw-grey-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-sw-amber/10 border border-sw-amber/30 rounded-full px-4 py-1.5 mb-4">
              <span className="text-base">🎓</span>
              <span className="text-sw-dark text-xs font-bold tracking-wide uppercase">{hubChrome.certificateDefaults.kicker}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-sw-dark mb-3">
              {String(hub.headingText || `Complete all ${course.totalDays} ${unit}. Earn your certificate.`)}
            </h2>
            <p className="text-sw-grey text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              {String(hub.subText || '')}
            </p>
          </div>
          <div className="max-w-lg mx-auto relative">
            <div className="relative rounded-2xl overflow-hidden border-2 transition-all duration-500 border-sw-grey-border shadow-md">
              <div className="relative bg-sw-dark px-8 py-8 text-center overflow-hidden">
                <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg" />
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-lg" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-lg" />
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 mb-4 transition-all border-white/20 bg-white/5">
                  <span className="text-3xl">🎓</span>
                </div>
                <div className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                  {hubChrome.certificateDefaults.certificateKicker}
                </div>
                <div className="text-white font-extrabold text-xl sm:text-2xl leading-tight mb-2">{course.title}</div>
                <div className="text-white/60 text-xs mb-4">
                  Awarded to <span className="italic text-white/30">{hubChrome.certificateDefaults.awardedToPlaceholder}</span>
                </div>
                <div className="text-white/40 text-xs leading-relaxed max-w-xs mx-auto">{String(hub.certificateDescription)}</div>
              </div>
              <div className="bg-white px-6 py-5">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-sw-grey mb-2">
                    <span>
                      🔒 {remaining} {unit} remaining to unlock
                    </span>
                    <span className="text-sw-blue">{pct}%</span>
                  </div>
                  <div
                    className="w-full bg-sw-grey-light rounded-full h-2 overflow-hidden"
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Course completion: ${pct}%`}
                  >
                    <div className="h-full bg-sw-blue rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-sw-grey text-xs mt-2 text-center">
                    {started ? `${unitTitle.slice(0, -1)} ${completedCount} complete — keep going!` : 'Your certificate is waiting.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {outcomes.length ? (
            <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {outcomes.map((item) => (
                <div key={item.text} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-sw-grey-border">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <span className="text-sw-dark text-sm font-medium leading-snug">{item.text}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-sw-dark mb-3">{hub.learningPathH2}</h2>
            <p className="text-sw-grey text-sm sm:text-base max-w-md mx-auto">
              {hub.learningPathSub.replace('{totalDays}', String(course.totalDays))}
            </p>
          </div>
          <div className="space-y-8">
            {course.modules.map((module, index) => (
              <ModuleBlock
                key={module.id}
                course={course}
                module={module}
                index={index}
                slug={slug}
                done={done}
                nextId={next.id}
                unit={unitTitle.slice(0, -1)}
              />
            ))}
            <div className="mt-8 pl-2 sm:pl-4 border-l-2 border-sw-grey-border ml-5 relative">
              <div className="absolute -left-[1.35rem] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-white bg-sw-amber" />
              <div className="flex items-center gap-4 p-4 rounded-2xl border-2 transition-all border-dashed border-sw-grey-border bg-sw-grey-light opacity-70">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-sw-grey-border">🎓</div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-sw-grey mb-0.5">Final Goal</div>
                  <div className="text-sm font-extrabold text-sw-dark">{certificateChip}</div>
                  <div className="text-xs text-sw-grey mt-0.5">Complete all {course.totalDays} lessons to earn your certificate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {testimonials.length ? (
        <section className="py-14 sm:py-18 bg-sw-grey-light">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="flex -space-x-2">
                  {['A', 'B', 'C', 'D', 'E'].map((letter) => (
                    <div
                      key={letter}
                      className="w-8 h-8 rounded-full bg-sw-blue flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <span className="text-sw-dark font-bold text-sm">{meta.learnerCount}</span>
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star18 key={i} />
                ))}
                <span className="text-sw-dark font-bold text-sm ml-1">{meta.averageRating}</span>
              </div>
              <p className="text-sw-grey text-sm">{meta.reviewCount}</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {testimonials.map((item) => (
                <div key={item.name} className="bg-white rounded-2xl p-5 border border-sw-grey-border shadow-sm">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: item.rating ?? 5 }).map((_, i) => (
                      <Star13 key={i} />
                    ))}
                  </div>
                  <p className="text-sw-dark text-sm leading-relaxed mb-4 italic">&ldquo;{item.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-sw-blue-light border border-sw-blue-border flex items-center justify-center text-sw-blue text-xs font-bold shrink-0">
                      {item.avatar}
                    </div>
                    <div>
                      <div className="text-sw-dark text-sm font-bold">{item.name}</div>
                      <div className="text-sw-grey text-xs">{item.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-14 sm:py-18 bg-sw-blue">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">{hub.ctaH2 || 'Ready to start?'}</h2>
          <p className="text-white/75 text-sm sm:text-base mb-7 leading-relaxed">{hub.ctaBody || course.subtitle}</p>
          <Link
            to={continueHref}
            className="inline-flex items-center justify-center gap-2 bg-white text-sw-blue font-extrabold text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            {ctaShort}
          </Link>
        </div>
      </section>
      <div className="h-20 sm:hidden" aria-hidden="true" />
    </div>
  )
}

function ModuleBlock({
  course,
  module,
  index,
  slug,
  done,
  nextId,
  unit,
}: {
  course: Course
  module: CourseModule
  index: number
  slug: string
  done: Set<string>
  nextId: string
  unit: string
}) {
  const theme = MODULE_THEMES[index % MODULE_THEMES.length]
  const ids = moduleLessonIds(course, module)
  const moduleDone = ids.filter((id) => done.has(id)).length
  const number = module.moduleNumber ?? index + 1
  return (
    <div className="relative">
      <div
        className="rounded-2xl p-4 mb-4 flex items-center gap-4"
        style={{
          background: `linear-gradient(135deg, rgba(${theme.from}, 0.082), rgba(${theme.to}, 0.03))`,
          border: `1.5px solid rgba(${theme.from}, 0.145)`,
        }}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
          style={{ background: `linear-gradient(135deg, rgb(${theme.from}), rgb(${theme.to}))` }}
        >
          {theme.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-widest text-sw-grey">Module {number}</span>
            {module.days ? (
              <>
                <span className="text-[10px] text-sw-grey">·</span>
                <span className="text-[10px] text-sw-grey">{module.days}</span>
              </>
            ) : null}
          </div>
          <div className="text-sm font-extrabold text-sw-dark leading-tight">{module.title}</div>
          {module.subtitle ? (
            <div className="text-xs text-sw-grey leading-snug mt-0.5 hidden sm:block">{module.subtitle}</div>
          ) : null}
        </div>
        <div className="shrink-0 text-right">
          <div className="text-xs font-bold text-sw-dark">
            {moduleDone}/{ids.length || module.lessons?.length || 0}
          </div>
          <div className="text-[10px] text-sw-grey">lessons</div>
        </div>
      </div>
      <div className="space-y-2 pl-2 sm:pl-4 border-l-2 border-sw-grey-border ml-5">
        {ids.map((id) => {
          const lesson = course.lessons.find((item) => item.id === id)
          if (!lesson) return null
          const last = ids[ids.length - 1] === id
          return (
            <LessonRow
              key={id}
              slug={slug}
              lesson={lesson}
              complete={done.has(id)}
              isNext={nextId === id}
              checkpoint={last}
              emoji={theme.emoji}
              unit={unit}
            />
          )
        })}
      </div>
    </div>
  )
}

function LessonRow({
  slug,
  lesson,
  complete,
  isNext,
  checkpoint,
  emoji,
  unit,
}: {
  slug: string
  lesson: CourseLesson
  complete: boolean
  isNext: boolean
  checkpoint: boolean
  emoji: string
  unit: string
}) {
  const href = `/app/courses/${slug}/${lesson.id}`
  const xp = lessonXp(lesson)
  const duration = lesson.duration || '5 min'
  const dot = complete || isNext ? 'bg-sw-blue' : 'bg-sw-grey-border'
  if (checkpoint) {
    return (
      <div className="relative">
        <div className={`absolute -left-[1.35rem] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-white ${dot}`} />
        <Link to={href} className="block hover:scale-[1.01] transition-transform">
          <div
            className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all duration-200 ${
              isNext ? 'border-sw-blue bg-white' : complete ? 'border-sw-blue/20 bg-sw-blue-light/50' : 'border-sw-grey-border bg-white opacity-60'
            }`}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: complete || isNext ? undefined : 'hsl(var(--sw-grey-light))' }}
            >
              {complete ? <CheckIcon /> : <span className="text-xl">{emoji}</span>}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-bold uppercase tracking-widest text-sw-grey mb-0.5">
                {unit} {lesson.dayNumber} · Module Checkpoint
              </div>
              <div className={`text-sm font-extrabold leading-snug ${complete || isNext ? 'text-sw-dark' : 'text-sw-grey'}`}>{lesson.title}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-sw-grey">{duration}</span>
                <span className="text-[10px] font-bold text-sw-amber">⚡ {xp} XP</span>
              </div>
            </div>
            {isNext ? <div className="bg-sw-blue text-white text-[9px] font-bold px-2 py-1 rounded-full">Next</div> : null}
          </div>
        </Link>
      </div>
    )
  }
  return (
    <div className="relative">
      <div className={`absolute -left-[1.35rem] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-white ${dot}`} />
      <Link to={href} className="block hover:scale-[1.005] transition-transform">
        <div
          className={`flex items-center gap-3 py-3 px-3 rounded-xl border transition-all duration-200 ${
            isNext
              ? 'border-sw-blue bg-white shadow-sm'
              : complete
                ? 'border-sw-blue/20 bg-sw-blue-light/50'
                : 'border-sw-grey-border bg-white'
          }`}
        >
          {isNext ? (
            <div className="relative shrink-0">
              <div className="absolute -inset-2 rounded-full bg-sw-blue/20 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute -inset-1 rounded-full bg-sw-blue/15" />
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-sw-blue flex items-center justify-center shadow-lg border-2 border-white">
                <span className="text-white text-xs font-extrabold">{lesson.dayNumber}</span>
              </div>
            </div>
          ) : (
            <div
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 ${
                complete ? 'bg-sw-blue shadow-md' : 'border-2 border-sw-grey-border bg-white'
              }`}
            >
              {complete ? <CheckIcon /> : <span className="text-sw-grey text-xs font-bold">{lesson.dayNumber}</span>}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-semibold text-sw-grey mb-0.5">
              {unit} {lesson.dayNumber}
            </div>
            <div className={`text-sm font-bold leading-snug truncate ${complete || isNext ? 'text-sw-dark' : 'text-sw-grey'}`}>{lesson.title}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[10px] text-sw-grey">{duration}</div>
            <div className="text-[10px] font-bold text-sw-amber mt-0.5">⚡{xp}</div>
          </div>
          {isNext ? (
            <div className="shrink-0">
              <div className="bg-sw-blue text-white text-[9px] font-bold px-2 py-1 rounded-full">Next</div>
            </div>
          ) : null}
        </div>
      </Link>
    </div>
  )
}

function HeroChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
      {children}
    </span>
  )
}

function DarkStat({ emoji, n, label }: { emoji: string; n: string | number; label: string }) {
  return (
    <div className="rounded-xl p-3 text-center border border-white/10 bg-white/5">
      <div className="text-xl mb-1">{emoji}</div>
      <div className="text-lg font-extrabold text-white">{n}</div>
      <div className="text-white/50 text-[10px] font-medium">{label}</div>
    </div>
  )
}

function SocialProof({ text }: { text: string }) {
  const match = text.match(/^(Used by )(.+?)( to .+)$/)
  if (!match) return <>{text}</>
  return (
    <>
      {match[1]}
      <strong className="text-white">{match[2]}</strong>
      {match[3]}
    </>
  )
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 9l3.5 3.5L14 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Star18() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="#F59E0B">
      <path d="M9 1.5l1.68 3.4 3.77.55-2.73 2.66.65 3.76L9 10.02l-3.37 1.77.65-3.76L3.55 5.45l3.77-.55L9 1.5z" />
    </svg>
  )
}

function Star13() {
  return (
    <svg width="13" height="13" viewBox="0 0 12 12" fill="#F59E0B">
      <path d="M6 1l1.12 2.26L9.5 3.64l-1.75 1.7.41 2.4L6 6.65l-2.16 1.1.41-2.41L2.5 3.64l2.38-.38L6 1z" />
    </svg>
  )
}
