import { act, renderHook } from '@testing-library/react'
import useTransition from '../src/hooks/useTransition'

describe('useTransition', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('moves between enter and exit stages', () => {
    const { result, rerender } = renderHook(({ show }) => useTransition(show, 100), { initialProps: { show: false } })

    expect(result.current.stage).toBe('exited')
    expect(result.current.mounted).toBe(false)

    rerender({ show: true })
    expect(result.current.stage).toBe('entering')
    act(() => {
      jest.advanceTimersByTime(100)
    })
    expect(result.current.stage).toBe('entered')

    rerender({ show: false })
    expect(result.current.stage).toBe('exiting')
    act(() => {
      jest.advanceTimersByTime(100)
    })
    expect(result.current.stage).toBe('exited')
    expect(result.current.mounted).toBe(false)
  })
})
