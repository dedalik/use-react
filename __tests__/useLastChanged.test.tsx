import { act, renderHook } from '@testing-library/react'
import useLastChanged from '../src/hooks/useLastChanged'

describe('useLastChanged', () => {
  it('updates timestamp when value changes', () => {
    jest.useFakeTimers().setSystemTime(new Date('2026-01-01T00:00:00.000Z'))

    const { result, rerender } = renderHook(({ value }) => useLastChanged(value), {
      initialProps: { value: 1 },
    })

    const first = result.current

    act(() => {
      jest.setSystemTime(new Date('2026-01-01T00:00:01.000Z'))
    })
    rerender({ value: 2 })

    expect(result.current).toBeGreaterThan(first)
    jest.useRealTimers()
  })
})
