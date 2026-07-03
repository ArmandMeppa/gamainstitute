interface EyebrowProps {
  children: React.ReactNode
  noRule?: boolean
  className?: string
  style?: React.CSSProperties
}

export function Eyebrow({ children, noRule = false, className = '', style }: EyebrowProps) {
  return (
    <p
      className={`font-sans text-[0.76rem] font-semibold tracking-[0.16em] uppercase text-[var(--accent-ink)] inline-flex items-center gap-[0.6em] m-0 ${className}`}
      style={style}
    >
      {!noRule && (
        <span
          aria-hidden="true"
          className="w-[22px] h-px bg-[var(--accent)] shrink-0"
        />
      )}
      {children}
    </p>
  )
}
