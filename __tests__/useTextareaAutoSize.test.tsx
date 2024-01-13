import React from 'react'
import { render, fireEvent, screen, renderHook, act } from '@testing-library/react'
import { useTextareaAutoSize } from '../src/hooks/Elements/useTextareaAutoSize/index'
import ResizableTextarea from '../src/components/Elements/ResizableTextarea/ResizableTextarea'

describe('useTextareaAutosize', () => {
  it('initializes textarea and input ref with default values', () => {
    const { result } = renderHook(() => useTextareaAutoSize())

    expect(result.current.textarea.current).toBeNull()
    expect(result.current.input).toBeUndefined()
  })

  it('updates the input value when setInput is called', () => {
    const { result } = renderHook(() => useTextareaAutoSize())

    act(() => {
      result.current.setInput('New text')
    })

    expect(result.current.input).toBe('New text')
  })

  it('resizes the textarea based on content', () => {
    render(<ResizableTextarea />)
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement

    // Mocking the scrollHeight property
    Object.defineProperty(textarea, 'scrollHeight', {
      writable: true,
      value: 100, // The pixel height you expect after changing the content
    })

    fireEvent.change(textarea, { target: { value: 'New text' } })
    expect(textarea.style.height).toBe('100px')
  })
})
