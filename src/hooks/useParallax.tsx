import { useMemo } from 'react'
import useMouse from './useMouse'

export interface UseParallaxOptions {
  factorX?: number
  factorY?: number
}

export interface UseParallaxReturn {
  offsetX: number
  offsetY: number
  transform: string
}

/**
 * Computes parallax offsets from current pointer position.
 */
export default function useParallax(options: UseParallaxOptions = {}): UseParallaxReturn {
  const { factorX = 0.02, factorY = 0.02 } = options
  const { x, y } = useMouse()

  return useMemo(() => {
    const centerX = typeof window === 'undefined' ? 0 : window.innerWidth / 2
    const centerY = typeof window === 'undefined' ? 0 : window.innerHeight / 2
    const offsetX = (x - centerX) * factorX
    const offsetY = (y - centerY) * factorY

    return {
      offsetX,
      offsetY,
      transform: `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0)`,
    }
  }, [factorX, factorY, x, y])
}
