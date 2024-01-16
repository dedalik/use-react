import React, { ChangeEvent } from 'react'
import useTextareaAutoSize from '../../../hooks/Browser/useTextareaAutoSize/useTextareaAutoSize'

const TextareaAutoSize2: React.FC = () => {
  const { input, textareaRef, setInput } = useTextareaAutoSize()

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value
    setInput(newValue)
  }

  return (
    <textarea
      className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      ref={textareaRef}
      value={input}
      onChange={handleChange}
      style={{ resize: 'none' }}
    />
  )
}

export default TextareaAutoSize2
