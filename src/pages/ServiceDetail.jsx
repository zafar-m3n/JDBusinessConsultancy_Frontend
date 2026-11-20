import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button, Gold, Meta, Reveal, WhatsAppButton } from '@/components/ui/primitives';
import { ClosingCTA } from '@/components/layout/Chrome';
import Accordion from '@/components/ui/Accordion';
import { getService, services } from '@/data/services';
import NotFound from '@/pages/NotFound';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);
  if (!service) return <NotFound />;

  const index = services.indexOf(service);
  const next = services[(index + 1) % services.length];
  const Icon = service.icon;

  return (
    <>
      <Meta title={service.title} description={service.short} />

      {/* Header */}
      <section className="relative overflow-hidden pt-40 pb-16 md:pt-48 md:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 size-[640px] rounded-full bg-[radial-gradient(circle,rgba(201,164,92,0.14),transparent_65%)]"
        />
        <div className="container-x relative">
          <Reveal className="mb-10 flex items-center gap-4 text-sm text-silver-400">
            <Link to="/services" className="hover:text-gold-100">Services</Link>
            <span className="h-px w-8 bg-line" />
            <span className="font-display tracking-[0.3em] text-gold-300">
              0{index + 1} / 0{services.length}
            </span>
          </Reveal>
          <Reveal as="h1" className="max-w-5xl text-4xl font-light md:text-7xl">
            <Gold glint className="font-normal">{service.title}</Gold>
          </Reveal>
          <Reveal as="p" delay={0.08} className="mt-8 max-w-2xl text-xl text-silver-200 md:text-2xl">
            {service.statement}
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="border-t border-line">
        <div className="container-x grid gap-14 py-20 lg:grid-cols-12 lg:py-28">
          <aside className="lg:col-span-4">
            <div className="rim space-y-8 rounded-3xl bg-ink-900/70 p-8 lg:sticky lg:top-32">
              <span className="grid size-14 place-items-center rounded-full border border-gold-500/40 text-gold-300">
                <Icon className="size-6" strokeWidth={1.3} />
              </span>
              <dl className="space-y-6">
                <div>
                  <dt className="mb-2 text-sm text-silver-400">Who it's for</dt>
                  <dd>
                    <ul className="space-y-1 text-silver-200">
                      {service.audience.map(a => <li key={a}>{a}</li>)}
                    </ul>
                  </dd>
                </div>
                <div className="hairline" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="mb-2 text-sm text-silver-400">Timeline</dt>
                    <dd className="font-display text-lg text-silver-50">{service.timeline}</dd>
                  </div>
                  <div>
                    <dt className="mb-2 text-sm text-silver-400">From</dt>
                    <dd className="font-display text-lg text-silver-50">{service.startingFrom}</dd>
                  </div>
                </div>
              </dl>
              <div className="space-y-3">
                <Button to={`/contact?service=${service.slug}`} className="w-full" arrow>Free consultation</Button>
                <WhatsAppButton
                  className="w-full"
                  text={`Hello JD Business Consultancy, I'm interested in ${service.title}.`}
                />
              </div>
            </div>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal as="p" className="font-display text-xl font-light leading-snug text-silver-50 md:text-2xl">
              {service.intro}
            </Reveal>

            <Reveal className="mt-16">
              <h2 className="mb-8 text-3xl font-light">What's included</h2>
              <ul className="grid gap-x-8 sm:grid-cols-2">
                {service.includes.map(item => (
                  <li key={item} className="flex gap-4 border-b border-line py-4 text-silver-200">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gold-500/15">
                      <Check className="size-3.5 text-gold-300" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-20">
              <h2 className="mb-10 text-3xl font-light">How it works</h2>
              <ol className="grid gap-8 sm:grid-cols-2">
                {service.process.map((p, i) => (
                  <li key={p.title} className="relative">
                    <span className="numeral block text-6xl">0{i + 1}</span>
                    <h3 className="mt-3 text-2xl font-light">{p.title}</h3>
                    <p className="mt-2 text-silver-400">{p.text}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal className="mt-20">
              <h2 className="mb-6 text-3xl font-light">Common questions</h2>
              <Accordion items={service.faqs} defaultOpen={-1} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Next service */}
      <Link
        to={`/services/${next.slug}`}
        className="group relative block overflow-hidden border-t border-line"
      >
        <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(226,200,147,0.10),transparent)] transition-transform duration-1000 ease-lux group-hover:translate-x-full" />
        <div className="container-x flex items-center justify-between gap-6 py-14 md:py-20">
          <div>
            <p className="mb-3 text-sm text-silver-400">Next service</p>
            <p className="font-display text-3xl font-light text-silver-50 transition-colors duration-500 group-hover:text-gold-100 md:text-6xl">
              {next.title}
            </p>
          </div>
          <span className="rim grid size-16 shrink-0 place-items-center rounded-full text-gold-300 transition-transform duration-500 group-hover:translate-x-2 md:size-20">
            <ArrowRight className="size-6" />
          </span>
        </div>
      </Link>

      <ClosingCTA />
    </>
  );
}
