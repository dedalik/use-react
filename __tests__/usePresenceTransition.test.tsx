import { act, renderHook } from '@testing-library/react'
import usePresenceTransition from '../src/hooks/usePresenceTransition'

describe('usePresenceTransition', () => {
  it('tracks mount and stage when toggling show', () => {
    jest.useFakeTimers()

    const { result, rerender } = renderHook(({ show }) => usePresenceTransition(show, 100), {
      initialProps: { show: false },
    })

    expect(result.current.mounted).toBe(false)
    expect(result.current.stage).toBe('exited')

    rerender({ show: true })
    expect(result.current.mounted).toBe(true)
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

    jest.useRealTimers()
  })
})
