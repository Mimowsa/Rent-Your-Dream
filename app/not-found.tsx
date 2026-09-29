'use client'

import Link from '@/components/localized-link'
import { ArrowRight } from '@/components/icons'
import Image from 'next/image'
import { useI18n } from '@/components/locale-provider'

export default function NotFound() {
  const { locale } = useI18n()
  return (
    <section className="wrap" style={{ paddingBlock: '18svh 20svh' }}>
      <Image
        src="/brand/ryd-mark.png"
        alt="Rent Your Dream"
        width={1099}
        height={352}
        style={{
          width: 150,
          height: 'auto',
          display: 'block',
          marginBottom: 32,
        }}
      />
      <span className="kicker">
        {locale === 'fr' ? 'Erreur 404' : 'Error 404'}
      </span>
      <h1 style={{ fontSize: 'clamp(2.4rem, 9vw, 4rem)', marginTop: 20 }}>
        {locale === 'fr'
          ? 'Cette page a pris la route.'
          : 'This page has hit the road.'}
      </h1>
      <p className="dim" style={{ marginTop: 14 }}>
        {locale === 'fr'
          ? 'La page que vous cherchez n’existe pas ou a été déplacée.'
          : 'The page you are looking for does not exist or has moved.'}
      </p>
      <p style={{ marginTop: 26 }}>
        <Link href="/" className="btn btn--primary">
          {locale === 'fr' ? 'Revenir à l’accueil' : 'Back to the homepage'}
          <ArrowRight />
        </Link>
      </p>
    </section>
  )
}
