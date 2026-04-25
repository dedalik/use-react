import { act, renderHook } from '@testing-library/react'
import useIntervalFn from '../src/hooks/useIntervalFn'

describe('useIntervalFn', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('starts and stops interval execution', () => {
    const fn = jest.fn()
    const { result } = renderHook(() => useIntervalFn(fn, 100))

    act(() => result.current.start())
    act(() => {
      jest.advanceTimersByTime(250)
    })
    expect(fn).toHaveBeenCalledTimes(2)

    act(() => result.current.stop())
    act(() => {
      jest.advanceTimersByTime(200)
    })
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
