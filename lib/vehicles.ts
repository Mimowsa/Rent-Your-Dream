/**
 * Vehicle catalogue. Today there is one car; the data model is built so that
 * adding another vehicle is just another object in `vehicles`.
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

const meganeAlt = 'Renault Mégane 4 noire de Rent Your Dream'

export const vehicles: Vehicle[] = [
  {
    id: 'megane-4',
    showcasePhoto: {
      src: '/vehicles/megane-4/source-vitrine.webp',
      alt: 'Renault Mégane 4 noire, photo vitrine Rent Your Dream',
    },
    slug: 'megane-4',
    brand: 'Renault',
    model: 'Mégane 4',
    name: 'Renault Mégane 4',
    category: 'Citadine polyvalente',
    tagline: 'L’élégance discrète, le confort automatique.',
    description:
      'Une Renault Mégane 4 automatique et diesel, équipée d’Apple CarPlay. Confortable en ville, sereine sur autoroute — pour une journée à Paris, un week-end ou une semaine sur la route.',
    transmission: 'Automatique',
    fuel: 'Diesel',
    features: ['Boîte automatique', 'Diesel', 'Apple CarPlay', '5 places'],
    includedKmPerDay: 200,
    pricing: {
      day: 60,
      weekend: 150,
      weekendHours: 48,
      week: 350,
    },
    deposit: 1000,
    depositMeans: 'Virement',
    minimumAge: 20,
    minimumLicenseYears: 1,
    insuranceIncluded: true,
    depositReturn: 'same-day',
    photos: [
      {
        src: '/vehicles/megane-4/source-vitrine.webp',
        alt: `${meganeAlt}, vue avant trois-quarts sur fond studio`,
        caption: 'Renault Mégane 4',
      },
      {
        src: '/vehicles/megane-4/source-front-3q.webp',
        alt: `${meganeAlt}, vue avant trois-quarts`,
        caption: 'Vue avant trois-quarts',
      },
      {
        src: '/vehicles/megane-4/source-rear-3q.webp',
        alt: `${meganeAlt}, vue arrière trois-quarts`,
        caption: 'Vue arrière',
      },
      {
        src: '/vehicles/megane-4/source-front-low.webp',
        alt: `${meganeAlt}, vue avant en contre-plongée`,
        caption: 'Face avant',
      },
      {
        src: '/vehicles/megane-4/source-interior-carplay.webp',
        alt: 'Habitacle de la Mégane 4 avec écran Apple CarPlay et boîte automatique',
        caption: 'Apple CarPlay · boîte automatique',
      },
      {
        src: '/vehicles/megane-4/source-wheel-detail.webp',
        alt: 'Détail de la jante et de la carrosserie de la Mégane 4',
        caption: 'Finition et jantes alliage',
      },
    ],
    availabilityNote: 'Disponibilité à confirmer avec nous sur WhatsApp',
    available: true,
  },
]

export function getVehicle(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug)
}

export const primaryVehicle = vehicles[0]

/** Formats an integer euro amount the French way: "1 500 €". */
export function euros(amount: number): string {
  return `${amount.toLocaleString('fr-FR')} €`
}
