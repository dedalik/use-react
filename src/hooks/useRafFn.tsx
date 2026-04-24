import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseRafFnReturn {
  isActive: boolean
  start: () => void
  stop: () => void
}

/**
 * requestAnimationFrame loop with start/stop controls.
 */
export default function useRafFn(callback: (timestamp: number) => void, autoStart = true): UseRafFnReturn {
  const callbackRef = useRef(callback)
  const frameRef = useRef<number | null>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const stop = useCallback(() => {
    if (frameRef.current != null) {
      window.cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
    setIsActive(false)
  }, [])

  const loopRef = useRef<(time: number) => void>(() => {})
  loopRef.current = (time: number) => {
    callbackRef.current(time)
    frameRef.current = window.requestAnimationFrame(loopRef.current)
  }

  const start = useCallback(() => {
    if (frameRef.current != null) return
    setIsActive(true)
    frameRef.current = window.requestAnimationFrame(loopRef.current)
  }, [])

  useEffect(() => {
    if (autoStart) start()
    return stop
  }, [autoStart, start, stop])

  return { isActive, start, stop }
}
