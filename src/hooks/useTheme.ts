import { useCallback, useEffect, useState } from 'react'
import { LS_KEYS } from '@/constants'

type Theme = 'light' | 'dark'

function systemTheme(): Theme {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function readStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem(LS_KEYS.theme)
    if (stored === 'dark' || stored === 'light') return stored
  } catch (_) {}
  return null
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'
    return readStoredTheme() ?? systemTheme()
  })
  // Whether the user has explicitly picked a theme (vs. following the OS).
  // Only an explicit choice gets persisted to localStorage.
  const [hasExplicitPreference, setHasExplicitPreference] = useState(() => readStoredTheme() !== null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Live-follow the OS theme for as long as no explicit choice has been made.
  useEffect(() => {
    if (hasExplicitPreference) return
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => setThemeState(e.matches ? 'dark' : 'light')
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [hasExplicitPreference])

  const persistTheme = useCallback((t: Theme) => {
    setHasExplicitPreference(true)
    try { localStorage.setItem(LS_KEYS.theme, t) } catch (_) {}
  }, [])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    persistTheme(t)
  }, [persistTheme])

  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      persistTheme(next)
      return next
    })
  }, [persistTheme])

  return { theme, setTheme, toggleTheme }
}
