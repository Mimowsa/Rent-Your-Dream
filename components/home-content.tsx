'use client'

import { useI18n } from '@/components/locale-provider'
import { faqEn } from '@/content/faq-en'
import { faq } from '@/content/faq'
import Image from 'next/image'
import Link from '@/components/localized-link'
import { ConfiguratorBand } from '@/components/configurator'
import { FleetShowcase } from '@/components/fleet-showcase'
import { FaqAccordion } from '@/components/faq-accordion'
import { faqJsonLd } from '@/lib/faq-seo'
import { SocialBand } from '@/components/social-section'
import { ArrowRight, Check } from '@/components/icons'
import { company } from '@/lib/company'
import { jsonLd } from '@/lib/seo'

export default function HomeContent() {
  const { t, locale } = useI18n()
  return (
    <div className="home-sections">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqJsonLd(locale === 'en' ? faqEn : faq)),
        }}
      />
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="kicker">
            <span className="status-dot" /> {t('Paris & Île-de-France')}
          </span>
          <h1 id="hero-title">
            {t('Location de voiture.')}
            <br />
            <span>{t('À vous la liberté.')}</span>
          </h1>
          <p>
            {t(
              'Pour le quotidien ou les envies d’ailleurs. Trouvez votre voiture, on s’occupe de la suite.',
            )}
          </p>
          <div className="hero-actions">
            <Link href="#vehicules" className="btn btn--primary">
              {t('Découvrir la flotte ')}
              <ArrowRight />
            </Link>
          </div>
        </div>
        <div className="hero-brand">
          <span className="hero-brand__stripes" aria-hidden="true" />
          <Image
            src="/brand/ryd-stacked.png"
            alt={t('Rent Your Dream — logo RYD bleu, blanc et rouge')}
            width={1219}
            height={438}
            preload
            sizes="(max-width: 760px) 260px, (max-width: 1050px) 40vw, 460px"
          />
          <span className="hero-brand__signature">
            {t('L’envie de partir, simplement.')}
          </span>
        </div>
      </section>

      <div className="trust-strip wrap">
        {[
          [
            'Un interlocuteur direct',
            'WhatsApp, téléphone ou e-mail',
            'Contact direct',
            'WhatsApp, tél., e-mail',
          ],
          [
            'Tarifs transparents',
            'Des prix clairs, sans surprise.',
            'Tarifs transparents',
            'Prix clairs, sans surprise.',
          ],
          [
            'Livraison possible en France',
            'Lieu et tarif convenus ensemble',
            'Livraison en France',
            'Lieu et tarif convenus',
          ],
        ].map(([title, description, shortTitle, shortDescription]) => (
          <p key={title}>
            <Check />
            <span className="trust-strip__full">
              <strong>{t(title)}</strong>
              {t(description)}
            </span>
            <span className="trust-strip__compact">
              <strong>{t(shortTitle)}</strong>
              {t(shortDescription)}
            </span>
          </p>
        ))}
      </div>

      <section className="section fleet-section" id="vehicules">
        <div className="wrap">
          <div className="editorial-heading">
            <div>
              <span className="kicker">
                {t('Le plaisir de prendre la route')}
              </span>
              <h2>
                {t('Notre flotte.')}
                <br />
                {t('Toutes vos envies.')}
              </h2>
            </div>
            <p>
              {t(
                'Découvrez nos véhicules et leurs tarifs. La flotte s’agrandit : de nouveaux modèles arrivent prochainement.',
              )}
            </p>
          </div>
          <FleetShowcase />
        </div>
      </section>

      <section className="section journey-section" id="comment-ca-marche">
        <div className="wrap">
          <div className="editorial-heading">
            <div>
              <span className="kicker">{t('Simple, du début à la fin')}</span>
              <h2>{t('Moins de démarches. Plus de kilomètres.')}</h2>
            </div>
          </div>
          <div className="journey-grid">
            {[
              ['01', 'Choisissez', 'Votre véhicule et son forfait.'],
              ['02', 'Vos dates', 'Précisez votre départ et votre retour.'],
              ['03', 'On confirme', 'Disponibilité, devis et conditions.'],
              [
                '04',
                'À vous la route',
                'Retrait ou livraison, à vous de choisir.',
              ],
            ].map(([n, title, description]) => (
              <article key={n}>
                <span>{t(n)}</span>
                <h3>{t(title)}</h3>
                <p>{t(description)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="wrap quick-booking"
        id="reserver"
        aria-labelledby="quick-booking-title"
      >
        <header className="quick-booking-heading">
          <div>
            <span className="kicker">
              {t('Votre location, en trois étapes')}
            </span>
            <h2 id="quick-booking-title">{t('On prépare votre départ ?')}</h2>
          </div>
          <p>
            {t('Vos dates. Vos options. Un récapitulatif prêt pour WhatsApp.')}
          </p>
        </header>
        <ConfiguratorBand preview />
      </section>

      <section className="section wrap local-section">
        <div>
          <span className="kicker">{t('À côté de vous')}</span>
          <h2>
            {t('Paris, l’Île-de-France.')}
            <br />
            {t('Et vos envies d’ailleurs.')}
          </h2>
        </div>
        <div>
          <p className="local-section__long-copy">
            {t('Basée à Bagnolet, ')}
            {t(company.name)}{' '}
            {t(
              'vous accompagne pour votre location de voiture à Paris et en Île-de-France. Découvrez notre flotte pour vos déplacements du quotidien, vos week-ends et vos envies d’ailleurs. Chaque véhicule possède ses équipements et ses propres forfaits.',
            )}
          </p>
          <p className="local-section__long-copy">
            {t(
              'Besoin d’une livraison ailleurs en France ? Indiquez simplement la ville dans votre demande. Nous vous précisons les possibilités et les frais avant toute confirmation.',
            )}
          </p>
          <p className="local-section__short-copy">
            {t(
              'Location à Paris et en Île-de-France. Livraison ailleurs en France sur demande et sur devis.',
            )}
          </p>
          <Link href="/contact" className="tlink">
            {t('Parlons de votre trajet ')}
            <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="section wrap" id="actualites">
        <SocialBand />
      </section>

      <section className="section faq-section" id="faq">
        <div className="wrap faq-layout">
          <div className="editorial-heading faq-heading">
            <div>
              <span className="kicker">{t('L’essentiel, sans détour')}</span>
              <h2>{t('Vos questions, nos réponses.')}</h2>
            </div>
            <Link href="/contact" className="tlink">
              {t('Nous contacter ')}
              <ArrowRight />
            </Link>
          </div>
          <FaqAccordion />
        </div>
      </section>
    </div>
  )
}
