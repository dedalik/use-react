import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseTimeoutPollControls {
  isActive: boolean
  start: () => void
  stop: () => void
}

export interface UseTimeoutPollOptions {
  immediate?: boolean
}

/**
 * Polls with setTimeout recursion and start/stop controls.
 */
export default function useTimeoutPoll(
  fn: () => void | Promise<void>,
  interval = 1000,
  options: UseTimeoutPollOptions = {},
): UseTimeoutPollControls {
  const { immediate = true } = options
  const fnRef = useRef(fn)
  const timeoutRef = useRef<number | null>(null)
  const activeRef = useRef(false)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  const clearTimer = useCallback(() => {
    if (timeoutRef.current != null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const stop = useCallback(() => {
    activeRef.current = false
    setIsActive(false)
    clearTimer()
  }, [clearTimer])

  const tick = useCallback(() => {
    if (!activeRef.current) return

    const scheduleNext = () => {
      if (!activeRef.current) return
      timeoutRef.current = window.setTimeout(() => {
        tick()
      }, interval)
    }

    try {
      const result = fnRef.current()
      if (result && typeof (result as Promise<void>).then === 'function') {
        void (result as Promise<void>).finally(scheduleNext)
        return
      }
      scheduleNext()
    } catch {
      scheduleNext()
    }
  }, [interval])

  const start = useCallback(() => {
    if (activeRef.current) return
    activeRef.current = true
    setIsActive(true)

    if (immediate) {
      tick()
      return
    }

    timeoutRef.current = window.setTimeout(() => {
      tick()
    }, interval)
  }, [immediate, interval, tick])

  useEffect(() => {
    start()
    return stop
  }, [start, stop])

  return { isActive, start, stop }
}
