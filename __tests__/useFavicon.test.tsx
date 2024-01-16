import { renderHook, act } from '@testing-library/react'
import { useFavicon } from '../src'

describe('useFavicon', () => {
  it('should initialize correctly with default parameters', () => {
    const { result } = renderHook(() => useFavicon({ newIcon: 'initial-icon.ico' }))

    expect(result.current[0]).toBe('initial-icon.ico')
  })

  it('should update favicon when icon changes', () => {
    const { result } = renderHook(() => useFavicon({ newIcon: 'initial-icon.ico' }))

    act(() => {
      result.current[1]('updated-icon.ico')
    })

    expect(result.current[0]).toBe('updated-icon.ico')
  })

  it('should update href of existing link element when favicon changes', () => {
    renderHook(() => useFavicon({ newIcon: 'initial-icon.ico' }))

    const { result } = renderHook(() => useFavicon({ newIcon: 'updated-icon.ico' }))

    act(() => {
      result.current[1]('updated-icon.ico')
    })

    const linkElement = document.head.querySelector('link[rel="icon"]') as HTMLLinkElement
    expect(linkElement?.href).toContain('updated-icon.ico')
  })
})
