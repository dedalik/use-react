import { useEffect, useState } from 'react'

export interface UseMouseState {
  x: number
  y: number
}

/**
 * Tracks mouse pointer coordinates in viewport space.
 */
export default function useMouse(): UseMouseState {
  const [state, setState] = useState<UseMouseState>({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onMove = (event: MouseEvent) => {
      setState({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return state
}
