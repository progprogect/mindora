import QuizTermsFooter from '@/funnels/shared/components/QuizTermsFooter'
import type { IdentityMasterScreen } from '@/funnels/shared/types'

interface MasterIdentityScreenProps {
  screen: IdentityMasterScreen
  onSelect: (value: string) => void
}

export default function MasterIdentityScreen({ screen, onSelect }: MasterIdentityScreenProps) {
  return (
    <div className="flex w-full flex-1 flex-col px-5 pt-8 pb-8 animate-fade-up">
      <div className="mx-auto mb-8 flex w-full max-w-sm items-center justify-center rounded-2xl bg-sw-grey-light px-4 py-6">
        <img src={screen.collageSrc} alt={screen.collageAlt} className="h-auto w-full max-w-[280px] object-contain" />
      </div>

      <h1 className="mb-3 text-center text-[1.75rem] leading-[1.15] font-extrabold text-sw-dark sm:text-[2rem]">
        {screen.headline}
      </h1>
      <p className="mb-8 text-center text-base text-sw-dark sm:text-lg">{screen.subtext}</p>

      <div className="mb-8 grid grid-cols-2 gap-3">
        {screen.options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className="flex cursor-pointer items-center justify-center gap-1 rounded-xl bg-sw-blue px-4 py-4 text-base font-bold text-white transition-all duration-150 hover:bg-sw-blue-hover active:scale-[0.98]"
          >
            {option.label}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}
      </div>

      <QuizTermsFooter brokenLegal={screen.legal404} agreeWith />
    </div>
  )
}
