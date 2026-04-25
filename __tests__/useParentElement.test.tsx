import { createRef } from 'react'
import { renderHook } from '@testing-library/react'
import useParentElement from '../src/hooks/useParentElement'

describe('useParentElement', () => {
  it('returns parent element for target ref', () => {
    const parent = document.createElement('div')
    const child = document.createElement('span')
    parent.appendChild(child)

    const ref = createRef<HTMLElement>()
    ;(ref as { current: HTMLElement | null }).current = child

    const { result } = renderHook(() => useParentElement(ref))
    expect(result.current).toBe(parent)
  })
})
