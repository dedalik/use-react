import { act, renderHook } from '@testing-library/react'
import useWebNotification from '../src/hooks/useWebNotification'

describe('useWebNotification', () => {
  it('requests permission and shows notification when granted', async () => {
    const NotificationMock = function (this: any) {
      return this
    } as any
    NotificationMock.permission = 'granted'
    NotificationMock.requestPermission = jest.fn(async () => 'granted')
    ;(window as any).Notification = NotificationMock

    const { result } = renderHook(() => useWebNotification())
    expect(result.current.isSupported).toBe(true)

    await act(async () => {
      const permission = await result.current.requestPermission()
      expect(permission).toBe('granted')
    })

    const instance = result.current.show('Hello')
    expect(instance).not.toBeNull()
  })
})
