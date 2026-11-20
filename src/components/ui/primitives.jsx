import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/icons';
import { site, whatsappLink } from '@/data/site';

/* ---------- Gold / silver text ---------- */
export function Gold({ as: Tag = 'span', glint = false, className = '', children }) {
  return <Tag className={`gold ${glint ? 'gold-glint' : ''} ${className}`}>{children}</Tag>;
}

/* ---------- Buttons ---------- */
const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-display text-[0.95rem] tracking-wide transition-[transform,background-color,color,box-shadow] duration-300 ease-lux active:scale-[0.98]';
const variants = {
  gold:
    'px-7 py-3.5 text-ink-950 font-medium bg-[linear-gradient(180deg,#f3e2b3_0%,#d9b873_45%,#b48c46_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_30px_-10px_rgba(201,164,92,0.6)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_14px_40px_-8px_rgba(201,164,92,0.8)] hover:-translate-y-0.5',
  outline: 'rim px-7 py-3.5 text-silver-50 hover:text-gold-100',
  ghost: 'px-2 py-2 text-silver-50 hover:text-gold-300',
};

export function Button({ to, href, variant = 'gold', className = '', children, arrow = false, ...rest }) {
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
      <WhatsAppIcon className="size-4 text-gold-300" />
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
export function SectionHeading({ title, gold, lead, className = '' }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <Reveal as="h2" delay={0.05} className="text-4xl font-light md:text-6xl">
        {title} {gold && <Gold className="font-normal">{gold}</Gold>}
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
   index.html holds the site-wide SEO tags. Each page updates those same tags in place
   (rather than adding duplicates) so the title, description, canonical URL and social
   URL always describe the current page. */
const setAttr = (selector, attr, value) => document.head.querySelector(selector)?.setAttribute(attr, value);

export function Meta({ title, description = site.description, noindex = false }) {
  const { pathname } = useLocation();
  useEffect(() => {
    const full = title ? `${title} · ${site.name}` : `${site.name} · Business Consultants in Sri Lanka`;
    const url = site.url + pathname;
    document.title = full;
    setAttr('meta[name="description"]', 'content', description);
    setAttr('meta[name="robots"]', 'content', noindex ? 'noindex, follow' : 'index, follow');
    setAttr('link[rel="canonical"]', 'href', url);
    setAttr('meta[property="og:url"]', 'content', url);
    setAttr('meta[property="og:title"]', 'content', full);
    setAttr('meta[property="og:description"]', 'content', description);
    setAttr('meta[name="twitter:title"]', 'content', full);
    setAttr('meta[name="twitter:description"]', 'content', description);
  }, [title, description, noindex, pathname]);
  return null;
}
