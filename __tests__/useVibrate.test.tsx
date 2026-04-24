import { renderHook } from '@testing-library/react'
import useVibrate from '../src/hooks/useVibrate'

describe('useVibrate', () => {
  it('returns boolean result from navigator.vibrate', () => {
    const original = navigator.vibrate
    Object.defineProperty(navigator, 'vibrate', { configurable: true, value: () => true })

    const { result } = renderHook(() => useVibrate())
    expect(result.current(200)).toBe(true)

    Object.defineProperty(navigator, 'vibrate', { configurable: true, value: original })
  })
})
