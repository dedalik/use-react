import { act, renderHook } from '@testing-library/react'
import useOnline from '../src/hooks/useOnline'

describe('useOnline', () => {
  it('updates status on online/offline events', () => {
    const { result } = renderHook(() => useOnline())

    act(() => {
      window.dispatchEvent(new Event('offline'))
    })
    expect(result.current).toBe(false)

    act(() => {
      window.dispatchEvent(new Event('online'))
    })
    expect(result.current).toBe(true)
  })
})
