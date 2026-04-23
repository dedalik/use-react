import { useEffect, useRef } from 'react'

export default function useInterval(callback: () => void, delay: number | null) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (delay == null) return

    const intervalId = globalThis.setInterval(() => {
      callbackRef.current()
    }, delay)

    return () => globalThis.clearInterval(intervalId)
  }, [delay])
}
