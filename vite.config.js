import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

/*
 * The public address of the site, used for canonical URLs, sitemap and social-preview
 * images (which must be absolute URLs). In order of preference:
 *  1. SITE_URL, if set
 *  2. the Vercel production domain (custom domain once connected, otherwise *.vercel.app)
 *  3. the final domain
 * It is exposed to the app and index.html as VITE_SITE_URL.
 */
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'https://jdbusinessconsultancy.com'
).replace(/\/+$/, '')
process.env.VITE_SITE_URL = siteUrl

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
