import { renderHook } from '@testing-library/react'
import useArrayFindIndex from '../src/hooks/useArrayFindIndex'

describe('useArrayFindIndex', () => {
  it('returns index of first matching element', () => {
    const { result, rerender } = renderHook(({ items }) => useArrayFindIndex(items, (value) => value % 2 === 0), {
      initialProps: { items: [1, 3, 4, 6] },
    })

    expect(result.current).toBe(2)

    rerender({ items: [1, 3, 5] })
    expect(result.current).toBe(-1)
  })
})
