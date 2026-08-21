import { useState } from 'react'
import { UserRound } from 'lucide-react'
import type { NameCaptureScreen as NameCaptureScreenDef } from '@/funnels/twenty-eight-day/types/quiz'

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
    <div className="flex flex-1 flex-col justify-center gap-6 pb-28 animate-fade-up">
      <div className="text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-sw-blue-light">
          <UserRound className="size-7 text-sw-blue" />
        </div>
        <h1 className="text-2xl font-extrabold text-sw-dark">{screen.title}</h1>
        <p className="mt-2 text-sm text-sw-grey">{screen.subtitle}</p>
      </div>

      <input
        type="text"
        autoComplete="given-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Your first name"
        className="w-full rounded-sw-sm border-[2px] border-sw-border px-4 py-3.5 text-base outline-none transition focus:border-sw-blue"
      />

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sw-border bg-sw-white/95 p-4 backdrop-blur safe-bottom">
        <div className="mx-auto max-w-xl">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="w-full rounded-sw-sm bg-sw-blue py-3.5 font-extrabold tracking-wide text-sw-white transition hover:bg-sw-blue-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            SEE MY RESULTS →
          </button>
        </div>
      </div>
    </div>
  )
}
