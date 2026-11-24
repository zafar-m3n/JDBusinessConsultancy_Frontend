import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function Accordion({ items, defaultOpen = 0, className = '' }) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();
  return (
    <div className={`divide-y divide-line border-y border-line ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="relative">
            {isOpen && <span className="absolute inset-x-0 -top-px h-0.5 bg-accent-500" aria-hidden="true" />}
            <h3 className="font-sans text-base">
              <button
                id={`${uid}-h${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-p${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-normal text-silver-50 transition-colors hover:text-accent-600 md:text-xl"
              >
                <span>{item.q}</span>
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                    isOpen ? 'rotate-45 border-accent-500 bg-accent-500 text-white' : 'border-line bg-white text-silver-400'
                  }`}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${uid}-p${i}`}
                  role="region"
                  aria-labelledby={`${uid}-h${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pr-12 text-silver-400">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
