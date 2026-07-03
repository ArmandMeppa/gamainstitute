import { useCallback, useEffect, useState } from 'react'
import { LS_KEYS } from '@/constants'

type Theme = 'light' | 'dark'

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem(LS_KEYS.theme)
    if (stored === 'dark' || stored === 'light') return stored
  } catch (_) {}
  return 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  try { localStorage.setItem(LS_KEYS.theme, theme) } catch (_) {}
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'
    return readTheme()
  })

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark')
  }, [])

  return { theme, setTheme, toggleTheme }
}
