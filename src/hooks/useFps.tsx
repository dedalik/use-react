import { useEffect, useRef, useState } from 'react'

/**
 * Estimates current frames-per-second using requestAnimationFrame.
 */
export default function useFps(sampleMs = 1000): number {
  const [fps, setFps] = useState(0)
  const framesRef = useRef(0)
  const startRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const loop = (ts: number) => {
      if (startRef.current === 0) startRef.current = ts
      framesRef.current += 1

      const elapsed = ts - startRef.current
      if (elapsed >= sampleMs) {
        setFps(Math.round((framesRef.current * 1000) / elapsed))
        framesRef.current = 0
        startRef.current = ts
      }

      rafRef.current = window.requestAnimationFrame(loop)
    }

    rafRef.current = window.requestAnimationFrame(loop)

    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current)
    }
  }, [sampleMs])

  return fps
}
