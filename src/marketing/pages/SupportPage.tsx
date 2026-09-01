import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import FaqAccordion from '@/marketing/components/FaqAccordion'
import MayaChat, { OPEN_MAYA_EVENT } from '@/marketing/components/MayaChat'
import SupportContactForm from '@/marketing/components/SupportContactForm'
import {
  FAQ_ARTICLES,
  FAQ_CATEGORIES,
  POPULAR_IDS,
  searchFaq,
} from '@/marketing/data/faq'
import { ROUTES } from '@/marketing/data/nav'
import usePageTitle from '@/marketing/hooks/usePageTitle'

export default function SupportPage() {
  usePageTitle('Support Center — MindoraAcademy.com | Help, Billing, Refunds & FAQs')
  const [params] = useSearchParams()
  const autoOpen = params.get('chat') === 'open'
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)
  const [transcript, setTranscript] = useState<string>()
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const results = useMemo(() => (query.trim() ? searchFaq(query) : null), [query])
  const popular = useMemo(
    () => FAQ_ARTICLES.filter((a) => (POPULAR_IDS as readonly string[]).includes(a.id)),
    [],
  )

  useEffect(() => {
    if (autoOpen) {
      console.log('[Support] chat deep-link detected — opening Maya')
    }
  }, [autoOpen])

  const scrollToCategory = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id))

  return (
    <>
      <section className="bg-sw-dark px-4 py-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-white/50 uppercase">
            Support Center
          </p>
          <h1 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">How can we help you?</h1>
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sw-blue px-3 py-1.5 text-xs font-bold text-white">
              <span aria-hidden="true">⚡</span>
              Chat with Maya for instant support
            </span>
          </div>
          <div className="relative mx-auto max-w-lg">
            <div className="absolute top-1/2 left-4 -translate-y-1/2 text-white/40">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
                <path d="M14 14l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for answers..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pr-4 pl-12 text-base text-white backdrop-blur-sm transition-all placeholder-white/40 focus:border-sw-blue/50 focus:ring-2 focus:ring-sw-blue/50 focus:outline-none"
              aria-label="Search support articles"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <section className="mb-10">
          <MayaChat
            autoOpen={autoOpen}
            onEscalate={(text) => {
              setTranscript(text)
              setTimeout(() => {
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
              }, 200)
            }}
          />
        </section>

        {results !== null ? (
          <section className="mb-10">
            <p className="mb-4 text-sm font-semibold text-sw-grey">
              {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
            </p>
            {results.length === 0 ? (
              <div className="rounded-2xl border border-sw-grey-border bg-white p-8 text-center">
                <p className="mb-3 text-2xl">🤔</p>
                <p className="mb-2 font-semibold text-sw-dark">No articles found</p>
                <p className="text-sm text-sw-grey">
                  Try different keywords, or{' '}
                  <a
                    href="#contact-form"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="cursor-pointer font-semibold text-sw-blue hover:underline"
                  >
                    contact our team
                  </a>
                  .
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((article) => (
                  <FaqAccordion
                    key={article.id}
                    article={article}
                    isOpen={openId === article.id}
                    onToggle={() => toggle(article.id)}
                    categoryLabel={article.categoryTitle}
                  />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            <section className="mb-12">
              <h2 className="mb-5 text-lg font-extrabold text-sw-dark">Browse by topic</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {FAQ_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => scrollToCategory(cat.id)}
                    className="rounded-2xl border border-sw-grey-border bg-white p-4 text-left transition-all hover:border-sw-blue hover:shadow-sm"
                  >
                    <span className="mb-2 block text-2xl">{cat.icon}</span>
                    <span className="mb-1 block text-sm font-bold text-sw-dark">{cat.title}</span>
                    <span className="hidden text-xs leading-relaxed text-sw-grey sm:block">
                      {cat.description}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="mb-5 text-lg font-extrabold text-sw-dark">Most popular questions</h2>
              <div className="space-y-3">
                {popular.map((article) => (
                  <FaqAccordion
                    key={`pop-${article.id}`}
                    article={article}
                    isOpen={openId === `pop-${article.id}`}
                    onToggle={() => toggle(`pop-${article.id}`)}
                    categoryLabel={article.categoryTitle}
                  />
                ))}
              </div>
            </section>

            {FAQ_CATEGORIES.map((cat) => (
              <section
                key={cat.id}
                ref={(el) => {
                  sectionRefs.current[cat.id] = el
                }}
                className="mb-12 scroll-mt-24"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-xl">{cat.icon}</span>
                  <h2 className="text-lg font-extrabold text-sw-dark">{cat.title}</h2>
                </div>
                <div className="space-y-3">
                  {cat.articles.map((article) => (
                    <FaqAccordion
                      key={article.id}
                      article={article}
                      isOpen={openId === article.id}
                      onToggle={() => toggle(article.id)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </>
        )}

        <section className="mb-10">
          <h2 className="mb-4 text-lg font-extrabold text-sw-dark">Quick actions</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Link
              to="/app/profile"
              className="group flex items-center gap-3 rounded-xl border border-sw-grey-border bg-white p-4 transition-all hover:border-sw-blue/50 hover:shadow-sm"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-red-50">
                <span className="text-base">✋</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-sw-dark transition-colors group-hover:text-sw-blue">
                  Cancel subscription
                </p>
                <p className="text-[11px] text-sw-grey">Go to your profile to cancel</p>
              </div>
            </Link>
            <a
              href="#contact-form"
              className="group flex items-center gap-3 rounded-xl border border-sw-grey-border bg-white p-4 transition-all hover:border-sw-blue/50 hover:shadow-sm"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-green-50">
                <span className="text-base">🛡️</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-sw-dark transition-colors group-hover:text-sw-blue">
                  Request a refund
                </p>
                <p className="text-[11px] text-sw-grey">30-day money-back guarantee</p>
              </div>
            </a>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(OPEN_MAYA_EVENT))}
              className="group flex items-center gap-3 rounded-xl border border-sw-grey-border bg-white p-4 text-left transition-all hover:border-sw-blue/50 hover:shadow-sm"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
                <span className="text-base">🔑</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-sw-dark transition-colors group-hover:text-sw-blue">
                  Can&apos;t log in?
                </p>
                <p className="text-[11px] text-sw-grey">Ask Maya — answers in minutes, 24/7</p>
              </div>
            </button>
          </div>
        </section>

        <section id="contact-form" className="mb-10 scroll-mt-24">
          <h2 className="mb-3 text-lg font-extrabold text-sw-dark">Still need help?</h2>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sw-blue/10 px-3 py-1.5 text-xs font-bold text-sw-blue">
              <span aria-hidden="true">⚡</span>
              Chat with Maya for instant support
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sw-grey-border bg-white px-3 py-1.5 text-xs font-semibold text-sw-grey">
              <span aria-hidden="true">✉️</span>
              Email support for answers 1-3 business days
            </span>
          </div>
          <SupportContactForm transcript={transcript} />
        </section>

        <div className="mb-10 flex flex-wrap justify-center gap-4 text-xs text-sw-grey">
          <span className="flex items-center gap-1.5">✅ 30-day money-back guarantee</span>
          <span className="flex items-center gap-1.5">💬 Maya answers in minutes, 24/7</span>
          <span className="flex items-center gap-1.5">🔒 No hidden fees</span>
        </div>

        <div className="pb-6 text-center">
          <Link to={ROUTES.home} className="text-sm text-sw-grey transition-colors hover:text-sw-blue">
            ← Back to MindoraAcademy.com
          </Link>
        </div>
      </div>
    </>
  )
}
