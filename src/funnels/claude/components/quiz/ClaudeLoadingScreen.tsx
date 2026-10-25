import { useEffect, useMemo, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { claudeQuizUiCopy } from '@/funnels/claude/i18n/claudeQuizUiCopy'
import { useI18n } from '../../../../../authorisation/src/i18n/I18nProvider'

interface ClaudeLoadingScreenProps {
  onComplete: (micro: { device: string; commitment: string }) => void
}

interface OptionDef {
  emoji: string
  label: string
  value: string
}

const DEVICE_OPTION_DEFS: Array<{ emoji: string; value: string; labelKey: keyof ReturnType<typeof claudeQuizUiCopy>['loading']['deviceOptions'] }> =
  [
    { emoji: '📱', value: 'phone', labelKey: 'phone' },
    { emoji: '💻', value: 'laptop', labelKey: 'laptop' },
    { emoji: '🖥️', value: 'desktop', labelKey: 'desktop' },
    { emoji: '📱💻', value: 'mix', labelKey: 'mix' },
  ]

const COMMITMENT_OPTION_DEFS: Array<{ emoji: string; value: string; labelKey: keyof ReturnType<typeof claudeQuizUiCopy>['loading']['commitmentOptions'] }> =
  [
    { emoji: '🏆', value: 'full', labelKey: 'full' },
    { emoji: '💪', value: 'high', labelKey: 'high' },
    { emoji: '🙂', value: 'medium', labelKey: 'medium' },
    { emoji: '🤞', value: 'trying', labelKey: 'trying' },
  ]

const PAUSE_AT_DEVICE = 40
const PAUSE_AT_COMMITMENT = 70
const TICK_MS = 60

type Phase = 'loading' | 'q1' | 'q1-confirm' | 'q2' | 'q2-confirm' | 'done'

/**
 * Port of `J()` (`LoadingScreen-*.js`) — progress 0→100%, pausing at 40%
 * (device micro-question) and 70% (commitment micro-question), with
 * rotating testimonials and a 5-step checklist.
 */
export default function ClaudeLoadingScreen({ onComplete }: ClaudeLoadingScreenProps) {
  const { locale } = useI18n()
  const loadingCopy = claudeQuizUiCopy(locale).loading
  const deviceOptions: OptionDef[] = useMemo(
    () => DEVICE_OPTION_DEFS.map((opt) => ({ ...opt, label: loadingCopy.deviceOptions[opt.labelKey] })),
    [loadingCopy],
  )
  const commitmentOptions: OptionDef[] = useMemo(
    () => COMMITMENT_OPTION_DEFS.map((opt) => ({ ...opt, label: loadingCopy.commitmentOptions[opt.labelKey] })),
    [loadingCopy],
  )
  const [progress, setProgress] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('loading')
  const [deviceValue, setDeviceValue] = useState('')
  const [commitmentValue, setCommitmentValue] = useState('')
  const [commitmentCopy, setCommitmentCopy] = useState('')

  const phaseRef = useRef<Phase>('loading')
  const tickRef = useRef(0)
  const intervalRef = useRef<number | null>(null)
  const microRef = useRef({ device: '', commitment: '' })

  const startTicking = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current)
    intervalRef.current = window.setInterval(() => {
      if (phaseRef.current !== 'loading') return
      tickRef.current += 1
      const tick = tickRef.current
      setProgress(tick)

      if (tick === 20) setCompletedSteps((prev) => [...prev, 0])
      if (tick === 40) setCompletedSteps((prev) => [...prev, 1])
      if (tick === 60) setCompletedSteps((prev) => [...prev, 2])
      if (tick === 80) setCompletedSteps((prev) => [...prev, 3])
      if (tick === 98) setCompletedSteps((prev) => [...prev, 4])

      if (tick === PAUSE_AT_DEVICE) {
        phaseRef.current = 'q1'
        setPhase('q1')
        return
      }
      if (tick === PAUSE_AT_COMMITMENT) {
        phaseRef.current = 'q2'
        setPhase('q2')
        return
      }
      if (tick >= 100) {
        if (intervalRef.current) window.clearInterval(intervalRef.current)
        phaseRef.current = 'done'
        setPhase('done')
      }
    }, TICK_MS)
  }

  useEffect(() => {
    startTicking()
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % loadingCopy.testimonials.length)
    }, 2200)
    return () => window.clearInterval(interval)
  }, [loadingCopy.testimonials.length])

  useEffect(() => {
    if (phase !== 'done') return
    const timeout = window.setTimeout(() => onComplete(microRef.current), 800)
    return () => window.clearTimeout(timeout)
  }, [phase, onComplete])

  const resumeTicking = () => {
    phaseRef.current = 'loading'
    setPhase('loading')
    startTicking()
  }

  const handleDeviceSelect = (value: string) => {
    setDeviceValue(value)
    microRef.current = { ...microRef.current, device: value }
    phaseRef.current = 'q1-confirm'
    setPhase('q1-confirm')
    window.setTimeout(resumeTicking, 1400)
  }

  const handleCommitmentSelect = (value: string) => {
    setCommitmentValue(value)
    setCommitmentCopy(loadingCopy.commitmentConfirm[value as keyof typeof loadingCopy.commitmentConfirm] ?? loadingCopy.commitmentConfirm.trying)
    microRef.current = { ...microRef.current, commitment: value }
    phaseRef.current = 'q2-confirm'
    setPhase('q2-confirm')
    window.setTimeout(resumeTicking, 1800)
  }

  const steps = loadingCopy.steps
  const activeStepIndex = Math.min(Math.floor((progress / 100) * steps.length), steps.length - 1)
  const testimonial = loadingCopy.testimonials[testimonialIndex % loadingCopy.testimonials.length]
  const showDeviceQuestion = phase === 'q1' || phase === 'q1-confirm'
  const showCommitmentQuestion = phase === 'q2' || phase === 'q2-confirm'

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center px-4 pt-8 pb-12">
      <div className="mb-8 w-full">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold tracking-widest text-sw-blue uppercase">{loadingCopy.header}</span>
          <span className="text-sm font-bold text-sw-dark">{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-sw-grey-light">
          <div className="h-full rounded-full bg-sw-blue transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {showDeviceQuestion ? (
        <div className="w-full animate-fade-up">
          <p className="mb-3 text-center text-xs font-bold tracking-widest text-sw-blue uppercase">{loadingCopy.quickQuestion}</p>
          <h2 className="mb-2 text-center text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
            {loadingCopy.deviceTitle}
          </h2>
          <p className="mb-6 text-center text-sm text-sw-grey">{loadingCopy.deviceSubtext}</p>
          <div className="flex flex-col gap-3">
            {deviceOptions.map((option) => {
              const isSelected = deviceValue === option.value && phase === 'q1-confirm'
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => phase === 'q1' && handleDeviceSelect(option.value)}
                  disabled={phase === 'q1-confirm'}
                  className={`flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all duration-150 active:scale-[0.98] ${
                    isSelected
                      ? 'border-sw-blue bg-sw-blue-light'
                      : 'border-sw-border bg-sw-white hover:border-sw-blue hover:bg-sw-blue-light'
                  }`}
                >
                  <span className="w-9 flex-shrink-0 text-center text-2xl">{option.emoji}</span>
                  <span
                    className={`flex-1 text-base leading-snug font-semibold sm:text-lg ${
                      isSelected ? 'text-sw-blue' : 'text-sw-dark'
                    }`}
                  >
                    {option.label}
                  </span>
                  {isSelected ? (
                    <span className="flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-sw-blue">
                      <Check className="size-3 text-sw-white" strokeWidth={2.5} />
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>
          {phase === 'q1-confirm' ? (
            <div className="mt-5 animate-fade-in rounded-2xl border border-sw-blue/25 bg-sw-blue-light px-5 py-3 text-center">
              <p className="text-sm font-bold text-sw-blue">{loadingCopy.deviceConfirm}</p>
            </div>
          ) : null}
        </div>
      ) : null}

      {showCommitmentQuestion ? (
        <div className="w-full animate-fade-up">
          <p className="mb-3 text-center text-xs font-bold tracking-widest text-sw-blue uppercase">{loadingCopy.almostThere}</p>
          <h2 className="mb-2 text-center text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
            {loadingCopy.commitmentQuestion}
          </h2>
          <p className="mb-6 text-center text-sm text-sw-grey">{loadingCopy.commitmentSubtext}</p>
          <div className="flex flex-col gap-3">
            {commitmentOptions.map((option) => {
              const isSelected = commitmentValue === option.value && phase === 'q2-confirm'
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => phase === 'q2' && handleCommitmentSelect(option.value)}
                  disabled={phase === 'q2-confirm'}
                  className={`flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all duration-150 active:scale-[0.98] ${
                    isSelected
                      ? 'border-sw-blue bg-sw-blue-light'
                      : 'border-sw-border bg-sw-white hover:border-sw-blue hover:bg-sw-blue-light'
                  }`}
                >
                  <span className="w-9 flex-shrink-0 text-center text-2xl">{option.emoji}</span>
                  <span
                    className={`flex-1 text-base leading-snug font-semibold sm:text-lg ${
                      isSelected ? 'text-sw-blue' : 'text-sw-dark'
                    }`}
                  >
                    {option.label}
                  </span>
                  {isSelected ? (
                    <span className="flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-sw-blue">
                      <Check className="size-3 text-sw-white" strokeWidth={2.5} />
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>
          {phase === 'q2-confirm' ? (
            <div className="mt-5 animate-fade-in rounded-2xl border border-sw-blue/25 bg-sw-blue-light px-5 py-3 text-center">
              <p className="text-sm font-bold text-sw-blue">{commitmentCopy}</p>
            </div>
          ) : null}
        </div>
      ) : null}

      {!showDeviceQuestion && !showCommitmentQuestion ? (
        <>
          <div className="mb-8 flex w-full max-w-xs flex-col gap-2">
            {steps.map((label, index) => {
              const isComplete = completedSteps.includes(index)
              const isActive = index === activeStepIndex && !isComplete
              return (
                <div
                  key={label}
                  className={`flex items-center gap-3 transition-opacity duration-300 ${
                    isComplete || isActive ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  <span
                    className={`flex size-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      isComplete
                        ? 'bg-sw-success text-sw-white'
                        : isActive
                          ? 'animate-pulse bg-sw-blue text-sw-white'
                          : 'bg-sw-grey-light text-sw-grey'
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

          <div key={testimonialIndex} className="w-full max-w-sm animate-fade-in rounded-2xl bg-sw-grey-light p-5">
            <div className="mb-2 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-sm text-sw-amber">
                  ★
                </span>
              ))}
            </div>
            <p className="mb-3 text-sm leading-relaxed font-medium text-sw-dark">&ldquo;{testimonial.text}&rdquo;</p>
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-full bg-sw-blue-light text-xs font-bold text-sw-blue">
                {testimonial.name[0]}
              </div>
              <div>
                <p className="text-xs font-bold text-sw-dark">{testimonial.name}</p>
                <p className="text-xs text-sw-grey">{testimonial.role}</p>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
