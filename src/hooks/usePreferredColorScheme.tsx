import { useEffect, useState } from 'react'

export type PreferredColorScheme = 'light' | 'dark' | 'no-preference'

function readScheme(): PreferredColorScheme {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'light'
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
  return 'no-preference'
}

/**
 * Tracks preferred color scheme from media queries.
 */
export default function usePreferredColorScheme(): PreferredColorScheme {
  const [scheme, setScheme] = useState<PreferredColorScheme>(() => readScheme())

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return

    const dark = window.matchMedia('(prefers-color-scheme: dark)')
    const light = window.matchMedia('(prefers-color-scheme: light)')
    const update = () => setScheme(readScheme())

    dark.addEventListener('change', update)
    light.addEventListener('change', update)

    return () => {
      dark.removeEventListener('change', update)
      light.removeEventListener('change', update)
    }
  }, [])

  return scheme
}
