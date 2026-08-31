'use client'

import { useEffect, useId, useMemo, useState } from 'react'
import Image from 'next/image'
import { euros, primaryVehicle, vehicles } from '@/lib/vehicles'
import {
  buildWhatsappMessage,
  contactLink,
  whatsappReady,
  type BookingSelection,
} from '@/lib/whatsapp'
import { ArrowRight, Mail, WhatsApp } from '@/components/icons'

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

/**
 * Booking band — horizontal on desktop, stacked card on mobile.
 * Carries a live photo of the chosen vehicle and its key figures.
 * The full conversation (heures précises, nom…) se règle ensuite sur WhatsApp —
 * pas besoin d'un formulaire à rallonge ici.
 */
export function ConfiguratorBand() {
  const uid = useId()
  const min = todayIso()

  const [slug, setSlug] = useState(primaryVehicle.slug)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [extraKm, setExtraKm] = useState('')
  const [delivery, setDelivery] = useState(false)
  const [deliveryCity, setDeliveryCity] = useState('')

  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get('v')
    if (v && vehicles.some((x) => x.slug === v)) setSlug(v)
  }, [])

  const vehicle = vehicles.find((v) => v.slug === slug) ?? primaryVehicle
  const datesReady = Boolean(startDate && endDate)

  const selection: BookingSelection = {
    firstName: '',
    lastName: '',
    vehicleName: vehicle.name,
    startDate,
    startTime: '10:00',
    endDate,
    endTime: '10:00',
    extraKm: Math.max(0, Math.round(Number(extraKm) || 0)),
    delivery,
    deliveryCity,
    note: '',
  }

  const link = useMemo(
    () => contactLink(buildWhatsappMessage(selection, vehicle)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [slug, startDate, endDate, extraKm, delivery, deliveryCity],
  )

  return (
    <form
      id="reserver"
      className="cfg"
      onSubmit={(e) => e.preventDefault()}
      aria-label="Réserver un véhicule"
    >
      <div className="cfg__grid">
        <div className="cfg__photo">
          <Image
            src={vehicle.photos[0].src}
            alt={vehicle.photos[0].alt}
            fill
            sizes="(max-width: 62em) 100vw, 280px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="cfg__f">
          <label htmlFor={`${uid}-v`}>Véhicule</label>
          <select id={`${uid}-v`} value={slug} onChange={(e) => setSlug(e.target.value)}>
            {vehicles.map((v) => (
              <option key={v.slug} value={v.slug}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        <div className="cfg__f">
          <label htmlFor={`${uid}-s`}>Départ</label>
          <input
            id={`${uid}-s`}
            type="date"
            min={min}
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value)
              if (endDate && e.target.value > endDate) setEndDate(e.target.value)
            }}
          />
        </div>

        <div className="cfg__f">
          <label htmlFor={`${uid}-e`}>Retour</label>
          <input
            id={`${uid}-e`}
            type="date"
            min={startDate || min}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="cfg__f">
          <label htmlFor={`${uid}-km`}>Km supplémentaires ?</label>
          <input
            id={`${uid}-km`}
            type="number"
            min={0}
            step={50}
            inputMode="numeric"
            placeholder="0"
            value={extraKm}
            onChange={(e) => setExtraKm(e.target.value)}
          />
        </div>

        <div className="cfg__cta">
          <label className="cfg__check">
            <input
              type="checkbox"
              checked={delivery}
              onChange={(e) => setDelivery(e.target.checked)}
            />
            <span>On vous livre la voiture ?</span>
          </label>

          {delivery && (
            <div className="cfg__f cfg__f--slot">
              <label htmlFor={`${uid}-city`}>Ville de livraison</label>
              <input
                id={`${uid}-city`}
                type="text"
                autoComplete="address-level2"
                placeholder="Paris, Lyon…"
                value={deliveryCity}
                onChange={(e) => setDeliveryCity(e.target.value)}
              />
            </div>
          )}

          {!datesReady ? (
            <button type="button" className="btn btn--primary" disabled>
              Réserver
              <ArrowRight width={15} height={15} />
            </button>
          ) : whatsappReady ? (
            <a href={link.href} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              <WhatsApp width={16} height={16} />
              Réserver
            </a>
          ) : (
            <a href={link.href} className="btn btn--primary">
              <Mail width={15} height={15} />
              Envoyer la demande
            </a>
          )}
        </div>

        <div className="cfg__facts">
          <span>
            <b>{euros(vehicle.pricing.day)}</b> / 24h
          </span>
          <span>
            <b>{euros(vehicle.pricing.weekend)}</b> / week-end
          </span>
          <span>
            <b>{euros(vehicle.pricing.week)}</b> / semaine
          </span>
          <span>
            <b>{vehicle.includedKmPerDay} km</b> / jour inclus
          </span>
          <span>
            caution <b>{euros(vehicle.deposit)}</b>
          </span>
        </div>
      </div>
    </form>
  )
}
