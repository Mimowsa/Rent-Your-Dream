import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage } from '@/components/LegalPage'
import { company } from '@/lib/company'
import { euros } from '@/lib/vehicles'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description:
    'Identité et coordonnées de RENT YOUR DREAM, société de location automobile immatriculée au RCS de Bobigny.',
  alternates: {
    canonical: '/mentions-legales',
    languages: {
      'fr-FR': '/mentions-legales',
      'en-GB': '/en/mentions-legales',
      'x-default': '/mentions-legales',
    },
  },
}

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      title="Mentions légales"
      intro="Les informations sur la société qui édite ce site et vos moyens de contact."
    >
      <h2>Éditeur du site</h2>
      <dl className="legal-details">
        <div>
          <dt>Dénomination sociale</dt>
          <dd>{company.legal.name}</dd>
        </div>
        <div>
          <dt>Forme juridique</dt>
          <dd>{company.legal.form}</dd>
        </div>
        <div>
          <dt>Capital social</dt>
          <dd>{euros(company.legal.capital)}</dd>
        </div>
        <div>
          <dt>Siège social</dt>
          <dd>{company.legal.address}</dd>
        </div>
        <div>
          <dt>Immatriculation</dt>
          <dd>{company.legal.rcs}, le 18 septembre 2026</dd>
        </div>
        <div>
          <dt>SIREN</dt>
          <dd>{company.legal.siren}</dd>
        </div>
        <div>
          <dt>Adresse électronique</dt>
          <dd>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </dd>
        </div>
        <div>
          <dt>Téléphone</dt>
          <dd>
            <a href={`tel:${company.phone?.replace(/\s/g, '')}`}>
              {company.phone}
            </a>
          </dd>
        </div>
      </dl>
      <p>
        Le siège social est l’adresse de correspondance de la société. Le lieu
        de remise du véhicule est convenu avant la location.
      </p>

      <h2>Directeur de la publication</h2>
      <p>
        {company.legal.publicationDirector}, président de {company.legal.name}.
      </p>

      <h2>Hébergement</h2>
      <p>
        Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis.
        <br />
        Téléphone publié par l’hébergeur pour son contact juridique :{' '}
        <a href="tel:+15592887060">+1 559 288 7060</a> (
        <a href="https://vercel.com/legal/dmca-policy" rel="noreferrer">
          coordonnées publiées par Vercel
        </a>
        ).
        <br />
        Site :{' '}
        <a href="https://vercel.com" rel="noreferrer">
          vercel.com
        </a>
        . Contact d’assistance :{' '}
        <a href="https://vercel.com/help" rel="noreferrer">
          centre d’aide Vercel
        </a>
        .
      </p>
      <h2>Identification fiscale</h2>
      <p>
        Le numéro de TVA intracommunautaire n’a pas encore été communiqué à la
        société. Cette mention sera actualisée dès confirmation du numéro ou du
        régime fiscal applicable ; l’absence de numéro publié ne constitue pas
        une déclaration d’exonération de TVA.
      </p>

      <h2>Réclamations et médiation</h2>
      <p>
        Pour une réclamation, écrivez à{' '}
        <a href={`mailto:${company.email}`}>{company.email}</a> ou au siège
        social en précisant la location concernée.
      </p>
      <p>
        Un consommateur peut recourir gratuitement à un médiateur de la
        consommation après une réclamation écrite préalable non résolue. La
        société doit encore adhérer à un dispositif de médiation et publier le
        nom, les coordonnées et le site du médiateur compétent avant
        publication. Voir les{' '}
        <Link href="/conditions-location">conditions de location</Link>.
      </p>

      <h2>Conception et contenus</h2>
      <p>
        Conception et réalisation : {company.credit.name}. Les marques, textes
        et visuels restent protégés par les droits de leurs titulaires. Toute
        réutilisation doit respecter les autorisations et exceptions prévues par
        la loi.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Les traitements de données et les moyens d’exercer vos droits sont
        décrits dans la{' '}
        <Link href="/politique-confidentialite">
          politique de confidentialité
        </Link>
        . Le fonctionnement des traceurs est détaillé dans la{' '}
        <Link href="/politique-cookies">politique relative aux cookies</Link>.
      </p>
    </LegalPage>
  )
}
