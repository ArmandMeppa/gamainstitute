type Spacing = 'normal' | 'tight'

interface SectionWrapperProps {
  children: React.ReactNode
  alt?: boolean
  spacing?: Spacing
  id?: string
  className?: string
}

export function SectionWrapper({ children, alt = false, spacing = 'normal', id, className = '' }: SectionWrapperProps) {
  const paddingCls = spacing === 'tight'
    ? 'py-[clamp(48px,6vw,80px)]'
    : 'py-[clamp(64px,9vw,124px)]'

  const bgCls = alt ? 'bg-bg-alt' : ''

  return (
    <section id={id} className={`${paddingCls} ${bgCls} ${className}`}>
      {children}
    </section>
  )
}
