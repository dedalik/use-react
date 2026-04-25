import { renderHook } from '@testing-library/react'
import useArrayUnique from '../src/hooks/useArrayUnique'

describe('useArrayUnique', () => {
  it('removes duplicate values while preserving order', () => {
    const { result, rerender } = renderHook(({ items }) => useArrayUnique(items), {
      initialProps: { items: [1, 2, 2, 3, 1] },
    })

    expect(result.current).toEqual([1, 2, 3])

    rerender({ items: [3, 3, 4] })
    expect(result.current).toEqual([3, 4])
  })
})
