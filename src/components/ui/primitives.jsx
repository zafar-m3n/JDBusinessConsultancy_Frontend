import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/icons';
import { site, whatsappLink } from '@/data/site';
import { fullTitle, getSeo } from '@/data/seo';

/* ---------- Emphasis: the bold half of a light/bold pair, as on the business card ----------
   `glint` adds the accent underline highlight (used once per hero or closing statement). */
export function Strong({ as: Tag = 'span', glint = false, className = '', children }) {
  return <Tag className={`strong ${glint ? 'mark' : ''} ${className}`}>{children}</Tag>;
}

/* ---------- Buttons ---------- */
const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-display text-[0.95rem] tracking-wide transition-[transform,background-color,color,box-shadow] duration-300 ease-lux active:scale-[0.98]';
const variants = {
  accent:
    'px-7 py-3.5 text-white font-medium bg-accent-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_26px_-10px_rgba(217,56,30,0.65)] hover:bg-accent-600 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_16px_36px_-10px_rgba(217,56,30,0.75)] hover:-translate-y-0.5',
  outline: 'rim bg-white px-7 py-3.5 text-silver-50 hover:text-accent-600 hover:-translate-y-0.5',
  ghost: 'px-2 py-2 text-silver-50 hover:text-accent-600',
};

export function Button({ to, href, variant = 'accent', className = '', children, arrow = false, ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <button className={cls} {...rest}>{inner}</button>;
}

export function WhatsAppButton({ text, className = '', label = 'Chat on WhatsApp' }) {
  return (
    <a
      href={whatsappLink(text)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants.outline} ${className}`}
    >
      <WhatsAppIcon className="size-4 text-silver-50 transition-colors group-hover:text-accent-500" />
      <span>{label}</span>
    </a>
  );
}

/* ---------- Reveal on scroll ---------- */
export function Reveal({ as = 'div', delay = 0, y = 24, className = '', children, ...rest }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </M>
  );
}

/* ---------- Headline that reveals word by word ---------- */
export function WordsReveal({ text, className = '', wordClassName = '', delay = 0, stagger = 0.06 }) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pt-[0.15em] -mt-[0.15em] pb-[0.25em] -mb-[0.25em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: delay + i * stagger }}
          >
            <span className={wordClassName}>{w}</span>
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ---------- Section heading ---------- */
export function SectionHeading({ title, strong, lead, className = '' }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <Reveal as="h2" delay={0.05} className="text-4xl font-light tracking-[-0.02em] md:text-6xl">
        {title} {strong && <Strong>{strong}</Strong>}
      </Reveal>
      {lead && (
        <Reveal as="p" delay={0.1} className="mt-6 text-lg text-silver-400">
          {lead}
        </Reveal>
      )}
    </div>
  );
}

/* ---------- Page meta ----------
   Titles and descriptions live in src/data/seo.js. The build writes them into each route's
   HTML file (scripts/prerender.js); this component keeps the head in sync as the visitor
   navigates inside the app, updating the existing tags rather than adding duplicates. */
const setAttr = (selector, attr, value) => document.head.querySelector(selector)?.setAttribute(attr, value);

export function Meta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const { title, description, noindex } = getSeo(pathname);
    const full = fullTitle(title);
    const url = site.url + (pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/');
    document.title = full;
    setAttr('meta[name="description"]', 'content', description);
    setAttr('meta[name="robots"]', 'content', noindex ? 'noindex, follow' : 'index, follow');
    setAttr('link[rel="canonical"]', 'href', url);
    setAttr('meta[property="og:url"]', 'content', url);
    setAttr('meta[property="og:title"]', 'content', full);
    setAttr('meta[property="og:description"]', 'content', description);
    setAttr('meta[name="twitter:title"]', 'content', full);
    setAttr('meta[name="twitter:description"]', 'content', description);
  }, [pathname]);
  return null;
}
