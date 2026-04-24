import { act, renderHook } from '@testing-library/react'
import useVirtualList from '../src/hooks/useVirtualList'

describe('useVirtualList', () => {
  it('returns visible window and updates on scroll', () => {
    const source = Array.from({ length: 100 }, (_, i) => i)
    const { result } = renderHook(() => useVirtualList(source, { itemHeight: 20, containerHeight: 100, overscan: 1 }))

    expect(result.current.start).toBe(0)
    expect(result.current.end).toBe(7)
    expect(result.current.list.length).toBe(7)
    expect(result.current.totalHeight).toBe(2000)

    act(() => {
      result.current.setScrollTop(200)
    })

    expect(result.current.start).toBe(9)
    expect(result.current.list[0]).toEqual({ index: 9, data: 9, offsetTop: 180 })
  })
})
