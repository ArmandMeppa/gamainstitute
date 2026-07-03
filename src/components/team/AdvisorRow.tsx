interface AdvisorRowProps {
  name: string
  role: string
}

export function AdvisorRow({ name, role }: AdvisorRowProps) {
  return (
    <div className="flex items-center gap-[14px] py-3 border-b border-hairline last:border-0">
      <div className="w-10 h-10 rounded-full relative flex-shrink-0 bg-bg-alt border border-hairline overflow-hidden">
        <div className="ph" style={{ position: 'absolute', inset: 0 }}>
          <span aria-hidden="true">•</span>
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <strong className="font-sans font-semibold text-[0.95rem] text-ink">{name}</strong>
        <span className="text-[0.82rem] text-ink-muted">{role}</span>
      </div>
    </div>
  )
}
