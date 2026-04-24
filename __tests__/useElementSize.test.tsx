import { createRef } from 'react'
import { act, renderHook } from '@testing-library/react'
import useElementSize from '../src/hooks/useElementSize'

describe('useElementSize', () => {
  it('reads element dimensions', () => {
    const ref = createRef<HTMLElement>()
    const node = document.createElement('div')
    Object.defineProperty(node, 'getBoundingClientRect', {
      value: () => ({ width: 120, height: 45, x: 0, y: 0, top: 0, right: 120, bottom: 45, left: 0 }),
    })
    ;(ref as { current: HTMLElement | null }).current = node

    class MockResizeObserver {
      callback: ResizeObserverCallback
      constructor(callback: ResizeObserverCallback) {
        this.callback = callback
      }
      observe() {}
      disconnect() {}
    }
    const sizedGlobal = globalThis as { ResizeObserver?: typeof ResizeObserver }
    sizedGlobal.ResizeObserver = MockResizeObserver as any

    const { result } = renderHook(() => useElementSize(ref))

    act(() => {})
    expect(result.current).toEqual({ width: 120, height: 45 })
  })
})
