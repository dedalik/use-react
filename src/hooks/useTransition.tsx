import { useEffect, useState } from 'react'

export type TransitionStage = 'idle' | 'entering' | 'entered' | 'exiting' | 'exited'

export interface UseTransitionReturn {
  mounted: boolean
  stage: TransitionStage
}

/**
 * Derives transition stage and mount state from a boolean toggle.
 */
export default function useTransition(show: boolean, duration = 300): UseTransitionReturn {
  const [mounted, setMounted] = useState(show)
  const [stage, setStage] = useState<TransitionStage>(show ? 'entered' : 'exited')

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
