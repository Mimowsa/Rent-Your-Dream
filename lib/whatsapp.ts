import { company } from './company'
import type { Vehicle } from './vehicles'
import { translate, type Locale } from './i18n'

/**
 * Turns the configurator selection into a clean, human-readable message and the
 * link that opens it. The site never performs a real booking — the goal is to
 * land the visitor in a conversation with everything already written out.
 */

export type BookingSelection = {
  vehicleName: string
  firstName: string
  startDate: string // yyyy-mm-dd
  startTime: string // hh:mm
  endDate: string
  endTime: string
  /** true : le client veut des kilomètres au-delà du forfait. */
  extraKmWanted: boolean
  /** Nombre de km supplémentaires souhaités (0 = non précisé). */
  extraKm: number
  /** true : le client demande une livraison du véhicule. */
  delivery: boolean
  /** Ville de livraison saisie par le client (si `delivery`). */
  deliveryCity: string
  note: string
}

function formatDate(value: string, locale: Locale): string | null {
  if (!value) return null
  const d = new Date(`${value}T00:00:00`)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString(locale === 'en' ? 'en-GB' : 'fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function buildWhatsappMessage(
  sel: BookingSelection,
  vehicle?: Vehicle,
  locale: Locale = 'fr',
): string {
  if (locale === 'en') {
    const lines = [
      `Hello ${company.name},`,
      '',
      `${sel.firstName.trim() ? `My name is ${sel.firstName.trim()} and I` : 'I'} would like a rental quote for the ${sel.vehicleName}.`,
      '',
    ]
    const start = formatDate(sel.startDate, locale)
    const end = formatDate(sel.endDate, locale)
    if (start)
      lines.push(
        `Pick-up: ${start}${sel.startTime ? ` at ${sel.startTime}` : ''}`,
      )
    if (end)
      lines.push(`Return: ${end}${sel.endTime ? ` at ${sel.endTime}` : ''}`)
    lines.push(
      `Mileage: included allowance${vehicle ? ` (${vehicle.includedKmPerDay} km / day)` : ''}`,
    )
    if (sel.extraKmWanted)
      lines.push(
        `Additional mileage requested: ${sel.extraKm > 0 ? `about ${sel.extraKm} km` : 'yes, amount to be confirmed'}`,
      )
    lines.push(
      sel.delivery
        ? `Delivery requested: ${sel.deliveryCity.trim() || 'city to be confirmed'}`
        : `Pick-up in ${company.area}`,
    )
    if (sel.note.trim()) lines.push('', `Note: ${sel.note.trim()}`)
    if (vehicle)
      lines.push(
        '',
        `Reference rates, including taxes: ${vehicle.pricing.day} EUR / 24 hours; ${vehicle.pricing.weekend} EUR / weekend (${vehicle.pricing.weekendHours} hours); ${vehicle.pricing.week} EUR / 7 days.`,
        `Security deposit: ${vehicle.deposit} EUR; ${translate(vehicle.depositMeans, locale)}.`,
      )
    lines.push(
      '',
      'Please confirm availability, the total price, any extras and the rental terms. This is a non-binding request.',
    )
    return lines.join('\n')
  }
  const lines: string[] = []
  lines.push(`Bonjour ${company.name},`)
  lines.push('')

  const who = sel.firstName.trim()
  lines.push(
    who
      ? `Je suis ${who} et je souhaite une proposition de location pour la ${sel.vehicleName}.`
      : `Je souhaite une proposition de location pour la ${sel.vehicleName}.`,
  )
  lines.push('')

  const start = formatDate(sel.startDate, locale)
  const end = formatDate(sel.endDate, locale)
  if (start)
    lines.push(`Départ : ${start}${sel.startTime ? ` à ${sel.startTime}` : ''}`)
  if (end)
    lines.push(`Retour : ${end}${sel.endTime ? ` à ${sel.endTime}` : ''}`)

  lines.push(
    `Kilométrage : forfait inclus${
      vehicle ? ` (${vehicle.includedKmPerDay} km / jour)` : ''
    }`,
  )
  if (sel.extraKmWanted) {
    lines.push(
      sel.extraKm > 0
        ? `Kilomètres supplémentaires souhaités : environ ${sel.extraKm} km`
        : 'Kilomètres supplémentaires souhaités : oui (quantité à préciser)',
    )
  }

  if (sel.delivery) {
    const city = sel.deliveryCity.trim()
    lines.push(`Livraison souhaitée : ${city ? city : 'ville à préciser'}`)
  } else {
    lines.push(`Retrait : sur place en ${company.area}`)
  }

  if (sel.note.trim()) {
    lines.push('')
    lines.push(`Précision : ${sel.note.trim()}`)
  }

  lines.push('')
  lines.push(
    'Pouvez-vous me confirmer la disponibilité, le prix total et les conditions de location ? Merci.',
  )

  return lines.join('\n')
}

/**
 * The link that opens the pre-filled conversation.
 * - WhatsApp number known  → https://wa.me/<number>?text=...
 * - number not configured → no rental request link
 */
export function bookingWhatsappLink(message: string): string | null {
  return company.whatsappNumber
    ? `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`
    : null
}

/**
 * Plain "open a chat" link (no pre-filled message) for the generic
 * "contact us" buttons. WhatsApp when the number is known, e-mail otherwise.
 */
export const contactChatLink = company.whatsappNumber
  ? `https://wa.me/${company.whatsappNumber}`
  : `mailto:${company.email}`

/**
 * "I want to book" quick link for the hero CTA — opens WhatsApp with a
 * short generic message (no dates yet, that's what the configurator is for).
 */
export const bookingIntentLink = bookingWhatsappLink(
  'Bonjour, je souhaite obtenir des informations pour réserver un véhicule.',
)
