import { BADGES, badgeKey } from '@/content/badges'
import { LEVELS, levelEmoji, levelForXp, levelTitleKey } from '@/content/levels'
import { rollingWeek, todayIso } from '@/content/lms'
import { progressCourses } from '@/content/progress-catalog'
import { useI18n } from '@/i18n/I18nProvider'
import { useProgress } from '@/lib/lmsQueries'

export default function ProgressPage() {
  const { t, locale } = useI18n()
  const progress = useProgress()
  const dateLocale = locale === 'ru' ? 'ru-RU' : 'en-GB'

  if (progress === undefined) {
    return (
      <div className="min-h-screen bg-sw-grey-light flex items-center justify-center pb-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-sw-blue border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-sw-grey font-medium">{t('app.progress.loading')}</p>
        </div>
      </div>
    )
  }

  const { lessons, badges, user } = progress
  const xp = user?.xp ?? 0
  const streak = user?.streakCount ?? 0
  const lastActivity = user?.lastActivityDate ?? null
  const completed = lessons.filter((lesson) => lesson.status === 'completed')
  const earnedIds = new Set(badges.map((badge) => badge.badgeId))
  const byCourse: Record<string, { completed: number; xp: number }> = {}
  for (const lesson of completed) {
    if (!byCourse[lesson.courseId]) byCourse[lesson.courseId] = { completed: 0, xp: 0 }
    byCourse[lesson.courseId].completed += 1
    byCourse[lesson.courseId].xp += lesson.xpEarned ?? 0
  }
  const courseRows = Object.entries(byCourse).sort((a, b) => b[1].xp - a[1].xp)
  const { current, next, progressPct, xpToNext } = levelForXp(xp)
  const days = rollingWeek(undefined, locale)
  const recent = new Set(
    completed
      .filter((lesson) => lesson.completedAt && lesson.completedAt > Date.now() - 7 * 86400000)
      .map((lesson) => new Date(lesson.completedAt as number).toISOString().split('T')[0]),
  )
  const todayDone = lastActivity === todayIso()

  return (
    <div className="min-h-screen bg-sw-grey-light pb-28">
      <div className="bg-white border-b border-sw-grey-border px-4 pt-4 pb-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-sw-dark">{t('app.progress.title')}</h1>
        <p className="text-xs text-sw-grey mt-0.5">{t('app.progress.subtitle')}</p>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-5 space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-sw-grey-border">
            <div className="text-2xl font-extrabold text-sw-blue">{xp.toLocaleString()}</div>
            <div className="text-[11px] text-sw-grey font-semibold mt-0.5">{t('app.progress.totalXp')}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-sw-grey-border">
            <div className="text-2xl font-extrabold text-sw-amber">{streak}</div>
            <div className="text-[11px] text-sw-grey font-semibold mt-0.5">{t('app.common.dayStreakFire')}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-sw-grey-border">
            <div className="text-2xl font-extrabold text-sw-success">{completed.length}</div>
            <div className="text-[11px] text-sw-grey font-semibold mt-0.5">{t('app.progress.lessonsDone')}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-sw-grey-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-sw-blue bg-sw-blue-light px-2 py-0.5 rounded-full">
                  {t('app.progress.level').replace('{n}', String(current.level))}
                </span>
                <span className="text-base font-extrabold text-sw-dark">{t(levelTitleKey(current.level))}</span>
              </div>
              {next ? (
                <p className="text-xs text-sw-grey mt-1">
                  {t('app.progress.xpTo').replace('{xp}', xpToNext.toLocaleString())}{' '}
                  <strong className="text-sw-dark">{t(levelTitleKey(next.level))}</strong>
                </p>
              ) : (
                <p className="text-xs text-sw-grey mt-1">{t('app.progress.maxLevel')}</p>
              )}
            </div>
            <div className="text-3xl">{levelEmoji(current.level)}</div>
          </div>
          <div className="w-full bg-sw-grey-light rounded-full h-3 overflow-hidden">
            <div className="h-3 rounded-full bg-sw-blue transition-all duration-700" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-sw-grey font-medium">{current.min.toLocaleString()} XP</span>
            {next ? <span className="text-[10px] text-sw-grey font-medium">{next.min.toLocaleString()} XP</span> : null}
          </div>
          <div className="flex gap-1 mt-4">
            {LEVELS.filter((level) => level.level <= 7).map((level) => (
              <div
                key={level.level}
                className={`flex-1 rounded-full h-1.5 ${xp >= level.min ? 'bg-sw-blue' : 'bg-sw-grey-border'}`}
                title={t('app.progress.levelTooltip')
                  .replace('{n}', String(level.level))
                  .replace('{title}', t(levelTitleKey(level.level)))}
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-sw-grey-border">
          <h2 className="text-sm font-bold text-sw-dark mb-4">{t('app.common.thisWeek')}</h2>
          <div className="flex justify-between">
            {days.map((day) => {
              const isToday = day.date === todayIso()
              const done = recent.has(day.date)
              return (
                <div key={day.date} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-base
                      ${done ? 'bg-sw-blue shadow-sm' : isToday && todayDone ? 'bg-sw-blue' : 'bg-sw-grey-light border border-sw-grey-border'}`}
                  >
                    {done ? '✓' : isToday ? '•' : ''}
                  </div>
                  <span className={`text-[10px] font-semibold ${isToday ? 'text-sw-blue' : 'text-sw-grey'}`}>{day.long}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-sw-dark mb-3 px-1">{t('app.progress.myCourses')}</h2>
          {courseRows.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-sw-grey-border">
              <div className="text-3xl mb-2">📚</div>
              <p className="text-sm font-semibold text-sw-dark">{t('app.progress.noCourses')}</p>
              <p className="text-xs text-sw-grey mt-1">{t('app.progress.noCoursesSub')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {courseRows.map(([slug, row]) => {
                const catalog = progressCourses(locale)[slug]
                if (!catalog) return null
                const pct = Math.min(100, Math.round((row.completed / catalog.totalLessons) * 100))
                const complete = pct === 100
                return (
                  <div key={slug} className="bg-white rounded-2xl p-4 shadow-sm border border-sw-grey-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sw-grey-light flex items-center justify-center text-xl flex-shrink-0">
                          {catalog.emoji}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-sw-dark leading-tight">{catalog.name}</p>
                          <p className="text-[11px] text-sw-grey mt-0.5">{catalog.category}</p>
                        </div>
                      </div>
                      {complete ? (
                        <span className="text-[10px] font-bold text-sw-success bg-green-50 border border-sw-success/20 px-2 py-1 rounded-full whitespace-nowrap">
                          {t('app.common.completeCheck')}
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-sw-blue whitespace-nowrap">
                          {row.completed}/{catalog.totalLessons}
                        </span>
                      )}
                    </div>
                    <div
                      className="w-full bg-sw-grey-light rounded-full h-2 overflow-hidden"
                      role="progressbar"
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={t('app.common.namedProgressAria').replace('{title}', catalog.name).replace('{pct}', String(pct))}
                    >
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${complete ? 'bg-sw-success' : 'bg-sw-blue'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-[10px] text-sw-grey">{t('app.progress.pctComplete').replace('{pct}', String(pct))}</span>
                      <span className="text-[10px] text-sw-amber font-semibold">
                        {t('app.common.xpEarnedPlus').replace('{n}', String(row.xp))}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-sm font-bold text-sw-dark mb-3 px-1">
            {t('app.progress.badges')}
            <span className="ml-2 text-xs font-semibold text-sw-grey">
              {t('app.progress.badgesEarned')
                .replace('{earned}', String(earnedIds.size))
                .replace('{total}', String(BADGES.length))}
            </span>
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {BADGES.map((badge) => {
              const earned = earnedIds.has(badge.id)
              const row = badges.find((item) => item.badgeId === badge.id)
              const earnedOn = row
                ? new Date(row.earnedAt).toLocaleDateString(dateLocale, { day: 'numeric', month: 'short', year: 'numeric' })
                : null
              return (
                <div
                  key={badge.id}
                  className={`bg-white rounded-2xl p-4 shadow-sm border transition-all
                    ${earned ? 'border-sw-blue/20 bg-gradient-to-br from-white to-blue-50' : 'border-sw-grey-border opacity-50'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`text-2xl flex-shrink-0 ${earned ? '' : 'grayscale'}`}>{earned ? badge.emoji : '🔒'}</div>
                    <div className="min-w-0">
                      <p className={`text-sm font-bold leading-tight ${earned ? 'text-sw-dark' : 'text-sw-grey'}`}>
                        {t(badgeKey(badge.id, 'label'))}
                      </p>
                      <p className="text-[11px] text-sw-grey mt-0.5 leading-snug">
                        {earned ? t(badgeKey(badge.id, 'description')) : t(badgeKey(badge.id, 'unlock'))}
                      </p>
                      {earned && earnedOn ? (
                        <p className="text-[10px] text-sw-blue font-semibold mt-1">
                          {t('app.progress.earnedOn').replace('{date}', earnedOn)}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
