import { useI18n } from '../../../../authorisation/src/i18n/I18nProvider'
import { excelSalesCopy } from '@/funnels/master-claude-ai-excel/data/excelSalesCopy'

export function ExcelBenefitsScreen() {
  const { locale } = useI18n()
  const copy = excelSalesCopy(locale).benefits

  return (
    <div className="px-4 pt-8 pb-40 animate-fade-up">
      <h1 className="mb-2 text-center text-3xl leading-tight font-extrabold text-sw-dark">
        {copy.title[0]}
        <br />
        {copy.title[1]}
      </h1>
      <p className="mb-6 text-center text-sm text-sw-grey">{copy.subtitle}</p>
      <div
        className="mb-5 rounded-2xl p-5 text-white"
        style={{ background: 'linear-gradient(135deg, hsl(var(--sw-blue)) 0%, hsl(221 83% 38%) 100%)' }}
      >
        <p className="text-xs font-bold tracking-wide text-white/70 uppercase">{copy.course}</p>
        <p className="text-xl font-extrabold">
          {copy.courseTitle[0]}
          <br />
          {copy.courseTitle[1]}
        </p>
      </div>
      <div className="mb-6 flex flex-col gap-2 text-sm font-semibold text-sw-dark">
        {copy.bullets.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <h2 className="mb-3 text-lg font-extrabold text-sw-dark">{copy.withTitle}</h2>
      <ul className="flex flex-col gap-3 text-sm leading-relaxed text-sw-grey">
        {copy.withItems.map((line) => (
          <li key={line.slice(0, 40)}>{line}</li>
        ))}
      </ul>
    </div>
  )
}

export function ExcelBeforeAfterScreen() {
  const { locale } = useI18n()
  const copy = excelSalesCopy(locale).beforeAfter

  return (
    <div className="px-4 pt-8 pb-40 animate-fade-up">
      <h1 className="mb-2 text-center text-3xl font-extrabold text-sw-dark">{copy.title}</h1>
      <p className="mb-6 text-center text-sm text-sw-grey">{copy.subtitle}</p>
      <div className="mb-4 rounded-2xl bg-sw-grey-light p-4">
        <h2 className="mb-3 text-base font-extrabold text-sw-dark">{copy.withoutTitle}</h2>
        <ul className="flex flex-col gap-2 text-sm text-sw-grey">
          {copy.withoutItems.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </div>
      <div className="mb-5 rounded-2xl bg-sw-blue-light p-4">
        <h2 className="mb-3 text-base font-extrabold text-sw-dark">{copy.withTitle}</h2>
        <ul className="flex flex-col gap-2 text-sm text-sw-dark">
          {copy.withItems.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-sw-grey-border p-4">
        <p className="text-sm leading-relaxed text-sw-grey">&ldquo;{copy.quote}&rdquo;</p>
        <p className="mt-2 text-xs font-semibold text-sw-grey">{copy.quoteAuthor}</p>
      </div>
    </div>
  )
}

export function ExcelSocialScreen() {
  const { locale } = useI18n()
  const copy = excelSalesCopy(locale).social

  return (
    <div className="px-4 pt-8 pb-40 animate-fade-up">
      <h1 className="mb-2 text-center text-3xl leading-tight font-extrabold text-sw-dark">
        {copy.title[0]}
        <br />
        {copy.title[1]}
      </h1>
      <p className="mb-6 text-center text-sm text-sw-grey">{copy.subtitle}</p>
      <div className="mb-6 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-2xl bg-sw-grey-light py-3">
          <p className="text-lg font-extrabold text-sw-dark">4.9</p>
          <p className="text-[10px] font-bold text-sw-grey">{copy.stats[0]}</p>
        </div>
        <div className="rounded-2xl bg-sw-grey-light py-3">
          <p className="text-lg font-extrabold text-sw-dark">12K+</p>
          <p className="text-[10px] font-bold text-sw-grey">{copy.stats[1]}</p>
        </div>
        <div className="rounded-2xl bg-sw-grey-light py-3">
          <p className="text-lg font-extrabold text-sw-dark">5h+</p>
          <p className="text-[10px] font-bold text-sw-grey">{copy.stats[2]}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {copy.stories.map((s) => (
          <div key={s.name} className="rounded-2xl border border-sw-grey-border p-4">
            <p className="mb-1 text-amber-400">★★★★★</p>
            <p className="mb-2 text-xs font-bold tracking-wide text-sw-blue">{s.badge}</p>
            <p className="mb-3 text-sm leading-relaxed text-sw-grey">{s.quote}</p>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-sw-blue text-xs font-bold text-white">
                {s.initials}
              </div>
              <div>
                <p className="text-sm font-bold text-sw-dark">{s.name}</p>
                <p className="text-xs text-sw-grey">{s.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
