import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { StickyCta } from '@/components/sticky-cta'
import { VehicleCarousel } from '@/components/vehicle-carousel'
import { ArrowRight, Check } from '@/components/icons'
import { company } from '@/lib/company'
import { euros, getVehicle, vehicles } from '@/lib/vehicles'
import { pageMetadata, absoluteUrl, jsonLd } from '@/lib/seo'

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const v = getVehicle(slug)
  if (!v) return { title: 'Véhicule introuvable' }
  return pageMetadata({
    title: `Location ${v.name} à Paris`,
    description: `${v.description} Dès ${v.pricing.day} € TTC / 24 h, ${v.includedKmPerDay} km/jour inclus.`,
    path: `/vehicules/${v.slug}`,
    image: v.photos[0].src,
    imageAlt: v.photos[0].alt,
  })
}

export default async function VehicleDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const v = getVehicle(slug)
  if (!v) notFound()

  const vehicleUrl = absoluteUrl(`/vehicules/${v.slug}`)
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${vehicleUrl}#location`,
        name: `Location ${v.name}`,
        description: v.description,
        serviceType: 'Location de voiture sans chauffeur',
        provider: { '@id': absoluteUrl('/#organisation') },
        areaServed: company.area,
        url: vehicleUrl,
        image: v.photos.map((photo) => absoluteUrl(photo.src)),
        offers: [
          ['24 heures', v.pricing.day],
          [`Week-end ${v.pricing.weekendHours} heures`, v.pricing.weekend],
          ['7 jours', v.pricing.week],
        ].map(([duration, price]) => ({
          '@type': 'Offer',
          name: `Location ${duration}`,
          url: vehicleUrl,
          businessFunction: 'http://purl.org/goodrelations/v1#LeaseOut',
          priceCurrency: 'EUR',
          price,
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price,
            priceCurrency: 'EUR',
            unitText: duration,
            valueAddedTaxIncluded: true,
          },
          seller: { '@id': absoluteUrl('/#organisation') },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: absoluteUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Véhicules',
            item: absoluteUrl('/vehicules'),
          },
          { '@type': 'ListItem', position: 3, name: v.name, item: vehicleUrl },
        ],
      },
    ],
  }

  return (
    <div className="detail wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />

      <Link href="/vehicules" className="back">
        ← Retour
      </Link>

      <div className="detail-top">
        <span className="veh__cat">{v.category}</span>
        <h1>{v.name}</h1>
        <div className="chips">
          {v.features.map((f) => (
            <span key={f}>{f}</span>
          ))}
          <span>{v.includedKmPerDay} km / jour</span>
        </div>
      </div>

      <div className="detail-grid">
        <VehicleCarousel photos={v.photos} name={v.name} />

        <div className="panel">
          <div className="prices">
            <div>
              <b>{euros(v.pricing.day)}</b>
              <span>24 heures</span>
            </div>
            <div>
              <b>{euros(v.pricing.weekend)}</b>
              <span>week-end ({v.pricing.weekendHours} h)</span>
            </div>
            <div>
              <b>{euros(v.pricing.week)}</b>
              <span>7 jours</span>
            </div>
          </div>

          <p className="dim">Prix TTC · Assurance comprise</p>
          <ul className="facts">
            <li>
              <Check /> Dès {v.minimumAge} ans et {v.minimumLicenseYears} an de
              permis
            </li>
            <li>
              <Check /> {v.includedKmPerDay} km / jour inclus
            </li>
            <li>
              <Check /> Kilomètres supplémentaires possibles — nous consulter
            </li>
            <li>
              <Check /> Caution {euros(v.deposit)} ·{' '}
              {v.depositMeans.toLowerCase()}
            </li>
            <li>
              <Check /> Retrait en {company.area} · livraison possible
            </li>
          </ul>

          <a
            href={`/reservation?vehicle=${v.slug}`}
            className="btn btn--primary btn--block"
          >
            Réserver ce véhicule
            <ArrowRight width={16} height={16} />
          </a>
          <p className="dim" style={{ fontSize: '0.82rem', marginTop: '-4px' }}>
            Le configurateur s’ouvre avec la {v.model} déjà sélectionnée. Aucun
            paiement sur le site.
          </p>
        </div>
      </div>

      <section className="detail-description">
        <h2>{v.tagline}</h2>
        <p>{v.description}</p>
        <p>
          La couverture d’assurance applicable à la location doit être vérifiée
          avant toute confirmation. Les garanties, exclusions et franchises vous
          sont communiquées avant votre accord. La caution est restituée le jour
          du retour après l’état des lieux, sous réserve des sommes dues et
          justifiées ; le délai bancaire peut varier.
        </p>
        <Link href="/conditions-location" className="tlink">
          Consulter les conditions de location <ArrowRight />
        </Link>
      </section>

      <StickyCta
        priceFrom={v.pricing.day}
        href={`/reservation?vehicle=${v.slug}`}
      />
    </div>
  )
}
