import { renderHook } from '@testing-library/react'
import useDateFormat from '../src/hooks/useDateFormat'

describe('useDateFormat', () => {
  it('formats a Date with Intl options', () => {
    const d = new Date(Date.UTC(2024, 5, 15, 12, 0, 0))
    const { result } = renderHook(() =>
      useDateFormat(d, {
        locale: 'en-US',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
      }),
    )
    expect(result.current).toContain('2024')
  })

  it('returns empty string for invalid date', () => {
    const { result } = renderHook(() => useDateFormat(new Date(Number.NaN)))
    expect(result.current).toBe('')
  })
})
