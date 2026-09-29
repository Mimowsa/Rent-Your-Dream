import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { chromium } from 'playwright'
const require = createRequire(import.meta.url)
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
const reports = []
try {
  const page = await browser.newPage({
    reducedMotion: 'reduce',
    colorScheme: 'light',
  })
  async function check(label) {
    await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') })
    const result = await page.evaluate(() =>
      window.axe.run(document, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'],
        },
      }),
    )
    reports.push({
      label,
      violations: result.violations,
      review: result.incomplete,
    })
    if (result.violations.length)
      console.log(
        JSON.stringify({
          label,
          violations: result.violations.map((v) => ({
            id: v.id,
            targets: v.nodes.map((n) => n.target),
          })),
        }),
      )
  }
  for (const [prefix, theme, width] of [
    ['', 'dark', 390],
    ['/en', 'light', 320],
    ['/en', 'dark', 390],
  ]) {
    await page.setViewportSize({ width, height: 900 })
    for (const path of routes) {
      await page.goto(base + prefix + (path === '/' && prefix ? '' : path), {
        waitUntil: 'networkidle',
      })
      await page.evaluate(
        (theme) => (document.documentElement.dataset.theme = theme),
        theme,
      )
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `${prefix}${path} ${theme} ${width}`,
      )
      await check(`${prefix}${path} ${theme} ${width}`)
    }
  }
  for (const theme of ['light', 'dark']) {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(base + '/en', { waitUntil: 'networkidle' })
    await page.evaluate(
      (theme) => (document.documentElement.dataset.theme = theme),
      theme,
    )
    await check(`/en ${theme} 1440`)
  }
  await page.setViewportSize({ width: 320, height: 844 })
  await page.goto(base + '/en/reservation', { waitUntil: 'networkidle' })
  await page.evaluate(() => (document.documentElement.dataset.theme = 'dark'))
  await page.getByRole('button', { name: 'Choose my options' }).click()
  await check('English validation error dark 320')
  const date = (offset) => {
    const d = new Date()
    d.setDate(d.getDate() + offset)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }
  await page.getByLabel('Pick-up date', { exact: true }).fill(date(7))
  await page.getByLabel('Return date', { exact: true }).fill(date(9))
  await page.getByRole('button', { name: 'Choose my options' }).click()
  await check('English options dark 320')
  await page.getByRole('button', { name: 'Review my request' }).click()
  await check('English recap dark 320')
  await page.getByRole('button', { name: 'Analytics preferences' }).click()
  await check('English analytics settings dark 320')
  const issues = reports.flatMap((report) =>
    report.violations.map((v) => ({
      label: report.label,
      id: v.id,
      targets: v.nodes.map((n) => n.target),
    })),
  )
  assert.deepEqual(issues, [])
  console.log(
    `PASS: ${reports.length} accessibility audits of English pages and dark mode, validation, options, recap and consent controls`,
  )
} finally {
  await mkdir('artifacts', { recursive: true })
  await writeFile(
    'artifacts/accessibility-variants.json',
    JSON.stringify(reports, null, 2),
  )
  await browser.close()
}
