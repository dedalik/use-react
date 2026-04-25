export interface OnLongPressHandlers {
  onMouseDown: () => void
  onMouseUp: () => void
  onMouseLeave: () => void
  onTouchStart: () => void
  onTouchEnd: () => void
}

/**
 * Returns pointer handlers that call callback after press duration.
 * **Not** a React hook; safe from handlers or effects without Rules-of-Hooks constraints on this API.
 */
export default function onLongPress(callback: () => void, delay = 500): OnLongPressHandlers {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const start = () => {
    timeoutId = setTimeout(() => {
      callback()
      timeoutId = null
    }, delay)
  }

  const stop = () => {
    if (!timeoutId) return
    clearTimeout(timeoutId)
    timeoutId = null
  }

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  }
}
