import type { InterstitialScreen as InterstitialScreenDef } from '@/funnels/twenty-eight-day/types/quiz'

interface InterstitialScreenProps {
  screen: InterstitialScreenDef
  dominantEcho: string | null
  onContinue: () => void
}

export default function InterstitialScreen({ screen, dominantEcho, onContinue }: InterstitialScreenProps) {
  const variant = dominantEcho ? screen.echoVariants?.[dominantEcho] : undefined
  const headline = variant?.headline ?? screen.defaultHeadline
  const body = variant?.body ?? screen.body

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 py-6 text-center animate-fade-up">
      <span className="text-3xl" aria-hidden>
        {screen.emoji}
      </span>
      <h1 className="text-xl font-extrabold text-sw-dark sm:text-2xl">{headline}</h1>

      {screen.stat ? (
        <div className="rounded-sw-sm bg-sw-blue-light px-4 py-3 text-sm font-semibold text-sw-blue">
          {screen.stat}
        </div>
      ) : null}

      {screen.quote ? (
        <div className="rounded-sw border border-sw-border bg-sw-grey-light p-5">
          <p className="text-sm italic text-sw-dark">&ldquo;{screen.quote}&rdquo;</p>
          {screen.author ? <p className="mt-3 text-xs font-semibold text-sw-grey">— {screen.author}</p> : null}
        </div>
      ) : null}

      <p className="max-w-sm text-sm leading-relaxed text-sw-grey">{body}</p>

      <button
        type="button"
        onClick={onContinue}
        className="mt-2 w-full max-w-xs animate-pulse-cta rounded-sw-sm bg-sw-blue py-3.5 font-bold text-sw-white transition hover:bg-sw-blue-hover"
      >
        {screen.ctaLabel}
      </button>
    </div>
  )
}
