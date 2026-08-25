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

export default function Logo({ variant = 'image' }: LogoProps) {
  if (variant === 'text') return <TextWordmark />

  return (
    <img src="/assets/logo-dark.webp" alt="SuccessWise.ai" className="h-7 w-auto object-contain" />
  )
}
