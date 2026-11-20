// PLACEHOLDER contact details — replace with the real ones before launch.
export const site = {
  name: 'JD Business Consultancy',
  shortName: 'JD',
  tagline: 'Business consultancy for Sri Lankan startups and SMEs.',
  description:
    'JD Business Consultancy helps entrepreneurs register, run and grow their businesses in Sri Lanka, from company registration and bookkeeping to tax, legal and growth strategy.',
  phone: '+94 77 000 0000',
  phoneHref: 'tel:+94770000000',
  whatsapp: '94770000000',
  email: 'hello@jdbusinessconsultancy.lk',
  address: 'No. 00, Main Street, Colombo 00, Sri Lanka',
  hours: 'Mon – Fri · 8:30 AM – 5:30 PM',
  socials: {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
  },
};

export const whatsappLink = (text = 'Hello JD Business Consultancy, I would like to know more about your services.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
