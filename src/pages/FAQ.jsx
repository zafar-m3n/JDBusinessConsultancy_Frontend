import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Accordion from '@/components/ui/Accordion';
import { Meta, Reveal } from '@/components/ui/primitives';
import { ClosingCTA, PageHero } from '@/components/layout/Chrome';
import { faqCategories } from '@/data/content';
import { services } from '@/data/services';

// Merge each service's FAQs into its matching category
const categoryFor = {
  'business-registration': 'Registration',
  'bookkeeping-accounting': 'Accounting & Tax',
  'tax-financial-consulting': 'Accounting & Tax',
  'legal-consulting': 'Legal',
  'digital-marketing': 'Marketing',
  'strategy-advisory': 'Strategy',
};
const categories = faqCategories.map(c => ({
  ...c,
  items: [
    ...c.items,
    ...services.filter(s => categoryFor[s.slug] === c.name).flatMap(s => s.faqs),
  ].filter((item, i, arr) => arr.findIndex(x => x.q === item.q) === i),
}));

export default function FAQ() {
  const [cat, setCat] = useState(categories[0].name);
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories.find(c => c.name === cat).items;
    return categories.flatMap(c => c.items).filter(i => (i.q + ' ' + i.a).toLowerCase().includes(q));
  }, [cat, query]);

  return (
    <>
      <Meta />
      <PageHero
        title="Questions,"
        gold="answered."
        lead="Can't find what you're looking for? Message us on WhatsApp and we'll reply quickly."
        ghost="?"
      />
      <section className="border-t border-line">
        <div className="container-x grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <aside className="lg:col-span-4">
            <div className="space-y-8 lg:sticky lg:top-32">
              <label className="rim flex items-center gap-3 rounded-full px-5 py-3">
                <Search className="size-4 text-gold-300" />
                <span className="sr-only">Search questions</span>
                <input
                  type="search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search questions"
                  className="w-full bg-transparent text-silver-50 outline-none placeholder:text-silver-400"
                />
              </label>
              <nav aria-label="FAQ categories">
                <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                  {categories.map(c => {
                    const on = !query && cat === c.name;
                    return (
                      <li key={c.name}>
                        <button
                          onClick={() => { setCat(c.name); setQuery(''); }}
                          aria-pressed={on}
                          className={`flex w-full items-center justify-between gap-4 rounded-full px-5 py-2.5 text-left font-display transition-colors lg:rounded-xl ${
                            on ? 'bg-gold-500/10 text-gold-100' : 'text-silver-400 hover:text-silver-50'
                          }`}
                        >
                          {c.name}
                          <span className="hidden text-xs text-silver-400 lg:inline">{c.items.length}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>
          <Reveal className="lg:col-span-7 lg:col-start-6" key={query ? 'search' : cat}>
            {query && <p className="mb-6 text-sm text-silver-400">{results.length} result{results.length === 1 ? '' : 's'}</p>}
            {results.length ? (
              <Accordion items={results} />
            ) : (
              <p className="text-silver-400">No questions match “{query}”. Try another word, or ask us directly.</p>
            )}
          </Reveal>
        </div>
      </section>
      <ClosingCTA title="Still" gold="unsure?" />
    </>
  );
}
