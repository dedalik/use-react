import { act, renderHook } from '@testing-library/react'
import useCounter from '../src/hooks/useCounter'

describe('useCounter', () => {
  it('increments and decrements', () => {
    const { result } = renderHook(() => useCounter(2))

    act(() => result.current.inc())
    expect(result.current.count).toBe(3)

    act(() => result.current.dec(2))
    expect(result.current.count).toBe(1)
  })

  it('respects min and max', () => {
    const { result } = renderHook(() => useCounter(5, { min: 0, max: 5 }))

    act(() => result.current.inc())
    expect(result.current.count).toBe(5)

    act(() => result.current.dec(10))
    expect(result.current.count).toBe(0)
  })
})
