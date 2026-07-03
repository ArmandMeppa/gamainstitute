import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type State = 'idle' | 'loading' | 'success' | 'error'

export function NewsletterForm() {
  const { t } = useTranslation('common')
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setState('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setState(res.ok ? 'success' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return <p className="text-white/90 text-[0.95rem]">{t('newsletter.success')}</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-[10px] flex-wrap mt-1" noValidate>
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={t('newsletter.email_placeholder')}
        aria-label={t('newsletter.email_placeholder')}
        className="flex-1 min-w-[200px] font-sans text-[0.97rem] text-ink bg-white/10 border border-white/20 rounded-pill px-[1.1em] py-[0.75em] placeholder:text-white/50 focus:outline-none focus:border-white/60 transition-colors"
      />
      <button
        type="submit"
        disabled={state === 'loading'}
        className="font-sans font-semibold text-[0.9rem] px-[1.4em] py-[0.75em] rounded-pill bg-[var(--accent)] text-white hover:brightness-110 transition-all disabled:opacity-60"
      >
        {state === 'loading' ? '…' : t('newsletter.subscribe')}
      </button>
    </form>
  )
}
