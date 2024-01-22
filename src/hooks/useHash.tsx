import { useCallback, useEffect, useState } from 'react'
import { on, off } from '../utils/helpers'

/**
 * Custom React hook for reading and updating the URL hash (window.location.hash).
 *
 * @returns A hook containing the current hash and a function to set the hash.
 */
const useHash = (): [string, (newHash: string) => void] => {
  // State to store the current hash value.
  const [hash, setLocalHash] = useState<string>(() => window.location.hash)

  /**
   * Callback function to update the hash state based on the current window location hash.
   * This function is memoized with useCallback to avoid unnecessary re-creations.
   */
  const onHashChange = useCallback(() => {
    setLocalHash(window.location.hash)
  }, [])

  /**
   * useEffect hook to set up and clean up the hashchange event listener.
   * Adds an event listener when the component mounts and removes it when the component unmounts.
   */
  useEffect(() => {
    // Registers the onHashChange event listener for 'hashchange' events.
    on(window, 'hashchange', onHashChange)

    // Cleanup function to remove the event listener.
    return () => off(window, 'hashchange', onHashChange)
  }, [onHashChange])

  /**
   * Function to update the URL hash.
   * It checks if the new hash is different from the current one before updating to prevent unnecessary changes.
   *
   * @param {string} newHash - The new hash to be set in the URL.
   */
  const setHash = useCallback(
    (newHash: string) => {
      if (newHash !== hash) {
        window.location.hash = newHash
      }
    },
    [hash],
  )

  // Return the current hash and the function to update it.
  return [hash, setHash]
}

export default useHash
