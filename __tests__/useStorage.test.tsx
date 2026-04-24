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
})
