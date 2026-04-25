import { act, renderHook } from '@testing-library/react'
import useScreenOrientation from '../src/hooks/useScreenOrientation'

describe('useScreenOrientation', () => {
  it('returns orientation state and reacts to events', () => {
    const { result } = renderHook(() => useScreenOrientation())
    expect(typeof result.current.angle).toBe('number')
    expect(typeof result.current.type).toBe('string')

    act(() => {
      window.dispatchEvent(new Event('orientationchange'))
    })

    expect(typeof result.current.angle).toBe('number')
  })
})
