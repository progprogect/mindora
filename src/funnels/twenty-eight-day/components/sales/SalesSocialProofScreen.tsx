import { useMemo } from 'react'
import { Star } from 'lucide-react'
import { salesSocialProofCopy } from '@/funnels/twenty-eight-day/data/funnelCopy'
import type { FunnelLocale } from '@/funnels/twenty-eight-day/data/quizScreens'
import { useI18n } from '../../../../../authorisation/src/i18n/I18nProvider'

export default function SalesSocialProofScreen() {
  const { locale } = useI18n()
  const copy = useMemo(() => salesSocialProofCopy(locale as FunnelLocale), [locale])

  return (
    <div className="flex flex-1 flex-col gap-6 pt-4 pb-32 animate-fade-up">
      <div className="text-center">
        <h1 className="mb-2 text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
          {copy.titleLine1}
          <br />
          {copy.titleLine2}
        </h1>
        <p className="mt-2 text-sm text-sw-grey">{copy.subtitle}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {copy.stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center rounded-2xl border border-sw-blue/20 bg-sw-blue-light p-3 text-center"
          >
            <span className="mb-1 text-xl font-extrabold leading-none text-sw-blue">{s.value}</span>
            <span className="text-xs font-medium leading-tight text-sw-grey">{s.label}</span>
          </div>
        ))}
      </div>

      <div>
        <p className="mb-4 text-center text-base font-extrabold text-sw-dark">{copy.testimonialsTitle}</p>
        <div className="flex flex-col gap-3">
          {copy.testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-sw-border bg-sw-white p-5">
              <div className="mb-3 flex items-center gap-3">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-sw-white ${t.color}`}
                >
                  {t.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-none text-sw-dark">{t.name}</p>
                  <p className="text-xs text-sw-grey">{t.role}</p>
                </div>
                <div className="flex text-sw-amber">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-sw-dark">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
