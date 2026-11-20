import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WhatsAppIcon } from '@/components/ui/icons';
import { Button, Gold, Reveal, WhatsAppButton } from '@/components/ui/primitives';
import Magnet from '@/components/reactbits/Magnet';
import { whatsappLink } from '@/data/site';

/* Floating WhatsApp button */
export function WhatsAppFab() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="group fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[linear-gradient(180deg,#f3e2b3,#c9a45c_55%,#9c7836)] text-ink-950 shadow-[0_12px_32px_-8px_rgba(201,164,92,0.7),inset_0_1px_0_rgba(255,255,255,0.6)] md:bottom-8 md:right-8"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-gold-500/30 [animation-duration:3s]" aria-hidden="true" />
          <WhatsAppIcon className="relative size-7" />
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full border border-line bg-ink-900 px-4 py-2 text-sm text-silver-50 opacity-0 transition-opacity group-hover:opacity-100 md:block">
            Chat on WhatsApp
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* Page hero used by inner pages */
export function PageHero({ title, gold, lead, ghost, children }) {
  return (
    <section className="relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28">
      {ghost && (
        <p
          aria-hidden="true"
          className="numeral pointer-events-none absolute -right-4 top-24 select-none text-[28vw] opacity-40 md:text-[18vw]"
        >
          {ghost}
        </p>
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 size-[640px] rounded-full bg-[radial-gradient(circle,rgba(201,164,92,0.14),transparent_65%)]"
      />
      <div className="container-x relative">
        <Reveal as="h1" delay={0.05} className="max-w-4xl text-4xl font-light md:text-6xl lg:text-7xl">
          {title} {gold && <Gold glint className="font-normal">{gold}</Gold>}
        </Reveal>
        {lead && (
          <Reveal as="p" delay={0.12} className="mt-8 max-w-2xl text-lg text-silver-400 md:text-xl">
            {lead}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

/* Closing call to action on every page */
export function ClosingCTA({ title = "Let's build something", gold = 'that lasts.' }) {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(201,164,92,0.16),transparent_65%)]"
      />
      <div className="container-x section-y relative text-center">
        <Reveal as="h2" delay={0.05} className="mx-auto max-w-5xl text-4xl font-light md:text-7xl">
          {title} <Gold glint className="font-normal">{gold}</Gold>
        </Reveal>
        <Reveal delay={0.15} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Magnet padding={80} magnetStrength={3}>
            <Button to="/contact" arrow className="!px-9 !py-4 text-base">Book your free consultation</Button>
          </Magnet>
          <WhatsAppButton />
        </Reveal>
      </div>
    </section>
  );
}
