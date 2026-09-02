import { useTranslation } from 'react-i18next'

export function NewsletterPerks() {
  const { t } = useTranslation('home')
  const perks = t('newsletter.perks', { returnObjects: true }) as string[]

  return (
    <>
      <p className="text-white/70 text-base m-0 mb-3">{t('newsletter.perks_intro')}</p>
      <ul className="flex flex-col gap-[0.5em] mb-6 max-w-[48ch]">
        {perks.map((perk, i) => (
          <li key={i} className="flex items-center gap-[0.6em] text-white/90 text-[0.95rem]">
            <span
              aria-hidden="true"
              className="flex-none w-5 h-5 rounded-full bg-[var(--copper-bright)]/20 text-[var(--copper-bright)] grid place-items-center text-[0.7rem] font-bold"
            >
              ✓
            </span>
            {perk}
          </li>
        ))}
      </ul>
    </>
  )
}
