// Post-build: renders every route to static HTML (dist/<route>.html) so crawlers
// and Meta reviewers get the full text without running JavaScript.
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')
const serverDir = path.join(root, 'dist-server')
const origin = 'https://atmosferast.com'

const { render, routes } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)
const template = await readFile(path.join(dist, 'index.html'), 'utf8')

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${origin}/#organization`,
    name: 'Atmósfera Soluciones Tecnológicas',
    alternateName: 'Atmósfera',
    url: origin,
    logo: `${origin}/logo-mark-square.svg`,
    image: `${origin}/logo-mark-square.svg`,
    description: 'Desarrollo de software a medida, apps móviles, sistemas web y facturación electrónica SUNAT.',
    telephone: '+51908069776',
    email: 'atmosfera.soltec@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Prol. Luis Massaro 118',
      addressLocality: 'Chincha Alta',
      addressRegion: 'Ica',
      addressCountry: 'PE',
    },
    areaServed: ['Perú', 'Latinoamérica'],
    knowsAbout: ['Software a medida', 'Aplicaciones móviles', 'Sistemas web', 'Facturación electrónica SUNAT'],
    sameAs: ['https://instagram.com/atmosfera.soltec', 'https://tiktok.com/@atmosfera.soltec'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Atmósfera',
    url: origin,
    inLanguage: 'es-PE',
  },
]
const ldScript = `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`

// Sin precargas de fuentes ni del chunk de animación: se midieron con Lighthouse
// (móvil, red lenta simulada) y competían por ancho de banda con el CSS y el
// bundle principal, retrasando FCP y LCP ~0,4 s.

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

for (const r of routes) {
  const canonical = origin + (r.path === '/' ? '/' : r.path)
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(r.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(r.description)}$2`)
    .replace(
      '</head>',
      `    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Atmósfera" />
    <meta property="og:locale" content="es_PE" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${esc(r.title)}" />
    <meta property="og:description" content="${esc(r.description)}" />
    <meta property="og:image" content="${origin}/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
${r.path === '/' ? `    ${ldScript}\n` : ''}  </head>`,
    )
    .replace('<div id="root"></div>', `<div id="root">${render(r.path)}</div>`)
  if (!html.includes('id="root">') || html.includes('<div id="root"></div>')) throw new Error(`Prerender failed for ${r.path}`)
  const file = r.path === '/' ? 'index.html' : `${r.path.slice(1)}.html`
  await mkdir(path.dirname(path.join(dist, file)), { recursive: true })
  await writeFile(path.join(dist, file), html)
  console.log('prerendered', r.path, '->', file)
}

const urls = routes.map((r) => `  <url><loc>${origin}${r.path === '/' ? '/' : r.path}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>`).join('\n')
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`)
await rm(serverDir, { recursive: true, force: true })
