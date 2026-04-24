import { useEffect, useState } from 'react'

export type TextDirection = 'ltr' | 'rtl'

function readDirection(): TextDirection {
  if (typeof document === 'undefined') return 'ltr'
  const dir = (document.documentElement.getAttribute('dir') || 'ltr').toLowerCase()
  return dir === 'rtl' ? 'rtl' : 'ltr'
}

/**
 * Tracks document text direction (`ltr` or `rtl`).
 */
export default function useTextDirection(): TextDirection {
  const [direction, setDirection] = useState<TextDirection>(() => readDirection())

  useEffect(() => {
    if (typeof document === 'undefined') return

    const observer = new MutationObserver(() => {
      setDirection(readDirection())
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir'],
    })

    return () => observer.disconnect()
  }, [])

  return direction
}
