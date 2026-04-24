import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseTimeoutFnReturn {
  pending: boolean
  start: () => void
  stop: () => void
}

/**
 * Controlled timeout runner with restart semantics.
 */
export default function useTimeoutFn(callback: () => void, delay = 1000, immediate = false): UseTimeoutFnReturn {
  const callbackRef = useRef(callback)
  const timerRef = useRef<number | null>(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const stop = useCallback(() => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setPending(false)
  }, [])

  const start = useCallback(() => {
    stop()
    if (immediate) callbackRef.current()
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null
      setPending(false)
      callbackRef.current()
    }, delay)
    setPending(true)
  }, [delay, immediate, stop])

  useEffect(() => stop, [stop])

  return { pending, start, stop }
}
