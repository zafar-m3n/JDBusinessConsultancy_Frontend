// Team, packages, FAQs and company copy. Items marked PLACEHOLDER need real content.

export const founder = {
  name: 'Jony Dewson',
  role: 'Founder & Principal Consultant',
  credentials: 'ACA, BSc (Accounting)', // PLACEHOLDER credentials
  bio: 'Jony founded JD Business Consultancy to give Sri Lankan entrepreneurs the kind of clear, honest advice usually reserved for large companies. He works closely with every client, from first registration through to growth planning.', // PLACEHOLDER
  note: [
    'Starting a business is exciting. The paperwork, the tax rules and the legal questions usually are not.',
    'I started JD Business Consultancy so founders could hand those things to people they trust, and get back to building. We keep our pricing clear, our advice plain and our promises realistic.',
    'Whatever stage you are at, I would be glad to hear about what you are building.',
  ],
};

// PLACEHOLDER team members
export const team = [
  {
    name: 'Team Member',
    role: 'Senior Accountant',
    credentials: 'Professional qualifications', // PLACEHOLDER
    bio: 'Brings hands-on experience helping Sri Lankan startups and SMEs stay organised, compliant and ready to grow.', // PLACEHOLDER bio
  },
  {
    name: 'Team Member',
    role: 'Legal & Compliance Consultant',
    credentials: 'Professional qualifications', // PLACEHOLDER
    bio: 'Brings hands-on experience helping Sri Lankan startups and SMEs stay organised, compliant and ready to grow.', // PLACEHOLDER bio
  },
  {
    name: 'Team Member',
    role: 'Digital Marketing Lead',
    credentials: 'Professional qualifications', // PLACEHOLDER
    bio: 'Brings hands-on experience helping Sri Lankan startups and SMEs stay organised, compliant and ready to grow.', // PLACEHOLDER bio
  },
];

export const vision = 'To be the most trusted partner for entrepreneurs building lasting businesses in Sri Lanka.'; // PLACEHOLDER
export const mission =
  'To make starting, running and growing a business simple, with clear advice, honest pricing and people who care about the outcome.'; // PLACEHOLDER

export const values = [
  { title: 'Integrity', text: 'Honest advice and clear pricing, even when it is not what you hoped to hear.' },
  { title: 'Clarity', text: 'Plain language, no jargon, and answers you can act on.' },
  { title: 'Responsiveness', text: 'Quick replies and realistic timelines that we keep.' },
  { title: 'Partnership', text: 'We measure our success by how far your business goes.' },
];

export const chapters = [
  { title: 'Founded', text: 'JD Business Consultancy was started by Jony Dewson to make professional business support accessible to every founder.' },
  { title: 'Who we serve', text: 'Startups, SMEs, sole proprietors and investors who want things done properly from the start.' },
  { title: 'How we work', text: 'One point of contact, clear fixed pricing where possible, and regular updates until the job is done.' },
  { title: 'Where we are going', text: 'Growing alongside our clients, adding the services they ask for as their businesses grow.' },
];

// PLACEHOLDER stats
export const stats = [
  { value: 60, suffix: '+', label: 'Companies registered' },
  { value: 10, suffix: '+', label: 'Years of combined experience' },
  { value: 6, suffix: '', label: 'Services under one roof' },
  { value: 14, suffix: '', label: 'Days, maximum, to register' },
];

// PLACEHOLDER prices (government fees excluded)
export const packages = [
  {
    name: 'Essential',
    price: '35,000',
    blurb: 'Everything you need to get your company legally registered.',
    features: ['Name search & reservation', 'Incorporation forms prepared', 'Standard Articles of Association', 'Certificate of Incorporation'],
  },
  {
    name: 'Business',
    price: '55,000',
    popular: true,
    blurb: 'Registered and ready to trade, with your first year of secretarial support.',
    features: [
      'Everything in Essential',
      'Free company secretary for the first year',
      'Share certificates & company seal',
      'TIN registration with IRD',
      'Bank account opening guidance',
    ],
  },
  {
    name: 'Complete',
    price: '85,000',
    blurb: 'A full launch: registration, tax, books and your first online presence.',
    features: [
      'Everything in Business',
      'VAT / tax registration support',
      '3 months of bookkeeping',
      '1 legal consultation session',
      'Social media page setup',
    ],
  },
];

export const comparison = [
  ['Name search & reservation', true, true, true],
  ['Incorporation forms prepared', true, true, true],
  ['Standard Articles of Association', true, true, true],
  ['Certificate of Incorporation', true, true, true],
  ['Company secretary (first year)', false, 'Free', 'Free'],
  ['Share certificates & company seal', false, true, true],
  ['TIN registration with IRD', false, true, true],
  ['Bank account opening guidance', false, true, true],
  ['VAT / tax registration support', false, false, true],
  ['3 months of bookkeeping', false, false, true],
  ['1 legal consultation session', false, false, true],
  ['Social media page setup', false, false, true],
  ['Timeline', '7–14 days', '7–14 days', '7–14 days'],
];

export const registrationDocs = {
  'Directors & shareholders': [
    'Full name as per NIC',
    'Copy of NIC (both sides)',
    'Occupation',
    'Residential address',
    'Email and mobile number',
    'Share structure (who owns what)',
  ],
  'Company details': [
    'Proposed company name (2–3 options)',
    'Nature of business',
    'Registered office address',
    'Company email and phone number',
  ],
};

export const faqCategories = [
  {
    name: 'General',
    items: [
      { q: 'Who do you work with?', a: 'Startups, SMEs, sole proprietors and investors across Sri Lanka, from first-time founders to established companies.' },
      { q: 'Do I need to visit your office?', a: 'No. Most of our work can be done online, over WhatsApp, email and phone. You are always welcome to visit if you prefer.' },
      { q: 'How do you charge?', a: 'Registration is offered as fixed packages. Ongoing services such as bookkeeping and marketing are quoted monthly after a free consultation.' },
      { q: 'Is the first consultation free?', a: 'Yes. Tell us what you need and we will explain your options and costs, with no obligation.' },
    ],
  },
  {
    name: 'Registration',
    items: [
      { q: 'How long does company registration take?', a: 'Usually 7 to 14 working days once we have your complete documents.' },
      { q: 'Are government fees included in the package price?', a: 'No. Government fees are charged separately at cost, and we tell you the amount upfront.' },
      { q: 'What happens after the free secretary year?', a: 'You can continue with our company secretary service at an annual fee, or appoint your own secretary.' },
      { q: 'Can a foreigner register a company in Sri Lanka?', a: 'Yes. Additional documents are needed, and we guide you through each step.' },
    ],
  },
  {
    name: 'Accounting & Tax',
    items: [
      { q: 'Can you take over from my current accountant?', a: 'Yes. We handle the handover and make sure nothing is missed.' },
      { q: 'Do you file personal tax returns?', a: 'Yes, for individuals and self-employed professionals as well as companies.' },
    ],
  },
  {
    name: 'Legal',
    items: [
      { q: 'Can you register my trademark?', a: 'Yes. We search, file and follow up on trademark applications.' },
      { q: 'Can you help change directors or shareholders?', a: 'Yes. We prepare and file the required forms with the Registrar of Companies.' },
    ],
  },
  {
    name: 'Marketing',
    items: [
      { q: 'Which platforms do you manage?', a: 'Facebook, Instagram and LinkedIn, plus online advertising campaigns.' },
      { q: 'Is there a minimum commitment?', a: 'Our monthly packages usually start with a three-month term so results have time to build.' },
    ],
  },
  {
    name: 'Strategy',
    items: [
      { q: 'Do you prepare business plans for banks?', a: 'Yes, including feasibility studies and financial projections.' },
      { q: 'Do you run training for teams?', a: 'Yes. Workshops are tailored to your industry and goals.' },
    ],
  },
];
