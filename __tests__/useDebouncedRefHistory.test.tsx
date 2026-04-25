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
})
