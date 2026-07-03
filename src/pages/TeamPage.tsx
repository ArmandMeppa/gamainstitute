import { Helmet }         from 'react-helmet-async'
import { useTranslation }  from 'react-i18next'
import { Link }            from 'react-router-dom'
import { motion }          from 'framer-motion'

import { PageHero }       from '@/components/ui/PageHero'
import { Eyebrow }        from '@/components/ui/Eyebrow'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Reveal, revealContainer, revealItem } from '@/components/ui/Reveal'
import { MemberCard }     from '@/components/team/MemberCard'
import { AdvisorRow }     from '@/components/team/AdvisorRow'

type Member    = { name: string; role: string; bio?: string }
type JoinItem  = { no: string; title: string; body: string; link: string }

export default function TeamPage() {
  const { t } = useTranslation('team')

  const leadership   = t('leadership.members',   { returnObjects: true }) as Member[]
  const researchers  = t('researchers.members',  { returnObjects: true }) as Member[]
  const contributors = t('contributors.members', { returnObjects: true }) as Member[]
  const advisory     = t('advisory.members',     { returnObjects: true }) as Member[]
  const joinItems    = t('join.items',            { returnObjects: true }) as JoinItem[]

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Helmet>

      <main id="main">

        {/* ── HERO ──────────────────────────────────────────── */}
        <PageHero
          eyebrow={t('hero.eyebrow')}
          h1={t('hero.h1')}
          lead={t('hero.lead')}
        />

        {/* ── LEADERSHIP ────────────────────────────────────── */}
        <SectionWrapper alt>
          <div className="wrap">
            <Reveal className="mb-[clamp(32px,4vw,48px)]">
              <Eyebrow>{t('leadership.eyebrow')}</Eyebrow>
              <h2 className="font-display font-semibold text-[clamp(1.9rem,3.4vw,2.9rem)] tracking-[-0.02em] text-ink mt-3">
                {t('leadership.h2')}
              </h2>
            </Reveal>
            <motion.div
              className="grid grid-cols-3 gap-[clamp(18px,2.5vw,32px)] max-[800px]:grid-cols-2 max-[520px]:grid-cols-1"
              variants={revealContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-8% 0px' }}
            >
              {leadership.map(m => (
                <motion.div key={m.name} variants={revealItem}>
                  <MemberCard name={m.name} role={m.role} bio={m.bio} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </SectionWrapper>

        {/* ── RESEARCHERS ───────────────────────────────────── */}
        <SectionWrapper>
          <div className="wrap">
            <Reveal className="mb-[clamp(32px,4vw,48px)]">
              <Eyebrow>{t('researchers.eyebrow')}</Eyebrow>
              <h2 className="font-display font-semibold text-[clamp(1.9rem,3.4vw,2.9rem)] tracking-[-0.02em] text-ink mt-3">
                {t('researchers.h2')}
              </h2>
            </Reveal>
            <motion.div
              className="grid grid-cols-4 gap-[clamp(16px,2vw,28px)] max-[900px]:grid-cols-3 max-[680px]:grid-cols-2 max-[440px]:grid-cols-1"
              variants={revealContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-8% 0px' }}
            >
              {researchers.map(m => (
                <motion.div key={m.name} variants={revealItem}>
                  <MemberCard name={m.name} role={m.role} bio={m.bio} compact />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </SectionWrapper>

        {/* ── CONTRIBUTORS ──────────────────────────────────── */}
        <SectionWrapper alt>
          <div className="wrap">
            <Reveal className="flex items-end justify-between gap-6 flex-wrap mb-[clamp(32px,4vw,48px)]">
              <div>
                <Eyebrow>{t('contributors.eyebrow')}</Eyebrow>
                <h2 className="font-display font-semibold text-[clamp(1.9rem,3.4vw,2.9rem)] tracking-[-0.02em] text-ink mt-3">
                  {t('contributors.h2')}
                </h2>
              </div>
              <p className="text-ink-soft text-base max-w-[44ch] m-0">{t('contributors.lead')}</p>
            </Reveal>
            <motion.div
              className="grid grid-cols-3 gap-x-[clamp(24px,3vw,48px)] max-[700px]:grid-cols-2 max-[460px]:grid-cols-1"
              variants={revealContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-8% 0px' }}
            >
              {contributors.map(m => (
                <motion.div key={m.name} variants={revealItem}>
                  <AdvisorRow name={m.name} role={m.role} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </SectionWrapper>

        {/* ── ADVISORY BOARD ────────────────────────────────── */}
        <SectionWrapper>
          <div className="wrap">
            <Reveal className="mb-[clamp(32px,4vw,48px)]">
              <Eyebrow>{t('advisory.eyebrow')}</Eyebrow>
              <h2 className="font-display font-semibold text-[clamp(1.9rem,3.4vw,2.9rem)] tracking-[-0.02em] text-ink mt-3">
                {t('advisory.h2')}
              </h2>
            </Reveal>
            <motion.div
              className="grid grid-cols-3 gap-x-[clamp(24px,3vw,48px)] max-[700px]:grid-cols-2 max-[460px]:grid-cols-1"
              variants={revealContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-8% 0px' }}
            >
              {advisory.map(m => (
                <motion.div key={m.name} variants={revealItem}>
                  <AdvisorRow name={m.name} role={m.role} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </SectionWrapper>

        {/* ── JOIN US ───────────────────────────────────────── */}
        <SectionWrapper alt id="join">
          <div className="wrap">
            <Reveal className="mb-[clamp(32px,4vw,48px)]">
              <Eyebrow>{t('join.eyebrow')}</Eyebrow>
              <h2 className="font-display font-semibold text-[clamp(1.9rem,3.4vw,2.9rem)] tracking-[-0.02em] text-ink mt-3">
                {t('join.h2')}
              </h2>
            </Reveal>
            <motion.div
              className="grid grid-cols-3 gap-[clamp(18px,2.5vw,32px)] max-[800px]:grid-cols-1"
              variants={revealContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-8% 0px' }}
            >
              {joinItems.map(item => (
                <motion.article
                  key={item.no}
                  variants={revealItem}
                  className="p-[clamp(20px,2.5vw,28px)] rounded-lg border border-hairline bg-surface flex flex-col gap-3"
                >
                  <span className="font-mono text-[0.72rem] text-ink-muted">{item.no}</span>
                  <h3 className="font-display font-semibold text-[1.1rem] text-ink m-0">{item.title}</h3>
                  <p className="text-ink-soft text-[0.9rem] leading-[1.55] m-0 flex-1">{item.body}</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1 text-[var(--link)] text-[0.88rem] font-semibold group mt-auto"
                  >
                    {item.link} <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </SectionWrapper>

      </main>
    </>
  )
}
