import { Sparkles, Star } from 'lucide-react'
import type { SocialProofScreen as SocialProofScreenDef } from '@/funnels/twenty-eight-day/types/quiz'

interface SocialProofScreenProps {
  screen: SocialProofScreenDef
  onContinue: () => void
}

const AVATAR_COLORS = ['bg-sw-blue', 'bg-sw-amber', 'bg-sw-success', 'bg-sw-red', 'bg-sw-dark']

export default function SocialProofScreen({ screen, onContinue }: SocialProofScreenProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 py-6 text-center animate-fade-up">
      <div className="flex size-16 items-center justify-center rounded-full bg-sw-blue-light">
        <Sparkles className="size-8 text-sw-blue" />
      </div>

      <div>
        <h1 className="text-2xl font-extrabold text-sw-dark sm:text-3xl">{screen.title}</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-sw-grey">{screen.subtitle}</p>
      </div>

      <div className="flex -space-x-3">
        {screen.avatars.map((letter, i) => (
          <div
            key={letter + i}
            className={`flex size-10 items-center justify-center rounded-full border-2 border-sw-white text-sm font-bold text-sw-white ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
          >
            {letter}
          </div>
        ))}
      </div>
      <p className="text-xs font-medium text-sw-grey">{screen.avatarsCaption}</p>

      <p className="text-sm font-bold text-sw-dark">{screen.tagline}</p>

      <div className="flex items-center gap-1 text-sm font-semibold text-sw-dark">
        <span className="flex text-sw-amber">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-4 fill-current" />
          ))}
        </span>
        {screen.stat}
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-4 w-full max-w-xs animate-pulse-cta rounded-sw-sm bg-sw-blue py-3.5 font-extrabold tracking-wide text-sw-white transition hover:bg-sw-blue-hover"
      >
        {screen.ctaLabel}
      </button>
    </div>
  )
}
