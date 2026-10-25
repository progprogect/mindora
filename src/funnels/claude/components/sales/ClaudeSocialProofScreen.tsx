import { useEffect } from 'react'
import { claudeSalesUiCopy } from '@/funnels/claude/i18n/claudeSalesUiCopy'
import { useI18n } from '../../../../../authorisation/src/i18n/I18nProvider'

interface ClaudeSocialProofScreenProps {
  onContinue: () => void
}

export default function ClaudeSocialProofScreen({ onContinue }: ClaudeSocialProofScreenProps) {
  const { locale } = useI18n()
  const copy = claudeSalesUiCopy(locale).socialProof

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-8 pb-44">
      <div className="mb-6 animate-fade-up text-center">
        <h1 className="mb-2 text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
          {copy.titleLine1}
          <br />
          {copy.titleLine2}
        </h1>
        <p className="text-sm text-sw-grey">{copy.subtitle}</p>
      </div>

      <div className="mb-6 grid animate-fade-up grid-cols-3 gap-3">
        {copy.stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-sw-blue-light p-3 text-center">
            <p className="text-xl font-extrabold text-sw-blue">{stat.value}</p>
            <p className="text-[10px] font-semibold text-sw-grey uppercase">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex animate-fade-up flex-col gap-4">
        {copy.testimonials.map((t) => (
          <div key={t.name} className="rounded-2xl border border-sw-border p-5">
            <div className="mb-2 flex gap-0.5 text-sw-amber">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-sm">
                  ★
                </span>
              ))}
            </div>
            <div className="mb-2 inline-block rounded-full bg-sw-success-light px-2.5 py-1 text-[10px] font-bold tracking-wide text-sw-success uppercase">
              {t.highlight}
            </div>
            <p className="mb-3 text-sm leading-relaxed text-sw-dark">{t.text}</p>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-sw-blue/10">
                <span className="text-xs font-bold text-sw-blue">{t.name[0]}</span>
              </div>
              <div>
                <p className="text-xs font-bold text-sw-dark">{t.name}</p>
                <p className="text-[10px] text-sw-grey">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="fixed inset-x-0 bottom-0 z-50 px-4 pt-10"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.92) 40%, white 65%)' }}
      >
        <div className="mx-auto max-w-lg">
          <button
            type="button"
            onClick={onContinue}
            className="w-full rounded-full bg-sw-blue py-4 text-base font-bold text-sw-white shadow-lg transition-all duration-150 hover:bg-sw-blue-hover active:scale-[0.98]"
          >
            {copy.continue}
          </button>
        </div>
        <div style={{ paddingTop: '56px', paddingBottom: 'env(safe-area-inset-bottom)' }} />
      </div>
    </div>
  )
}
