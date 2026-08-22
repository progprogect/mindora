import AssetImage from '@/shared/components/AssetImage'
import type { ClaudeQuizAnswers, ClaudeSocialProofScreenDef } from '@/funnels/claude/types/claudeQuiz'

interface ClaudeSocialProofScreenProps {
  screen: ClaudeSocialProofScreenDef
  answers: ClaudeQuizAnswers
  onContinue: () => void
}

const AVATAR_COLORS = ['#4F46E5', '#0891B2', '#059669', '#D97706', '#DC2626']
const AVATAR_LETTERS = ['S', 'A', 'M', 'J', 'R']

/** Port of `r()` (`SocialProofScreen-*.js`) — Claude sparkles icon, avatar stack, identity echo copy. */
export default function ClaudeSocialProofScreen({ screen, answers, onContinue }: ClaudeSocialProofScreenProps) {
  const echoValue = screen.echoKey ? answers[screen.echoKey] : undefined
  const headline = (echoValue && screen.echoHeadline?.[echoValue]) || screen.headline
  const copy = (echoValue && screen.echoCopy?.[echoValue]) || screen.copy

  return (
    <div className="flex flex-1 flex-col animate-fade-up">
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-4 pt-8 pb-24">
        <div className="mb-6">
          <AssetImage
            src="/assets/claude-icon-sparkles.png"
            alt="Claude AI"
            fallbackEmoji="✨"
            className="h-auto w-28"
          />
        </div>

        <h2 className="mb-4 text-center text-2xl leading-tight font-bold text-sw-dark sm:text-3xl">{headline}</h2>

        {screen.stat ? (
          <div className="mb-6 max-w-sm rounded-2xl bg-sw-grey-light px-5 py-4 text-center">
            <p className="text-sm leading-snug font-semibold text-sw-dark">{screen.stat}</p>
          </div>
        ) : null}

        <div className="mb-6 flex items-center gap-2">
          <div className="flex -space-x-2">
            {AVATAR_LETTERS.map((letter, i) => (
              <div
                key={letter + i}
                className="flex size-8 items-center justify-center rounded-full border-2 border-sw-white text-xs font-bold text-sw-white"
                style={{ backgroundColor: AVATAR_COLORS[i] }}
              >
                {letter}
              </div>
            ))}
          </div>
          <p className="text-xs font-medium text-sw-grey">Joined this week</p>
        </div>

        {copy ? <p className="mb-8 max-w-xs text-center text-sm text-sw-grey">{copy}</p> : null}

        <div className="mb-8 flex items-center gap-1">
          <span className="flex text-lg leading-7 text-sw-amber">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </span>
          <span className="ml-1 text-xs font-medium text-sw-grey">4.9 / 5 from 12,400+ learners</span>
        </div>
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
            {screen.ctaLabel}
          </button>
        </div>
        <div style={{ paddingTop: '56px', paddingBottom: 'env(safe-area-inset-bottom)' }} />
      </div>
    </div>
  )
}
