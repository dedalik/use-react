import { renderHook } from '@testing-library/react'
import useArrayJoin from '../src/hooks/useArrayJoin'

describe('useArrayJoin', () => {
  it('joins array into string with separator', () => {
    const { result, rerender } = renderHook(({ items, separator }) => useArrayJoin(items, separator), {
      initialProps: { items: [1, 2, 3], separator: '-' },
    })

    expect(result.current).toBe('1-2-3')

    rerender({ items: [1, 2, 3], separator: ',' })
    expect(result.current).toBe('1,2,3')
  })
})
