import { act, renderHook } from '@testing-library/react'
import useConfirmDialog from '../src/hooks/useConfirmDialog'

describe('useConfirmDialog', () => {
  it('resolves true on confirm and false on cancel', async () => {
    const { result } = renderHook(() => useConfirmDialog<string>())

    let firstPromise!: Promise<boolean>
    await act(async () => {
      firstPromise = result.current.reveal('delete')
    })

    expect(result.current.isOpen).toBe(true)
    expect(result.current.payload).toBe('delete')

    await act(async () => {
      result.current.confirm()
    })
    const first = await firstPromise

    expect(first).toBe(true)
    expect(result.current.isOpen).toBe(false)

    let secondPromise!: Promise<boolean>
    await act(async () => {
      secondPromise = result.current.reveal()
      result.current.cancel()
    })
    const second = await secondPromise

    expect(second).toBe(false)
  })
})
