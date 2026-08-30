import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { company } from '@/lib/company'

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
})

const siteUrl = 'https://rentyourdream.fr'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} — Location automobile à Paris`,
    template: `%s · ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  alternates: { canonical: '/' },
  keywords: [
    'location voiture Paris',
    'location automobile Île-de-France',
    'louer une voiture Paris',
    company.name,
  ],
  authors: [{ name: company.credit.name }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: company.name,
    title: `${company.name} — Un rêve éveillé`,
    description: company.description,
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${company.name} — Un rêve éveillé`,
    description: company.description,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={manrope.variable}>
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
