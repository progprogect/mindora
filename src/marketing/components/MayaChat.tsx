import { useCallback, useEffect, useRef, useState } from 'react'
import { MAYA_CHIPS, matchFaqAnswer } from '@/marketing/data/faq'

export const OPEN_MAYA_EVENT = 'successwise:open-support-chat'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function MayaChat({
  autoOpen,
  onEscalate,
}: {
  autoOpen?: boolean
  onEscalate?: (transcript: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [attached, setAttached] = useState(false)
  const scroller = useRef<HTMLDivElement>(null)
  const field = useRef<HTMLInputElement>(null)

  const openChat = useCallback(() => {
    setOpen(true)
    setMessages((prev) => {
      if (prev.length > 0) return prev
      return [
        {
          id: 'welcome',
          role: 'assistant',
          content:
            "Hi! 👋 I'm Maya, your friendly AI support assistant. I can help you with billing questions, account access, refunds, cancellations, and more.\n\nWhat can I help you with today?",
          timestamp: Date.now(),
        },
      ]
    })
  }, [])

  useEffect(() => {
    if (autoOpen) openChat()
  }, [autoOpen, openChat])

  useEffect(() => {
    const onOpen = () => openChat()
    window.addEventListener(OPEN_MAYA_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_MAYA_EVENT, onOpen)
  }, [openChat])

  useEffect(() => {
    if (open && field.current) {
      setTimeout(() => field.current?.focus({ preventScroll: true }), 100)
    }
  }, [open])

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' })
  }, [messages, busy])

  const reply = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || busy) return
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: 'user', content: trimmed, timestamp: Date.now() },
    ])
    setInput('')
    setBusy(true)
    await new Promise((r) => setTimeout(r, 450))
    const matched = matchFaqAnswer(trimmed)
    setMessages((prev) => [
      ...prev,
      {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content:
          matched ??
          "I'm sorry, I'm having trouble right now. Please try again or use the contact form below to reach our team directly.",
        timestamp: Date.now(),
      },
    ])
    setBusy(false)
  }, [busy])

  const attachTranscript = () => {
    setAttached(true)
    const transcript = messages
      .filter((m) => m.id !== 'welcome')
      .map((m) => `${m.role === 'user' ? 'Customer' : 'AI Assistant'}: ${m.content}`)
      .join('\n\n')
    onEscalate?.(transcript)
  }

  if (!open) {
    return (
      <div className="overflow-hidden rounded-2xl border-2 border-sw-blue/25 bg-white shadow-md">
        <button type="button" onClick={openChat} className="group w-full text-left" aria-label="Open chat with Maya">
          <div className="flex items-center gap-4 px-5 py-6 transition-colors hover:bg-sw-blue/[0.03] sm:px-6 sm:py-7">
            <img
              src="/assets/maya-desk.webp"
              alt="Maya Bennett — AI Support Assistant"
              className="h-24 w-24 flex-shrink-0 rounded-2xl object-cover shadow-sm sm:h-28 sm:w-28"
            />
            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sw-success/10 px-2.5 py-1 text-[11px] font-bold text-sw-success">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sw-success" />
                Online now
              </span>
              <h3 className="mt-2 text-lg leading-tight font-extrabold text-sw-dark sm:text-2xl">
                Chat with Maya
              </h3>
              <p className="mt-1 text-xs text-sw-grey sm:text-sm">
                Your friendly AI assistant — ask anything, any time
              </p>
              <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-sw-blue px-4 py-2 text-xs font-bold text-white transition-colors group-hover:bg-sw-blue-hover sm:text-sm">
                Ask Maya now
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M5 3l4 4-4 4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-sw-grey-border bg-sw-grey-light/40 px-5 py-3 text-[11px] sm:px-6 sm:text-xs">
            <span className="inline-flex items-center gap-1.5 font-bold text-sw-dark">
              ⚡ Chat with Maya for instant support
            </span>
            <span className="text-sw-grey-border" aria-hidden="true">
              |
            </span>
            <span className="inline-flex items-center gap-1.5 text-sw-grey">
              ✉️ Email support for answers 1-3 business days
            </span>
          </div>
        </button>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-sw-grey-border bg-white shadow-sm">
      <div className="flex items-center gap-3 bg-gradient-to-r from-sw-blue to-sw-blue/90 px-4 py-3">
        <div className="relative flex-shrink-0">
          <img
            src="/assets/maya-profile.webp"
            alt="Maya Bennett"
            className="h-10 w-10 rounded-full border-2 border-white/30 object-cover"
          />
          <span className="absolute right-0 bottom-0 h-3 w-3 animate-pulse rounded-full border-2 border-sw-blue bg-green-400" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-white">Maya Bennett</h3>
          <p className="text-[11px] text-white/70">Your Friendly AI Assistant</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10"
          aria-label="Minimize chat"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 8h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div ref={scroller} className="h-80 space-y-4 overflow-y-auto overscroll-contain bg-gray-50/50 px-4 py-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'rounded-br-md bg-sw-blue text-white'
                  : 'rounded-bl-md border border-sw-grey-border bg-white text-sw-dark shadow-sm'
              }`}
            >
              <div className="whitespace-pre-line break-words">{msg.content}</div>
              <p className={`mt-1.5 text-[10px] ${msg.role === 'user' ? 'text-white/60' : 'text-sw-grey'}`}>
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
        {busy ? (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-md border border-sw-grey-border bg-white px-4 py-3 shadow-sm">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 animate-bounce rounded-full bg-sw-grey/60" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-sw-grey/60" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-sw-grey/60" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {messages.length === 1 && !busy ? (
        <div className="border-t border-sw-grey-border bg-white px-4 py-3">
          <p className="mb-2 text-[10px] font-medium tracking-wider text-sw-grey uppercase">
            Common questions:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {MAYA_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => void reply(chip)}
                className="rounded-full border border-sw-blue/20 px-3 py-1.5 text-[11px] text-sw-blue transition-colors hover:bg-sw-blue/5"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="border-t border-sw-grey-border bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            ref={field}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                void reply(input)
              }
            }}
            placeholder="Type your question..."
            disabled={busy}
            className="flex-1 rounded-xl border border-sw-grey-border px-4 py-2.5 text-sm transition-all focus:border-sw-blue focus:ring-2 focus:ring-sw-blue/30 focus:outline-none disabled:opacity-50"
            aria-label="Type a message"
          />
          <button
            type="button"
            onClick={() => void reply(input)}
            disabled={!input.trim() || busy}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-sw-blue transition-colors hover:bg-sw-blue-hover disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send message"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M14 2L7 9M14 2L9.5 14L7 9M14 2L2 6.5L7 9"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {messages.length > 2 && !attached ? (
          <button
            type="button"
            onClick={attachTranscript}
            className="mt-2.5 w-full py-1.5 text-center text-[11px] font-medium text-sw-grey transition-colors hover:text-sw-blue"
          >
            Maya can usually sort this in minutes — try rephrasing your question.{' '}
            <span className="font-semibold text-sw-blue underline underline-offset-2">
              Pass it to a human instead →
            </span>
          </button>
        ) : null}
        {attached ? (
          <p className="mt-2.5 text-center text-[11px] font-medium text-sw-success">
            ✓ Transcript attached — scroll down to complete the form and we&apos;ll follow up personally.
          </p>
        ) : null}
      </div>
    </div>
  )
}
