export const site = {
  name: 'JD Business Consultancy',
  shortName: 'JD',
  url: import.meta.env.VITE_SITE_URL, // set in vite.config.js
  tagline: 'Business consultancy for Sri Lankan startups and SMEs.',
  description:
    'JD Business Consultancy helps entrepreneurs register, run and grow their businesses in Sri Lanka, from company registration and bookkeeping to tax, legal and growth strategy.',
  phones: [
    { label: 'Sri Lanka', display: '+94 76 809 9608', href: 'tel:+94768099608' },
    { label: 'Sweden', display: '+46 72 446 90 92', href: 'tel:+46724469092' },
  ],
  whatsapp: '94768099608', // Sri Lanka number, international format without "+"
  email: 'jony.d@jdbusinessconsultancy.com',
  hours: 'Mon – Fri · 8:30 AM – 5:30 PM (Sri Lanka time)',
  // PLACEHOLDER: social profile links to be added
  socials: {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
  },
};

export const whatsappLink = (text = 'Hello JD Business Consultancy, I would like to know more about your services.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
