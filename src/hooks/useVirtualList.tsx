import { UIEvent, useCallback, useMemo, useState } from 'react'

export interface UseVirtualListOptions {
  itemHeight: number
  containerHeight: number
  overscan?: number
  initialOffset?: number
}

export interface VirtualItem<T> {
  index: number
  data: T
  offsetTop: number
}

export interface UseVirtualListReturn<T> {
  list: VirtualItem<T>[]
  totalHeight: number
  offsetTop: number
  start: number
  end: number
  scrollTop: number
  setScrollTop: (value: number) => void
  onScroll: (event: UIEvent<HTMLElement>) => void
}

/**
 * Renders only the visible window of a large fixed-height list.
 */
export default function useVirtualList<T>(source: T[], options: UseVirtualListOptions): UseVirtualListReturn<T> {
  const { itemHeight, containerHeight, overscan = 2, initialOffset = 0 } = options
  const [scrollTop, setScrollTopState] = useState(Math.max(0, initialOffset))

  const safeItemHeight = Math.max(1, itemHeight)
  const visibleCount = Math.max(1, Math.ceil(containerHeight / safeItemHeight))

  const setScrollTop = useCallback((value: number) => {
    setScrollTopState(Math.max(0, value))
  }, [])

  const onScroll = useCallback((event: UIEvent<HTMLElement>) => {
    setScrollTopState(Math.max(0, event.currentTarget.scrollTop))
  }, [])

  const start = Math.max(0, Math.floor(scrollTop / safeItemHeight) - overscan)
  const end = Math.min(source.length, start + visibleCount + overscan * 2)

  const list = useMemo(
    () =>
      source.slice(start, end).map((item, idx) => {
        const index = start + idx
        return {
          index,
          data: item,
          offsetTop: index * safeItemHeight,
        }
      }),
    [end, safeItemHeight, source, start],
  )

  return {
    list,
    totalHeight: source.length * safeItemHeight,
    offsetTop: start * safeItemHeight,
    start,
    end,
    scrollTop,
    setScrollTop,
    onScroll,
  }
}
