import { renderHook } from '@testing-library/react'
import useCssSupports from '../src/hooks/useCssSupports'

describe('useCssSupports', () => {
  it('returns CSS.supports evaluation result', () => {
    const mockSupports = jest.fn(() => true)
    ;(globalThis as any).CSS = { supports: mockSupports }

    const { result } = renderHook(() => useCssSupports('display', 'grid'))

    expect(result.current).toBe(true)
    expect(mockSupports).toHaveBeenCalledWith('display', 'grid')
  })
})
