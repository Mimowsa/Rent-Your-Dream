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
const photo = await sharp('Src/megane-4/vitrine.png').resize(710, 630, { fit: 'cover' }).jpeg({ quality: 95 }).toBuffer()
const logo = await sharp(mark).resize({ width: 270 }).png().toBuffer()
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<defs><linearGradient id="fade"><stop offset="0" stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs>
<rect width="1200" height="630" fill="white"/>
<image href="data:image/jpeg;base64,${photo.toString('base64')}" x="490" width="710" height="630"/>
<rect x="475" width="160" height="630" fill="url(#fade)"/>
<image href="data:image/png;base64,${logo.toString('base64')}" x="56" y="44" width="270" height="88"/>
<g font-family="Arial, Helvetica, sans-serif">
<text x="60" y="184" fill="#164bee" font-size="17" font-weight="700" letter-spacing="3">RENT YOUR DREAM</text>
<text x="56" y="278" fill="#101114" font-size="61" font-weight="700" letter-spacing="-2">Louez.</text>
<text x="56" y="352" fill="#101114" font-size="61" font-weight="700" letter-spacing="-2">Roulez.</text>
<text x="56" y="426" fill="#164bee" font-size="61" font-weight="700" letter-spacing="-2">Profitez.</text>
<text x="60" y="486" fill="#536170" font-size="20">Location de voiture</text>
<text x="60" y="518" fill="#536170" font-size="20">Paris &amp; Île-de-France</text>
<text x="60" y="589" fill="#101114" font-size="18" font-weight="700">rentyourdream.fr</text>
</g><rect y="622" width="400" height="8" fill="#164bee"/><rect x="400" y="622" width="400" height="8" fill="#eeeeef"/><rect x="800" y="622" width="400" height="8" fill="#e21d35"/>
</svg>`
await sharp(Buffer.from(svg)).jpeg({ quality: 92 }).toFile('app/opengraph-image.jpg')
console.log('Generated OG preview, favicon, logo icon and Apple touch icon from Src.')
