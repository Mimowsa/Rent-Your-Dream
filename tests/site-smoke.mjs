import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

await mkdir('artifacts', { recursive: true })
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHANNEL
    ? { channel: process.env.PLAYWRIGHT_CHANNEL }
    : {}),
})
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
})
const page = await context.newPage()
const errors = []
const requests = []
page.on('pageerror', (error) => errors.push(error.message))
context.on('request', (request) =>
  requests.push({
    url: request.url(),
    method: request.method(),
    data: request.postData() || '',
  }),
)
const base = process.env.TEST_BASE_URL || 'http://localhost:3000'
const date = (offset) => {
  const value = new Date()
  value.setDate(value.getDate() + offset)
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`
}
const routes = [
  '/',
  '/vehicules',
  '/vehicules/megane-4',
  '/reservation',
  '/faq',
  '/contact',
  '/conditions-location',
  '/conditions-generales',
  '/mentions-legales',
  '/politique-confidentialite',
  '/politique-cookies',
  '/annulation-remboursement',
]
const whatsapp = () => page.getByRole('link', { name: /Ouvrir WhatsApp/ })
const input = (label) => page.getByLabel(label, { exact: true })
async function expectFieldError(label, message) {
  assert.match(
    await page.locator('.booking-error[role="alert"]').textContent(),
    message,
  )
  const field = input(label)
  assert.equal(await field.getAttribute('aria-invalid'), 'true')
  await field
    .evaluate(
      (element) =>
        new Promise((resolve) =>
          requestAnimationFrame(() =>
            resolve(element === document.activeElement),
          ),
        ),
    )
    .then((focused) => assert.equal(focused, true, `focus on ${label}`))
  const description = await field.getAttribute('aria-describedby')
  assert.ok(description, `${label} references its error`)
}

try {
  await page.goto(`${base}/reservation?vehicle=megane-4`, {
    waitUntil: 'networkidle',
  })
  const booking = page.getByRole('form', {
    name: 'Préparer une demande de location',
  })
  assert.equal(
    await booking
      .locator(
        'input[type="tel"], input[type="email"], input[autocomplete="family-name"]',
      )
      .count(),
    0,
  )
  const rates = await page.locator('.booking-rates').innerText()
  for (const price of ['60 €', '150 €', '350 €'])
    assert.ok(rates.includes(price), `updated rate ${price}`)
  await page.getByRole('button', { name: 'Choisir mes options' }).click()
  await expectFieldError('Date de départ', /date de départ/)
  await input('Date de départ').fill(date(-1))
  await input('Date de retour').fill(date(3))
  await page.getByRole('button', { name: 'Choisir mes options' }).click()
  await expectFieldError('Date de départ', /futur/)
  await input('Date de départ').fill(date(3))
  await input('Heure de retour').fill('09:00')
  await page.getByRole('button', { name: 'Choisir mes options' }).click()
  await expectFieldError('Date de retour', /après le départ/)
  await input('Date de retour').fill(date(6))
  await page.getByRole('button', { name: 'Choisir mes options' }).click()
  assert.equal(
    await page
      .getByRole('heading', { name: 'Un trajet qui vous ressemble.' })
      .count(),
    1,
  )
  await page.getByRole('checkbox', { name: /Livraison du véhicule/ }).check()
  await page.getByRole('button', { name: 'Voir le récapitulatif' }).click()
  await expectFieldError(
    'Ville de livraison (obligatoire pour cette option)',
    /ville de livraison/,
  )
  await input('Ville de livraison (obligatoire pour cette option)').fill('   ')
  await page.getByRole('button', { name: 'Voir le récapitulatif' }).click()
  await expectFieldError(
    'Ville de livraison (obligatoire pour cette option)',
    /ville de livraison/,
  )
  await input('Ville de livraison (obligatoire pour cette option)').fill('Lyon')
  await page
    .getByRole('checkbox', { name: /Kilomètres supplémentaires/ })
    .check()
  for (const value of ['-2', '1.5']) {
    await input('Nombre de kilomètres supplémentaires (facultatif)').fill(value)
    await page.getByRole('button', { name: 'Voir le récapitulatif' }).click()
    await expectFieldError(
      'Nombre de kilomètres supplémentaires (facultatif)',
      /nombre entier/,
    )
  }
  await input('Nombre de kilomètres supplémentaires (facultatif)').fill('300')
  await input('Votre prénom (facultatif)').fill('Samira')
  await input('Une précision ? (facultatif)').fill(
    'Un siège enfant est-il possible ? & arrivée 14 h',
  )
  await page.getByRole('button', { name: 'Voir le récapitulatif' }).click()
  const href = await whatsapp().getAttribute('href')
  const url = new URL(href)
  assert.equal(url.hostname, 'wa.me')
  assert.equal(url.pathname, '/33688433993')
  const message = url.searchParams.get('text')
  for (const fragment of [
    'Samira',
    'Renault Mégane 4',
    'Lyon',
    '300 km',
    '200 km / jour',
    'siège enfant',
    '& arrivée 14 h',
    'prix total',
  ])
    assert.ok(message.includes(fragment), fragment)
  assert.equal(await whatsapp().getAttribute('rel'), 'noopener noreferrer')
  assert.equal(
    await page.locator('.booking-form a[href^="mailto:"]').count(),
    0,
    'rental requests are sent only through WhatsApp',
  )
  assert.equal(
    await page.getByRole('checkbox').count(),
    0,
    'no unnecessary consent gate',
  )
  // Inspect the prepared link without opening external services or sending messages.
  await page.screenshot({
    path: 'artifacts/reservation-recap.png',
    fullPage: true,
  })
  await page.getByRole('button', { name: 'Retour', exact: true }).click()
  assert.equal(
    await input(
      'Ville de livraison (obligatoire pour cette option)',
    ).inputValue(),
    'Lyon',
  )
  await page.getByRole('checkbox', { name: /Livraison du véhicule/ }).uncheck()
  await page
    .getByRole('checkbox', { name: /Kilomètres supplémentaires/ })
    .uncheck()
  await page.getByRole('button', { name: 'Voir le récapitulatif' }).click()
  const plainText = new URL(
    await whatsapp().getAttribute('href'),
  ).searchParams.get('text')
  assert.ok(
    !plainText.includes('Lyon') && !plainText.includes('300 km'),
    'disabled options do not leak into the message',
  )
  assert.ok(plainText.includes('Retrait : sur place'))
  assert.deepEqual(await context.cookies(), [], 'site sets no cookies')
  assert.deepEqual(
    await page.evaluate(() => ({
      local: Object.keys(localStorage),
      session: Object.keys(sessionStorage),
    })),
    { local: [], session: [] },
    'form values are not persisted',
  )
  for (const request of requests) {
    assert.ok(
      !/Samira|Lyon|si%C3%A8ge|siège/.test(request.url + request.data),
      'form values never leave the browser before choosing a messaging channel',
    )
    assert.equal(
      new URL(request.url).origin,
      new URL(base).origin,
      `unexpected third-party request: ${request.url}`,
    )
  }
  await page.reload({ waitUntil: 'networkidle' })
  assert.equal(
    await input('Date de départ').inputValue(),
    '',
    'form clears on reload',
  )
  console.log(
    'PASS: required fields, date and option validation, accessible error focus, updated prices, optional data, WhatsApp-only requests, no network leak or persistence',
  )

  const canonicals = new Map()
  const titles = new Map()
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 })
    for (const path of routes) {
      const response = await page.goto(base + path, {
        waitUntil: 'networkidle',
      })
      assert.equal(response.status(), 200, path)
      assert.equal(await page.locator('h1').count(), 1, `one h1: ${path}`)
      assert.equal(await page.locator('main').count(), 1, `one main: ${path}`)
      assert.equal(await page.locator('html').getAttribute('lang'), 'fr')
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `overflow ${path} at ${width}`,
      )
      assert.equal(
        await page.locator('img:not([alt])').count(),
        0,
        `image missing alt: ${path}`,
      )
      // Decorative images and redundant thumbnails may correctly use alt="".
      for (const image of await page
        .locator(
          '.hero-brand img, .carousel__slide img, .booking-car-photo img, .veh__img img',
        )
        .all()) {
        const alt = await image.getAttribute('alt')
        assert.ok(alt?.trim(), `descriptive alt: ${path}`)
      }
      if (width === 1440) {
        const canonical = await page
          .locator('link[rel="canonical"]')
          .getAttribute('href')
        assert.ok(canonical, `canonical missing: ${path}`)
        const canonicalUrl = new URL(canonical)
        assert.equal(canonicalUrl.protocol, 'https:')
        assert.equal(canonicalUrl.pathname.replace(/\/$/, '') || '/', path)
        assert.equal(
          canonicalUrl.search,
          '',
          `canonical must omit query: ${path}`,
        )
        assert.ok(
          ![...canonicals.values()].includes(canonical),
          `duplicate canonical: ${path}`,
        )
        canonicals.set(path, canonical)
        const title = await page.title()
        assert.ok(
          title && ![...titles.values()].includes(title),
          `unique title: ${path}`,
        )
        titles.set(path, title)
        assert.ok(
          (
            await page
              .locator('meta[name="description"]')
              .getAttribute('content')
          )?.trim(),
          `description: ${path}`,
        )
        assert.match(
          await page.locator('meta[name="viewport"]').getAttribute('content'),
          /width=device-width/,
        )
        await page
          .locator('script[type="application/ld+json"]')
          .evaluateAll((scripts) =>
            scripts.forEach((script) => JSON.parse(script.textContent)),
          )
      }
    }
    console.log(
      `PASS: ${routes.length} routes at ${width}px, semantic structure, image alternatives and no overflow`,
    )
  }

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(base, { waitUntil: 'networkidle' })
  const menuButton = page.getByRole('button', { name: 'Ouvrir le menu' })
  await menuButton.press('Enter')
  const dialog = page.getByRole('dialog', { name: 'Menu de navigation' })
  const menuItems = dialog.locator('a[href], button')
  await page.waitForFunction(
    () => document.querySelector('#drawer a') === document.activeElement,
  )
  await page.keyboard.press('Shift+Tab')
  assert.equal(
    await menuItems
      .last()
      .evaluate((element) => element === document.activeElement),
    true,
    'menu traps backward focus',
  )
  await page.keyboard.press('Tab')
  assert.equal(
    await menuItems
      .first()
      .evaluate((element) => element === document.activeElement),
    true,
    'menu traps forward focus',
  )
  await page.keyboard.press('Escape')
  assert.equal(await menuButton.getAttribute('aria-expanded'), 'false')
  assert.equal(
    await menuButton.evaluate((element) => element === document.activeElement),
    true,
    'Escape returns focus to the menu button',
  )
  await page.getByRole('button', { name: 'Ouvrir le menu' }).click()
  await page
    .getByRole('navigation', { name: 'Navigation mobile' })
    .getByRole('link', { name: 'FAQ', exact: true })
    .click()
  await page.waitForURL('**/faq')
  assert.equal(
    await page
      .getByRole('button', { name: 'Ouvrir le menu' })
      .getAttribute('aria-expanded'),
    'false',
  )
  await page.locator('summary').first().click()
  assert.equal(await page.locator('details').first().getAttribute('open'), '')
  await page.goto(`${base}/vehicules/megane-4`, { waitUntil: 'networkidle' })
  await page
    .getByRole('button', { name: 'Voir la photo 2', exact: true })
    .click()
  await page.waitForFunction(
    () =>
      document
        .querySelector('[aria-label="Voir la photo 2"]')
        ?.getAttribute('aria-current') === 'true',
  )
  await page.screenshot({
    path: 'artifacts/vehicle-mobile.png',
    fullPage: true,
  })
  console.log('PASS: mobile menu, FAQ and gallery interactions')

  await page.setViewportSize({ width: 320, height: 844 })
  await page.goto(`${base}/reservation`, { waitUntil: 'networkidle' })
  await input('Date de départ').fill(date(3))
  await input('Date de retour').fill(date(6))
  await page.getByRole('button', { name: 'Choisir mes options' }).press('Enter')
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
    'options fit a 320px screen',
  )
  await input('Une précision ? (facultatif)').fill(
    'Une précision très longue '.repeat(35),
  )
  await page
    .getByRole('button', { name: 'Voir le récapitulatif' })
    .press('Enter')
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
    'recap fits a 320px screen',
  )
  for (const action of await page
    .locator('.booking-buttons a, .booking-buttons button')
    .all()) {
    const size = await action.boundingBox()
    assert.ok(
      size.height >= 44 && size.width >= 44,
      'mobile request actions are at least 44 × 44px',
    )
  }
  assert.ok(
    new URL(await whatsapp().getAttribute('href')).searchParams
      .get('text')
      .includes('Retrait : sur place'),
    'options and name may all remain empty',
  )
  await page.screenshot({
    path: 'artifacts/reservation-mobile.png',
    fullPage: true,
  })
  console.log(
    'PASS: full request flow by keyboard at 320px, optional fields and touch targets',
  )

  const sitemapResponse = await page.request.get(`${base}/sitemap.xml`)
  assert.equal(sitemapResponse.status(), 200)
  const sitemap = await sitemapResponse.text()
  const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => new URL(match[1]).href,
  )
  for (const canonical of canonicals.values())
    assert.ok(
      sitemapUrls.includes(new URL(canonical).href),
      `sitemap contains ${canonical}`,
    )
  const robotsResponse = await page.request.get(`${base}/robots.txt`)
  assert.equal(robotsResponse.status(), 200)
  const robots = await robotsResponse.text()
  assert.match(robots, /User-Agent: \*/i)
  assert.match(robots, /Allow: \//)
  assert.match(robots, /Sitemap: https:\/\//)
  console.log(
    'PASS: canonical URLs, titles, descriptions, structured data, sitemap and crawler resources',
  )

  const plainContext = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  })
  const plainPage = await plainContext.newPage()
  await plainPage.goto(base, { waitUntil: 'load' })
  assert.equal(await plainPage.locator('h1').count(), 1)
  assert.ok(
    await plainPage.locator('a[href="/vehicules/megane-4"]').count(),
    'vehicle discoverable without JavaScript',
  )
  await plainPage.goto(`${base}/reservation`, { waitUntil: 'load' })
  assert.ok(
    await plainPage.locator('noscript a[href^="https://wa.me/"]').count(),
    'WhatsApp alternative without JavaScript',
  )
  await plainContext.close()
  assert.deepEqual(errors, [])
  console.log(
    'PASS: server-rendered navigation and contact alternative without JavaScript, no browser runtime errors',
  )
} finally {
  await browser.close()
}
