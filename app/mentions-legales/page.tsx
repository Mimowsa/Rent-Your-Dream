import type { Metadata } from 'next'
import { company } from '@/lib/company'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site Rent Your Dream.',
  robots: { index: false, follow: true },
}

export default function MentionsLegalesPage() {
  return (
    <article className="wrap prose">
      <span className="kicker">Informations</span>
      <h1>Mentions légales</h1>

      <div className="notice">
        Contenu provisoire. Les informations légales définitives (dénomination
        exacte, statut juridique, SIREN/SIRET, adresse, responsable de
        publication, hébergeur) seront complétées avant la mise en ligne
        publique.
      </div>

      <h2>Éditeur du site</h2>
      <p>
        {company.name} — location automobile en {company.area}.
        <br />
        Contact : <a href={`mailto:${company.email}`}>{company.email}</a>
        <br />
        Forme juridique, immatriculation et adresse : à compléter.
      </p>

      <h2>Responsable de la publication</h2>
      <p>À compléter.</p>

      <h2>Hébergement</h2>
      <p>À compléter (nom, adresse et contact de l’hébergeur).</p>

      <h2>Conception et réalisation</h2>
      <p>{company.credit.name}.</p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L’ensemble des contenus de ce site (textes, photographies des véhicules,
        logo {company.name}) est protégé. Toute reproduction sans autorisation
        est interdite.
      </p>
    </article>
  )
}
