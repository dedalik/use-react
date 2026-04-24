import { act, renderHook } from '@testing-library/react'
import useFullscreen from '../src/hooks/useFullscreen'

describe('useFullscreen', () => {
  it('enters and exits fullscreen', async () => {
    let fullscreenElement: Element | null = null

    Object.defineProperty(document, 'fullscreenElement', {
      configurable: true,
      get: () => fullscreenElement,
    })

    document.exitFullscreen = jest.fn(async () => {
      fullscreenElement = null
      document.dispatchEvent(new Event('fullscreenchange'))
    })

    document.documentElement.requestFullscreen = jest.fn(async () => {
      fullscreenElement = document.documentElement
      document.dispatchEvent(new Event('fullscreenchange'))
    })

    const { result } = renderHook(() => useFullscreen())

    await act(async () => {
      await result.current.enter()
    })

    expect(result.current.isFullscreen).toBe(true)

    await act(async () => {
      await result.current.exit()
    })

    expect(result.current.isFullscreen).toBe(false)
  })
})
