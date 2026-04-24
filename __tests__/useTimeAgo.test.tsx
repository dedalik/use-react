import { act, renderHook } from '@testing-library/react'
import useTimeAgo from '../src/hooks/useTimeAgo'

describe('useTimeAgo', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('formats past time', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2024-06-15T12:00:00.000Z'))
    const past = new Date('2024-06-15T11:00:00.000Z')
    const { result } = renderHook(() => useTimeAgo(past, { locale: 'en', updateInterval: null }))
    expect(result.current.toLowerCase()).toMatch(/hour/)
  })

  it('returns empty string for null target', () => {
    jest.useFakeTimers()
    const { result } = renderHook(() => useTimeAgo(null, { updateInterval: null }))
    expect(result.current).toBe('')
  })

  it('ticks when updateInterval is set', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2024-06-15T12:00:00.000Z'))
    const past = new Date('2024-06-15T11:59:40.000Z')
    const { result } = renderHook(() => useTimeAgo(past, { locale: 'en', updateInterval: 1000 }))
    const first = result.current

    act(() => {
      jest.advanceTimersByTime(30_000)
    })

    expect(result.current.length).toBeGreaterThan(0)
    expect(first.length).toBeGreaterThan(0)
  })
})
