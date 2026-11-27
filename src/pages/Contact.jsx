import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Clock, Mail, Phone } from 'lucide-react';
import { Strong, Meta, Reveal } from '@/components/ui/primitives';
import { WhatsAppIcon } from '@/components/ui/icons';
import Select from '@/components/ui/Select';
import { services } from '@/data/services';
import { site, whatsappLink } from '@/data/site';
import Diamonds from '@/light/Diamonds';

const inputCls =
  'w-full rounded-xl border border-line bg-white px-4 py-3 font-display text-base text-silver-50 outline-none transition-colors placeholder:text-silver-400/70 focus:border-accent-500 aria-[invalid=true]:border-accent-500';

function Field({ label, id, error, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex justify-between font-display text-sm text-silver-200">
        {label}
        {optional && <span className="text-silver-400">Optional</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1.5 text-sm text-accent-600">{error}</p>}
    </div>
  );
}

/** Builds the WhatsApp message from the form, e.g. "Hello JD Business Consultancy, I'm Amal. I'd like help with ..." */
const buildMessage = ({ name, email, service, message }, pkg) => {
  const lines = [`Hello JD Business Consultancy, I'm ${name.trim()}.`];
  const title = services.find(s => s.slug === service)?.title;
  if (title) lines.push(`I'd like help with ${title}${pkg ? ` (${pkg} package)` : ''}.`);
  if (email.trim()) lines.push(`You can also reach me at ${email.trim()}.`);
  if (message.trim()) lines.push('', message.trim());
  return lines.join('\n');
};

export default function Contact() {
  const [params] = useSearchParams();
  const pkg = params.get('package');
  const pkgName = pkg ? pkg[0].toUpperCase() + pkg.slice(1) : null;
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: services.some(s => s.slug === params.get('service')) ? params.get('service') : '',
    message: '',
  });
  const [touched, setTouched] = useState(false);

  const nameError = !form.name.trim() && 'Please enter your name';
  const showError = touched && nameError;
  // Email is optional, but if given it must look like an address
  const emailError = form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) && 'Please enter a valid email address';
  const showEmailError = touched && emailError;
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const send = e => {
    e.preventDefault();
    setTouched(true);
    if (nameError || emailError) return;
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
        <Diamonds preset="side" />
        <div className="container-x relative grid gap-16 lg:grid-cols-12">
          {/* Intro + details */}
          <div className="lg:col-span-5">
            <Reveal as="h1" className="text-5xl font-light tracking-[-0.02em] md:text-7xl">
              Let's <Strong glint>talk.</Strong>
            </Reveal>
            <Reveal as="p" delay={0.05} className="mt-6 max-w-md text-lg text-silver-400">
              Tell us a little about what you need and we'll continue the conversation on WhatsApp. The first
              consultation is free.
            </Reveal>
            <Reveal as="ul" delay={0.1} className="mt-12 space-y-5">
              {details.map(({ Icon, label, value, href }) => (
                <li key={value} className="flex items-start gap-4">
                  <Icon className="mt-1 size-5 shrink-0 text-silver-50" strokeWidth={1.5} />
                  <div>
                    <p className="font-display text-sm text-silver-400">{label}</p>
                    {href ? (
                      <a href={href} className="break-words font-display text-silver-50 hover:text-accent-600">{value}</a>
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
            <form onSubmit={send} noValidate className="rim space-y-5 rounded-3xl bg-white p-6 md:p-10">
              <div className="flex items-center gap-3 pb-2">
                <span className="grid size-10 place-items-center rounded-full bg-ink-900">
                  <WhatsAppIcon className="size-5 text-silver-50" />
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
                <Field label="Email" id="c-email" error={showEmailError} optional>
                  <input
                    id="c-email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="you@company.com"
                    aria-invalid={!!showEmailError}
                    aria-describedby={showEmailError ? 'c-email-err' : undefined}
                    className={inputCls}
                  />
                </Field>
              </div>
              <Field label="Service" id="c-service" optional>
                <Select
                  inputId="c-service"
                  value={form.service}
                  onChange={v => setForm(f => ({ ...f, service: v }))}
                  placeholder="Not sure yet"
                  options={[{ value: '', label: 'Not sure yet' }, ...services.map(s => ({ value: s.slug, label: s.title }))]}
                />
              </Field>
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
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 font-display text-[0.95rem] font-medium tracking-wide text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_26px_-10px_rgba(217,56,30,0.65)] transition-[transform,background-color,box-shadow] duration-300 ease-lux hover:-translate-y-0.5 hover:bg-accent-600 active:scale-[0.98]"
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
