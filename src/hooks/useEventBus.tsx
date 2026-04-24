import { useMemo } from 'react'

export interface EventBus<T = unknown> {
  on: (handler: (payload: T) => void) => () => void
  off: (handler: (payload: T) => void) => void
  emit: (payload: T) => void
  reset: () => void
}

const channels = new Map<string, Set<(payload: unknown) => void>>()

function getChannel(name: string): Set<(payload: unknown) => void> {
  const existing = channels.get(name)
  if (existing) return existing
  const next = new Set<(payload: unknown) => void>()
  channels.set(name, next)
  return next
}

/**
 * Simple in-memory event bus scoped by channel name.
 */
export default function useEventBus<T = unknown>(name: string): EventBus<T> {
  return useMemo(() => {
    const on = (handler: (payload: T) => void) => {
      const channel = getChannel(name)
      channel.add(handler as unknown as (payload: unknown) => void)
      return () => {
        channel.delete(handler as unknown as (payload: unknown) => void)
      }
    }

    const off = (handler: (payload: T) => void) => {
      const channel = channels.get(name)
      if (!channel) return
      channel.delete(handler as unknown as (payload: unknown) => void)
    }

    const emit = (payload: T) => {
      const channel = channels.get(name)
      if (!channel) return
      channel.forEach((handler) => {
        const typedHandler = handler as (value: T) => void
        typedHandler(payload)
      })
    }

    const reset = () => {
      channels.delete(name)
    }

    return { on, off, emit, reset }
  }, [name])
}
