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

  it('undo, redo, and clear sync the displayed value', () => {
    const { result } = renderHook(() => useThrottledRefHistory('a', { delay: 100 }))

    act(() => {
      result.current.set('b')
    })
    act(() => {
      jest.advanceTimersByTime(100)
    })
    expect(result.current.value).toBe('b')
    expect(result.current.canUndo).toBe(true)

    act(() => {
      result.current.undo()
    })
    expect(result.current.value).toBe('a')

    act(() => {
      result.current.redo()
    })
    expect(result.current.value).toBe('b')

    act(() => {
      result.current.clear()
    })
    expect(result.current.value).toBe('b')
    expect(result.current.history).toEqual(['b'])
  })
})
