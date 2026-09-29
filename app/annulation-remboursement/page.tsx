import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage } from '@/components/LegalPage'
import { company } from '@/lib/company'
import { rentalPolicy } from '@/lib/rental-policy'

export const metadata: Metadata = {
  title: 'Annulation et remboursement',
  description:
    'Arrhes de 30 %, remboursement en prévenant au moins 7 jours avant le départ, règles d’annulation et demande de remboursement Rent Your Dream.',
  alternates: {
    canonical: '/annulation-remboursement',
    languages: {
      'fr-FR': '/annulation-remboursement',
      'en-GB': '/en/annulation-remboursement',
      'x-default': '/annulation-remboursement',
    },
  },
}

const cancellationEmail = `mailto:${company.email}?subject=${encodeURIComponent('Demande d’annulation ou de remboursement')}&body=${encodeURIComponent('Bonjour,\n\nJe vous contacte au sujet de ma location.\nRéférence de réservation (si disponible) :\nDates de location :\nMa demande :\n\nMerci de m’en confirmer la réception et de préciser les conditions applicables.')}`

export default function AnnulationPage() {
  return (
    <LegalPage
      title="Annulation et remboursement"
      intro="Les démarches possibles selon que vous avez envoyé une demande ou déjà conclu une location."
    >
      <h2>Vous avez seulement envoyé une demande</h2>
      <p>
        Le configurateur ne conclut aucun contrat et ne prélève aucune somme.
        Vous pouvez abandonner votre saisie ou nous indiquer que vous ne
        souhaitez plus donner suite. Une simple demande de disponibilité
        n’entraîne pas de frais d’annulation.
      </p>

      <h2>Arrhes à la réservation</h2>
      <p>
        Après confirmation de la disponibilité et communication des conditions,
        des arrhes de {rentalPolicy.arrhesPercent} % du montant total convenu
        sont demandées pour réserver. Elles sont déduites du prix de la location
        et sont distinctes du dépôt de garantie. Il s’agit d’arrhes, et non d’un
        acompte.
      </p>
      <p>
        Le montant exact, les modalités de versement et l’échéance du solde vous
        sont communiqués avant votre engagement. Le site ne prélève aucune
        somme.
      </p>

      <h2>Vous souhaitez annuler une réservation</h2>
      <ul>
        <li>
          <strong>
            Au moins {rentalPolicy.cancellationNoticeDays} jours avant le départ
            convenu :
          </strong>{' '}
          si vous nous prévenez dans ce délai, vos arrhes sont intégralement
          remboursées.
        </li>
        <li>
          <strong>
            Moins de {rentalPolicy.cancellationNoticeDays} jours avant le départ
            convenu :
          </strong>{' '}
          les arrhes restent acquises à {company.name}. Le solde de la location
          n’est pas exigé du seul fait de votre annulation.
        </li>
      </ul>
      <p>
        Le délai s’apprécie par rapport à la date et à l’heure de départ prévues
        dans votre réservation. Adressez votre demande par écrit et conservez-en
        une copie. Cette règle d’annulation commerciale ne limite pas les droits
        que vous accorde la loi.
      </p>

      <h2>Si la société revient sur son engagement</h2>
      <p>
        Si {company.name} renonce à la location convenue, les arrhes sont
        restituées au double, conformément à{' '}
        <a
          href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226990"
          rel="noreferrer"
        >
          l’article L. 214-1 du Code de la consommation
        </a>
        . Les situations d’empêchement relevant d’un régime légal particulier,
        notamment la force majeure, sont examinées selon les règles applicables.
      </p>

      <h2>Remboursement</h2>
      <p>
        Notre réponse écrite précise le montant à restituer et les modalités du
        remboursement, dans le respect des délais légaux applicables. Un
        remboursement dû n’est pas remplacé par un avoir sans votre accord.
      </p>
      <div className="notice">
        <p>
          Le délai d’exécution du remboursement commercial des arrhes doit
          encore être précisé dans les conditions avant publication. Aucun délai
          bancaire instantané n’est garanti.
        </p>
      </div>

      <h2>Existe-t-il un délai de rétractation de 14 jours ?</h2>
      <p>
        Le droit légal de rétractation de 14 jours ne s’applique pas à une
        location de voiture devant être exécutée à une date ou une période
        déterminée, conformément à{' '}
        <a
          href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044563170"
          rel="noreferrer"
        >
          l’article L. 221-28, 12° du Code de la consommation
        </a>
        .
      </p>
      <p>
        Pour ces locations, il n’y a pas de formulaire de rétractation
        obligatoire ni de case de renonciation à ce droit à cocher. Cette
        exception ne supprime pas vos autres droits, notamment si la prestation
        convenue n’est pas fournie.
      </p>

      <h2>Déposer une demande</h2>
      <p>
        Écrivez à{' '}
        <a href={cancellationEmail}>
          {company.email} pour une annulation ou un remboursement
        </a>
        . Indiquez les dates, la référence de réservation si vous en avez une et
        l’objet de votre demande. Conservez votre message. Vous pouvez aussi
        écrire au siège : {company.legal.address}.
      </p>
      <p>
        L’ouverture du lien e-mail prépare seulement un message ; elle ne
        l’envoie pas. Envoyez-le pour nous notifier votre demande. Notre réponse
        en confirme la prise en compte et précise les sommes concernées.
        N’envoyez ni numéro complet de carte bancaire ni document d’identité
        dans ce premier message.
      </p>

      <h2>Dépôt de garantie</h2>
      <p>
        Le dépôt de garantie est distinct du prix de la location. Sa restitution
        est prévue le jour du retour après vérification du véhicule et des
        sommes éventuellement dues. Toute retenue doit être justifiée et fondée
        sur les conditions acceptées. Le délai de crédit effectif dépend ensuite
        des établissements bancaires.
      </p>

      <h2>En cas de désaccord</h2>
      <p>
        Adressez une réclamation écrite à la société. Les informations de
        recours figurent dans les{' '}
        <Link href="/conditions-location">conditions de location</Link>.
        L’identité et les coordonnées du médiateur de la consommation doivent
        encore être complétées avant publication.
      </p>
    </LegalPage>
  )
}
