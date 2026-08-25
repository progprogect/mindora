import QuizTermsFooter from '@/funnels/shared/components/QuizTermsFooter'
import type { IdentitySaScreen } from '@/funnels/shared/types'

interface SaIdentityScreenProps {
  screen: IdentitySaScreen
  onSelect: (value: string) => void
}

export default function SaIdentityScreen({ screen, onSelect }: SaIdentityScreenProps) {
  const headlineLines = screen.headline.split('\n')

  return (
    <div className="flex w-full flex-1 flex-col animate-fade-up">
      <div className="px-5 pt-5 pb-0">
        <div
          className="flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5"
          style={{ background: 'rgba(37,99,235,0.10)', border: '1px solid rgba(37,99,235,0.18)' }}
        >
          <span className="text-base leading-none">⭐⭐⭐⭐⭐</span>
          <span className="text-xs font-semibold leading-none text-sw-blue">100,000+ people already transformed</span>
        </div>
      </div>

      <div className="px-5 pt-5 pb-4 text-center">
        <p className="mb-1.5 text-xs font-bold tracking-widest text-sw-blue uppercase">{screen.kicker}</p>
        <h1 className="mb-2 text-[2rem] leading-[1.1] font-extrabold text-sw-dark sm:text-[2.4rem]">
          {headlineLines.map((line, i) => (
            <span key={line}>
              {line}
              {i < headlineLines.length - 1 ? <br /> : null}
            </span>
          ))}
        </h1>
        <p className="mt-3 mb-1 text-base font-bold text-sw-dark">{screen.question}</p>
        <p className="mt-1 text-sm text-sw-grey">{screen.hint}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4">
        {screen.options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-label={option.label}
            onClick={() => onSelect(option.value)}
            className="group cursor-pointer overflow-hidden rounded-2xl shadow-md transition-all duration-150 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl focus:outline-none active:scale-[0.96]"
            style={{ background: option.gradient }}
          >
            <div className="flex items-center justify-center pt-7 pb-4">
              <span className="leading-none transition-transform duration-150 group-active:scale-90" style={{ fontSize: '3.2rem' }} aria-hidden>
                {option.emoji}
              </span>
            </div>
            <div className="px-3 pb-5 text-center">
              <span className="block text-[14px] leading-snug font-bold text-white">{option.label}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center justify-center gap-2 px-5 pb-4 sm:flex-row sm:gap-4">
        {screen.bullets.map((bullet) => (
          <span key={bullet} className="flex items-center gap-1 text-xs font-semibold text-sw-blue">
            <span className="text-sw-success" aria-hidden>
              ✅
            </span>
            {bullet}
          </span>
        ))}
      </div>

      <QuizTermsFooter merchant className="px-4 pt-6 pb-8 text-center" />
    </div>
  )
}
