import React, { useRef } from 'react'
import { act, render, screen } from '@testing-library/react'
import useDraggable from '../src/hooks/useDraggable'

if (typeof globalThis.PointerEvent === 'undefined') {
  class PointerEventShim extends MouseEvent {
    readonly pointerId: number
    readonly pointerType: string

    constructor(type: string, init: PointerEventInit = {}) {
      super(type, init)
      this.pointerId = init.pointerId ?? 0
      this.pointerType = init.pointerType ?? ''
    }
  }
  globalThis.PointerEvent = PointerEventShim as typeof PointerEvent
}

function firePointer(
  target: HTMLElement | Window,
  type: string,
  init: Partial<PointerEventInit> & { pointerId?: number },
) {
  const { pointerId = 1, ...rest } = init
  target.dispatchEvent(
    new PointerEvent(type, {
      bubbles: true,
      cancelable: true,
      pointerId,
      pointerType: 'mouse',
      button: 0,
      clientX: 0,
      clientY: 0,
      ...rest,
    }),
  )
}

function DraggableHarness({ hookOptions }: { hookOptions?: Parameters<typeof useDraggable>[1] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { position, isDragging, style } = useDraggable(ref, hookOptions)
  return (
    <>
      <div ref={ref} data-testid='target' style={style} />
      <span data-testid='pos'>
        {position.x},{position.y}
      </span>
      <span data-testid='dragging'>{String(isDragging)}</span>
    </>
  )
}

describe('useDraggable', () => {
  it('returns initial position and transform style', () => {
    render(<DraggableHarness hookOptions={{ initialValue: { x: 12, y: 34 } }} />)
    expect(screen.getByTestId('pos').textContent).toBe('12,34')
    const target = screen.getByTestId('target')
    expect(target.style.transform).toContain('translate3d(12px, 34px, 0)')
    expect(screen.getByTestId('dragging').textContent).toBe('false')
  })

  it('updates position while dragging and clears dragging on pointerup', () => {
    render(<DraggableHarness hookOptions={{ initialValue: { x: 0, y: 0 } }} />)
    const target = screen.getByTestId('target')

    act(() => {
      firePointer(target, 'pointerdown', { clientX: 100, clientY: 100, pointerId: 5 })
    })
    expect(screen.getByTestId('dragging').textContent).toBe('true')

    act(() => {
      firePointer(window, 'pointermove', { clientX: 130, clientY: 145, pointerId: 5 })
    })
    expect(screen.getByTestId('pos').textContent).toBe('30,45')

    act(() => {
      firePointer(window, 'pointerup', { pointerId: 5 })
    })
    expect(screen.getByTestId('dragging').textContent).toBe('false')
  })

  it('respects axis lock', () => {
    render(<DraggableHarness hookOptions={{ initialValue: { x: 0, y: 0 }, axis: 'x' }} />)
    const target = screen.getByTestId('target')

    act(() => {
      firePointer(target, 'pointerdown', { clientX: 0, clientY: 0, pointerId: 2 })
    })
    act(() => {
      firePointer(window, 'pointermove', { clientX: 50, clientY: 80, pointerId: 2 })
    })
    expect(screen.getByTestId('pos').textContent).toBe('50,0')
  })

  it('respects numeric bounds', () => {
    render(
      <DraggableHarness
        hookOptions={{
          initialValue: { x: 0, y: 0 },
          bounds: { minX: 0, maxX: 10, minY: 0, maxY: 10 },
        }}
      />,
    )
    const target = screen.getByTestId('target')

    act(() => {
      firePointer(target, 'pointerdown', { clientX: 0, clientY: 0, pointerId: 3 })
    })
    act(() => {
      firePointer(window, 'pointermove', { clientX: 100, clientY: 100, pointerId: 3 })
    })
    expect(screen.getByTestId('pos').textContent).toBe('10,10')
  })

  it('invokes lifecycle callbacks', () => {
    const onStart = jest.fn()
    const onMove = jest.fn()
    const onEnd = jest.fn()

    render(
      <DraggableHarness
        hookOptions={{
          initialValue: { x: 1, y: 2 },
          onStart,
          onMove,
          onEnd,
        }}
      />,
    )
    const target = screen.getByTestId('target')

    act(() => {
      firePointer(target, 'pointerdown', { clientX: 0, clientY: 0, pointerId: 9 })
    })
    expect(onStart).toHaveBeenCalledWith({ x: 1, y: 2 })

    act(() => {
      firePointer(window, 'pointermove', { clientX: 5, clientY: 6, pointerId: 9 })
    })
    expect(onMove).toHaveBeenCalledWith({ x: 6, y: 8 })

    act(() => {
      firePointer(window, 'pointerup', { pointerId: 9 })
    })
    expect(onEnd).toHaveBeenCalledWith({ x: 6, y: 8 })
  })
})
