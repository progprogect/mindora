import { homeCopy } from '@/marketing/data/home'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'

export default function PhoneMock() {
  const { locale } = useI18n()
  const copy = homeCopy(locale).phoneMock

  return (
    <div className="min-w-0 w-full">
      <div className="relative mx-auto w-full max-w-[480px] lg:mx-0">
        <div className="animate-float w-full overflow-hidden rounded-2xl border border-sw-grey-border bg-white shadow-2xl">
          <div className="border-b border-sw-grey-border px-5 pt-5 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/mindora-owl.svg"
                  alt="Mindora"
                  width={32}
                  height={32}
                  className="size-8 shrink-0"
                />
                <div>
                  <p className="text-xs text-sw-grey">{copy.welcomeBack}</p>
                  <p className="max-w-[160px] truncate text-xs leading-tight font-semibold text-sw-dark">
                    {copy.roadmapTitle}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-orange-50 px-3 py-1.5">
                <span className="emoji-pulse text-base" aria-hidden="true">
                  🔥
                </span>
                <div>
                  <p className="text-sm leading-none font-bold text-orange-600">12</p>
                  <p className="text-[10px] leading-none text-orange-400">{copy.dayStreak}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 px-5 py-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-sw-dark">{copy.yourProgress}</span>
                <span className="text-xs font-bold text-sw-blue">72%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-sw-grey-light">
                <div className="h-full w-[72%] rounded-full bg-sw-blue" />
              </div>
              <p className="mt-1 text-[11px] text-sw-grey">{copy.progressEncouragement}</p>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-sw-dark">{copy.learningRoadmap}</span>
                <span className="cursor-pointer text-xs font-medium text-sw-blue hover:underline">
                  {copy.viewAllArrow}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {copy.tracks.map((track) => (
                  <div key={track.label} className="flex flex-col items-center gap-1">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-base"
                      style={{ backgroundColor: track.tile }}
                    >
                      <span className="emoji-float" style={{ animationDelay: track.delay }} aria-hidden="true">
                        {track.emoji}
                      </span>
                    </div>
                    <span className="text-[10px] font-medium text-sw-grey">{track.label}</span>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-sw-grey-light">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${track.pct}%`, backgroundColor: track.bar }}
                      />
                    </div>
                    <span className="text-[10px]" style={{ color: track.bar }}>
                      {track.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-sw-dark">{copy.recentAchievements}</span>
                <span className="cursor-pointer text-xs font-medium text-sw-blue hover:underline">
                  {copy.viewAll}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {copy.badges.map((badge) => (
                  <div
                    key={badge.label}
                    className="flex cursor-pointer flex-col items-center gap-1 rounded-xl bg-sw-grey-light/60 p-2 transition-colors hover:bg-sw-blue-light"
                  >
                    <span className="emoji-bounce text-lg" style={{ animationDelay: badge.delay }} aria-hidden="true">
                      {badge.emoji}
                    </span>
                    <span className="text-center text-[9px] leading-tight font-semibold text-sw-dark">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-4 mb-4 flex items-center gap-3 rounded-xl border border-sw-blue-border bg-sw-blue/5 px-4 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sw-blue">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="3" stroke="white" strokeWidth="1.5" />
                <path
                  d="M8 2V1M8 15V14M2 8H1M15 8H14M3.93 3.93L3.22 3.22M12.78 12.78L12.07 12.07M12.07 3.93L12.78 3.22M3.22 12.78L3.93 12.07"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-sw-blue">{copy.todaysAction}</p>
              <p className="truncate text-[11px] text-sw-grey">{copy.todaysActionBody}</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0" aria-hidden="true">
              <path d="M5 3L9 7L5 11" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
