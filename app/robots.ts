import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/mentions-legales', '/politique-confidentialite', '/conditions-location'],
    },
    sitemap: 'https://rentyourdream.fr/sitemap.xml',
  }
}
