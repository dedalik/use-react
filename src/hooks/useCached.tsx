import { DependencyList, useMemo } from 'react'

/**
 * Returns a memoized value computed from dependency list.
 */
export default function useCached<T>(factory: () => T, deps: DependencyList): T {
  return useMemo(factory, deps) // eslint-disable-line react-hooks/exhaustive-deps -- explicit deps are part of API
}
