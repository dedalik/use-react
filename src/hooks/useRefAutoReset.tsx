import { useCallback, useEffect, useRef, useState } from 'react'

export interface RefAutoResetReturn<T> {
  value: T
  set: (next: T) => void
  reset: () => void
}

/**
 * State-like ref value that resets to initial after delay.
 */
export default function useRefAutoReset<T>(initial: T, afterMs = 1000): RefAutoResetReturn<T> {
  const [value, setValue] = useState(initial)
  const timerRef = useRef<number | null>(null)

  const clear = useCallback(() => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const scheduleReset = useCallback(() => {
    clear()
    timerRef.current = window.setTimeout(
      () => {
        setValue(initial)
        timerRef.current = null
      },
      Math.max(0, afterMs),
    )
  }, [afterMs, clear, initial])

  const set = useCallback(
    (next: T) => {
      setValue(next)
      scheduleReset()
    },
    [scheduleReset],
  )

  const reset = useCallback(() => {
    clear()
    setValue(initial)
  }, [clear, initial])

  useEffect(() => clear, [clear])

  return { value, set, reset }
}
