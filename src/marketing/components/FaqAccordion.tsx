import type { FaqArticle } from '@/marketing/data/faq'

export default function FaqAccordion({
  article,
  isOpen,
  onToggle,
  categoryLabel,
}: {
  article: FaqArticle
  isOpen: boolean
  onToggle: () => void
  categoryLabel?: string
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-sw-grey-border bg-white transition-all">
      <button
        type="button"
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-sw-grey-light/50"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-sw-dark">{article.question}</span>
          {categoryLabel ? (
            <span className="mt-0.5 block text-[10px] font-medium tracking-wider text-sw-grey uppercase">
              {categoryLabel}
            </span>
          ) : null}
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path
            d="M4 7l5 5 5-5"
            stroke="hsl(var(--sw-grey))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen ? (
        <div className="border-t border-sw-grey-border px-5 pt-4 pb-5">
          <div className="text-sm leading-relaxed whitespace-pre-line text-sw-dark">{article.answer}</div>
        </div>
      ) : null}
    </div>
  )
}
