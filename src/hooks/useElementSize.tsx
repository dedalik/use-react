import { RefObject, useEffect, useState } from 'react'

export interface ElementSize {
  width: number
  height: number
}

/**
 * Tracks element width/height with ResizeObserver.
 */
export default function useElementSize(target: RefObject<HTMLElement | null>): ElementSize {
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 })

  useEffect(() => {
    const node = target.current
    if (!node || typeof ResizeObserver === 'undefined') return

    const update = () => {
      const rect = node.getBoundingClientRect()
      setSize({ width: rect.width, height: rect.height })
    }

    update()
    const observer = new ResizeObserver(() => update())
    observer.observe(node)

    return () => observer.disconnect()
  }, [target])

  return size
}
