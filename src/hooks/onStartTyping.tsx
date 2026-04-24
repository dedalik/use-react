export interface OnStartTypingOptions {
  target?: Window | Document | HTMLElement
  timeout?: number
}

/**
 * Calls callback when user starts typing after idle pause.
 */
export default function onStartTyping(
  callback: (event: KeyboardEvent) => void,
  options: OnStartTypingOptions = {},
): () => void {
  if (typeof window === 'undefined') return () => {}

  const target = options.target ?? window
  const timeout = options.timeout ?? 1000
  let isTyping = false
  let timerId: ReturnType<typeof setTimeout> | null = null

  const reset = () => {
    if (timerId) clearTimeout(timerId)
    timerId = setTimeout(() => {
      isTyping = false
      timerId = null
    }, timeout)
  }

  const listener = (event: KeyboardEvent) => {
    const hasPrintableKey = event.key.length === 1
    if (!hasPrintableKey) return

    if (!isTyping) {
      callback(event)
      isTyping = true
    }

    reset()
  }

  target.addEventListener('keydown', listener as EventListener)

  return () => {
    if (timerId) clearTimeout(timerId)
    target.removeEventListener('keydown', listener as EventListener)
  }
}
