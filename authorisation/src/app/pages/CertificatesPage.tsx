import { Link } from 'react-router-dom'
import { PROGRESS_COURSES } from '@/content/progress-catalog'
import { useProgress } from '@/lib/lmsQueries'

export default function CertificatesPage() {
  const progress = useProgress()
  const earned = Object.entries(PROGRESS_COURSES).filter(([slug, catalog]) => {
    const done = progress?.lessons.filter((row) => row.courseId === slug && row.status === 'completed').length ?? 0
    return done >= catalog.totalLessons
  })

  return (
    <div className="min-h-screen bg-sw-grey-light pb-28">
      <header className="sticky top-0 z-30 border-b border-sw-grey-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3.5">
          <Link
            to="/app/dashboard"
            aria-label="Back to dashboard"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sw-grey transition hover:bg-sw-grey-light"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <h1 className="flex-1 text-base font-bold text-sw-dark">My Certificates</h1>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 pt-5">
        {progress === undefined ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-sw-blue border-t-transparent rounded-full animate-spin" />
          </div>
        ) : earned.length === 0 ? (
          <div className="rounded-2xl border border-sw-grey-border bg-white p-8 text-center" data-testid="certificates-empty">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cert-navy">
              <span className="text-2xl text-cert-gold">✦</span>
            </div>
            <h2 className="mt-4 text-lg font-bold text-sw-dark">No certificates yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-sw-grey">
              Finish every lesson in any course and your Certificate of Completion is issued automatically — ready to share on
              LinkedIn or with your employer.
            </p>
            <Link
              to="/app/dashboard"
              className="mt-6 inline-block rounded-full bg-sw-blue px-7 py-3.5 text-base font-semibold text-white transition hover:bg-sw-blue-hover"
            >
              Browse courses
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {earned.map(([slug, catalog]) => (
              <Link key={slug} to={`/app/courses/${slug}`} className="block bg-white rounded-2xl p-4 border border-sw-grey-border">
                <p className="text-xl">{catalog.emoji}</p>
                <p className="font-extrabold mt-1">{catalog.name}</p>
                <p className="text-xs text-sw-grey mt-1">{catalog.category} · Complete</p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
