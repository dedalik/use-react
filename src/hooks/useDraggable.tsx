import { type RefObject, useEffect, useMemo, useRef, useState } from 'react'

export type DraggablePointerType = 'mouse' | 'pen' | 'touch'

export interface DraggablePosition {
  x: number
  y: number
}

export interface DraggableBounds {
  minX?: number
  maxX?: number
  minY?: number
  maxY?: number
}

export interface UseDraggableOptions {
  initialValue?: DraggablePosition
  axis?: 'x' | 'y'
  bounds?: DraggableBounds
  handle?: RefObject<HTMLElement | null>
  containerElement?: HTMLElement | RefObject<HTMLElement | null>
  draggingElement?: RefObject<HTMLElement | null>
  pointerTypes?: DraggablePointerType[]
  exact?: boolean
  preventDefault?: boolean
  stopPropagation?: boolean
  capture?: boolean
  onStart?: (position: DraggablePosition) => void
  onMove?: (position: DraggablePosition) => void
  onEnd?: (position: DraggablePosition) => void
}

export interface UseDraggableReturn {
  position: DraggablePosition
  isDragging: boolean
  style: { transform: string }
}

const defaultPointerTypes: DraggablePointerType[] = ['mouse', 'pen', 'touch']

function acceptsPointerType(pointerType: string, allowed: DraggablePointerType[] | undefined): boolean {
  const list = allowed ?? defaultPointerTypes
  return list.includes(pointerType as DraggablePointerType)
}

function resolveContainer(container: HTMLElement | RefObject<HTMLElement | null> | undefined): HTMLElement | null {
  if (!container) return null
  return 'current' in container ? container.current : container
}

function clampWithBounds(x: number, y: number, bounds: DraggableBounds | undefined): DraggablePosition {
  if (!bounds) return { x, y }
  return {
    x: Math.min(bounds.maxX ?? Infinity, Math.max(bounds.minX ?? -Infinity, x)),
    y: Math.min(bounds.maxY ?? Infinity, Math.max(bounds.minY ?? -Infinity, y)),
  }
}

function applyAxis(next: DraggablePosition, start: DraggablePosition, axis: 'x' | 'y' | undefined): DraggablePosition {
  if (axis === 'x') return { x: next.x, y: start.y }
  if (axis === 'y') return { x: start.x, y: next.y }
  return next
}

function clampToContainer(
  tx: number,
  ty: number,
  layoutOrigin: DraggablePosition,
  width: number,
  height: number,
  container: HTMLElement,
): DraggablePosition {
  const cr = container.getBoundingClientRect()
  const minTx = cr.left - layoutOrigin.x
  const maxTx = cr.right - layoutOrigin.x - width
  const minTy = cr.top - layoutOrigin.y
  const maxTy = cr.bottom - layoutOrigin.y - height
  return {
    x: Math.min(Math.max(tx, minTx), maxTx),
    y: Math.min(Math.max(ty, minTy), maxTy),
  }
}

export default function useDraggable(
  targetRef: RefObject<HTMLElement | null>,
  options: UseDraggableOptions = {},
): UseDraggableReturn {
  const { initialValue = { x: 0, y: 0 }, capture, handle, draggingElement } = options

  const [position, setPosition] = useState<DraggablePosition>(initialValue)
  const [isDragging, setIsDragging] = useState(false)

  const positionRef = useRef(position)
  positionRef.current = position

  const optionsRef = useRef(options)
  optionsRef.current = options

  const dragStateRef = useRef<{
    pointerId: number
    startClient: DraggablePosition
    startPos: DraggablePosition
    layoutOrigin: DraggablePosition
    width: number
    height: number
    captureTarget: HTMLElement
  } | null>(null)

  const style = useMemo(
    () => ({ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }),
    [position.x, position.y],
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const getListenEl = () => optionsRef.current.handle?.current ?? targetRef.current
    const getDragEl = () => optionsRef.current.draggingElement?.current ?? targetRef.current

    const onPointerDown = (event: PointerEvent) => {
      const listen = getListenEl()
      const dragging = getDragEl()
      if (!listen || !dragging) return

      const o = optionsRef.current
      if (!acceptsPointerType(event.pointerType, o.pointerTypes)) return
      if (o.exact && event.pointerType === 'mouse' && event.button !== 0) return

      if (o.preventDefault) event.preventDefault()
      if (o.stopPropagation) event.stopPropagation()

      const rect = dragging.getBoundingClientRect()
      const pos = positionRef.current
      dragStateRef.current = {
        pointerId: event.pointerId,
        startClient: { x: event.clientX, y: event.clientY },
        startPos: { ...pos },
        layoutOrigin: { x: rect.left - pos.x, y: rect.top - pos.y },
        width: rect.width,
        height: rect.height,
        captureTarget: listen,
      }

      setIsDragging(true)
      o.onStart?.(pos)

      listen.setPointerCapture?.(event.pointerId)
    }

    const onPointerMove = (event: PointerEvent) => {
      const st = dragStateRef.current
      if (!st || event.pointerId !== st.pointerId) return

      const o = optionsRef.current
      if (o.preventDefault) event.preventDefault()

      const nx = st.startPos.x + (event.clientX - st.startClient.x)
      const ny = st.startPos.y + (event.clientY - st.startClient.y)
      let next = applyAxis({ x: nx, y: ny }, st.startPos, o.axis)

      const cont = resolveContainer(o.containerElement)
      if (cont) {
        next = clampToContainer(next.x, next.y, st.layoutOrigin, st.width, st.height, cont)
      }

      next = clampWithBounds(next.x, next.y, o.bounds)
      setPosition(next)
      o.onMove?.(next)
    }

    const finishDrag = (event: PointerEvent) => {
      const st = dragStateRef.current
      if (!st || event.pointerId !== st.pointerId) return

      const o = optionsRef.current
      if (o.preventDefault) event.preventDefault()

      dragStateRef.current = null
      setIsDragging(false)

      try {
        st.captureTarget.releasePointerCapture(event.pointerId)
      } catch {
        /* pointer may already be released */
      }

      o.onEnd?.(positionRef.current)
    }

    const el = getListenEl()
    if (!el) return

    el.addEventListener('pointerdown', onPointerDown, { capture: !!capture })

    window.addEventListener('pointermove', onPointerMove, { capture: true })
    window.addEventListener('pointerup', finishDrag, { capture: true })
    window.addEventListener('pointercancel', finishDrag, { capture: true })

    return () => {
      el.removeEventListener('pointerdown', onPointerDown, { capture: !!capture })
      window.removeEventListener('pointermove', onPointerMove, { capture: true })
      window.removeEventListener('pointerup', finishDrag, { capture: true })
      window.removeEventListener('pointercancel', finishDrag, { capture: true })
    }
  }, [targetRef, handle, draggingElement, capture])

  return { position, isDragging, style }
}
