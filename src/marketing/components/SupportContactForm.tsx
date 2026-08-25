import { useEffect, useMemo, useState } from 'react'
import FaqAccordion from './FaqAccordion'
import {
  CONTACT_CATEGORIES,
  FAQ_ARTICLES,
  type ContactCategory,
} from '@/marketing/data/faq'

type Step = 'category' | 'deflection' | 'form' | 'submitted'

export default function SupportContactForm({
  transcript,
}: {
  transcript?: string
}) {
  const [step, setStep] = useState<Step>(transcript ? 'form' : 'category')
  const [category, setCategory] = useState<ContactCategory | null>(
    transcript ? (CONTACT_CATEGORIES.find((c) => c.id === 'other') ?? null) : null,
  )
  const [subId, setSubId] = useState('')
  const [openFaq, setOpenFaq] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [sending, setSending] = useState(false)
  const [ticket, setTicket] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!transcript) return
    setCategory(CONTACT_CATEGORIES.find((c) => c.id === 'other') ?? null)
    setStep('form')
  }, [transcript])

  const deflection = useMemo(
    () => (category ? FAQ_ARTICLES.filter((a) => category.deflectionArticleIds.includes(a.id)) : []),
    [category],
  )

  const pickCategory = (item: ContactCategory) => {
    setCategory(item)
    setSubId('')
    if (item.id === 'other' || item.deflectionArticleIds.length === 0) setStep('form')
    else {
      setStep('deflection')
      setOpenFaq(null)
    }
  }

  const reset = () => {
    setStep('category')
    setCategory(null)
    setSubId('')
    setTicket(null)
    setError(null)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    await new Promise((r) => setTimeout(r, 400))
    setTicket(`SW-${Math.floor(100000 + Math.random() * 900000)}`)
    setStep('submitted')
    setSending(false)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-sw-grey-border bg-white">
      <div className="border-b border-sw-grey-border bg-gradient-to-r from-sw-blue/5 to-transparent px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-sw-blue/10">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M3 5l7 5 7-5"
                stroke="hsl(var(--sw-blue))"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="2" y="4" width="16" height="12" rx="2" stroke="hsl(var(--sw-blue))" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-bold text-sw-dark">Contact Support</h2>
            <p className="text-xs text-sw-grey">We typically respond within 1-3 business days.</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-5 sm:px-6">
        {step === 'category' ? (
          <div>
            <p className="mb-4 text-sm font-semibold text-sw-dark">What do you need help with?</p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {CONTACT_CATEGORIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => pickCategory(item)}
                  className="group flex flex-col items-start gap-1.5 rounded-xl border border-sw-grey-border p-3.5 text-left transition-all hover:border-sw-blue/50 hover:bg-sw-blue/[0.02]"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-xs font-semibold text-sw-dark transition-colors group-hover:text-sw-blue">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {step === 'deflection' && category ? (
          <div>
            <button
              type="button"
              onClick={reset}
              className="mb-4 flex items-center gap-1 text-xs font-semibold text-sw-blue hover:underline"
            >
              ← Change category
            </button>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-lg">{category.icon}</span>
              <p className="text-sm font-bold text-sw-dark">{category.label}</p>
            </div>
            {category.subCategories.length > 0 ? (
              <div className="mb-5">
                <p className="mb-2 text-xs font-medium text-sw-grey">What specifically?</p>
                <div className="flex flex-wrap gap-2">
                  {category.subCategories.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setSubId(sub.id)}
                      className={`rounded-lg border px-3 py-2 text-xs transition-all ${
                        subId === sub.id
                          ? 'border-sw-blue bg-sw-blue/5 font-semibold text-sw-blue'
                          : 'border-sw-grey-border text-sw-dark hover:border-sw-blue/30'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            {deflection.length > 0 ? (
              <div className="mb-5">
                <div className="mb-4 rounded-xl border border-amber-200/60 bg-amber-50/70 p-4">
                  <p className="mb-0.5 text-xs font-bold text-amber-800">💡 These might help:</p>
                  <p className="text-[11px] text-amber-700">
                    Check if your question is answered below before contacting us.
                  </p>
                </div>
                <div className="space-y-2">
                  {deflection.map((article) => (
                    <FaqAccordion
                      key={article.id}
                      article={article}
                      isOpen={openFaq === article.id}
                      onToggle={() => setOpenFaq((id) => (id === article.id ? null : article.id))}
                    />
                  ))}
                </div>
              </div>
            ) : null}
            <div className="mt-4 border-t border-sw-grey-border pt-2">
              <p className="mb-3 text-xs text-sw-grey">Didn&apos;t find your answer above?</p>
              <button
                type="button"
                onClick={() => setStep('form')}
                className="w-full rounded-xl bg-sw-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sw-blue-hover sm:w-auto"
              >
                I still need help →
              </button>
            </div>
          </div>
        ) : null}

        {step === 'form' ? (
          <div>
            <button
              type="button"
              onClick={reset}
              className="mb-4 flex items-center gap-1 text-xs font-semibold text-sw-blue hover:underline"
            >
              ← Start over
            </button>
            {category ? (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-sw-grey-light px-3 py-2">
                <span>{category.icon}</span>
                <span className="text-sm font-semibold text-sw-dark">{category.label}</span>
              </div>
            ) : null}
            {transcript ? (
              <div className="mb-4 flex items-start justify-between gap-3 rounded-xl border border-sw-blue/20 bg-sw-blue/5 p-3">
                <div>
                  <p className="text-xs font-bold text-sw-dark">Chat transcript attached</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-sw-grey">
                    Your conversation with Maya will be included so our team has full context. Just add any
                    extra details below.
                  </p>
                </div>
                <span className="flex-shrink-0 rounded-full bg-sw-blue/10 px-2 py-0.5 text-[10px] font-semibold text-sw-blue">
                  ✓ Attached
                </span>
              </div>
            ) : null}
            <form onSubmit={(e) => void onSubmit(e)} className="space-y-4">
              <div>
                <label htmlFor="support-email" className="mb-1.5 block text-xs font-semibold text-sw-dark">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  id="support-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-sw-grey-border px-4 py-3 text-sm transition-all focus:border-sw-blue focus:ring-2 focus:ring-sw-blue/30 focus:outline-none"
                />
                <p className="mt-1 text-[10px] text-sw-grey">
                  Use the email you signed up with so we can find your account.
                </p>
              </div>
              <div>
                <label htmlFor="support-name" className="mb-1.5 block text-xs font-semibold text-sw-dark">
                  Your name <span className="text-red-500">*</span>
                </label>
                <input
                  id="support-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First name is fine"
                  className="w-full rounded-xl border border-sw-grey-border px-4 py-3 text-sm transition-all focus:border-sw-blue focus:ring-2 focus:ring-sw-blue/30 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="support-desc" className="mb-1.5 block text-xs font-semibold text-sw-dark">
                  How can we help? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="support-desc"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    transcript
                      ? 'Anything else we should know? (Your chat with Maya is already attached)'
                      : "Tell us what's happening. The more detail you give, the faster we can help."
                  }
                  rows={transcript ? 3 : 4}
                  className="w-full resize-none rounded-xl border border-sw-grey-border px-4 py-3 text-sm transition-all focus:border-sw-blue focus:ring-2 focus:ring-sw-blue/30 focus:outline-none"
                />
              </div>
              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">{error}</div>
              ) : null}
              <button
                type="submit"
                disabled={!email || !name || !description || sending}
                className="w-full rounded-xl bg-sw-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sw-blue-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>
              <p className="text-center text-[10px] text-sw-grey">
                We&apos;ll respond to your email within 1-3 business days.
              </p>
            </form>
          </div>
        ) : null}

        {step === 'submitted' ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="hsl(var(--sw-success))"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-bold text-sw-dark">Message sent!</h3>
            {ticket ? (
              <p className="mb-2 text-xs text-sw-grey">
                Reference: <span className="font-mono font-semibold text-sw-dark">{ticket}</span>
              </p>
            ) : null}
            <p className="mb-1 text-sm text-sw-grey">
              We&apos;ve received your message and will get back to you at{' '}
              <span className="font-semibold text-sw-dark">{email}</span>.
            </p>
            <p className="mb-6 text-xs text-sw-grey">Our team responds within 1-3 business days.</p>
            <button type="button" onClick={reset} className="text-sm font-semibold text-sw-blue hover:underline">
              ← Back to Support Center
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
