import { useEffect, useState } from 'react'

export interface ScreenOrientationState {
  angle: number
  type: string
}

function readOrientation(): ScreenOrientationState {
  if (typeof window === 'undefined') return { angle: 0, type: 'portrait-primary' }

  const orientation = (window.screen as Screen & { orientation?: { angle?: number; type?: string } }).orientation
  if (orientation) {
    return {
      angle: orientation.angle ?? 0,
      type: orientation.type ?? 'portrait-primary',
    }
  }

  return { angle: 0, type: 'portrait-primary' }
}

/**
 * Tracks current screen orientation info.
 */
export default function useScreenOrientation(): ScreenOrientationState {
  const [state, setState] = useState<ScreenOrientationState>(() => readOrientation())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const update = () => setState(readOrientation())
    window.addEventListener('orientationchange', update)
    return () => window.removeEventListener('orientationchange', update)
  }, [])

  return state
}
