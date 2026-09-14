import { COMPANY } from '@/marketing/data/company'

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
  const sizeClass = size === 'sm' ? 'h-5 sm:h-6 max-w-[140px] sm:max-w-[160px]' : 'h-7 sm:h-8'
  const img = (
    <img
      src="/logo.svg"
      alt={COMPANY.brand}
      className={`w-auto object-contain object-left ${sizeClass} ${className}`.trim()}
    />
  )

  if (variant === 'light') {
    return <span className="inline-flex items-center bg-white rounded-md px-2 py-1">{img}</span>
  }

  return img
}
