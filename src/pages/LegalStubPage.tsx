import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface LegalStubPageProps {
  title: string
}

/**
 * Placeholder legal page — replace with real copy before going live.
 * Kept intentionally minimal; only exists so footer links resolve to a
 * valid route instead of a dead link (see E2E checklist, Stage 8).
 */
export default function LegalStubPage({ title }: LegalStubPageProps) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-6 px-6 py-12">
      <Link
        to="/"
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-sw-grey hover:text-sw-dark"
      >
        <ArrowLeft className="size-4" />
        Back to home
      </Link>
      <h1 className="text-2xl font-bold text-sw-dark">{title}</h1>
      <p className="text-sw-grey">
        This is a placeholder page. Replace this content with your actual{' '}
        {title.toLowerCase()} before launching the funnel to real users.
      </p>
    </div>
  )
}
