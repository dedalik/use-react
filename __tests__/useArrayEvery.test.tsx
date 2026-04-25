import { renderHook } from '@testing-library/react'
import useArrayEvery from '../src/hooks/useArrayEvery'

describe('useArrayEvery', () => {
  it('checks whether all elements satisfy predicate', () => {
    const { result, rerender } = renderHook(({ items }) => useArrayEvery(items, (value) => value > 0), {
      initialProps: { items: [1, 2, 3] },
    })

    expect(result.current).toBe(true)

    rerender({ items: [1, 0, 3] })
    expect(result.current).toBe(false)
  })
})
