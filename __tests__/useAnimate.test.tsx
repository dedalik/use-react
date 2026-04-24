import { createRef } from 'react'
import { act, renderHook } from '@testing-library/react'
import useAnimate from '../src/hooks/useAnimate'

describe('useAnimate', () => {
  it('plays and cancels animation on target node', () => {
    const ref = createRef<HTMLElement>()
    const node = document.createElement('div')
    const cancel = jest.fn()
    ;(node as HTMLElement & { animate: any }).animate = jest.fn(() => ({ cancel }))
    ;(ref as { current: HTMLElement | null }).current = node

    const { result } = renderHook(() => useAnimate(ref))

    act(() => {
      const animation = result.current.play([{ opacity: 0 }, { opacity: 1 }], { duration: 100 })
      expect(animation).not.toBeNull()
    })

    act(() => {
      result.current.cancel()
    })

    expect(cancel).toHaveBeenCalled()
  })
})
