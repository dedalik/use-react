import { act, renderHook } from '@testing-library/react'
import useTimeoutFn from '../src/hooks/useTimeoutFn'

describe('useTimeoutFn', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('executes callback once after delay', () => {
    const fn = jest.fn()
    const { result } = renderHook(() => useTimeoutFn(fn, 100))

    act(() => result.current.start())
    act(() => {
      jest.advanceTimersByTime(99)
    })
    expect(fn).toHaveBeenCalledTimes(0)

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
