import React from 'react'
import { render, fireEvent, screen, renderHook, act } from '@testing-library/react'
import TextareaAutoSize from '../src/components/TextareaAutoSize'
import { useTextareaAutoSize } from '../src'

describe('useTextareaAutoSize', () => {
  it('initializes textarea and input ref with default values', () => {
    // Render the hook and capture the result
    const { result } = renderHook(() => useTextareaAutoSize())

    // Check if the textarea ref is initialized and points to null.
    // This ensures that the hook correctly initializes the ref.
    expect(result.current.textareaRef.current).toBeNull()

    // Check if the input state is initialized and is undefined.
    // This is the expected initial state for the input.
    expect(result.current.input).toBeUndefined()

    // Check if the setInput function is defined.
    // This function is part of the hook's return value and should be available.
    expect(typeof result.current.setInput).toBe('function')

    // Check if the triggerResize function is defined.
    // This function is crucial for adjusting the textarea's size and should be available.
    expect(typeof result.current.triggerResize).toBe('function')
  })

  it('updates the input value when setInput is called', () => {
    const { result } = renderHook(() => useTextareaAutoSize())

    act(() => {
      result.current.setInput('New text')
    })

    expect(result.current.input).toBe('New text')
  })

  it('resizes the textarea based on content', () => {
    render(<TextareaAutoSize />)
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement

    // Mocking the scrollHeight property
    Object.defineProperty(textarea, 'scrollHeight', {
      writable: true,
      value: 150, // The pixel height you expect after changing the content
    })

    fireEvent.change(textarea, { target: { value: 'New text' } })
    expect(textarea.style.height).toBe('150px')
  })

  it('initializes textarea with external elementRef', () => {
    const externalRef = { current: document.createElement('textarea') }
    const { result } = renderHook(() => useTextareaAutoSize({ elementRef: externalRef }))

    expect(result.current.textareaRef).toBe(externalRef)
  })

  it('resizes the textarea using external elementRef', () => {
    const externalRef = { current: document.createElement('textarea') }
    const { result } = renderHook(() => useTextareaAutoSize({ elementRef: externalRef }))

    act(() => {
      // Mocking the scrollHeight property
      Object.defineProperty(externalRef.current, 'scrollHeight', {
        writable: true,
        value: 150, // Expected pixel height after content change
      })

      result.current.setInput('New text')
      result.current.triggerResize()
    })

    expect(externalRef.current.style.height).toBe('150px')
  })

  it('resizes the textarea based on content with internal ref', () => {
    render(<TextareaAutoSize />)

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement

    // Mocking the scrollHeight property
    Object.defineProperty(textarea, 'scrollHeight', {
      writable: true,
      value: 150, // The pixel height you expect after changing the content
    })

    fireEvent.change(textarea, { target: { value: 'New text' } })

    // It might be necessary to wait for next tick to allow for resize effect
    setTimeout(() => {
      expect(textarea.style.height).toBe('150px')
    }, 0)
  })
})
