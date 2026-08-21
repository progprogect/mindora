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
    <div className="flex flex-1 flex-col justify-center gap-6 bg-sw-blue-light py-8 animate-fade-up">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-sw-dark sm:text-4xl">{screen.title}</h1>
        <p className="mt-1.5 text-base font-semibold text-sw-blue">{screen.subtitle}</p>
        <p className="mt-4 text-sm font-bold text-sw-dark">{screen.question}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {photoOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className="group flex flex-col overflow-hidden rounded-sw border-[2.5px] border-sw-blue bg-sw-white text-left shadow-sw-card transition hover:shadow-lg"
          >
            <AssetImage
              src={option.photo ?? ''}
              alt={option.label}
              fallbackEmoji={option.emoji}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="flex items-center justify-between gap-1 bg-sw-blue px-3 py-3">
              <span className="text-sm font-bold leading-tight text-sw-white">{option.label}</span>
              <ChevronRight className="size-4 shrink-0 text-sw-white" />
            </div>
          </button>
        ))}
      </div>

      {textOptions.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onSelect(option.id)}
          className="flex w-full items-center justify-between gap-2 rounded-full border border-sw-border bg-sw-white px-5 py-4 text-sm font-bold text-sw-dark shadow-sw-card transition hover:border-sw-blue"
        >
          <span className="flex items-center gap-2">
            <span aria-hidden>{option.emoji}</span>
            {option.label}
          </span>
          <ChevronRight className="size-4 shrink-0 text-sw-grey" />
        </button>
      ))}

      {screen.trustLine ? (
        <p className="text-center text-xs font-medium text-sw-grey">{screen.trustLine}</p>
      ) : null}

      <QuizTermsFooter />
      <p className="text-center text-[10px] text-sw-grey/70">ClickTech Solutions LTD. T/A. SuccessWise.</p>
    </div>
  )
}
