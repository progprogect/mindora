import { useI18n } from '../../../../authorisation/src/i18n/I18nProvider'
import { saSalesCopy } from '@/funnels/success-assessment/data/saSalesCopy'
import type { SaProfile } from '@/funnels/success-assessment/lib/scoring'

export function SaRoadmapScreen({ profile }: { profile: SaProfile }) {
  const { locale } = useI18n()
  const copy = saSalesCopy(locale).roadmap

  return (
    <div className="px-4 pt-8 pb-40 animate-fade-up">
      <h1 className="mb-2 text-center text-3xl leading-tight font-extrabold text-sw-dark">
        {copy.title[0]}
        <br />
        {copy.title[1]}
      </h1>
      <p className="mb-6 text-center text-sm text-sw-grey">{copy.subtitle}</p>
      <div
        className="mb-5 rounded-2xl p-5 text-white"
        style={{ background: 'linear-gradient(135deg, hsl(var(--sw-blue)) 0%, hsl(221 83% 38%) 100%)' }}
      >
        <p className="text-xs font-bold tracking-wide text-white/70 uppercase">{copy.builtFor}</p>
        <p className="text-xl font-extrabold">{profile.archetype}</p>
      </div>
      <div className="mb-6 flex flex-col gap-2 text-sm font-semibold text-sw-dark">
        {copy.bullets.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <h2 className="mb-3 text-lg font-extrabold text-sw-dark">{copy.withTitle}</h2>
      <ul className="flex flex-col gap-3 text-sm leading-relaxed text-sw-grey">
        {copy.withItems.map((line) => (
          <li key={line.slice(0, 48)}>{line}</li>
        ))}
      </ul>
    </div>
  )
}

export function SaTransformationScreen({
  profile,
  plus90,
  rewardLine,
  struggle,
}: {
  profile: SaProfile
  plus90: string
  rewardLine: string
  struggle: { without: string[]; with: string[]; kicker: string }
}) {
  const { locale } = useI18n()
  const copy = saSalesCopy(locale).transformation

  return (
    <div className="px-4 pt-8 pb-40 animate-fade-up">
      <h1 className="mb-2 text-center text-3xl leading-tight font-extrabold text-sw-dark">
        {copy.title[0]}
        <br />
        {copy.title[1]}
      </h1>
      <p className="mb-4 text-center text-sm text-sw-grey">{struggle.kicker}</p>
      <p className="mb-5 text-center text-sm font-semibold text-sw-dark">{copy.lifeBy(plus90)}</p>
      <div className="mb-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-sw-grey-light p-4">
          <p className="mb-1 text-2xl">😟</p>
          <p className="text-xs font-bold tracking-wide text-sw-grey uppercase">{copy.without}</p>
          <p className="mb-2 text-sm font-extrabold text-sw-dark">MindoraAcademy.com</p>
          <p className="mb-1 text-[10px] font-bold tracking-wide text-sw-grey uppercase">{copy.struggles}</p>
          <ul className="flex flex-col gap-1 text-xs text-sw-grey">
            {struggle.without.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-sw-blue-light p-4">
          <p className="mb-1 text-2xl">😊</p>
          <p className="text-xs font-bold tracking-wide text-sw-blue uppercase">{copy.with}</p>
          <p className="mb-2 text-sm font-extrabold text-sw-dark">MindoraAcademy.com</p>
          <p className="mb-1 text-[10px] font-bold tracking-wide text-sw-blue uppercase">{copy.solutions}</p>
          <ul className="flex flex-col gap-1 text-xs text-sw-dark">
            {struggle.with.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mb-4 text-center text-sm font-semibold text-sw-dark">{copy.promoted}</p>
      <p className="mb-5 text-center text-sm text-sw-grey">{copy.ambition}</p>
      <div className="mb-4 rounded-2xl border border-sw-grey-border p-4">
        <p className="text-xs font-bold tracking-wide text-sw-grey uppercase">{copy.profileKicker}</p>
        <p className="text-lg font-extrabold text-sw-dark">{profile.archetype}</p>
        <p className="mt-1 text-sm text-sw-grey">{profile.quote}</p>
      </div>
      <p className="text-center text-sm font-semibold text-sw-dark">{rewardLine}</p>
    </div>
  )
}

export function SaSocialScreen() {
  const { locale } = useI18n()
  const copy = saSalesCopy(locale).social

  return (
    <div className="px-4 pt-8 pb-40 animate-fade-up">
      <h1 className="mb-2 text-center text-3xl leading-tight font-extrabold text-sw-dark">
        {copy.title[0]}
        <br />
        {copy.title[1]}
      </h1>
      <p className="mb-6 text-center text-sm text-sw-grey">{copy.subtitle}</p>
      <div className="mb-6 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-2xl bg-sw-grey-light px-2 py-3">
          <p className="text-lg font-extrabold text-sw-dark">500k+</p>
          <p className="text-[10px] font-semibold text-sw-grey">{copy.stats[0]}</p>
        </div>
        <div className="rounded-2xl bg-sw-grey-light px-2 py-3">
          <p className="text-lg font-extrabold text-sw-dark">4.8★</p>
          <p className="text-[10px] font-semibold text-sw-grey">{copy.stats[1]}</p>
        </div>
        <div className="rounded-2xl bg-sw-grey-light px-2 py-3">
          <p className="text-lg font-extrabold text-sw-dark">93%</p>
          <p className="text-[10px] font-semibold text-sw-grey">{copy.stats[2]}</p>
        </div>
      </div>
      <h2 className="mb-4 text-center text-lg font-extrabold text-sw-dark">{copy.testimonialsTitle}</h2>
      <div className="flex flex-col gap-3">
        {copy.stories.map((s) => (
          <div key={s.name} className="rounded-2xl border border-sw-grey-border p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-full bg-sw-blue text-xs font-bold text-white">
                {s.initials}
              </div>
              <div>
                <p className="text-sm font-bold text-sw-dark">{s.name}</p>
                <p className="text-xs text-sw-grey">{s.role}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-sw-grey">&ldquo;{s.quote}&rdquo;</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2 text-center">
        {copy.trust.map((label) => (
          <p key={label} className="text-[10px] font-semibold leading-snug text-sw-grey">
            {label}
          </p>
        ))}
      </div>
    </div>
  )
}
