import type { MetadataRoute } from 'next'
import { vehicles } from '@/lib/vehicles'
import { company } from '@/lib/company'
import { absoluteUrl } from '@/lib/seo'
import { localizePath } from '@/lib/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...[
      '/',
      '/vehicules',
      '/reservation',
      '/faq',
      '/contact',
      ...company.legalRoutes.map((route) => route.href),
    ].flatMap((path) =>
      (['fr', 'en'] as const).map((locale) => ({
        url: absoluteUrl(localizePath(path, locale)),
        alternates: {
          languages: {
            'fr-FR': absoluteUrl(localizePath(path, 'fr')),
            'en-GB': absoluteUrl(localizePath(path, 'en')),
          },
        },
      })),
    ),
    ...vehicles.flatMap((v) =>
      (['fr', 'en'] as const).map((locale) => ({
        url: absoluteUrl(localizePath(`/vehicules/${v.slug}`, locale)),
        images: v.photos.map((photo) => absoluteUrl(photo.src)),
        alternates: {
          languages: {
            'fr-FR': absoluteUrl(`/vehicules/${v.slug}`),
            'en-GB': absoluteUrl(`/en/vehicules/${v.slug}`),
          },
        },
      })),
    ),
  ]
}
