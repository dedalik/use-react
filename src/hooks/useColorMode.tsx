import { useCallback, useEffect, useMemo } from 'react'
import useLocalStorage from './useLocalStorage'
import usePreferredDark from './usePreferredDark'

export type ColorMode = 'light' | 'dark' | 'auto'

export interface UseColorModeOptions {
  storageKey?: string
  attribute?: 'data-theme' | 'class'
  element?: HTMLElement | null
}

export interface UseColorModeReturn {
  mode: ColorMode
  isDark: boolean
  setMode: (mode: ColorMode) => void
  toggle: () => void
}

/**
 * Stores and applies light/dark/auto color mode.
 */
export default function useColorMode(options: UseColorModeOptions = {}): UseColorModeReturn {
  const {
    storageKey = 'use-react-color-mode',
    attribute = 'data-theme',
    element = typeof document !== 'undefined' ? document.documentElement : null,
  } = options

  const prefersDark = usePreferredDark()
  const [mode, setMode] = useLocalStorage<ColorMode>(storageKey, 'auto')

  const isDark = useMemo(() => (mode === 'auto' ? prefersDark : mode === 'dark'), [mode, prefersDark])

  useEffect(() => {
    if (!element) return

    const resolved = isDark ? 'dark' : 'light'
    if (attribute === 'class') {
      element.classList.toggle('dark', resolved === 'dark')
      element.classList.toggle('light', resolved === 'light')
      return
    }

    element.setAttribute(attribute, resolved)
  }, [attribute, element, isDark])

  const toggle = useCallback(() => {
    setMode((prev) => {
      const current = prev ?? 'auto'
      if (current === 'dark') return 'light'
      if (current === 'light') return 'dark'
      return prefersDark ? 'light' : 'dark'
    })
  }, [prefersDark, setMode])

  return { mode, isDark, setMode, toggle }
}
