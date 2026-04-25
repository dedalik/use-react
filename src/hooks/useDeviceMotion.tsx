import { useEffect, useState } from 'react'

export interface UseDeviceMotionState {
  isSupported: boolean
  acceleration: DeviceMotionEventAcceleration | null
  accelerationIncludingGravity: DeviceMotionEventAcceleration | null
  rotationRate: DeviceMotionEventRotationRate | null
  interval: number | null
}

/**
 * Tracks values from the devicemotion event.
 */
export default function useDeviceMotion(): UseDeviceMotionState {
  const isSupported = typeof window !== 'undefined' && 'DeviceMotionEvent' in window
  const [state, setState] = useState<UseDeviceMotionState>({
    isSupported,
    acceleration: null,
    accelerationIncludingGravity: null,
    rotationRate: null,
    interval: null,
  })

  useEffect(() => {
    if (!isSupported || typeof window === 'undefined') return

    const onMotion = (event: DeviceMotionEvent) => {
      setState({
        isSupported: true,
        acceleration: event.acceleration,
        accelerationIncludingGravity: event.accelerationIncludingGravity,
        rotationRate: event.rotationRate,
        interval: event.interval ?? null,
      })
    }

    window.addEventListener('devicemotion', onMotion as EventListener)
    return () => window.removeEventListener('devicemotion', onMotion as EventListener)
  }, [isSupported])

  return state
}
