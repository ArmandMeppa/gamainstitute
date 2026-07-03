import { NetworkArt } from '@/components/brand/NetworkArt'
import { Button }     from '@/components/ui/Button'
import { Eyebrow }    from '@/components/ui/Eyebrow'

interface PageHeroProps {
  eyebrow: string
  h1: string
  lead: string
  cta?: { label: string; to: string; variant?: 'accent' | 'ghost' }[]
}

export function PageHero({ eyebrow, h1, lead, cta }: PageHeroProps) {
  return (
    <section>
      <div className="wrap grid grid-cols-[1.05fr_0.95fr] gap-[clamp(28px,4vw,60px)] items-center py-[clamp(56px,8vw,104px)] pb-[clamp(20px,3vw,32px)] max-[920px]:grid-cols-1">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-display font-semibold text-[clamp(2.4rem,5vw,4rem)] leading-[1.06] tracking-[-0.025em] text-ink mt-4 max-w-[18ch]">
            {h1}
          </h1>
          <p className="text-[clamp(1.05rem,1.5vw,1.22rem)] leading-[1.6] text-ink-soft font-normal mt-[22px] max-w-[54ch]">
            {lead}
          </p>
          {cta && cta.length > 0 && (
            <div className="flex gap-[14px] flex-wrap mt-8">
              {cta.map(({ label, to, variant = 'accent' }) => (
                <Button key={label} as="link" to={to} variant={variant}>
                  {label} <span aria-hidden="true">→</span>
                </Button>
              ))}
            </div>
          )}
        </div>
        <div>
          <NetworkArt />
        </div>
      </div>
    </section>
  )
}
