import { Link } from 'react-router-dom'
import { getLiveCards, getPath, liveSlugSet } from '@/content/catalog'
import { PATH_META } from '@/content/lms'
import { useProgress } from '@/lib/lmsQueries'

type Props = { pathKey: string }

type LiveCard = {
  id: string
  path?: string
  badge?: string
  badgeColor?: string
  gradient?: string
  emoji?: string
  duration?: string
  title: string
  subtitle?: string
  lessons?: number
  xp?: number
  courseNumber?: string
  difficulty?: string
  lessonsModules?: string
}

const RING = 2 * Math.PI * 22

const HERO_BG: Record<string, string> = {
  'ai-and-technology': 'linear-gradient(135deg, rgb(17, 71, 187) 0%, rgb(36, 99, 235) 50%, rgb(82, 105, 224) 100%)',
  'success-mindset': 'linear-gradient(135deg, rgb(109, 40, 217) 0%, rgb(124, 58, 237) 50%, rgb(167, 139, 250) 100%)',
  career: 'linear-gradient(135deg, rgb(15, 118, 110) 0%, rgb(13, 148, 136) 50%, rgb(45, 212, 191) 100%)',
  business: 'linear-gradient(135deg, rgb(194, 65, 12) 0%, rgb(234, 88, 12) 50%, rgb(251, 146, 60) 100%)',
  health: 'linear-gradient(135deg, rgb(22, 163, 74) 0%, rgb(34, 197, 94) 50%, rgb(74, 222, 128) 100%)',
  'financial-wellbeing': 'linear-gradient(135deg, rgb(5, 150, 105) 0%, rgb(16, 185, 129) 50%, rgb(52, 211, 153) 100%)',
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

export default function PathCatalogPage({ pathKey }: Props) {
  const path = getPath(pathKey)
  const live = getLiveCards(pathKey)
  const progress = useProgress()
  const meta = PATH_META[pathKey as keyof typeof PATH_META]
  const cards = (live?.cards ?? []) as LiveCard[]
  const completed = progress?.lessons.filter((row) => row.status === 'completed') ?? []
  const xpHere = completed
    .filter((row) => cards.some((card) => card.id === row.courseId))
    .reduce((sum, row) => sum + (row.xpEarned ?? 0), 0)
  const lessonsHere = completed.filter((row) => cards.some((card) => card.id === row.courseId)).length
  const totalLessons = cards.reduce((sum, card) => sum + (card.lessons ?? 0), 0)
  const pathPct = totalLessons > 0 ? Math.round((lessonsHere / totalLessons) * 100) : 0

  const continueCard =
    cards.find((card) => {
      const done = completed.filter((row) => row.courseId === card.id).length
      const total = card.lessons ?? 0
      return liveSlugSet.has(card.id) && done > 0 && (total === 0 || done < total)
    }) ?? cards.find((card) => liveSlugSet.has(card.id))

  const continueDone = continueCard ? completed.filter((row) => row.courseId === continueCard.id).length : 0
  const continueTotal = continueCard?.lessons ?? 0
  const continuePct = continueTotal > 0 ? Math.round((continueDone / continueTotal) * 100) : 0

  if (!path) {
    return (
      <main className="max-w-2xl mx-auto px-4 pt-5 pb-36">
        <h1 className="text-2xl font-extrabold">Path</h1>
      </main>
    )
  }

  const template = path.template
  const title = path.h1
  const emoji = meta?.emoji ?? live?.hero?.emoji ?? '📚'
  const dashOffset = RING * (1 - pathPct / 100)

  return (
    <div className="min-h-screen bg-sw-grey-light pb-28">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-sw-grey-border">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/app/dashboard"
              aria-label="Back to dashboard"
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-sw-grey-light transition-colors"
            >
              <svg className="w-5 h-5 text-sw-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <span className="font-extrabold text-base text-sw-dark tracking-tight">{title}</span>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sw-blue/10 text-sw-blue text-xs font-bold">
            ⚡ {xpHere} XP
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-5 pb-36 space-y-5">
        <div
          className="rounded-2xl overflow-hidden shadow-md p-6 relative"
          style={{ background: HERO_BG[pathKey] ?? HERO_BG['ai-and-technology'] }}
        >
          <div className="absolute top-5 right-5">
            <svg width="52" height="52" viewBox="0 0 52 52" className="transform -rotate-90">
              <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
              <circle
                cx="26"
                cy="26"
                r="22"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={RING}
                strokeDashoffset={dashOffset}
                className="transition-all duration-700"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">{pathPct}%</span>
          </div>
          <span className="text-4xl mb-3 block">{emoji}</span>
          <h1 className="text-white font-extrabold text-2xl leading-tight mb-2">{title}</h1>
          <p className="text-white/70 text-sm leading-relaxed mb-4 max-w-[75%]">{path.tagline}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/15 text-white text-xs font-semibold">
              {cards.length || path.liveSlugs.length} courses
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/15 text-white text-xs font-semibold">
              {lessonsHere} lessons done
            </span>
            {xpHere > 0 ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/15 text-white text-xs font-semibold">
                ⚡ {xpHere} XP earned
              </span>
            ) : null}
          </div>
        </div>

        {template === 'path-catalog-C' ? (
          <div className="bg-white rounded-2xl p-6 text-center border border-sw-grey-border">
            <p className="font-bold text-sw-dark">{live?.emptyCopy?.title ?? 'No courses started yet'}</p>
            <p className="text-sm text-sw-grey mt-1">
              {live?.emptyCopy?.sub ?? 'Courses in this category are coming soon!'}
            </p>
          </div>
        ) : continueCard ? (
          <Link
            to={`/app/courses/${continueCard.id}`}
            className="block rounded-2xl bg-white p-4 shadow-sm border-2 border-sw-blue/20 active:scale-[0.98] transition-all"
          >
            <p className="text-[10px] font-bold text-sw-blue uppercase tracking-[0.12em] mb-2">▶ Continue Learning</p>
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${continueCard.gradient ?? 'from-[#1D4ED8] to-[#2563EB]'} flex items-center justify-center flex-shrink-0`}
              >
                <span className="text-lg">{continueCard.emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-sw-dark leading-tight truncate">{continueCard.title}</h3>
                <p className="text-xs text-sw-grey mt-0.5">
                  Day {Math.min(continueDone + 1, continueTotal || continueDone + 1)} of {continueTotal || '—'}
                </p>
                <div
                  className="mt-2 h-1.5 rounded-full bg-sw-grey-light overflow-hidden"
                  role="progressbar"
                  aria-valuenow={continuePct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${continueCard.title} progress`}
                >
                  <div
                    className="h-full bg-sw-blue rounded-full transition-all duration-500"
                    style={{ width: `${continuePct}%` }}
                  />
                </div>
              </div>
              <Chevron className="w-5 h-5 text-sw-blue flex-shrink-0" />
            </div>
          </Link>
        ) : null}

        {template === 'path-catalog-B' ? (
          <>
            <p className="text-sm font-bold text-sw-dark mb-3 uppercase tracking-wide">Your Courses</p>
            <div className="space-y-3">
              {cards.map((card) => (
                <CourseRow key={card.id} card={card} completed={completed} numbered />
              ))}
            </div>
            <ComingSoonStrip
              items={(path.comingSoonCards ?? []).map((item) => ({
                name: item.name || item.title,
                difficulty: item.difficulty,
                time: item.time,
              }))}
              extraLabel="+8 more courses coming"
            />
          </>
        ) : template === 'path-catalog-C' ? (
          <ComingSoonStrip items={live?.comingSoonStrip ?? []} />
        ) : (
          <>
            <div>
              <p className="text-sm font-bold text-sw-dark mb-3 uppercase tracking-wide">Your Courses</p>
              <div className="space-y-3">
                {cards.map((card) => (
                  <CourseRow key={card.id} card={card} completed={completed} />
                ))}
              </div>
            </div>
            {(path.comingSoonCards?.length ?? 0) > 0 ? (
              <div>
                <p className="text-sm font-bold text-sw-dark mb-3 uppercase tracking-wide">Coming soon</p>
                <div className="space-y-3">
                  {path.comingSoonCards!.map((item) => (
                    <div
                      key={item.title || item.id}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-sw-grey-border/50 opacity-70"
                    >
                      <p className="text-sm font-bold text-sw-dark">🔒 {item.title}</p>
                      <p className="text-xs text-sw-grey mt-1">{item.description}</p>
                      <p className="text-[11px] text-sw-grey mt-2">
                        {item.difficulty} · {item.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        )}

        {Array.isArray(path.browseBySection) ? (
          <div>
            <p className="text-sm font-bold text-sw-dark mb-3 uppercase tracking-wide">Browse by Section</p>
            <div className="grid grid-cols-2 gap-3">
              {path.browseBySection.map((section) => (
                <div
                  key={String(section.id)}
                  className="bg-white rounded-xl p-4 shadow-sm border border-sw-grey-border/50"
                >
                  <span className="text-lg mb-1.5 block">{String(section.icon || '')}</span>
                  <p className="text-xs font-bold text-sw-dark leading-tight mb-0.5">{String(section.title || '')}</p>
                  <p className="text-[11px] text-sw-grey leading-snug mb-2">
                    {String(section.description || section.subtitle || '')}
                  </p>
                  {Array.isArray(section.courses) ? (
                    <span className="text-[10px] font-semibold text-sw-grey bg-sw-grey-light px-2 py-0.5 rounded-full">
                      {section.courses.length} courses
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {live?.badge ? (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-sw-grey-border/50 text-center">
            <span className="text-3xl mb-2 block">🏆</span>
            <p className="text-sm font-bold text-sw-dark mb-1">{live.badge}</p>
            <p className="text-xs text-sw-grey mb-3">Complete 3 courses to earn this badge</p>
            <div className="flex justify-center gap-1.5">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 border-sw-grey-border text-sw-grey/40"
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  )
}

function CourseRow({
  card,
  completed,
  numbered,
}: {
  card: LiveCard
  completed: Array<{ courseId: string; xpEarned: number; status: string }>
  numbered?: boolean
}) {
  const live = liveSlugSet.has(card.id)
  const done = completed.filter((row) => row.courseId === card.id)
  const xp = done.reduce((sum, row) => sum + row.xpEarned, 0)
  const total = card.lessons ?? 0
  const pct = total ? Math.min(100, Math.round((done.length / total) * 100)) : 0
  const inner = (
    <div className="flex items-start gap-3">
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient ?? 'from-sw-grey-light to-sw-grey-border'} flex items-center justify-center flex-shrink-0 shadow-sm`}
      >
        <span className="text-xl">{card.emoji}</span>
      </div>
      <div className="flex-1 min-w-0">
        {card.badge ? (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide mb-1 ${card.badgeColor ?? 'bg-sw-blue-light text-sw-blue'}`}
          >
            {card.badge}
          </span>
        ) : null}
        {numbered && card.courseNumber ? (
          <p className="text-[11px] font-bold text-sw-grey">{card.courseNumber}</p>
        ) : null}
        <h3 className="text-sm font-bold text-sw-dark leading-tight mb-0.5">{card.title}</h3>
        <p className="text-xs text-sw-grey line-clamp-1 mb-2">{card.subtitle}</p>
        <div className="flex items-center gap-3 text-[11px] text-sw-grey">
          {numbered ? (
            <>
              <span>{card.difficulty}</span>
              <span>·</span>
              <span>{card.lessonsModules}</span>
              <span>·</span>
              <span>⚡ {card.xp} XP</span>
            </>
          ) : (
            <>
              <span>{card.lessons} lessons</span>
              <span>·</span>
              <span>{card.xp} XP</span>
              {xp > 0 ? (
                <>
                  <span>·</span>
                  <span className="text-sw-blue font-semibold">⚡ {xp} earned</span>
                </>
              ) : null}
            </>
          )}
        </div>
        {done.length > 0 && total > 0 ? (
          <div className="mt-2.5">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-semibold text-sw-grey">
                {done.length}/{total} complete
              </span>
              <span className="text-[10px] font-bold text-sw-blue">{pct}%</span>
            </div>
            <div
              className="h-1.5 rounded-full bg-sw-grey-light overflow-hidden"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${card.title} progress: ${pct}%`}
            >
              <div className="h-full rounded-full transition-all duration-500 bg-sw-blue" style={{ width: `${pct}%` }} />
            </div>
          </div>
        ) : null}
      </div>
      <Chevron className="w-4 h-4 text-sw-grey mt-1 flex-shrink-0" />
    </div>
  )
  if (!live) {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-sw-grey-border/50 opacity-60">{inner}</div>
    )
  }
  return (
    <Link
      to={card.path || `/app/courses/${card.id}`}
      className="block bg-white rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-all border border-sw-grey-border/50"
    >
      {inner}
    </Link>
  )
}

function ComingSoonStrip({
  items,
  extraLabel,
}: {
  items: Array<{ name?: string; title?: string; difficulty: string; time: string }>
  extraLabel?: string
}) {
  if (!items.length) return null
  const shown = extraLabel ? items.slice(0, 8) : items
  return (
    <div>
      <p className="text-sm font-bold text-sw-dark mb-3 uppercase tracking-wide">
        Coming Soon <span className="text-sw-grey font-semibold normal-case tracking-normal">{items.length} courses</span>
      </p>
      <div className="space-y-2">
        {shown.map((item) => (
          <div
            key={item.name || item.title}
            className="bg-white rounded-2xl p-4 shadow-sm border border-sw-grey-border/50 opacity-70"
          >
            <p className="text-sm font-bold text-sw-dark">🔒 {item.name || item.title}</p>
            <p className="text-[11px] text-sw-grey mt-1">
              {item.difficulty} · {item.time}
            </p>
          </div>
        ))}
      </div>
      {extraLabel && items.length > 8 ? <p className="text-sm text-sw-grey text-center mt-3">{extraLabel}</p> : null}
    </div>
  )
}
