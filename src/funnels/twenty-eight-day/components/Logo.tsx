import { useState } from 'react'
import { GraduationCap } from 'lucide-react'

interface LogoProps {
  variant?: 'image' | 'text'
}

function TextWordmark() {
  return (
    <div className="flex items-center gap-0 text-base font-bold tracking-tight">
      <span className="text-sw-dark">SuccessWise</span>
      <span className="text-sw-blue">.ai</span>
    </div>
  )
}

export default function Logo({ variant }: LogoProps) {
  const [failed, setFailed] = useState(false)

  if (variant === 'text') {
    return <TextWordmark />
  }

  if (failed) {
    return (
      <div className="flex items-center gap-1.5 text-base font-bold tracking-tight">
        <GraduationCap className="size-5 text-sw-dark" />
        <span className="text-sw-dark">Success</span>
        <span className="text-sw-blue">Wise</span>
      </div>
    )
  }

  return (
    <img
      src="/assets/logo-dark.webp"
      alt="SuccessWise.ai"
      className="h-7 w-auto object-contain"
      onError={() => setFailed(true)}
    />
  )
}
