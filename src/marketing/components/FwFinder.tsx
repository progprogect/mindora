import { useState } from 'react'
import { FINDER, FINDER_THEME } from '@/marketing/data/financialWellbeing'

function pickResult(answers: Record<string, string>) {
  const q1 = answers.q1
  const q2 = answers.q2
  const results = FINDER.results
  if (q1 === 'anxiety' || q2 === 'confident') return results[0]
  if (q1 === 'habits' || q2 === 'free') return results[1]
  if (q1 === 'earn' || q2 === 'growth') return results[2]
  return results[3]
}

export default function FwFinder() {
  const [step, setStep] = useState<number | 'result'>(1)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selected, setSelected] = useState<string | null>(null)
  const current = step !== 'result' ? FINDER.steps[step - 1] : null

  function next() {
    if (!selected || step === 'result') return
    const key = `q${step}`
    const nextAnswers = { ...answers, [key]: selected }
    setAnswers(nextAnswers)
    setSelected(null)
    setStep(step === 3 ? 'result' : step + 1)
  }

  function retake() {
    setStep(1)
    setAnswers({})
    setSelected(null)
  }

  const result = step === 'result' ? pickResult(answers) : null
  const theme = result ? FINDER_THEME[result.color] : null

  return (
    <section
      id="financial-finder"
      className="overflow-hidden py-16 sm:py-20"
      style={{ background: 'linear-gradient(180deg, #0c0a04 0%, #fafaf8 60%)' }}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-sw-amber uppercase">
            Money Profile Finder
          </p>
          <h2 className="mb-3 text-2xl font-extrabold text-white sm:text-3xl">
            Find Your Financial Starting Point
          </h2>
          <p className="text-base text-white/60">
            3 quick questions → your personalised course recommendation
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-sw-grey-border bg-white shadow-xl">
          {step !== 'result' && current ? (
            <>
              <div className="h-1.5 bg-sw-grey-light">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${(step / 3) * 100}%`,
                    background: 'linear-gradient(90deg, #D97706, #F59E0B)',
                  }}
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wide text-sw-grey uppercase">
                    Step {step} of 3
                  </span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className="h-1.5 w-6 rounded-full transition-all duration-300"
                        style={{ background: n <= step ? '#F59E0B' : '#E5E7EB' }}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="mb-6 text-lg leading-tight font-bold text-sw-dark sm:text-xl">
                  {current.question}
                </h3>
                <div className="space-y-3">
                  {current.options.map((opt) => {
                    const on = selected === opt.id
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelected(opt.id)}
                        className="flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200"
                        style={{
                          borderColor: on ? '#F59E0B' : '#E5E7EB',
                          background: on ? 'rgba(245,158,11,0.08)' : 'white',
                        }}
                      >
                        <span className="shrink-0 text-2xl">{opt.emoji}</span>
                        <span
                          className={`text-sm font-medium ${on ? 'text-sw-dark' : 'text-sw-grey'}`}
                        >
                          {opt.label}
                        </span>
                        {on ? (
                          <div
                            className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                            style={{ background: '#F59E0B' }}
                          >
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                              <path
                                d="M2 5l2 2 4-4"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        ) : null}
                      </button>
                    )
                  })}
                </div>
                <button
                  type="button"
                  onClick={next}
                  disabled={!selected}
                  className="mt-6 w-full rounded-xl py-4 text-base font-bold text-white transition-all disabled:cursor-not-allowed disabled:opacity-40"
                  style={{
                    background: selected ? 'linear-gradient(135deg, #D97706, #F59E0B)' : undefined,
                    backgroundColor: selected ? undefined : '#E5E7EB',
                  }}
                >
                  {step === 3 ? 'See My Recommendation →' : 'Next Question →'}
                </button>
              </div>
            </>
          ) : result && theme ? (
            <div className="p-6 sm:p-8">
              <div className="mb-6 text-center">
                <div className="mb-3 text-5xl">{result.emoji}</div>
                <div
                  className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase"
                  style={{ background: theme.badge, color: theme.text }}
                >
                  Your Recommended Path
                </div>
                <h3 className="mb-3 text-xl font-extrabold text-sw-dark sm:text-2xl">{result.title}</h3>
                <p className="mx-auto max-w-sm text-sm leading-relaxed text-sw-grey">
                  {result.description}
                </p>
              </div>
              <div
                className="mb-6 rounded-xl border p-4"
                style={{ background: theme.bg, borderColor: theme.border }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-sm font-bold" style={{ color: theme.text }}>
                    Start with:
                  </span>
                </div>
                <div className="text-base font-extrabold text-sw-dark">{result.path}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.courses.slice(0, 3).map((id) => (
                    <span
                      key={id}
                      className="rounded-full border border-sw-grey-border bg-white px-2.5 py-1 text-xs text-sw-grey"
                    >
                      {id.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="mb-3 w-full rounded-xl py-4 text-base font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${theme.text}, ${theme.text}cc)` }}
              >
                Start My Path — It&apos;s Free →
              </button>
              <button
                type="button"
                onClick={retake}
                className="w-full rounded-xl py-3 text-sm font-medium text-sw-grey transition-colors hover:text-sw-dark"
              >
                ← Retake the quiz
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
