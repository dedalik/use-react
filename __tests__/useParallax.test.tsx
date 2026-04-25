import { act, renderHook } from '@testing-library/react'
import useParallax from '../src/hooks/useParallax'

describe('useParallax', () => {
  it('computes transform from mouse position', () => {
    const { result } = renderHook(() => useParallax({ factorX: 0.01, factorY: 0.01 }))

    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 300, clientY: 200 }))
    })

    expect(typeof result.current.transform).toBe('string')
    expect(typeof result.current.offsetX).toBe('number')
    expect(typeof result.current.offsetY).toBe('number')
  })
})
