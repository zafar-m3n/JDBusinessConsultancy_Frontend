# JD Business Consultancy: Website

React 19 + Vite, Tailwind CSS v4, framer-motion, React Bits (LightRays, CountUp, TiltedCard, Magnet).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Where things live

| What | Where |
|---|---|
| Contact details, WhatsApp number, socials | `src/data/site.js` |
| Services (6) and their copy | `src/data/services.js` |
| Team, packages, prices, FAQs, vision/mission, stats | `src/data/content.js` |
| Colour tokens, gold/silver material, rim borders | `src/index.css` |
| Global cursor light (`--lx` / `--ly`) | `src/light/LightProvider.jsx` |
| Embossed gold JD monogram | `src/light/EmbossedMark.jsx` |
| Logo SVGs | `../brand/` (the site renders the logo inline from `src/components/ui/Logo.jsx`) |

Imports use the `@/` alias for `src/` (for example `import Logo from '@/components/ui/Logo'`). It is set up in `vite.config.js` and, for editor autocomplete, in `jsconfig.json`.

## Before launch

- Replace every item marked **PLACEHOLDER** in `src/data/` (contact details, team, prices, stats, credentials).
- Replace the portrait placeholders on Home and About with real photos.
- Connect the contact form to an email service. See the `TODO` in `src/pages/Contact.jsx`.
- Review the Privacy Policy and Terms text in `src/pages/Legal.jsx`.
- Update the domain in `public/sitemap.xml` and `public/robots.txt`.
- Configure the host to serve `index.html` for all routes (SPA fallback).
