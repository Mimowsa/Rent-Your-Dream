import { pageMetadata } from '@/lib/seo'
import { company } from '@/lib/company'
import { contactChatLink } from '@/lib/whatsapp'
import { ArrowRight, Mail, WhatsApp } from '@/components/icons'
import { SocialBand } from '@/components/social-section'
export const metadata = pageMetadata({
  title: 'Contact et demande de location',
  description:
    'Demandez votre location de voiture à Paris et en Île-de-France sur WhatsApp. Téléphone et e-mail pour vos questions générales ou administratives.',
  path: '/contact',
})

export default function Contact() {
  return (
    <>
      <section className="wrap page-intro">
        <span className="kicker">Restons en contact</span>
        <h1>Parlons de votre trajet.</h1>
        <p>
          Une question, une envie de départ ? Retrouvez-nous directement.
          Retrait en {company.area}, livraison possible partout en France.
        </p>
      </section>
      <section className="wrap contact-grid">
        <article className="contact-card">
          <WhatsApp />
          <h2>Sur WhatsApp</h2>
          <p>Une demande de location ou une question rapide.</p>
          <a
            href={contactChatLink}
            target="_blank"
            rel="noopener noreferrer"
            className="tlink"
          >
            Écrivez-nous <ArrowRight />
          </a>
        </article>
        <article className="contact-card">
          <ArrowRight />
          <h2>Par téléphone</h2>
          <p>Une question générale ? Échangeons directement.</p>
          {company.phone && (
            <a
              href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}
              className="tlink"
            >
              {company.phone}
            </a>
          )}
        </article>
        <article className="contact-card">
          <Mail />
          <h2>Par e-mail</h2>
          <p>Pour vos questions générales ou vos démarches administratives.</p>
          <a href={`mailto:${company.email}`} className="tlink">
            {company.email}
          </a>
        </article>
      </section>
      <section className="wrap section">
        <SocialBand />
      </section>
    </>
  )
}
