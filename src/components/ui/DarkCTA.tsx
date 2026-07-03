import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'

interface DarkCTAProps {
  eyebrow: string
  heading: string
  body: string
  children: React.ReactNode
}

export function DarkCTA({ eyebrow, heading, body, children }: DarkCTAProps) {
  return (
    <Reveal>
      <div className="relative overflow-hidden bg-ink text-bg rounded-lg px-[clamp(36px,5vw,64px)] py-[clamp(36px,5vw,64px)] dark:bg-surface dark:border dark:border-hairline-2">
        <Eyebrow noRule style={{ color: 'var(--copper-bright)' }}>
          {eyebrow}
        </Eyebrow>
        <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.9rem)] tracking-tight text-white mt-3 dark:text-ink">
          {heading}
        </h2>
        <p className="text-white/75 max-w-[46ch] mt-2 dark:text-ink-soft">
          {body}
        </p>
        <div className="mt-6">
          {children}
        </div>
      </div>
    </Reveal>
  )
}
