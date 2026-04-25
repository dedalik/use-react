import { createRef } from 'react'
import { renderHook } from '@testing-library/react'
import useElementBounding from '../src/hooks/useElementBounding'

describe('useElementBounding', () => {
  it('returns bounding client rect values', () => {
    const ref = createRef<HTMLElement>()
    const node = document.createElement('div')
    Object.defineProperty(node, 'getBoundingClientRect', {
      value: () => ({ x: 10, y: 20, top: 20, right: 110, bottom: 60, left: 10, width: 100, height: 40 }),
    })
    ;(ref as { current: HTMLElement | null }).current = node

    class MockResizeObserver {
      constructor(_callback: ResizeObserverCallback) {
        void _callback
      }
      observe() {}
      disconnect() {}
    }
    const boundingGlobal = globalThis as { ResizeObserver?: typeof ResizeObserver }
    boundingGlobal.ResizeObserver = MockResizeObserver as any

    const { result } = renderHook(() => useElementBounding(ref))

    expect(result.current).toMatchObject({ width: 100, height: 40, top: 20, left: 10 })
  })
})
