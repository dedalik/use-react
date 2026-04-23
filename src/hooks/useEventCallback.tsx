import { useCallback, useRef } from 'react'

type AnyFunction = (...args: any[]) => any

export default function useEventCallback<T extends AnyFunction>(fn: T): T {
  const fnRef = useRef(fn)
  fnRef.current = fn

  return useCallback((...args: Parameters<T>) => fnRef.current(...args), []) as T
}
