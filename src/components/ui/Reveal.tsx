import { motion } from 'framer-motion'
import { ANIM } from '@/constants'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: keyof typeof motion
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{
        duration: ANIM.REVEAL_DURATION,
        ease: ANIM.REVEAL_EASE,
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

export const revealContainer = {
  hidden: {},
  show: { transition: { staggerChildren: ANIM.STAGGER_CHILD } },
}

export const revealItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: ANIM.REVEAL_DURATION, ease: ANIM.REVEAL_EASE },
  },
}
