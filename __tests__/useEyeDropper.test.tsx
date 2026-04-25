import { act, renderHook } from '@testing-library/react'
import useEyeDropper from '../src/hooks/useEyeDropper'

describe('useEyeDropper', () => {
  it('opens eyedropper and stores selected color', async () => {
    const browserWindow = window as Window & { EyeDropper?: new () => { open: () => Promise<{ sRGBHex: string }> } }
    browserWindow.EyeDropper = class {
      open = async () => ({ sRGBHex: '#112233' })
    }

    const { result } = renderHook(() => useEyeDropper())

    await act(async () => {
      const color = await result.current.open()
      expect(color).toBe('#112233')
    })

    expect(result.current.sRGBHex).toBe('#112233')
  })
})
