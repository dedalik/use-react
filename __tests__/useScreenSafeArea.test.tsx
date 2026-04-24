import { renderHook } from '@testing-library/react'
import useScreenSafeArea from '../src/hooks/useScreenSafeArea'

describe('useScreenSafeArea', () => {
  it('returns numeric inset values', () => {
    document.documentElement.style.setProperty('--sat', '10px')
    document.documentElement.style.setProperty('--sar', '8px')
    document.documentElement.style.setProperty('--sab', '6px')
    document.documentElement.style.setProperty('--sal', '4px')

    const { result } = renderHook(() => useScreenSafeArea())
    expect(result.current).toEqual({ top: 10, right: 8, bottom: 6, left: 4 })
  })
})
