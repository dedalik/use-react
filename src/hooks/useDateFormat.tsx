import { useMemo } from 'react'

export type UseDateFormatOptions = Intl.DateTimeFormatOptions & {
  /** BCP 47 locale(s) passed to `Intl.DateTimeFormat`. */
  locale?: string | string[]
}

function stableOptionsKey(options: Intl.DateTimeFormatOptions): string {
  return JSON.stringify(options, Object.keys(options).sort())
}

function formatOptionsOnly(options?: UseDateFormatOptions): Intl.DateTimeFormatOptions {
  if (!options) return {}
  const copy: Record<string, unknown> = { ...options }
  delete copy.locale
  return copy as Intl.DateTimeFormatOptions
}

/**
 * Formats a `Date` or timestamp with `Intl.DateTimeFormat` (no extra date libraries).
 */
export default function useDateFormat(input: Date | number | null | undefined, options?: UseDateFormatOptions): string {
  const locale = options?.locale
  const formatOptions = formatOptionsOnly(options)
  const optionsKey = stableOptionsKey(formatOptions)

  return useMemo(() => {
    if (input == null) return ''
    const date = typeof input === 'number' ? new Date(input) : input
    if (Number.isNaN(date.getTime())) return ''
    try {
      return new Intl.DateTimeFormat(locale, formatOptions).format(date)
    } catch {
      return ''
    }
  }, [input, locale, optionsKey]) // eslint-disable-line react-hooks/exhaustive-deps -- optionsKey mirrors formatOptions
}
