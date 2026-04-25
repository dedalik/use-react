import { act, renderHook } from '@testing-library/react'
import useManualRefHistory from '../src/hooks/useManualRefHistory'

describe('useManualRefHistory', () => {
  it('records snapshots only on commit', () => {
    const { result } = renderHook(() => useManualRefHistory(1))

    act(() => {
      result.current.set(2)
    })
    expect(result.current.history).toEqual([1])

    act(() => {
      result.current.commit()
    })
    expect(result.current.history).toEqual([1, 2])

    act(() => {
      result.current.undo()
    })
    expect(result.current.value).toBe(1)
  })
})
