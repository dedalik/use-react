import React from 'react'
import { renderHook } from '@testing-library/react'
import createInjectionState from '../src/hooks/createInjectionState'

describe('createInjectionState', () => {
  it('provides shared value via Provider', () => {
    const useValue = (initial: number) => ({ value: initial })
    const [Provider, useInjected] = createInjectionState(useValue)

    const wrapper = ({ children }: { children: React.ReactNode }) => <Provider args={[7]}>{children}</Provider>
    const { result } = renderHook(() => useInjected(), { wrapper })

    expect(result.current.value).toBe(7)
  })
})
