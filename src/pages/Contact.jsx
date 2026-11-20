import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Button, Gold, Meta, Reveal, WhatsAppButton } from '@/components/ui/primitives';
import Select from '@/components/ui/Select';
import { services } from '@/data/services';
import { site } from '@/data/site';

const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

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

export default function Contact() {
  const [params] = useSearchParams();
  const pkg = params.get('package');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: services.some(s => s.slug === params.get('service')) ? params.get('service') : '',
    message: pkg ? `I'm interested in the ${pkg[0].toUpperCase() + pkg.slice(1)} registration package.` : '',
  });
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const errors = {
    name: !form.name.trim() && 'Please enter your name',
    email: !emailOk(form.email) && 'Please enter a valid email address',
  };
  const invalid = Object.values(errors).some(Boolean);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const err = k => (touched && errors[k]) || null;

  const submit = async e => {
    e.preventDefault();
    setTouched(true);
    if (invalid) return;
    setStatus('sending');
    // TODO: connect to an email service (EmailJS / Web3Forms / Formspree) once the site is complete.
    // Until then this only simulates a successful send.
    await new Promise(r => setTimeout(r, 900));
    setStatus('sent');
  };

  const details = [
    { Icon: Phone, value: site.phone, href: site.phoneHref },
    { Icon: Mail, value: site.email, href: `mailto:${site.email}` },
    { Icon: MapPin, value: site.address },
    { Icon: Clock, value: site.hours },
  ];

  return (
    <>
      <Meta title="Contact" description="Book a free consultation with JD Business Consultancy, or chat with us on WhatsApp." />

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
              Tell us a little about your business and we'll get back to you within one working day. The first
              consultation is free.
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <WhatsAppButton />
            </Reveal>
            <Reveal as="ul" delay={0.15} className="mt-12 space-y-5">
              {details.map(({ Icon, value, href }) => (
                <li key={value} className="flex items-start gap-4">
                  <Icon className="mt-1 size-5 shrink-0 text-gold-300" strokeWidth={1.5} />
                  {href ? (
                    <a href={href} className="break-words text-silver-200 hover:text-gold-100">{value}</a>
                  ) : (
                    <span className="text-silver-200">{value}</span>
                  )}
                </li>
              ))}
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <div className="rim rounded-3xl bg-ink-900/50 p-6 md:p-10">
              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="status" className="py-10 text-center">
                    <p className="font-display text-3xl font-light text-silver-50">
                      Thank you, <Gold>{form.name.trim().split(' ')[0]}</Gold>.
                    </p>
                    <p className="mx-auto mt-4 max-w-sm text-silver-400">
                      We've received your message and will reply within one working day.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-8"
                      onClick={() => { setStatus('idle'); setTouched(false); setForm(f => ({ ...f, message: '' })); }}
                    >
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Name" id="c-name" error={err('name')}>
                        <input
                          id="c-name"
                          autoComplete="name"
                          value={form.name}
                          onChange={set('name')}
                          aria-invalid={!!err('name')}
                          aria-describedby={err('name') ? 'c-name-err' : undefined}
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Email" id="c-email" error={err('email')}>
                        <input
                          id="c-email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={set('email')}
                          aria-invalid={!!err('email')}
                          aria-describedby={err('email') ? 'c-email-err' : undefined}
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Phone" id="c-phone" optional>
                        <input id="c-phone" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} className={inputCls} />
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
                    <Button type="submit" arrow disabled={status === 'sending'} className="w-full disabled:opacity-60">
                      {status === 'sending' ? 'Sending…' : 'Send message'}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
