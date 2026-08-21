import { useState } from 'react'

interface AssetImageProps {
  src: string
  alt: string
  fallbackEmoji?: string
  className?: string
}

/**
 * Renders a self-hosted asset from `public/assets/`, falling back to a
 * branded gradient + emoji placeholder if the file hasn't been added yet.
 * Drop the real, licensed asset at the given `src` path to upgrade the UI
 * automatically — see docs/28_day_quiz/implementation-plan.md, Этап 3.
 */
export default function AssetImage({ src, alt, fallbackEmoji = '✨', className = '' }: AssetImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-sw-blue-light to-sw-grey-light text-3xl ${className}`}
      >
        {fallbackEmoji}
      </div>
    )
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
}
