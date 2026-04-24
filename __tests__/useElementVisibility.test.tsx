import { createRef } from 'react'
import { act, renderHook } from '@testing-library/react'
import useElementVisibility from '../src/hooks/useElementVisibility'

describe('useElementVisibility', () => {
  it('updates visibility from intersection entries', () => {
    const ref = createRef<HTMLElement>()
    const node = document.createElement('div')
    ;(ref as { current: HTMLElement | null }).current = node

    let callback: IntersectionObserverCallback = () => {}
    class MockIntersectionObserver {
      constructor(cb: IntersectionObserverCallback) {
        callback = cb
      }
      observe() {}
      disconnect() {}
    }
    const visibilityGlobal = globalThis as { IntersectionObserver?: typeof IntersectionObserver }
    visibilityGlobal.IntersectionObserver = MockIntersectionObserver as any

    const { result } = renderHook(() => useElementVisibility(ref))
    expect(result.current).toBe(false)

    act(() => {
      callback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver)
    })
    expect(result.current).toBe(true)
  })
})
