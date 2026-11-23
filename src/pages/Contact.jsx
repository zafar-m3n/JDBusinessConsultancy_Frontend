import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Clock, Mail, Phone } from 'lucide-react';
import { Gold, Meta, Reveal } from '@/components/ui/primitives';
import { WhatsAppIcon } from '@/components/ui/icons';
import Select from '@/components/ui/Select';
import { services } from '@/data/services';
import { site, whatsappLink } from '@/data/site';

const inputCls =
  'w-full rounded-xl border border-line bg-ink-900/60 px-4 py-3 font-display text-base text-silver-50 outline-none transition-colors placeholder:text-silver-400/70 focus:border-gold-500/70 aria-[invalid=true]:border-[#d97757]';

function Field({ label, id, error, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex justify-between font-display text-sm text-silver-200">
        {label}
        {optional && <span className="text-silver-400">Optional</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1.5 text-sm text-[#e59a7d]">{error}</p>}
    </div>
  );
}

/** Builds the WhatsApp message from the form, e.g. "Hello JD Business Consultancy, I'm Amal. I'd like help with ..." */
const buildMessage = ({ name, service, message }, pkg) => {
  const lines = [`Hello JD Business Consultancy, I'm ${name.trim()}.`];
  const title = services.find(s => s.slug === service)?.title;
  if (title) lines.push(`I'd like help with ${title}${pkg ? ` (${pkg} package)` : ''}.`);
  if (message.trim()) lines.push('', message.trim());
  return lines.join('\n');
};

export default function Contact() {
  const [params] = useSearchParams();
  const pkg = params.get('package');
  const pkgName = pkg ? pkg[0].toUpperCase() + pkg.slice(1) : null;
  const [form, setForm] = useState({
    name: '',
    service: services.some(s => s.slug === params.get('service')) ? params.get('service') : '',
    message: '',
  });
  const [touched, setTouched] = useState(false);

  const nameError = !form.name.trim() && 'Please enter your name';
  const showError = touched && nameError;
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const send = e => {
    e.preventDefault();
    setTouched(true);
    if (nameError) return;
    window.open(whatsappLink(buildMessage(form, pkgName)), '_blank', 'noopener,noreferrer');
  };

  const details = [
    ...site.phones.map(p => ({ Icon: Phone, label: p.label, value: p.display, href: p.href })),
    { Icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { Icon: Clock, label: 'Hours', value: site.hours },
  ];

  return (
    <>
      <Meta />

      <section className="relative overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(201,164,92,0.14),transparent_65%)]"
        />
        <div className="container-x relative grid gap-16 lg:grid-cols-12">
          {/* Intro + details */}
          <div className="lg:col-span-5">
            <Reveal as="h1" className="text-5xl font-light md:text-7xl">
              Let's <Gold glint className="font-normal">talk.</Gold>
            </Reveal>
            <Reveal as="p" delay={0.05} className="mt-6 max-w-md text-lg text-silver-400">
              Tell us a little about what you need and we'll continue the conversation on WhatsApp. The first
              consultation is free.
            </Reveal>
            <Reveal as="ul" delay={0.1} className="mt-12 space-y-5">
              {details.map(({ Icon, label, value, href }) => (
                <li key={value} className="flex items-start gap-4">
                  <Icon className="mt-1 size-5 shrink-0 text-gold-300" strokeWidth={1.5} />
                  <div>
                    <p className="font-display text-sm text-silver-400">{label}</p>
                    {href ? (
                      <a href={href} className="break-words font-display text-silver-50 hover:text-gold-100">{value}</a>
                    ) : (
                      <span className="font-display text-silver-50">{value}</span>
                    )}
                  </div>
                </li>
              ))}
            </Reveal>
          </div>

          {/* WhatsApp message builder */}
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <form onSubmit={send} noValidate className="rim space-y-5 rounded-3xl bg-ink-900/50 p-6 md:p-10">
              <div className="flex items-center gap-3 pb-2">
                <span className="grid size-10 place-items-center rounded-full bg-gold-500/15">
                  <WhatsAppIcon className="size-5 text-gold-300" />
                </span>
                <p className="font-display text-lg text-silver-50">Message us on WhatsApp</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" id="c-name" error={showError}>
                  <input
                    id="c-name"
                    autoComplete="name"
                    value={form.name}
                    onChange={set('name')}
                    aria-invalid={!!showError}
                    aria-describedby={showError ? 'c-name-err' : undefined}
                    className={inputCls}
                  />
                </Field>
                <Field label="Service" id="c-service" optional>
                  <Select
                    inputId="c-service"
                    value={form.service}
                    onChange={v => setForm(f => ({ ...f, service: v }))}
                    placeholder="Not sure yet"
                    options={[{ value: '', label: 'Not sure yet' }, ...services.map(s => ({ value: s.slug, label: s.title }))]}
                  />
                </Field>
              </div>
              <Field label="Message" id="c-msg" optional>
                <textarea
                  id="c-msg"
                  rows={5}
                  value={form.message}
                  onChange={set('message')}
                  placeholder="How can we help?"
                  className={`${inputCls} resize-none`}
                />
              </Field>
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#f3e2b3_0%,#d9b873_45%,#b48c46_100%)] px-7 py-3.5 font-display text-[0.95rem] font-medium tracking-wide text-ink-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_30px_-10px_rgba(201,164,92,0.6)] transition-[transform,box-shadow] duration-300 ease-lux hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_14px_40px_-8px_rgba(201,164,92,0.8)] active:scale-[0.98]"
              >
                <WhatsAppIcon className="size-4" />
                Send on WhatsApp
              </button>
              <p className="text-center text-sm text-silver-400">
                Opens WhatsApp with your message ready to send to {site.phones[0].display}.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
