import { NextResponse, type NextRequest } from 'next/server'
import { siteRoutes } from '@/lib/routes'

export function proxy(request: NextRequest) {
  const host = request.nextUrl.hostname.toLowerCase()
  if (
    process.env.VERCEL === '1' &&
    (host === 'rentyourdream.fr' || host === 'www.rentyourdream.fr') &&
    request.headers.get('x-forwarded-proto') === 'http'
  ) {
    const secure = request.nextUrl.clone()
    secure.protocol = 'https:'
    return NextResponse.redirect(secure, 308)
  }
  const headers = new Headers(request.headers)
  headers.set(
    'x-ryd-locale',
    /^\/en(?:\/|$)/.test(request.nextUrl.pathname) ? 'en' : 'fr',
  )
  const path =
    request.nextUrl.pathname.replace(/^\/en(?=\/|$)/, '').replace(/\/$/, '') ||
    '/'
  if (
    (headers.get('x-ryd-locale') === 'en' || path.startsWith('/vehicules/')) &&
    !siteRoutes.includes(path)
  ) {
    const missing = request.nextUrl.clone()
    missing.pathname = '/__ryd-page-introuvable'
    return NextResponse.rewrite(missing, { request: { headers } })
  }
  return NextResponse.next({ request: { headers } })
}

export const config = { matcher: ['/((?!_next/|_vercel/|.*\\..*).*)'] }
