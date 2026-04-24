import { useEffect, useRef, useState } from 'react'

/**
 * Timestamp of the most recent value change.
 */
export default function useLastChanged<T>(value: T): number {
  const previousRef = useRef(value)
  const [lastChanged, setLastChanged] = useState(() => Date.now())

  useEffect(() => {
    if (!Object.is(previousRef.current, value)) {
      previousRef.current = value
      setLastChanged(Date.now())
    }
  }, [value])

  return lastChanged
}
