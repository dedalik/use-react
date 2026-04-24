import { useEffect, useState } from 'react'

export interface WindowScrollState {
  x: number
  y: number
}

/**
 * Tracks window scroll offsets.
 */
export default function useWindowScroll(): WindowScrollState {
  const [state, setState] = useState<WindowScrollState>(() => ({
    x: typeof window !== 'undefined' ? window.scrollX : 0,
    y: typeof window !== 'undefined' ? window.scrollY : 0,
  }))

  useEffect(() => {
    const onScroll = () => {
      setState({ x: window.scrollX, y: window.scrollY })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return state
}
