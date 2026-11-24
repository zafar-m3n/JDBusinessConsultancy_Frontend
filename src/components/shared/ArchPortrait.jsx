import portrait from '@/assets/jony-dewson.webp';

/**
 * Arched portrait of the founder. The name is set like the business card:
 * first name light, surname bold, role in wide-spaced capitals.
 */
export default function ArchPortrait({ name, role }) {
  const [first, ...rest] = name.split(' ');
  return (
    <figure className="rim relative aspect-[3/4] overflow-hidden rounded-b-3xl bg-white [border-top-left-radius:50%_37.5%] [border-top-right-radius:50%_37.5%]">
      <img
        src={portrait}
        alt={`Portrait of ${name}`}
        width="768"
        height="1024"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover object-top"
      />
      {/* Darkens the bottom of the jacket so the caption reads clearly */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-6 text-center font-display text-white">
        <span className="block text-xl tracking-[0.06em] uppercase">
          <span className="font-light">{first}</span> <span className="font-bold">{rest.join(' ')}</span>
        </span>
        {role && <span className="mt-1.5 block text-[0.68rem] uppercase tracking-[0.3em] text-white/75">{role}</span>}
      </figcaption>
    </figure>
  );
}
