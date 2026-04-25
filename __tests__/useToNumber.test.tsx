import { renderHook } from '@testing-library/react'
import useToNumber from '../src/hooks/useToNumber'

describe('useToNumber', () => {
  it('converts value to number', () => {
    const { result } = renderHook(() => useToNumber('42'))
    expect(result.current).toBe(42)
  })

  it('uses fallback when NaN', () => {
    const { result } = renderHook(() => useToNumber('abc', { fallback: -1 }))
    expect(result.current).toBe(-1)
  })
})
