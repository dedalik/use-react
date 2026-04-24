import { renderHook } from '@testing-library/react'
import usePreferredReducedTransparency from '../src/hooks/usePreferredReducedTransparency'

describe('usePreferredReducedTransparency', () => {
  it('returns boolean media preference', () => {
    const { result } = renderHook(() => usePreferredReducedTransparency())
    expect(typeof result.current).toBe('boolean')
  })
})
