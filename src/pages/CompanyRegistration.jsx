import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import TiltedCard from '@/components/reactbits/TiltedCard';
import Accordion from '@/components/ui/Accordion';
import { Button, Strong, Meta, Reveal, SectionHeading, WhatsAppButton } from '@/components/ui/primitives';
import { ClosingCTA } from '@/components/layout/Chrome';
import Diamonds from '@/light/Diamonds';
import PackageCards from '@/components/shared/PackageCards';
import { comparison, faqCategories, packages, registrationDocs } from '@/data/content';

export default function CompanyRegistration() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 400);
  }, [hash]);

  return (
    <>
      <Meta />
      <Hero />
      <Process />
      <Packages />
      <Documents />
      <Timeline />
      <section className="section-y border-t border-line">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading title="Before you" strong="register." />
          </div>
          <Reveal className="lg:col-span-7 lg:col-start-6">
            <Accordion items={faqCategories[1].items} />
          </Reveal>
        </div>
      </section>
      <ClosingCTA title="Ready to make it" strong="official?" />
    </>
  );
}

/* ---------- Hero with tilting certificate ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <Diamonds preset="side" />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-sm text-silver-50 shadow-sm">
            <span className="size-1.5 rotate-45 bg-accent-500" /> No hidden fees
          </Reveal>
          <Reveal as="h1" delay={0.05} className="text-5xl font-light tracking-[-0.02em] md:text-7xl">
            Register your <Strong glint>Private Limited</Strong> company.
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-8 max-w-xl text-lg text-silver-400 md:text-xl">
            We handle the name search, the forms and the filing. You receive your Certificate of Incorporation in 7 to
            14 working days.
          </Reveal>
          <Reveal delay={0.15} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="#packages" arrow>View packages</Button>
            <WhatsAppButton text="Hello JD Business Consultancy, I would like to register a company." />
          </Reveal>
        </div>
        <Reveal delay={0.1} className="flex justify-center lg:col-span-6">
          <TiltedCard
            containerHeight="calc(min(520px, 88vw) * 0.72 + 40px)"
            containerWidth="100%"
            imageWidth="min(520px, 88vw)"
            imageHeight="calc(min(520px, 88vw) * 0.72)"
            rotateAmplitude={10}
            scaleOnHover={1.03}
            showTooltip={false}
            flipOnClick={false}
            glare={0.35}
            glareColor="#ffffff"
            radius={18}
            trackWindow
          >
            <Certificate />
          </TiltedCard>
        </Reveal>
      </div>
    </section>
  );
}

function Certificate() {
  // Sized with container-query units so it scales with the card.
  return (
    <div className="@container absolute inset-0 bg-[linear-gradient(160deg,#ffffff,#f1f1f0)]">
      <div className="absolute inset-0 flex flex-col justify-between px-[8cqw] py-[7cqw]">
        <div className="pointer-events-none absolute inset-[3cqw] rounded-[12px] border border-silver-50/25" />
        <div className="pointer-events-none absolute inset-[4.5cqw] rounded-[10px] border border-silver-50/10" />
        <div className="relative text-center">
          <p className="text-[1.9cqw] uppercase tracking-[0.35em] text-silver-400">Democratic Socialist Republic of Sri Lanka</p>
          <p className="mt-[2cqw] font-display text-[5cqw] font-semibold uppercase leading-tight tracking-[0.1em] text-silver-50">
            Certificate of Incorporation
          </p>
          <p className="mt-[1cqw] text-[2cqw] text-silver-400">Companies Act No. 07 of 2007</p>
        </div>
        <div className="relative text-center">
          <p className="text-[2.1cqw] text-silver-400">This is to certify that</p>
          <p className="font-script text-[6.4cqw] leading-tight text-silver-50">Your Company (Private) Limited</p>
          <p className="text-[2cqw] text-silver-400">is duly incorporated</p>
        </div>
        <div className="relative flex items-end justify-between">
          <div className="text-left text-[1.8cqw] leading-relaxed text-silver-400">
            <p>Reg. No. PV 000000</p>
            <p>Registrar of Companies</p>
          </div>
          {/* Vermilion wax seal */}
          <div className="relative grid aspect-square w-[15cqw] place-items-center rounded-full bg-[conic-gradient(from_200deg,#8f200f,#e8573c,#b42a14,#e04a2e,#8f200f,#d9381e,#8f200f)] shadow-[0_6px_16px_rgba(143,32,15,0.35),inset_0_1px_0_rgba(255,255,255,0.35)]">
            <div className="grid size-[78%] place-items-center rounded-full border border-white/30 bg-[radial-gradient(circle_at_35%_30%,#ee6a4f,#d9381e_55%,#a12611)]">
              <span className="font-display text-[3.4cqw] font-bold tracking-wider text-white/90">JD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 3-step process with filling line ---------- */
const steps = [
  { title: 'Name your company', text: 'Share two or three name ideas. We check availability and reserve the best one.' },
  { title: 'Submit your NIC', text: 'Send NIC copies and a few details. We prepare every form for you to sign.' },
  { title: 'Receive your certificate', text: 'We file with the Registrar of Companies and deliver your certificate.' },
];

function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'center 0.5'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <section ref={ref} className="section-y border-t border-line bg-ink-900">
      <div className="container-x">
        <SectionHeading title="Three steps." strong="That's it." className="mb-20" />
        <div className="relative">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-line md:block" aria-hidden="true">
            <motion.div style={{ scaleX: fill }} className="h-px origin-left bg-accent-500" />
          </div>
          <ol className="grid gap-12 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.1} className="relative">
                <span className="relative grid size-14 place-items-center rounded-full border border-line bg-white font-display font-medium text-silver-50 shadow-sm">
                  0{i + 1}
                </span>
                <h3 className="mt-8 text-3xl font-light">{s.title}</h3>
                <p className="mt-3 max-w-sm text-silver-400">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- Packages with compare toggle ---------- */
function Packages() {
  const [compare, setCompare] = useState(false);
  return (
    <section id="packages" className="section-y scroll-mt-20 border-t border-line">
      <div className="container-x">
        <div id="compare" className="mb-16 flex scroll-mt-28 flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            title="Choose your"
            strong="package."
            lead="Prices exclude government fees, which we always quote upfront."
          />
          <div role="tablist" aria-label="Package view" className="rim inline-flex shrink-0 rounded-full bg-white p-1">
            {['Cards', 'Compare all'].map((l, i) => {
              const on = compare === (i === 1);
              return (
                <button
                  key={l}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setCompare(i === 1)}
                  className={`rounded-full px-5 py-2 font-display text-sm transition-colors ${
                    on ? 'bg-silver-50 text-white' : 'text-silver-200 hover:text-accent-600'
                  }`}
                >
                  {l}
                </button>
              );
            })}
          </div>
        </div>

        {compare ? <CompareTable /> : <PackageCards />}
      </div>
    </section>
  );
}

function CompareTable() {
  const cell = v =>
    v === true ? (
      <Check className="mx-auto size-5 text-silver-50" aria-label="Included" />
    ) : v === false ? (
      <Minus className="mx-auto size-4 text-silver-400/50" aria-label="Not included" />
    ) : (
      <span className="font-medium text-accent-600">{v}</span>
    );
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rim overflow-x-auto rounded-3xl bg-white">
      <table className="w-full min-w-[640px] text-left">
        <thead>
          <tr className="border-b border-line">
            <th className="p-6 font-display font-normal text-silver-400">Feature</th>
            {packages.map(p => (
              <th key={p.name} className="p-6 text-center">
                <span className={`block font-display text-xl font-semibold uppercase tracking-[0.08em] ${p.popular ? 'text-accent-500' : 'text-silver-50'}`}>{p.name}</span>
                <span className="text-sm font-normal text-silver-400">LKR {p.price}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.map(([label, ...vals]) => (
            <tr key={label} className="border-b border-line/60 last:border-0">
              <td className="p-5 pl-6 text-silver-200">{label}</td>
              {vals.map((v, i) => (
                <td key={i} className={`p-5 text-center ${packages[i].popular ? 'bg-accent-100/50' : ''}`}>{cell(v)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

/* ---------- Interactive documents checklist ---------- */
function Documents() {
  const all = useMemo(() => Object.values(registrationDocs).flat(), []);
  const [have, setHave] = useState(() => new Set());
  const pct = have.size / all.length;
  const toggle = item =>
    setHave(prev => {
      const n = new Set(prev);
      if (n.has(item)) n.delete(item);
      else n.add(item);
      return n;
    });

  const R = 54;
  const C = 2 * Math.PI * R;

  return (
    <section className="section-y border-t border-line bg-ink-900">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              title="Are you"
              strong="ready?"
              lead="Tick what you already have. Anything missing, we'll help you prepare."
            />
            <Reveal delay={0.1} className="mt-10 flex items-center gap-6">
              <svg viewBox="0 0 128 128" className="size-32 -rotate-90" aria-hidden="true">
                <circle cx="64" cy="64" r={R} fill="none" stroke="var(--color-line)" strokeWidth="6" />
                <motion.circle
                  cx="64"
                  cy="64"
                  r={R}
                  fill="none"
                  stroke="url(#ring)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  animate={{ strokeDashoffset: C * (1 - pct) }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
                <defs>
                  <linearGradient id="ring" x1="0" x2="1">
                    <stop offset="0" stopColor="#b42a14" />
                    <stop offset="1" stopColor="#e8573c" />
                  </linearGradient>
                </defs>
              </svg>
              <div aria-live="polite">
                <p className="font-display text-5xl font-normal text-accent-500">{Math.round(pct * 100)}%</p>
                <p className="text-sm text-silver-400">{have.size} of {all.length} ready</p>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:col-span-7 lg:col-start-6">
          {Object.entries(registrationDocs).map(([group, items]) => (
            <Reveal key={group}>
              <h3 className="font-display text-xl text-silver-50 mb-6">{group}</h3>
              <ul className="space-y-2">
                {items.map(item => {
                  const on = have.has(item);
                  return (
                    <li key={item}>
                      <label
                        className={`flex cursor-pointer items-center gap-4 rounded-2xl border px-5 py-4 transition-colors ${
                          on ? 'border-accent-500 bg-white text-silver-50 shadow-sm' : 'border-line bg-white/60 text-silver-200 hover:border-silver-400/60'
                        }`}
                      >
                        <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(item)} />
                        <span
                          className={`grid size-6 shrink-0 place-items-center rounded-md border transition-colors ${
                            on ? 'border-accent-500 bg-accent-500 text-white' : 'border-silver-400/50'
                          }`}
                        >
                          {on && <Check className="size-4" strokeWidth={3} />}
                        </span>
                        {item}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Timeline & payment ---------- */
const timeline = [
  { when: 'Day 1', title: 'Consultation & advance', text: 'Confirm your package and pay the name reservation advance.' },
  { when: 'Days 1–3', title: 'Name reserved', text: 'Your company name is checked and reserved.' },
  { when: 'Days 3–7', title: 'Documents signed', text: 'We prepare the forms; you review and sign. Balance due before filing.' },
  { when: 'Days 7–14', title: 'Certificate issued', text: 'Filed with the ROC and your certificate delivered.' },
];

function Timeline() {
  return (
    <section className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeading title="What happens," strong="and when." className="mb-16" />
        <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.title} delay={i * 0.08} className="bg-white p-8">
              <p className="font-display text-sm font-medium tracking-[0.2em] text-silver-400 uppercase">{t.when}</p>
              <h3 className="mt-6 text-2xl font-light">{t.title}</h3>
              <p className="mt-3 text-silver-400">{t.text}</p>
            </Reveal>
          ))}
        </ol>
        {/* PLACEHOLDER: timeline and payment terms to be confirmed by JD Business Consultancy */}
      </div>
    </section>
  );
}
