export interface OnKeyStrokeOptions {
  target?: Window | Document | HTMLElement
  event?: 'keydown' | 'keyup'
}

/**
 * Subscribes to keyboard events and invokes callback for matching keys.
 */
export default function onKeyStroke(
  key: string | string[] | null,
  handler: (event: KeyboardEvent) => void,
  options: OnKeyStrokeOptions = {},
): () => void {
  if (typeof window === 'undefined') return () => {}

  const target = options.target ?? window
  const type = options.event ?? 'keydown'
  const keys = key ? (Array.isArray(key) ? key : [key]) : null

  const listener = (event: KeyboardEvent) => {
    if (!keys || keys.includes(event.key)) {
      handler(event)
    }
  }

  target.addEventListener(type, listener as EventListener)
  return () => target.removeEventListener(type, listener as EventListener)
}
