import { RefObject, useEffect, useState } from 'react'

export interface UseResizeObserverSize {
  width: number
  height: number
}

export default function useResizeObserver(targetRef: RefObject<HTMLElement | null>): UseResizeObserverSize {
  const [size, setSize] = useState<UseResizeObserverSize>({ width: 0, height: 0 })

  useEffect(() => {
    const target = targetRef.current
    if (!target || typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return

      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      })
    })

    observer.observe(target)
    return () => observer.disconnect()
  }, [targetRef])

  return size
}
