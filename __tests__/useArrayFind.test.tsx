import { renderHook } from '@testing-library/react'
import useArrayFind from '../src/hooks/useArrayFind'

describe('useArrayFind', () => {
  it('returns first matching element', () => {
    const { result, rerender } = renderHook(({ items }) => useArrayFind(items, (value) => value > 2), {
      initialProps: { items: [1, 2, 3, 4] },
    })

    expect(result.current).toBe(3)

    rerender({ items: [0, 1, 2] })
    expect(result.current).toBeUndefined()
  })
})
