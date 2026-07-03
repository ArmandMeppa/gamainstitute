import { motion } from 'framer-motion'
import { revealContainer, revealItem } from '@/components/ui/Reveal'

interface Step {
  title:       string
  description: string
}

const STEP_COLORS = [
  'var(--copper)',
  'var(--copper-bright)',
  'var(--teal-mid)',
  'var(--teal)',
]

interface LearningJourneyProps {
  steps: Step[]
}

export function LearningJourney({ steps }: LearningJourneyProps) {
  return (
    <motion.div
      className="grid grid-cols-4 gap-[clamp(16px,2vw,28px)] relative max-[760px]:grid-cols-1"
      variants={revealContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-8% 0px' }}
    >
      {/* Horizontal connector line - desktop only */}
      <span
        className="absolute top-[26px] left-[9%] right-[9%] h-0.5 bg-hairline z-0 max-[760px]:hidden"
        aria-hidden="true"
      />

      {steps.map((step, i) => (
        <motion.div
          key={i}
          className="relative z-10 flex flex-col gap-2.5"
          variants={revealItem}
        >
          <div
            className="w-[54px] h-[54px] rounded-full bg-surface border-2 grid place-items-center font-display font-semibold text-[1.1rem] shadow-[0_0_0_6px_var(--bg)]"
            style={{ borderColor: STEP_COLORS[i], color: STEP_COLORS[i] }}
          >
            {i + 1}
          </div>
          <h3 className="font-display font-semibold text-[1.12rem] text-ink mt-1">{step.title}</h3>
          <p className="text-ink-soft text-[0.92rem] m-0">{step.description}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
