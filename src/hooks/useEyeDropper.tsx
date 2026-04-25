import { useCallback, useState } from 'react'

export interface UseEyeDropperReturn {
  isSupported: boolean
  sRGBHex: string | null
  error: string | null
  open: () => Promise<string | null>
}

/**
 * Opens EyeDropper and stores the last selected color.
 */
export default function useEyeDropper(): UseEyeDropperReturn {
  const [sRGBHex, setSRGBHex] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const isSupported = typeof window !== 'undefined' && 'EyeDropper' in window

  const open = useCallback(async () => {
    if (!isSupported) return null

    try {
      const eyeDropperWindow = window as unknown as Window & {
        EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> }
      }
      const EyeDropperCtor = eyeDropperWindow.EyeDropper
      const eyeDropper = new EyeDropperCtor()
      const result = await eyeDropper.open()
      setSRGBHex(result.sRGBHex)
      setError(null)
      return result.sRGBHex
    } catch (err) {
      const message = err instanceof Error ? err.message : 'EyeDropper failed'
      setError(message)
      return null
    }
  }, [isSupported])

  return { isSupported, sRGBHex, error, open }
}
