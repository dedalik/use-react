import { useCallback, useState } from 'react'

interface BluetoothDeviceLike {
  name?: string
}

interface RequestDeviceOptionsLike {
  acceptAllDevices?: boolean
  filters?: Array<Record<string, unknown>>
  optionalServices?: string[]
}

export interface UseBluetoothReturn {
  isSupported: boolean
  deviceName: string | null
  error: string | null
  requestDevice: (options?: RequestDeviceOptionsLike) => Promise<BluetoothDeviceLike | null>
}

/**
 * Requests a Bluetooth device and stores the last selected name.
 */
export default function useBluetooth(): UseBluetoothReturn {
  const [deviceName, setDeviceName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const bluetoothNavigator =
    typeof navigator !== 'undefined'
      ? (navigator as Navigator & {
          bluetooth?: { requestDevice: (options: RequestDeviceOptionsLike) => Promise<BluetoothDeviceLike> }
        })
      : undefined
  const isSupported = !!bluetoothNavigator?.bluetooth?.requestDevice

  const requestDevice = useCallback(
    async (options: RequestDeviceOptionsLike = { acceptAllDevices: true }) => {
      if (!isSupported) return null

      try {
        const device = await bluetoothNavigator?.bluetooth?.requestDevice(options)
        if (!device) return null
        setDeviceName(device.name ?? null)
        setError(null)
        return device
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Bluetooth request failed'
        setError(message)
        return null
      }
    },
    [bluetoothNavigator, isSupported],
  )

  return { isSupported, deviceName, error, requestDevice }
}
