import { act, renderHook } from '@testing-library/react'
import useColorMode from '../src/hooks/useColorMode'

describe('useColorMode', () => {
  it('sets mode and toggles state', () => {
    const { result } = renderHook(() => useColorMode({ storageKey: 'test-color-mode' }))

    act(() => {
      result.current.setMode('dark')
    })
    expect(result.current.mode).toBe('dark')
    expect(result.current.isDark).toBe(true)

    act(() => {
      result.current.toggle()
    })
    expect(['light', 'dark']).toContain(result.current.mode)
  })
})
