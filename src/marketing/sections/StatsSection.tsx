import { PRESS_NAMES, STATS_BAR } from '@/marketing/data/home'

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden border-y border-sw-grey-border bg-white py-8">
      <div className="pointer-events-none absolute -bottom-1 left-4 z-10 hidden lg:block">
        <img
          src="/assets/mascot.png"
          alt="MindoraAcademy mascot"
          className="emoji-bounce w-14 opacity-90"
        />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="grid w-full grid-cols-2 sm:flex sm:w-auto sm:items-center sm:divide-x sm:divide-sw-grey-border">
            {STATS_BAR.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center px-4 py-3 text-center sm:px-7 ${
                  i === 0 ? 'sm:pl-0' : ''
                } ${i === STATS_BAR.length - 1 ? 'sm:pr-0' : ''} ${
                  i < 2 ? 'border-b border-sw-grey-border sm:border-0' : ''
                } ${i % 2 === 0 ? 'border-r border-sw-grey-border sm:border-0' : ''}`}
              >
                <span className="text-xl font-extrabold text-sw-dark tabular-nums sm:text-2xl">
                  {stat.value}
                </span>
                <span className="mt-0.5 text-xs text-sw-grey">{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="hidden h-8 w-px shrink-0 bg-sw-grey-border sm:block" />
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="mr-1 text-xs tracking-widest text-sw-grey/50 uppercase">AS SEEN IN</span>
            {PRESS_NAMES.map((name) => (
              <span
                key={name}
                className="px-2 text-sm font-bold tracking-wide text-sw-grey/40"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
