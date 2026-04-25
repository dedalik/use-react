import { useEffect, useMemo, useRef, useState } from 'react'

export interface UseCountdownOptions {
  /**
   * How often to recompute remaining time (ms). `null` or `0` updates only when
   * `target` changes (no interval).
   */
  interval?: number | null
  /** Called once when remaining time first reaches zero for a given `target`. */
  onComplete?: () => void
}

export interface UseCountdownResult {
  /** Milliseconds until `target`, clamped at `0`. */
  remainingMs: number
  /** True when `target` is nullish, invalid, or not in the future. */
  isFinished: boolean
  /** Floored whole seconds until `target` (0 when finished). */
  totalSeconds: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

function targetToMs(target: Date | number | null | undefined): number | null {
  if (target == null) return null
  const t = typeof target === 'number' ? target : target.getTime()
  return Number.isNaN(t) ? null : t
}

function breakdown(remainingMs: number, isFinished: boolean): Omit<UseCountdownResult, 'remainingMs' | 'isFinished'> {
  if (isFinished || remainingMs <= 0) {
    return { totalSeconds: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  const totalSeconds = Math.floor(remainingMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { totalSeconds, days, hours, minutes, seconds }
}

/**
 * Countdown to a future instant: remaining milliseconds and clock fields, with optional tick.
 */
export default function useCountdown(
  target: Date | number | null | undefined,
  options?: UseCountdownOptions,
): UseCountdownResult {
  const { interval = 1000, onComplete } = options ?? {}
  const targetMs = useMemo(() => targetToMs(target), [target])
  const onCompleteRef = useRef(onComplete)
  const completionMarkerRef = useRef<number | null>(null)
  const prevTargetMsRef = useRef<number | null | undefined>(undefined)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (prevTargetMsRef.current !== targetMs) {
      completionMarkerRef.current = null
      prevTargetMsRef.current = targetMs ?? null
    }
  }, [targetMs])

  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (targetMs == null) {
      return
    }

    setTick((n) => n + 1)

    if (interval == null || interval <= 0) {
      return
    }

    const id = window.setInterval(() => {
      setTick((n) => n + 1)
      if (Date.now() >= targetMs) {
        window.clearInterval(id)
      }
    }, interval)

    return () => window.clearInterval(id)
  }, [targetMs, interval])

  const result = useMemo(() => {
    if (targetMs == null) {
      return {
        remainingMs: 0,
        isFinished: true,
        totalSeconds: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    const remainingMs = Math.max(0, targetMs - Date.now())
    const isFinished = remainingMs <= 0
    const parts = breakdown(remainingMs, isFinished)

    return { remainingMs, isFinished, ...parts }
  }, [targetMs, tick]) // eslint-disable-line react-hooks/exhaustive-deps -- tick bumps wall-clock reads

  const { isFinished } = result

  useEffect(() => {
    if (targetMs == null || !isFinished) {
      return
    }
    if (completionMarkerRef.current === targetMs) {
      return
    }
    completionMarkerRef.current = targetMs
    onCompleteRef.current?.()
  }, [isFinished, targetMs])

  return result
}
