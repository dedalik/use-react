import { act, renderHook } from '@testing-library/react'
import useCycleList from '../src/hooks/useCycleList'

describe('useCycleList', () => {
  it('cycles next and prev', () => {
    const { result } = renderHook(() => useCycleList(['a', 'b', 'c'], 0))

    expect(result.current.state).toBe('a')
    act(() => result.current.next())
    expect(result.current.state).toBe('b')
    act(() => result.current.prev())
    expect(result.current.state).toBe('a')
  })

  it('wraps around list boundaries', () => {
    const { result } = renderHook(() => useCycleList(['a', 'b'], 0))
    act(() => result.current.prev())
    expect(result.current.state).toBe('b')
  })
})
