import { useEffect, useState } from 'react'

export interface UseTimestampOptions {
  /**
   * Tick interval in milliseconds. Set `null` or `0` to freeze at mount value
   * (no interval updates).
   */
  interval?: number | null
}

/**
 * Live Unix timestamp in milliseconds (`Date.now()`), refreshed on an interval (client only).
 */
export default function useTimestamp(options: UseTimestampOptions = {}): number {
  const { interval = 1000 } = options
  const [ts, setTs] = useState(() => Date.now())

  useEffect(() => {
    if (interval == null || interval <= 0) {
      return
    }

    const id = window.setInterval(() => {
      setTs(Date.now())
    }, interval)

    return () => window.clearInterval(id)
  }, [interval])

  return ts
}
