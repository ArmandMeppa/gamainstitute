import { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// useLayoutEffect on the client so the scroll reset lands before the browser
// paints the new route (otherwise it can race the page-transition fade-in and
// briefly flash the old scroll position) — plain useEffect on the server,
// since useLayoutEffect is a no-op there and warns during SSG rendering.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useIsomorphicLayoutEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    // { behavior: 'instant' } overrides the global `scroll-behavior: smooth`
    // (base.css) for this call — a route change should reset scroll instantly,
    // not glide, which would otherwise race the page-transition fade-in.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
