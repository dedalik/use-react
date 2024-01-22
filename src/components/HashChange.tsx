import React from 'react'
import { useHash } from '..'

const HashChange = () => {
  // Use the useHash hook to access the current hash and a function to update it
  const [hash, setHash] = useHash()

  // Example function to change the hash when an event is triggered
  const handleUpdateHash = () => {
    setHash('#newHashValue')
  }

  return (
    <div>
      <p>Current Hash: {hash}</p>
      <button onClick={handleUpdateHash}>Change Hash</button>
    </div>
  )
}

export default HashChange
