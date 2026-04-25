import { useCallback, useMemo, useState } from 'react'

export interface UseCycleListReturn<T> {
  state: T | undefined
  index: number
  next: () => void
  prev: () => void
  setIndex: (nextIndex: number) => void
  set: (value: T) => void
}

function normalize(index: number, length: number): number {
  if (length === 0) return -1
  const r = index % length
  return r < 0 ? r + length : r
}

export default function useCycleList<T>(list: readonly T[], initialIndex = 0): UseCycleListReturn<T> {
  const normalizedInitial = useMemo(() => normalize(initialIndex, list.length), [initialIndex, list.length])
  const [index, setIndexState] = useState(normalizedInitial)

  const setIndex = useCallback(
    (nextIndex: number) => {
      setIndexState(normalize(nextIndex, list.length))
    },
    [list.length],
  )

  const next = useCallback(() => {
    setIndexState((i) => normalize(i + 1, list.length))
  }, [list.length])

  const prev = useCallback(() => {
    setIndexState((i) => normalize(i - 1, list.length))
  }, [list.length])

  const set = useCallback(
    (value: T) => {
      const idx = list.indexOf(value)
      if (idx >= 0) setIndexState(idx)
    },
    [list],
  )

  const state = index >= 0 ? list[index] : undefined

  return { state, index, next, prev, setIndex, set }
}
