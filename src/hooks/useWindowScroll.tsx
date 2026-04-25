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

    const scrollListenerOptions: AddEventListenerOptions = { passive: true }
    window.addEventListener('scroll', onScroll, scrollListenerOptions)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll, scrollListenerOptions)
  }, [])

  return state
}
