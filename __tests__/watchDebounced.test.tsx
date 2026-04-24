import { act, renderHook } from '@testing-library/react'
import watchDebounced from '../src/hooks/watchDebounced'

describe('watchDebounced', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('debounces rapid updates', () => {
    const spy = jest.fn()
    const { rerender } = renderHook(({ value }) => watchDebounced(value, spy, 100), { initialProps: { value: 1 } })

    rerender({ value: 2 })
    rerender({ value: 3 })

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(3, undefined)
  })
})
