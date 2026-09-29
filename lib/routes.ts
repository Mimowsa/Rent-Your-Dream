import { company } from '@/lib/company'
import { vehicles } from '@/lib/vehicles'

export const siteRoutes = [
  '/',
  '/vehicules',
  '/reservation',
  '/faq',
  '/contact',
  ...company.legalRoutes.map((route) => route.href),
  ...vehicles.map((vehicle) => `/vehicules/${vehicle.slug}`),
]
