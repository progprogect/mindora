import { withLocale } from '../../../authorisation/src/i18n/locale'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import FaqAccordion from '@/marketing/components/FaqAccordion'
import MayaChat, { OPEN_MAYA_EVENT } from '@/marketing/components/MayaChat'
import SupportContactForm from '@/marketing/components/SupportContactForm'
import { faqCopy, searchFaq, supportUiCopy } from '@/marketing/data/faq'
import { moneyBackCopy } from '@/marketing/data/moneyBack'
import { ROUTES } from '@/marketing/data/nav'
import usePageTitle from '@/marketing/hooks/usePageTitle'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'

export default function SupportPage() {
  const { locale } = useI18n()
  const ui = supportUiCopy(locale)
  const faq = faqCopy(locale)
  const moneyBack = moneyBackCopy(locale)
  usePageTitle(ui.pageTitle)
  const [params] = useSearchParams()
  const autoOpen = params.get('chat') === 'open'
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)
  const [transcript, setTranscript] = useState<string>()
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const results = useMemo(
    () => (query.trim() ? searchFaq(query, locale) : null),
    [query, locale],
  )
  const popular = useMemo(
    () => faq.articles.filter((a) => (faq.popularIds as readonly string[]).includes(a.id)),
    [faq.articles, faq.popularIds],
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
            {ui.kicker}
          </p>
          <h1 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">{ui.heading}</h1>
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sw-blue px-3 py-1.5 text-xs font-bold text-white">
              <span aria-hidden="true">⚡</span>
              {ui.mayaBadge}
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
              placeholder={ui.searchPlaceholder}
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pr-4 pl-12 text-base text-white backdrop-blur-sm transition-all placeholder-white/40 focus:border-sw-blue/50 focus:ring-2 focus:ring-sw-blue/50 focus:outline-none"
              aria-label={ui.searchAria}
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
              {ui.resultsFor(results.length, query)}
            </p>
            {results.length === 0 ? (
              <div className="rounded-2xl border border-sw-grey-border bg-white p-8 text-center">
                <p className="mb-3 text-2xl">🤔</p>
                <p className="mb-2 font-semibold text-sw-dark">{ui.noArticlesTitle}</p>
                <p className="text-sm text-sw-grey">
                  {ui.noArticlesBody}{' '}
                  <a
                    href="#contact-form"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="cursor-pointer font-semibold text-sw-blue hover:underline"
                  >
                    {ui.contactTeam}
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
              <h2 className="mb-5 text-lg font-extrabold text-sw-dark">{ui.browseByTopic}</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {faq.categories.map((cat) => (
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
              <h2 className="mb-5 text-lg font-extrabold text-sw-dark">{ui.popularHeading}</h2>
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

            {faq.categories.map((cat) => (
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
          <h2 className="mb-4 text-lg font-extrabold text-sw-dark">{ui.quickActions}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Link
              to={withLocale(locale, "/app/profile")}
              className="group flex items-center gap-3 rounded-xl border border-sw-grey-border bg-white p-4 transition-all hover:border-sw-blue/50 hover:shadow-sm"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-red-50">
                <span className="text-base">✋</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-sw-dark transition-colors group-hover:text-sw-blue">
                  {ui.cancelSubscription}
                </p>
                <p className="text-[11px] text-sw-grey">{ui.cancelHint}</p>
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
                  {ui.requestRefund}
                </p>
                <p className="text-[11px] text-sw-grey">{moneyBack.chip}</p>
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
                  {ui.cantLogin}
                </p>
                <p className="text-[11px] text-sw-grey">{ui.cantLoginHint}</p>
              </div>
            </button>
          </div>
        </section>

        <section id="contact-form" className="mb-10 scroll-mt-24">
          <h2 className="mb-3 text-lg font-extrabold text-sw-dark">{ui.stillNeedHelp}</h2>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sw-blue/10 px-3 py-1.5 text-xs font-bold text-sw-blue">
              <span aria-hidden="true">⚡</span>
              {ui.mayaBadge}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sw-grey-border bg-white px-3 py-1.5 text-xs font-semibold text-sw-grey">
              <span aria-hidden="true">✉️</span>
              {ui.emailSupport}
            </span>
          </div>
          <SupportContactForm transcript={transcript} />
        </section>

        <div className="mb-10 flex flex-wrap justify-center gap-4 text-xs text-sw-grey">
          <span className="flex items-center gap-1.5">✅ {moneyBack.chip}</span>
          <span className="flex items-center gap-1.5">💬 {ui.mayaFooter}</span>
          <span className="flex items-center gap-1.5">🔒 {ui.noHiddenFees}</span>
        </div>

        <div className="pb-6 text-center">
          <Link to={withLocale(locale, ROUTES.home)} className="text-sm text-sw-grey transition-colors hover:text-sw-blue">
            {ui.backHome}
          </Link>
        </div>
      </div>
    </>
  )
}
