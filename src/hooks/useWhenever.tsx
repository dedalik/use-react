import { DependencyList, useEffect, useRef } from 'react'

/**
 * Runs callback when condition turns true.
 */
export default function useWhenever(condition: boolean, callback: () => void, deps: DependencyList = []): void {
  const previousRef = useRef(condition)

  useEffect(() => {
    if (condition && !previousRef.current) callback()
    previousRef.current = condition
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition, ...deps])
}
