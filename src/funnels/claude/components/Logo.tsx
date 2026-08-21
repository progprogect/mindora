import { useState } from 'react'
import { GraduationCap } from 'lucide-react'

/**
 * SuccessWise wordmark. Uses the self-hosted production logo
 * (`public/assets/logo-dark.png`, downloaded from the Macaly CDN via
 * Chrome DevTools MCP) with a text+icon fallback if the asset is missing.
 */
export default function Logo() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="flex items-center gap-1.5 font-extrabold tracking-tight">
        <GraduationCap className="size-5 text-sw-dark" />
        <span className="text-sw-dark">Success</span>
        <span className="text-sw-blue">Wise</span>
      </div>
    )
  }

  return (
    <img
      src="/assets/logo-dark.png"
      alt="SuccessWise.ai"
      className="h-6 w-auto"
      onError={() => setFailed(true)}
    />
  )
}
