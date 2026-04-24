import { act, renderHook } from '@testing-library/react'
import useFps from '../src/hooks/useFps'

describe('useFps', () => {
  it('returns numeric fps value', () => {
    jest.useFakeTimers()
    const raf = jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      setTimeout(() => cb(performance.now() + 16), 16)
      return 1
    })
    const caf = jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined)

    const { result } = renderHook(() => useFps(50))
    act(() => {
      jest.advanceTimersByTime(200)
    })

    expect(typeof result.current).toBe('number')

    raf.mockRestore()
    caf.mockRestore()
    jest.useRealTimers()
  })
})
