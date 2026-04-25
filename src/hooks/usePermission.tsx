import { useEffect, useState } from 'react'

export type PermissionStateValue = PermissionState | 'unsupported'

/**
 * Tracks browser permission state for a named permission.
 */
export default function usePermission(name: PermissionName): PermissionStateValue {
  const [state, setState] = useState<PermissionStateValue>('unsupported')

  useEffect(() => {
    let status: PermissionStatus | null = null
    let active = true

    const onChange = () => {
      if (active && status) setState(status.state)
    }

    const run = async () => {
      if (!navigator.permissions?.query) return

      try {
        status = await navigator.permissions.query({ name } as PermissionDescriptor)
        if (!active || !status) return

        setState(status.state)
        status.addEventListener('change', onChange)
      } catch {
        setState('unsupported')
      }
    }

    void run()

    return () => {
      active = false
      if (status) status.removeEventListener('change', onChange)
    }
  }, [name])

  return state
}
