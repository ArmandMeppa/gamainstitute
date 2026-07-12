import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { ContactForm } from '@/components/forms/ContactForm'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CONTACT_EMAIL } from '@/constants'
import { ContactSubject } from '@/types/contact'

export default function ContactPage() {
  const { t, i18n } = useTranslation('common')
  const lang = i18n.language?.startsWith('en') ? 'en' : 'fr'
  const [searchParams] = useSearchParams()
  const subjectParam = ContactSubject.safeParse(searchParams.get('subject'))
  const defaultSubject = subjectParam.success ? subjectParam.data : undefined

  return (
    <>
      <Helmet>
        <title>Contact | Gama Institute</title>
        <meta name="description" content="Contactez le Gama Institute : recherche, innovation, partenariats et presse." />
      </Helmet>

      <main id="main">
        {/* Hero */}
        <SectionWrapper spacing="tight">
          <div className="wrap">
            <div className="max-w-[60ch]">
              <p className="font-sans text-[0.76rem] font-semibold tracking-[0.16em] uppercase text-[var(--accent-ink)] inline-flex items-center gap-[0.6em]">
                <span className="w-[22px] h-px bg-[var(--accent)]" aria-hidden="true" />
                {t('nav.contact')}
              </p>
              <h1 className="font-display font-semibold text-[clamp(2.2rem,4.5vw,3.4rem)] tracking-[-0.025em] text-ink mt-4">
                {lang === 'fr'
                  ? 'Parlons recherche, innovation et collaboration'
                  : "Let's talk research, innovation and collaboration"}
              </h1>
              <p className="text-[clamp(1.1rem,1.6vw,1.32rem)] leading-[1.55] text-ink-soft mt-[22px]">
                {lang === 'fr'
                  ? "Nous serons heureux d'échanger avec vous sur un projet de recherche, une collaboration académique, une formation ou une initiative visant à faire progresser l'intelligence artificielle et le génie logiciel."
                  : "We'd be happy to talk about a research project, an academic collaboration, a training program, or any initiative advancing artificial intelligence and software engineering."}
              </p>
            </div>
          </div>
        </SectionWrapper>

        {/* Form + info */}
        <SectionWrapper spacing="tight">
          <div className="wrap">
            <div className="grid grid-cols-[1.4fr_1fr] gap-[clamp(32px,5vw,72px)] items-start max-[760px]:grid-cols-1">
              <ContactForm defaultSubject={defaultSubject} />

              {/* Contact info */}
              <div>
                <div className="flex flex-col gap-1 py-[22px] border-t border-b border-hairline">
                  <h3 className="font-sans text-[0.76rem] font-bold tracking-[0.14em] uppercase text-ink-muted m-0">
                    {lang === 'fr' ? 'Courriel général' : 'General email'}
                  </h3>
                  <a href={`mailto:${CONTACT_EMAIL.general}`} className="text-ink-soft hover:text-[var(--accent-ink)] transition-colors">
                    {CONTACT_EMAIL.general}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>
    </>
  )
}
