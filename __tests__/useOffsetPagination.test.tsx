import { act, renderHook } from '@testing-library/react'
import useOffsetPagination from '../src/hooks/useOffsetPagination'

describe('useOffsetPagination', () => {
  it('navigates pages and calculates offset', () => {
    const { result } = renderHook(() => useOffsetPagination({ total: 95, pageSize: 10 }))

    expect(result.current.page).toBe(1)
    expect(result.current.pageCount).toBe(10)
    expect(result.current.offset).toBe(0)

    act(() => {
      result.current.next()
    })

    expect(result.current.page).toBe(2)
    expect(result.current.offset).toBe(10)

    act(() => {
      result.current.setPage(10)
    })

    expect(result.current.isLastPage).toBe(true)
  })
})
