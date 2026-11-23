import { Check } from 'lucide-react';
import { Button, Reveal } from '@/components/ui/primitives';
import { packages } from '@/data/content';

/** The three registration packages, used on Home and Company Registration. */
export default function PackageCards() {
  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:items-center">
      {packages.map((p, i) => (
        <Reveal
          key={p.name}
          delay={i * 0.08}
          className={`rim relative flex flex-col rounded-3xl p-8 md:p-10 ${
            p.popular
              ? 'bg-[linear-gradient(180deg,rgba(201,164,92,0.14),rgba(28,25,25,0.9)_40%)] lg:py-14 shadow-[0_30px_80px_-30px_rgba(201,164,92,0.35)]'
              : 'bg-ink-900/70'
          }`}
        >
          {p.popular && (
            <span className="absolute -top-3.5 left-8 z-10 rounded-full bg-[linear-gradient(180deg,#f3e2b3,#c9a45c)] px-4 py-1 font-display text-xs font-medium uppercase tracking-[0.2em] text-ink-950">
              Most popular
            </span>
          )}
          <h3 className={`font-display text-2xl ${p.popular ? 'gold' : 'text-silver-50'}`}>{p.name}</h3>
          <p className="mt-3 min-h-12 text-silver-400">{p.blurb}</p>
          <p className="mt-8 flex items-baseline gap-2">
            <span className="text-sm text-silver-400">LKR</span>
            <span className={`font-display text-5xl font-light ${p.popular ? 'gold' : 'text-silver-50'}`}>{p.price}</span>
          </p>
          <p className="mt-1 text-xs text-silver-400">+ government fees</p>
          <div className="hairline my-8" />
          <ul className="flex-1 space-y-3">
            {p.features.map(f => (
              <li key={f} className="flex gap-3 text-silver-200">
                <Check className="mt-1 size-4 shrink-0 text-gold-500" /> {f}
              </li>
            ))}
          </ul>
          <Button
            to={`/contact?service=business-registration&package=${p.name.toLowerCase()}`}
            variant={p.popular ? 'gold' : 'outline'}
            className="mt-10 w-full"
          >
            Choose {p.name}
          </Button>
        </Reveal>
      ))}
    </div>
  );
}
