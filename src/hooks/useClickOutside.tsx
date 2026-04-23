import { RefObject, useEffect, useRef } from 'react'

type ElementRef = RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[]

export default function useClickOutside(refs: ElementRef, handler: (event: MouseEvent | TouchEvent) => void) {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    if (typeof document === 'undefined') return
    const refList = Array.isArray(refs) ? refs : [refs]

    const onPointer = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node
      const isInside = refList.some((ref) => ref.current?.contains(target))
      if (!isInside) {
        handlerRef.current(event)
      }
    }

    document.addEventListener('mousedown', onPointer)
    document.addEventListener('touchstart', onPointer)

    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('touchstart', onPointer)
    }
  }, [refs])
}
