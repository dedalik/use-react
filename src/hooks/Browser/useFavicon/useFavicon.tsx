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
      const elements = doc.head.querySelectorAll(`link[rel*="${rel}"]`)
      if (!elements.length) {
        const link = doc.createElement('link')
        link.rel = rel
        link.href = `${baseUrl}${icon}`
        link.type = `image/${icon.split('.').pop()}`
        doc.head.appendChild(link)
      } else {
        elements.forEach((el: Element) => {
          const linkElement = el as HTMLLinkElement
          linkElement.href = `${baseUrl}${icon}`
        })
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
