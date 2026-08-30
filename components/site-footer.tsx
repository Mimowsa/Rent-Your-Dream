import Image from 'next/image'
import Link from 'next/link'
import { company } from '@/lib/company'
import { ArrowRight, Mail } from '@/components/icons'

export function SiteFooter() {
  const year = new Date().getFullYear()
  const snap = company.socials.snapchat
  const insta = company.socials.instagram
  const tiktok = company.socials.tiktok

  return (
    <footer className="footer" id="contact">
      <div className="wrap wrap--wide">
        {/* call to action */}
        <div className="footer-cta">
          <div className="footer-cta__text">
            <span className="section-mark" aria-hidden="true" />
            <h2>Prêt à prendre la route ?</h2>
            <p>Choisissez vos dates dans le configurateur, on confirme la disponibilité avec vous — directement.</p>
          </div>
          <div className="footer-cta__actions">
            <Link href="/#reserver" className="btn btn--primary">
              Réserver
              <ArrowRight />
            </Link>
            <a href={`mailto:${company.email}`} className="btn btn--on-dark">
              <Mail />
              Nous écrire
            </a>
          </div>
        </div>

        {/* columns */}
        <div className="footer-cols">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label={`${company.name} — accueil`}>
              <Image
                src="/brand/logo-horizontal-tight.png"
                alt={company.name}
                width={2040}
                height={224}
              />
            </Link>
            <p className="footer-slogan">{company.slogan}</p>
            <p className="footer-desc">{company.description}</p>
          </div>

          <nav className="footer-col" aria-label="Explorer">
            <h3>Explorer</h3>
            <Link href="/#vehicules">Véhicules</Link>
            <Link href="/#reserver">Réserver</Link>
            <Link href="/#faq">Questions fréquentes</Link>
          </nav>

          <div className="footer-col">
            <h3>Contact</h3>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            {snap.url ? (
              <a href={snap.url} target="_blank" rel="noopener noreferrer">
                Snapchat · {snap.handle}
              </a>
            ) : (
              <span>Snapchat · {snap.handle}</span>
            )}
            {insta.url ? (
              <a href={insta.url} target="_blank" rel="noopener noreferrer">
                Instagram · {insta.handle}
              </a>
            ) : (
              <span>Instagram · {insta.handle ?? 'à venir'}</span>
            )}
            {tiktok.url ? (
              <a href={tiktok.url} target="_blank" rel="noopener noreferrer">
                TikTok · {tiktok.handle}
              </a>
            ) : (
              <span>TikTok · {tiktok.handle ?? 'à venir'}</span>
            )}
            <span>Téléphone · {company.phone ?? 'à venir'}</span>
            <span>{company.area}</span>
            <span>{company.deliveryNote}</span>
          </div>

          <nav className="footer-col" aria-label="Informations légales">
            <h3>Légal</h3>
            {company.legalRoutes.map((r) => (
              <Link key={r.href} href={r.href}>
                {r.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-base">
          <span>
            © {year} {company.name} — {company.slogan}
          </span>
          <span>{company.credit.label}</span>
        </div>
      </div>
    </footer>
  )
}
