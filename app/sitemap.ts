import type { MetadataRoute } from 'next'
import { vehicles } from '@/lib/vehicles'

const base = 'https://rentyourdream.fr'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...vehicles.map((v) => ({
      url: `${base}/vehicules/${v.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ]
}
