import React, { createContext, ReactNode, useContext } from 'react'

/**
 * Creates Provider + consumer hook pair for shared context state.
 */
export default function createInjectionState<T, A extends unknown[]>(useValue: (...args: A) => T) {
  const InjectionContext = createContext<T | undefined>(undefined)

  function Provider(props: { args: A; children: ReactNode }) {
    const value = useValue(...props.args)
    return <InjectionContext.Provider value={value}>{props.children}</InjectionContext.Provider>
  }

  function useInjected() {
    const value = useContext(InjectionContext)
    if (value === undefined) {
      throw new Error('useInjected must be used inside its Provider')
    }
    return value
  }

  return [Provider, useInjected] as const
}
