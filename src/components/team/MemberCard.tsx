import { motion } from 'framer-motion'
import { ANIM }   from '@/constants'

interface MemberCardProps {
  name: string
  role: string
  bio?: string
  compact?: boolean
}

export function MemberCard({ name, role, bio, compact = false }: MemberCardProps) {
  return (
    <motion.article
      className="flex flex-col gap-4 p-5 rounded-lg border border-hairline bg-surface"
      whileHover={{ y: -ANIM.CARD_HOVER_Y, boxShadow: 'var(--sh-2)' }}
      transition={{ duration: ANIM.CARD_HOVER_DURATION }}
    >
      <div className={`relative rounded-md overflow-hidden bg-bg-alt border border-hairline ${compact ? 'aspect-[1/1]' : 'aspect-[4/3]'}`}>
        <div className="ph" style={{ position: 'absolute', inset: 0 }}>
          <span>portrait</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-display font-semibold text-[1.05rem] text-ink m-0">{name}</h3>
        <span className="text-[0.8rem] font-semibold text-[var(--accent-ink)] tracking-[0.04em] uppercase">{role}</span>
        {bio && <p className="text-ink-soft text-[0.9rem] leading-[1.55] mt-1 m-0">{bio}</p>}
      </div>
    </motion.article>
  )
}
