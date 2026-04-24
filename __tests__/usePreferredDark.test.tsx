import { renderHook } from '@testing-library/react'
import usePreferredDark from '../src/hooks/usePreferredDark'

describe('usePreferredDark', () => {
  it('returns boolean state from media query', () => {
    const { result } = renderHook(() => usePreferredDark())
    expect(typeof result.current).toBe('boolean')
  })
})
