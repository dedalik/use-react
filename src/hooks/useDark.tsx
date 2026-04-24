import { useCallback, useEffect } from 'react'
import useLocalStorage from './useLocalStorage'
import usePreferredDark from './usePreferredDark'

export interface UseDarkOptions {
  storageKey?: string
  classNameDark?: string
  classNameLight?: string
  element?: HTMLElement | null
}

/**
 * Manages dark mode preference and syncs DOM classes.
 */
export default function useDark(options: UseDarkOptions = {}): [boolean, (next: boolean) => void, () => void] {
  const {
    storageKey = 'use-react-color-scheme',
    classNameDark = 'dark',
    classNameLight = 'light',
    element = typeof document !== 'undefined' ? document.documentElement : null,
  } = options

  const preferredDark = usePreferredDark()
  const [isDark, setIsDark, removeIsDark] = useLocalStorage<boolean>(storageKey, preferredDark)

  useEffect(() => {
    if (!element) return
    element.classList.toggle(classNameDark, isDark)
    element.classList.toggle(classNameLight, !isDark)
  }, [classNameDark, classNameLight, element, isDark])

  const set = useCallback((next: boolean) => setIsDark(next), [setIsDark])
  const reset = useCallback(() => removeIsDark(), [removeIsDark])

  return [isDark, set, reset]
}
