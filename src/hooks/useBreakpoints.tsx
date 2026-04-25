import { useMemo } from 'react'
import useWindowSize from './useWindowSize'

export type BreakpointMap = Record<string, number>

/**
 * Resolves active breakpoint names for current window width.
 */
export default function useBreakpoints<T extends BreakpointMap>(breakpoints: T) {
  const { width } = useWindowSize()

  return useMemo(() => {
    const entries = Object.entries(breakpoints).sort((a, b) => a[1] - b[1])
    const active = entries.filter(([, min]) => width >= min).map(([name]) => name)
    const current = active[active.length - 1] ?? null

    const flags = Object.fromEntries(entries.map(([name]) => [name, width >= breakpoints[name]])) as Record<
      keyof T,
      boolean
    >

    return {
      width,
      current: current as keyof T | null,
      active: active as (keyof T)[],
      greaterOrEqual: (name: keyof T) => width >= breakpoints[name],
      flags,
    }
  }, [breakpoints, width])
}
