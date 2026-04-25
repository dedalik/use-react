import { act, renderHook } from '@testing-library/react'
import useMemoize from '../src/hooks/useMemoize'

describe('useMemoize', () => {
  it('caches result by args', () => {
    const fn = jest.fn((n: number) => n * 2)
    const { result } = renderHook(() => useMemoize(fn))

    expect(result.current(2)).toBe(4)
    expect(result.current(2)).toBe(4)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('works with multiple argument keys', () => {
    const fn = jest.fn((a: number, b: number) => a + b)
    const { result } = renderHook(() => useMemoize(fn))

    act(() => {
      result.current(1, 2)
      result.current(2, 3)
      result.current(1, 2)
    })

    expect(fn).toHaveBeenCalledTimes(2)
  })
})
