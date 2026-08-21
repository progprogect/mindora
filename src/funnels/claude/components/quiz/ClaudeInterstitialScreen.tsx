import type { ClaudeInterstitialScreenDef, ClaudeQuizAnswers } from '@/funnels/claude/types/claudeQuiz'

interface ClaudeInterstitialScreenProps {
  screen: ClaudeInterstitialScreenDef
  answers: ClaudeQuizAnswers
  onContinue: () => void
}

/** Port of `m()` (`InterstitialScreen-*.js`) — emoji circle, quote/stat blocks, echo variants. */
export default function ClaudeInterstitialScreen({ screen, answers, onContinue }: ClaudeInterstitialScreenProps) {
  let headline = screen.headline
  let copy = screen.copy ?? ''

  if (screen.echoKey && screen.echoHeadline) {
    const echoValue = answers[screen.echoKey]
    if (echoValue && screen.echoHeadline[echoValue]) headline = screen.echoHeadline[echoValue]
    if (echoValue && screen.echoCopy?.[echoValue]) copy = screen.echoCopy[echoValue]
  }

  const hasQuote = Boolean(screen.quote)

  return (
    <div className="flex flex-1 flex-col animate-fade-up">
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-4 pt-8 pb-28">
        <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-sw-blue-light shadow-sm">
          <span className="text-3xl" aria-hidden>
            {hasQuote ? '🎓' : '✨'}
          </span>
        </div>

        <h2 className="mb-4 text-center text-2xl leading-tight font-bold text-sw-dark sm:text-3xl">{headline}</h2>

        {screen.quote ? (
          <div className="mb-5 w-full max-w-sm rounded-2xl bg-sw-grey-light px-6 py-5">
            <p className="mb-2 text-sm leading-relaxed font-semibold text-sw-dark italic sm:text-base">
              {screen.quote}
            </p>
            {screen.quoteAttribution ? (
              <p className="text-xs font-medium text-sw-grey">{screen.quoteAttribution}</p>
            ) : null}
          </div>
        ) : null}

        {screen.stat ? (
          <div className="mb-5 w-full max-w-sm rounded-xl border border-sw-blue/25 bg-sw-blue-light px-4 py-3">
            <p className="text-center text-xs leading-snug font-semibold text-sw-blue sm:text-sm">📊 {screen.stat}</p>
          </div>
        ) : null}

        {copy ? <p className="max-w-sm text-center text-sm leading-relaxed text-sw-grey sm:text-base">{copy}</p> : null}
      </div>

      <div
        className="fixed inset-x-0 bottom-0 z-50 px-4 pt-10"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.92) 40%, white 65%)' }}
      >
        <div className="mx-auto max-w-lg">
          <button
            type="button"
            onClick={onContinue}
            className="w-full rounded-full bg-sw-blue py-4 text-base font-bold text-sw-white shadow-md transition-all duration-150 hover:bg-sw-blue-hover active:scale-[0.98]"
          >
            {screen.ctaLabel ?? 'CONTINUE →'}
          </button>
        </div>
        <div style={{ paddingTop: '56px', paddingBottom: 'env(safe-area-inset-bottom)' }} />
      </div>
    </div>
  )
}
