/**
 * Runs after `vite build`. Link-preview bots (WhatsApp, Facebook, LinkedIn, X) don't run
 * JavaScript, so they only see the HTML file the server sends. This writes one HTML file per
 * route with that page's title, description and URLs already in the <head>:
 *
 *   /                        -> dist/index.html
 *   /about                   -> dist/about.html
 *   /services/legal-consulting -> dist/services/legal-consulting.html
 *   unknown routes           -> dist/404.html (noindex)
 *
 * It also writes dist/sitemap.xml and dist/robots.txt. Route data comes from src/data/seo.js.
 * On Vercel, "cleanUrls" in vercel.json serves /about from about.html.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = path.join(root, 'dist');

// Load the route data through Vite so the @/ alias and VITE_SITE_URL resolve exactly as in the app.
// Its own cache dir and no dependency pre-bundling, so it never disturbs a running dev server.
const vite = await createServer({
  root,
  logLevel: 'error',
  appType: 'custom',
  server: { middlewareMode: true },
  cacheDir: 'node_modules/.vite-prerender',
  optimizeDeps: { noDiscovery: true, include: [] },
});
const { pages, notFound, fullTitle } = await vite.ssrLoadModule('/src/data/seo.js');
await vite.close();

const siteUrl = process.env.VITE_SITE_URL;
const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');

const escape = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Replace the value of one head tag; fail the build loudly if the tag is missing from index.html.
const replaceTag = (html, pattern, value, label) => {
  if (!pattern.test(html)) throw new Error(`prerender: ${label} tag not found in dist/index.html`);
  return html.replace(pattern, (_, before, after) => `${before}${escape(value)}${after}`);
};

const render = page => {
  const title = fullTitle(page.title);
  const url = siteUrl + (page.path === '/' ? '/' : page.path);
  let html = template;
  html = replaceTag(html, /(<title>)[\s\S]*?(<\/title>)/, title, 'title');
  html = replaceTag(html, /(<meta\s+name="description"\s+content=")[^"]*(")/, page.description, 'description');
  html = replaceTag(html, /(<meta\s+name="robots"\s+content=")[^"]*(")/, page.noindex ? 'noindex, follow' : 'index, follow', 'robots');
  html = replaceTag(html, /(<link\s+rel="canonical"\s+href=")[^"]*(")/, url, 'canonical');
  html = replaceTag(html, /(<meta\s+property="og:url"\s+content=")[^"]*(")/, url, 'og:url');
  html = replaceTag(html, /(<meta\s+property="og:title"\s+content=")[^"]*(")/, title, 'og:title');
  html = replaceTag(html, /(<meta\s+property="og:description"\s+content=")[^"]*(")/, page.description, 'og:description');
  html = replaceTag(html, /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, title, 'twitter:title');
  html = replaceTag(html, /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, page.description, 'twitter:description');
  return html;
};

const write = async (file, html) => {
  const target = path.join(dist, file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, html);
};

for (const page of pages) {
  await write(page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`, render(page));
}
await write('404.html', render(notFound));

await write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map(p => `  <url><loc>${siteUrl}${p.path === '/' ? '/' : p.path}</loc></url>`)
    .join('\n')}\n</urlset>\n`
);
await write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

console.log(`prerender: wrote ${pages.length} pages + 404, sitemap.xml and robots.txt for ${siteUrl}`);
