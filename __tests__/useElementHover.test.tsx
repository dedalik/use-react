import { act, renderHook } from '@testing-library/react'
import { createRef } from 'react'
import useElementHover from '../src/hooks/useElementHover'

describe('useElementHover', () => {
  it('tracks mouse enter/leave state', () => {
    const ref = createRef<HTMLElement>()
    const node = document.createElement('div')
    ;(ref as { current: HTMLElement | null }).current = node

    const { result } = renderHook(() => useElementHover(ref))

    act(() => {
      node.dispatchEvent(new MouseEvent('mouseenter'))
    })
    expect(result.current).toBe(true)

    act(() => {
      node.dispatchEvent(new MouseEvent('mouseleave'))
    })
    expect(result.current).toBe(false)
  })
})
