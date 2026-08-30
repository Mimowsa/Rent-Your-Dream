import type { Metadata } from 'next'
import { euros, primaryVehicle } from '@/lib/vehicles'
import { company } from '@/lib/company'

export const metadata: Metadata = {
  title: 'CGV / Conditions de location',
  description: 'Conditions générales de location Rent Your Dream.',
  robots: { index: false, follow: true },
}

const v = primaryVehicle

export default function ConditionsPage() {
  return (
    <article className="wrap prose">
      <span className="kicker">Location</span>
      <h1>CGV / Conditions de location</h1>

      <div className="notice">
        Document provisoire. Les conditions générales définitives (assurance,
        franchise, âge minimum, ancienneté de permis, état des lieux, retards,
        annulation, litiges) seront formalisées avant l’ouverture commerciale.
        Les éléments ci-dessous reprennent uniquement ce qui est déjà fixé.
      </div>

      <h2>Demande et confirmation</h2>
      <p>
        Une demande envoyée depuis le site ne constitue pas une réservation
        ferme. La disponibilité est confirmée par {company.name} en retour. La
        location devient effective après accord des deux parties.
      </p>

      <h2>Tarifs</h2>
      <ul>
        <li>{v.name} : {euros(v.pricing.day)} les 24 heures.</li>
        <li>Forfait week-end (vendredi → dimanche) : {euros(v.pricing.weekend)}.</li>
        <li>Forfait 7 jours : {euros(v.pricing.week)}.</li>
        <li>{v.includedKmPerDay} km par jour inclus.</li>
        <li>
          Option kilométrage illimité : {euros(v.pricing.unlimitedKmSupplement)} par
          location.
        </li>
      </ul>

      <h2>Caution</h2>
      <p>
        La caution est fixée à {euros(v.deposit)}. Elle peut être prise par
        virement ou en espèces et est restituée après restitution du véhicule
        dans son état initial.
      </p>

      <h2>Zone et livraison</h2>
      <p>
        Le retrait se fait en {company.area}. {company.deliveryNote} selon les
        modalités convenues lors de la demande.
      </p>

      <h2>Conditions restant à préciser</h2>
      <p>
        Assurance et franchise, pièces exigées, âge minimum et ancienneté de
        permis, carburant, nettoyage, kilomètres supplémentaires hors forfait,
        retards et conditions d’annulation : ces points seront détaillés dans la
        version définitive et communiqués avant toute location.
      </p>
    </article>
  )
}
