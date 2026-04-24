import { renderHook } from '@testing-library/react'
import useCloned from '../src/hooks/useCloned'

describe('useCloned', () => {
  it('returns deep-cloned object', () => {
    const source = { user: { id: 1, tags: ['a'] } }
    const { result } = renderHook(() => useCloned(source))

    expect(result.current).toEqual(source)
    expect(result.current).not.toBe(source)
    expect(result.current.user).not.toBe(source.user)
  })

  it('recomputes when input reference changes', () => {
    const { result, rerender } = renderHook(({ value }) => useCloned(value), {
      initialProps: { value: { count: 1 } },
    })

    expect(result.current.count).toBe(1)

    rerender({ value: { count: 2 } })
    expect(result.current.count).toBe(2)
  })
})
