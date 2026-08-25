import type { SocialProofScreenDef } from '@/funnels/shared/types'

interface SocialProofScreenProps {
  screen: SocialProofScreenDef
  echoValue?: string
}

const AVATAR_COLORS = ['bg-indigo-600', 'bg-cyan-600', 'bg-emerald-600', 'bg-amber-600', 'bg-red-600']

export default function SocialProofScreen({ screen, echoValue }: SocialProofScreenProps) {
  const headline =
    (echoValue && screen.echoHeadline?.[echoValue]) || screen.headline
  const copy = (echoValue && screen.echoCopy?.[echoValue]) || screen.copy
  const avatars = screen.avatars ?? ['S', 'A', 'M', 'J', 'R']

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center px-4 pt-8 pb-24 animate-fade-up">
      {screen.heroImage ? (
        <img src={screen.heroImage} alt="Claude AI" className="mb-4 h-auto w-28 object-contain" />
      ) : null}

      <h2 className="mb-4 text-center text-2xl leading-tight font-bold text-sw-dark sm:text-3xl">{headline}</h2>

      {screen.statBox ? (
        <div className="mb-6 max-w-sm rounded-2xl bg-sw-grey-light px-5 py-4 text-center">
          <p className="text-sm leading-snug font-semibold text-sw-dark">{screen.statBox}</p>
        </div>
      ) : null}

      <div className="mb-6 flex items-center gap-2">
        <div className="flex -space-x-2">
          {avatars.map((letter, i) => (
            <div
              key={letter + i}
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
            >
              {letter}
            </div>
          ))}
        </div>
        <p className="text-xs font-medium text-sw-grey">{screen.avatarsCaption ?? 'Joined this week'}</p>
      </div>

      <p className="mb-8 max-w-xs text-center text-sm text-sw-grey">{copy}</p>

      <div className="mb-8 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-lg text-sw-amber" aria-hidden>
            ★
          </span>
        ))}
        <span className="ml-1 text-sm font-semibold text-sw-dark">
          {screen.rating ?? '4.9 / 5 from 12,400+ learners'}
        </span>
      </div>
    </div>
  )
}
