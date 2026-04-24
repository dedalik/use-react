import { useEffect, useState } from 'react'

export interface UseDeviceOrientationState {
  isSupported: boolean
  alpha: number | null
  beta: number | null
  gamma: number | null
  absolute: boolean | null
}

/**
 * Tracks values from the deviceorientation event.
 */
export default function useDeviceOrientation(): UseDeviceOrientationState {
  const isSupported = typeof window !== 'undefined' && 'DeviceOrientationEvent' in window
  const [state, setState] = useState<UseDeviceOrientationState>({
    isSupported,
    alpha: null,
    beta: null,
    gamma: null,
    absolute: null,
  })

  useEffect(() => {
    if (!isSupported || typeof window === 'undefined') return

    const onOrientation = (event: DeviceOrientationEvent) => {
      setState({
        isSupported: true,
        alpha: event.alpha ?? null,
        beta: event.beta ?? null,
        gamma: event.gamma ?? null,
        absolute: event.absolute ?? null,
      })
    }

    window.addEventListener('deviceorientation', onOrientation as EventListener)
    return () => window.removeEventListener('deviceorientation', onOrientation as EventListener)
  }, [isSupported])

  return state
}
