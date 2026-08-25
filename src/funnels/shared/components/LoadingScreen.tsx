import { useEffect, useRef, useState } from 'react'
import type { LoadingScreenDef } from '@/funnels/shared/types'

interface LoadingScreenProps {
  screen: LoadingScreenDef
  onComplete: (micro: { device: string; commitment: string }) => void
}

type Phase = 'loading' | 'q1' | 'q1-confirm' | 'q2' | 'q2-confirm' | 'done'

const DEVICE_OPTIONS = [
  { id: 'phone', label: 'My phone', emoji: '📱' },
  { id: 'laptop', label: 'My laptop', emoji: '💻' },
  { id: 'desktop', label: 'My desktop', emoji: '🖥️' },
  { id: 'mix', label: 'Mix of devices', emoji: '📱💻' },
]

const COMMITMENT_OPTIONS = [
  { id: 'full', label: 'Fully committed', emoji: '🏆' },
  { id: 'high', label: 'Very committed', emoji: '💪' },
  { id: 'medium', label: 'Pretty committed', emoji: '🙂' },
  { id: 'trying', label: "I'll try my best", emoji: '🤞' },
]

const COMMITMENT_CONFIRM: Record<string, string> = {
  full: "🔥 That's the mindset. Your plan is almost ready!",
  high: '💪 Love that. Your plan is almost ready!',
  medium: '🙂 Every step counts. Your plan is almost ready!',
  trying: "🤞 We've got you. Your plan is almost ready!",
}

const TICK_MS = 60
const DEVICE_PAUSE = 40
const COMMITMENT_PAUSE = 70
const Q1_CONFIRM_MS = 1400
const Q2_CONFIRM_MS = 1800
const DONE_MS = 800

function SelectedCheck() {
  return (
    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sw-blue">
      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
      </svg>
    </div>
  )
}

export default function LoadingScreen({ screen, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<Phase>('loading')
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [selectedDevice, setSelectedDevice] = useState('')
  const [selectedCommitment, setSelectedCommitment] = useState('')
  const microAnswers = useRef({ device: '', commitment: '' })
  const phaseRef = useRef<Phase>('loading')
  const progressRef = useRef(0)
  const intervalRef = useRef<number | null>(null)

  phaseRef.current = phase

  const startTicker = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current)
    intervalRef.current = window.setInterval(() => {
      if (phaseRef.current !== 'loading') return
      const next = progressRef.current + 1
      progressRef.current = next
      setProgress(next)
      if (next === 20) setCompletedSteps((s) => [...s, 0])
      if (next === 40) setCompletedSteps((s) => [...s, 1])
      if (next === 60) setCompletedSteps((s) => [...s, 2])
      if (next === 80) setCompletedSteps((s) => [...s, 3])
      if (next === 98) setCompletedSteps((s) => [...s, 4])
      if (next === DEVICE_PAUSE && !microAnswers.current.device) {
        setPhase('q1')
        phaseRef.current = 'q1'
        return
      }
      if (next === COMMITMENT_PAUSE && !microAnswers.current.commitment) {
        setPhase('q2')
        phaseRef.current = 'q2'
        return
      }
      if (next >= 100) {
        if (intervalRef.current) window.clearInterval(intervalRef.current)
        setPhase('done')
        phaseRef.current = 'done'
      }
    }, TICK_MS)
  }

  useEffect(() => {
    startTicker()
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    if (phase !== 'done') return
    const timeout = window.setTimeout(() => onComplete(microAnswers.current), DONE_MS)
    return () => window.clearTimeout(timeout)
  }, [phase, onComplete])

  const resumeLoading = (delayMs: number) => {
    window.setTimeout(() => {
      setPhase('loading')
      phaseRef.current = 'loading'
      startTicker()
    }, delayMs)
  }

  const handleDeviceSelect = (id: string) => {
    if (phase !== 'q1') return
    microAnswers.current.device = id
    setSelectedDevice(id)
    setPhase('q1-confirm')
    phaseRef.current = 'q1-confirm'
    resumeLoading(Q1_CONFIRM_MS)
  }

  const handleCommitmentSelect = (id: string) => {
    if (phase !== 'q2') return
    microAnswers.current.commitment = id
    setSelectedCommitment(id)
    setPhase('q2-confirm')
    phaseRef.current = 'q2-confirm'
    resumeLoading(Q2_CONFIRM_MS)
  }

  const showDevice = phase === 'q1' || phase === 'q1-confirm'
  const showCommitment = phase === 'q2' || phase === 'q2-confirm'
  const activeStep = Math.min(Math.floor((progress / 100) * screen.steps.length), screen.steps.length - 1)

  return (
    <div className="flex w-full flex-1 flex-col items-center px-4 pt-8 pb-12">
      <div className="mb-8 w-full">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold tracking-widest text-sw-blue uppercase">{screen.header}</span>
          <span className="text-sm font-bold text-sw-dark">{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-sw-grey-light">
          <div className="h-full rounded-full bg-sw-blue transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {showDevice ? (
        <div className="flex w-full flex-col animate-fade-up">
          <p className="mb-3 text-center text-xs font-bold tracking-widest text-sw-blue uppercase">Quick question</p>
          <h2 className="mb-2 text-center text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
            Where will you mostly be learning?
          </h2>
          <p className="mb-6 text-center text-sm text-sw-grey">We&apos;ll optimise your plan for it</p>
          <div className="flex flex-col gap-3">
            {DEVICE_OPTIONS.map(({ id, label, emoji }) => {
              const selected = selectedDevice === id && phase === 'q1-confirm'
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleDeviceSelect(id)}
                  disabled={phase === 'q1-confirm'}
                  className={`flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all duration-150 active:scale-[0.98] ${
                    selected
                      ? 'border-sw-blue bg-sw-blue-light'
                      : 'cursor-pointer border-sw-grey-border bg-white hover:border-sw-blue hover:bg-sw-blue-light'
                  }`}
                >
                  <span className="w-9 flex-shrink-0 text-center text-2xl" aria-hidden>
                    {emoji}
                  </span>
                  <span className={`flex-1 text-base font-semibold sm:text-lg ${selected ? 'text-sw-blue' : 'text-sw-dark'}`}>
                    {label}
                  </span>
                  {selected ? <SelectedCheck /> : null}
                </button>
              )
            })}
          </div>
          {phase === 'q1-confirm' ? (
            <div className="mt-5 animate-fade-in rounded-2xl border border-sw-blue-border bg-sw-blue-light px-5 py-3 text-center">
              <p className="text-sm font-bold text-sw-blue">✓ Perfect — we&apos;ll optimise your plan for that!</p>
            </div>
          ) : null}
        </div>
      ) : null}

      {showCommitment ? (
        <div className="flex w-full flex-col animate-fade-up">
          <p className="mb-3 text-center text-xs font-bold tracking-widest text-sw-blue uppercase">Almost there</p>
          <h2 className="mb-2 text-center text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
            {screen.commitmentQuestion}
          </h2>
          <p className="mb-6 text-center text-sm text-sw-grey">Be honest — your plan adapts to you</p>
          <div className="flex flex-col gap-3">
            {COMMITMENT_OPTIONS.map(({ id, label, emoji }) => {
              const selected = selectedCommitment === id && phase === 'q2-confirm'
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleCommitmentSelect(id)}
                  disabled={phase === 'q2-confirm'}
                  className={`flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all duration-150 active:scale-[0.98] ${
                    selected
                      ? 'border-sw-blue bg-sw-blue-light'
                      : 'cursor-pointer border-sw-grey-border bg-white hover:border-sw-blue hover:bg-sw-blue-light'
                  }`}
                >
                  <span className="w-9 flex-shrink-0 text-center text-2xl" aria-hidden>
                    {emoji}
                  </span>
                  <span className={`flex-1 text-base font-semibold sm:text-lg ${selected ? 'text-sw-blue' : 'text-sw-dark'}`}>
                    {label}
                  </span>
                  {selected ? <SelectedCheck /> : null}
                </button>
              )
            })}
          </div>
          {phase === 'q2-confirm' ? (
            <div className="mt-5 animate-fade-in rounded-2xl border border-sw-blue-border bg-sw-blue-light px-5 py-3 text-center">
              <p className="text-sm font-bold text-sw-blue">
                {COMMITMENT_CONFIRM[selectedCommitment] ?? COMMITMENT_CONFIRM.trying}
              </p>
            </div>
          ) : null}
        </div>
      ) : null}

      {!showDevice && !showCommitment ? (
        <>
          <div className="mb-8 flex w-full max-w-xs flex-col gap-2">
            {screen.steps.map((label, index) => {
              const isComplete = completedSteps.includes(index)
              const isActive = index === activeStep && !isComplete
              return (
                <div
                  key={label}
                  className={`flex items-center gap-3 transition-opacity duration-300 ${
                    isComplete || isActive ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      isComplete
                        ? 'bg-sw-success text-white'
                        : isActive
                          ? 'animate-pulse bg-sw-blue text-white'
                          : 'bg-sw-grey-border text-sw-grey'
                    }`}
                  >
                    {isComplete ? '✓' : index + 1}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      isComplete ? 'text-sw-dark line-through opacity-60' : isActive ? 'text-sw-blue' : 'text-sw-grey'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="w-full max-w-sm rounded-2xl bg-sw-grey-light p-5 animate-fade-in">
            <div className="mb-2 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-sm text-sw-amber">
                  ★
                </span>
              ))}
            </div>
            <p className="mb-3 text-sm leading-relaxed font-medium text-sw-dark">&ldquo;{screen.testimonial.text}&rdquo;</p>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sw-blue-light text-xs font-bold text-sw-blue">
                {screen.testimonial.name[0]}
              </div>
              <div>
                <p className="text-xs font-bold text-sw-dark">{screen.testimonial.name}</p>
                <p className="text-xs text-sw-grey">{screen.testimonial.role}</p>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
