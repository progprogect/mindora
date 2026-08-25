import { LIFE_AREAS_ROW_A, LIFE_AREAS_ROW_B } from '@/marketing/data/home'

function MarqueeRow({
  items,
  reverse,
}: {
  items: readonly { emoji: string; label: string; bg: string; border: string; color: string }[]
  reverse?: boolean
}) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden">
      <div className={`flex w-max ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}>
        {doubled.map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="group mx-2 flex shrink-0 cursor-default items-center gap-3 rounded-2xl border border-sw-grey-border px-4 py-3 transition-transform duration-200 hover:scale-105"
            style={{ backgroundColor: item.bg, borderColor: item.border }}
          >
            <span className="text-2xl transition-transform duration-200 group-hover:scale-125 group-hover:animate-none" aria-hidden="true">
              {item.emoji}
            </span>
            <span className="text-sm font-semibold whitespace-nowrap" style={{ color: item.color }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MarqueeSection() {
  return (
    <section className="overflow-hidden bg-white pt-4 pb-12 sm:pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium tracking-wide text-sw-grey">
            What do you want to improve?{' '}
            <span className="font-semibold text-sw-blue">12 life areas. One system.</span>
          </p>
        </div>
      </div>
      <div className="mb-3 overflow-hidden">
        <MarqueeRow items={LIFE_AREAS_ROW_A} />
      </div>
      <div className="overflow-hidden">
        <MarqueeRow items={LIFE_AREAS_ROW_B} reverse />
      </div>
    </section>
  )
}
