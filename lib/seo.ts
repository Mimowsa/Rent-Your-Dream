import type { Metadata } from 'next'
import { company, socialList } from '@/lib/company'
import { localizePath, type Locale } from '@/lib/i18n'

export function absoluteUrl(path: string): string {
  return new URL(path, company.siteUrl).toString()
}

/** Shared metadata, with a canonical URL specific to each indexable page. */
export function pageMetadata({
  title,
  description,
  path,
  image = '/opengraph-image.jpg',
  imageAlt = 'Rent Your Dream — location de voiture à Paris et en Île-de-France',
  locale = 'fr',
}: {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  locale?: Locale
}): Metadata {
  const canonical = localizePath(path, locale)
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'fr-FR': localizePath(path, 'fr'),
        'en-GB': localizePath(path, 'en'),
        'x-default': localizePath(path, 'fr'),
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_GB' : 'fr_FR',
      siteName: company.name,
      title: `${title} · ${company.name}`,
      description,
      url: absoluteUrl(canonical),
      images: [{ url: absoluteUrl(image), alt: imageAlt, ...(image === '/opengraph-image.jpg' ? { width: 1200, height: 630 } : {}) }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · ${company.name}`,
      description,
      images: [{ url: absoluteUrl(image), alt: imageAlt }],
    },
  }
}

/** Escape markup delimiters before embedding JSON in an HTML script element. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

export function businessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': absoluteUrl('/#organisation'),
        name: company.name,
        legalName: company.legal.name,
        url: company.siteUrl,
        description: company.description,
        logo: absoluteUrl('/brand/ryd-mark.png'),
        email: company.email,
        telephone: company.phone,
        identifier: {
          '@type': 'PropertyValue',
          propertyID: 'SIREN',
          value: company.legal.siren.replace(/\s/g, ''),
        },
        // Registered office only: no opening hours, geolocation or pickup claim.
        address: {
          '@type': 'PostalAddress',
          streetAddress: company.legal.streetAddress,
          postalCode: company.legal.postalCode,
          addressLocality: company.legal.city,
          addressCountry: company.legal.country,
        },
        areaServed: { '@type': 'AdministrativeArea', name: company.area },
        sameAs: socialList.flatMap((channel) =>
          channel.url ? [channel.url] : [],
        ),
      },
      {
        '@type': 'WebSite',
        '@id': absoluteUrl('/#site'),
        url: company.siteUrl,
        name: company.name,
        inLanguage: ['fr-FR', 'en-GB'],
        publisher: { '@id': absoluteUrl('/#organisation') },
      },
    ],
  }
}
