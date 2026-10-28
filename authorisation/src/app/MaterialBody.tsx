import { memo, useEffect, useMemo, useRef, useState } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

const LONG_BODY_CHARS = 150_000

// Root `tsc` and the LMS package each resolve their own `@types/react`.
// Spreading react-markdown props onto JSX mixes those refs and fails the build.
// Pass only children (and the few DOM attrs we set ourselves).
const components: Components = {
  h1: ({ children }) => <h1 className="mt-8 mb-3 text-2xl font-extrabold text-sw-dark leading-tight">{children}</h1>,
  h2: ({ children }) => <h2 className="mt-8 mb-3 text-xl font-extrabold text-sw-dark leading-tight">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-6 mb-2 text-lg font-bold text-sw-dark leading-snug">{children}</h3>,
  h4: ({ children }) => <h4 className="mt-5 mb-2 text-base font-bold text-sw-dark leading-snug">{children}</h4>,
  p: ({ children }) => <p className="my-3 text-sm leading-relaxed text-sw-dark break-words">{children}</p>,
  ul: ({ children }) => <ul className="my-3 ml-5 list-disc space-y-1.5 text-sm leading-relaxed text-sw-dark">{children}</ul>,
  ol: ({ children }) => <ol className="my-3 ml-5 list-decimal space-y-1.5 text-sm leading-relaxed text-sw-dark">{children}</ol>,
  li: ({ children }) => <li className="pl-1 break-words">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-4 border-sw-blue/40 bg-sw-blue/5 px-4 py-2 text-sm italic text-sw-dark">{children}</blockquote>
  ),
  hr: () => <hr className="my-8 border-sw-grey-border/60" />,
  a: ({ children, href }) => (
    <a className="font-semibold text-sw-blue underline break-words" target="_blank" rel="noopener noreferrer" href={href}>
      {children}
    </a>
  ),
  pre: ({ children }) => (
    <pre className="my-4 max-w-full overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs leading-relaxed text-slate-100 font-mono whitespace-pre select-text [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit">
      {children}
    </pre>
  ),
  code: ({ children, className }) => (
    <code className={`rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.85em] text-sw-dark ${className ?? ''}`}>{children}</code>
  ),
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="border border-sw-grey-border/60 bg-slate-50 px-3 py-2 text-left font-bold">{children}</th>,
  td: ({ children }) => <td className="border border-sw-grey-border/60 px-3 py-2 align-top">{children}</td>,
  img: ({ src, alt }) => <img className="my-3 max-w-full rounded-lg" loading="lazy" alt={alt ?? ''} src={src} />,
}

const Md = memo(function Md({ text }: { text: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {text}
    </ReactMarkdown>
  )
})

type Section = { id: string; title: string; text: string }

function splitSections(body: string): Section[] {
  const parts = body.split(/^(?=## )/m)
  return parts
    .filter((x) => x.length > 0)
    .map((text, i) => {
      const m = /^## (.+)$/m.exec(text)
      const title = text.startsWith('## ') && m ? m[1].trim() : ''
      return { id: `sec-${i}`, title, text }
    })
}

function LazySection({ section, open, onOpen }: { section: Section; open: boolean; onOpen: () => void }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (open || !ref.current || typeof IntersectionObserver === 'undefined') return
    const el = ref.current
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) onOpen()
      },
      { rootMargin: '400px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [open, onOpen])

  return (
    <section ref={ref} id={section.id} className="scroll-mt-20">
      {open ? (
        <Md text={section.text} />
      ) : (
        <button
          type="button"
          onClick={onOpen}
          className="my-2 w-full rounded-xl border border-sw-grey-border/60 bg-slate-50 px-4 py-3 text-left text-sm font-bold text-sw-dark"
        >
          {section.title || '…'}
        </button>
      )}
    </section>
  )
}

function LongBody({ body }: { body: string }) {
  const sections = useMemo(() => splitSections(body), [body])
  const [opened, setOpened] = useState<Set<string>>(() => new Set(sections[0] ? [sections[0].id] : []))
  useEffect(() => {
    setOpened(new Set(sections[0] ? [sections[0].id] : []))
  }, [sections])

  const open = (id: string) =>
    setOpened((prev) => (prev.has(id) ? prev : new Set(prev).add(id)))

  const goTo = (id: string) => {
    open(id)
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const toc = sections.filter((s) => s.title)
  return (
    <div>
      {toc.length > 1 ? (
        <nav className="mb-6 rounded-xl border border-sw-grey-border/60 bg-slate-50 p-4">
          <ul className="space-y-1.5 text-sm">
            {toc.map((s) => (
              <li key={s.id}>
                <button type="button" onClick={() => goTo(s.id)} className="text-left font-semibold text-sw-blue">
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
      {sections.map((s) => (
        <LazySection key={s.id} section={s} open={opened.has(s.id)} onOpen={() => open(s.id)} />
      ))}
    </div>
  )
}

export default function MaterialBody({ body }: { body: string }) {
  return (
    <div data-testid="material-body" className="mx-auto w-full max-w-[70ch]">
      {body.length > LONG_BODY_CHARS ? <LongBody body={body} /> : <Md text={body} />}
    </div>
  )
}
