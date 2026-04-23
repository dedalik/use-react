import { RefObject, useEffect, useRef } from 'react'

type Target = Window | Document | HTMLElement | MediaQueryList | null

export default function useEventListener<KW extends keyof WindowEventMap>(
  eventName: KW,
  listener: (event: WindowEventMap[KW]) => void,
  target?: Target | RefObject<Target>,
) {
  const savedListener = useRef(listener)

  useEffect(() => {
    savedListener.current = listener
  }, [listener])

  useEffect(() => {
    const targetValue =
      target && 'current' in target ? target.current : target || (typeof window !== 'undefined' ? window : null)

    if (!targetValue?.addEventListener) {
      return
    }

    const eventListener = (event: Event) => savedListener.current(event as WindowEventMap[KW])
    targetValue.addEventListener(eventName, eventListener as EventListener)

    return () => targetValue.removeEventListener(eventName, eventListener as EventListener)
  }, [eventName, target])
}
