import { motion } from 'framer-motion'
import { ANIM } from '@/constants'

interface CategoryCardProps {
  name: string
  count: string
  color: string
  href?: string
}

export function CategoryCard({ name, count, color, href = '#courses' }: CategoryCardProps) {
  return (
    <motion.a
      href={href}
      className="border border-hairline rounded-md bg-surface flex flex-col gap-2.5 min-h-[128px] p-5 transition-colors duration-[220ms]"
      whileHover={{ y: -3, boxShadow: 'var(--sh-2)', borderColor: 'var(--hairline-2)' }}
      transition={{ duration: ANIM.CARD_HOVER_DURATION, ease: 'easeOut' }}
    >
      <span
        className="w-3 h-3 rounded-full shrink-0"
        style={{ background: color }}
      />
      <h3 className="font-sans font-semibold text-[1.02rem] tracking-[-0.01em] text-ink">
        {name}
      </h3>
      <span className="text-[0.82rem] text-ink-muted mt-auto">{count}</span>
    </motion.a>
  )
}
