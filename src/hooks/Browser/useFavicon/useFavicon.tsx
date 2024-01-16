import React, { useState, useEffect, useCallback } from 'react'

export interface UseFaviconOptions {
  newIcon?: string
  baseUrl?: string
  rel?: string
  doc?: Document
}

export type UseFaviconReturnType = [string, React.Dispatch<React.SetStateAction<string>>]

const useFavicon = ({
  newIcon = '',
  baseUrl = '',
  rel = 'icon',
  doc = document,
}: UseFaviconOptions = {}): UseFaviconReturnType => {
  const [favicon, setFavicon] = useState<string>(newIcon)

  const applyIcon = useCallback(
    (icon: string) => {
      let linkElement = doc.head.querySelector(`link[rel*="${rel}"]`) as HTMLLinkElement

      if (!linkElement) {
        linkElement = doc.createElement('link')
        linkElement.rel = rel
        doc.head.appendChild(linkElement)
      }

      const iconUrl = `${baseUrl}${icon}`
      if (linkElement.href !== iconUrl) {
        linkElement.href = iconUrl
        linkElement.type = `image/${icon.split('.').pop()}`
      }
    },
    [baseUrl, rel, doc],
  )

  useEffect(() => {
    if (typeof favicon === 'string') {
      applyIcon(favicon)
    }
  }, [favicon, applyIcon])

  return [favicon, setFavicon]
}

export default useFavicon

export type UseFaviconType = ReturnType<typeof useFavicon>
