import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import LightRays from '@/components/reactbits/LightRays';
import CountUp from '@/components/reactbits/CountUp';
import EmbossedMark from '@/light/EmbossedMark';
import Accordion from '@/components/ui/Accordion';
import { Button, Gold, Meta, Reveal, SectionHeading, WhatsAppButton, WordsReveal } from '@/components/ui/primitives';
import { ClosingCTA } from '@/components/layout/Chrome';
import ArchPortrait from '@/components/shared/ArchPortrait';
import PackageCards from '@/components/shared/PackageCards';
import { services } from '@/data/services';
import { faqCategories, founder } from '@/data/content';
import { site } from '@/data/site';

export default function Home() {
  return (
    <>
      <Meta description={site.description} />
      <Hero />
      <Manifesto />
      <ServicesIndex />
      <RegistrationStory />
      <WhyBento />
      <FounderNote />
      <PackagesPreview />
      <FaqPreview />
      <ClosingCTA />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Hero: centred stage, a beam of light falling on the monogram     */
/* ------------------------------------------------------------------ */
const ease = [0.22, 1, 0.36, 1];

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Light beam from above */}
      <div className="absolute inset-0 opacity-80" aria-hidden="true">
        {!reduce && (
          <LightRays
            raysOrigin="top-center"
            raysColor="#e9cf98"
            raysSpeed={0.5}
            lightSpread={0.55}
            rayLength={1.6}
            intensity={0.6}
            glow={0.55}
            haze={0.25}
            followMouse
            mouseInfluence={0.06}
            cursorShadow={false}
            clickPulse={false}
          />
        )}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-ink-950"
      />

      <div className="container-x relative flex flex-1 flex-col items-center justify-center pt-28 pb-8 text-center">
        {/* Monogram on a lit stage, inside slow orbit rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease }}
          className="relative grid place-items-center"
        >
          <OrbitRings reduce={reduce} />
          <div
            aria-hidden="true"
            className="absolute size-[70%] rounded-full bg-[radial-gradient(circle,rgba(201,164,92,0.28),transparent_65%)] blur-2xl"
          />
          <EmbossedMark className="relative h-[clamp(130px,24vh,230px)] w-auto drop-shadow-[0_30px_40px_rgba(0,0,0,0.65)]" />
          {/* reflection on the floor */}
          <div
            aria-hidden="true"
            className="absolute -bottom-6 h-6 w-[60%] rounded-[100%] bg-[radial-gradient(ellipse,rgba(226,200,147,0.35),transparent_70%)] blur-md"
          />
        </motion.div>

        <h1 className="mt-14 text-[clamp(2.9rem,6.6vw,6.75rem)] font-light leading-[1.02] tracking-[-0.03em]">
          <WordsReveal text="Built right." wordClassName="silver" className="inline-block" delay={0.3} />{' '}
          <WordsReveal text="From day one." wordClassName="gold gold-glint font-normal" className="inline-block" delay={0.5} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease }}
          className="mx-auto mt-8 max-w-2xl text-lg text-silver-400 md:text-xl"
        >
          Company registration, bookkeeping, tax, legal, marketing and strategy, handled by one team that treats
          your business like its own.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.95, ease }}
          className="mt-10 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row"
        >
          <Button to="/contact" arrow>Get a Free Consultation</Button>
          <WhatsAppButton />
        </motion.div>
      </div>

      <div className="container-x relative pb-10">
        <div className="hairline mb-6" />
        <ul className="flex flex-col items-center gap-3 font-display text-sm text-silver-400 md:flex-row md:justify-center md:gap-10">
          {['Registration in 7–14 working days', 'No hidden fees', 'Six services, one team'].map((f, i) => (
            <motion.li
              key={f}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.12, duration: 0.8 }}
              className="flex items-center gap-3"
            >
              <span className="size-1.5 rounded-full bg-gold-500 shadow-[0_0_10px_rgba(201,164,92,0.8)]" />
              {f}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function OrbitRings({ reduce }) {
  const ring = 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full';
  const inner = 'size-[clamp(190px,32vh,310px)]';
  const outer = 'size-[clamp(260px,44vh,430px)]';
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className={`${ring} ${inner} border border-gold-500/15`} />
      <div className={`${ring} ${outer} border border-gold-500/10 max-sm:hidden`} />
      {/* The rotating wrappers are centred with margins rather than transforms, so rotation doesn't fight the centring */}
      <div className={`absolute left-1/2 top-1/2 max-sm:hidden ${outer} -ml-[calc(clamp(260px,44vh,430px)/2)] -mt-[calc(clamp(260px,44vh,430px)/2)]`}>
        <motion.div
          className="size-full"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-100 shadow-[0_0_14px_4px_rgba(226,200,147,0.7)]" />
        </motion.div>
      </div>
      <div className={`absolute left-1/2 top-1/2 ${inner} -ml-[calc(clamp(190px,32vh,310px)/2)] -mt-[calc(clamp(190px,32vh,310px)/2)]`}>
        <motion.div
          className="size-full"
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute bottom-0 left-1/2 size-1 -translate-x-1/2 translate-y-1/2 rounded-full bg-gold-300 shadow-[0_0_10px_3px_rgba(226,200,147,0.6)]" />
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Promise: words light up as you scroll                            */
/* ------------------------------------------------------------------ */
// Each segment: [text, isGold]. Punctuation sits outside the gold phrases.
const promise = [
  ['You bring the idea. We take care of the', 0],
  ['registration', 1],
  [', the', 0],
  ['accounts', 1],
  [', the', 0],
  ['tax', 1],
  ['and the', 0],
  ['law', 1],
  [', so you can focus on', 0],
  ['building a business that lasts', 1],
  ['.', 0],
];

// Flatten to words. Punctuation attaches to the previous word (so it never starts a line)
// but keeps the plain colour instead of the gold.
const promiseWords = [];
for (const [text, gold] of promise) {
  for (const w of text.split(' ').filter(Boolean)) {
    if (/^[.,]$/.test(w[0]) && promiseWords.length) {
      promiseWords[promiseWords.length - 1].punct += w[0];
      const rest = w.slice(1);
      if (rest) promiseWords.push({ w: rest, gold: !!gold, punct: '' });
    } else {
      promiseWords.push({ w, gold: !!gold, punct: '' });
    }
  }
}

function Manifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] });
  const n = promiseWords.length;
  return (
    <section ref={ref} className="container-x section-y">
      <p className="mx-auto max-w-6xl text-center font-display text-[clamp(2rem,4.4vw,4.2rem)] font-light leading-[1.25] tracking-[-0.01em]">
        {promiseWords.map((word, i) => (
          <ScrollWord key={i} progress={scrollYProgress} range={[i / n, Math.min(1, (i + 1.5) / n)]} {...word} />
        ))}
      </p>
    </section>
  );
}

function ScrollWord({ w, gold, punct, progress, range }) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <>
      {' '}
      <span className="relative inline-block">
        {/* dim base keeps the layout and reads as unlit */}
        <span className="text-silver-50/[0.12]">{w}{punct}</span>
        {/* lit copy fades in on top, so gold ends as crisp gold rather than a muddy blend */}
        <motion.span style={{ opacity }} aria-hidden="true" className="absolute inset-0 whitespace-nowrap">
          <span className={gold ? 'gold' : 'text-silver-50'}>{w}</span>
          <span className="text-silver-50">{punct}</span>
        </motion.span>
      </span>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Services index                                                   */
/* ------------------------------------------------------------------ */
function ServicesIndex() {
  const [active, setActive] = useState(null);

  return (
    <section className="section-y relative border-t border-line">
      <div className="container-x">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading title="Six services." gold="One trusted team." />
          <Reveal>
            <Link to="/services" className="inline-flex items-center gap-2 text-gold-300 hover:text-gold-100">
              All services <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <ul onMouseLeave={() => setActive(null)} className="relative border-t border-line">
          {services.map((s, i) => {
            const open = active === i;
            return (
              <li key={s.slug} className="relative border-b border-line" onMouseEnter={() => setActive(i)}>
                <button
                  onClick={() => setActive(open ? null : i)}
                  aria-expanded={open}
                  className="grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 py-7 text-left md:grid-cols-[6rem_1fr_auto] md:py-9"
                >
                  <span className="font-display text-sm text-gold-500 md:text-base">0{i + 1}</span>
                  <span
                    className={`font-display text-2xl font-light leading-[1.3] transition-colors duration-500 md:text-5xl md:leading-[1.25] ${
                      open ? 'gold' : 'text-silver-50'
                    }`}
                  >
                    {s.title}
                  </span>
                  <ArrowUpRight
                    className={`size-6 transition-all duration-500 ${open ? 'rotate-45 text-gold-300' : 'text-silver-400'}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-10 md:grid-cols-[6rem_1fr_1fr] md:gap-10">
                        <span />
                        <p className="max-w-md text-lg text-silver-200">{s.short}</p>
                        <div>
                          <ul className="space-y-2 text-silver-400">
                            {s.includes.slice(0, 3).map(item => (
                              <li key={item} className="flex gap-3">
                                <Check className="mt-1 size-4 shrink-0 text-gold-500" /> {item}
                              </li>
                            ))}
                          </ul>
                          <Link
                            to={`/services/${s.slug}`}
                            className="mt-6 inline-flex items-center gap-2 font-display text-gold-300 hover:text-gold-100"
                          >
                            Explore {s.title} <ArrowUpRight className="size-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Registration story — sticky left, scrolling steps right          */
/* ------------------------------------------------------------------ */
const regSteps = [
  { n: '01', title: 'Name your company', text: 'Send us two or three name ideas. We check availability and reserve the best one for you.' },
  { n: '02', title: 'Submit your NIC', text: 'For most companies, NIC copies and a few details are all we need. We prepare every form.' },
  { n: '03', title: 'Receive your certificate', text: 'We file with the Registrar of Companies and deliver your Certificate of Incorporation.' },
];

function RegistrationStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.6', 'end 0.6'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section ref={ref} className="section-y relative border-t border-line bg-ink-900">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2 className="text-4xl font-light md:text-6xl">
              Your company, registered in <Gold className="font-normal">7–14 days.</Gold>
            </h2>
            <p className="mt-6 max-w-md text-lg text-silver-400">
              Three simple steps, clear packages and no hidden fees. Government fees are always shown upfront.
            </p>
            <div className="mt-10 flex items-end gap-3">
              <span className="text-sm text-silver-400">From</span>
              <Gold className="font-display text-5xl">LKR 35,000</Gold>
            </div>
            <Button to="/company-registration" className="mt-10" arrow>See packages</Button>
          </div>
        </div>

        <div className="relative lg:col-span-6 lg:col-start-7">
          <div className="absolute left-[1.15rem] top-0 h-full w-px bg-line md:left-[1.65rem]" aria-hidden="true">
            <motion.div
              style={{ scaleY: fill }}
              className="h-full w-px origin-top bg-gradient-to-b from-gold-100 via-gold-500 to-gold-700 shadow-[0_0_12px_rgba(201,164,92,0.8)]"
            />
          </div>
          <ol className="space-y-24 md:space-y-40">
            {regSteps.map(s => (
              <Reveal as="li" key={s.n} className="relative pl-16 md:pl-24">
                <span className="absolute left-0 top-0 grid size-10 place-items-center rounded-full border border-gold-500/60 bg-ink-900 font-display text-sm text-gold-300 md:size-14">
                  {s.n}
                </span>
                <h3 className="text-3xl font-light md:text-4xl">{s.title}</h3>
                <p className="mt-4 max-w-md text-lg text-silver-400">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Why JD — bento                                                   */
/* ------------------------------------------------------------------ */
function WhyBento() {
  const tile = 'rim rounded-3xl bg-ink-900/60 p-8 md:p-10';
  return (
    <section className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeading title="Advice you can trust," gold="pricing you can see." className="mb-16" />
        <div className="grid gap-5 md:grid-cols-6 lg:grid-cols-12">
          <Reveal className={`${tile} flex min-h-80 flex-col justify-between md:col-span-6 lg:col-span-5 lg:row-span-2`}>
            <span aria-hidden="true" />
            <div>
              <p className="font-display text-[clamp(5rem,12vw,10rem)] font-light leading-none">
                <span className="gold">
                  <CountUp to={60} duration={2} />+
                </span>
              </p>
              {/* PLACEHOLDER figure */}
              <p className="mt-4 font-display text-2xl text-silver-50">Companies registered</p>
              <p className="mt-2 max-w-xs text-silver-400">Founders who trusted us with their first and most important step.</p>
            </div>
          </Reveal>
          <Reveal delay={0.05} className={`${tile} md:col-span-3 lg:col-span-4`}>
            <p className="font-display text-3xl font-light text-silver-50">No hidden fees.</p>
            <p className="mt-3 text-silver-400">Fixed packages, with government fees shown upfront before you commit.</p>
          </Reveal>
          <Reveal delay={0.1} className={`${tile} md:col-span-3 lg:col-span-3`}>
            <p className="font-display text-6xl font-light"><Gold>7–14</Gold></p>
            <p className="mt-3 text-silver-400">Working days to register your company.</p>
          </Reveal>
          <Reveal delay={0.1} className={`${tile} md:col-span-3 lg:col-span-3`}>
            <p className="font-display text-3xl font-light text-silver-50">Qualified professionals.</p>
            <p className="mt-3 text-silver-400">Accountants, legal and marketing specialists on one team.</p>
          </Reveal>
          <Reveal delay={0.15} className={`${tile} md:col-span-3 lg:col-span-4`}>
            <p className="font-display text-3xl font-light text-silver-50">One partner.</p>
            <p className="mt-3 text-silver-400">From registration to your first hire, your first tax return and your next market.</p>
            <ul className="mt-6 flex gap-2">
              {services.map(({ slug, icon: Icon, title }) => (
                <li key={slug} title={title} className="grid size-10 place-items-center rounded-full border border-line text-gold-300">
                  <Icon className="size-4" strokeWidth={1.4} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Founder's note                                                   */
/* ------------------------------------------------------------------ */
function FounderNote() {
  return (
    <section className="section-y relative overflow-hidden border-t border-line bg-ink-900">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12">
        <Reveal className="mx-auto w-full max-w-sm lg:col-span-4 lg:col-start-2">
          <ArchPortrait name={founder.name} />
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal as="h2" delay={0.05} className="text-4xl font-light md:text-5xl">
            “Get back to <Gold className="font-normal">building.</Gold>”
          </Reveal>
          <div className="mt-8 space-y-5 text-lg text-silver-200">
            {founder.note.map((p, i) => (
              <Reveal as="p" key={i} delay={0.1 + i * 0.05}>{p}</Reveal>
            ))}
          </div>
          <Reveal delay={0.25} className="mt-10">
            {/* Side padding keeps the script J swash inside the painted (gold) area */}
            <p className="gold -ml-[0.35em] inline-block px-[0.35em] font-script text-6xl leading-[1.4]">{founder.name}</p>
            <p className="mt-3 text-sm tracking-wide text-silver-400">{founder.role}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Packages preview                                                 */
/* ------------------------------------------------------------------ */
function PackagesPreview() {
  return (
    <section className="section-y border-t border-line">
      <div className="container-x">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading title="Three ways" gold="to start." />
          <Reveal>
            <Link to="/company-registration#compare" className="inline-flex items-center gap-2 text-gold-300 hover:text-gold-100">
              Compare all features <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>
        <PackageCards />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 8. FAQ preview                                                      */
/* ------------------------------------------------------------------ */
function FaqPreview() {
  return (
    <section className="section-y border-t border-line">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading title="Good" gold="questions." />
            <Reveal delay={0.1}>
              <Link to="/faq" className="mt-8 inline-flex items-center gap-2 text-gold-300 hover:text-gold-100">
                All FAQs <ArrowUpRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
        <Reveal className="lg:col-span-7 lg:col-start-6">
          <Accordion items={faqCategories[0].items} />
        </Reveal>
      </div>
    </section>
  );
}
