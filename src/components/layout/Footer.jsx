import { Link } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import { WhatsAppButton } from '@/components/ui/primitives';
import { FacebookIcon, InstagramIcon, LinkedInIcon } from '@/components/ui/icons';
import { services } from '@/data/services';
import { site } from '@/data/site';

const company = [
  { to: '/about', label: 'About' },
  { to: '/company-registration', label: 'Company Registration' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms & Conditions' },
];

const socials = [
  { href: site.socials.facebook, label: 'Facebook', Icon: FacebookIcon },
  { href: site.socials.instagram, label: 'Instagram', Icon: InstagramIcon },
  { href: site.socials.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-950">
      <div className="container-x grid gap-x-16 gap-y-12 pt-20 pb-12 text-[15px] leading-relaxed md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo className="h-12 w-auto" />
          <p className="mt-6 max-w-xs text-silver-400">{site.description}</p>
          <ul className="mt-8 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="rim grid size-10 place-items-center rounded-full text-silver-200 transition-colors hover:text-gold-100"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="eyebrow mb-5 !text-[0.68rem]">Services</h3>
          <ul className="space-y-2.5">
            {services.map(s => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="text-silver-200 transition-colors hover:text-gold-100">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="eyebrow mb-5 !text-[0.68rem]">Company</h3>
          <ul className="space-y-2.5">
            {company.map(l => (
              <li key={l.to}>
                <Link to={l.to} className="text-silver-200 transition-colors hover:text-gold-100">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="eyebrow mb-5 !text-[0.68rem]">Contact</h3>
          <address className="space-y-2.5 not-italic text-silver-200">
            {site.phones.map(p => (
              <a key={p.href} href={p.href} className="block hover:text-gold-100">
                {p.display} <span className="text-silver-400">· {p.label}</span>
              </a>
            ))}
            <a href={`mailto:${site.email}`} className="block break-all hover:text-gold-100">{site.email}</a>
            <p className="text-silver-400">{site.hours}</p>
          </address>
          <WhatsAppButton className="mt-6 !px-4 !py-2 !text-sm" />
        </div>
      </div>

      <div className="container-x">
        <div className="hairline" />
        <div className="flex flex-col gap-2 py-6 text-[13px] text-silver-400 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Registered in Sri Lanka</p>
        </div>
      </div>

      {/* Oversized wordmark, lit by the global light */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden pb-6 pt-4">
        <p className="gold whitespace-nowrap text-center font-display text-[7.5vw] font-medium leading-[1.1] tracking-[-0.02em] opacity-90">
          JD CONSULTANCY
        </p>
      </div>
    </footer>
  );
}
