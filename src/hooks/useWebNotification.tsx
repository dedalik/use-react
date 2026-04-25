import { useCallback } from 'react'

export interface UseWebNotificationReturn {
  isSupported: boolean
  permission: NotificationPermission | 'unsupported'
  requestPermission: () => Promise<NotificationPermission | 'unsupported'>
  show: (title: string, options?: NotificationOptions) => Notification | null
}

/**
 * Browser Notification API wrapper.
 */
export default function useWebNotification(): UseWebNotificationReturn {
  const isSupported = typeof window !== 'undefined' && 'Notification' in window
  const permission: NotificationPermission | 'unsupported' = isSupported ? Notification.permission : 'unsupported'

  const requestPermission = useCallback(async (): Promise<NotificationPermission | 'unsupported'> => {
    if (!isSupported) return 'unsupported'
    return Notification.requestPermission()
  }, [isSupported])

  const show = useCallback(
    (title: string, options?: NotificationOptions): Notification | null => {
      if (!isSupported || Notification.permission !== 'granted') return null

      try {
        return new Notification(title, options)
      } catch {
        return null
      }
    },
    [isSupported],
  )

  return { isSupported, permission, requestPermission, show }
}
