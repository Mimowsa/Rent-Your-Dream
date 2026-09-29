import { primaryVehicle as v } from '@/lib/vehicles'
import { rentalPolicy } from '@/lib/rental-policy'
import type { FaqItem } from '@/content/faq'

export const faqEn: FaqItem[] = [
  {
    question: 'How old do I need to be to rent a car?',
    answer: `Requirements depend on the vehicle. For the ${v.name}, you must be at least ${v.minimumAge} and have held a driving licence for at least ${v.minimumLicenseYears} year. Check the vehicle details; requirements are confirmed in the contract.`,
  },
  {
    question: 'Which documents are required?',
    answer:
      'A valid identity document, valid driving licence and recent proof of address are needed for the contract. The website configurator does not collect these documents. We explain how they are checked when confirming the rental.',
  },
  {
    question: 'What are the rental prices?',
    answer: `Each vehicle has its own rates. The ${v.name} costs EUR ${v.pricing.day} including taxes for 24 hours, EUR ${v.pricing.weekend} for a weekend and EUR ${v.pricing.week} for 7 days. Times, extras and the total price are confirmed in writing before you agree.`,
  },
  {
    question: 'Is insurance included?',
    answer: `Third-party liability cover is required for every rental. Cover for the ${v.name}, permitted drivers, guarantees, exclusions and excess amounts still need to be verified with the vehicle supplier and insurer. You will receive these details before you agree; no booking will be confirmed before verification.`,
  },
  {
    question: 'How much is the security deposit and when is it returned?',
    answer: `The amount depends on the vehicle and is separate from the rental price. For the ${v.name}, it is EUR ${v.deposit}, payable by bank transfer. It is returned on the day of return after the inspection, subject to justified amounts due. Bank processing times may apply.`,
  },
  {
    question: 'How many kilometres are included?',
    answer: `${v.includedKmPerDay} km per day are included for the ${v.name}. Tell us if you expect to drive more. The additional kilometre rate depends on the vehicle and is confirmed before you agree.`,
  },
  {
    question: 'How do I request a rental?',
    answer:
      'Choose your vehicle, dates and options in the configurator. It prepares a summary to send on WhatsApp. The request is non-binding; availability, times and the total price are confirmed in writing. No payment is collected on the website.',
  },
  {
    question: 'Which payment methods are accepted?',
    answer: `Payment arrangements are provided in the quote. The ${v.name} security deposit is paid by bank transfer. Cash is only possible where a verified statutory exception applies. No payment is collected on the website.`,
  },
  {
    question: 'Can I rent for a weekend?',
    answer: `Yes, depending on the vehicle’s packages and availability. The ${v.name} weekend package costs EUR ${v.pricing.weekend} including taxes for ${v.pricing.weekendHours} hours. Specify your preferred times so we can confirm them.`,
  },
  {
    question: 'Where do I pick up the car? Is delivery available?',
    answer:
      'Pick-up takes place in Île-de-France at an agreed location. Delivery elsewhere in France is available on request, subject to availability and a quote. The registered office in Bagnolet is not an advertised pick-up location.',
  },
  {
    question: 'Can I cancel my request or rental?',
    answer: `A simple availability request is non-binding. A booking requires ${rentalPolicy.arrhesPercent}% as arrhes, a booking payment under French law. It is refunded if you give notice at least ${rentalPolicy.cancellationNoticeDays} days before the agreed pick-up; otherwise it is retained. See Cancellation and refunds for the full terms and your rights.`,
  },
]
