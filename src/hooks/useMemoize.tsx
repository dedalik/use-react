import { useCallback, useEffect, useRef } from 'react'

/**
 * Returns a memoized wrapper around `fn` that caches results by serialized arguments.
 */
export default function useMemoize<T extends (...args: any[]) => any>(fn: T): T {
  const fnRef = useRef(fn)
  const cacheRef = useRef(new Map<string, ReturnType<T>>())

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  return useCallback((...args: Parameters<T>) => {
    const key = JSON.stringify(args)
    if (cacheRef.current.has(key)) {
      return cacheRef.current.get(key) as ReturnType<T>
    }

    const result = fnRef.current(...args)
    cacheRef.current.set(key, result)
    return result
  }, []) as T
}
