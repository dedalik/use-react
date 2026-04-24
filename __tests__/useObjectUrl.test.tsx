import { renderHook } from '@testing-library/react'
import useObjectUrl from '../src/hooks/useObjectUrl'

describe('useObjectUrl', () => {
  it('creates and revokes object url', () => {
    const originalCreate = URL.createObjectURL
    const originalRevoke = URL.revokeObjectURL
    const createMock = jest.fn(() => 'blob:mock-url')
    const revokeMock = jest.fn()
    const urlGlobal = URL as any
    urlGlobal.createObjectURL = createMock
    urlGlobal.revokeObjectURL = revokeMock

    const blob = new Blob(['abc'])
    const { result, unmount } = renderHook(() => useObjectUrl(blob))

    expect(result.current).toBe('blob:mock-url')

    unmount()

    expect(createMock).toHaveBeenCalledWith(blob)
    expect(revokeMock).toHaveBeenCalledWith('blob:mock-url')

    urlGlobal.createObjectURL = originalCreate
    urlGlobal.revokeObjectURL = originalRevoke
  })
})
