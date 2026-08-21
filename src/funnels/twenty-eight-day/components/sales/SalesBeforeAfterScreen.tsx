import { Check, X } from 'lucide-react'

interface SalesBeforeAfterScreenProps {
  onContinue: () => void
}

const BEFORE = [
  'Scattered YouTube videos with no structure',
  'Overwhelmed by which AI tool to even use',
  'Hours lost on tasks AI could do in minutes',
  'No way to measure if you\u2019re actually improving',
]

const AFTER = [
  'A guided 28-day path, one step at a time',
  'The right tool for each task, already chosen for you',
  '5-10 hours saved every single week',
  'A visible AI-readiness score that keeps climbing',
]

export default function SalesBeforeAfterScreen({ onContinue }: SalesBeforeAfterScreenProps) {
  return (
    <div className="flex flex-1 flex-col gap-6 py-4 animate-fade-up">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-sw-dark">Life before vs. after</h1>
        <p className="mt-2 text-sm text-sw-grey">Here&apos;s what changes for most people in the first 28 days.</p>
      </div>

      <div className="rounded-sw border border-sw-border bg-sw-grey-light p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-sw-grey">Before</p>
        <ul className="flex flex-col gap-2.5">
          {BEFORE.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-sw-grey">
              <X className="mt-0.5 size-4 shrink-0 text-sw-red" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-sw border-2 border-sw-blue bg-sw-blue-light p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-sw-blue">After 28 days</p>
        <ul className="flex flex-col gap-2.5">
          {AFTER.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm font-medium text-sw-dark">
              <Check className="mt-0.5 size-4 shrink-0 text-sw-success" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-2 w-full animate-pulse-cta rounded-sw-sm bg-sw-blue py-3.5 font-extrabold tracking-wide text-sw-white transition hover:bg-sw-blue-hover"
      >
        CONTINUE →
      </button>
    </div>
  )
}
