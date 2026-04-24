import { renderHook } from '@testing-library/react'
import usePreferredContrast from '../src/hooks/usePreferredContrast'

describe('usePreferredContrast', () => {
  it('returns a valid contrast preference', () => {
    const { result } = renderHook(() => usePreferredContrast())
    expect(['more', 'less', 'custom', 'no-preference']).toContain(result.current)
  })
})
