import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createRequire } from 'node:module'
import { NextRequest } from 'next/server.js'
import ts from 'typescript'
const require = createRequire(import.meta.url)
const cache = new Map()
function load(file) {
  const absolute = resolve(file)
  if (cache.has(absolute)) return cache.get(absolute)
  const output = ts.transpileModule(readFileSync(absolute, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText
  const module = { exports: {} }
  cache.set(absolute, module.exports)
  const localRequire = (id) =>
    id.startsWith('@/') ? load(id.slice(2) + '.ts') : require(id)
  new Function('exports', 'require', 'module', output)(
    module.exports,
    localRequire,
    module,
  )
  cache.set(absolute, module.exports)
  return module.exports
}
const { sanitizeAnalyticsEvent } = load('lib/analytics.ts')
assert.deepEqual(
  sanitizeAnalyticsEvent({
    type: 'pageview',
    url: 'https://rentyourdream.fr/en/reservation?name=private#personal',
    extra: 'PRIVATE',
  }),
  { type: 'pageview', url: 'https://rentyourdream.fr/en/reservation' },
)
for (const event of [
  { type: 'event', url: 'https://rentyourdream.fr/' },
  { type: 'pageview', url: 'https://rentyourdream.fr/private-person' },
  { type: 'pageview', url: 'https://other.example/' },
  { type: 'pageview', url: 'invalid' },
])
  assert.equal(sanitizeAnalyticsEvent(event), null)
const { proxy } = load('proxy.ts')
const prior = process.env.VERCEL
process.env.VERCEL = '1'
try {
  const secure = proxy(
    new NextRequest('http://rentyourdream.fr/reservation?vehicle=megane-4', {
      headers: { 'x-forwarded-proto': 'http' },
    }),
  )
  assert.equal(secure.status, 308)
  assert.equal(
    secure.headers.get('location'),
    'https://rentyourdream.fr/reservation?vehicle=megane-4',
  )
  const local = proxy(
    new NextRequest('http://localhost:3002/', {
      headers: { 'x-forwarded-proto': 'http' },
    }),
  )
  assert.equal(local.status, 200)
  const english = proxy(
    new NextRequest('https://rentyourdream.fr/en/faq', {
      headers: { 'x-ryd-locale': 'fr' },
    }),
  )
  assert.equal(english.headers.get('x-middleware-request-x-ryd-locale'), 'en')
  const french = proxy(
    new NextRequest('https://rentyourdream.fr/faq', {
      headers: { 'x-ryd-locale': 'en' },
    }),
  )
  assert.equal(french.headers.get('x-middleware-request-x-ryd-locale'), 'fr')
} finally {
  if (prior === undefined) delete process.env.VERCEL
  else process.env.VERCEL = prior
}
console.log(
  'PASS: production HTTP redirects to HTTPS, localhost remains usable, locale header cannot be forged, analytics strips extra data and rejects private paths/custom events/other origins',
)
