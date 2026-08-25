import { useState } from 'react'
import {
  COURSE_GROUPS,
  LIBRARY_PREVIEW,
  LIBRARY_TABS,
  LIBRARY_THEME,
  TAB_TAGS,
} from '@/marketing/data/financialWellbeing'
import useReveal from '@/marketing/hooks/useReveal'

export default function FwLibrary() {
  const [tab, setTab] = useState('all')
  const [open, setOpen] = useState<Set<string>>(new Set())
  const revealRef = useReveal(0.05)

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const tags = tab !== 'all' ? (TAB_TAGS[tab] ?? []) : []
  const groups = COURSE_GROUPS.map((group) => ({
    ...group,
    courses:
      tab === 'all' ? group.courses : group.courses.filter((c) => c.tags.some((t) => tags.includes(t))),
  })).filter((group) => group.courses.length > 0)
  const count = groups.reduce((sum, g) => sum + g.courses.length, 0)

  return (
    <div id="course-library">
      <div className="border-b border-sw-grey-border bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <div
            className="flex items-center gap-2 overflow-x-auto"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
            role="tablist"
            aria-label="Filter courses"
          >
            {LIBRARY_TABS.map((item) => {
              const active = tab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setTab(item.id)
                    setOpen(new Set())
                  }}
                  className="shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all"
                  style={
                    active
                      ? {
                          background: 'linear-gradient(135deg, #D97706, #F59E0B)',
                          color: 'white',
                          fontWeight: 700,
                        }
                      : {
                          background: '#F9FAFB',
                          color: '#6B7280',
                          border: '1px solid #E5E7EB',
                        }
                  }
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div ref={revealRef} className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="mb-8 text-sm text-sw-grey">
          Showing{' '}
          <span className="font-semibold text-sw-dark">
            {count} courses
          </span>
          {tab !== 'all' ? ' matching your filter' : null}
        </p>
        <div className="space-y-10">
          {groups.map((group, i) => {
            const theme = LIBRARY_THEME[group.color]
            const expanded = open.has(group.id)
            const visible = expanded ? group.courses : group.courses.slice(0, LIBRARY_PREVIEW)
            const more = group.courses.length > LIBRARY_PREVIEW
            return (
              <div key={group.id} className={`reveal reveal-delay-${Math.min(i + 1, 5)}`}>
                <div
                  className="mb-5 flex items-center gap-3 rounded-2xl p-4"
                  style={{ background: theme.header }}
                >
                  <span className="text-3xl">{group.emoji}</span>
                  <div>
                    <h3 className="text-lg leading-tight font-extrabold text-white">{group.title}</h3>
                    <p className="text-xs text-white/65">{group.subtitle}</p>
                  </div>
                  <div className="ml-auto shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/60">
                    {group.courses.length} courses
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {visible.map((course) => (
                    <div
                      key={course.id}
                      className="group flex cursor-pointer flex-col gap-3 rounded-xl border border-sw-grey-border bg-white p-4 transition-all hover:border-transparent hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm leading-snug font-semibold text-sw-dark transition-colors group-hover:text-sw-blue">
                          {course.title}
                        </h4>
                        <div className="flex shrink-0 gap-1.5">
                          {course.isBestseller ? (
                            <span
                              className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                              style={{ background: theme.badge, color: theme.badgeText }}
                            >
                              Bestseller
                            </span>
                          ) : null}
                          {course.isNew ? (
                            <span className="rounded-full bg-sw-blue-light px-2 py-0.5 text-[10px] font-bold text-sw-blue">
                              New
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed text-sw-grey">{course.description}</p>
                      <div className="flex items-center gap-3 text-xs text-sw-grey">
                        <span>📚 {course.lessons} lessons</span>
                        <span>⏱ {course.duration}</span>
                        <span
                          className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold"
                          style={{ background: theme.levelBg, color: theme.levelText }}
                        >
                          {course.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {more ? (
                  <button
                    type="button"
                    onClick={() => toggle(group.id)}
                    className="mt-4 w-full rounded-xl border border-sw-grey-border py-3 text-sm font-semibold text-sw-grey transition-all hover:bg-sw-grey-light hover:text-sw-dark"
                  >
                    {expanded
                      ? '↑ Show less'
                      : `↓ Show ${group.courses.length - LIBRARY_PREVIEW} more courses`}
                  </button>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
