import { act, renderHook } from '@testing-library/react'
import useNow from '../src/hooks/useNow'

describe('useNow', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('updates on interval', () => {
    const { result } = renderHook(() => useNow({ interval: 1000 }))
    const first = result.current.getTime()

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(result.current.getTime()).toBeGreaterThanOrEqual(first)
  })

  it('does not tick when interval is null', () => {
    const { result } = renderHook(() => useNow({ interval: null }))
    const first = result.current.getTime()

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    expect(result.current.getTime()).toBe(first)
  })
})
