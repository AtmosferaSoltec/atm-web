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

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

for (const r of routes) {
  const canonical = origin + (r.path === '/' ? '/' : r.path)
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(r.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(r.description)}$2`)
    .replace('</head>', `    <link rel="canonical" href="${canonical}" />\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${render(r.path)}</div>`)
  if (!html.includes('id="root">') || html.includes('<div id="root"></div>')) throw new Error(`Prerender failed for ${r.path}`)
  const file = r.path === '/' ? 'index.html' : `${r.path.slice(1)}.html`
  await mkdir(path.dirname(path.join(dist, file)), { recursive: true })
  await writeFile(path.join(dist, file), html)
  console.log('prerendered', r.path, '->', file)
}

const urls = routes.map((r) => `  <url><loc>${origin}${r.path === '/' ? '/' : r.path}</loc></url>`).join('\n')
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`)
await rm(serverDir, { recursive: true, force: true })
