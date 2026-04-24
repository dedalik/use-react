import { useEffect, useState } from 'react'

interface BatteryManagerLike extends EventTarget {
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
  addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void
  removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void
}

export interface UseBatteryReturn {
  isSupported: boolean
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
}

/**
 * Reads battery status from navigator.getBattery when available.
 */
export default function useBattery(): UseBatteryReturn {
  const batteryNavigator =
    typeof navigator !== 'undefined'
      ? (navigator as Navigator & { getBattery?: () => Promise<BatteryManagerLike> })
      : undefined

  const isSupported = !!batteryNavigator?.getBattery
  const [state, setState] = useState<UseBatteryReturn>({
    isSupported,
    charging: false,
    chargingTime: 0,
    dischargingTime: 0,
    level: 1,
  })

  useEffect(() => {
    if (!isSupported || !batteryNavigator?.getBattery) return

    let battery: BatteryManagerLike | null = null

    const update = () => {
      if (!battery) return
      setState({
        isSupported: true,
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
        level: battery.level,
      })
    }

    batteryNavigator.getBattery().then((resolvedBattery) => {
      battery = resolvedBattery
      update()
      battery.addEventListener('chargingchange', update)
      battery.addEventListener('chargingtimechange', update)
      battery.addEventListener('dischargingtimechange', update)
      battery.addEventListener('levelchange', update)
    })

    return () => {
      if (!battery) return
      battery.removeEventListener('chargingchange', update)
      battery.removeEventListener('chargingtimechange', update)
      battery.removeEventListener('dischargingtimechange', update)
      battery.removeEventListener('levelchange', update)
    }
  }, [batteryNavigator, isSupported])

  return state
}
