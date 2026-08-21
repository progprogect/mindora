import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'

interface ClaudeLoadingScreenProps {
  onComplete: (micro: { device: string; commitment: string }) => void
}

interface OptionDef {
  emoji: string
  label: string
  value: string
}

const STEPS = [
  'Analysing your Claude experience...',
  'Mapping your skill gaps...',
  'Selecting your certification modules...',
  'Building your personalised path...',
  'Your Claude AI Certification plan is ready!',
]

const HEADER_TEXT = 'Building your certification path...'
const COMMITMENT_QUESTION = 'How committed are you to earning your Claude certification?'

/** Default testimonials — the production bundle doesn't override these for the Claude funnel. */
const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    role: 'Marketing Manager',
    text: 'I went from knowing nothing about AI to automating half my weekly tasks. The 28-day structure made it feel completely achievable.',
  },
  {
    name: 'James K.',
    role: 'Software Engineer',
    text: 'I thought I already knew AI pretty well, but SuccessWise showed me workflows I never even considered. Game-changer.',
  },
  {
    name: 'Priya T.',
    role: 'Freelance Designer',
    text: 'Finally a course that respects my time. 10 minutes a day and I genuinely feel confident using AI in my projects now.',
  },
  {
    name: 'David R.',
    role: 'Operations Lead',
    text: "The personal path was what sold it. It wasn't generic — it felt built for someone in my exact situation.",
  },
  {
    name: 'Emma L.',
    role: 'HR Director',
    text: "I was terrified of being left behind by AI. SuccessWise completely transformed how I see it. Now I'm excited about it.",
  },
]

const DEVICE_OPTIONS: OptionDef[] = [
  { emoji: '📱', label: 'My phone', value: 'phone' },
  { emoji: '💻', label: 'My laptop', value: 'laptop' },
  { emoji: '🖥️', label: 'My desktop', value: 'desktop' },
  { emoji: '📱💻', label: 'Mix of devices', value: 'mix' },
]

const COMMITMENT_OPTIONS: OptionDef[] = [
  { emoji: '🏆', label: 'Fully committed', value: 'full' },
  { emoji: '💪', label: 'Very committed', value: 'high' },
  { emoji: '🙂', label: 'Pretty committed', value: 'medium' },
  { emoji: '🤞', label: "I'll try my best", value: 'trying' },
]

const COMMITMENT_CONFIRM_COPY: Record<string, string> = {
  full: "🔥 That's the mindset. Your plan is almost ready!",
  high: '💪 Love that. Your plan is almost ready!',
  medium: '🙂 Every step counts. Your plan is almost ready!',
  trying: "🤞 We've got you. Your plan is almost ready!",
}

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
      setTestimonialIndex((i) => (i + 1) % TESTIMONIALS.length)
    }, 2200)
    return () => window.clearInterval(interval)
  }, [])

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
    setCommitmentCopy(COMMITMENT_CONFIRM_COPY[value] ?? COMMITMENT_CONFIRM_COPY.trying)
    microRef.current = { ...microRef.current, commitment: value }
    phaseRef.current = 'q2-confirm'
    setPhase('q2-confirm')
    window.setTimeout(resumeTicking, 1800)
  }

  const activeStepIndex = Math.min(Math.floor((progress / 100) * STEPS.length), STEPS.length - 1)
  const testimonial = TESTIMONIALS[testimonialIndex % TESTIMONIALS.length]
  const showDeviceQuestion = phase === 'q1' || phase === 'q1-confirm'
  const showCommitmentQuestion = phase === 'q2' || phase === 'q2-confirm'

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center px-4 pt-8 pb-12">
      <div className="mb-8 w-full">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold tracking-widest text-sw-blue uppercase">{HEADER_TEXT}</span>
          <span className="text-sm font-bold text-sw-dark">{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-sw-grey-light">
          <div className="h-full rounded-full bg-sw-blue transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {showDeviceQuestion ? (
        <div className="w-full animate-fade-up">
          <p className="mb-3 text-center text-xs font-bold tracking-widest text-sw-blue uppercase">Quick question</p>
          <h2 className="mb-2 text-center text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
            Where will you mostly be learning?
          </h2>
          <p className="mb-6 text-center text-sm text-sw-grey">We&apos;ll optimise your plan for it</p>
          <div className="flex flex-col gap-3">
            {DEVICE_OPTIONS.map((option) => {
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
              <p className="text-sm font-bold text-sw-blue">✓ Perfect — we&apos;ll optimise your plan for that!</p>
            </div>
          ) : null}
        </div>
      ) : null}

      {showCommitmentQuestion ? (
        <div className="w-full animate-fade-up">
          <p className="mb-3 text-center text-xs font-bold tracking-widest text-sw-blue uppercase">Almost there</p>
          <h2 className="mb-2 text-center text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
            {COMMITMENT_QUESTION}
          </h2>
          <p className="mb-6 text-center text-sm text-sw-grey">Be honest — your plan adapts to you</p>
          <div className="flex flex-col gap-3">
            {COMMITMENT_OPTIONS.map((option) => {
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
            {STEPS.map((label, index) => {
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
