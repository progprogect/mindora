import { useEffect, useRef, useState } from 'react'
import Logo from '@/funnels/claude/components/Logo'

interface ClaudeNameCaptureScreenProps {
  onSubmit: (name: string) => void
}

/** Port of `ve()` — «What should we call you?» with fixed bottom Continue CTA. */
export default function ClaudeNameCaptureScreen({ onSubmit }: ClaudeNameCaptureScreenProps) {
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
    <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-sw-white">
      <header className="sticky top-0 z-50 border-b border-sw-border bg-sw-white">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-center px-4">
          <Logo />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-12 pb-40 animate-fade-up">
        <h1 className="mb-3 text-center text-3xl leading-tight font-extrabold text-sw-dark sm:text-4xl">
          What should we call you?
        </h1>
        <p className="mb-10 text-center text-sm text-sw-grey">
          We&apos;ll personalise your Claude certification path with your name
        </p>
        <input
          ref={inputRef}
          type="text"
          name="firstName"
          id="claude-quiz-first-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Enter your first name"
          autoComplete="given-name"
          className="w-full rounded-2xl border-2 border-sw-border bg-sw-white px-5 py-4 text-lg text-sw-dark placeholder:text-sw-grey/60 outline-none transition-colors focus:border-sw-blue"
        />
      </main>

      <div
        className="fixed inset-x-0 bottom-0 z-50 px-4 pt-10"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.92) 40%, white 65%)' }}
      >
        <div className="mx-auto max-w-lg">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!trimmed}
            className="w-full rounded-full bg-sw-blue py-4 text-base font-bold text-sw-white shadow-lg transition-all duration-150 hover:bg-sw-blue-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
          </button>
        </div>
        <div style={{ paddingTop: '56px', paddingBottom: 'env(safe-area-inset-bottom)' }} />
      </div>
    </div>
  )
}
