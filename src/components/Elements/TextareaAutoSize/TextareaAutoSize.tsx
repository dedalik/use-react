import React, { useState, ChangeEvent } from 'react'
import { useTextareaAutoSize } from '../../../hooks/Elements/useTextareaAutoSize/index'

const TextareaAutoSize: React.FC = () => {
  const [text, setText] = useState('')
  const { textarea, setInput } = useTextareaAutoSize({ input: text })

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value
    setText(newValue)
    setInput(newValue)
  }

  return <textarea ref={textarea} value={text} onChange={handleChange} style={{ resize: 'none' }} />
}

export default TextareaAutoSize
