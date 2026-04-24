import { act, renderHook } from '@testing-library/react'
import usePointer from '../src/hooks/usePointer'

describe('usePointer', () => {
  it('tracks pointer move/down/up', () => {
    class PointerEventPolyfill extends MouseEvent {
      pointerType: string
      constructor(type: string, init: MouseEventInit & { pointerType?: string } = {}) {
        super(type, init)
        this.pointerType = init.pointerType || 'mouse'
      }
    }
    const windowWithPointer = window as unknown as { PointerEvent?: typeof PointerEventPolyfill }
    windowWithPointer.PointerEvent = PointerEventPolyfill

    const { result } = renderHook(() => usePointer())

    act(() => {
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 11, clientY: 22, pointerType: 'mouse' }))
    })
    expect(result.current.x).toBe(11)
    expect(result.current.y).toBe(22)

    act(() => {
      window.dispatchEvent(new PointerEvent('pointerdown', { clientX: 11, clientY: 22, pointerType: 'mouse' }))
    })
    expect(result.current.pressed).toBe(true)

    act(() => {
      window.dispatchEvent(new PointerEvent('pointerup', { clientX: 13, clientY: 24, pointerType: 'mouse' }))
    })
    expect(result.current.pressed).toBe(false)
  })
})
