'use client'

import { useI18n } from '@/components/locale-provider'

import Image from 'next/image'
import Link from '@/components/localized-link'
import { ArrowRight } from '@/components/icons'
import { euros, vehicles } from '@/lib/vehicles'

function ComingVehicle() {
  return (
    <Image
      className="coming-vehicle-photo"
      src="/vehicles/coming-soon-covered-cutout.webp"
      alt=""
      width={768}
      height={512}
      sizes="(max-width: 760px) 33vw, (max-width: 1100px) 50vw, 25vw"
    />
  )
}

/** The real catalogue grows into four slots; upcoming slots are never bookable. */
export function FleetShowcase() {
  const { t } = useI18n()

  const comingSoonCount = Math.max(0, 4 - vehicles.length)
  return (
    <div className="fleet-grid">
      {vehicles.map((vehicle) => (
        <article className="fleet-tile fleet-tile--vehicle" key={vehicle.slug}>
          <Link
            href={`/vehicules/${vehicle.slug}`}
            className="fleet-tile__photo"
            aria-label={t(`Découvrir la ${vehicle.name}`)}
          >
            <Image
              src={vehicle.photos[0].src}
              alt={t(vehicle.photos[0].alt)}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
            />
          </Link>
          <div className="fleet-tile__body">
            <div className="fleet-tile__summary">
              <div>
                <h3>{t(vehicle.name)}</h3>
                <p className="fleet-tile__specs">
                  {t(vehicle.transmission)} {t('· ')}
                  {t(vehicle.fuel)}
                </p>
              </div>
              <p className="fleet-tile__price">
                <strong>{euros(vehicle.pricing.day)}</strong>
                <span>{t('TTC / 24 h')}</span>
              </p>
            </div>
            <div className="fleet-tile__actions">
              {vehicle.available ? (
                <Link
                  href={`/reservation?vehicle=${vehicle.slug}`}
                  className="btn btn--primary"
                  aria-label={t(`Choisir la ${vehicle.name}`)}
                >
                  {t('Choisir ')}
                  <ArrowRight />
                </Link>
              ) : (
                <span className="fleet-tile__availability">
                  {t('Indisponible')}
                </span>
              )}
              <Link
                href={`/vehicules/${vehicle.slug}`}
                className="tlink"
                aria-label={t(`Photos et détails de la ${vehicle.name}`)}
              >
                {t('Détails ')}
                <ArrowRight />
              </Link>
            </div>
          </div>
        </article>
      ))}
      {Array.from({ length: comingSoonCount }, (_, index) => (
        <article
          className="fleet-tile fleet-tile--coming"
          key={`coming-${index}`}
          aria-label={t(`Futur véhicule ${index + 1}`)}
        >
          <span className="fleet-tile__soon">{t('À venir')}</span>
          <div className="fleet-tile__placeholder">
            <ComingVehicle />
            <h3>{t('De nouveaux véhicules arrivent')}</h3>
          </div>
        </article>
      ))}
    </div>
  )
}
