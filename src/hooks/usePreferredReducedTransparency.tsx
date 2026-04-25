import useMediaQuery from './useMediaQuery'

/**
 * Returns true when user prefers reduced transparency effects.
 */
export default function usePreferredReducedTransparency(): boolean {
  return useMediaQuery('(prefers-reduced-transparency: reduce)')
}
