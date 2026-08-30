import { company } from './company'
import { euros, type Vehicle } from './vehicles'

/**
 * Turns the configurator selection into a clean, human-readable message and the
 * link that opens it. The site never performs a real booking — the goal is to
 * land the visitor in a conversation with everything already written out.
 */

export type MileageOption = 'included' | 'unlimited'
export type DeliveryOption = 'pickup' | 'delivery'

export type BookingSelection = {
  vehicleName: string
  firstName: string
  lastName: string
  startDate: string // yyyy-mm-dd
  startTime: string // hh:mm
  endDate: string
  endTime: string
  mileage: MileageOption
  delivery: DeliveryOption
  note: string
}

function formatDate(value: string): string | null {
  if (!value) return null
  const d = new Date(`${value}T00:00:00`)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function buildWhatsappMessage(sel: BookingSelection, vehicle?: Vehicle): string {
  const lines: string[] = []
  lines.push(`Bonjour ${company.name},`)
  lines.push('')

  const who = [sel.firstName, sel.lastName].filter(Boolean).join(' ').trim()
  lines.push(
    who
      ? `Je suis ${who} et je souhaite louer la ${sel.vehicleName}.`
      : `Je souhaite louer la ${sel.vehicleName}.`,
  )
  lines.push('')

  const start = formatDate(sel.startDate)
  const end = formatDate(sel.endDate)
  if (start) lines.push(`Départ : ${start}${sel.startTime ? ` à ${sel.startTime}` : ''}`)
  if (end) lines.push(`Retour : ${end}${sel.endTime ? ` à ${sel.endTime}` : ''}`)

  lines.push(
    sel.mileage === 'unlimited'
      ? `Kilométrage : illimité${
          vehicle ? ` (+${euros(vehicle.pricing.unlimitedKmSupplement)} / location)` : ''
        }`
      : `Kilométrage : formule incluse${
          vehicle ? ` (${vehicle.includedKmPerDay} km / jour)` : ''
        }`,
  )

  lines.push(
    sel.delivery === 'delivery'
      ? 'Livraison : souhaitée (à préciser ensemble)'
      : `Retrait : sur place en ${company.area}`,
  )

  if (sel.note.trim()) {
    lines.push('')
    lines.push(`Précision : ${sel.note.trim()}`)
  }

  lines.push('')
  lines.push('Pouvez-vous me confirmer la disponibilité ? Merci.')

  return lines.join('\n')
}

/**
 * The link that opens the pre-filled conversation.
 * - WhatsApp number known  → https://wa.me/<number>?text=...
 * - number not known yet   → mailto: fallback with the same body
 */
export function contactLink(message: string): { href: string; channel: 'whatsapp' | 'email' } {
  const encoded = encodeURIComponent(message)
  if (company.whatsappNumber) {
    return { href: `https://wa.me/${company.whatsappNumber}?text=${encoded}`, channel: 'whatsapp' }
  }
  const subject = encodeURIComponent(`Demande de location — ${company.name}`)
  return { href: `mailto:${company.email}?subject=${subject}&body=${encoded}`, channel: 'email' }
}

export const whatsappReady = company.whatsappNumber !== null
