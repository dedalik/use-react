import { useCallback, useState } from 'react'

export interface UseCounterOptions {
  min?: number
  max?: number
}

export interface UseCounterReturn {
  count: number
  inc: (step?: number) => void
  dec: (step?: number) => void
  set: (value: number) => void
  reset: () => void
}

function clamp(value: number, min?: number, max?: number): number {
  let next = value
  if (typeof min === 'number') next = Math.max(min, next)
  if (typeof max === 'number') next = Math.min(max, next)
  return next
}

export default function useCounter(initialValue = 0, options: UseCounterOptions = {}): UseCounterReturn {
  const { min, max } = options
  const initial = clamp(initialValue, min, max)
  const [count, setCount] = useState(initial)

  const set = useCallback(
    (value: number) => {
      setCount(clamp(value, min, max))
    },
    [min, max],
  )

  const inc = useCallback(
    (step = 1) => {
      setCount((c) => clamp(c + step, min, max))
    },
    [min, max],
  )

  const dec = useCallback(
    (step = 1) => {
      setCount((c) => clamp(c - step, min, max))
    },
    [min, max],
  )

  const reset = useCallback(() => {
    setCount(initial)
  }, [initial])

  return { count, inc, dec, set, reset }
}
