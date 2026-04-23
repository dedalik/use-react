import { useEffect } from 'react'

export default function useLockBodyScroll(locked = true) {
  useEffect(() => {
    if (typeof document === 'undefined' || !locked) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [locked])
}
