import assert from 'node:assert/strict'
import { chromium } from 'playwright'

const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHANNEL
    ? { channel: process.env.PLAYWRIGHT_CHANNEL }
    : {}),
})
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  })
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto(process.env.TEST_BASE_URL || 'http://localhost:3000', {
    waitUntil: 'networkidle',
  })
  const form = page.locator('.compact-booking')
  const link = form.getByRole('link', { name: /Préparer sur WhatsApp/ })
  await link.click()
  await form.getByRole('alert').waitFor()
  assert.match(await form.getByRole('alert').textContent(), /date de départ/)
  assert.equal(
    await form
      .getByLabel('Date de départ', { exact: true })
      .getAttribute('aria-invalid'),
    'true',
  )
  const date = (days) => {
    const d = new Date()
    d.setDate(d.getDate() + days)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }
  await form.getByLabel('Date de départ', { exact: true }).fill(date(3))
  await form.getByLabel('Date de retour', { exact: true }).fill(date(2))
  await link.click()
  assert.match(await form.getByRole('alert').textContent(), /après le départ/)
  await form.getByLabel('Date de retour', { exact: true }).fill(date(5))
  await form.getByRole('button', { name: 'Livraison', exact: true }).click()
  await link.click()
  assert.match(
    await form.getByRole('alert').textContent(),
    /ville de livraison/,
  )
  await form
    .getByLabel('Ville de livraison (obligatoire pour cette option)')
    .fill('Lyon')
  await form.getByRole('button', { name: 'Oui', exact: true }).click()
  await form
    .getByLabel('Nombre de kilomètres supplémentaires (facultatif)')
    .fill('-2')
  await link.click()
  assert.match(await form.getByRole('alert').textContent(), /nombre entier/)
  await form
    .getByLabel('Nombre de kilomètres supplémentaires (facultatif)')
    .fill('300')
  const url = new URL(await link.getAttribute('href'))
  const message = url.searchParams.get('text')
  assert.equal(url.hostname, 'wa.me')
  assert.match(message, /Livraison souhaitée : Lyon/)
  assert.match(message, /environ 300 km/)
  assert.match(message, /Renault Mégane 4/)
  await form.getByRole('button', { name: 'Retrait', exact: true }).click()
  await form.getByRole('button', { name: 'Non', exact: true }).click()
  const cleanMessage = new URL(
    await link.getAttribute('href'),
  ).searchParams.get('text')
  assert.doesNotMatch(cleanMessage, /Lyon|300 km/)
  assert.equal(await page.locator('#faq details').count(), 11)
  assert.equal(
    await page
      .locator('.footer nav[aria-label="Informations légales"] a')
      .count(),
    6,
  )
  assert.equal(await page.locator('.journey-section').count(), 0)
  assert.ok(
    await page.evaluate(
      () =>
        document
          .querySelector('#reserver')
          .compareDocumentPosition(document.querySelector('#vehicules')) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ),
  )
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 })
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `overflow at ${width}`,
    )
  }
  assert.deepEqual(errors, [])
  console.log(
    'PASS: compact form validates dates, delivery and mileage; WhatsApp message removes deselected options; 11 FAQ and 6 legal links retained; form above fleet; no overflow at four widths.',
  )
} finally {
  await browser.close()
}
