import { renderHook } from '@testing-library/react'
import useArrayFilter from '../src/hooks/useArrayFilter'

describe('useArrayFilter', () => {
  it('filters input array by predicate', () => {
    const { result, rerender } = renderHook(({ items }) => useArrayFilter(items, (value) => value % 2 === 0), {
      initialProps: { items: [1, 2, 3, 4] },
    })

    expect(result.current).toEqual([2, 4])

    rerender({ items: [5, 6, 7, 8] })
    expect(result.current).toEqual([6, 8])
  })
})
