import { useEffect, useRef } from 'react'

export default function useTimeout(callback: () => void, delay: number | null) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (delay == null) return

    const timeoutId = globalThis.setTimeout(() => {
      callbackRef.current()
    }, delay)

    return () => globalThis.clearTimeout(timeoutId)
  }, [delay])
}
