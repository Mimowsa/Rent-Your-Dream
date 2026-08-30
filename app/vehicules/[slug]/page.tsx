import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { StickyCta } from '@/components/sticky-cta'
import { VehicleCarousel } from '@/components/vehicle-carousel'
import { ArrowRight, Check } from '@/components/icons'
import { company } from '@/lib/company'
import { euros, getVehicle, vehicles } from '@/lib/vehicles'

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
  return {
    title: v.name,
    description: v.description,
    alternates: { canonical: `/vehicules/${v.slug}` },
    openGraph: { title: `${v.name} · ${company.name}`, description: v.description, images: [v.photos[0].src] },
  }
}

export default async function VehicleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const v = getVehicle(slug)
  if (!v) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: v.name,
    brand: { '@type': 'Brand', name: v.brand },
    model: v.model,
    vehicleTransmission: v.transmission,
    fuelType: v.fuel,
    image: v.photos.map((p) => p.src),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: v.pricing.day,
      availability: 'https://schema.org/LimitedAvailability',
      seller: { '@type': 'Organization', name: company.name },
    },
  }

  return (
    <div className="detail wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/#vehicules" className="back">
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
              <span>week-end (ven → dim)</span>
            </div>
            <div>
              <b>{euros(v.pricing.week)}</b>
              <span>7 jours</span>
            </div>
          </div>

          <ul className="facts">
            <li>
              <Check /> {v.includedKmPerDay} km / jour inclus
            </li>
            <li>
              <Check /> Illimité : +{euros(v.pricing.unlimitedKmSupplement)} / location
            </li>
            <li>
              <Check /> Caution {euros(v.deposit)} · {v.depositMeans.toLowerCase()}
            </li>
            <li>
              <Check /> Retrait en {company.area} · livraison possible
            </li>
          </ul>

          <a href={`/?v=${v.slug}#reserver`} className="btn btn--primary btn--block">
            Réserver ce véhicule
            <ArrowRight width={16} height={16} />
          </a>
          <p className="dim" style={{ fontSize: '0.82rem', marginTop: '-4px' }}>
            Le configurateur s’ouvre avec la {v.model} déjà sélectionnée. Aucun
            paiement sur le site.
          </p>
        </div>
      </div>

      <StickyCta priceFrom={v.pricing.day} href={`/?v=${v.slug}#reserver`} />
    </div>
  )
}
