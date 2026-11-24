import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WhatsAppIcon } from '@/components/ui/icons';
import { Button, Strong, Reveal, WhatsAppButton } from '@/components/ui/primitives';
import Magnet from '@/components/reactbits/Magnet';
import { whatsappLink } from '@/data/site';
import Diamonds from '@/light/Diamonds';

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
          className="group fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-accent-500 text-white shadow-[0_12px_32px_-8px_rgba(217,56,30,0.6),inset_0_1px_0_rgba(255,255,255,0.25)] transition-colors hover:bg-accent-600 md:bottom-8 md:right-8"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-accent-500/25 [animation-duration:3s]" aria-hidden="true" />
          <WhatsAppIcon className="relative size-7" />
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full border border-line bg-white px-4 py-2 text-sm text-silver-50 shadow-sm opacity-0 transition-opacity group-hover:opacity-100 md:block">
            Chat on WhatsApp
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* Page hero used by inner pages */
export function PageHero({ title, strong, lead, ghost, children }) {
  return (
    <section className="relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28">
      <Diamonds preset="side" />
      {ghost && (
        <p
          aria-hidden="true"
          className="numeral pointer-events-none absolute -right-4 top-24 z-[5] select-none text-[28vw] opacity-60 md:text-[18vw]"
        >
          {ghost}
        </p>
      )}
      <div className="container-x relative">
        <Reveal as="h1" delay={0.05} className="max-w-4xl text-4xl font-light tracking-[-0.02em] md:text-6xl lg:text-7xl">
          {title} {strong && <Strong glint>{strong}</Strong>}
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
export function ClosingCTA({ title = "Let's build something", strong = 'that lasts.' }) {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <Diamonds preset="band" fade={false} />
      <div className="container-x section-y relative text-center">
        <Reveal as="h2" delay={0.05} className="mx-auto max-w-5xl text-4xl font-light tracking-[-0.02em] md:text-7xl">
          {title} <Strong glint>{strong}</Strong>
        </Reveal>
        <div className="hairline-glint mx-auto mt-10 w-[min(80%,560px)]" aria-hidden="true" />
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
