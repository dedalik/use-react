import { renderHook } from '@testing-library/react'
import useArrayIncludes from '../src/hooks/useArrayIncludes'

describe('useArrayIncludes', () => {
  it('returns whether the element exists in array', () => {
    const { result, rerender } = renderHook(({ items, value }) => useArrayIncludes(items, value), {
      initialProps: { items: ['a', 'b'], value: 'b' },
    })

    expect(result.current).toBe(true)

    rerender({ items: ['a', 'b'], value: 'c' })
    expect(result.current).toBe(false)
  })
})
