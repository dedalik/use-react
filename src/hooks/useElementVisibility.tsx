import { RefObject, useEffect, useState } from 'react'

/**
 * Tracks whether element intersects viewport.
 */
export default function useElementVisibility(
  target: RefObject<HTMLElement | null>,
  options?: IntersectionObserverInit,
): boolean {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = target.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      setVisible(Boolean(entry?.isIntersecting))
    }, options)

    observer.observe(node)
    return () => observer.disconnect()
  }, [options, target])

  return visible
}
