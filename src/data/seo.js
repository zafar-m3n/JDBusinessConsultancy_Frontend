import { site } from '@/data/site';
import { services } from '@/data/services';

/**
 * Title and description for every route. Used in two places:
 * - at runtime by <Meta /> to update the head when the route changes
 * - at build time by scripts/prerender.js to write one HTML file per route,
 *   so link previews (WhatsApp, Facebook, LinkedIn, X) show the right page details
 */
export const pages = [
  { path: '/', title: null, description: site.description },
  {
    path: '/about',
    title: 'About',
    description: 'JD Business Consultancy was founded by Jony Dewson to give Sri Lankan entrepreneurs clear, honest business support.',
  },
  {
    path: '/services',
    title: 'Services',
    description: 'Business registration, bookkeeping, tax, legal consulting, digital marketing and strategy for Sri Lankan businesses.',
  },
  ...services.map(s => ({ path: `/services/${s.slug}`, title: s.title, description: s.short })),
  {
    path: '/company-registration',
    title: 'Company Registration in Sri Lanka',
    description: 'Register your Private Limited company in Sri Lanka in 7–14 working days. Three clear packages, no hidden fees.',
  },
  {
    path: '/faq',
    title: 'FAQ',
    description: 'Answers to common questions about company registration, accounting, tax, legal and marketing services.',
  },
  {
    path: '/contact',
    title: 'Contact',
    description: 'Book a free consultation with JD Business Consultancy, or chat with us on WhatsApp.',
  },
  { path: '/privacy-policy', title: 'Privacy Policy', description: `Privacy Policy for ${site.name}.` },
  { path: '/terms', title: 'Terms & Conditions', description: `Terms & Conditions for ${site.name}.` },
];

export const notFound = { path: '/404', title: 'Page not found', description: site.description, noindex: true };

export const fullTitle = title => (title ? `${title} · ${site.name}` : `${site.name} · Business Consultants in Sri Lanka`);

export const getSeo = pathname => {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return pages.find(p => p.path === path) ?? notFound;
};
