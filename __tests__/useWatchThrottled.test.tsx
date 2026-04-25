import { act, renderHook } from '@testing-library/react'
import useWatchThrottled from '../src/hooks/useWatchThrottled'

describe('useWatchThrottled', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('throttles updates over the delay window', () => {
    const spy = jest.fn()
    const { rerender } = renderHook(({ value }) => useWatchThrottled(value, spy, 100), { initialProps: { value: 1 } })

    rerender({ value: 2 })
    rerender({ value: 3 })

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(spy.mock.calls.length).toBeGreaterThanOrEqual(1)
  })
})
