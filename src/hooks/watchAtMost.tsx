import { DependencyList, useEffect, useRef } from 'react'

/**
 * Runs callback for value changes up to a fixed limit.
 */
export default function useWatchAtMost<T>(
  value: T,
  callback: (value: T, previous: T | undefined) => void,
  limit: number,
  deps: DependencyList = [],
): void {
  const previousRef = useRef<T | undefined>(undefined)
  const countRef = useRef(0)

  useEffect(() => {
    if (countRef.current >= Math.max(0, limit)) return

    callback(value, previousRef.current)
    previousRef.current = value
    countRef.current += 1
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, limit, ...deps])
}
