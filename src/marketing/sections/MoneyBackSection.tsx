import { Link } from 'react-router-dom'
import { ROUTES } from '@/marketing/data/nav'

const POINTS = ['Full refund', 'No questions asked', 'Any reason, any time'] as const

export default function MoneyBackSection() {
  return (
    <section className="overflow-hidden bg-white px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div
          className="flex flex-col items-center gap-8 rounded-3xl p-8 sm:flex-row sm:p-12"
          style={{
            background: 'linear-gradient(135deg, hsl(142 71% 45% / 0.07) 0%, hsl(142 71% 45% / 0.03) 100%)',
            border: '2px solid hsl(142 71% 45% / 0.2)',
          }}
        >
          <div className="flex shrink-0 flex-col items-center gap-1">
            <div
              className="flex h-24 w-24 flex-col items-center justify-center rounded-full shadow-lg sm:h-28 sm:w-28"
              style={{
                background: 'radial-gradient(circle at 40% 35%, hsl(142 71% 50% / 0.18), hsl(142 71% 45% / 0.08))',
                border: '3px solid hsl(142 71% 45% / 0.35)',
              }}
            >
              <svg className="mb-1 h-10 w-10 sm:h-12 sm:w-12" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <path
                  d="M24 4 L40 10.5 V24 C40 33.5 33 41 24 44 C15 41 8 33.5 8 24 V10.5 Z"
                  fill="hsl(142 71% 45% / 0.15)"
                  stroke="hsl(142 71% 45%)"
                  strokeWidth="2"
                />
                <path
                  d="M16 24l6 6 10-10"
                  stroke="hsl(142 71% 45%)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div
              className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase"
              style={{ backgroundColor: 'hsl(142 71% 45% / 0.12)', color: 'hsl(142 71% 35%)' }}
            >
              Zero Risk
            </div>
            <h2 className="mb-3 text-2xl leading-tight font-extrabold text-sw-dark sm:text-3xl">
              30-Day Money-Back Guarantee
            </h2>
            <p className="mb-4 max-w-lg leading-relaxed text-sw-grey">
              Try SuccessWise.ai completely risk-free. If you don&apos;t feel the difference in your first 30 days — for
              any reason at all — we&apos;ll give you a full refund. No forms, no friction, no questions asked.
            </p>
            <p className="text-sm text-sw-grey">
              We back our platform because we&apos;ve seen what it does for people. Your success is our only goal.{' '}
              <Link to={ROUTES.refund} className="font-medium text-sw-blue hover:underline">
                Read the full guarantee →
              </Link>
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:min-w-[180px]">
            {POINTS.map((point) => (
              <div key={point} className="flex items-center gap-3">
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{ backgroundColor: 'hsl(142 71% 45% / 0.15)', color: 'hsl(142 71% 38%)' }}
                >
                  ✓
                </div>
                <span className="text-sm font-semibold text-sw-dark">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
