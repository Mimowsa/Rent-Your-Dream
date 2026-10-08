import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'

// Use the owner's local source artwork; no generated replacement logo.
const mark = await sharp('Src/logos/logo-monogramme.png').trim({ threshold: 20 }).png().toBuffer()
async function icon(size) {
  const logo = await sharp(mark).resize({ width: Math.round(size * .92), height: Math.round(size * .92), fit: 'inside' }).png().toBuffer()
  const { width, height } = await sharp(logo).metadata()
  return sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
    .composite([{ input: logo, left: Math.round((size - width) / 2), top: Math.round((size - height) / 2) }]).png().toBuffer()
}
await writeFile('app/icon.png', await icon(512))
await writeFile('app/apple-icon.png', await icon(180))
const sizes = [16, 32, 48]
const icons = await Promise.all(sizes.map(icon))
const header = Buffer.alloc(6 + 16 * icons.length)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(icons.length, 4)
let offset = header.length
icons.forEach((data, i) => {
  const entry = 6 + i * 16
  header[entry] = sizes[i]
  header[entry + 1] = sizes[i]
  header.writeUInt16LE(1, entry + 4)
  header.writeUInt16LE(32, entry + 6)
  header.writeUInt32LE(data.length, entry + 8)
  header.writeUInt32LE(offset, entry + 12)
  offset += data.length
})
await writeFile('app/favicon.ico', Buffer.concat([header, ...icons]))
const logo = await sharp(mark).resize({ width: 880 }).png().toBuffer()
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<rect width="1200" height="630" fill="white"/>
<image href="data:image/png;base64,${logo.toString('base64')}" x="160" y="140" width="880" height="270"/>
<g font-family="Arial, Helvetica, sans-serif" text-anchor="middle">
<text x="600" y="473" fill="#101114" font-size="32" font-weight="700" letter-spacing="6">RENT YOUR DREAM</text>
<text x="600" y="522" fill="#536170" font-size="22">Location de voiture · Paris &amp; Île-de-France</text>
<text x="600" y="584" fill="#164bee" font-size="18" font-weight="700">rentyourdream.fr</text>
</g>
<rect y="622" width="400" height="8" fill="#164bee"/>
<rect x="400" y="622" width="400" height="8" fill="#eeeeef"/>
<rect x="800" y="622" width="400" height="8" fill="#e21d35"/>
</svg>`
await sharp(Buffer.from(svg)).jpeg({ quality: 92 }).toFile('app/opengraph-image.jpg')
console.log('Generated logo-only OG preview, favicon and Apple touch icon from Src.')
