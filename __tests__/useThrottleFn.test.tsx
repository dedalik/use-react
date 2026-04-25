import { act, renderHook } from '@testing-library/react'
import useThrottleFn from '../src/hooks/useThrottleFn'

describe('useThrottleFn', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('throttles calls within delay window', () => {
    const fn = jest.fn()
    const { result } = renderHook(() => useThrottleFn(fn, 100))

    act(() => {
      result.current('a')
      result.current('b')
    })

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenLastCalledWith('a')

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(fn).toHaveBeenCalledTimes(2)
  })
})
