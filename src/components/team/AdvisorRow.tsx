import { Avatar } from './Avatar'

interface AdvisorRowProps {
  name: string
  role: string
  photo?: string
}

export function AdvisorRow({ name, role, photo }: AdvisorRowProps) {
  return (
    <div className="flex items-center gap-[16px] py-3 border-b border-hairline last:border-0">
      <div className="w-14 h-14 rounded-full relative flex-shrink-0 bg-bg-alt border border-hairline overflow-hidden">
        <Avatar name={name} photo={photo} shape="circle" className="text-[0.85rem]" />
      </div>
      <div className="flex flex-col gap-0.5">
        <strong className="font-sans font-semibold text-[0.95rem] text-ink">{name}</strong>
        <span className="text-[0.82rem] text-ink-muted">{role}</span>
      </div>
    </div>
  )
}
