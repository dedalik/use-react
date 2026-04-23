import { useCallback, useState } from 'react'

export type UseToggleReturn = [boolean, () => void, (nextValue: boolean) => void]

export default function useToggle(initialValue = false): UseToggleReturn {
  const [value, setValue] = useState<boolean>(initialValue)

  const toggle = useCallback(() => {
    setValue((currentValue) => !currentValue)
  }, [])

  const set = useCallback((nextValue: boolean) => {
    setValue(nextValue)
  }, [])

  return [value, toggle, set]
}
