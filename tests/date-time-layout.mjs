import assert from 'node:assert/strict'
import { chromium, webkit } from 'playwright'

const base = process.env.TEST_BASE_URL || 'http://localhost:3000'
for (const [name, engine] of [['Chrome', chromium], ['Safari/WebKit', webkit]]) {
  const browser = await engine.launch({
    headless: true,
    ...(name === 'Chrome' && process.env.PLAYWRIGHT_CHANNEL
      ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}),
  })
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true })
    for (const locale of ['', '/en']) {
      await page.goto(base + locale)
      for (const width of [320, 375, 390, 430, 768, 1440]) {
        await page.setViewportSize({ width, height: 844 })
        // Mobile viewport and media queries settle asynchronously after resizing.
        await page.waitForFunction(width => innerWidth === width, width)
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
        for (const populated of [false, true]) {
          await page.locator('.compact-date-row input[type="date"]').evaluateAll((inputs, populated) => {
            for (const input of inputs) input.value = populated ? '2027-12-25' : ''
          }, populated)
          const rows = await page.locator('.compact-date-row').evaluateAll(rows => rows.map(row => {
            const container = row.getBoundingClientRect()
            const [date, time] = [...row.querySelectorAll('input')].map(el => el.getBoundingClientRect())
            return { left: container.left, right: container.right, dateLeft: date.left, dateRight: date.right, timeLeft: time.left, timeRight: time.right }
          }))
          assert.equal(rows.length, 2)
          for (const row of rows) {
            assert.ok(row.dateLeft >= row.left - 1 && row.timeRight <= row.right + 1, `${name} ${locale} ${width}: control outside its row`)
            assert.ok(row.timeLeft - row.dateRight >= 7, `${name} ${locale} ${width}: date and time overlap`)
          }
        }
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
      }
    }
    console.log(`PASS: ${name}, FR/EN, empty and populated dates, six viewport widths, no overlap or overflow`)
  } finally {
    await browser.close()
  }
}
