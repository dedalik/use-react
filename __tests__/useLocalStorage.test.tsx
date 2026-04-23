import { act, renderHook } from '@testing-library/react'
import { useLocalStorage } from '../src'

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('reads initial value from localStorage', () => {
    window.localStorage.setItem('name', JSON.stringify('alice'))

    const { result } = renderHook(() => useLocalStorage('name', 'unknown'))
    expect(result.current[0]).toBe('alice')
  })

  it('writes updates to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('name', 'unknown'))

    act(() => {
      result.current[1]('bob')
    })

    expect(result.current[0]).toBe('bob')
    expect(window.localStorage.getItem('name')).toBe(JSON.stringify('bob'))
  })

  it('can disable persistence for privacy-sensitive flows', () => {
    const { result } = renderHook(() => useLocalStorage('name', 'unknown', { enabled: false }))

    act(() => {
      result.current[1]('private')
    })

    expect(result.current[0]).toBe('private')
    expect(window.localStorage.getItem('name')).toBeNull()
  })
})
