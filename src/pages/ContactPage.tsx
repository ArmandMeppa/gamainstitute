import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { ContactForm } from '@/components/forms/ContactForm'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CONTACT_EMAIL } from '@/constants'

export default function ContactPage() {
  const { t, i18n } = useTranslation('common')
  const lang = i18n.language?.startsWith('en') ? 'en' : 'fr'

  return (
    <>
      <Helmet>
        <title>Contact | Gama Institute</title>
        <meta name="description" content="Contactez le Gama Institute : recherche, formation, partenariats et presse." />
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
                  ? 'Parlons recherche, formation et collaboration'
                  : "Let's talk research, training and collaboration"}
              </h1>
              <p className="text-[clamp(1.1rem,1.6vw,1.32rem)] leading-[1.55] text-ink-soft mt-[22px]">
                {lang === 'fr'
                  ? 'Une question, un projet ou une idée de partenariat ? Écrivez-nous, nous répondons généralement sous deux jours ouvrables.'
                  : 'A question, a project or a partnership idea? Write to us; we usually reply within two business days.'}
              </p>
            </div>
          </div>
        </SectionWrapper>

        {/* Form + info */}
        <SectionWrapper spacing="tight">
          <div className="wrap">
            <div
              className="grid gap-[clamp(32px,5vw,72px)] items-start max-[760px]:grid-cols-1"
              style={{ gridTemplateColumns: '1.4fr 1fr' }}
            >
              <ContactForm />

              {/* Contact info */}
              <div>
                {[
                  {
                    label: lang === 'fr' ? 'Courriel général' : 'General email',
                    value: <a href={`mailto:${CONTACT_EMAIL.general}`} className="text-ink-soft hover:text-[var(--accent-ink)] transition-colors">{CONTACT_EMAIL.general}</a>,
                  },
                  {
                    label: lang === 'fr' ? 'Recherche & partenariats' : 'Research & partnerships',
                    value: <a href={`mailto:${CONTACT_EMAIL.research}`} className="text-ink-soft hover:text-[var(--accent-ink)] transition-colors">{CONTACT_EMAIL.research}</a>,
                  },
                  {
                    label: lang === 'fr' ? 'Formations' : 'Training',
                    value: <a href={`mailto:${CONTACT_EMAIL.training}`} className="text-ink-soft hover:text-[var(--accent-ink)] transition-colors">{CONTACT_EMAIL.training}</a>,
                  },
                  {
                    label: lang === 'fr' ? 'Adresse' : 'Address',
                    value: (
                      <p className="text-ink-soft m-0">
                        {lang === 'fr' ? "Quartier de l'innovation" : 'Innovation district'}<br />
                        Montréal, Québec, Canada
                      </p>
                    ),
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1 py-[22px] border-t border-hairline last:border-b last:border-hairline">
                    <h4 className="font-sans text-[0.76rem] font-bold tracking-[0.14em] uppercase text-ink-muted m-0">{label}</h4>
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Map placeholder */}
        <SectionWrapper spacing="tight" className="pt-0">
          <div className="wrap">
            <div className="aspect-[16/7] rounded-lg border border-hairline overflow-hidden relative">
              <div className="ph"><span>carte · Montréal, QC</span></div>
            </div>
          </div>
        </SectionWrapper>
      </main>
    </>
  )
}
