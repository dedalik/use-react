/**
 * Reads nested property value by dot-separated path.
 */
export default function get(source: unknown, path: string, fallback?: unknown): unknown {
  if (!path) return source ?? fallback

  const keys = path.split('.')
  let cursor: unknown = source

  for (const key of keys) {
    if (cursor == null || typeof cursor !== 'object' || !(key in (cursor as Record<string, unknown>))) {
      return fallback
    }
    cursor = (cursor as Record<string, unknown>)[key]
  }

  return cursor === undefined ? fallback : cursor
}
