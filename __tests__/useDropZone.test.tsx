import { createRef } from 'react'
import { act, renderHook } from '@testing-library/react'
import useDropZone from '../src/hooks/useDropZone'

describe('useDropZone', () => {
  it('tracks drag-over state and dropped files', () => {
    const ref = createRef<HTMLElement>()
    const node = document.createElement('div')
    ;(ref as { current: HTMLElement | null }).current = node

    const onDrop = jest.fn()
    const { result } = renderHook(() => useDropZone(ref, { onDrop }))

    act(() => {
      node.dispatchEvent(new Event('dragover', { bubbles: true, cancelable: true }))
    })
    expect(result.current.isOverDropZone).toBe(true)

    const file = new File(['a'], 'a.txt', { type: 'text/plain' })
    const dropEvent = new Event('drop', { bubbles: true, cancelable: true })
    Object.defineProperty(dropEvent, 'dataTransfer', { value: { files: [file] } })

    act(() => {
      node.dispatchEvent(dropEvent)
    })

    expect(result.current.isOverDropZone).toBe(false)
    expect(result.current.files).toHaveLength(1)
    expect(onDrop).toHaveBeenCalledWith([file])
  })
})
