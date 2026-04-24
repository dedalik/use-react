import { useEffect, useState } from 'react'

export type PreferredContrast = 'more' | 'less' | 'custom' | 'no-preference'

function readContrast(): PreferredContrast {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'no-preference'
  if (window.matchMedia('(prefers-contrast: more)').matches) return 'more'
  if (window.matchMedia('(prefers-contrast: less)').matches) return 'less'
  if (window.matchMedia('(prefers-contrast: custom)').matches) return 'custom'
  return 'no-preference'
}

/**
 * Tracks prefers-contrast media query value.
 */
export default function usePreferredContrast(): PreferredContrast {
  const [contrast, setContrast] = useState<PreferredContrast>(() => readContrast())

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return

    const more = window.matchMedia('(prefers-contrast: more)')
    const less = window.matchMedia('(prefers-contrast: less)')
    const custom = window.matchMedia('(prefers-contrast: custom)')
    const update = () => setContrast(readContrast())

    more.addEventListener('change', update)
    less.addEventListener('change', update)
    custom.addEventListener('change', update)

    return () => {
      more.removeEventListener('change', update)
      less.removeEventListener('change', update)
      custom.removeEventListener('change', update)
    }
  }, [])

  return contrast
}
