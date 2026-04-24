import { renderHook } from '@testing-library/react'
import usePreferredColorScheme from '../src/hooks/usePreferredColorScheme'

describe('usePreferredColorScheme', () => {
  it('returns a valid scheme string', () => {
    const { result } = renderHook(() => usePreferredColorScheme())
    expect(['light', 'dark', 'no-preference']).toContain(result.current)
  })
})
