import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseIntervalFnReturn {
  isActive: boolean
  start: () => void
  stop: () => void
}

/**
 * Controlled interval runner with start/stop helpers.
 */
export default function useIntervalFn(callback: () => void, interval = 1000, immediate = false): UseIntervalFnReturn {
  const callbackRef = useRef(callback)
  const timerRef = useRef<number | null>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const stop = useCallback(() => {
    if (timerRef.current != null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsActive(false)
  }, [])

  const start = useCallback(() => {
    if (timerRef.current != null) return
    if (immediate) callbackRef.current()
    timerRef.current = window.setInterval(() => callbackRef.current(), interval)
    setIsActive(true)
  }, [immediate, interval])

  useEffect(() => stop, [stop])

  return { isActive, start, stop }
}
