interface LogoProps {
  variant?: 'dark' | 'light'
  className?: string
}

export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const src = variant === 'light' ? '/assets/logo-light.webp' : '/assets/logo-dark.webp'

  return (
    <img
      src={src}
      alt="SuccessWise.ai"
      className={`h-8 w-auto object-contain select-none ${className}`}
    />
  )
}
