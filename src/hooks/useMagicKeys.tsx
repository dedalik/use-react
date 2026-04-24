import { useEffect, useMemo, useState } from 'react'

export type MagicKeysState = Record<string, boolean>

/**
 * Tracks currently pressed keyboard keys by event.key.
 */
export default function useMagicKeys(): MagicKeysState {
  const [pressed, setPressed] = useState<MagicKeysState>({})

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      setPressed((prev) => ({ ...prev, [key]: true }))
    }

    const onUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      setPressed((prev) => ({ ...prev, [key]: false }))
    }

    const onBlur = () => setPressed({})

    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return useMemo(() => pressed, [pressed])
}
