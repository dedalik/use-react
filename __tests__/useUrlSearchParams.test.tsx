import { act, renderHook } from '@testing-library/react'
import useUrlSearchParams from '../src/hooks/useUrlSearchParams'

describe('useUrlSearchParams', () => {
  it('reads and updates query params', () => {
    window.history.replaceState({}, '', '/?foo=bar')
    const { result } = renderHook(() => useUrlSearchParams())

    expect(result.current[0].get('foo')).toBe('bar')

    act(() => {
      result.current[1]({ foo: 'baz', q: '1' })
    })

    expect(result.current[0].get('foo')).toBe('baz')
    expect(result.current[0].get('q')).toBe('1')
  })
})
