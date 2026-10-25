import { Link } from 'react-router-dom'
import { homeCopy } from '@/marketing/data/home'
import { homeSectionsCopy } from '@/marketing/data/homeSections'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'
import { ROUTES } from '@/marketing/data/nav'

function SunIcon({ size }: { size: number }) {
  const r = size === 18 ? 3.5 : size === 12 ? 2.5 : 3
  const stroke = size === 12 ? 1.2 : 1.5
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="white" strokeWidth={stroke} />
      {size === 12 ? (
        <path
          d={`M${size / 2} 1v1M${size / 2} ${size - 2}v1M1 ${size / 2}h1M${size - 2} ${size / 2}h1`}
          stroke="white"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
      ) : (
        <path
          d={
            size === 18
              ? 'M9 2v1.5M9 14.5V16M2 9h1.5M14.5 9H16M4.1 4.1l1.1 1.1M12.8 12.8l1.1 1.1M4.1 13.9l1.1-1.1M12.8 5.2l1.1-1.1'
              : 'M8 2V1M8 15V14M2 8H1M15 8H14M3.93 3.93L3.22 3.22M12.78 12.78L12.07 12.07M12.07 3.93L12.78 3.22M3.22 12.78L3.93 12.07'
          }
          stroke="white"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}

function CoachDot() {
  return (
    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sw-blue">
      <SunIcon size={12} />
    </div>
  )
}

export default function AiCoachSection() {
  const { locale } = useI18n()
  const { coachBullets } = homeCopy(locale)
  const copy = homeSectionsCopy(locale).aiCoach

  return (
    <section className="relative overflow-hidden bg-sw-dark py-20 sm:py-28">
      <div className="pointer-events-none absolute top-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-sw-blue/10 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sw-blue">
                  <SunIcon size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{copy.chatTitle}</p>
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                    <span className="text-xs text-green-400">{copy.onlineNow}</span>
                  </div>
                </div>
              </div>

              <div className="max-h-80 space-y-4 overflow-y-auto p-5">
                <div className="flex justify-end gap-3">
                  <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-sw-blue px-4 py-3 text-sm leading-relaxed text-white">
                    {copy.userMsg1}
                  </div>
                </div>
                <div className="flex justify-start gap-3">
                  <CoachDot />
                  <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3 text-sm leading-relaxed text-white/90">
                    {copy.coachMsg1}
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-sw-blue px-4 py-3 text-sm leading-relaxed text-white">
                    {copy.userMsg2}
                  </div>
                </div>
                <div className="flex justify-start gap-3">
                  <CoachDot />
                  <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3 text-sm leading-relaxed text-white/90">
                    {copy.coachMsg2}
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sw-blue">
                    <SunIcon size={12} />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40" style={{ animationDelay: '0s' }} />
                    <div
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40"
                      style={{ animationDelay: '0.15s' }}
                    />
                    <div
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40"
                      style={{ animationDelay: '0.3s' }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-white/10 px-4 py-3">
                <div className="flex-1 rounded-xl bg-white/10 px-4 py-2.5 text-sm text-white/40">
                  {copy.inputPlaceholder}
                </div>
                <button
                  type="button"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sw-blue transition-colors hover:bg-sw-blue-hover"
                  aria-label={copy.sendAria}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M2 8h12M9 4l5 4-5 4"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="mb-6 flex items-center gap-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                <span className="text-xs font-semibold tracking-wide text-white/70 uppercase">{copy.meetBadge}</span>
              </div>
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-white">
                <img src="/assets/mindora-owl.svg" alt={copy.owlAlt} className="emoji-float h-auto w-12 drop-shadow-lg" />
              </span>
            </div>
            <h2 className="mb-4 text-3xl leading-tight font-extrabold text-white sm:text-4xl">
              {copy.titleLine1}
              <br />
              {copy.titleLine2}{' '}
              <span className="text-sw-blue">{copy.titleHighlight}</span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-white/60">
              {copy.body}
            </p>
            <div className="mb-8 space-y-4">
              {coachBullets.map((line) => (
                <div key={line} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sw-blue/20">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path
                        d="M2 5l2 2 4-4"
                        stroke="#2563EB"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-white/70">{line}</span>
                </div>
              ))}
            </div>
            <Link
              to={ROUTES.quizSuccess}
              className="inline-block rounded-full bg-sw-blue px-8 py-4 font-bold text-white transition-all duration-200 hover:bg-sw-blue-hover hover:shadow-lg hover:shadow-sw-blue/40"
            >
              {copy.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
