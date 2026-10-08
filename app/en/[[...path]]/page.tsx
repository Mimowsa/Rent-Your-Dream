import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from '@/components/localized-link'
import HomeContent from '@/components/home-content'
import { ConfiguratorBand } from '@/components/configurator'
import { FleetShowcase } from '@/components/fleet-showcase'
import { FaqAccordion } from '@/components/faq-accordion'
import { LegalPage } from '@/components/LegalPage'
import { SocialBand } from '@/components/social-section'
import { VehicleCarousel } from '@/components/vehicle-carousel'
import { StickyCta } from '@/components/sticky-cta'
import { ArrowRight, Check, Mail, WhatsApp } from '@/components/icons'
import { legalEn } from '@/content/legal-en'
import { faqEn } from '@/content/faq-en'
import { faqJsonLd } from '@/lib/faq-seo'
import { pageMetadata, jsonLd, absoluteUrl } from '@/lib/seo'
import { company } from '@/lib/company'
import { getVehicle, euros } from '@/lib/vehicles'
import { translate } from '@/lib/i18n'
import { contactChatLink } from '@/lib/whatsapp'
import { siteRoutes } from '@/lib/routes'

type Props = {
  params: Promise<{ path?: string[] }>
  searchParams: Promise<{ vehicle?: string; v?: string }>
}
const descriptions: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Car rental in Paris and Île-de-France',
    description:
      'Explore the Rent Your Dream fleet. Car rental in Paris and Île-de-France, clear vehicle prices and non-binding WhatsApp requests.',
  },
  '/vehicules': {
    title: 'Our rental car fleet in Paris',
    description:
      'Discover our cars, equipment and prices. More vehicles are coming to the Rent Your Dream fleet.',
  },
  '/reservation': {
    title: 'Request a car rental',
    description:
      'Choose your dates and options for car rental in Île-de-France. Non-binding request on WhatsApp, with no online payment.',
  },
  '/faq': {
    title: 'Car rental frequently asked questions',
    description:
      'Prices, insurance, security deposits, documents and mileage: answers to prepare your Rent Your Dream car rental.',
  },
  '/contact': {
    title: 'Contact and rental requests',
    description:
      'Request a rental on WhatsApp. Contact Rent Your Dream by phone or email for general and administrative questions.',
  },
}

export function generateStaticParams() {
  return siteRoutes.map((path) => ({
    path: path === '/' ? [] : path.slice(1).split('/'),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path = [] } = await params
  const route = `/${path.join('/')}`
  if (!siteRoutes.includes(route)) notFound()
  const vehicle =
    path[0] === 'vehicules' && path.length === 2
      ? getVehicle(path[1])
      : undefined
  const legal = path.length === 1 ? legalEn[path[0]] : undefined
  const info =
    descriptions[route] ||
    (legal
      ? { title: legal.title, description: legal.intro }
      : vehicle
        ? {
            title: `Rent the ${vehicle.name} in Paris`,
            description: `${translate(vehicle.description, 'en')} EUR ${vehicle.pricing.day} including taxes / 24 h, ${vehicle.includedKmPerDay} km/day included.`,
          }
        : undefined)
  if (!info) notFound()
  return pageMetadata({
    ...info,
    path: route,
    locale: 'en',
    imageAlt: 'Rent Your Dream — car rental in Paris and Île-de-France',
  })
}

export default async function EnglishPage({ params, searchParams }: Props) {
  const { path = [] } = await params
  const route = `/${path.join('/')}`
  if (!siteRoutes.includes(route)) notFound()
  if (!path.length) return <HomeContent />
  if (route === '/vehicules')
    return (
      <>
        <Intro
          kicker="The Rent Your Dream fleet"
          title="Your next escape."
          description="Explore our vehicles, equipment and prices. New vehicles will be arriving soon."
        />
        <section className="wrap section catalog-section">
          <FleetShowcase />
        </section>
      </>
    )
  if (route === '/reservation') {
    const query = await searchParams
    const vehicle = getVehicle(query.vehicle || query.v || '')
    return (
      <div className="reservation-page">
        <Intro
          kicker="Your next getaway"
          title="Let’s get your trip ready."
          description="Your dates, your plans, a direct conversation. Prepare a summary, then contact us on WhatsApp to check availability."
        />
        <div className="wrap">
          <ConfiguratorBand initialSlug={vehicle?.slug} />
        </div>
      </div>
    )
  }
  if (route === '/faq')
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd(faqEn)) }}
        />
        <Intro
          kicker="Before you hit the road"
          title="Answers. Straight to the point."
          description="Useful information to prepare your rental with confidence."
        />
        <section className="wrap section catalog-section">
          <FaqAccordion />
        </section>
      </>
    )
  if (route === '/contact')
    return (
      <>
        <Intro
          kicker="Stay in touch"
          title="Let’s talk about your trip."
          description="A question or a plan to get away? Pick-up in Île-de-France; delivery available throughout France on request."
        />
        <section className="wrap contact-grid">
          <article className="contact-card">
            <WhatsApp />
            <h2>On WhatsApp</h2>
            <p>Rental requests and quick questions.</p>
            <a
              href={contactChatLink}
              target="_blank"
              rel="noopener noreferrer"
              className="tlink"
            >
              Message us <ArrowRight />
            </a>
          </article>
          <article className="contact-card">
            <ArrowRight />
            <h2>By phone</h2>
            <p>For general questions.</p>
            <a
              href={`tel:${company.phone?.replace(/\s/g, '')}`}
              className="tlink"
            >
              {company.phone}
            </a>
          </article>
          <article className="contact-card">
            <Mail />
            <h2>By email</h2>
            <p>For general and administrative enquiries.</p>
            <a href={`mailto:${company.email}`} className="tlink">
              {company.email}
            </a>
          </article>
        </section>
        <section className="wrap section">
          <SocialBand />
        </section>
      </>
    )
  const legal = path.length === 1 ? legalEn[path[0]] : undefined
  if (legal)
    return (
      <LegalPage title={legal.title} intro={legal.intro}>
        {legal.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.link && (
              <p>
                <Link href={section.link.href}>{section.link.label}</Link>
              </p>
            )}
          </section>
        ))}
      </LegalPage>
    )
  if (path[0] === 'vehicules' && path.length === 2) {
    const v = getVehicle(path[1])
    if (!v) notFound()
    const url = absoluteUrl(`/en/vehicules/${v.slug}`)
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Rent the ${v.name}`,
      description: translate(v.description, 'en'),
      serviceType: 'Self-drive car rental',
      url,
      provider: { '@id': absoluteUrl('/#organisation') },
      image: v.photos.map((photo) => absoluteUrl(photo.src)),
      offers: [
        ['24 hours', v.pricing.day],
        [`Weekend ${v.pricing.weekendHours} hours`, v.pricing.weekend],
        ['7 days', v.pricing.week],
      ].map(([duration, price]) => ({
        '@type': 'Offer',
        name: `Rental ${duration}`,
        url,
        priceCurrency: 'EUR',
        price,
        businessFunction: 'http://purl.org/goodrelations/v1#LeaseOut',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price,
          priceCurrency: 'EUR',
          valueAddedTaxIncluded: true,
          unitText: duration,
        },
      })),
    }
    return (
      <div className="detail wrap">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
        />
        <Link href="/vehicules" className="back">
          ← Back to the fleet
        </Link>
        <div className="detail-top">
          <span className="veh__cat">{translate(v.category, 'en')}</span>
          <h1>{v.name}</h1>
          <div className="chips">
            {v.features.map((feature) => (
              <span key={feature}>{translate(feature, 'en')}</span>
            ))}
            <span>{v.includedKmPerDay} km / day</span>
          </div>
        </div>
        <div className="detail-grid">
          <VehicleCarousel photos={v.photos} name={v.name} />
          <div className="panel">
            <div className="prices">
              <div>
                <b>{euros(v.pricing.day)}</b>
                <span>24 hours</span>
              </div>
              <div>
                <b>{euros(v.pricing.weekend)}</b>
                <span>Weekend ({v.pricing.weekendHours} hours)</span>
              </div>
              <div>
                <b>{euros(v.pricing.week)}</b>
                <span>7 days</span>
              </div>
            </div>
            <p className="dim">
              Prices include tax. Insurance included.
            </p>
            <ul className="facts">
              <li>
                <Check />
                Age {v.minimumAge}+; licence held for {v.minimumLicenseYears}+
                year
              </li>
              <li>
                <Check />
                {v.includedKmPerDay} km / day included
              </li>
              <li>
                <Check />
                Additional mileage available; ask for a quote
              </li>
              <li>
                <Check />
                Security deposit: {euros(v.deposit)} · bank transfer
              </li>
              <li>
                <Check />
                Pick-up in Île-de-France; delivery available
              </li>
            </ul>
            <Link
              href={`/reservation?vehicle=${v.slug}`}
              className="btn btn--primary btn--block"
            >
              Request this vehicle <ArrowRight />
            </Link>
            <p className="dim" style={{ fontSize: '.82rem' }}>
              The configurator opens with this vehicle selected. No online
              payment.
            </p>
          </div>
        </div>
        <section className="detail-description">
          <h2>{translate(v.tagline, 'en')}</h2>
          <p>{translate(v.description, 'en')}</p>
          <p>
            Insurance coverage for the rental must be verified before
            confirmation. Coverage, exclusions and excess amounts are
            communicated before you agree. The security deposit is returned on
            the day of return following inspection, subject to justified amounts
            due; bank processing times may vary.
          </p>
          <Link href="/conditions-location" className="tlink">
            Read the rental terms <ArrowRight />
          </Link>
        </section>
        <StickyCta
          priceFrom={v.pricing.day}
          href={`/en/reservation?vehicle=${v.slug}`}
        />
      </div>
    )
  }
  notFound()
}

function Intro({
  kicker,
  title,
  description,
}: {
  kicker: string
  title: string
  description: string
}) {
  return (
    <section className="wrap page-intro">
      <span className="kicker">{kicker}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  )
}
