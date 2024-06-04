import { LocationObject } from "expo-location"
import { createContext, useContext } from "react"

export const LocationContext = createContext<LocationObject | null>(null)
export const GasStationContext = createContext<GasStation[] | null>(null)

export type GasStation = {
  id: number
  lat: number
  lon: number
  tags: {
    name: string
    'addr:street': string
    vicinity: string
  }
}

export function useLocationContext() {
    const locationContext = useContext(LocationContext)
    if (locationContext === undefined) {
        throw new Error('useLocationContext used outside of location provier')
    }
    return locationContext
}

export function useGasStationContext() {
    const gasStationContext = useContext(GasStationContext)
    if (gasStationContext === undefined) {
        throw new Error('useGasStationContext used outside of the GasStationProvider')
    }
    return gasStationContext
}