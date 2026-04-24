import useMediaQuery from './useMediaQuery'

/**
 * Returns true when the OS/browser prefers dark scheme.
 */
export default function usePreferredDark(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)')
}
