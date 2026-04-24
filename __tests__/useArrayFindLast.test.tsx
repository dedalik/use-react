import { renderHook } from '@testing-library/react'
import useArrayFindLast from '../src/hooks/useArrayFindLast'

describe('useArrayFindLast', () => {
  it('returns last matching element', () => {
    const { result, rerender } = renderHook(({ items }) => useArrayFindLast(items, (value) => value % 2 === 0), {
      initialProps: { items: [1, 2, 4, 5] },
    })

    expect(result.current).toBe(4)

    rerender({ items: [1, 3, 5] })
    expect(result.current).toBeUndefined()
  })
})
