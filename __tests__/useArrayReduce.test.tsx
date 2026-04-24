import { renderHook } from '@testing-library/react'
import useArrayReduce from '../src/hooks/useArrayReduce'

describe('useArrayReduce', () => {
  it('reduces input array to aggregate value', () => {
    const { result, rerender } = renderHook(({ items }) => useArrayReduce(items, (sum, value) => sum + value, 0), {
      initialProps: { items: [1, 2, 3] },
    })

    expect(result.current).toBe(6)

    rerender({ items: [10, 5] })
    expect(result.current).toBe(15)
  })
})
