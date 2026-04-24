import { act, renderHook } from '@testing-library/react'
import useRefHistory from '../src/hooks/useRefHistory'

describe('useRefHistory', () => {
  it('tracks snapshots and supports undo/redo', () => {
    const { result } = renderHook(() => useRefHistory(1, { capacity: 5 }))

    act(() => {
      result.current.set(2)
      result.current.set(3)
    })

    expect(result.current.value).toBe(3)
    expect(result.current.history).toEqual([1, 2, 3])

    act(() => {
      result.current.undo()
    })
    expect(result.current.value).toBe(2)

    act(() => {
      result.current.redo()
    })
    expect(result.current.value).toBe(3)
  })
})
