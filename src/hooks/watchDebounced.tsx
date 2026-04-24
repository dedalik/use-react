import { DependencyList, useEffect, useRef } from 'react'

/**
 * Delays callback execution until value settles.
 */
export default function useWatchDebounced<T>(
  value: T,
  callback: (value: T, previous: T | undefined) => void,
  delay = 200,
  deps: DependencyList = [],
): void {
  const previousRef = useRef<T | undefined>(undefined)

  useEffect(() => {
    const id = window.setTimeout(
      () => {
        callback(value, previousRef.current)
        previousRef.current = value
      },
      Math.max(0, delay),
    )

    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay, ...deps])
}
