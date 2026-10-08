import { rentalPolicy } from '@/lib/rental-policy'
import type { FaqItem } from '@/content/faq'

export const faqEn: FaqItem[] = [
  {
    question: 'How old do I need to be to rent a car?',
    answer:
      'The minimum age and how long you must have held a driving licence depend on the vehicle. Check the vehicle details for the rental requirements.',
  },
  {
    question: 'Which documents are required?',
    answer:
      'A valid identity document, valid driving licence and recent proof of address are needed for the contract. The website configurator does not collect these documents. We explain how they are checked when confirming the rental.',
  },
  {
    question: 'How much is the security deposit and when is it returned?',
    answer:
      'The security deposit amount depends on the vehicle and is shown on its details page. It can be paid in cash, by bank transfer or by a card pre-authorisation. It is returned immediately when you return the vehicle.',
  },
  {
    question: 'How many kilometres are included?',
    answer:
      'The included mileage differs for each vehicle. Check the vehicle details for the included allowance. If you plan to drive further, mention it in your request and we will confirm the additional kilometre rate.',
  },
  {
    question: 'How do I request a rental?',
    answer:
      'Choose your vehicle, dates and options in the configurator. It prepares a summary to send on WhatsApp. The request is non-binding; availability, times and the total price are confirmed in writing. No payment is collected on the website.',
  },
  {
    question: 'Which payment methods are accepted?',
    answer:
      'Rental payment arrangements are provided in your quote. The security deposit can be paid in cash, by bank transfer or by a card pre-authorisation. No payment is collected on the website.',
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
