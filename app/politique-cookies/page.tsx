import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage } from '@/components/LegalPage'
import { company } from '@/lib/company'

export const metadata: Metadata = {
  title: 'Politique relative aux cookies',
  description:
    'Préférences du site, consentement à Vercel Analytics, configurateur et liens externes : choisissez vos réglages de confidentialité.',
  alternates: {
    canonical: '/politique-cookies',
    languages: {
      'fr-FR': '/politique-cookies',
      'en-GB': '/en/politique-cookies',
      'x-default': '/politique-cookies',
    },
  },
}

export default function CookiesPage() {
  return (
    <LegalPage
      title="Politique relative aux cookies"
      intro="Consultez librement nos offres et choisissez d’autoriser ou non les statistiques facultatives."
    >
      <h2>Qu’est-ce qu’un cookie ?</h2>
      <p>
        Un cookie est une information qu’un service peut enregistrer sur votre
        appareil. D’autres techniques, comme le stockage local ou certains
        pixels, peuvent également servir à suivre votre navigation.
      </p>

      <h2>Ce qui est utilisé sur ce site</h2>
      <p>
        Le site n’intègre aucun pixel publicitaire, suivi intersites ni
        enregistrement de session. Vercel Web Analytics reste désactivé avant
        votre accord. Le configurateur conserve temporairement vos choix dans la
        mémoire de la page ; il n’utilise ni cookie ni stockage local pour
        mémoriser vos informations.
      </p>
      <p>
        Votre choix de thème est mémorisé dans le stockage local lorsque vous
        utilisez le bouton de mode sombre. Le choix accepter/refuser les
        statistiques est mémorisé dans le stockage local pendant 180 jours, puis
        demandé à nouveau. La langue dépend de l’URL, sans cookie de préférence.
        Ces réglages nécessaires ne contiennent pas vos saisies de location et
        ne servent pas à la publicité.
      </p>
      <p>
        Les photographies et autres ressources de présentation sont servies par
        le site. Les réseaux sociaux sont accessibles par de simples liens, sans
        widget intégré. Aucun compte utilisateur ni panier d’achat n’est créé.
      </p>
      <p>
        L’hébergement peut nécessiter des traitements techniques pour acheminer
        les pages, mettre les ressources en cache ou protéger le service. Ils ne
        doivent pas être réutilisés à des fins publicitaires. Les données
        techniques de connexion sont décrites dans la{' '}
        <Link href="/politique-confidentialite">
          politique de confidentialité
        </Link>
        .
      </p>

      <h2>Statistiques Vercel et votre consentement</h2>
      <p>
        Sur le site de production, une fois le service Web Analytics activé dans
        le projet Vercel, la mesure d’audience est proposée avec des boutons
        accepter et refuser de même visibilité. Aucun script de mesure ne se
        charge avant votre acceptation. Vous pouvez continuer à consulter les
        offres et à demander une location après un refus. La{' '}
        <a
          href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi"
          rel="noreferrer"
        >
          CNIL distingue les traceurs nécessitant un consentement de ceux
          strictement nécessaires au service demandé
        </a>
        .
      </p>
      <p>
        Vercel Web Analytics mesure les consultations, la provenance de
        navigation, une zone géographique approximative et des informations sur
        le navigateur et l’appareil. Il utilise un identifiant dérivé temporaire
        plutôt qu’un cookie d’audience. L’absence de cookie ne constitue pas ici
        une revendication d’exemption de consentement. Les paramètres et
        fragments des URL mesurées sont supprimés ; aucun événement personnalisé
        ne contient les saisies du configurateur. Voir la{' '}
        <a
          href="https://vercel.com/docs/analytics/privacy-policy"
          rel="noreferrer"
        >
          documentation de confidentialité Vercel Analytics
        </a>
        .
      </p>
      <p>
        « Préférences de statistiques », dans le pied de page, permet de
        modifier ou retirer votre accord à tout moment. Après retrait, la page
        se recharge pour décharger le script. Le choix expire après 180 jours.
        Les préférences nécessaires sont indépendantes de cet accord. Le site
        local de développement n’envoie pas de statistiques.
      </p>

      <h2>Lorsque vous ouvrez un lien externe</h2>
      <p>
        WhatsApp, Instagram, Snapchat et TikTok peuvent appliquer leurs propres
        règles et déposer des traceurs lorsque vous ouvrez leur service. Les
        choix réalisés auprès de ces services se gèrent sur leurs interfaces.
      </p>
      <p>
        Le lien du configurateur transmet le récapitulatif à WhatsApp dès son
        ouverture, pour préparer le message. Aucun message n’est envoyé à{' '}
        {company.name} avant votre action dans WhatsApp. Le configurateur
        utilise uniquement ce canal. L’e-mail reste disponible pour vos
        questions générales, vos démarches administratives et l’exercice de vos
        droits.
      </p>

      <h2>Vos réglages et votre contact</h2>
      <p>
        Vous pouvez consulter et supprimer les cookies et données de sites dans
        les réglages de votre navigateur. Pour toute question concernant ce site
        : <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>
    </LegalPage>
  )
}
