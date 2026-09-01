import { ChevronRight } from 'lucide-react'
import type { IdentityScreen as IdentityScreenDef } from '@/funnels/twenty-eight-day/types/quiz'
import AssetImage from '@/shared/components/AssetImage'
import QuizTermsFooter from '@/funnels/twenty-eight-day/components/quiz/QuizTermsFooter'

interface IdentityScreenProps {
  screen: IdentityScreenDef
  onSelect: (optionId: string) => void
}

export default function IdentityScreen({ screen, onSelect }: IdentityScreenProps) {
  const photoOptions = screen.options.filter((o) => o.variant === 'photo')
  const textOptions = screen.options.filter((o) => o.variant === 'text')

  return (
    <div className="flex w-full flex-1 flex-col animate-fade-up">
      <div className="px-5 pt-8 pb-5 text-center">
        <h1 className="mb-1 text-[2.4rem] leading-[1.1] font-extrabold text-sw-dark sm:text-[2.8rem]">
          {screen.title}
        </h1>
        <p className="mb-4 text-[1.1rem] font-semibold text-sw-blue sm:text-[1.2rem]">{screen.subtitle}</p>
        <p className="text-[1.05rem] font-bold text-sw-dark">{screen.question}</p>
      </div>

      <div className="mb-3 grid grid-cols-2 items-stretch gap-3 px-4">
        {photoOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className="group grid cursor-pointer overflow-hidden rounded-2xl border-[2.5px] border-sw-blue bg-white shadow-md transition-all duration-150 hover:scale-[1.03] hover:shadow-xl hover:-translate-y-1 focus:outline-none active:scale-[0.97]"
          >
            <div className="relative min-h-[180px] overflow-hidden bg-white">
              <AssetImage
                src={option.photo ?? ''}
                alt={option.label}
                fallbackEmoji={option.emoji}
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex min-h-[72px] items-center justify-between gap-2 bg-sw-blue px-4 py-[14px]">
              <span className="text-left text-[15px] leading-snug font-bold text-white">{option.label}</span>
              <ChevronRight className="size-5 shrink-0 text-white" />
            </div>
          </button>
        ))}
      </div>

      <div className="px-4">
        {textOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className="flex w-full items-center justify-between rounded-2xl border-[2px] border-white/70 bg-white px-5 py-4 text-left text-[15px] font-semibold text-sw-dark shadow-md transition-all duration-150 hover:scale-[1.02] hover:border-sw-blue hover:bg-sw-blue-light hover:-translate-y-0.5"
          >
            <span>
              {option.emoji}
              {option.label}
            </span>
            <ChevronRight className="ml-3 size-5 shrink-0 text-sw-grey" />
          </button>
        ))}
      </div>

      {screen.trustLine ? (
        <p className="mt-8 px-4 text-center text-[11px] text-sw-grey">{screen.trustLine}</p>
      ) : null}

      <div className="px-4">
        <QuizTermsFooter />
        <p className="mt-2 text-center text-[11px] text-sw-grey">Scalion Ltd T/A. MindoraAcademy.com</p>
      </div>
    </div>
  )
}
