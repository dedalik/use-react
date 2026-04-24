import { act, renderHook } from '@testing-library/react'
import useDebounceFn from '../src/hooks/useDebounceFn'

describe('useDebounceFn', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('debounces rapid calls', () => {
    const fn = jest.fn()
    const { result } = renderHook(() => useDebounceFn(fn, 100))

    act(() => {
      result.current('a')
      result.current('b')
      jest.advanceTimersByTime(99)
    })

    expect(fn).toHaveBeenCalledTimes(0)

    act(() => {
      jest.advanceTimersByTime(1)
    })

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenLastCalledWith('b')
  })
})
