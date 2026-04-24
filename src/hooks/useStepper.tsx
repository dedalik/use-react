import { useCallback, useState } from 'react'

export interface UseStepperReturn {
  current: number
  isFirst: boolean
  isLast: boolean
  next: () => void
  prev: () => void
  goTo: (value: number) => void
  reset: () => void
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export default function useStepper(max: number, initial = 0, min = 0): UseStepperReturn {
  const safeMax = Math.max(min, max)
  const safeInitial = clamp(initial, min, safeMax)
  const [current, setCurrent] = useState(safeInitial)

  const next = useCallback(() => setCurrent((c) => clamp(c + 1, min, safeMax)), [min, safeMax])
  const prev = useCallback(() => setCurrent((c) => clamp(c - 1, min, safeMax)), [min, safeMax])
  const goTo = useCallback((value: number) => setCurrent(clamp(value, min, safeMax)), [min, safeMax])
  const reset = useCallback(() => setCurrent(safeInitial), [safeInitial])

  return {
    current,
    isFirst: current <= min,
    isLast: current >= safeMax,
    next,
    prev,
    goTo,
    reset,
  }
}
