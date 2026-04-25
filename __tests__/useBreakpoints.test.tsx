import { renderHook } from '@testing-library/react'
import useBreakpoints from '../src/hooks/useBreakpoints'

describe('useBreakpoints', () => {
  it('returns current active breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, configurable: true })

    const { result } = renderHook(() => useBreakpoints({ sm: 640, md: 768, lg: 1024 }))

    expect(result.current.current).toBe('lg')
    expect(result.current.flags.md).toBe(true)
    expect(result.current.greaterOrEqual('sm')).toBe(true)
  })
})
