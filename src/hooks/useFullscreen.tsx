import { RefObject, useCallback, useEffect, useState } from 'react'

export interface UseFullscreenReturn {
  isSupported: boolean
  isFullscreen: boolean
  enter: () => Promise<boolean>
  exit: () => Promise<boolean>
  toggle: () => Promise<boolean>
}

/**
 * Controls element fullscreen state via the Fullscreen API.
 */
export default function useFullscreen(target?: RefObject<HTMLElement | null>): UseFullscreenReturn {
  const isSupported =
    typeof document !== 'undefined' &&
    !!document.documentElement &&
    typeof document.documentElement.requestFullscreen === 'function'

  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (!isSupported) return

    const handleChange = () => {
      const node = target?.current ?? document.documentElement
      setIsFullscreen(document.fullscreenElement === node)
    }

    document.addEventListener('fullscreenchange', handleChange)
    handleChange()

    return () => document.removeEventListener('fullscreenchange', handleChange)
  }, [isSupported, target])

  const enter = useCallback(async () => {
    if (!isSupported) return false

    const node = target?.current ?? document.documentElement
    try {
      await node.requestFullscreen()
      return true
    } catch {
      return false
    }
  }, [isSupported, target])

  const exit = useCallback(async () => {
    if (!isSupported || !document.fullscreenElement) return false

    try {
      await document.exitFullscreen()
      return true
    } catch {
      return false
    }
  }, [isSupported])

  const toggle = useCallback(async () => {
    return isFullscreen ? exit() : enter()
  }, [enter, exit, isFullscreen])

  return { isSupported, isFullscreen, enter, exit, toggle }
}
