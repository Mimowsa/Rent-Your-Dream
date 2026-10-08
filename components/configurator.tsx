'use client'

import { useI18n } from '@/components/locale-provider'

import { useEffect, useId, useRef, useState, type MouseEvent } from 'react'
import Image from 'next/image'
import Link from '@/components/localized-link'
import { euros, primaryVehicle, vehicles } from '@/lib/vehicles'
import { company } from '@/lib/company'
import {
  buildWhatsappMessage,
  bookingWhatsappLink,
  bookingIntentLink,
  type BookingSelection,
} from '@/lib/whatsapp'
import { ArrowRight, Check, WhatsApp } from '@/components/icons'

type Field =
  | 'vehicle'
  | 'start'
  | 'start-time'
  | 'end'
  | 'end-time'
  | 'city'
  | 'km'
  | 'spam'
type BookingError = { field: Field; message: string }

function localToday() {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function localDateTime(date: string, time: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time))
    return NaN
  const [year, month, day] = date.split('-').map(Number)
  const [hours, minutes] = time.split(':').map(Number)
  const value = new Date(year, month - 1, day, hours, minutes)
  // Reject impossible dates and times rather than letting Date roll them forward.
  if (
    value.getFullYear() !== year ||
    value.getMonth() !== month - 1 ||
    value.getDate() !== day ||
    value.getHours() !== hours ||
    value.getMinutes() !== minutes
  )
    return NaN
  return value.getTime()
}

function dateLabel(value: string, locale: 'fr' | 'en') {
  return value
    ? new Date(`${value}T12:00:00`).toLocaleDateString(
        locale === 'fr' ? 'fr-FR' : 'en-GB',
        {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        },
      )
    : 'À choisir'
}

export function ConfiguratorBand({
  initialSlug,
  preview = false,
  compact = false,
}: {
  initialSlug?: string
  preview?: boolean
  compact?: boolean
}) {
  const { t, locale } = useI18n()

  const uid = useId()
  const [slug, setSlug] = useState(initialSlug || primaryVehicle.slug)
  const [step, setStep] = useState(0)
  const [today, setToday] = useState('')
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('10:00')
  const [endDate, setEndDate] = useState('')
  const [endTime, setEndTime] = useState('10:00')
  const [extraKmWanted, setExtraKmWanted] = useState(false)
  const [extraKm, setExtraKm] = useState('')
  const [delivery, setDelivery] = useState(false)
  const [deliveryCity, setDeliveryCity] = useState('')
  const [firstName, setFirstName] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState<BookingError | null>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [website, setWebsite] = useState('')
  const lastOpen = useRef(0)

  useEffect(() => {
    setToday(localToday())
    const query = new URLSearchParams(window.location.search)
    const selected = initialSlug || query.get('v') || query.get('vehicle')
    if (selected && vehicles.some((vehicle) => vehicle.slug === selected))
      setSlug(selected)
  }, [initialSlug])

  const vehicle = vehicles.find((item) => item.slug === slug) ?? primaryVehicle
  const selection: BookingSelection = {
    firstName: firstName.trim(),
    vehicleName: vehicle.name,
    startDate,
    startTime,
    endDate,
    endTime,
    extraKmWanted,
    extraKm: extraKmWanted ? Number(extraKm) || 0 : 0,
    delivery,
    deliveryCity: delivery ? deliveryCity.trim() : '',
    note: note.trim(),
  }
  const message = buildWhatsappMessage(selection, vehicle, locale)
  const whatsappHref = bookingWhatsappLink(message)

  function validation(): BookingError | null {
    if (website.trim())
      return {
        field: 'spam',
        message:
          'La demande n’a pas pu être préparée. Réessayez dans quelques instants.',
      }
    if (!vehicle.available)
      return {
        field: 'vehicle',
        message:
          'Ce véhicule est temporairement indisponible. Contactez-nous pour connaître les prochaines disponibilités.',
      }
    if (!startDate)
      return { field: 'start', message: 'Choisissez votre date de départ.' }
    if (!startTime)
      return {
        field: 'start-time',
        message: 'Choisissez votre heure de départ.',
      }
    if (!endDate)
      return { field: 'end', message: 'Choisissez votre date de retour.' }
    if (!endTime)
      return {
        field: 'end-time',
        message: 'Choisissez votre heure de retour.',
      }
    const start = localDateTime(startDate, startTime)
    const end = localDateTime(endDate, endTime)
    if (!Number.isFinite(start))
      return {
        field: 'start',
        message: 'Vérifiez la date et l’heure de départ.',
      }
    if (!Number.isFinite(end))
      return {
        field: 'end',
        message: 'Vérifiez la date et l’heure de retour.',
      }
    if (start <= Date.now())
      return {
        field: 'start',
        message: 'Le départ doit être prévu dans le futur.',
      }
    if (end <= start)
      return {
        field: 'end',
        message: 'Le retour doit être prévu après le départ.',
      }
    if ((compact || step >= 1) && delivery && !deliveryCity.trim())
      return {
        field: 'city',
        message: 'Précisez la ville de livraison souhaitée.',
      }
    if (
      (compact || step >= 1) &&
      extraKmWanted &&
      extraKm &&
      (!Number.isSafeInteger(Number(extraKm)) ||
        Number(extraKm) < 1 ||
        Number(extraKm) > 100000)
    ) {
      return {
        field: 'km',
        message:
          'Indiquez un nombre entier de kilomètres entre 1 et 100 000, ou laissez ce champ vide.',
      }
    }
    return null
  }

  function showError(problem: BookingError) {
    setError(problem)
    if (problem.field !== 'spam')
      setStep(problem.field === 'city' || problem.field === 'km' ? 1 : 0)
    requestAnimationFrame(() => {
      const field = document.getElementById(`${uid}-${problem.field}`)
      ;(field || titleRef.current)?.focus()
    })
  }

  function fieldAccessibility(field: Field, hint?: string) {
    return {
      'aria-invalid': error?.field === field || undefined,
      'aria-describedby':
        [hint, error?.field === field ? `${uid}-error` : '']
          .filter(Boolean)
          .join(' ') || undefined,
    }
  }

  function changeStep(next: number) {
    setError(null)
    setStep(next)
    requestAnimationFrame(() =>
      titleRef.current?.focus({ preventScroll: true }),
    )
  }

  function validateContact(event: MouseEvent<HTMLAnchorElement>) {
    const problem = validation()
    if (problem) {
      event.preventDefault()
      showError(problem)
      return
    }
    if (Date.now() - lastOpen.current < 15000) {
      event.preventDefault()
      showError({
        field: 'spam',
        message:
          'La demande n’a pas pu être préparée. Réessayez dans quelques instants.',
      })
      return
    }
    lastOpen.current = Date.now()
  }

  if (compact) {
    return (
      <form
        className="compact-booking"
        noValidate
        aria-label={t('Préparer une demande de location')}
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="spam-trap" aria-hidden="true">
          <label htmlFor={`${uid}-website`}>Website</label>
          <input
            id={`${uid}-website`}
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <div className="compact-grid">
          <div className="compact-photo">
              <Image
                src={(vehicle.showcasePhoto ?? vehicle.photos[0]).src}
                alt={t((vehicle.showcasePhoto ?? vehicle.photos[0]).alt)}
                width={480}
                height={360}
                sizes="(max-width: 760px) 140px, 200px"
              />
          </div>
          <div className="compact-vehicle">
            <label htmlFor={`${uid}-vehicle`}>{t('Votre véhicule')}</label>
            <div className="compact-car">

              <div>
                <select
                  id={`${uid}-vehicle`}
                  value={slug}
                  {...fieldAccessibility('vehicle')}
                  onChange={(event) => {
                    setSlug(event.target.value)
                    setError(null)
                  }}
                >
                  {vehicles.map((item) => (
                    <option
                      key={item.slug}
                      value={item.slug}
                      disabled={!item.available}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
                <p>
                  {t(vehicle.transmission)} · {t(vehicle.fuel)}
                </p>
              </div>
            </div>
            <p className="compact-price">
              <strong>{euros(vehicle.pricing.day)}</strong> {t('TTC / 24 h')}
            </p>
            <Link href={`/vehicules/${vehicle.slug}`} className="tlink">
              {t('Photos et détails')} <ArrowRight />
            </Link>
          </div>
          <div className="compact-dates">
            {(
              [
                {
                  name: 'Départ',
                  dateField: 'start',
                  timeField: 'start-time',
                  date: startDate,
                  time: startTime,
                  setDate: setStartDate,
                  setTime: setStartTime,
                },
                {
                  name: 'Retour',
                  dateField: 'end',
                  timeField: 'end-time',
                  date: endDate,
                  time: endTime,
                  setDate: setEndDate,
                  setTime: setEndTime,
                },
              ] as const
            ).map((item) => (
              <fieldset key={item.dateField}>
                <legend>{t(item.name)}</legend>
                <div className="compact-date-row">
                  <label
                    className="sr-only"
                    htmlFor={`${uid}-${item.dateField}`}
                  >
                    {t(
                      item.name === 'Départ'
                        ? 'Date de départ'
                        : 'Date de retour',
                    )}
                  </label>
                  <input
                    id={`${uid}-${item.dateField}`}
                    type="date"
                    required
                    min={
                      item.dateField === 'start' ? today : startDate || today
                    }
                    value={item.date}
                    {...fieldAccessibility(item.dateField)}
                    onChange={(event) => {
                      item.setDate(event.target.value)
                      setError(null)
                    }}
                  />
                  <label
                    className="sr-only"
                    htmlFor={`${uid}-${item.timeField}`}
                  >
                    {t(
                      item.name === 'Départ'
                        ? 'Heure de départ'
                        : 'Heure de retour',
                    )}
                  </label>
                  <input
                    id={`${uid}-${item.timeField}`}
                    type="time"
                    required
                    value={item.time}
                    {...fieldAccessibility(item.timeField)}
                    onChange={(event) => {
                      item.setTime(event.target.value)
                      setError(null)
                    }}
                  />
                </div>
              </fieldset>
            ))}
          </div>
          <div className="compact-options">
            <fieldset>
              <legend>{t('Kilomètres supplémentaires')}</legend>
              <div className="compact-toggle">
                <button
                  type="button"
                  aria-pressed={!extraKmWanted}
                  onClick={() => {
                    setExtraKmWanted(false)
                    setError(null)
                  }}
                >
                  {t('Non')}
                </button>
                <button
                  type="button"
                  aria-pressed={extraKmWanted}
                  onClick={() => {
                    setExtraKmWanted(true)
                    setError(null)
                  }}
                >
                  {t('Oui')}
                </button>
              </div>
            </fieldset>
            {extraKmWanted && (
              <div className="compact-extra">
                <label htmlFor={`${uid}-km`}>
                  {t('Nombre de kilomètres supplémentaires (facultatif)')}
                </label>
                <input
                  id={`${uid}-km`}
                  type="number"
                  min={1}
                  max={100000}
                  step={1}
                  value={extraKm}
                  {...fieldAccessibility('km')}
                  onChange={(event) => {
                    setExtraKm(event.target.value)
                    setError(null)
                  }}
                />
              </div>
            )}
            <fieldset>
              <legend>{t('Récupération')}</legend>
              <div className="compact-toggle">
                <button
                  type="button"
                  aria-pressed={!delivery}
                  onClick={() => {
                    setDelivery(false)
                    setError(null)
                  }}
                >
                  {t('Retrait')}
                </button>
                <button
                  type="button"
                  aria-pressed={delivery}
                  onClick={() => {
                    setDelivery(true)
                    setError(null)
                  }}
                >
                  {t('Livraison')}
                </button>
              </div>
            </fieldset>
            {delivery && (
              <div className="compact-extra">
                <label htmlFor={`${uid}-city`}>
                  {t('Ville de livraison (obligatoire pour cette option)')}
                </label>
                <input
                  id={`${uid}-city`}
                  value={deliveryCity}
                  required
                  maxLength={100}
                  autoComplete="address-level2"
                  {...fieldAccessibility('city')}
                  onChange={(event) => {
                    setDeliveryCity(event.target.value)
                    setError(null)
                  }}
                />
              </div>
            )}
          </div>
          <div className="compact-action">
            <strong>{t('Une demande sans engagement.')}</strong>
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
                aria-describedby={`${uid}-privacy`}
                onClick={validateContact}
              >
                <WhatsApp />
                {t('Préparer sur WhatsApp')}
                <span className="sr-only"> {t('(nouvel onglet)')}</span>
              </a>
            ) : (
              <p>
                {t('Les demandes WhatsApp sont temporairement indisponibles.')}
              </p>
            )}
            <p>{t('Disponibilité et conditions confirmées par l’agence.')}</p>
          </div>
        </div>
        {error && (
          <p id={`${uid}-error`} className="booking-error" role="alert">
            {t(error.message)}
          </p>
        )}
        <p className="compact-privacy" id={`${uid}-privacy`}>
          {t('Aucun paiement en ligne · Envoi à confirmer dans WhatsApp')}
          <br />
          {t(
            'En ouvrant WhatsApp, vous transmettez ce récapitulatif à ce service externe de Meta dans un nouvel onglet. Vous confirmez ensuite l’envoi au loueur dans WhatsApp.',
          )}{' '}
          <Link href="/politique-confidentialite">
            {t('Utilisation de vos données')}
          </Link>
        </p>
        <noscript>
          {bookingIntentLink && (
            <a
              className="btn btn--outline"
              href={bookingIntentLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('Ouvrir WhatsApp')}
            </a>
          )}
        </noscript>
      </form>
    )
  }

  return (
    <div
      className={`booking-layout${preview && step === 0 ? ' booking-layout--preview' : ''}`}
    >
      <aside className="booking-summary" aria-label={t('Véhicule et tarifs')}>
        <div className="booking-car-photo">
          <Image
            src={vehicle.photos[0].src}
            alt={t(vehicle.photos[0].alt)}
            fill
            sizes="(max-width: 760px) 100vw, 330px"
          />
        </div>
        <div className="booking-summary-body">
          <span className="kicker">{t('Votre véhicule')}</span>
          {vehicles.length > 1 ? (
            <>
              <label htmlFor={`${uid}-vehicle`} className="sr-only">
                {t('Véhicule')}
              </label>
              <select
                id={`${uid}-vehicle`}
                value={slug}
                {...fieldAccessibility('vehicle')}
                onChange={(event) => {
                  setSlug(event.target.value)
                  changeStep(0)
                }}
              >
                {vehicles.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                    {!item.available ? ' · Indisponible' : ''}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <h3>{vehicle.name}</h3>
          )}
          <p>
            {t(vehicle.transmission)} {t('· ')}
            {t(vehicle.fuel)}
          </p>
          <dl className="booking-rates">
            <div>
              <dt>{t('24 heures')}</dt>
              <dd>{euros(vehicle.pricing.day)}</dd>
            </div>
            <div>
              <dt>
                {t('Week-end ')}
                <small>({vehicle.pricing.weekendHours} h)</small>
              </dt>
              <dd>{euros(vehicle.pricing.weekend)}</dd>
            </div>
            <div>
              <dt>{t('7 jours')}</dt>
              <dd>{euros(vehicle.pricing.week)}</dd>
            </div>
          </dl>
          <p className="field-hint">
            {t(
              'Prix TTC. Assurance comprise.',
            )}
          </p>
          <div className="booking-included">
            <Check />
            <span>
              {t(vehicle.includedKmPerDay)} {t('km / jour inclus')}
            </span>
          </div>
          <p className="booking-deposit">
            {t('Caution : ')}
            {euros(vehicle.deposit)}
            <br />
            {t(vehicle.depositMeans)}
          </p>
          <Link href={`/vehicules/${vehicle.slug}`} className="tlink">
            {t('Voir la fiche du véhicule ')}
            <ArrowRight />
          </Link>
        </div>
      </aside>
      <form
        className="booking-form"
        noValidate
        aria-label={t('Préparer une demande de location')}
        onSubmit={(event) => {
          event.preventDefault()
          const problem = validation()
          if (problem) {
            showError(problem)
            return
          }
          if (step < 2) changeStep(step + 1)
        }}
      >
        <div className="spam-trap" aria-hidden="true">
          <label htmlFor={`${uid}-website`}>{t('Website')}</label>
          <input
            id={`${uid}-website`}
            name="website"
            type="text"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            autoComplete="off"
            tabIndex={-1}
          />
        </div>
        <ol className="booking-steps" aria-label={t('Étapes de la demande')}>
          {['Vos dates', 'Vos options', 'Récapitulatif'].map((label, index) => (
            <li
              key={label}
              aria-current={step === index ? 'step' : undefined}
              data-complete={index < step}
            >
              <button
                type="button"
                disabled={index > step}
                onClick={() => changeStep(index)}
              >
                <span aria-hidden="true">
                  {t(index < step ? <Check /> : `0${index + 1}`)}
                </span>
                {t(label)}
              </button>
            </li>
          ))}
        </ol>
        <div className="booking-fields">
          <span className="kicker">
            {t('Étape 0')}
            {step + 1} {t('/ 03')}
          </span>
          <h3 ref={titleRef} tabIndex={-1}>
            {t(
              [
                'Quand souhaitez-vous partir ?',
                'Un trajet qui vous ressemble.',
                'Vérifiez votre demande.',
              ][step],
            )}
          </h3>
          <p className="booking-description">
            {t(
              [
                'Choisissez vos dates et horaires. Les champs de cette étape sont obligatoires.',
                'Toutes les options sont facultatives. Les éventuels suppléments seront précisés avant votre accord.',
                'Ouvrez WhatsApp pour demander la disponibilité et un devis.',
              ][step],
            )}
          </p>
          {step === 0 && (
            <div className="date-fields">
              <fieldset>
                <legend>{t('Départ')}</legend>
                <label htmlFor={`${uid}-start`}>{t('Date de départ')}</label>
                <input
                  id={`${uid}-start`}
                  type="date"
                  required
                  min={today}
                  value={startDate}
                  {...fieldAccessibility('start')}
                  onChange={(event) => {
                    setStartDate(event.target.value)
                    setError(null)
                  }}
                />
                <label htmlFor={`${uid}-start-time`}>
                  {t('Heure de départ')}
                </label>
                <input
                  id={`${uid}-start-time`}
                  type="time"
                  required
                  value={startTime}
                  {...fieldAccessibility('start-time')}
                  onChange={(event) => {
                    setStartTime(event.target.value)
                    setError(null)
                  }}
                />
              </fieldset>
              <fieldset>
                <legend>{t('Retour')}</legend>
                <label htmlFor={`${uid}-end`}>{t('Date de retour')}</label>
                <input
                  id={`${uid}-end`}
                  type="date"
                  required
                  min={startDate || today}
                  value={endDate}
                  {...fieldAccessibility('end')}
                  onChange={(event) => {
                    setEndDate(event.target.value)
                    setError(null)
                  }}
                />
                <label htmlFor={`${uid}-end-time`}>
                  {t('Heure de retour')}
                </label>
                <input
                  id={`${uid}-end-time`}
                  type="time"
                  required
                  value={endTime}
                  {...fieldAccessibility('end-time')}
                  onChange={(event) => {
                    setEndTime(event.target.value)
                    setError(null)
                  }}
                />
              </fieldset>
            </div>
          )}
          {step === 1 && (
            <div className="booking-options">
              <div className="booking-option">
                <label className="option-toggle">
                  <input
                    type="checkbox"
                    checked={delivery}
                    onChange={(event) => {
                      setDelivery(event.target.checked)
                      setError(null)
                    }}
                  />
                  <span>
                    <b>{t('Livraison du véhicule')}</b>
                    <small>
                      {t('En France, modalités et tarif sur demande.')}
                    </small>
                  </span>
                </label>
                {delivery && (
                  <>
                    <label htmlFor={`${uid}-city`}>
                      {t('Ville de livraison (obligatoire pour cette option)')}
                    </label>
                    <input
                      id={`${uid}-city`}
                      value={deliveryCity}
                      required
                      maxLength={100}
                      autoComplete="address-level2"
                      placeholder={t('Ex. Paris, Lyon…')}
                      {...fieldAccessibility('city')}
                      onChange={(event) => {
                        setDeliveryCity(event.target.value)
                        setError(null)
                      }}
                    />
                  </>
                )}
              </div>
              <div className="booking-option">
                <label className="option-toggle">
                  <input
                    type="checkbox"
                    checked={extraKmWanted}
                    onChange={(event) => {
                      setExtraKmWanted(event.target.checked)
                      setError(null)
                    }}
                  />
                  <span>
                    <b>{t('Kilomètres supplémentaires')}</b>
                    <small>
                      {t('Au-delà des ')}
                      {t(vehicle.includedKmPerDay)}{' '}
                      {t('km / jour inclus. Tarif sur demande.')}
                    </small>
                  </span>
                </label>
                {extraKmWanted && (
                  <>
                    <label htmlFor={`${uid}-km`}>
                      {t('Nombre de kilomètres supplémentaires (facultatif)')}
                    </label>
                    <input
                      id={`${uid}-km`}
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={100000}
                      step={1}
                      value={extraKm}
                      placeholder={t('Ex. 300')}
                      {...fieldAccessibility('km')}
                      onChange={(event) => {
                        setExtraKm(event.target.value)
                        setError(null)
                      }}
                    />
                  </>
                )}
              </div>
              <div className="optional-fields">
                <div>
                  <label htmlFor={`${uid}-name`}>
                    {t('Votre prénom (facultatif)')}
                  </label>
                  <input
                    id={`${uid}-name`}
                    value={firstName}
                    autoComplete="given-name"
                    maxLength={80}
                    placeholder={t('Votre prénom')}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor={`${uid}-note`}>
                    {t('Une précision ? (facultatif)')}
                  </label>
                  <textarea
                    id={`${uid}-note`}
                    value={note}
                    maxLength={1000}
                    aria-describedby={`${uid}-note-hint`}
                    placeholder={t('Une question, un besoin particulier…')}
                    onChange={(event) => setNote(event.target.value)}
                    rows={2}
                  />
                  <p className="field-hint" id={`${uid}-note-hint`}>
                    {t(
                      'N’indiquez ni document d’identité, ni données bancaires ou sensibles.',
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <>
              <dl className="booking-recap">
                <div>
                  <dt>{t('Véhicule')}</dt>
                  <dd>{t(vehicle.name)}</dd>
                </div>
                <div>
                  <dt>{t('Départ')}</dt>
                  <dd>
                    {dateLabel(startDate, locale)} {t('· ')}
                    {t(startTime)}
                  </dd>
                </div>
                <div>
                  <dt>{t('Retour')}</dt>
                  <dd>
                    {dateLabel(endDate, locale)} {t('· ')}
                    {t(endTime)}
                  </dd>
                </div>
                <div>
                  <dt>{t('Remise du véhicule')}</dt>
                  <dd>
                    {t(
                      delivery
                        ? `Livraison à ${deliveryCity.trim()}`
                        : `Retrait en ${company.area}`,
                    )}
                  </dd>
                </div>
                <div>
                  <dt>{t('Kilométrage')}</dt>
                  <dd>
                    {t(vehicle.includedKmPerDay)} {t('km / jour')}
                    {t(
                      extraKmWanted
                        ? ` + ${extraKm ? `${extraKm} km souhaités` : 'supplément à préciser'}`
                        : '',
                    )}
                  </dd>
                </div>
                {firstName.trim() && (
                  <div>
                    <dt>{t('Prénom')}</dt>
                    <dd>{firstName.trim()}</dd>
                  </div>
                )}
                {note.trim() && (
                  <div>
                    <dt>{t('Précision')}</dt>
                    <dd>{note.trim()}</dd>
                  </div>
                )}
              </dl>
              <p className="booking-confirmation">
                {t(
                  'Votre demande est sans engagement et ne vaut pas réservation. La disponibilité, le prix total, les suppléments et les conditions seront confirmés avant votre accord.',
                )}
              </p>
              <p className="booking-privacy">
                {t(
                  'En ouvrant WhatsApp, vous transmettez ce récapitulatif à ce service externe de Meta dans un nouvel onglet. Vous confirmez ensuite l’envoi au loueur dans WhatsApp.',
                )}
              </p>
            </>
          )}
          {error && (
            <p id={`${uid}-error`} className="booking-error" role="alert">
              {t(error.message)}
            </p>
          )}
        </div>
        <div className="booking-bottom">
          <div className="booking-buttons">
            {step > 0 && (
              <button
                className="btn btn--outline"
                type="button"
                onClick={() => changeStep(step - 1)}
              >
                {t('Retour')}
              </button>
            )}
            {step < 2 ? (
              <button type="submit" className="btn btn--primary">
                {t(
                  step === 0 ? 'Choisir mes options' : 'Voir le récapitulatif',
                )}
                <ArrowRight />
              </button>
            ) : whatsappHref ? (
              <a
                className="btn btn--primary"
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-describedby={`${uid}-contact-help`}
                onClick={validateContact}
              >
                <WhatsApp />
                {t('Ouvrir WhatsApp')}
                <span className="sr-only"> {t('(nouvel onglet)')}</span>
              </a>
            ) : (
              <p role="status">
                {t('Les demandes WhatsApp sont temporairement indisponibles.')}
              </p>
            )}
          </div>
          <p id={`${uid}-contact-help`}>
            {t('Aucun paiement en ligne · Envoi à confirmer dans WhatsApp')}
          </p>
          <p className="booking-privacy">
            {t(
              'Vos saisies restent dans cette page jusqu’à l’ouverture de votre conversation WhatsApp. Aucun formulaire n’est envoyé au serveur du site.',
            )}{' '}
            <Link href="/politique-confidentialite">
              {t('Utilisation de vos données')}
            </Link>
          </p>
          <noscript>
            <p>
              {t(
                'Le configurateur nécessite JavaScript. Vous pouvez demander un devis directement sur WhatsApp.',
              )}
            </p>
            {bookingIntentLink && (
              <a
                className="btn btn--primary"
                href={bookingIntentLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('Ouvrir WhatsApp')}{' '}
                <span className="sr-only"> {t('(nouvel onglet)')}</span>
              </a>
            )}
          </noscript>
        </div>
      </form>
    </div>
  )
}
