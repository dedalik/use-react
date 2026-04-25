import { useEffect, useState } from 'react'

interface MemoryInfoLike {
  jsHeapSizeLimit: number
  totalJSHeapSize: number
  usedJSHeapSize: number
}

export interface UseMemoryReturn {
  isSupported: boolean
  memory: MemoryInfoLike | null
}

/**
 * Reads performance.memory when available and keeps it fresh.
 */
export default function useMemory(interval = 1000): UseMemoryReturn {
  const isSupported = typeof performance !== 'undefined' && 'memory' in performance
  const [memory, setMemory] = useState<MemoryInfoLike | null>(null)

  useEffect(() => {
    if (!isSupported) return

    const read = () => {
      const info = (performance as Performance & { memory: MemoryInfoLike }).memory
      setMemory({
        jsHeapSizeLimit: info.jsHeapSizeLimit,
        totalJSHeapSize: info.totalJSHeapSize,
        usedJSHeapSize: info.usedJSHeapSize,
      })
    }

    read()
    const id = window.setInterval(read, interval)
    return () => window.clearInterval(id)
  }, [interval, isSupported])

  return { isSupported, memory }
}
