import useTimeAgo, { UseTimeAgoOptions } from './useTimeAgo'

/**
 * Intl-focused alias for useTimeAgo.
 */
export default function useTimeAgoIntl(target: Date | number | null | undefined, options?: UseTimeAgoOptions): string {
  return useTimeAgo(target, options)
}
