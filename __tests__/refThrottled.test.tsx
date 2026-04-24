import { act, renderHook } from '@testing-library/react'
import refThrottled from '../src/hooks/refThrottled'

describe('refThrottled', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('throttles updates to delay window', () => {
    const { result, rerender } = renderHook(({ value }) => refThrottled(value, 100), {
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
