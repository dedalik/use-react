import { act, renderHook } from '@testing-library/react'
import useWatchDebounced from '../src/hooks/useWatchDebounced'

describe('useWatchDebounced', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('debounces rapid updates', () => {
    const spy = jest.fn()
    const { rerender } = renderHook(({ value }) => useWatchDebounced(value, spy, 100), { initialProps: { value: 1 } })

    rerender({ value: 2 })
    rerender({ value: 3 })

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(3, undefined)
  })
})
