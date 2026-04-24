import { renderHook } from '@testing-library/react'
import useSupported from '../src/hooks/useSupported'

describe('useSupported', () => {
  it('returns true when test passes', () => {
    const { result } = renderHook(() => useSupported(() => 'mediaDevices' in navigator))
    expect(typeof result.current).toBe('boolean')
  })

  it('returns false when test throws', () => {
    const { result } = renderHook(() =>
      useSupported(() => {
        throw new Error('not supported')
      }),
    )
    expect(result.current).toBe(false)
  })
})
