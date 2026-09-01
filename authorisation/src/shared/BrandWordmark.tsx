const BRAND_NAME = 'MindoraAcademy'
const TLD = '.com'

type BrandWordmarkProps = {
  variant?: 'dark' | 'light'
  size?: 'md' | 'sm'
  className?: string
}

export default function BrandWordmark({
  variant = 'dark',
  size = 'md',
  className = '',
}: BrandWordmarkProps) {
  const nameColor = variant === 'light' ? 'text-white' : 'text-sw-dark'
  const sizeClass = size === 'sm' ? 'text-sm font-bold tracking-tight' : 'text-base font-bold tracking-tight'

  return (
    <span className={`inline-flex items-baseline ${sizeClass} ${className}`.trim()}>
      <span className={nameColor}>{BRAND_NAME}</span>
      <span className="text-sw-blue">{TLD}</span>
    </span>
  )
}
