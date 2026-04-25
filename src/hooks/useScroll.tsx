import { useEffect, useState } from 'react'

export interface UseScrollState {
  x: number
  y: number
}

function readScroll(): UseScrollState {
  if (typeof window === 'undefined') return { x: 0, y: 0 }
  return { x: window.scrollX, y: window.scrollY }
}

/**
 * Tracks window scroll offsets.
 */
export default function useScroll(): UseScrollState {
  const [state, setState] = useState<UseScrollState>(() => readScroll())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onScroll = () => setState(readScroll())
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return state
}
