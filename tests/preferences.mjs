import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'

const base = process.env.TEST_BASE_URL || 'http://localhost:3002'
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHANNEL
    ? { channel: process.env.PLAYWRIGHT_CHANNEL }
    : {}),
})
const routes = [
  '/',
  '/vehicules',
  '/vehicules/megane-4',
  '/reservation',
  '/faq',
  '/contact',
  '/mentions-legales',
  '/conditions-generales',
  '/conditions-location',
  '/annulation-remboursement',
  '/politique-confidentialite',
  '/politique-cookies',
]
const errors = []
const date = (offset) => {
  const value = new Date()
  value.setDate(value.getDate() + offset)
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`
}
await mkdir('artifacts', { recursive: true })
try {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
    colorScheme: 'dark',
  })
  page.on('pageerror', (error) => errors.push(error.message))
  await page.addInitScript(() => localStorage.setItem('ryd-theme', 'dark'))
  await page.goto(base, { waitUntil: 'networkidle' })
  assert.equal(
    await page.getByLabel('Date de départ', { exact: true }).isVisible(),
    true,
  )
  assert.equal(await page.getByRole('button', { name: 'Mode sombre', exact: true }).count(), 0)
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'light')
  await page.getByRole('link', { name: 'Switch to English' }).click()
  await page.waitForURL(`${base}/en`)
  assert.equal(await page.locator('html').getAttribute('lang'), 'en')
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'light')
  assert.match(await page.locator('h1').innerText(), /Your journey/)
  await page.getByRole('link', { name: /Prepare on WhatsApp/ }).waitFor()
  assert.equal(
    await page.getByRole('link', { name: /Prepare on WhatsApp/ }).count(),
    1,
  )
  assert.equal(await page.getByRole('button', { name: 'Dark mode', exact: true }).count(), 0)
  await page.getByRole('link', { name: 'Passer en français' }).click()
  await page.waitForURL(base + '/')
  assert.equal(await page.locator('html').getAttribute('lang'), 'fr')
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'light')

  await page.goto(`${base}/en/reservation?vehicle=megane-4`, {
    waitUntil: 'networkidle',
  })
  await page.getByLabel('Pick-up date', { exact: true }).fill(date(7))
  await page.getByLabel('Return date', { exact: true }).fill(date(9))
  await page
    .locator('input[name="website"]')
    .fill('spam.example', { force: true })
  await page.getByRole('button', { name: 'Choose my options' }).click()
  assert.match(
    await page.locator('.booking-error').innerText(),
    /could not be prepared/,
  )
  await page.locator('input[name="website"]').fill('', { force: true })
  await page.getByRole('button', { name: 'Choose my options' }).click()
  await page
    .getByLabel('Your first name (optional)', { exact: true })
    .fill('Jamie')
  await page.getByRole('button', { name: 'Review my request' }).click()
  const whatsapp = page.getByRole('link', { name: /Open WhatsApp/ })
  const message = new URL(await whatsapp.getAttribute('href')).searchParams.get(
    'text',
  )
  for (const value of [
    'Hello Rent Your Dream',
    'Jamie',
    '200 km / day',
    'Security deposit: 1000 EUR',
    'non-binding',
  ])
    assert.ok(message.includes(value), value)
  assert.equal(
    await page.locator('.booking-form a[href^="mailto:"]').count(),
    0,
  )
  // Prevent navigation; neither test click opens WhatsApp or sends a message.
  await whatsapp.evaluate((element) =>
    element.addEventListener('click', (event) => event.preventDefault()),
  )
  await whatsapp.click()
  await whatsapp.click()
  assert.match(await page.locator('.booking-error').innerText(), /try again/)
  await page.getByRole('button', { name: 'Analytics preferences' }).click()
  await page.getByRole('button', { name: 'Decline', exact: true }).click()
  assert.equal(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem('ryd-analytics-consent-v1')).choice,
    ),
    'refused',
  )
  await page.getByRole('button', { name: 'Analytics preferences' }).click()
  await page.getByRole('button', { name: 'Accept', exact: true }).click()
  await page.getByRole('button', { name: 'Analytics preferences' }).click()
  await page.getByRole('button', { name: 'Decline', exact: true }).click()
  assert.equal(
    await page.locator('script[src*="insights"]').count(),
    0,
    'local preview does not load analytics',
  )
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  const top = page.getByRole('button', { name: 'Back to top', exact: true })
  await top.waitFor()
  await top.click()
  await page.waitForFunction(() => window.scrollY === 0)

  const targets = new Set()
  for (const prefix of ['', '/en']) {
    for (const route of routes) {
      const path = prefix + (route === '/' ? (prefix ? '' : '/') : route)
      const response = await page.goto(base + path, {
        waitUntil: 'networkidle',
      })
      assert.equal(response.status(), 200, path)
      assert.equal(
        await page.locator('html').getAttribute('lang'),
        prefix ? 'en' : 'fr',
      )
      assert.equal(await page.locator('h1').count(), 1, path)
      assert.ok(
        await page.locator('meta[name="description"]').getAttribute('content'),
        path,
      )
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        path,
      )
      const links = await page
        .locator('a[href]')
        .evaluateAll((anchors) => anchors.map((anchor) => anchor.href))
      for (const link of links)
        if (link.startsWith(base + '/')) targets.add(link.split('#')[0])
    }
  }
  const broken = []
  for (const href of targets) {
    const response = await page.request.get(href)
    if (!response.ok()) broken.push({ href, status: response.status() })
  }
  assert.deepEqual(broken, [])
  for (const path of [
    '/page-inexistante',
    '/en/page-inexistante',
    '/vehicules/inconnu',
    '/en/vehicules/inconnu',
  ]) {
    const response = await page.goto(base + path, { waitUntil: 'networkidle' })
    assert.equal(response.status(), 404, path)
    assert.match(await page.locator('h1').innerText(), /route|road/)
  }
  const plain = await browser.newContext({ javaScriptEnabled: false })
  const plainPage = await plain.newPage()
  await plainPage.goto(base + '/en', { waitUntil: 'load' })
  assert.match(await plainPage.locator('h1').innerText(), /Your journey/)
  await plainPage.goto(base + '/en/reservation', { waitUntil: 'load' })
  assert.ok(
    await plainPage.locator('noscript a[href^="https://wa.me/"]').count(),
  )
  await plain.close()
  assert.deepEqual(errors, [])
  await writeFile(
    'artifacts/link-audit.json',
    JSON.stringify({ checked: [...targets], broken }, null, 2),
  )
  console.log(
    `PASS: languages, light-only appearance, English WhatsApp request, spam trap and cooldown, consent choices, back to top, 24 routes, ${targets.size} internal links, 404 and English without JavaScript`,
  )
} finally {
  await browser.close()
}
