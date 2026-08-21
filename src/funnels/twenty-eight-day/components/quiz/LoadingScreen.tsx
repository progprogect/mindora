import { useEffect, useRef, useState } from 'react'

interface LoadingScreenProps {
  onComplete: (microAnswers: { device: string; commitment: string }) => void
}

type Phase = 'progress' | 'micro-device' | 'micro-commitment' | 'done'

const DEVICE_OPTIONS = [
  { id: 'phone', label: 'My phone', emoji: '📱' },
  { id: 'laptop', label: 'My laptop', emoji: '💻' },
  { id: 'desktop', label: 'My desktop', emoji: '🖥️' },
  { id: 'mix', label: 'Mix of devices', emoji: '📱💻' },
]

const COMMITMENT_OPTIONS = [
  { id: 'fully', label: 'Fully committed', emoji: '🏆' },
  { id: 'very', label: 'Very committed', emoji: '💪' },
  { id: 'pretty', label: 'Pretty committed', emoji: '🙂' },
  { id: 'try-best', label: "I'll try my best", emoji: '🤞' },
]

const TESTIMONIALS = [
  '"Cut my report writing time from 4 hours to 40 minutes." — Alex R.',
  '"I finally understand how to actually use AI at work." — Priya K.',
  '"Landed a promotion after automating my weekly workflow." — Diego M.',
]

const TICK_MS = 90
const TICK_STEP = 2

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<Phase>('progress')
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const microAnswers = useRef({ device: '', commitment: '' })

  useEffect(() => {
    if (phase !== 'progress') return

    const interval = window.setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + TICK_STEP, 100)

        if (next >= 40 && prev < 40 && !microAnswers.current.device) {
          window.clearInterval(interval)
          setPhase('micro-device')
          return 40
        }
        if (next >= 70 && prev < 70 && !microAnswers.current.commitment) {
          window.clearInterval(interval)
          setPhase('micro-commitment')
          return 70
        }
        if (next >= 100) {
          window.clearInterval(interval)
          setPhase('done')
        }
        return next
      })
    }, TICK_MS)

    return () => window.clearInterval(interval)
  }, [phase])

  useEffect(() => {
    if (phase !== 'done') return
    const timeout = window.setTimeout(
      () => onComplete(microAnswers.current as { device: string; commitment: string }),
      500,
    )
    return () => window.clearTimeout(timeout)
  }, [phase, onComplete])

  useEffect(() => {
    if (phase !== 'progress') return
    const interval = window.setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % TESTIMONIALS.length)
    }, 1800)
    return () => window.clearInterval(interval)
  }, [phase])

  const handleDeviceSelect = (id: string) => {
    microAnswers.current.device = id
    setPhase('progress')
  }

  const handleCommitmentSelect = (id: string) => {
    microAnswers.current.commitment = id
    setPhase('progress')
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 py-6 text-center">
      <div className="w-full max-w-xs">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-sw-grey">Building your plan...</p>
        <div className="h-3 w-full overflow-hidden rounded-full bg-sw-grey-light">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sw-blue to-[hsl(var(--sw-gradient-end))] transition-all duration-200 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-2xl font-extrabold text-sw-dark">{progress}%</p>
      </div>

      {phase === 'micro-device' ? (
        <div className="flex w-full max-w-xs flex-col gap-3 animate-fade-up">
          <p className="text-xs font-bold uppercase tracking-wide text-sw-blue">Quick question</p>
          <p className="text-sm font-bold text-sw-dark">Where will you mostly be learning?</p>
          <p className="text-xs text-sw-grey">We&apos;ll optimise your plan for it</p>
          <div className="flex flex-col gap-2">
            {DEVICE_OPTIONS.map(({ id, label, emoji }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleDeviceSelect(id)}
                className="flex items-center gap-2.5 rounded-sw border-[2px] border-sw-border px-4 py-3 text-sm font-semibold text-sw-dark transition hover:border-sw-blue"
              >
                <span aria-hidden>{emoji}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {phase === 'micro-commitment' ? (
        <div className="flex w-full max-w-xs flex-col gap-3 animate-fade-up">
          <p className="text-xs font-bold uppercase tracking-wide text-sw-blue">Almost there</p>
          <p className="text-sm font-bold text-sw-dark">How committed are you to your 28-Day Challenge?</p>
          <p className="text-xs text-sw-grey">Be honest — your plan adapts to you</p>
          <div className="flex flex-col gap-2">
            {COMMITMENT_OPTIONS.map(({ id, label, emoji }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleCommitmentSelect(id)}
                className="flex items-center gap-2.5 rounded-sw border-[2px] border-sw-border px-4 py-3 text-sm font-semibold text-sw-dark transition hover:border-sw-blue"
              >
                <span aria-hidden>{emoji}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {phase === 'progress' || phase === 'done' ? (
        <p className="min-h-10 max-w-xs text-xs text-sw-grey animate-fade-in" key={testimonialIndex}>
          {TESTIMONIALS[testimonialIndex]}
        </p>
      ) : null}
    </div>
  )
}
