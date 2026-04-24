import { act, renderHook } from '@testing-library/react'
import useCountdown from '../src/hooks/useCountdown'

describe('useCountdown', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('counts down to zero', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2024-06-15T12:00:00.000Z'))
    const target = new Date('2024-06-15T12:00:05.000Z')
    const { result } = renderHook(() => useCountdown(target, { interval: 1000, onComplete: undefined }))

    expect(result.current.remainingMs).toBeGreaterThan(0)
    expect(result.current.isFinished).toBe(false)

    act(() => {
      jest.advanceTimersByTime(6000)
    })

    expect(result.current.remainingMs).toBe(0)
    expect(result.current.isFinished).toBe(true)
  })

  it('calls onComplete once when deadline passes', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2024-06-15T12:00:00.000Z'))
    const target = new Date('2024-06-15T12:00:02.000Z')
    const fn = jest.fn()

    const { result, rerender } = renderHook(({ t }) => useCountdown(t, { interval: 500, onComplete: fn }), {
      initialProps: { t: target },
    })

    act(() => {
      jest.advanceTimersByTime(3000)
    })

    expect(fn).toHaveBeenCalledTimes(1)
    expect(result.current.isFinished).toBe(true)

    rerender({ t: target })
    act(() => {
      jest.advanceTimersByTime(3000)
    })

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('returns finished for null target', () => {
    jest.useFakeTimers()
    const { result } = renderHook(() => useCountdown(null, { interval: null }))
    expect(result.current.isFinished).toBe(true)
    expect(result.current.remainingMs).toBe(0)
  })
})
