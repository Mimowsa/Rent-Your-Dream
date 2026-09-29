import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { chromium } from 'playwright'
const require = createRequire(import.meta.url)
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHANNEL
    ? { channel: process.env.PLAYWRIGHT_CHANNEL }
    : {}),
})
const base = process.env.TEST_BASE_URL || 'http://localhost:3000'
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
  '/politique-confidentialite',
  '/politique-cookies',
  '/annulation-remboursement',
]
const report = []
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' })
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
    report.push({
      label,
      violations: result.violations,
      review: result.incomplete,
    })
    assert.deepEqual(
      result.violations.map((v) => ({
        id: v.id,
        targets: v.nodes.map((n) => n.target),
      })),
      [],
      label,
    )
  }
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    for (const route of routes) {
      await page.goto(base + route, { waitUntil: 'networkidle' })
      await check(`${route} ${width}px`)
    }
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(base, { waitUntil: 'networkidle' })
  assert.equal(
    await page.getByLabel('Date de départ', { exact: true }).isVisible(),
    true,
  )
  await check('Home configurator first step visible')
  await page.getByRole('button', { name: 'Ouvrir le menu' }).click()
  await check('Mobile navigation open')
  console.log(
    `PASS: ${report.length} accessibility checks, including contrast, WCAG 2 A/AA + 2.1/2.2 AA rules supported by axe.`,
  )
  console.log(
    'Automated checks do not establish full RGAA or WCAG conformance. Review entries are saved in artifacts/accessibility.json.',
  )
} finally {
  await mkdir('artifacts', { recursive: true })
  await writeFile(
    'artifacts/accessibility.json',
    JSON.stringify(report, null, 2),
  )
  await browser.close()
}
