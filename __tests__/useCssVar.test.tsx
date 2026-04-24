import { act, renderHook } from '@testing-library/react'
import useCssVar from '../src/hooks/useCssVar'

describe('useCssVar', () => {
  it('reads and updates css custom property', () => {
    document.documentElement.style.setProperty('--test-color', 'red')

    const { result } = renderHook(() => useCssVar('--test-color'))
    expect(result.current[0]).toBe('red')

    act(() => {
      result.current[1]('blue')
    })

    expect(document.documentElement.style.getPropertyValue('--test-color')).toBe('blue')
    expect(result.current[0]).toBe('blue')
  })
})
