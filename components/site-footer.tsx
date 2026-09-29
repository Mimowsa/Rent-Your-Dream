'use client'

import { useI18n } from '@/components/locale-provider'

import Image from 'next/image'
import Link from '@/components/localized-link'
import { company } from '@/lib/company'
import { contactChatLink } from '@/lib/whatsapp'
import { ArrowRight, WhatsApp } from '@/components/icons'

export function SiteFooter() {
  const { t, locale } = useI18n()

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
            <h2>{t('Prêt à prendre la route ?')}</h2>
            <p>
              {t(
                'Choisissez vos dates dans le configurateur, nous confirmons la disponibilité et les conditions avec vous.',
              )}
            </p>
          </div>
          <div className="footer-cta__actions">
            <Link href="/reservation" className="btn btn--primary">
              {t('Choisir mes dates')}
              <ArrowRight />
            </Link>
            <a
              href={contactChatLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--on-dark"
            >
              <WhatsApp />
              {t('Nous écrire')}
            </a>
          </div>
        </div>

        {/* columns */}
        <div className="footer-cols">
          <div className="footer-brand">
            <Link
              href="/"
              className="brand"
              aria-label={t(`${company.name} — accueil`)}
            >
              <Image
                src="/brand/ryd-lockup.png"
                alt={t(company.name)}
                width={1804}
                height={232}
              />
            </Link>
            <p className="footer-slogan">{t(company.slogan)}</p>
            <p className="footer-desc">{t(company.description)}</p>
          </div>

          <nav className="footer-col" aria-label={t('Explorer')}>
            <h3>{t('Explorer')}</h3>
            <Link href="/vehicules">{t('Véhicules')}</Link>
            <Link href="/reservation">{t('Réserver')}</Link>
            <Link href="/faq">{t('Questions fréquentes')}</Link>
          </nav>

          <div className="footer-col">
            <h3>{t('Contact')}</h3>
            <a href={contactChatLink} target="_blank" rel="noopener noreferrer">
              {t('WhatsApp · réservation & questions')}
            </a>
            {[snap, insta, tiktok].map((channel) =>
              channel.url ? (
                <a
                  key={channel.label}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {channel.label} · {channel.handle}
                </a>
              ) : (
                <span key={channel.label}>
                  {channel.label} · {t(channel.handle || 'À venir')}
                </span>
              ),
            )}
            {company.phone && (
              <a href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}>
                {t('Téléphone ·')} {company.phone}
              </a>
            )}
            <a href={`mailto:${company.email}`}>{t(company.email)}</a>
            <span>{t(company.area)}</span>
            <span>{t(company.deliveryNote)}</span>
          </div>

          <nav className="footer-col" aria-label={t('Informations légales')}>
            <h3>{t('Légal')}</h3>
            {company.legalRoutes.map((r) => (
              <Link key={r.href} href={r.href}>
                {t(r.label)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-base">
          <button
            type="button"
            className="analytics-settings"
            onClick={() =>
              window.dispatchEvent(new Event('ryd:analytics-settings'))
            }
          >
            {locale === 'fr'
              ? 'Préférences de statistiques'
              : 'Analytics preferences'}
          </button>
          <span>
            {t('© ')}
            {t(year)} {t(company.name)} {t('— ')}
            {t(company.slogan)}
          </span>
          <span>{t(company.credit.label)}</span>
        </div>
      </div>
    </footer>
  )
}
