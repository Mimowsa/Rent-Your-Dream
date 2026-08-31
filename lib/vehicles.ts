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
  /** Price for 24 hours, in euros. */
  day: number
  /** Price for a weekend (Friday → Sunday), in euros. */
  weekend: number
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

  /** First photo is the primary / hero image. */
  photos: VehiclePhoto[]

  availabilityNote: string
  available: boolean
}

const meganeAlt = 'Renault Mégane 4 noire de Rent Your Dream'

export const vehicles: Vehicle[] = [
  {
    id: 'megane-4',
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
    includedKmPerDay: 250,
    pricing: {
      day: 80,
      weekend: 200,
      week: 400,
    },
    deposit: 1500,
    depositMeans: 'Virement ou espèces',
    photos: [
      {
        src: '/vehicles/megane-4/vitrine.jpg',
        alt: `${meganeAlt}, vue avant trois-quarts sur fond studio`,
        caption: 'Renault Mégane 4',
      },
      {
        src: '/vehicles/megane-4/front-3q.jpg',
        alt: `${meganeAlt}, vue avant trois-quarts`,
        caption: 'Vue avant trois-quarts',
      },
      {
        src: '/vehicles/megane-4/rear-3q.jpg',
        alt: `${meganeAlt}, vue arrière trois-quarts`,
        caption: 'Vue arrière',
      },
      {
        src: '/vehicles/megane-4/front-low.jpg',
        alt: `${meganeAlt}, vue avant en contre-plongée`,
        caption: 'Face avant',
      },
      {
        src: '/vehicles/megane-4/interior-carplay.jpg',
        alt: 'Habitacle de la Mégane 4 avec écran Apple CarPlay et boîte automatique',
        caption: 'Apple CarPlay · boîte automatique',
      },
      {
        src: '/vehicles/megane-4/wheel-detail.jpg',
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
