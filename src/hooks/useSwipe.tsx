import { useEffect, useState } from 'react'

export type SwipeDirection = 'left' | 'right' | 'up' | 'down' | null

export interface UseSwipeState {
  direction: SwipeDirection
  isSwiping: boolean
}

/**
 * Detects swipe direction from touch events.
 */
export default function useSwipe(threshold = 30): UseSwipeState {
  const [state, setState] = useState<UseSwipeState>({ direction: null, isSwiping: false })

  useEffect(() => {
    if (typeof window === 'undefined') return

    let startX = 0
    let startY = 0

    const onStart = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (!touch) return
      startX = touch.clientX
      startY = touch.clientY
      setState({ direction: null, isSwiping: true })
    }

    const onEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0]
      if (!touch) return

      const dx = touch.clientX - startX
      const dy = touch.clientY - startY
      const absX = Math.abs(dx)
      const absY = Math.abs(dy)

      let direction: SwipeDirection = null

      if (absX >= threshold || absY >= threshold) {
        if (absX > absY) {
          direction = dx > 0 ? 'right' : 'left'
        } else {
          direction = dy > 0 ? 'down' : 'up'
        }
      }

      setState({ direction, isSwiping: false })
    }

    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })

    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [threshold])

  return state
}
