import { useEffect, useState } from 'react'

export interface UsePointerState {
  x: number
  y: number
  pressed: boolean
  pointerType: string
}

/**
 * Tracks pointer coordinates, state, and pointer type.
 */
export default function usePointer(): UsePointerState {
  const [state, setState] = useState<UsePointerState>({ x: 0, y: 0, pressed: false, pointerType: 'mouse' })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onMove = (event: PointerEvent) => {
      setState((prev) => ({
        ...prev,
        x: event.clientX,
        y: event.clientY,
        pointerType: event.pointerType || prev.pointerType,
      }))
    }

    const onDown = (event: PointerEvent) => {
      setState((prev) => ({
        ...prev,
        x: event.clientX,
        y: event.clientY,
        pressed: true,
        pointerType: event.pointerType || prev.pointerType,
      }))
    }

    const onUp = (event: PointerEvent) => {
      setState((prev) => ({
        ...prev,
        x: event.clientX,
        y: event.clientY,
        pressed: false,
        pointerType: event.pointerType || prev.pointerType,
      }))
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return state
}
