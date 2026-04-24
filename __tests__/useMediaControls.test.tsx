import { act, renderHook } from '@testing-library/react'
import useMediaControls from '../src/hooks/useMediaControls'

describe('useMediaControls', () => {
  it('controls media element state', async () => {
    const media = document.createElement('video')
    Object.defineProperty(media, 'duration', { configurable: true, value: 120 })
    Object.defineProperty(media, 'paused', { configurable: true, value: true, writable: true })
    media.play = jest.fn(async () => {
      Object.defineProperty(media, 'paused', { configurable: true, value: false })
      media.dispatchEvent(new Event('play'))
    })
    media.pause = jest.fn(() => {
      Object.defineProperty(media, 'paused', { configurable: true, value: true })
      media.dispatchEvent(new Event('pause'))
    })

    const ref = { current: media } as { current: HTMLMediaElement | null }

    const { result } = renderHook(() => useMediaControls(ref))

    await act(async () => {
      await result.current.play()
    })
    expect(result.current.playing).toBe(true)

    act(() => {
      result.current.seek(15)
      result.current.setVolume(0.4)
      result.current.setMuted(true)
      result.current.pause()
    })

    expect(result.current.currentTime).toBe(15)
    expect(result.current.volume).toBe(0.4)
    expect(result.current.muted).toBe(true)
    expect(result.current.playing).toBe(false)
  })
})
