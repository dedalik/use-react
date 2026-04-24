import { useMemo } from 'react'

export interface UseBase64Options {
  json?: boolean
}

function encodeUtf8(input: string): string {
  if (typeof globalThis.btoa === 'function') {
    return globalThis.btoa(unescape(encodeURIComponent(input)))
  }

  if (typeof Buffer !== 'undefined') {
    return Buffer.from(input, 'utf-8').toString('base64')
  }

  throw new Error('No base64 encoder available')
}

/**
 * Encodes input into Base64 with optional JSON serialization.
 */
export default function useBase64(value: unknown, options: UseBase64Options = {}): string {
  const { json = false } = options

  return useMemo(() => {
    try {
      const source = json ? JSON.stringify(value) : String(value ?? '')
      return encodeUtf8(source)
    } catch {
      return ''
    }
  }, [value, json])
}
