import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { Button, Meta, Reveal } from '@/components/ui/primitives';
import { ClosingCTA, PageHero } from '@/components/layout/Chrome';
import { services } from '@/data/services';

export default function Services() {
  const [active, setActive] = useState(services[0].slug);

  useEffect(() => {
    const els = services.map(s => document.getElementById(s.slug)).filter(Boolean);
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Meta
        title="Services"
        description="Business registration, bookkeeping, tax, legal consulting, digital marketing and strategy for Sri Lankan businesses."
      />
      <PageHero
        title="Everything your business needs,"
        gold="under one roof."
        lead="Six services, delivered by one team that already knows your business. Start with one, add the others as you grow."
        ghost="06"
      />

      <section className="border-t border-line">
        <div className="container-x grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          {/* Sticky contents */}
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label="Services contents" className="sticky top-32">
              <ol className="relative space-y-1 border-l border-line">
                {services.map((s, i) => {
                  const on = active === s.slug;
                  return (
                    <li key={s.slug}>
                      <a
                        href={`#${s.slug}`}
                        className={`relative -ml-px flex gap-3 border-l py-2.5 pl-5 text-sm transition-colors ${
                          on ? 'border-gold-300 text-gold-100' : 'border-transparent text-silver-400 hover:text-silver-50'
                        }`}
                      >
                        {on && <span className="absolute -left-[3px] top-1/2 size-[5px] -translate-y-1/2 rounded-full bg-gold-100 shadow-[0_0_10px_#e2c893]" />}
                        <span className="font-display text-gold-500">0{i + 1}</span>
                        {s.title}
                      </a>
                    </li>
                  );
                })}
              </ol>
              <Button to="/contact" variant="outline" className="mt-10 !px-5 !py-2.5 text-sm" arrow>
                Not sure? Ask us
              </Button>
            </nav>
          </aside>

          {/* Sections */}
          <div className="space-y-24 lg:col-span-8 lg:col-start-5 lg:space-y-28">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <article key={s.slug} id={s.slug} className="scroll-mt-32">
                  <Reveal className="flex items-start justify-between gap-6">
                    <span className="numeral text-6xl md:text-7xl">0{i + 1}</span>
                    <span className="rim grid size-14 shrink-0 place-items-center rounded-full text-gold-300">
                      <Icon className="size-6" strokeWidth={1.3} />
                    </span>
                  </Reveal>
                  <Reveal as="h2" className="mt-6 text-3xl font-light md:text-5xl">{s.title}</Reveal>
                  <Reveal as="p" delay={0.05} className="mt-5 max-w-2xl text-lg text-silver-200">{s.statement}</Reveal>
                  <Reveal as="p" delay={0.08} className="mt-4 max-w-2xl text-silver-400">{s.intro}</Reveal>

                  <div className="mt-12 grid gap-10 md:grid-cols-2">
                    <Reveal delay={0.1}>
                      <h3 className="font-display text-xl text-silver-50 mb-5">What's included</h3>
                      <ul className="space-y-3">
                        {s.includes.map(item => (
                          <li key={item} className="flex gap-3 text-silver-200">
                            <Check className="mt-1 size-4 shrink-0 text-gold-500" /> {item}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                    <Reveal delay={0.14}>
                      <h3 className="font-display text-xl text-silver-50 mb-5">Ideal for</h3>
                      <ul className="flex flex-wrap gap-2">
                        {s.audience.map(a => (
                          <li key={a} className="rounded-full border border-line px-4 py-2 text-sm text-silver-200">{a}</li>
                        ))}
                      </ul>
                      <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <dt className="text-silver-400">Timeline</dt>
                          <dd className="mt-1 font-display text-lg text-silver-50">{s.timeline}</dd>
                        </div>
                        <div>
                          <dt className="text-silver-400">Starting from</dt>
                          <dd className="mt-1 font-display text-lg text-silver-50">{s.startingFrom}</dd>
                        </div>
                      </dl>
                    </Reveal>
                  </div>
                  <Reveal delay={0.1} className="mt-12">
                    <Button to={`/services/${s.slug}`} variant="outline" arrow>Explore {s.title}</Button>
                  </Reveal>
                  <div className="hairline-gold mt-16 lg:mt-24" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ClosingCTA title="Not sure where" gold="to start?" />
    </>
  );
}
