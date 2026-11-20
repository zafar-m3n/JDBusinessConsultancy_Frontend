import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/primitives';
import { services } from '@/data/services';
import { site } from '@/data/site';

const links = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services', mega: true },
  { to: '/company-registration', label: 'Company Registration' },
  { to: '/faq', label: 'FAQ' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMega(false);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
  }, [mobile]);

  useEffect(() => {
    const onKey = e => e.key === 'Escape' && (setMega(false), setMobile(false));
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openMega = () => { clearTimeout(closeTimer.current); setMega(true); };
  const closeMega = () => { closeTimer.current = setTimeout(() => setMega(false), 120); };

  const linkCls = ({ isActive }) =>
    `relative py-2 font-display text-[0.95rem] tracking-wide transition-colors hover:text-gold-100 ${
      isActive ? 'text-gold-300' : 'text-silver-200'
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Background layer kept separate so the nav content is not inside a backdrop-filter containing block */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 border-b transition-all duration-500 ${
          scrolled || mega ? 'border-line/70 bg-ink-950/80 backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      />
      <nav className="container-x relative flex h-20 items-center justify-between gap-6" aria-label="Main">
        <Link to="/" className="shrink-0" aria-label="JD Business Consultancy, home">
          <Logo className="h-12 w-auto md:h-14" />
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map(l =>
            l.mega ? (
              <li key={l.to} onMouseEnter={openMega} onMouseLeave={closeMega} className="relative">
                <div className="flex items-center gap-1">
                  <NavLink to={l.to} className={linkCls}>{l.label}</NavLink>
                  <button
                    aria-label="Show services"
                    aria-expanded={mega}
                    onClick={() => setMega(v => !v)}
                    className="p-1 text-silver-400 hover:text-gold-300"
                  >
                    <ChevronDown className={`size-4 transition-transform duration-300 ${mega ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </li>
            ) : (
              <li key={l.to}>
                <NavLink to={l.to} className={linkCls}>{l.label}</NavLink>
              </li>
            )
          )}
        </ul>

        <div className="hidden lg:block">
          <Button to="/contact" variant="outline" className="!px-6 !py-2.5" arrow>
            Free Consultation
          </Button>
        </div>

        <button
          className="grid size-11 place-items-center rounded-full border border-line text-silver-50 lg:hidden"
          aria-label={mobile ? 'Close menu' : 'Open menu'}
          aria-expanded={mobile}
          onClick={() => setMobile(v => !v)}
        >
          {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mega menu */}
      <AnimatePresence>
        {mega && (
          <motion.div
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-0 top-20 hidden border-b border-line/70 bg-ink-950/95 backdrop-blur-xl lg:block"
          >
            <div className="container-x grid grid-cols-12 gap-10 py-12">
              <div className="col-span-4">
                <p className="font-display text-3xl font-light text-silver-50">
                  Everything your business needs, <span className="gold">under one roof.</span>
                </p>
                <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-sm text-gold-300 hover:text-gold-100">
                  View all services <ArrowUpRight className="size-4" />
                </Link>
              </div>
              <ul className="col-span-8 grid grid-cols-2 gap-x-10">
                {services.map((s, i) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      className="group flex gap-5 border-b border-line py-5 transition-colors hover:border-gold-500/50"
                    >
                      <span className="font-display text-sm text-gold-500">0{i + 1}</span>
                      <span>
                        <span className="block font-display text-lg text-silver-50 transition-colors group-hover:text-gold-100">
                          {s.title}
                        </span>
                        <span className="mt-1 block text-sm leading-snug text-silver-400 line-clamp-1">{s.short}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-x-0 bottom-0 top-20 overflow-y-auto bg-ink-950 lg:hidden"
          >
            <div className="container-x flex min-h-full flex-col justify-between py-10">
              <ul className="space-y-1">
                {[{ to: '/', label: 'Home' }, ...links, { to: '/contact', label: 'Contact' }].map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      className={({ isActive }) =>
                        `flex items-baseline gap-4 border-b border-line py-4 font-display text-3xl font-light ${
                          isActive ? 'text-gold-300' : 'text-silver-50'
                        }`
                      }
                    >
                      <span className="text-xs text-gold-500">0{i + 1}</span>
                      {l.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-10 space-y-3 text-silver-400">
                <Button to="/contact" className="w-full">Get a Free Consultation</Button>
                <p className="pt-4 text-sm">{site.phone} · {site.email}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
