import { renderHook } from '@testing-library/react'
import usePreferredReducedMotion from '../src/hooks/usePreferredReducedMotion'

describe('usePreferredReducedMotion', () => {
  it('returns a boolean media preference', () => {
    const { result } = renderHook(() => usePreferredReducedMotion())
    expect(typeof result.current).toBe('boolean')
  })
})
