import BrandWordmark from '@/shared/components/BrandWordmark'

interface LogoProps {
  variant?: 'image' | 'text'
}

export default function Logo(_props: LogoProps = {}) {
  return <BrandWordmark size="sm" />
}
