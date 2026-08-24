interface BrandMarkProps {
  className?: string
}

export function BrandMark({ className = 'w-[38px] flex-none' }: BrandMarkProps) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo-icon.png`}
      alt=""
      aria-hidden="true"
      className={className}
      style={{ display: 'block' }}
    />
  )
}
