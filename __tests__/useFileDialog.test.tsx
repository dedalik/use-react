import { act, renderHook } from '@testing-library/react'
import useFileDialog from '../src/hooks/useFileDialog'

describe('useFileDialog', () => {
  it('opens input and stores selected files', () => {
    const clickSpy = jest.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(() => {})

    const { result } = renderHook(() => useFileDialog({ accept: 'image/*' }))

    act(() => {
      result.current.open()
    })

    const input = document.body.querySelector('input[type="file"]') as HTMLInputElement
    expect(input).toBeTruthy()
    expect(clickSpy).toHaveBeenCalled()

    const file = new File(['x'], 'x.png', { type: 'image/png' })
    Object.defineProperty(input, 'files', { configurable: true, value: [file] })

    act(() => {
      input.dispatchEvent(new Event('change'))
    })

    expect(result.current.files).toHaveLength(1)
    expect(result.current.files[0].name).toBe('x.png')
    clickSpy.mockRestore()
  })
})
