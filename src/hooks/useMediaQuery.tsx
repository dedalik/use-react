import { useEffect, useState } from 'react'

export interface UseMediaQueryOptions {
  defaultValue?: boolean
  initializeWithValue?: boolean
  targetWindow?: Window
}

const isBrowser = typeof window !== 'undefined'

export default function useMediaQuery(query: string, options: UseMediaQueryOptions = {}): boolean {
  const { defaultValue = false, initializeWithValue = true, targetWindow = isBrowser ? window : undefined } = options

  const getMatches = (): boolean => {
    if (!targetWindow || typeof targetWindow.matchMedia !== 'function') {
      return defaultValue
    }

    return targetWindow.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => (initializeWithValue ? getMatches() : defaultValue))

  useEffect(() => {
    if (!targetWindow || typeof targetWindow.matchMedia !== 'function') {
      return
    }

    const mediaQueryList = targetWindow.matchMedia(query)
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    setMatches(mediaQueryList.matches)
    mediaQueryList.addEventListener('change', listener)

    return () => {
      mediaQueryList.removeEventListener('change', listener)
    }
  }, [query, targetWindow])

  return matches
}

export type UseMediaQueryType = ReturnType<typeof useMediaQuery>
