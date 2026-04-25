import { act, renderHook } from '@testing-library/react'
import useFileSystemAccess from '../src/hooks/useFileSystemAccess'

describe('useFileSystemAccess', () => {
  it('opens and saves text files', async () => {
    const write = jest.fn(async () => {})
    const close = jest.fn(async () => {})

    Object.defineProperty(window, 'showOpenFilePicker', {
      configurable: true,
      value: async () => [
        {
          getFile: async () =>
            ({
              name: 'notes.txt',
              text: async () => 'hello',
            }) as File,
        },
      ],
    })

    Object.defineProperty(window, 'showSaveFilePicker', {
      configurable: true,
      value: async () => ({
        createWritable: async () => ({ write, close }),
      }),
    })

    const { result } = renderHook(() => useFileSystemAccess())

    await act(async () => {
      const opened = await result.current.open()
      expect(opened).toBe(true)
    })

    expect(result.current.fileName).toBe('notes.txt')
    expect(result.current.content).toBe('hello')

    await act(async () => {
      const saved = await result.current.saveAs('saved.txt', 'content')
      expect(saved).toBe(true)
    })

    expect(write).toHaveBeenCalledWith('content')
    expect(close).toHaveBeenCalled()
  })
})
