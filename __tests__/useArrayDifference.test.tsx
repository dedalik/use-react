import { renderHook } from '@testing-library/react'
import useArrayDifference from '../src/hooks/useArrayDifference'

describe('useArrayDifference', () => {
  it('returns values present only in source array', () => {
    const { result, rerender } = renderHook(({ source, values }) => useArrayDifference(source, values), {
      initialProps: { source: [1, 2, 3, 4], values: [2, 4] },
    })

    expect(result.current).toEqual([1, 3])

    rerender({ source: [5, 6], values: [6] })
    expect(result.current).toEqual([5])
  })
})
