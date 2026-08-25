const TRACKS = [
  { emoji: '🧠', label: 'Mindset', pct: 75, delay: '0s', tile: '#8B5CF618', bar: '#8B5CF6' },
  { emoji: '💼', label: 'Career', pct: 60, delay: '0.3s', tile: '#2563EB18', bar: '#2563EB' },
  { emoji: '🤖', label: 'AI', pct: 80, delay: '0.6s', tile: '#06B6D418', bar: '#06B6D4' },
  { emoji: '❤️', label: 'Health', pct: 65, delay: '0.9s', tile: '#10B98118', bar: '#10B981' },
  { emoji: '💰', label: 'Finance', pct: 70, delay: '1.2s', tile: '#F59E0B18', bar: '#F59E0B' },
] as const

const BADGES = [
  { emoji: '⭐', label: 'Consistent Learner', delay: '0s' },
  { emoji: '🎯', label: 'Goal Getter', delay: '0.2s' },
  { emoji: '📚', label: 'Knowledge Seeker', delay: '0.4s' },
  { emoji: '👑', label: 'Growth Mindset', delay: '0.6s' },
] as const

export default function PhoneMock() {
  return (
    <div className="min-w-0 w-full">
      <div className="relative mx-auto w-full max-w-[480px] lg:mx-0">
        <div className="animate-float w-full overflow-hidden rounded-2xl border border-sw-grey-border bg-white shadow-2xl">
          <div className="border-b border-sw-grey-border px-5 pt-5 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg width="32" height="32" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="sw-phone-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#1D4ED8" />
                    </linearGradient>
                    <linearGradient id="sw-phone-shine" x1="0" y1="0" x2="0" y2="36" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="white" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <filter id="sw-phone-shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1D4ED8" floodOpacity="0.35" />
                    </filter>
                  </defs>
                  <rect width="36" height="36" rx="7.04" fill="url(#sw-phone-bg)" filter="url(#sw-phone-shadow)" />
                  <rect width="36" height="36" rx="7.04" fill="url(#sw-phone-shine)" />
                  <rect x="4.5" y="20.5" width="5.5" height="11" rx="2.75" fill="white" opacity="0.6" />
                  <rect x="15" y="15" width="5.5" height="16.5" rx="2.75" fill="white" opacity="0.8" />
                  <rect x="25.5" y="8" width="5.5" height="23.5" rx="2.75" fill="white" />
                  <path
                    d="M28.25 1.25 L29.3 3.2 L31.5 4.5 L29.3 5.8 L28.25 7.75 L27.2 5.8 L25 4.5 L27.2 3.2 Z"
                    fill="white"
                    opacity="0.95"
                  />
                </svg>
                <div>
                  <p className="text-xs text-sw-grey">Welcome back, Alex 👋</p>
                  <p className="max-w-[160px] truncate text-xs leading-tight font-semibold text-sw-dark">
                    Your Personalised Roadmap
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-orange-50 px-3 py-1.5">
                <span className="emoji-pulse text-base" aria-hidden="true">
                  🔥
                </span>
                <div>
                  <p className="text-sm leading-none font-bold text-orange-600">12</p>
                  <p className="text-[10px] leading-none text-orange-400">day streak</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 px-5 py-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-sw-dark">Your Progress</span>
                <span className="text-xs font-bold text-sw-blue">72%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-sw-grey-light">
                <div className="h-full w-[72%] rounded-full bg-sw-blue" />
              </div>
              <p className="mt-1 text-[11px] text-sw-grey">Keep going! You&apos;re doing great.</p>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-sw-dark">Learning Roadmap</span>
                <span className="cursor-pointer text-xs font-medium text-sw-blue hover:underline">View All →</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {TRACKS.map((track) => (
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
                <span className="text-xs font-semibold text-sw-dark">Recent Achievements</span>
                <span className="cursor-pointer text-xs font-medium text-sw-blue hover:underline">View All</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {BADGES.map((badge) => (
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
              <p className="text-xs font-semibold text-sw-blue">Today&apos;s Action</p>
              <p className="truncate text-[11px] text-sw-grey">Block 20 mins today to review your Q3 goals</p>
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
