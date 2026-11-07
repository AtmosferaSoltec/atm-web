// Reproduce with: pnpm exec playwright install chromium && node scripts/og-image.mjs
import assert from 'node:assert/strict'
import { readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import sharp from 'sharp'

const require = createRequire(import.meta.url)
const output = new URL('../public/og-image.png', import.meta.url)
const logo = await readFile(new URL('../public/logo-full-dark.svg', import.meta.url), 'utf8')
const font = await readFile(require.resolve('@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'))
const width = 1200
const height = 630
const margin = 80
const browser = await chromium.launch({ headless: true })

try {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })
  await page.setContent(`<!doctype html>
<html lang="es"><head><meta charset="UTF-8"><style>
  @font-face {
    font-family: Inter;
    src: url(data:font/woff2;base64,${font.toString('base64')}) format('woff2');
    font-weight: 100 900;
    font-style: normal;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
  body { background: #141517; color: white; font-family: Inter, sans-serif; }
  .glow, .grid { position: absolute; inset: 0; pointer-events: none; }
  .glow {
    background: linear-gradient(110deg, #c6f103 22%, #00cbc7 78%);
    mask-image: radial-gradient(ellipse 650px 440px at 50% 0%, black, transparent 100%);
    opacity: .14;
  }
  .grid {
    background-image: linear-gradient(#ffffff06 1px, transparent 1px),
                      linear-gradient(90deg, #ffffff06 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: linear-gradient(black, transparent 85%);
  }
  .logo { position: absolute; top: 80px; left: 80px; width: 300px; }
  .logo svg { display: block; width: 100%; height: auto; }
  /* These supplied paths are black; adapt only their ink for the dark canvas.
     The source file, geometry, proportions and brand gradients stay intact. */
  .logo svg path[fill="black"] { fill: white; }
  h1 {
    position: absolute; top: 223px; left: 80px; margin: 0;
    font-size: 72px; font-weight: 800; line-height: 1.12; letter-spacing: -2.8px;
  }
  h1 span { display: block; width: fit-content; white-space: nowrap; }
  .accent {
    background: linear-gradient(100deg, #c6f103, #00cbc7);
    background-clip: text; -webkit-background-clip: text; color: transparent;
  }
  .subtitle {
    position: absolute; top: 416px; left: 80px; margin: 0;
    font-size: 25px; line-height: 1.5; font-weight: 400; color: rgb(255 255 255 / 60%);
    white-space: nowrap;
  }
  .url {
    position: absolute; left: 80px; bottom: 80px; margin: 0;
    font-size: 19px; line-height: 28px; font-weight: 400; color: rgb(255 255 255 / 60%);
  }
</style></head><body>
  <div class="glow"></div><div class="grid"></div>
  <div class="logo">${logo}</div>
  <h1><span>Software que se siente</span><span class="accent">a tu medida.</span></h1>
  <p class="subtitle">Apps móviles, sistemas web y facturación electrónica SUNAT.</p>
  <p class="url">atmosferast.com</p>
</body></html>`, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  assert(await page.evaluate(() => document.fonts.check('800 72px Inter')), 'Inter failed to load')
  const bounds = await page.locator('.logo, h1 span, .subtitle, .url').evaluateAll(elements =>
    elements.map(element => {
      const { x, y, right, bottom } = element.getBoundingClientRect()
      return { text: element.textContent.trim() || 'Logo', x, y, right, bottom }
    }),
  )
  for (const box of bounds) {
    assert(box.x >= margin && box.y >= margin && box.right <= width - margin && box.bottom <= height - margin,
      `Content exceeds the safe margin: ${JSON.stringify(box)}`)
  }
  const screenshot = await page.screenshot({ type: 'png', animations: 'disabled' })
  const png = await sharp(screenshot).png({ compressionLevel: 9 }).toBuffer()
  const metadata = await sharp(png).metadata()
  assert.equal(metadata.format, 'png')
  assert.equal(metadata.width, width)
  assert.equal(metadata.height, height)
  assert(png.length < 300_000, `PNG exceeds 300 KB: ${png.length} bytes`)
  await writeFile(output, png)
  console.log(`${fileURLToPath(output)}: ${width} × ${height}, ${png.length} bytes; safe margins verified.`)
} finally {
  await browser.close()
}
