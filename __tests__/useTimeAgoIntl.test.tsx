import { renderHook } from '@testing-library/react'
import useTimeAgoIntl from '../src/hooks/useTimeAgoIntl'

describe('useTimeAgoIntl', () => {
  it('returns a relative-time label via Intl formatter alias', () => {
    const now = Date.now()
    const target = now - 60 * 1000

    const { result } = renderHook(() => useTimeAgoIntl(target, { updateInterval: 0 }))

    expect(typeof result.current).toBe('string')
    expect(result.current.length).toBeGreaterThan(0)
  })
})
