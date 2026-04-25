export type EventHookHandler<T> = (value: T) => void

export interface EventHook<T> {
  on: (handler: EventHookHandler<T>) => () => void
  off: (handler: EventHookHandler<T>) => void
  trigger: (value: T) => void
  clear: () => void
}

/**
 * Creates a tiny pub/sub event hook outside React lifecycle.
 */
export default function createEventHook<T = void>(): EventHook<T> {
  const handlers = new Set<EventHookHandler<T>>()

  const on = (handler: EventHookHandler<T>) => {
    handlers.add(handler)
    return () => off(handler)
  }

  const off = (handler: EventHookHandler<T>) => {
    handlers.delete(handler)
  }

  const trigger = (value: T) => {
    handlers.forEach((handler) => handler(value))
  }

  const clear = () => {
    handlers.clear()
  }

  return { on, off, trigger, clear }
}
