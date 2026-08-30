import Link from 'next/link'
import { ConfiguratorBand } from '@/components/configurator'
import { VehicleCard, VehicleCardSoon } from '@/components/vehicle-card'
import { FaqAccordion, faqJsonLd } from '@/components/faq-accordion'
import { SocialBand } from '@/components/social-section'
import { euros, vehicles } from '@/lib/vehicles'
import { company } from '@/lib/company'

export default function HomePage() {
  const shown = vehicles.slice(0, 4)
  const soon = Math.max(0, 4 - shown.length)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />

      {/* ---------- hero ---------- */}
      <section className="hero">
        <svg
          className="hero-wave"
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          aria-hidden="true"
          fill="none"
        >
          <path
            className="fill"
            d="M-20,196 C 300,96 520,236 800,176 C 1060,120 1240,214 1460,150 L1460,320 L-20,320 Z"
            fill="currentColor"
            stroke="none"
          />
          <path
            d="M-20,214 C 280,120 470,250 720,196 C 970,142 1170,238 1460,168"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            className="l2"
            d="M-20,258 C 320,178 520,296 800,236 C 1060,180 1240,258 1460,214"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        <div className="wrap hero-in">
          <span className="eyebrow">{company.name} — {company.city}</span>
          <h1>
            Un rêve{' '}
            <br />
            <span>éveillé.</span>
          </h1>
          <p>Louez la voiture, prenez la route. On confirme avec vous, directement.</p>
          <div className="hero-actions">
            <Link href="#reserver" className="btn btn--primary">
              Réserver
            </Link>
            <Link href="#vehicules" className="btn btn--outline">
              Voir les véhicules
            </Link>
          </div>
          <div className="hero-meta">
            <div>
              <b>dès {euros(vehicles[0].pricing.day)}</b>
              <span>24 heures</span>
            </div>
            <div>
              <b>{company.area}</b>
              <span>+ livraison en France</span>
            </div>
            <div>
              <b>WhatsApp</b>
              <span>réservation directe</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- configurator band ---------- */}
      <div className="wrap cfg-wrap">
        <ConfiguratorBand />
      </div>

      {/* ---------- véhicules ---------- */}
      <section className="section" id="vehicules">
        <div className="wrap wrap--wide">
          <div className="section-head">
            <span className="section-mark" aria-hidden="true" />
            <h2>Nos véhicules</h2>
          </div>
          <div className="veh-grid" data-count={shown.length + soon}>
            {shown.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} />
            ))}
            {Array.from({ length: soon }).map((_, i) => (
              <VehicleCardSoon key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- réseaux ---------- */}
      <section className="section">
        <div className="wrap wrap--wide">
          <SocialBand />
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section className="section wrap wrap--wide" id="faq">
        <div className="faq-layout">
          <div className="faq-intro">
            <span className="kicker">FAQ</span>
            <h2>Questions fréquentes</h2>
            <p>
              L’essentiel avant de réserver. Un point à préciser ?{' '}
              <a href={`mailto:${company.email}`}>Écrivez-nous</a>, on répond
              directement.
            </p>
          </div>
          <FaqAccordion />
        </div>
      </section>

    </>
  )
}
