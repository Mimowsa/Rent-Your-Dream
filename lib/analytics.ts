import type { BeforeSendEvent } from '@vercel/analytics/next'
import { siteRoutes } from '@/lib/routes'
import { company } from '@/lib/company'

/** Only known public pages; never custom events, URL parameters or user paths. */
export function sanitizeAnalyticsEvent(
  event: BeforeSendEvent,
  origin = company.siteUrl,
): BeforeSendEvent | null {
  if (event.type !== 'pageview') return null
  try {
    const url = new URL(event.url)
    if (url.origin !== new URL(origin).origin) return null
    const path =
      url.pathname.replace(/^\/en(?=\/|$)/, '').replace(/\/$/, '') || '/'
    if (!siteRoutes.includes(path)) return null
    url.search = ''
    url.hash = ''
    return { type: 'pageview', url: url.toString() }
  } catch {
    return null
  }
}
