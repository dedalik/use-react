import { RefObject, useEffect } from 'react'

export default function useMutationObserver(
  elementRef: RefObject<Node | null>,
  callback: MutationCallback,
  options: MutationObserverInit = { childList: true, subtree: true },
) {
  useEffect(() => {
    const target = elementRef.current
    if (!target || typeof MutationObserver === 'undefined') return

    const observer = new MutationObserver(callback)
    observer.observe(target, options)

    return () => observer.disconnect()
  }, [callback, elementRef, options])
}
