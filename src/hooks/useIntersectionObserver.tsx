import { RefObject, useEffect, useState } from 'react'

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

export default function useIntersectionObserver(
  elementRef: RefObject<Element | null>,
  options: UseIntersectionObserverOptions = {},
): IntersectionObserverEntry | null {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const { freezeOnceVisible = false, ...observerOptions } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    const isFrozen = freezeOnceVisible && entry?.isIntersecting
    if (isFrozen) return

    const observer = new IntersectionObserver(([nextEntry]) => {
      setEntry(nextEntry)
    }, observerOptions)

    observer.observe(element)
    return () => observer.disconnect()
  }, [elementRef, entry?.isIntersecting, freezeOnceVisible, observerOptions])

  return entry
}
