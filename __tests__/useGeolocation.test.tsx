import { act, renderHook } from '@testing-library/react'
import useGeolocation from '../src/hooks/useGeolocation'

describe('useGeolocation', () => {
  it('updates state from watchPosition callback', () => {
    let onSuccess: ((position: GeolocationPosition) => void) | null = null

    const geolocationMock = {
      watchPosition: (success: (position: GeolocationPosition) => void) => {
        onSuccess = success
        return 1
      },
      clearWatch: jest.fn(),
    }

    Object.defineProperty(navigator, 'geolocation', { configurable: true, value: geolocationMock })

    const { result } = renderHook(() => useGeolocation())

    act(() => {
      onSuccess?.({
        coords: { latitude: 10, longitude: 20, accuracy: 5 } as GeolocationCoordinates,
        timestamp: Date.now(),
      } as GeolocationPosition)
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.latitude).toBe(10)
    expect(result.current.longitude).toBe(20)
  })
})
