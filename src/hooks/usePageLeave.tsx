import { useEffect, useRef } from 'react'

/**
 * Calls callback when pointer leaves viewport from top edge.
 */
export default function usePageLeave(onLeave: () => void): void {
  const callbackRef = useRef(onLeave)

  useEffect(() => {
    callbackRef.current = onLeave
  }, [onLeave])

  useEffect(() => {
    if (typeof document === 'undefined') return

    const onMouseOut = (event: MouseEvent) => {
      const target = event.relatedTarget as Node | null
      if (!target && event.clientY <= 0) {
        callbackRef.current()
      }
    }

    document.addEventListener('mouseout', onMouseOut)
    return () => document.removeEventListener('mouseout', onMouseOut)
  }, [])
}
