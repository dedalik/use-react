import { act, renderHook } from '@testing-library/react'
import useRefThrottled from '../src/hooks/useRefThrottled'

describe('useRefThrottled', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('throttles updates to delay window', () => {
    const { result, rerender } = renderHook(({ value }) => useRefThrottled(value, 100), {
      initialProps: { value: 1 },
    })

    rerender({ value: 2 })
    rerender({ value: 3 })

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect([2, 3]).toContain(result.current)
  })
})
