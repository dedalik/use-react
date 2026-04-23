import { useEffect, useRef } from 'react'

/**
 * Returns the previous value from the last render cycle.
 */
export default function usePrevious<T>(value: T): T | undefined {
  const previousRef = useRef<T>()

  useEffect(() => {
    previousRef.current = value
  }, [value])

  return previousRef.current
}

export type UsePreviousType = ReturnType<typeof usePrevious>
