import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchWiseThreads } from '@/lib/api'

const WISE_AVATAR = '/assets/wise.png'

function relativeTime(stamp: number) {
  const elapsed = Date.now() - stamp
  const minutes = Math.floor(elapsed / 60000)
  const hours = Math.floor(elapsed / 3600000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const then = new Date(stamp)
  then.setHours(0, 0, 0, 0)
  const days = Math.round((today.getTime() - then.getTime()) / 86400000)
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  return new Date(stamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function fallbackTitle(createdAt: number) {
  return new Date(createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: new Date(createdAt).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
  })
}

type Thread = {
  id: string
  title: string
  updatedAt: number
  lastMessageAt: number
  preview: string
  messageCount: number
  createdAt: number
}

export default function WiseHistoryPage() {
  const [threads, setThreads] = useState<Thread[] | undefined>()
  const [query, setQuery] = useState('')

  useEffect(() => {
    void fetchWiseThreads()
      .then((data) => setThreads(data.threads))
      .catch(() => setThreads([]))
  }, [])

  const filtered = threads?.filter((thread) => {
    if (!query.trim()) return true
    const needle = query.toLowerCase()
    return (thread.title ?? '').toLowerCase().includes(needle) || (thread.preview ?? '').toLowerCase().includes(needle)
  })

  if (threads === undefined) {
    return (
      <div className="flex flex-col h-[100dvh] bg-white">
        <HistoryHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex gap-1.5">
            {[0, 150, 300].map((delay) => (
              <span key={delay} className="w-2 h-2 bg-sw-grey/40 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-white">
      <HistoryHeader />
      {threads.length > 0 ? (
        <div className="px-4 py-2.5 border-b border-sw-grey-border/30">
          <div className="relative">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sw-grey/50"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-sw-grey-light/40 border border-sw-grey-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-sw-blue/20 focus:border-sw-blue/40 placeholder:text-sw-grey/50"
            />
          </div>
        </div>
      ) : null}
      <div className="flex-1 overflow-y-auto">
        {threads.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 px-6">
            <div className="w-14 h-14 rounded-full bg-sw-grey-light/60 flex items-center justify-center mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-sw-grey"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-sw-dark mb-1">No conversations yet</p>
            <p className="text-xs text-sw-grey mb-5 max-w-[220px] leading-relaxed">
              Start chatting with Wise and your conversations will appear here.
            </p>
            <Link to="/app/wise" className="text-sm font-bold text-white bg-sw-blue rounded-xl px-5 py-2.5 active:scale-95 transition-transform">
              Start a conversation
            </Link>
          </div>
        ) : filtered && filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <p className="text-sm text-sw-grey">No conversations matching &quot;{query}&quot;</p>
          </div>
        ) : (
          <div className="divide-y divide-sw-grey-border/30">
            {(filtered ?? []).map((thread) => (
              <Link
                key={thread.id}
                to={`/app/wise?conversationId=${thread.id}`}
                className="flex items-start gap-3 px-4 py-4 hover:bg-sw-grey-light/30 active:bg-sw-grey-light/50 transition-colors"
              >
                <img src={WISE_AVATAR} alt="Wise" className="w-9 h-9 rounded-full object-cover flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-sw-dark truncate">{thread.title || fallbackTitle(thread.createdAt)}</p>
                    <span className="text-[11px] text-sw-grey flex-shrink-0">{relativeTime(thread.lastMessageAt)}</span>
                  </div>
                  <p className="text-xs text-sw-grey leading-relaxed line-clamp-2">{thread.preview || 'No messages yet'}</p>
                  <p className="text-[10px] text-sw-grey/60 mt-1">
                    {thread.messageCount} message{thread.messageCount !== 1 ? 's' : ''}
                  </p>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-sw-grey/40 flex-shrink-0 mt-1.5"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function HistoryHeader() {
  return (
    <header className="flex items-center gap-3 px-4 py-3 border-b border-sw-grey-border/50 bg-white sticky top-0 z-10">
      <Link to="/app/wise" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sw-grey-light/50 transition-colors">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </Link>
      <div>
        <h1 className="text-base font-bold text-sw-dark leading-tight">Conversation History</h1>
        <p className="text-xs text-sw-grey">All your chats with Wise</p>
      </div>
    </header>
  )
}
