import assert from 'node:assert/strict'
import { chromium } from 'playwright'

const base = process.env.TEST_BASE_URL || 'http://localhost:3003'
const browser = await chromium.launch({
  headless: true,
  channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome',
})
try {
  const page = await browser.newPage()
  let scripts = 0
  await page.route('**/*', async (route) => {
    const url = new URL(route.request().url())
    if (
      url.pathname.includes('/insights/') ||
      url.pathname.includes('/_vercel/')
    ) {
      scripts++
      await route.fulfill({
        contentType: 'application/javascript',
        body: 'window.__testAnalyticsLoaded = true',
      })
    } else if (url.origin === base) await route.continue()
    else await route.abort()
  })
  await page.goto(base, { waitUntil: 'networkidle' })
  assert.equal(scripts, 0)
  await page.getByRole('button', { name: 'Refuser', exact: true }).click()
  await page.reload({ waitUntil: 'networkidle' })
  assert.equal(scripts, 0)
  await page
    .getByRole('button', { name: 'Préférences de statistiques', exact: true })
    .click()
  await page.getByRole('button', { name: 'Accepter', exact: true }).click()
  await page.waitForFunction(() => window.__testAnalyticsLoaded)
  assert.equal(scripts, 1)
  const filtered = await page.evaluate(() => {
    const callback = window.vaq.find((entry) => entry[0] === 'beforeSend')[1]
    return {
      page: callback({
        type: 'pageview',
        url: location.origin + '/reservation?prenom=secret#note',
        data: { secret: true },
      }),
      unknown: callback({
        type: 'pageview',
        url: location.origin + '/personnel/secret',
      }),
      custom: callback({ type: 'event', url: location.href, name: 'secret' }),
    }
  })
  assert.deepEqual(filtered, {
    page: { type: 'pageview', url: base + '/reservation' },
    unknown: null,
    custom: null,
  })
  await page
    .getByRole('button', { name: 'Préférences de statistiques', exact: true })
    .click()
  await Promise.all([
    page.waitForEvent('load'),
    page.getByRole('button', { name: 'Refuser', exact: true }).click(),
  ])
  await page.waitForLoadState('networkidle')
  assert.equal(scripts, 1)
  assert.equal(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem('ryd-analytics-consent-v1')).choice,
    ),
    'refused',
  )
  console.log(
    'PASS: no analytics before consent or after refusal, acceptance loads intercepted SDK, URL/user data filtering, withdrawal unloads analytics. No data sent externally.',
  )
} finally {
  await browser.close()
}
