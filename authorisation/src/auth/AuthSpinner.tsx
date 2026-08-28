export default function AuthSpinner({ message }: { message?: string }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-sw-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sw-grey text-sm font-medium">{message || 'Loading…'}</p>
      </div>
    </div>
  )
}
