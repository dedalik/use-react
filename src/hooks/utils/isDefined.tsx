/**
 * Type guard for non-null and non-undefined values.
 */
export default function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}
