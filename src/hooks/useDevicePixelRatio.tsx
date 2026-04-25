import { useEffect, useState } from 'react'

function readRatio(): number {
  if (typeof window === 'undefined') return 1
  return window.devicePixelRatio || 1
}

/**
 * Tracks device pixel ratio changes.
 */
export default function useDevicePixelRatio(): number {
  const [ratio, setRatio] = useState(() => readRatio())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const update = () => setRatio(readRatio())
    window.addEventListener('resize', update)

    return () => window.removeEventListener('resize', update)
  }, [])

  return ratio
}
