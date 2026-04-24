import { act, renderHook } from '@testing-library/react'
import useRafFn from '../src/hooks/useRafFn'

describe('useRafFn', () => {
  it('runs raf callback when started', () => {
    const fn = jest.fn()
    let scheduled: FrameRequestCallback | null = null
    const raf = jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      scheduled = cb
      return 1
    })
    const caf = jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined)

    const { result } = renderHook(() => useRafFn(fn, false))

    act(() => {
      result.current.start()
    })
    act(() => {
      scheduled?.(16)
    })
    expect(fn).toHaveBeenCalled()

    act(() => result.current.stop())

    raf.mockRestore()
    caf.mockRestore()
  })
})
