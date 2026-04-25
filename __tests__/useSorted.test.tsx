import { renderHook } from '@testing-library/react'
import useSorted from '../src/hooks/useSorted'

describe('useSorted', () => {
  it('returns a sorted numeric copy', () => {
    const input = [3, 1, 2]
    const { result } = renderHook(() => useSorted(input, (a, b) => a - b))

    expect(result.current).toEqual([1, 2, 3])
    expect(input).toEqual([3, 1, 2])
  })

  it('uses default sort behavior when compareFn is omitted', () => {
    const input = ['b', 'a', 'c']
    const { result } = renderHook(() => useSorted(input))
    expect(result.current).toEqual(['a', 'b', 'c'])
  })

  it('recomputes when input reference changes', () => {
    const { result, rerender } = renderHook(({ values }) => useSorted(values), {
      initialProps: { values: ['b', 'a'] },
    })

    expect(result.current).toEqual(['a', 'b'])

    rerender({ values: ['d', 'c'] })
    expect(result.current).toEqual(['c', 'd'])
  })
})
