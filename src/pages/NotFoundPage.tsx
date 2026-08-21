import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl font-extrabold text-sw-dark">404</h1>
      <p className="text-sw-grey">This page doesn't exist.</p>
      <Link
        to="/"
        className="rounded-sw-sm bg-sw-blue px-5 py-2.5 font-semibold text-sw-white transition hover:bg-sw-blue-hover"
      >
        Back to home
      </Link>
    </div>
  )
}
