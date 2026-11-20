import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Gold, Meta, Reveal, SectionHeading } from '@/components/ui/primitives';
import { ClosingCTA, PageHero } from '@/components/layout/Chrome';
import { LinkedInIcon } from '@/components/ui/icons';
import ArchPortrait from '@/components/shared/ArchPortrait';
import { chapters, founder, mission, team, values, vision } from '@/data/content';

export default function About() {
  return (
    <>
      <Meta
        title="About"
        description="JD Business Consultancy was founded by Jony Dewson to give Sri Lankan entrepreneurs clear, honest business support."
      />
      <PageHero
        title="People who care how"
        gold="your story goes."
        lead="We are a Sri Lankan consultancy built around one idea: founders deserve the same clear, honest advice that large companies take for granted."
        ghost="JD"
      />
      <Chapters />
      <VisionMission />
      <Values />
      <Team />
      <ClosingCTA />
    </>
  );
}

function Chapters() {
  return (
    <section className="section-y border-t border-line bg-ink-900">
      <div className="container-x">
        <SectionHeading title="In four" gold="chapters." className="mb-16" />
      </div>
      <div className="container-x">
        <ol className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
          {chapters.map((c, i) => (
            <Reveal
              as="li"
              key={c.title}
              delay={i * 0.08}
              className="rim flex min-h-80 w-[80vw] shrink-0 snap-start flex-col justify-between rounded-3xl bg-ink-950/60 p-8 md:w-auto"
            >
              <span className="numeral text-8xl">0{i + 1}</span>
              <div>
                <h3 className="text-2xl font-light">{c.title}</h3>
                <p className="mt-3 text-silver-400">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function VisionMission() {
  return (
    <section className="section-y border-t border-line">
      <div className="container-x grid gap-16 md:grid-cols-2">
        {[
          ['Vision', vision],
          ['Mission', mission],
        ].map(([label, text], i) => (
          <Reveal key={label} delay={i * 0.1} className="relative">
            <span aria-hidden="true" className="gold block font-display text-[9rem] leading-[0.6]">“</span>
            <h2 className="mt-6 mb-4 font-display text-xl text-gold-300">{label}</h2>
            <p className="font-display text-3xl font-light leading-snug text-silver-50 md:text-4xl">{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="section-y border-t border-line bg-ink-900">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading title="What we" gold="stand by." />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06} className="rim rounded-3xl bg-ink-950/50 p-8 md:p-10">
              <span className="font-display text-sm text-gold-500">0{i + 1}</span>
              <h3 className="mt-6 text-3xl font-light">{v.title}</h3>
              <p className="mt-3 text-silver-400">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  const [open, setOpen] = useState(null);
  return (
    <section className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeading title="The people" gold="behind JD." className="mb-16" />

        {/* Founder dossier */}
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="mx-auto w-full max-w-sm lg:col-span-4">
            <ArchPortrait name={founder.name} />
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal as="h3" delay={0.05} className="text-5xl font-light md:text-7xl">
              <Gold glint>{founder.name}</Gold>
            </Reveal>
            <Reveal as="p" delay={0.08} className="mt-4 font-display text-xl text-silver-50">{founder.role}</Reveal>
            <Reveal as="p" delay={0.1} className="mt-2 text-sm text-silver-400">{founder.credentials}</Reveal>
            <Reveal as="p" delay={0.12} className="mt-8 max-w-xl text-lg text-silver-200">{founder.bio}</Reveal>
          </div>
        </div>

        <div className="hairline my-20" />

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal as="li" key={i} delay={i * 0.08}>
              <button
                onClick={() => setOpen(m)}
                className="group w-full text-left"
                aria-label={`Read more about ${m.name}, ${m.role}`}
              >
                <div className="rim relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink-800">
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,#2a2525,#141212)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(226,200,147,0.22),transparent_55%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <svg viewBox="0 0 200 250" className="absolute inset-x-0 bottom-0 w-full text-ink-950/80" aria-hidden="true">
                    <circle cx="100" cy="100" r="40" fill="currentColor" />
                    <path d="M24 250c6-60 38-92 76-92s70 32 76 92z" fill="currentColor" />
                  </svg>
                  {/* PLACEHOLDER photo */}
                </div>
                <p className="mt-5 font-display text-xl text-silver-50 transition-colors group-hover:text-gold-100">{m.name}</p>
                <p className="text-sm text-silver-400">{m.role}</p>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] grid place-items-center bg-ink-950/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={open.name}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl border border-line bg-ink-900 p-10"
            >
              <button
                onClick={() => setOpen(null)}
                aria-label="Close"
                autoFocus
                className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-line text-silver-200 hover:text-gold-100"
              >
                <X className="size-4" />
              </button>
              <p className="mb-3 text-sm text-gold-300">{open.role}</p>
              <h3 className="text-4xl font-light">{open.name}</h3>
              <p className="mt-2 text-sm text-silver-400">{open.credentials}</p>
              <p className="mt-6 text-silver-200">{open.bio}</p>
              <a href="#" className="mt-8 inline-flex items-center gap-2 text-sm text-gold-300 hover:text-gold-100">
                <LinkedInIcon className="size-4" /> LinkedIn profile
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
