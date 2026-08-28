import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: 'hsl(var(--sw-grey-light))' }}
    >
      <div className="text-center max-w-md">
        <p className="text-6xl font-extrabold text-sw-blue mb-4">404</p>
        <h1 className="text-2xl font-bold text-sw-dark mb-2">Page not found</h1>
        <p className="text-sw-grey mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link
          to="/"
          className="inline-block bg-sw-blue hover:bg-sw-blue-hover text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
