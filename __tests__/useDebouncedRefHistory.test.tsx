import { act, renderHook } from '@testing-library/react'
import useDebouncedRefHistory from '../src/hooks/useDebouncedRefHistory'

describe('useDebouncedRefHistory', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('records snapshots after debounce delay', () => {
    const { result } = renderHook(() => useDebouncedRefHistory(1, { delay: 100 }))

    act(() => {
      result.current.set(2)
      result.current.set(3)
    })

    expect(result.current.history).toEqual([1])

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(result.current.history).toEqual([1, 3])
  })

  it('undo, redo, and clear sync the displayed value', () => {
    const { result } = renderHook(() => useDebouncedRefHistory('a', { delay: 100 }))

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
    expect(result.current.canRedo).toBe(true)

    act(() => {
      result.current.redo()
    })
    expect(result.current.value).toBe('b')

    act(() => {
      result.current.clear()
    })
    expect(result.current.history).toEqual(['b'])
    expect(result.current.pointer).toBe(0)
    expect(result.current.value).toBe('b')
  })
})
