import { useCallback, useMemo, useState } from 'react'

export interface UseOffsetPaginationOptions {
  total?: number
  page?: number
  pageSize?: number
}

export interface UseOffsetPaginationReturn {
  page: number
  pageSize: number
  total: number
  pageCount: number
  isFirstPage: boolean
  isLastPage: boolean
  offset: number
  next: () => void
  prev: () => void
  setPage: (page: number) => void
  setPageSize: (size: number) => void
}

function clampPage(page: number, pageCount: number): number {
  return Math.min(Math.max(1, page), Math.max(pageCount, 1))
}

/**
 * Keeps classic offset pagination state and helpers.
 */
export default function useOffsetPagination(options: UseOffsetPaginationOptions = {}): UseOffsetPaginationReturn {
  const { total = 0, page = 1, pageSize = 10 } = options
  const [currentPage, setCurrentPage] = useState(page)
  const [currentPageSize, setCurrentPageSize] = useState(pageSize)

  const pageCount = useMemo(
    () => Math.max(1, Math.ceil(total / Math.max(1, currentPageSize))),
    [total, currentPageSize],
  )
  const safePage = clampPage(currentPage, pageCount)
  const offset = (safePage - 1) * currentPageSize

  const setPage = useCallback(
    (nextPage: number) => {
      setCurrentPage(clampPage(nextPage, pageCount))
    },
    [pageCount],
  )

  const setPageSize = useCallback((size: number) => {
    setCurrentPageSize(Math.max(1, Math.floor(size)))
  }, [])

  const next = useCallback(() => {
    setCurrentPage((p) => clampPage(p + 1, pageCount))
  }, [pageCount])

  const prev = useCallback(() => {
    setCurrentPage((p) => clampPage(p - 1, pageCount))
  }, [pageCount])

  return {
    page: safePage,
    pageSize: currentPageSize,
    total,
    pageCount,
    isFirstPage: safePage <= 1,
    isLastPage: safePage >= pageCount,
    offset,
    next,
    prev,
    setPage,
    setPageSize,
  }
}
