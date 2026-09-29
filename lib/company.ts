/**
 * Single source of truth for every piece of company information.
 * Nothing below should be hard-coded in components — import from here.
 *
 * Fields that are not available yet are set to `null`. The UI is written to
 * degrade gracefully (a channel with `handle: null` renders as "À venir" and is
 * never a broken link), so adding a value here is the only change needed later.
 */

export type SocialChannel = {
  label: string
  /** Public handle / username, or null if not opened yet. */
  handle: string | null
  /** Absolute URL, or null if not available (renders as non-clickable). */
  url: string | null
  /** Official brand colour, used only on the platform's own icon. */
  color: string
}

export const company = {
  name: 'Rent Your Dream',
  /** Public domain confirmed by the owner. Override only for a domain change. */
  siteUrl: (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rentyourdream.fr'
  ).replace(/\/$/, ''),
  shortName: 'RYD',
  slogan: 'Un rêve éveillé',
  tagline: 'Louez. Roulez. Profitez.',
  description:
    'Location de voiture à Paris et en Île-de-France, à la journée, au week-end ou à la semaine. Découvrez notre flotte et préparez votre demande de location.',

  /** Verified against the Kbis issued on 18 September 2026. Not a pickup address. */
  legal: {
    name: 'RENT YOUR DREAM',
    form: 'Société par actions simplifiée à associé unique (SASU)',
    capital: 1000,
    siren: '130 181 647',
    rcs: '130 181 647 RCS Bobigny',
    address: '19 Rue Charles Delescluze, 93170 Bagnolet, France',
    streetAddress: '19 Rue Charles Delescluze',
    postalCode: '93170',
    city: 'Bagnolet',
    country: 'FR',
    publicationDirector: 'Ryan DJORDJEVIC',
    registeredOn: '2026-09-18',
  },

  area: 'Île-de-France',
  city: 'Paris',
  deliveryNote: 'Livraison possible partout en France',

  email: 'RentYourDream@outlook.fr',
  /** Display phone number. */
  phone: '+33 6 88 43 39 93' as string | null,

  /**
   * WhatsApp business number in international format, digits only, no "+".
   * Rental requests open WhatsApp (wa.me) with a pre-filled message.
   * When null, request links are unavailable; there is no e-mail fallback.
   */
  whatsappNumber: '33688433993' as string | null,

  socials: {
    snapchat: {
      label: 'Snapchat',
      handle: 'RentYD75',
      url: 'https://www.snapchat.com/add/RentYD75',
      color: '#FFFC00',
    },
    instagram: {
      label: 'Instagram',
      handle: '@rentyd75',
      url: 'https://www.instagram.com/rentyd75/',
      color: '#E1306C',
    },
    tiktok: {
      label: 'TikTok',
      handle: '@Rentyd75',
      url: 'https://www.tiktok.com/@Rentyd75',
      color: '#010101',
    },
    whatsapp: {
      label: 'WhatsApp',
      handle: null,
      url: null,
      color: '#25D366',
    },
  } satisfies Record<string, SocialChannel>,

  credit: {
    label: 'Site réalisé par MimoServices',
    name: 'MimoServices',
    url: null as string | null,
  },

  legalRoutes: [
    { label: 'Mentions légales', href: '/mentions-legales' },
    {
      label: 'Politique de confidentialité',
      href: '/politique-confidentialite',
    },
    { label: 'Politique des cookies', href: '/politique-cookies' },
    { label: 'Conditions d’utilisation', href: '/conditions-generales' },
    { label: 'CGV / Conditions de location', href: '/conditions-location' },
    { label: 'Annulation et remboursement', href: '/annulation-remboursement' },
  ],
} as const

export const socialList: SocialChannel[] = [
  company.socials.snapchat,
  company.socials.instagram,
  company.socials.tiktok,
  company.socials.whatsapp,
]
