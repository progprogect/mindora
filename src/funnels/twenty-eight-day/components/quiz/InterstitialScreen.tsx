import type { InterstitialScreen as InterstitialScreenDef } from '@/funnels/twenty-eight-day/types/quiz'
import type { Interstitial1Variant } from '@/funnels/twenty-eight-day/lib/scoring'

interface InterstitialScreenProps {
  screen: InterstitialScreenDef
  variantKey?: Interstitial1Variant | null
  dominantEcho?: string | null
}

export default function InterstitialScreen({
  screen,
  variantKey,
  dominantEcho,
}: InterstitialScreenProps) {
  const echoKey = variantKey ?? dominantEcho
  const variant = echoKey && echoKey !== 'confident' ? screen.echoVariants?.[echoKey] : undefined
  const headline = variant?.headline ?? screen.defaultHeadline
  const body = variant?.body ?? screen.body

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center px-4 pt-8 pb-28 animate-fade-up">
      <div
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sw-blue-light shadow-sm"
        aria-hidden
      >
        <span className="text-3xl">{screen.emoji}</span>
      </div>
      <h2 className="mb-4 text-center text-2xl leading-tight font-bold text-sw-dark sm:text-3xl">{headline}</h2>

      {screen.stat ? (
        <div className="mb-5 w-full max-w-sm rounded-xl border border-sw-blue-border bg-sw-blue-light px-4 py-3">
          <p className="text-center text-xs leading-snug font-semibold text-sw-blue sm:text-sm">{screen.stat}</p>
        </div>
      ) : null}

      {screen.quote ? (
        <div className="mb-5 w-full max-w-sm rounded-2xl border border-sw-grey-border bg-sw-grey-light p-5">
          <p className="text-sm text-sw-dark italic">&ldquo;{screen.quote}&rdquo;</p>
          {screen.author ? <p className="mt-3 text-xs font-semibold text-sw-grey">— {screen.author}</p> : null}
        </div>
      ) : null}

      <p className="max-w-sm text-center text-sm leading-relaxed text-sw-grey sm:text-base">{body}</p>
    </div>
  )
}
