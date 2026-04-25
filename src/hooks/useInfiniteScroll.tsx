import { useEffect } from 'react'

export interface UseInfiniteScrollOptions {
  offset?: number
  enabled?: boolean
}

/**
 * Calls `onLoadMore` when user scrolls near page bottom.
 */
export default function useInfiniteScroll(onLoadMore: () => void, options: UseInfiniteScrollOptions = {}): void {
  const { offset = 200, enabled = true } = options

  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || typeof document === 'undefined') return

    const onScroll = () => {
      const scrollBottom = window.innerHeight + window.scrollY
      const fullHeight = document.documentElement.scrollHeight

      if (scrollBottom >= fullHeight - offset) {
        onLoadMore()
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [enabled, offset, onLoadMore])
}
