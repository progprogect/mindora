import { useEffect, useRef, useState } from 'react'
import QuizStickyCta from '@/funnels/shared/components/QuizStickyCta'
import type { NameScreenDef } from '@/funnels/shared/types'

interface NameCaptureScreenProps {
  screen: NameScreenDef
  onSubmit: (name: string) => void
}

export default function NameCaptureScreen({ screen, onSubmit }: NameCaptureScreenProps) {
  const [name, setName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const timeout = window.setTimeout(() => inputRef.current?.focus(), 300)
    return () => window.clearTimeout(timeout)
  }, [])

  const trimmed = name.trim()
  const handleSubmit = () => {
    if (!trimmed) return
    onSubmit(trimmed)
  }

  return (
    <>
      <div className="flex w-full flex-1 flex-col px-4 pt-12 pb-40 animate-fade-up">
        {screen.showEmailConfirmed ? (
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sw-success/20 bg-sw-success-light px-3 py-1.5 text-xs font-bold text-sw-success">
              ✓ Email confirmed
            </span>
          </div>
        ) : null}
        <h1 className="mb-3 text-center text-3xl leading-tight font-extrabold text-sw-dark sm:text-4xl">
          {screen.title}
        </h1>
        <p className="mb-10 text-center text-sm text-sw-grey">{screen.subtitle}</p>
        <div className="relative">
          {screen.inputIcon ? (
            <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lg" aria-hidden>
              👤
            </span>
          ) : null}
          <input
            ref={inputRef}
            type="text"
            autoComplete="given-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder={screen.placeholder}
            className={`w-full rounded-2xl border-2 border-sw-grey-border bg-white py-4 text-lg text-sw-dark outline-none transition-colors placeholder:text-sw-grey/60 focus:border-sw-blue ${
              screen.inputIcon ? 'pr-5 pl-11' : 'px-5'
            }`}
          />
        </div>
        {screen.privacyNote ? (
          <p className="mt-3 text-center text-xs text-sw-grey">{screen.privacyNote}</p>
        ) : null}
      </div>
      <QuizStickyCta>
        <button type="button" onClick={handleSubmit} disabled={!trimmed} className="sw-cta">
          {screen.ctaLabel}
        </button>
      </QuizStickyCta>
    </>
  )
}
