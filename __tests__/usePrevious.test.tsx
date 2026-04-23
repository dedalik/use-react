import { renderHook } from '@testing-library/react'
import { usePrevious } from '../src'

describe('usePrevious', () => {
  it('returns undefined on first render', () => {
    const { result } = renderHook(() => usePrevious('first'))
    expect(result.current).toBeUndefined()
  })

  it('returns previous value after rerender', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'first' },
    })

    rerender({ value: 'second' })
    expect(result.current).toBe('first')
  })
})
