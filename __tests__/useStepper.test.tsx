import { act, renderHook } from '@testing-library/react'
import useStepper from '../src/hooks/useStepper'

describe('useStepper', () => {
  it('moves in bounds', () => {
    const { result } = renderHook(() => useStepper(3, 1, 0))

    act(() => result.current.next())
    expect(result.current.current).toBe(2)

    act(() => result.current.prev())
    expect(result.current.current).toBe(1)
  })

  it('clamps and reports boundary flags', () => {
    const { result } = renderHook(() => useStepper(2, 0, 0))

    expect(result.current.isFirst).toBe(true)
    act(() => result.current.goTo(10))
    expect(result.current.current).toBe(2)
    expect(result.current.isLast).toBe(true)
  })
})
