import { renderHook } from '@testing-library/react'
import useToString from '../src/hooks/useToString'

describe('useToString', () => {
  it('converts numbers and objects to string', () => {
    const { result: r1 } = renderHook(() => useToString(42))
    const { result: r2 } = renderHook(() => useToString({ a: 1 }))

    expect(r1.current).toBe('42')
    expect(r2.current).toBe('[object Object]')
  })
})
