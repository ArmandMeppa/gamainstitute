import { useCallback, type RefObject } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render:  (container: string | HTMLElement, options: Record<string, unknown>) => string
      execute: (container: string | HTMLElement) => void
      remove:  (widgetId: string) => void
    }
  }
}

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? ''

// Renders an invisible ('interaction-only') Turnstile widget into `containerRef`
// on demand and resolves with the solved token, removing the widget afterward.
export function useTurnstileToken(containerRef: RefObject<HTMLDivElement>) {
  return useCallback((): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!window.turnstile || !containerRef.current) { reject(new Error('Turnstile not loaded')); return }
      const widgetId = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        execution: 'execute',
        appearance: 'interaction-only',
        callback: (token: string) => {
          window.turnstile?.remove(widgetId)
          resolve(token)
        },
        'error-callback': () => reject(new Error('Turnstile failed')),
        'expired-callback': () => reject(new Error('Turnstile expired')),
      })
      window.turnstile.execute(containerRef.current)
    })
  }, [containerRef])
}
