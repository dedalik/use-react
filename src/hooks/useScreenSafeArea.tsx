import { useEffect, useState } from 'react'

export interface ScreenSafeArea {
  top: number
  right: number
  bottom: number
  left: number
}

function toPixels(value: string): number {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function readSafeArea(): ScreenSafeArea {
  if (typeof document === 'undefined') return { top: 0, right: 0, bottom: 0, left: 0 }

  const root = document.documentElement
  const styles = getComputedStyle(root)

  return {
    top: toPixels(styles.getPropertyValue('--sat') || styles.getPropertyValue('padding-top')),
    right: toPixels(styles.getPropertyValue('--sar') || styles.getPropertyValue('padding-right')),
    bottom: toPixels(styles.getPropertyValue('--sab') || styles.getPropertyValue('padding-bottom')),
    left: toPixels(styles.getPropertyValue('--sal') || styles.getPropertyValue('padding-left')),
  }
}

/**
 * Reads screen safe-area inset values from computed styles.
 */
export default function useScreenSafeArea(): ScreenSafeArea {
  const [safeArea, setSafeArea] = useState<ScreenSafeArea>(() => readSafeArea())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const update = () => setSafeArea(readSafeArea())
    update()
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

  return safeArea
}
