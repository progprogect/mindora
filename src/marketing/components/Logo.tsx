import BrandWordmark from '@/shared/components/BrandWordmark'

interface LogoProps {
  variant?: 'dark' | 'light'
  className?: string
}

export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  return <BrandWordmark variant={variant} className={className} />
}
