import { Strong, Meta, Reveal, SectionHeading } from '@/components/ui/primitives';
import { ClosingCTA, PageHero } from '@/components/layout/Chrome';
import ArchPortrait from '@/components/shared/ArchPortrait';
import { chapters, founder, mission, values, vision } from '@/data/content';

export default function About() {
  return (
    <>
      <Meta />
      <PageHero
        title="People who care how"
        strong="your story goes."
        lead="We are a Sri Lankan consultancy built around one idea: founders deserve the same clear, honest advice that large companies take for granted."
        ghost="JD"
      />
      <Chapters />
      <VisionMission />
      <Values />
      <Founder />
      <ClosingCTA />
    </>
  );
}

function Chapters() {
  return (
    <section className="section-y border-t border-line bg-ink-900">
      <div className="container-x">
        <SectionHeading title="In four" strong="chapters." className="mb-16" />
      </div>
      <div className="container-x">
        <ol className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
          {chapters.map((c, i) => (
            <Reveal
              as="li"
              key={c.title}
              delay={i * 0.08}
              className="rim flex min-h-80 w-[80vw] shrink-0 snap-start flex-col justify-between rounded-3xl bg-white p-8 md:w-auto"
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
            <span aria-hidden="true" className="block font-display text-[9rem] font-semibold leading-[0.6] text-accent-500">“</span>
            <h2 className="eyebrow mt-6 mb-4">{label}</h2>
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
          <SectionHeading title="What we" strong="stand by." />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06} className="rim rounded-3xl bg-white p-8 md:p-10">
              <span className="font-display text-sm text-silver-400">0{i + 1}</span>
              <h3 className="mt-6 text-3xl font-light">{v.title}</h3>
              <p className="mt-3 text-silver-400">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeading title="The person" strong="behind JD." className="mb-16" />
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="mx-auto w-full max-w-sm lg:col-span-4">
            <ArchPortrait name={founder.name} role={founder.role} />
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal as="h3" delay={0.05} className="text-5xl font-light md:text-7xl">
              <span className="uppercase tracking-[0.04em]">
                {founder.name.split(' ')[0]} <Strong glint>{founder.name.split(' ').slice(1).join(' ')}</Strong>
              </span>
            </Reveal>
            <Reveal as="p" delay={0.08} className="eyebrow mt-5 !text-sm">{founder.role}</Reveal>
            <Reveal as="p" delay={0.1} className="mt-3 font-display text-sm tracking-wide text-silver-200">{founder.credentials}</Reveal>
            <Reveal as="p" delay={0.12} className="mt-8 max-w-xl text-lg text-silver-200">{founder.bio}</Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
