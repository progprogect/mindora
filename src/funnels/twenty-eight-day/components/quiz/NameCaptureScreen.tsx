import { useState } from 'react'
import type { NameCaptureScreen as NameCaptureScreenDef } from '@/funnels/twenty-eight-day/types/quiz'
import QuizStickyCta from '@/funnels/twenty-eight-day/components/quiz/QuizStickyCta'

interface NameCaptureScreenProps {
  screen: NameCaptureScreenDef
  onSubmit: (name: string) => void
}

export default function NameCaptureScreen({ screen, onSubmit }: NameCaptureScreenProps) {
  const [name, setName] = useState('')

  const handleSubmit = () => {
    const trimmed = name.trim()
    if (!trimmed) return
    onSubmit(trimmed)
  }

  return (
    <>
      <div className="flex w-full flex-1 flex-col px-4 pt-12 pb-40 animate-fade-up">
        <h1 className="mb-3 text-center text-3xl leading-tight font-extrabold text-sw-dark sm:text-4xl">
          {screen.title}
        </h1>
        <p className="mb-10 text-center text-sm text-sw-grey">{screen.subtitle}</p>

        <input
          type="text"
          autoComplete="given-name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Enter your first name"
          className="w-full rounded-2xl border-2 border-sw-grey-border bg-white px-5 py-4 text-lg text-sw-dark outline-none transition-colors placeholder:text-sw-grey/60 focus:border-sw-blue"
        />
      </div>

      <QuizStickyCta>
        <button type="button" onClick={handleSubmit} disabled={!name.trim()} className="sw-cta">
          Continue
        </button>
      </QuizStickyCta>
    </>
  )
}
