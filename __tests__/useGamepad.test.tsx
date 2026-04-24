import { act, renderHook } from '@testing-library/react'
import useGamepad from '../src/hooks/useGamepad'

describe('useGamepad', () => {
  it('reads connected gamepads', () => {
    const gamepad = { id: 'Mock Pad' } as Gamepad
    Object.defineProperty(navigator, 'getGamepads', {
      configurable: true,
      value: () => [gamepad],
    })

    const intervalSpy = jest
      .spyOn(window, 'setInterval')
      .mockImplementation(() => 1 as unknown as ReturnType<typeof setInterval>)
    const clearSpy = jest.spyOn(window, 'clearInterval').mockImplementation(() => {})

    const { result, unmount } = renderHook(() => useGamepad())

    act(() => {
      window.dispatchEvent(new Event('gamepadconnected'))
    })

    expect(result.current.gamepads).toHaveLength(1)
    expect(result.current.gamepads[0].id).toBe('Mock Pad')

    unmount()
    intervalSpy.mockRestore()
    clearSpy.mockRestore()
  })
})
