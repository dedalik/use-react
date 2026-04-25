import { renderHook } from '@testing-library/react'
import useElementByPoint from '../src/hooks/useElementByPoint'

describe('useElementByPoint', () => {
  it('delegates to document.elementFromPoint', () => {
    const target = document.createElement('div')
    const patchedDocument = document as Document & {
      elementFromPoint?: (x: number, y: number) => Element | null
    }
    const original = patchedDocument.elementFromPoint
    patchedDocument.elementFromPoint = () => target

    const { result } = renderHook(() => useElementByPoint())
    expect(result.current(10, 20)).toBe(target)
    patchedDocument.elementFromPoint = original
  })
})
