import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage } from '@/components/LegalPage'
import { euros, primaryVehicle } from '@/lib/vehicles'
import { company } from '@/lib/company'
import { rentalPolicy } from '@/lib/rental-policy'

export const metadata: Metadata = {
  title: 'Conditions de location',
  description:
    'Tarifs, demande de disponibilité, dépôt de garantie et informations préalables à une location Rent Your Dream.',
  alternates: {
    canonical: '/conditions-location',
    languages: {
      'fr-FR': '/conditions-location',
      'en-GB': '/en/conditions-location',
      'x-default': '/conditions-location',
    },
  },
}

const v = primaryVehicle

export default function ConditionsLocationPage() {
  return (
    <LegalPage
      title="Conditions de location"
      intro="Les informations à connaître avant de vous engager pour une location."
    >
      <div className="notice">
        <p>
          <strong>Conditions contractuelles en cours de finalisation.</strong>{' '}
          Cette page reprend les informations établies. Les franchises
          d’assurance, le prix des kilomètres supplémentaires et certaines
          modalités de remboursement doivent être complétés avant l’ouverture
          commerciale. Le configurateur prépare uniquement une demande, sans
          réservation ni paiement.
        </p>
      </div>

      <h2>Votre interlocuteur</h2>
      <p>
        {company.legal.name}, {company.legal.form}, au capital de{' '}
        {euros(company.legal.capital)}, {company.legal.rcs}. Siège social :{' '}
        {company.legal.address}. Contact :{' '}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>

      <h2>Demande et accord</h2>
      <p>
        Vous choisissez un véhicule, vos dates et vos options. {company.name}{' '}
        vérifie la disponibilité puis vous communique les conditions applicables
        et le montant total. Votre simple demande ne vous engage pas.
      </p>
      <p>
        Avant votre accord, vous devez recevoir les informations sur le
        véhicule, les horaires et lieux de remise et de retour, le prix
        détaillé, les conditions de conduite, l’assurance et les éventuels
        frais. Une confirmation de disponibilité seule ne remplace pas ces
        informations.
      </p>

      <h2>Tarifs de la {v.name}</h2>
      <ul>
        <li>24 heures : {euros(v.pricing.day)} TTC.</li>
        <li>
          Week-end de {v.pricing.weekendHours} heures :{' '}
          {euros(v.pricing.weekend)} TTC. Horaires précis à convenir.
        </li>
        <li>7 jours : {euros(v.pricing.week)} TTC.</li>
        <li>Kilométrage inclus : {v.includedKmPerDay} km par jour.</li>
      </ul>
      <p>
        Les prix affichés sont les montants toutes taxes comprises payés par les
        particuliers. Le total et le détail de chaque prestation doivent figurer
        dans l’offre qui vous est remise avant votre engagement. Les demandes de
        livraison et de kilomètres supplémentaires font l’objet d’un chiffrage
        préalable ; elles ne sont pas ajoutées automatiquement.
      </p>

      <h2>Conducteur et assurance</h2>
      <p>
        Le conducteur doit avoir au moins {v.minimumAge} ans et être titulaire
        du permis de conduire depuis au moins {v.minimumLicenseYears} an. Le
        permis doit être valide et adapté au véhicule. Les justificatifs
        nécessaires sont précisés avant la confirmation de la location.
      </p>
      <p>
        La responsabilité civile doit être couverte pour toute location. La
        couverture applicable à la sous-location de la {v.name} reste à vérifier
        avec le fournisseur du véhicule et son assureur. Les conducteurs
        autorisés, garanties, exclusions, franchises et modalités d’assistance
        doivent être confirmés par écrit avant toute réservation. Aucun accord
        définitif ne sera donné avant ces vérifications.
      </p>

      <h2>Dépôt de garantie et paiement</h2>
      <p>
        Des arrhes de {rentalPolicy.arrhesPercent} % du montant total convenu
        sont demandées à la réservation, après confirmation de la disponibilité
        et communication des conditions. Elles sont déduites du prix de la
        location. Le montant exact, les modalités de versement et l’échéance du
        solde figurent dans l’offre remise avant votre engagement.
      </p>
      <p>
        Le dépôt de garantie, couramment appelé caution, est de{' '}
        {euros(v.deposit)}, par virement. Il est distinct du prix de la location
        et n’est pas assimilable au montant d’une franchise d’assurance.
      </p>
      <p>
        La restitution du dépôt est prévue le jour du retour, après vérification
        du véhicule et des sommes éventuellement dues. Toute retenue doit être
        justifiée et fondée sur les conditions acceptées. Le délai de crédit
        effectif dépend des établissements bancaires. Les modalités de versement
        sont communiquées avant votre engagement.
      </p>
      <p>
        Le site n’encaisse aucun paiement. Les opérations de location automobile
        ne sont pas réglées en espèces, sous réserve des exceptions légales de{' '}
        <a
          href="https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006169848/"
          rel="noreferrer"
        >
          l’article L. 112-6 du Code monétaire et financier
        </a>
        . Les exceptions concernent notamment les personnes sans compte de dépôt
        ou dans l’incapacité de payer par un autre moyen ; leur application doit
        être vérifiée avant tout versement en espèces.
      </p>

      <h2>Remise et restitution du véhicule</h2>
      <p>
        Le retrait est proposé en {company.area}. La livraison est possible en
        France, sur demande et selon les modalités convenues. L’adresse du siège
        social n’est pas un point de retrait garanti.
      </p>
      <p>
        Un état du véhicule contradictoire doit être établi au départ et au
        retour, avec le kilométrage, le carburant et les éventuels dommages.
        Conservez un exemplaire des documents remis.
      </p>

      <h2>Conditions à préciser avant toute location</h2>
      <ul>
        <li>
          Liste des justificatifs et conditions relatives aux conducteurs
          supplémentaires.
        </li>
        <li>
          Garanties d’assurance, exclusions, franchises, assistance et
          éventuelles assurances optionnelles.
        </li>
        <li>
          Prix ou méthode de calcul des kilomètres supplémentaires, livraison,
          carburant, nettoyage et retards.
        </li>
        <li>
          Usages et territoires autorisés, procédure en cas de panne, accident
          ou vol.
        </li>
        <li>
          Échéance du solde, délai d’exécution du remboursement commercial et
          modalités détaillées des éventuelles retenues sur le dépôt de
          garantie.
        </li>
      </ul>
      <p>
        Ces informations ne sont pas encore toutes documentées sur cette page.
        Elles doivent être finalisées et remises au client avant tout contrat ;
        aucun montant de franchise ou frais supplémentaire n’est présumé.
      </p>

      <h2>Annulation et rétractation</h2>
      <p>
        Si vous nous prévenez au moins {rentalPolicy.cancellationNoticeDays}{' '}
        jours avant la date et l’heure de départ convenues, les arrhes sont
        remboursées intégralement. En cas d’annulation moins de{' '}
        {rentalPolicy.cancellationNoticeDays} jours avant le départ, elles
        restent acquises à {company.name} ; le solde n’est pas exigé du seul
        fait de l’annulation. Si la société renonce à son engagement, le régime
        légal des arrhes prévoit leur restitution au double, sous réserve des
        règles applicables aux situations particulières.
      </p>
      <p>
        Une location de voiture prévue à des dates déterminées ne bénéficie pas
        du délai légal de rétractation de 14 jours, conformément à l’article L.
        221-28, 12° du Code de la consommation. Les conditions d’annulation
        contractuelles restent distinctes de cette exception. Consultez la page{' '}
        <Link href="/annulation-remboursement">
          annulation et remboursement
        </Link>
        .
      </p>

      <h2>Réclamation et médiation</h2>
      <p>
        Adressez d’abord votre réclamation écrite à{' '}
        <a href={`mailto:${company.email}`}>{company.email}</a> ou au siège
        social, avec la référence et les dates de votre location. Après une
        réclamation préalable non résolue, le consommateur peut saisir
        gratuitement un médiateur de la consommation compétent.
      </p>
      <p>
        <strong>
          Le médiateur conventionné et ses coordonnées restent à renseigner
          avant publication.
        </strong>{' '}
        Aucun organisme n’est présenté comme partenaire sans convention
        effective. Les droits de recours devant les juridictions compétentes
        sont préservés.
      </p>
    </LegalPage>
  )
}
