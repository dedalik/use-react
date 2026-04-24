import { renderHook } from '@testing-library/react'
import useSSRWidth from '../src/hooks/useSSRWidth'

describe('useSSRWidth', () => {
  it('returns current window width in browser tests', () => {
    const { result } = renderHook(() => useSSRWidth(777))
    expect(result.current).toBe(window.innerWidth)
  })
})
