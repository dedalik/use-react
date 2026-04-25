import { act, renderHook } from '@testing-library/react'
import useTimeoutPoll from '../src/hooks/useTimeoutPoll'

describe('useTimeoutPoll', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('polls immediately by default and stops', async () => {
    const fn = jest.fn()
    const { result } = renderHook(() => useTimeoutPoll(fn, 100))

    await act(async () => {})
    expect(fn).toHaveBeenCalledTimes(1)

    await act(async () => {
      jest.advanceTimersByTime(250)
      await Promise.resolve()
    })
    expect(fn).toHaveBeenCalledTimes(3)

    act(() => {
      result.current.stop()
    })

    await act(async () => {
      jest.advanceTimersByTime(200)
    })
    expect(fn).toHaveBeenCalledTimes(3)
  })
})
