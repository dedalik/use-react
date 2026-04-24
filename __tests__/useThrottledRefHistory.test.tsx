import { act, renderHook } from '@testing-library/react'
import useThrottledRefHistory from '../src/hooks/useThrottledRefHistory'

describe('useThrottledRefHistory', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('records snapshots at throttled intervals', () => {
    const { result } = renderHook(() => useThrottledRefHistory(1, { delay: 100 }))

    act(() => {
      result.current.set(2)
      result.current.set(3)
    })

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(result.current.history.length).toBeGreaterThanOrEqual(2)
    expect(result.current.history).toContain(3)
  })
})
