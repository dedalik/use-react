import { useEffect, useState } from 'react'

export type PresenceTransitionStage = 'idle' | 'entering' | 'entered' | 'exiting' | 'exited'

/** @deprecated Use `PresenceTransitionStage` (this hook was renamed from `useTransition`). */
export type TransitionStage = PresenceTransitionStage

export interface UsePresenceTransitionReturn {
  mounted: boolean
  stage: PresenceTransitionStage
}

/** @deprecated Use `UsePresenceTransitionReturn`. */
export type UseTransitionReturn = UsePresenceTransitionReturn

/**
 * Derives enter/exit stage and mount flag from a boolean `show` (presence-style transitions).
 * Renamed from `useTransition` to avoid clashing with React 18’s concurrent `useTransition` from `react`.
 */
export default function usePresenceTransition(show: boolean, duration = 300): UsePresenceTransitionReturn {
  const [mounted, setMounted] = useState(show)
  const [stage, setStage] = useState<PresenceTransitionStage>(show ? 'entered' : 'exited')

  useEffect(() => {
    let timeoutId: number | null = null

    if (show) {
      setMounted(true)
      setStage((prev) => (prev === 'entered' ? 'entered' : 'entering'))
      timeoutId = window.setTimeout(() => setStage('entered'), duration)
    } else {
      setStage((prev) => (prev === 'exited' ? 'exited' : 'exiting'))
      timeoutId = window.setTimeout(() => {
        setStage('exited')
        setMounted(false)
      }, duration)
    }

    return () => {
      if (timeoutId != null) window.clearTimeout(timeoutId)
    }
  }, [duration, show])

  return { mounted, stage }
}
