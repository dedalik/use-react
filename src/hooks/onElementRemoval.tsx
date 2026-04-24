export interface OnElementRemovalOptions {
  root?: Node
  childList?: boolean
  subtree?: boolean
}

/**
 * Calls callback once target element is removed from DOM.
 */
export default function onElementRemoval(
  element: Element,
  callback: () => void,
  options: OnElementRemovalOptions = {},
): () => void {
  if (typeof MutationObserver === 'undefined') return () => {}

  const root = options.root ?? document.body
  const observer = new MutationObserver(() => {
    if (!element.isConnected) {
      callback()
      observer.disconnect()
    }
  })

  observer.observe(root, {
    childList: options.childList ?? true,
    subtree: options.subtree ?? true,
  })

  return () => observer.disconnect()
}
