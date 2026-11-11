/**
 * Vehicle catalogue. Add vehicles here when they are available for rental.
 *
 * Pages and components read from here — never hard-code a price, a spec or a
 * photo path in a component.
 */

export type VehiclePhoto = {
  src: string
  alt: string
  /** Short caption used by galleries. */
  caption?: string
}

export type VehiclePricing = {
  /** Consumer price including taxes for 24 hours, in euros. */
  day: number
  /** Price for the vehicle’s weekend duration, in euros. */
  weekend: number
  weekendHours: number
  /** Price for 7 days, in euros. */
  week: number
}

export type Vehicle = {
  id: string
  slug: string
  brand: string
  model: string
  /** "Renault Mégane 4" */
  name: string
  /** Short marketing line. */
  category: string
  tagline: string
  description: string

  transmission: 'Automatique' | 'Manuelle'
  fuel: 'Diesel' | 'Essence' | 'Hybride' | 'Électrique'
  /** Highlighted equipment, e.g. "Apple CarPlay". */
  features: string[]

  /** Kilometres included per rental day. */
  includedKmPerDay: number
  pricing: VehiclePricing
  /** Security deposit, in euros. */
  deposit: number
  depositMeans: string
  minimumAge: number
  minimumLicenseYears: number
  /** Null until the supplier and insurer confirm coverage of sub-rental. */
  insuranceIncluded: boolean | null
  /** Return is subject to the inspection and any justified amounts due. */
  depositReturn: 'same-day' | 'specified-in-contract'

  /** First photo is the primary / hero image. */
  photos: VehiclePhoto[]
  /** Dedicated large image for the compact configurator. */
  showcasePhoto?: VehiclePhoto

  availabilityNote: string
  available: boolean
}

/** No vehicles are currently available for rental. */
export const vehicles: Vehicle[] = []

export function getVehicle(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug)
}

export const primaryVehicle: Vehicle | undefined = vehicles.find((vehicle) => vehicle.available)

/** Formats an integer euro amount the French way: "1 500 €". */
export function euros(amount: number): string {
  return `${amount.toLocaleString('fr-FR')} €`
}
