import { useEffect, useState } from 'react'

export interface UseGeolocationState {
  loading: boolean
  latitude: number | null
  longitude: number | null
  accuracy: number | null
  error: GeolocationPositionError | null
}

const initialState: UseGeolocationState = {
  loading: true,
  latitude: null,
  longitude: null,
  accuracy: null,
  error: null,
}

/**
 * Tracks user location via browser geolocation API.
 */
export default function useGeolocation(): UseGeolocationState {
  const [state, setState] = useState<UseGeolocationState>(initialState)

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setState({ ...initialState, loading: false })
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setState({
          loading: false,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          error: null,
        })
      },
      (error) => {
        setState((prev) => ({ ...prev, loading: false, error }))
      },
      { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 },
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return state
}
