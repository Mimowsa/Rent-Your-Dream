import type { Metadata } from 'next'
import { company } from '@/lib/company'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Comment Rent Your Dream traite les données personnelles.',
  robots: { index: false, follow: true },
}

export default function ConfidentialitePage() {
  return (
    <article className="wrap prose">
      <span className="kicker">Informations</span>
      <h1>Politique de confidentialité</h1>

      <div className="notice">
        Contenu provisoire. La version définitive (base légale, durées de
        conservation, sous-traitants, coordonnées du responsable de traitement)
        sera complétée avant la mise en ligne publique.
      </div>

      <h2>Données collectées par le site</h2>
      <p>
        Le site ne crée aucun compte et ne stocke aucune donnée sur ses serveurs.
        Le configurateur de réservation fonctionne entièrement dans votre
        navigateur : les informations que vous saisissez (dates, prénom, nom,
        précisions) servent uniquement à composer un message que <em>vous</em>{' '}
        choisissez d’envoyer, par WhatsApp ou par e-mail.
      </p>

      <h2>Données transmises lors d’une demande</h2>
      <p>
        Lorsque vous nous envoyez votre demande, nous recevons les informations
        contenues dans votre message ainsi que votre identifiant de contact
        (numéro WhatsApp ou adresse e-mail). Elles sont utilisées pour répondre à
        votre demande de location et pour la gestion de la relation qui en
        découle.
      </p>

      <h2>Destinataires</h2>
      <p>
        Ces informations sont destinées à {company.name} uniquement et ne sont ni
        vendues ni transmises à des tiers à des fins commerciales.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d’un droit d’accès, de rectification et de suppression de
        vos données. Pour l’exercer, écrivez à{' '}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>

      <h2>Cookies</h2>
      <p>
        Le site n’utilise pas de cookies publicitaires ni de traceurs tiers.
      </p>
    </article>
  )
}
