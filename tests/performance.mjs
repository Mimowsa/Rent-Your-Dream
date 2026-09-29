import { chromium } from 'playwright'
import { writeFile } from 'node:fs/promises'

const base = process.env.TEST_BASE_URL || 'http://localhost:3002'
const browser = await chromium.launch({
  headless: true,
  channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome',
})
const samples = []
try {
  for (const path of ['/', '/en', '/reservation', '/vehicules/megane-4']) {
    for (let sample = 1; sample <= 3; sample++) {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 1,
        isMobile: true,
        hasTouch: true,
      })
      const page = await context.newPage()
      const session = await context.newCDPSession(page)
      await session.send('Network.enable')
      await session.send('Network.setCacheDisabled', { cacheDisabled: true })
      await session.send('Network.emulateNetworkConditions', {
        offline: false,
        latency: 150,
        downloadThroughput: 1600000 / 8,
        uploadThroughput: 750000 / 8,
        connectionType: 'cellular4g',
      })
      await session.send('Emulation.setCPUThrottlingRate', { rate: 4 })
      await page.addInitScript(() => {
        window.__metrics = { lcp: 0, cls: 0 }
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries())
            window.__metrics.lcp = entry.startTime
        }).observe({ type: 'largest-contentful-paint', buffered: true })
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries())
            if (!entry.hadRecentInput) window.__metrics.cls += entry.value
        }).observe({ type: 'layout-shift', buffered: true })
      })
      await page.goto(base + path, { waitUntil: 'networkidle' })
      await page.waitForTimeout(500)
      const metrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0]
        const resources = performance.getEntriesByType('resource')
        return {
          ttfbMs: Math.round(navigation.responseStart),
          fcpMs: Math.round(
            performance.getEntriesByName('first-contentful-paint')[0]
              ?.startTime || 0,
          ),
          lcpMs: Math.round(window.__metrics.lcp),
          cls: Number(window.__metrics.cls.toFixed(4)),
          transferredBytes:
            navigation.transferSize +
            resources.reduce((sum, resource) => sum + resource.transferSize, 0),
          requests: resources.length + 1,
        }
      })
      samples.push({ path, sample, ...metrics })
      await context.close()
    }
  }
  const median = (numbers) =>
    [...numbers].sort((a, b) => a - b)[Math.floor(numbers.length / 2)]
  const summary = [...new Set(samples.map((s) => s.path))].map((path) => {
    const group = samples.filter((s) => s.path === path)
    return {
      path,
      ...Object.fromEntries(
        ['ttfbMs', 'fcpMs', 'lcpMs', 'cls', 'transferredBytes', 'requests'].map(
          (key) => [key, median(group.map((s) => s[key]))],
        ),
      ),
    }
  })
  const report = {
    date: new Date().toISOString(),
    environment:
      'Production build served on localhost. Chrome, mobile 390px, cold browser cache, CPU x4, 150ms latency, download 1.6Mbps, upload 750Kbps. Three samples per page; median. Not a production-host measurement or Lighthouse score.',
    summary,
    samples,
  }
  await writeFile(
    'docs/performance.json',
    JSON.stringify(report, null, 2) + '\n',
  )
  console.log(JSON.stringify(summary, null, 2))
} finally {
  await browser.close()
}
