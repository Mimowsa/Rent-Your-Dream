import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage } from '@/components/LegalPage'
import { company } from '@/lib/company'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Données utilisées pour vos demandes de location, prestataires, conservation et exercice de vos droits chez Rent Your Dream.',
  alternates: {
    canonical: '/politique-confidentialite',
    languages: {
      'fr-FR': '/politique-confidentialite',
      'en-GB': '/en/politique-confidentialite',
      'x-default': '/politique-confidentialite',
    },
  },
}

export default function ConfidentialitePage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      intro="Nous limitons les informations demandées à ce qui est utile pour répondre à votre demande de location."
    >
      <h2>Responsable du traitement</h2>
      <p>
        {company.legal.name}, {company.legal.form}, {company.legal.rcs}, dont le
        siège est situé {company.legal.address}, est responsable des données
        traitées pour vos demandes et votre relation avec la société. Pour toute
        question : <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>

      <h2>Quand vous consultez le site</h2>
      <p>
        Vous pouvez consulter les véhicules et les tarifs sans compte. Le site
        ne comporte pas de publicité ciblée, de pixel publicitaire ni
        d’enregistrement de session. La mesure d’audience Vercel est facultative
        et désactivée tant que vous n’avez pas accepté. Les liens vers les
        réseaux sociaux ne chargent pas leurs modules dans les pages.
      </p>

      <h2>Statistiques facultatives et préférences</h2>
      <p>
        Si vous acceptez, Vercel Web Analytics mesure les pages consultées, la
        provenance de navigation, une zone géographique approximative et des
        informations sur le navigateur et l’appareil. Vercel utilise un
        identifiant dérivé temporaire plutôt qu’un cookie de mesure d’audience.
        Le fondement de ce traitement est votre consentement (article 6,
        paragraphe 1, a du RGPD). Le script ne se charge pas avant acceptation.
      </p>
      <p>
        Aucun événement personnalisé ne transmet vos saisies du configurateur.
        Les paramètres et fragments des URL mesurées sont supprimés. Vous pouvez
        refuser ou retirer votre accord depuis « Préférences de statistiques »
        dans le pied de page. Après retrait, la page se recharge pour décharger
        le script et arrêter les mesures futures.
      </p>
      <p>
        Votre choix de statistiques est mémorisé sur votre appareil pendant 180
        jours. Le thème est mémorisé uniquement lorsque vous le choisissez. La
        langue dépend de l’adresse de la page, sans cookie de langue. Ces
        préférences ne contiennent aucune information de location. La durée de
        conservation des statistiques chez Vercel dépend du service et des
        réglages du projet ; elle doit être documentée avant publication.
      </p>
      <p>
        La consultation d’une page transmet nécessairement des données
        techniques à l’hébergeur Vercel : notamment l’adresse IP, l’URL
        demandée, la date de la requête et des informations sur le navigateur.
        Elles servent à fournir et sécuriser le site, sur le fondement de
        l’intérêt légitime à assurer son fonctionnement et sa sécurité (article
        6, paragraphe 1, f du RGPD).
      </p>

      <h2>Quand vous préparez une demande</h2>
      <p>
        Le configurateur utilise le véhicule, les dates et horaires souhaités,
        vos options et, si vous choisissez une livraison, la ville concernée. Le
        prénom, les kilomètres supplémentaires estimés et le commentaire sont
        facultatifs. Aucune pièce d’identité, copie de permis ou donnée bancaire
        n’est demandée à cette étape.
      </p>
      <p>
        Ces choix restent dans la mémoire de la page tant que vous n’ouvrez pas
        WhatsApp. Le configurateur ne les enregistre pas dans une base de
        données, un cookie ou le stockage local du navigateur. Une fermeture ou
        un rechargement de la page peut effacer la saisie.
      </p>
      <p>
        Le bouton WhatsApp ouvre un service externe : le texte préparé est
        transmis à ce service dans le lien dès son ouverture. Il peut aussi
        apparaître dans votre historique de navigation. {company.name} reçoit
        votre message lorsque vous l’envoyez dans WhatsApp, avec les
        informations de contact et de profil que ce service rend visibles. Vous
        pouvez modifier le texte avant de l’envoyer. Les demandes préparées dans
        le configurateur sont transmises uniquement par WhatsApp.
      </p>
      <p>
        Si vous écrivez par e-mail pour une question générale, une démarche
        administrative ou l’exercice de vos droits, nous recevons votre adresse
        et le contenu de votre message. N’ajoutez pas de document sensible à une
        simple question générale.
      </p>

      <h2>Pourquoi nous utilisons vos données</h2>
      <ul>
        <li>
          Répondre à votre demande, vérifier une disponibilité et établir une
          offre : mesures précontractuelles à votre initiative (article 6,
          paragraphe 1, b du RGPD).
        </li>
        <li>
          Gérer une location effectivement convenue : exécution du contrat, pour
          les seules informations nécessaires.
        </li>
        <li>
          Établir et conserver les factures et justificatifs imposés par la loi
          : obligation légale (article 6, paragraphe 1, c).
        </li>
        <li>
          Traiter une réclamation et conserver les éléments nécessaires à la
          défense de droits : intérêt légitime, dans les limites des délais
          applicables.
        </li>
      </ul>
      <p>
        Une demande de location ne vous inscrit pas à une newsletter et ne vaut
        pas accord pour recevoir de la publicité. Aucune décision automatisée ni
        aucun profilage n’est réalisé par le configurateur. Un consentement
        général à l’utilisation de vos données n’est pas exigé pour répondre à
        votre demande.
      </p>

      <h2>Qui peut recevoir ces informations</h2>
      <p>
        Les personnes habilitées de {company.name} accèdent aux demandes
        nécessaires à leur activité. Les services utilisés interviennent
        également selon leur fonction :
      </p>
      <ul>
        <li>
          Vercel Inc. héberge et distribue les pages du site et fournit la
          mesure d’audience facultative.
        </li>
        <li>
          WhatsApp Ireland Limited fournit le service de messagerie lorsque vous
          choisissez ce canal.
        </li>
        <li>
          Microsoft fournit la messagerie Outlook utilisée pour notre adresse de
          contact.
        </li>
      </ul>
      <p>
        Lorsqu’une location est conclue, les données strictement nécessaires
        peuvent également être traitées par les prestataires de paiement, de
        comptabilité ou d’assurance effectivement concernés et par les autorités
        habilitées. L’information correspondante doit vous être donnée lors de
        cette collecte. Nous ne vendons pas les données de vos demandes.
      </p>

      <h2>Services externes et transferts internationaux</h2>
      <p>
        Vercel et les services de messagerie peuvent traiter des informations
        hors de l’Espace économique européen. Leurs documents décrivent les
        destinations, les garanties et les voies de contact :{' '}
        <a href="https://vercel.com/legal/dpa" rel="noreferrer">
          accord de traitement de Vercel
        </a>
        ,{' '}
        <a
          href="https://www.whatsapp.com/legal/privacy-policy-eea"
          rel="noreferrer"
        >
          confidentialité WhatsApp
        </a>{' '}
        et{' '}
        <a
          href="https://www.microsoft.com/fr-fr/privacy/privacystatement"
          rel="noreferrer"
        >
          confidentialité Microsoft
        </a>
        . Vous pouvez demander des précisions sur les garanties applicables à
        vos données à notre adresse de contact.
      </p>

      <h2>Conservation</h2>
      <ul>
        <li>
          La saisie non transmise n’est pas conservée par {company.name} ; elle
          existe dans la page ouverte de votre navigateur.
        </li>
        <li>
          Les échanges de demande sont utilisés pendant le traitement de votre
          demande. Après sa clôture, seuls les éléments encore nécessaires à une
          obligation légale ou à la gestion d’un litige doivent être conservés,
          avec un accès limité.
        </li>
        <li>
          Les données de suivi courant d’une location sont supprimées au plus
          tard un an après sa fin, sauf les éléments nécessaires à une
          obligation légale ou à la gestion d’un litige, archivés séparément
          avec un accès limité. Cette règle ne justifie pas de conserver une
          copie de pièce d’identité ou de permis devenue inutile.
        </li>
        <li>
          Les factures et pièces comptables sont conservées pendant 10 ans à
          compter de la clôture de l’exercice concerné. Cette durée ne
          s’applique pas automatiquement aux conversations ni aux copies de
          documents d’identité.
        </li>
        <li>
          Les contrats et correspondances ayant une valeur contractuelle suivent
          les durées légales applicables, notamment cinq ans pour les documents
          commerciaux et dix ans pour les contrats conclus par voie électronique
          avec un consommateur d’un montant d’au moins 120 €. L’archivage est
          distinct du suivi courant de la location.
        </li>
        <li>
          Les journaux techniques dépendent du service d’hébergement et de sa
          configuration. Leur conservation doit être limitée aux besoins de
          fonctionnement, de sécurité et aux obligations applicables.
        </li>
      </ul>
      <div className="notice">
        <p>
          La société doit organiser la suppression du suivi courant, y compris
          dans ses messageries, appareils et sauvegardes. Les durées des
          demandes sans location, des journaux et des statistiques, ainsi que
          les garanties contractuelles des prestataires, doivent encore être
          documentées avant la mise en ligne de cette version.
        </p>
      </div>

      <h2>Vos droits</h2>
      <p>
        Selon les conditions prévues par le RGPD, vous pouvez demander l’accès,
        la rectification, l’effacement ou la limitation de vos données, ainsi
        que leur portabilité pour les traitements éligibles. Vous pouvez vous
        opposer aux traitements fondés sur l’intérêt légitime pour des raisons
        tenant à votre situation.
      </p>
      <p>
        Écrivez à{' '}
        <a
          href={`mailto:${company.email}?subject=${encodeURIComponent('Données personnelles — exercice de mes droits')}`}
        >
          {company.email}
        </a>{' '}
        ou au siège social, en précisant votre demande. Une vérification
        d’identité proportionnée peut être nécessaire en cas de doute
        raisonnable ; n’envoyez pas spontanément de pièce d’identité.
      </p>
      <p>
        Une réponse est apportée en principe dans un délai d’un mois. Une
        prolongation de deux mois peut s’appliquer aux demandes complexes ou
        nombreuses ; vous en êtes alors informé dans le premier mois. Vous
        pouvez déposer une réclamation auprès de la{' '}
        <a href="https://www.cnil.fr/fr/plaintes" rel="noreferrer">
          CNIL
        </a>
        .
      </p>

      <h2>Cookies</h2>
      <p>
        La <Link href="/politique-cookies">politique relative aux cookies</Link>{' '}
        décrit les préférences nécessaires et la mesure d’audience facultative,
        ainsi que les moyens d’accepter, refuser et retirer votre accord.
      </p>
    </LegalPage>
  )
}
