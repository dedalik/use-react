import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'

type SetRafState<T> = Dispatch<SetStateAction<T>>

export default function useRafState<T>(initialState: T): [T, SetRafState<T>] {
  const frameRef = useRef<number>()
  const [state, setState] = useState(initialState)

  const setRafState: SetRafState<T> = useCallback((value) => {
    if (typeof window === 'undefined') {
      setState(value)
      return
    }

    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current)
    }

    frameRef.current = window.requestAnimationFrame(() => {
      setState(value)
    })
  }, [])

  return [state, setRafState]
}
