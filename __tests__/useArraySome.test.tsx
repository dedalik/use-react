import { renderHook } from '@testing-library/react'
import useArraySome from '../src/hooks/useArraySome'

describe('useArraySome', () => {
  it('checks whether any element matches predicate', () => {
    const { result, rerender } = renderHook(({ items }) => useArraySome(items, (value) => value < 0), {
      initialProps: { items: [1, 2, 3] },
    })

    expect(result.current).toBe(false)

    rerender({ items: [1, -2, 3] })
    expect(result.current).toBe(true)
  })
})
