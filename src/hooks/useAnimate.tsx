import { RefObject, useCallback, useRef, useState } from 'react'

export interface UseAnimateReturn {
  isSupported: boolean
  running: boolean
  play: (keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: KeyframeAnimationOptions) => Animation | null
  cancel: () => void
}

/**
 * Small wrapper around Web Animations API for an element ref.
 */
export default function useAnimate(target: RefObject<HTMLElement | null>): UseAnimateReturn {
  const animationRef = useRef<Animation | null>(null)
  const [running, setRunning] = useState(false)

  const isSupported = typeof HTMLElement !== 'undefined' && typeof Element !== 'undefined'

  const cancel = useCallback(() => {
    animationRef.current?.cancel()
    animationRef.current = null
    setRunning(false)
  }, [])

  const play = useCallback(
    (keyframes: Keyframe[] | PropertyIndexedKeyframes, options: KeyframeAnimationOptions = {}): Animation | null => {
      const node = target.current
      if (!node || typeof node.animate !== 'function') return null

      cancel()
      const animation = node.animate(keyframes, options)
      animationRef.current = animation
      setRunning(true)
      animation.onfinish = () => setRunning(false)
      animation.oncancel = () => setRunning(false)
      return animation
    },
    [cancel, target],
  )

  return { isSupported, running, play, cancel }
}
