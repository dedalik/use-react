import useMediaQuery from './useMediaQuery'

/**
 * Returns true when user prefers reduced motion.
 */
export default function usePreferredReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
