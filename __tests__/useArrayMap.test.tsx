import { renderHook } from '@testing-library/react'
import useArrayMap from '../src/hooks/useArrayMap'

describe('useArrayMap', () => {
  it('maps input array to derived values', () => {
    const { result, rerender } = renderHook(({ items }) => useArrayMap(items, (value) => value * 2), {
      initialProps: { items: [1, 2, 3] },
    })

    expect(result.current).toEqual([2, 4, 6])

    rerender({ items: [2, 4] })
    expect(result.current).toEqual([4, 8])
  })
})
