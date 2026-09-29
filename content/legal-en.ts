import { company } from '@/lib/company'
import { primaryVehicle as v } from '@/lib/vehicles'
import { rentalPolicy } from '@/lib/rental-policy'

export type LegalSection = {
  heading: string
  paragraphs: string[]
  link?: { href: string; label: string }
}
export type LegalDocument = {
  title: string
  intro: string
  sections: LegalSection[]
}
const contact = `${company.email}; registered office: ${company.legal.address}.`

export const legalEn: Record<string, LegalDocument> = {
  'mentions-legales': {
    title: 'Legal notice',
    intro: 'The company publishing this website and how to contact it.',
    sections: [
      {
        heading: 'Website publisher',
        paragraphs: [
          `${company.legal.name}, a French single-member simplified joint-stock company (SASU), with share capital of EUR ${company.legal.capital}. ${company.legal.rcs}. SIREN: ${company.legal.siren}. Registered on 18 September 2026. Registered office: ${company.legal.address}. Email: ${company.email}. Phone: ${company.phone}.`,
          'The registered office is the company’s correspondence address. Vehicle handover takes place at a location agreed before rental.',
        ],
      },
      {
        heading: 'Publication director',
        paragraphs: [
          `${company.legal.publicationDirector}, president of ${company.legal.name}.`,
        ],
      },
      {
        heading: 'Hosting',
        paragraphs: [
          'Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, United States. Legal contact telephone published by the host: +1 559 288 7060.',
        ],
        link: { href: 'https://vercel.com/help', label: 'Vercel support' },
      },
      {
        heading: 'Tax identification',
        paragraphs: [
          'An intra-community VAT number has not yet been communicated to the company. This notice will be updated after confirmation of the number or tax status. The absence of a published VAT number is not a claim of VAT exemption.',
        ],
      },
      {
        heading: 'Complaints and consumer mediation',
        paragraphs: [
          `Send a written complaint identifying the rental to ${contact}`,
          'Consumers can use a competent consumer mediator free of charge after an unresolved written complaint. The company still needs to join a mediation scheme and publish the mediator’s name, contact details and website before publication. No mediator is presented as a partner without an agreement.',
        ],
        link: { href: '/conditions-location', label: 'Rental terms' },
      },
      {
        heading: 'Design, content and personal data',
        paragraphs: [
          `Website design and development: ${company.credit.name}. Trademarks, text and images remain protected by their owners’ rights. Reuse must comply with permissions and statutory exceptions.`,
          'Our privacy and cookie policies explain data processing and how to exercise your rights.',
        ],
        link: { href: '/politique-confidentialite', label: 'Privacy policy' },
      },
    ],
  },
  'conditions-generales': {
    title: 'Website terms of use',
    intro: 'Explore our vehicles and prepare a non-binding rental request.',
    sections: [
      {
        heading: 'Access',
        paragraphs: [
          `This website is published by ${company.legal.name}. Browsing is free, excluding your internet provider’s charges. No account is required.`,
        ],
        link: { href: '/mentions-legales', label: 'Publisher details' },
      },
      {
        heading: 'Rental requests',
        paragraphs: [
          'The configurator prepares a summary to send on WhatsApp. Opening or sending that message does not book a vehicle or create a payment obligation. Availability, the total price and terms must be supplied before you agree.',
          'Rentals are governed by the rental terms and the contractual documents supplied before your agreement. An estimate or availability request is not a booking confirmation.',
        ],
        link: { href: '/conditions-location', label: 'Rental terms' },
      },
      {
        heading: 'Information and permitted use',
        paragraphs: [
          'Only provide useful, accurate information. Do not enter bank card details, identity documents or driving licence copies in the comments field.',
          'Public content may be accessed by browsers, screen readers and automated tools in compliance with the law and content rights. Do not disrupt the service, bypass its protections or attempt to access non-public data. Basic form protections limit automated or repeated requests; they do not guarantee that every spam attempt is prevented.',
        ],
      },
      {
        heading: 'External services',
        paragraphs: [
          'Links to WhatsApp, Instagram, Snapchat and TikTok open independent services governed by their own terms and privacy policies. General or administrative questions may also be sent by email or phone.',
        ],
      },
      {
        heading: 'Availability, accessibility and liability',
        paragraphs: [
          'The website may be unavailable during maintenance or a technical incident. Correct prices, equipment and availability must be communicated before agreement. These terms do not limit mandatory consumer rights or statutory liability.',
          `If you have difficulty reading a page or using the configurator, contact ${company.email}, identifying the page and issue without sending sensitive data.`,
        ],
      },
      {
        heading: 'Applicable law and changes',
        paragraphs: [
          'French law applies, subject to mandatory protections available to you. Changes apply to future use and do not retrospectively amend an existing rental contract. Statutory rules on court jurisdiction remain applicable. The English pages provide an English-language version of the information on this website.',
        ],
      },
    ],
  },
  'conditions-location': {
    title: 'Rental terms',
    intro: 'Information to read before agreeing to a rental.',
    sections: [
      {
        heading: 'Terms still being finalised',
        paragraphs: [
          'This page records confirmed information. Insurance excesses, additional kilometre prices and certain refund arrangements must still be documented before commercial opening. The configurator only prepares a request and does not accept bookings or payments.',
        ],
      },
      {
        heading: 'Your rental company and agreement',
        paragraphs: [
          `${company.legal.name}, SASU, share capital EUR ${company.legal.capital}, ${company.legal.rcs}. Contact: ${contact}`,
          'Choose a vehicle, dates and options. We check availability and supply the applicable terms and total price. Your request is non-binding. Before agreement, you must receive vehicle details, pick-up and return times and locations, an itemised price, driver requirements, insurance details and any fees. Availability alone does not replace this information.',
        ],
      },
      {
        heading: `${v.name} prices`,
        paragraphs: [
          `EUR ${v.pricing.day} including taxes for 24 hours; EUR ${v.pricing.weekend} for a ${v.pricing.weekendHours}-hour weekend, with precise times agreed; EUR ${v.pricing.week} for 7 days. ${v.includedKmPerDay} km per day included.`,
          'Displayed prices are the tax-inclusive amounts paid by consumers. Delivery and additional mileage are quoted in advance and are not automatically added. Other vehicles have their own prices and conditions.',
        ],
      },
      {
        heading: 'Driver and insurance',
        paragraphs: [
          `The driver must be at least ${v.minimumAge} and have held a valid licence appropriate to the vehicle for at least ${v.minimumLicenseYears} year. Necessary documents are specified before confirmation.`,
          'Third-party liability cover is required for every rental. Coverage of sub-rental, permitted drivers, guarantees, exclusions, excesses and assistance still require written confirmation from the vehicle supplier and insurer. No booking will be confirmed before these checks.',
        ],
      },
      {
        heading: 'Booking payment and security deposit',
        paragraphs: [
          `After availability and terms are confirmed, ${rentalPolicy.arrhesPercent}% of the agreed total is requested as arrhes, a booking payment under French law. It is deducted from the rental price and differs from an acompte and from the security deposit. The exact amount, payment method and balance due date are supplied before agreement.`,
          `The ${v.name} security deposit is EUR ${v.deposit}, paid by bank transfer. It is separate from the rental price and from the insurance excess. Return is scheduled for the day of vehicle return, after inspection and subject to justified amounts due under the agreed terms. Bank processing may delay receipt.`,
          'The website collects no payments. Cash payments connected with car rental are prohibited subject to the statutory exceptions in article L.112-6 of the French Monetary and Financial Code, including people without a deposit account or unable to use another payment method. The exception must be checked before accepting cash.',
        ],
      },
      {
        heading: 'Handover and return',
        paragraphs: [
          'Pick-up is offered in Île-de-France at an agreed location. Delivery within France is available on request and agreed terms. The registered office is not a guaranteed pick-up point.',
          'A joint vehicle inspection must be recorded at departure and return, including mileage, fuel and damage. Keep copies of the documents.',
        ],
      },
      {
        heading: 'Information still to be supplied',
        paragraphs: [
          'Before a contract, the company must finalise required documents and additional driver terms; insurance, exclusions and excesses; the price or calculation method for additional mileage, delivery, fuel, cleaning and lateness; permitted uses and territories; procedures for breakdown, accident or theft; the balance due date, commercial refund timing and deposit deductions. No unconfirmed fee or excess is presumed.',
        ],
      },
      {
        heading: 'Cancellation and withdrawal',
        paragraphs: [
          `Give notice at least ${rentalPolicy.cancellationNoticeDays} days before the agreed pick-up date and time for a full refund of arrhes. With less notice, arrhes are retained; cancellation alone does not make the balance payable. If the company withdraws from its commitment, arrhes are returned at double their amount, subject to statutory rules for particular situations.`,
          'There is no statutory 14-day withdrawal right for car rental on specified dates under article L.221-28, 12° of the French Consumer Code. Contractual cancellation terms are separate from this exception.',
        ],
        link: {
          href: '/annulation-remboursement',
          label: 'Cancellation and refunds',
        },
      },
      {
        heading: 'Complaints and mediation',
        paragraphs: [
          `First submit your written complaint to ${contact} Include rental dates and reference. After an unresolved prior complaint, a consumer can refer the matter free of charge to a competent mediator.`,
          'The contracted mediator and contact details still need to be supplied before publication. Access to competent courts is preserved.',
        ],
      },
    ],
  },
  'annulation-remboursement': {
    title: 'Cancellation and refunds',
    intro: 'Your options after making a request or agreeing to a rental.',
    sections: [
      {
        heading: 'Availability requests',
        paragraphs: [
          'The configurator does not conclude a contract or collect money. You can stop filling it out or tell us you do not wish to proceed. A simple availability request has no cancellation fee.',
        ],
      },
      {
        heading: 'Arrhes at booking',
        paragraphs: [
          `After confirmation and communication of the terms, ${rentalPolicy.arrhesPercent}% of the agreed total is requested as arrhes. This booking payment under French law is deducted from the rental price, is separate from the security deposit and is not an acompte. The exact amount, payment arrangements and balance due date are given before you agree. The website collects nothing.`,
        ],
      },
      {
        heading: 'Cancelling a booking',
        paragraphs: [
          `Arrhes are fully refunded if you notify us at least ${rentalPolicy.cancellationNoticeDays} days before the agreed departure date and time. With less notice, they are retained and the remaining rental balance is not due merely because you cancel. Send written notice and keep a copy. This commercial rule does not limit statutory rights.`,
        ],
      },
      {
        heading: 'Cancellation by the company',
        paragraphs: [
          'If the company withdraws from the agreed rental, arrhes are repaid at double their amount under article L.214-1 of the French Consumer Code. Special statutory situations, including force majeure, are assessed under applicable rules.',
        ],
      },
      {
        heading: 'Refund process',
        paragraphs: [
          'Our written response states the amount and refund arrangements within applicable legal deadlines. A refund is not replaced by credit without your agreement. The execution time for commercial refunds of arrhes still needs to be specified before publication. Instant bank processing is not guaranteed.',
        ],
      },
      {
        heading: 'No 14-day statutory withdrawal period',
        paragraphs: [
          'Article L.221-28, 12° excludes car rental on specified dates from the 14-day withdrawal right. A withdrawal form or waiver checkbox is not required for these rentals. Other rights remain, including where the agreed service is not provided.',
        ],
      },
      {
        heading: 'Submitting a request',
        paragraphs: [
          `Write to ${contact} State your rental dates, booking reference if available and request. Keep the message. Opening an email link only prepares a message; you must send it to notify us. We confirm receipt and explain applicable amounts. Do not send full bank card numbers or identity documents in the first message.`,
        ],
        link: {
          href: `mailto:${company.email}?subject=Cancellation%20or%20refund%20request`,
          label: 'Email a cancellation or refund request',
        },
      },
      {
        heading: 'Security deposit and disputes',
        paragraphs: [
          'The security deposit is separate from the rental price. Return is scheduled for the day of vehicle return following inspection, subject to justified deductions under agreed terms; bank processing may add time.',
          'Send a written complaint if you disagree. Consumer mediator details still need to be completed before publication.',
        ],
        link: {
          href: '/conditions-location',
          label: 'Rental terms and complaints',
        },
      },
    ],
  },
  'politique-confidentialite': {
    title: 'Privacy policy',
    intro: 'We ask only for information needed to answer your rental request.',
    sections: [
      {
        heading: 'Data controller',
        paragraphs: [
          `${company.legal.name}, SASU, ${company.legal.rcs}, ${company.legal.address}, is responsible for the data used for your requests and relationship with the company. Contact: ${company.email}.`,
        ],
      },
      {
        heading: 'Browsing and optional analytics',
        paragraphs: [
          'You can view vehicles and prices without an account. There is no targeted advertising, advertising pixel, cross-site tracking or session recording. Social links do not load embedded social widgets.',
          'Vercel receives technical data needed to deliver and protect the website, including IP address, requested URL, request time and browser information. This is based on legitimate interests in operation and security (GDPR article 6(1)(f)).',
          'With your consent (GDPR article 6(1)(a)), Vercel Web Analytics measures page views, approximate geographic area and device/browser information. Vercel uses a temporary derived identifier rather than an analytics cookie. The script is not loaded until you accept. The configurator’s contents are never sent as analytics events. Query strings and fragments are removed from measured page URLs. Consent can be refused or withdrawn through Analytics preferences in the footer. Choice is stored for 180 days.',
        ],
      },
      {
        heading: 'Your request',
        paragraphs: [
          'The configurator uses vehicle, dates, times and options, plus delivery city if selected. First name, estimated extra mileage and comments are optional. No identity document, licence copy or bank detail is collected here.',
          'Entries stay in page memory and are not stored in a database, cookie or local storage. Closing or reloading can erase them. Opening WhatsApp transmits the prepared text in the link to that external service and may put it in browser history. We receive the message when you send it, with contact and profile information visible through WhatsApp. You can edit it before sending. Requests use WhatsApp only.',
          'General, administrative or privacy questions sent by email disclose your email address and message. Do not include sensitive documents unnecessarily. Basic anti-spam checks operate in the page and do not send entries to a verification service.',
        ],
      },
      {
        heading: 'Purposes and legal bases',
        paragraphs: [
          'Answering requests and quoting: pre-contractual steps at your request, article 6(1)(b). Managing an agreed rental: contract performance. Statutory invoices and records: legal obligation, article 6(1)(c). Handling complaints and retaining evidence within applicable periods: legitimate interests. Optional audience statistics: your consent.',
          'Rental requests do not subscribe you to a newsletter or authorise advertising. The configurator does not perform automated decisions or profiling and does not require blanket consent to answer your request.',
        ],
      },
      {
        heading: 'Recipients and international transfers',
        paragraphs: [
          'Authorised company staff access information needed for their work. Vercel Inc. hosts and distributes the site and provides optional analytics; WhatsApp Ireland Limited provides messaging; Microsoft provides Outlook email. For concluded rentals, necessary data may also be processed by relevant payment, accounting or insurance providers and competent authorities, with information supplied at collection. We do not sell request data.',
          'These providers may process information outside the EEA. Their published terms describe destinations and safeguards. Ask us for details on safeguards applying to your data.',
        ],
        link: {
          href: 'https://vercel.com/legal/dpa',
          label: 'Vercel data processing agreement',
        },
      },
      {
        heading: 'Retention and preferences',
        paragraphs: [
          'Unsent entries remain in your open browser page only. Request exchanges are used while the request is handled; after closure, only information needed for legal obligations or disputes should be retained with restricted access. Accounting records are kept for 10 years after the relevant accounting year closes; this does not automatically apply to conversations or identity copies.',
          'Routine rental follow-up data is deleted no later than one year after the rental ends, except information needed for legal obligations or disputes, archived separately with restricted access. This does not justify retaining unnecessary identity or licence copies. Commercial contracts and contractual correspondence follow applicable statutory periods, notably five years; consumer contracts concluded electronically for at least EUR 120 are retained for ten years. The company must organise deletion across messaging, devices and backups. Hosting and analytics retention and the period for enquiries that do not lead to a rental still need to be documented, along with contractual safeguards. Theme preference is stored when chosen; analytics choice expires after 180 days. Language uses the URL without a preference cookie.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          `Under GDPR conditions, you can request access, correction, deletion, restriction and eligible portability, and object to legitimate-interest processing for reasons related to your circumstances. Write to ${contact} Specify your request. Proportionate identity verification may be needed if reasonably in doubt; do not send an identity document unsolicited.`,
          'Responses are normally provided within one month. Complex or numerous requests may allow a two-month extension, communicated in the first month. You may complain to the CNIL.',
        ],
        link: {
          href: 'https://www.cnil.fr/fr/plaintes',
          label: 'Contact the CNIL',
        },
      },
      {
        heading: 'External privacy policies and cookies',
        paragraphs: [
          'WhatsApp and Microsoft publish their own messaging privacy policies. Our cookie policy explains optional analytics consent and essential preferences.',
        ],
        link: { href: '/politique-cookies', label: 'Cookie policy' },
      },
    ],
  },
  'politique-cookies': {
    title: 'Cookie policy',
    intro:
      'Browse our offers freely and choose whether to allow optional audience measurement.',
    sections: [
      {
        heading: 'Cookies and similar technologies',
        paragraphs: [
          'A cookie stores information on your device. Local storage, pixels and other techniques can also store information or measure browsing. Consent rules can apply even without a cookie.',
        ],
      },
      {
        heading: 'Essential preferences and the configurator',
        paragraphs: [
          'The configurator keeps entries temporarily in page memory, with no database, cookie or local storage for rental details. A theme preference is stored in local storage only when you choose it. Your analytics choice is stored in local storage for 180 days, then requested again. Language uses the page URL. These preference records do not contain rental information.',
          'Images and presentation resources are served by this website. Social services are plain external links. No customer account or shopping cart is created. Hosting may process technical data to distribute, cache and protect the site; it is not used for advertising.',
        ],
      },
      {
        heading: 'Optional Vercel Web Analytics',
        paragraphs: [
          'Audience measurement stays disabled until you accept. It measures page views, approximate geographic area and browser/device information. It uses a derived temporary identifier rather than an analytics cookie. It is not claimed to be exempt from consent. No custom event records your configurator entries, and query strings and fragments are removed from measured page URLs.',
          'The script operates on the production Vercel site after the project’s Web Analytics service is enabled. Local development does not send analytics. Vercel’s own documentation describes processing and provider retention.',
        ],
        link: {
          href: 'https://vercel.com/docs/analytics/privacy-policy',
          label: 'Vercel Analytics privacy information',
        },
      },
      {
        heading: 'Your choice',
        paragraphs: [
          'You can accept or refuse with equally visible controls and continue browsing either way. Use Analytics preferences in the footer at any time to change or withdraw your choice. Withdrawal stops future audience measurement; the page reloads to unload the script. Browser storage can also be removed in your browser settings.',
          'Necessary preferences do not require optional analytics consent. The analytics script does not load simply because you use the configurator or accept the rental terms.',
        ],
      },
      {
        heading: 'External links and contact',
        paragraphs: [
          'WhatsApp, Instagram, Snapchat and TikTok may apply their own rules when you open their services. The configurator sends its prepared summary to WhatsApp when the link opens, but does not send a message to the company until you confirm sending in WhatsApp.',
          `For privacy or cookie questions, contact ${company.email}.`,
        ],
        link: { href: '/politique-confidentialite', label: 'Privacy policy' },
      },
    ],
  },
}
