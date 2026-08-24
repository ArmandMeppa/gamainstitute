import { motion } from 'framer-motion'
import { ANIM }   from '@/constants'
import { Avatar } from './Avatar'
import { LinkedInIcon } from '@/components/ui/icons'

interface MemberCardProps {
  name: string
  role: string
  photo?: string
  linkedin?: string
}

export function MemberCard({ name, role, photo, linkedin }: MemberCardProps) {
  return (
    <motion.article
      className="relative flex flex-col items-center text-center gap-3 p-6 rounded-lg border border-hairline bg-surface"
      whileHover={{ y: -ANIM.CARD_HOVER_Y, boxShadow: 'var(--sh-2)' }}
      transition={{ duration: ANIM.CARD_HOVER_DURATION }}
    >
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} — LinkedIn`}
          className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 rounded-lg bg-surface border border-hairline text-ink shadow-[var(--sh-1)] hover:text-[var(--accent-ink)]"
        >
          <LinkedInIcon size={15} />
        </a>
      )}
      <div className="w-28 h-28">
        <Avatar name={name} photo={photo} shape="circle" className="w-full h-full" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-display font-semibold text-[1.05rem] text-ink m-0">{name}</h3>
        <span className="text-[0.8rem] font-semibold text-[var(--accent-ink)] tracking-[0.04em] uppercase">{role}</span>
      </div>
    </motion.article>
  )
}
