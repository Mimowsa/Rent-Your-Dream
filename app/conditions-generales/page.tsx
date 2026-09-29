import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage } from '@/components/LegalPage'
import { company } from '@/lib/company'

export const metadata: Metadata = {
  title: 'Conditions générales d’utilisation',
  description:
    'Conditions d’accès et d’utilisation du site Rent Your Dream et fonctionnement des demandes de location.',
  alternates: {
    canonical: '/conditions-generales',
    languages: {
      'fr-FR': '/conditions-generales',
      'en-GB': '/en/conditions-generales',
      'x-default': '/conditions-generales',
    },
  },
}

export default function ConditionsUtilisationPage() {
  return (
    <LegalPage
      title="Conditions d’utilisation"
      intro="Ce site vous permet de découvrir nos véhicules et de préparer une demande de location."
    >
      <h2>Accès au site</h2>
      <p>
        Le site est édité par {company.legal.name}, dont les coordonnées
        figurent dans les <Link href="/mentions-legales">mentions légales</Link>
        . Sa consultation est gratuite, hors frais d’accès à Internet de votre
        opérateur. Aucun compte n’est nécessaire.
      </p>

      <h2>Préparer une demande</h2>
      <p>
        Le configurateur prépare un récapitulatif à transmettre par le moyen de
        contact proposé. Ouvrir ou envoyer ce message ne réserve pas le véhicule
        et ne crée aucune obligation de paiement. La disponibilité, le prix
        total et les conditions sont précisés avant votre engagement.
      </p>
      <p>
        La location relève des{' '}
        <Link href="/conditions-location">conditions de location</Link> et des
        documents contractuels qui vous sont communiqués avant votre accord. Une
        estimation ou une demande de disponibilité ne vaut pas confirmation.
      </p>

      <h2>Utilisation des informations</h2>
      <p>
        Fournissez uniquement les informations utiles à votre demande et
        assurez-vous de leur exactitude. N’inscrivez pas de numéro de carte
        bancaire, de copie de pièce d’identité ou de permis dans le champ de
        commentaire du configurateur.
      </p>
      <p>
        Les contenus publics peuvent être consultés avec un navigateur, un
        lecteur d’écran ou un outil automatisé, dans le respect de la loi et des
        droits sur les contenus. Il est interdit de perturber le service, de
        contourner ses protections ou de tenter d’accéder à des données non
        publiques.
      </p>

      <h2>Liens vers d’autres services</h2>
      <p>
        Les liens vers WhatsApp, Instagram, Snapchat ou TikTok ouvrent des
        services indépendants. Leurs propres conditions et politiques de
        confidentialité s’appliquent. Vous pouvez également contacter la société
        par <a href={`mailto:${company.email}`}>e-mail</a> ou par téléphone.
      </p>

      <h2>Disponibilité et responsabilité</h2>
      <p>
        Le site peut être interrompu pour maintenance ou en raison d’un incident
        technique. Si un prix, un équipement ou une disponibilité nécessite une
        correction, l’information exacte doit vous être communiquée avant tout
        accord. Les présentes conditions ne limitent pas les droits impératifs
        du consommateur ni les responsabilités prévues par la loi.
      </p>

      <h2>Accessibilité et assistance</h2>
      <p>
        Si vous rencontrez une difficulté pour lire une page ou utiliser le
        configurateur, contactez-nous à{' '}
        <a href={`mailto:${company.email}`}>{company.email}</a>. Indiquez la
        page concernée et la difficulté rencontrée, sans communiquer de données
        sensibles.
      </p>

      <h2>Droit applicable et évolutions</h2>
      <p>
        Le site relève du droit français, sous réserve des règles impératives
        qui vous protègent. Les modifications de ces conditions valent pour les
        utilisations futures du site et ne modifient pas rétroactivement un
        contrat déjà conclu. Les règles légales de compétence des tribunaux
        restent applicables.
      </p>
    </LegalPage>
  )
}
