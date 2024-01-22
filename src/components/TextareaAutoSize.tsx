import React, { useState, ChangeEvent } from 'react'
import { useTextareaAutoSize } from '..'

const TextareaAutoSize: React.FC = () => {
  const [text, setText] = useState('')
  const { textareaRef } = useTextareaAutoSize({ input: text })

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value
    setText(newValue)
  }

  return (
    <textarea
      className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      ref={textareaRef}
      value={text}
      onChange={handleChange}
      style={{ resize: 'none' }}
    />
  )
}

export default TextareaAutoSize
