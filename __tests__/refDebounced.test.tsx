import { act, renderHook } from '@testing-library/react'
import refDebounced from '../src/hooks/refDebounced'

describe('refDebounced', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('updates value after delay', () => {
    const { result, rerender } = renderHook(({ value }) => refDebounced(value, 100), {
      initialProps: { value: 1 },
    })

    rerender({ value: 2 })
    expect(result.current).toBe(1)

    act(() => {
      jest.advanceTimersByTime(100)
    })
    expect(result.current).toBe(2)
  })
})
