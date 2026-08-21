import { GraduationCap } from 'lucide-react'

export default function Logo() {
  return (
    <div className="flex items-center gap-1.5 font-extrabold tracking-tight">
      <GraduationCap className="size-5 text-sw-dark" />
      <span className="text-sw-dark">Success</span>
      <span className="text-sw-blue">Wise</span>
    </div>
  )
}
