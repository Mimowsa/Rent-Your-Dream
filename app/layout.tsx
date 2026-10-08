import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { headers } from 'next/headers'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { company } from '@/lib/company'
import { businessJsonLd, jsonLd } from '@/lib/seo'
import { LocaleProvider } from '@/components/locale-provider'
import { BackToTop } from '@/components/back-to-top'
import { AnalyticsConsent } from '@/components/analytics-consent'

const manrope = localFont({
  src: '../public/fonts/Manrope-variable.ttf',
  weight: '200 800',
  display: 'swap',
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: `Location de voiture à Paris et en Île-de-France · ${company.name}`,
    template: `%s · ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  authors: [{ name: company.name }],
  creator: company.credit.name,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: company.name,
    title: `Location de voiture à Paris · ${company.name}`,
    description: company.description,
    images: [
      {
        url: '/opengraph-image.jpg',
        alt: 'Rent Your Dream — location de voiture à Paris et en Île-de-France',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Location de voiture à Paris · ${company.name}`,
    description: company.description,
    images: [
      {
        url: '/opengraph-image.jpg',
        alt: 'Rent Your Dream — location de voiture à Paris et en Île-de-France',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = (await headers()).get('x-ryd-locale') === 'en' ? 'en' : 'fr'
  return (
    <html
      lang={locale}
      data-theme="light"
      data-scroll-behavior="smooth"
      className={manrope.variable}
      suppressHydrationWarning
    >
      <body>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(businessJsonLd()) }}
        />
        <LocaleProvider locale={locale}>
          <a href="#contenu" className="skip-link">
            {locale === 'fr' ? 'Aller au contenu' : 'Skip to content'}
          </a>
          <SiteHeader />
          <main id="contenu" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
          <BackToTop />
          <AnalyticsConsent
            enabled={
              process.env.VERCEL_ENV === 'production' ||
              process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === '1'
            }
          />
        </LocaleProvider>
      </body>
    </html>
  )
}
