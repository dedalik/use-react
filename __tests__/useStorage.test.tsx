import { act, renderHook } from '@testing-library/react'
import useStorage from '../src/hooks/useStorage'

describe('useStorage', () => {
  it('reads, writes and removes storage-backed value', () => {
    const key = 'use-storage-key'
    window.localStorage.removeItem(key)

    const { result } = renderHook(() => useStorage(key, 1))
    expect(result.current[0]).toBe(1)

    act(() => {
      result.current[1](5)
    })
    expect(window.localStorage.getItem(key)).toBe('5')

    act(() => {
      result.current[2]()
    })
    expect(window.localStorage.getItem(key)).toBeNull()
    expect(result.current[0]).toBe(1)
  })

  it('remove clears key when value already equals initial (avoids setState bail without re-render)', () => {
    const key = 'use-storage-remove-same-as-initial'
    window.localStorage.setItem(key, '1')
    const { result } = renderHook(() => useStorage(key, 1))
    expect(result.current[0]).toBe(1)

    act(() => {
      result.current[2]()
    })
    expect(window.localStorage.getItem(key)).toBeNull()
    expect(result.current[0]).toBe(1)
  })

  it('set to empty string clears hook value and stores JSON for ""', () => {
    const key = 'use-storage-string-empty'
    window.localStorage.removeItem(key)
    const { result } = renderHook(() => useStorage(key, 'hello'))
    expect(result.current[0]).toBe('hello')
    act(() => {
      result.current[1]('')
    })
    expect(result.current[0]).toBe('')
    expect(window.localStorage.getItem(key)).toBe('""')
  })

  it('re-reads storage when the key changes (same hook instance)', () => {
    const a = 'use-storage-key-a'
    const b = 'use-storage-key-b'
    window.localStorage.setItem(a, '7')
    window.localStorage.setItem(b, '9')

    const { result, rerender } = renderHook(({ k }: { k: string }) => useStorage(k, 0), { initialProps: { k: a } })
    expect(result.current[0]).toBe(7)

    rerender({ k: b })
    expect(result.current[0]).toBe(9)
  })
})
