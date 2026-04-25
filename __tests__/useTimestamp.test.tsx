import { act, renderHook } from '@testing-library/react'
import useTimestamp from '../src/hooks/useTimestamp'

describe('useTimestamp', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('updates on interval', () => {
    jest.setSystemTime(new Date('2024-01-01T00:00:00.000Z'))
    const { result } = renderHook(() => useTimestamp({ interval: 1000 }))
    const first = result.current

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(result.current).toBeGreaterThanOrEqual(first)
  })

  it('does not tick when interval is null', () => {
    jest.setSystemTime(new Date('2024-01-01T00:00:00.000Z'))
    const { result } = renderHook(() => useTimestamp({ interval: null }))
    const first = result.current

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    expect(result.current).toBe(first)
  })
})
