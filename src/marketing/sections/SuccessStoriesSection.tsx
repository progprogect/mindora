import { homeCopy } from '@/marketing/data/home'
import { homeSectionsCopy } from '@/marketing/data/homeSections'
import { useI18n } from '../../../authorisation/src/i18n/I18nProvider'

function Stars({ ariaLabel }: { ariaLabel: string }) {
  return (
    <div className="mb-3 flex gap-0.5" aria-label={ariaLabel}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 14 14" fill="#F59E0B" aria-hidden="true">
          <path d="M7 1l1.73 3.51L12.5 5l-2.75 2.68.65 3.79L7 9.75l-3.4 1.79.65-3.79L1.5 5l3.77-.49L7 1z" />
        </svg>
      ))}
    </div>
  )
}

export default function SuccessStoriesSection() {
  const { locale } = useI18n()
  const { stories, storyStats } = homeCopy(locale)
  const copy = homeSectionsCopy(locale).successStories

  return (
    <section id="success-stories" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-4 text-center text-sm font-semibold tracking-widest text-sw-blue uppercase">
          {copy.eyebrow}
        </p>
        <h2 className="mb-3 text-center text-3xl font-extrabold text-sw-dark sm:text-4xl">
          {copy.titleLine1}
          <br />
          <span className="text-sw-blue">{copy.titleLine2}</span>
        </h2>
        <p className="text-center text-sw-grey">{copy.subtitle}</p>

        <div className="mt-14 mb-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-sw-grey-border bg-white transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-2 bg-sw-blue px-5 py-3">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7l3 3 7-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm font-bold text-white">{story.banner}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-5 flex-1 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 shrink-0 text-xs font-bold text-red-400">{copy.beforeLabel}</span>
                    <p className="text-xs leading-relaxed text-sw-grey">{story.before}</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 shrink-0 text-xs font-bold text-sw-blue">{copy.afterLabel}</span>
                    <p className="text-xs leading-relaxed font-medium text-sw-dark">{story.after}</p>
                  </div>
                </div>
                <blockquote className="mb-5 border-l-2 border-sw-blue-border pl-3">
                  <p className="text-xs leading-relaxed text-sw-grey italic">&ldquo;{story.quote}&rdquo;</p>
                </blockquote>
                <Stars ariaLabel={copy.starRatingAria} />
                <div className="flex items-center gap-3 border-t border-sw-grey-border pt-4">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: story.avatar }}
                  >
                    {story.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-sw-dark">{story.name}</p>
                    <p className="text-xs text-sw-grey">{story.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-2 divide-y divide-sw-grey-border rounded-2xl bg-sw-grey-light/70 md:grid-cols-4 md:divide-x md:divide-y-0">
          {storyStats.map((stat) => (
            <div key={stat.label} className="px-4 py-6 text-center">
              <p className="text-2xl font-extrabold text-sw-dark sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-sw-grey sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
