import { useCallback, useEffect, useState } from 'react'

export type UseUrlSearchParamsReturn = [URLSearchParams, (next: URLSearchParams | Record<string, string>) => void]

function readParams(): URLSearchParams {
  if (typeof window === 'undefined') return new URLSearchParams()
  return new URLSearchParams(window.location.search)
}

/**
 * Tracks and updates URL search params.
 */
export default function useUrlSearchParams(): UseUrlSearchParamsReturn {
  const [params, setParams] = useState<URLSearchParams>(() => readParams())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onChange = () => setParams(readParams())
    window.addEventListener('popstate', onChange)
    return () => window.removeEventListener('popstate', onChange)
  }, [])

  const setSearchParams = useCallback((next: URLSearchParams | Record<string, string>) => {
    if (typeof window === 'undefined') return

    const normalized = next instanceof URLSearchParams ? next : new URLSearchParams(next)
    const query = normalized.toString()
    const url = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`
    window.history.replaceState({}, '', url)
    setParams(new URLSearchParams(query))
  }, [])

  return [params, setSearchParams]
}
