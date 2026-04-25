import { useEffect, useState } from 'react'

export interface UseGamepadReturn {
  isSupported: boolean
  gamepads: Gamepad[]
}

/**
 * Tracks connected gamepads via polling and connect/disconnect events.
 */
export default function useGamepad(): UseGamepadReturn {
  const isSupported = typeof navigator !== 'undefined' && typeof navigator.getGamepads === 'function'
  const [gamepads, setGamepads] = useState<Gamepad[]>([])

  useEffect(() => {
    if (!isSupported || typeof window === 'undefined') return

    const update = () => {
      const next = Array.from(navigator.getGamepads() ?? []).filter(Boolean) as Gamepad[]
      setGamepads(next)
    }

    const onChange = () => {
      const next = Array.from(navigator.getGamepads() ?? []).filter(Boolean) as Gamepad[]
      setGamepads(next)
    }

    window.addEventListener('gamepadconnected', onChange)
    window.addEventListener('gamepaddisconnected', onChange)
    onChange()
    const intervalId = window.setInterval(update, 200)

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('gamepadconnected', onChange)
      window.removeEventListener('gamepaddisconnected', onChange)
    }
  }, [isSupported])

  return { isSupported, gamepads }
}
